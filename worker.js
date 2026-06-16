function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function base64UrlToBytes(value) {
  const padding = "=".repeat((4 - (value.length % 4 || 4)) % 4);
  const normalized = `${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function bytesToBase64Url(bytes) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodePublicKey(publicKey) {
  const bytes = base64UrlToBytes(publicKey);
  if (bytes.length !== 65) {
    throw new Error("Invalid VAPID public key length");
  }

  return {
    x: bytesToBase64Url(bytes.slice(1, 33)),
    y: bytesToBase64Url(bytes.slice(33, 65)),
  };
}

function utf8(text) {
  return new TextEncoder().encode(text);
}

function toJoseEcdsa(signature) {
  const bytes = new Uint8Array(signature);
  if (bytes.length === 64) return bytesToBase64Url(bytes);

  if (bytes[0] !== 48) {
    throw new Error("Unexpected ECDSA signature format");
  }

  let offset = 2;
  if (bytes[offset] !== 2) throw new Error("Invalid ECDSA signature");
  const rLength = bytes[offset + 1];
  offset += 2;
  const r = bytes.slice(offset, offset + rLength);
  offset += rLength;
  if (bytes[offset] !== 2) throw new Error("Invalid ECDSA signature");
  const sLength = bytes[offset + 1];
  offset += 2;
  const s = bytes.slice(offset, offset + sLength);

  const output = new Uint8Array(64);
  output.set(r.slice(-32), 32 - Math.min(32, r.length));
  output.set(s.slice(-32), 64 - Math.min(32, s.length));
  return bytesToBase64Url(output);
}

async function createVapidJwt(endpoint, env) {
  const header = bytesToBase64Url(utf8(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const claims = bytesToBase64Url(
    utf8(
      JSON.stringify({
        aud: new URL(endpoint).origin,
        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
        sub: env.VAPID_SUBJECT,
      }),
    ),
  );
  const signingInput = `${header}.${claims}`;
  const { x, y } = decodePublicKey(env.VAPID_PUBLIC_KEY);

  const key = await crypto.subtle.importKey(
    "jwk",
    {
      kty: "EC",
      crv: "P-256",
      d: env.VAPID_PRIVATE_KEY,
      x,
      y,
      ext: true,
      key_ops: ["sign"],
    },
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: "SHA-256",
    },
    key,
    utf8(signingInput),
  );

  return `${signingInput}.${toJoseEcdsa(signature)}`;
}

async function sendPushNotification(record, env) {
  const jwt = await createVapidJwt(record.endpoint, env);
  const response = await fetch(record.endpoint, {
    method: "POST",
    headers: {
      TTL: "300",
      Urgency: "normal",
      Authorization: `vapid t=${jwt}, k=${env.VAPID_PUBLIC_KEY}`,
    },
  });

  return response;
}

async function supabaseFetch(env, path, init = {}) {
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
  const headers = new Headers(init.headers || {});
  headers.set("apikey", serviceKey);
  headers.set("Authorization", `Bearer ${serviceKey}`);
  return fetch(`${env.SUPABASE_URL}${path}`, { ...init, headers });
}

async function getAuthenticatedUser(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;

  const response = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  return response.json();
}

async function upsertSubscription(request, env) {
  const user = await getAuthenticatedUser(request, env);
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

  const body = await readJson(request);
  const subscription = body?.subscription;
  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return jsonResponse({ error: "Subscription is required" }, 400);
  }

  const payload = {
    user_id: user.id,
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    reminder_time: /^\d{2}:\d{2}$/.test(body?.reminderTime) ? body.reminderTime : "09:00",
    timezone: body?.timeZone || "UTC",
    enabled: body?.enabled !== false,
    updated_at: new Date().toISOString(),
  };

  const response = await supabaseFetch(
    env,
    "/rest/v1/push_subscriptions?on_conflict=endpoint",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    return jsonResponse({ error: "Could not save subscription" }, 500);
  }

  return jsonResponse({ ok: true });
}

async function removeSubscription(request, env) {
  const user = await getAuthenticatedUser(request, env);
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

  const body = await readJson(request);
  if (!body?.endpoint) return jsonResponse({ error: "Endpoint is required" }, 400);

  const response = await supabaseFetch(
    env,
    `/rest/v1/push_subscriptions?user_id=eq.${encodeURIComponent(user.id)}&endpoint=eq.${encodeURIComponent(body.endpoint)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    return jsonResponse({ error: "Could not remove subscription" }, 500);
  }

  return jsonResponse({ ok: true });
}

async function sendTestPush(request, env) {
  const user = await getAuthenticatedUser(request, env);
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

  const response = await supabaseFetch(
    env,
    `/rest/v1/push_subscriptions?user_id=eq.${encodeURIComponent(user.id)}&enabled=eq.true&select=*`,
  );

  if (!response.ok) {
    return jsonResponse({ error: "Could not load subscriptions" }, 500);
  }

  const subscriptions = await response.json();
  if (!subscriptions.length) {
    return jsonResponse({ error: "No active subscriptions" }, 400);
  }

  const pushResponse = await sendPushNotification(subscriptions[0], env);

  if (!pushResponse.ok) {
    return jsonResponse({ error: "Push provider rejected the notification" }, 502);
  }

  return jsonResponse({ ok: true });
}

function localDateParts(timeZone, date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

function isDueNow(record, now = new Date()) {
  const current = localDateParts(record.timezone || "UTC", now);
  const [targetHour, targetMinute] = (record.reminder_time || "09:00").split(":").map(Number);
  const [currentHour, currentMinute] = current.time.split(":").map(Number);
  const diff = currentHour * 60 + currentMinute - (targetHour * 60 + targetMinute);

  if (diff < 0 || diff > 4) return false;

  if (!record.last_notified_at) return true;
  return localDateParts(record.timezone || "UTC", new Date(record.last_notified_at)).date !== current.date;
}

async function updateLastNotified(record, env) {
  await supabaseFetch(
    env,
    `/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(record.endpoint)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        last_notified_at: new Date().toISOString(),
      }),
    },
  );
}

async function hasTodayTasks(record, env) {
  const response = await supabaseFetch(
    env,
    `/rest/v1/tasks?user_id=eq.${encodeURIComponent(record.user_id)}&plan=eq.today&done=eq.false&select=id&limit=1`,
  );

  if (!response.ok) return false;
  const tasks = await response.json();
  return tasks.length > 0;
}

async function runScheduledPush(env) {
  const response = await supabaseFetch(
    env,
    "/rest/v1/push_subscriptions?enabled=eq.true&select=*",
  );

  if (!response.ok) return;

  const records = await response.json();
  const dueRecords = records.filter((record) => isDueNow(record));

  for (const record of dueRecords) {
    if (!(await hasTodayTasks(record, env))) continue;

    const pushResponse = await sendPushNotification(record, env);

    if (pushResponse.status === 404 || pushResponse.status === 410) {
      await supabaseFetch(
        env,
        `/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(record.endpoint)}`,
        { method: "DELETE" },
      );
      continue;
    }

    if (pushResponse.ok) {
      await updateLastNotified(record, env);
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/push/subscribe" && request.method === "POST") {
      return upsertSubscription(request, env);
    }

    if (url.pathname === "/api/push/unsubscribe" && request.method === "POST") {
      return removeSubscription(request, env);
    }

    if (url.pathname === "/api/push/test" && request.method === "POST") {
      return sendTestPush(request, env);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(_controller, env) {
    await runScheduledPush(env);
  },
};
