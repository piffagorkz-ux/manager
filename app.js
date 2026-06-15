const STORAGE_KEY = "simple-plans-v2";
const MODULE_STORAGE_KEY = "manager-modules-v1";
const OLD_STORAGE_KEY = "codex-todo-tracker-v1";
const LAST_OPENED_KEY = "simple-plans-last-opened";
const THEME_KEY = "simple-plans-theme";
const LANG_KEY = "simple-plans-lang";
const QUOTE_OFFSET_KEY = "manager-quote-offset";
const FORCE_AUTH_KEY = "manager-force-auth";
const WISH_CLOUD_POSITION_KEY = "manager-wish-cloud-position";
const PROFILE_NAME_KEY = "manager-profile-name";

const PLAN_KEYS = ["today", "tomorrow", "week", "month", "year"];
const PLANS = Object.fromEntries(PLAN_KEYS.map((plan) => [plan, true]));
const THEMES = [
  "scheme1",
  "scheme2",
  "scheme3",
  "scheme4",
  "scheme5",
  "scheme6",
  "dark1",
  "dark2",
  "dark3",
  "dark4",
  "dark5",
  "dark6",
];
const THEME_ALIASES = {
  palette1: "scheme1",
  palette4: "scheme2",
  palette5: "scheme3",
  palette6: "scheme4",
  palette7: "scheme5",
  palette9: "scheme6",
};
const LANGS = ["ru", "en"];

const COPY = {
  ru: {
    appTitle: "Планы",
    addPlaceholder: "Добавить задачу",
    addButton: "Добавить",
    completedAt: "Выполнено",
    edit: "Изм",
    editTitle: "Редактировать",
    deleteTitle: "Удалить",
    clearDone: "Убрать выполненные",
    settings: "Настройки",
    themeTitle: "Тема",
    languageTitle: "Язык",
    cleanupTitle: "Очистка",
    themes: {
      scheme1: "Схема 1",
      scheme2: "Схема 2",
      scheme3: "Схема 3",
      scheme4: "Схема 4",
      scheme5: "Схема 5",
      scheme6: "Схема 6",
      dark1: "Темная 1",
      dark2: "Темная 2",
      dark3: "Темная 3",
      dark4: "Темная 4",
      dark5: "Темная 5",
      dark6: "Темная 6",
    },
    views: {
      work: {
        title: "В работе",
      },
      today: {
        title: "Сегодня",
        hint: "Главный фокус на день.",
        empty: "Добавь одну задачу, которую действительно хочется сделать.",
      },
      tomorrow: {
        title: "Завтра",
        hint: "Этот список автоматически станет сегодняшним при новом дне.",
        empty: "Запиши то, что не должно потеряться к утру.",
      },
      week: {
        title: "Неделя",
        hint: "То, что важно держать в поле зрения в ближайшие дни.",
        empty: "Пара задач на неделю уже даст голове больше воздуха.",
      },
      month: {
        title: "Месяц",
        hint: "Средние цели без лишней детализации.",
        empty: "Сюда хорошо класть дела, которые пока рано дробить.",
      },
      year: {
        title: "Год",
        hint: "Большие планы, направления и личные ориентиры.",
        empty: "Один годовой ориентир лучше, чем десять забытых обещаний.",
      },
      completed: {
        title: "Выполненные",
        hint: "Готовые задачи из всех планов. Сними галочку, чтобы вернуть задачу в работу.",
        empty: "Здесь появятся закрытые задачи.",
      },
      settings: {
        title: "Настройки",
        hint: "Тема, язык и аккуратная очистка выполненных задач.",
        empty: "",
      },
    },
  },
  en: {
    appTitle: "Plans",
    addPlaceholder: "Add a task",
    addButton: "Add",
    completedAt: "Completed",
    edit: "Edit",
    editTitle: "Edit",
    deleteTitle: "Delete",
    clearDone: "Clear completed",
    settings: "Settings",
    themeTitle: "Theme",
    languageTitle: "Language",
    cleanupTitle: "Cleanup",
    themes: {
      scheme1: "Scheme 1",
      scheme2: "Scheme 2",
      scheme3: "Scheme 3",
      scheme4: "Scheme 4",
      scheme5: "Scheme 5",
      scheme6: "Scheme 6",
      dark1: "Dark 1",
      dark2: "Dark 2",
      dark3: "Dark 3",
      dark4: "Dark 4",
      dark5: "Dark 5",
      dark6: "Dark 6",
    },
    views: {
      work: {
        title: "In progress",
      },
      today: {
        title: "Today",
        hint: "Your main focus for the day.",
        empty: "Add one task you actually want to finish.",
      },
      tomorrow: {
        title: "Tomorrow",
        hint: "This list automatically becomes Today on a new day.",
        empty: "Capture what should not be lost by morning.",
      },
      week: {
        title: "Week",
        hint: "What matters in the next few days.",
        empty: "A few weekly tasks already make the head lighter.",
      },
      month: {
        title: "Month",
        hint: "Medium goals without too much detail.",
        empty: "Good place for plans that are not ready to split yet.",
      },
      year: {
        title: "Year",
        hint: "Bigger plans, directions, and personal landmarks.",
        empty: "One yearly direction beats ten forgotten promises.",
      },
      completed: {
        title: "Completed",
        hint: "Finished tasks from all plans. Uncheck one to bring it back.",
        empty: "Completed tasks will appear here.",
      },
      settings: {
        title: "Settings",
        hint: "Theme, language, and completed task cleanup.",
        empty: "",
      },
    },
  },
};

COPY.ru.views.habits = {
  title: "Привычки",
  hint: "Ежедневные отметки квадратами: день, месяц и год в одном спокойном виде.",
  empty: "",
};
COPY.en.views.habits = {
  title: "Habits",
  hint: "Daily square marks with a clean month and year overview.",
  empty: "",
};

const HABIT_COPY = {
  ru: {
    placeholder: "Новая привычка",
    color: "Цвет",
    add: "Добавить",
    today: "Сегодня",
    doneToday: "Отмечено сегодня",
    markToday: "Отметить сегодня",
    unmarkToday: "Убрать отметку",
    back: "Назад",
    title: "Привычки",
    month: "Месяц",
    year: "Год",
    empty: "Добавь первую привычку, например: 2 литра воды.",
    delete: "Удалить",
    completed: "дней",
  },
  en: {
    placeholder: "New habit",
    color: "Color",
    add: "Add",
    today: "Today",
    doneToday: "Done today",
    markToday: "Mark today",
    unmarkToday: "Unmark",
    back: "Back",
    title: "Habits",
    month: "Month",
    year: "Year",
    empty: "Add your first habit, for example: 2 liters of water.",
    delete: "Delete",
    completed: "days",
  },
};

const DAILY_QUOTES = {
  ru: [
    "Маленькое действие сегодня сильнее большого обещания на потом.",
    "Фокус — это когда важное получает место раньше срочного.",
    "Хороший день начинается не идеально, а осознанно.",
    "Прогресс любит повторение больше, чем настроение.",
    "Не надо делать всё. Надо сделать следующее правильное.",
    "Система побеждает силу воли, когда день становится шумным.",
    "Один честный шаг каждый день меняет траекторию года.",
    "Спокойный план освобождает голову для жизни.",
    "То, что отмечено, начинает расти.",
    "Будущее строится тихими решениями, которые ты повторяешь.",
  ],
  en: [
    "A small action today beats a big promise for later.",
    "Focus means giving what matters a place before what is urgent.",
    "A good day starts consciously, not perfectly.",
    "Progress likes repetition more than mood.",
    "You do not need to do everything. Do the next right thing.",
    "A system beats willpower when the day gets noisy.",
    "One honest step each day changes the path of the year.",
    "A calm plan gives your mind room to live.",
    "What gets marked starts to grow.",
    "The future is built by quiet decisions you repeat.",
  ],
};

const taskForm = document.querySelector("#taskForm");
const authPanel = document.querySelector("#authPanel");
const authForm = document.querySelector("#authForm");
const authEmail = document.querySelector("#authEmail");
const authPassword = document.querySelector("#authPassword");
const authMessage = document.querySelector("#authMessage");
const signupButton = document.querySelector("#signupButton");
const logoutButton = document.querySelector("#logoutButton");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const emptyHint = document.querySelector("#emptyHint");
const clearDone = document.querySelector("#clearDone");
const tabs = document.querySelectorAll(".tab");
const planCards = document.querySelectorAll(".plan-card");
const planTitle = document.querySelector("#planTitle");
const planHint = document.querySelector("#planHint");
const dateLine = document.querySelector("#dateLine");
const settingsPanel = document.querySelector("#settingsPanel");
const habitsPanel = document.querySelector("#habitsPanel");
const habitForm = document.querySelector("#habitForm");
const habitInput = document.querySelector("#habitInput");
const habitColor = document.querySelector("#habitColor");
const habitColorLabel = document.querySelector("#habitColorLabel");
const habitAddLabel = document.querySelector("#habitAddLabel");
const habitList = document.querySelector("#habitList");
const themeChoices = document.querySelectorAll(".theme-choice");
const langChoices = document.querySelectorAll(".lang-choice");
const themeTitle = document.querySelector("#themeTitle");
const languageTitle = document.querySelector("#languageTitle");
const cleanupTitle = document.querySelector("#cleanupTitle");
const profileNameTitle = document.querySelector("#profileNameTitle");
const profileNameInput = document.querySelector("#profileNameInput");
const settingsButton = document.querySelector("#settingsButton");
const homePanel = document.querySelector("#homePanel");
const quoteText = document.querySelector("#quoteText");
const quoteNext = document.querySelector("#quoteNext");
const plannerModule = document.querySelector("#plannerModule");
const financeModule = document.querySelector("#financeModule");
const goalsModule = document.querySelector("#goalsModule");
const wishesModule = document.querySelector("#wishesModule");
const moduleCards = document.querySelectorAll(".module-card");
const moduleBacks = document.querySelectorAll("[data-module-back]");
const wishCloud = document.querySelector("#wishCloud");
const wishesSummary = document.querySelector("#wishesSummary");
const wishForm = document.querySelector("#wishForm");
const wishInput = document.querySelector("#wishInput");
const wishList = document.querySelector("#wishList");
const wishTabs = document.querySelectorAll(".wish-tab");
const financeSummary = document.querySelector("#financeSummary");
const monthlyIncomeList = document.querySelector("#monthlyIncomeList");
const monthlyExpenseList = document.querySelector("#monthlyExpenseList");
const extraMoneyList = document.querySelector("#extraMoneyList");
const financeDonut = document.querySelector("#financeDonut");
const financeDonutTotal = document.querySelector("#financeDonutTotal");
const recurringExpenseValue = document.querySelector("#recurringExpenseValue");
const extraExpenseValue = document.querySelector("#extraExpenseValue");
const monthlyIncomeForm = document.querySelector("#monthlyIncomeForm");
const monthlyExpenseForm = document.querySelector("#monthlyExpenseForm");
const quickIncomeForm = document.querySelector("#quickIncomeForm");
const quickExpenseForm = document.querySelector("#quickExpenseForm");
const financeFormButtons = document.querySelectorAll("[data-finance-form]");
const financeEntryForms = document.querySelectorAll(".finance-entry-form");
const goalForm = document.querySelector("#goalForm");
const goalLists = {
  month: document.querySelector("#goalsMonth"),
  year: document.querySelector("#goalsYear"),
  three: document.querySelector("#goalsThree"),
  five: document.querySelector("#goalsFive"),
};

let activeModule = "home";
let activePlan = "today";
let activeWorkPlan = "today";
let state = createEmptyState();
let db = null;
let currentUser = null;
let selectedHabitId = null;
let activeWishView = "active";
let activeTheme = loadPreference(THEME_KEY, THEMES, "scheme1", THEME_ALIASES);
let activeLang = loadPreference(LANG_KEY, LANGS, "ru");
let forceAuth = localStorage.getItem(FORCE_AUTH_KEY) === "1";
let profileName = localStorage.getItem(PROFILE_NAME_KEY)?.trim() || "";
let wishCloudPosition = loadWishCloudPosition();
let wishCloudDrag = null;
let wishCloudSuppressClickUntil = 0;

init();

async function init() {
  applyPreferences();
  db = createSupabaseClient();
  if (db) {
    const { data } = await db.auth.getSession();
    currentUser = forceAuth ? null : data.session?.user || null;
    db.auth.onAuthStateChange(async (_event, session) => {
      currentUser = forceAuth ? null : session?.user || null;
      state = currentUser ? await loadRemoteState() : createEmptyState();
      if (currentUser) await rollTomorrowIntoToday();
      render();
    });
  }

  state = db ? (currentUser ? await loadRemoteState() : createEmptyState()) : loadLocalState();
  if (!db || currentUser) await rollTomorrowIntoToday();
  render();
  applyWishCloudPosition();
}

function copy() {
  return COPY[activeLang];
}

function loadPreference(key, allowed, fallback, aliases = {}) {
  const saved = localStorage.getItem(key);
  if (aliases[saved]) {
    localStorage.setItem(key, aliases[saved]);
    return aliases[saved];
  }
  return allowed.includes(saved) ? saved : fallback;
}

function applyPreferences() {
  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.lang = activeLang;
}

function loadWishCloudPosition() {
  const saved = localStorage.getItem(WISH_CLOUD_POSITION_KEY);
  if (!saved) return null;

  try {
    const value = JSON.parse(saved);
    if (Number.isFinite(value?.x) && Number.isFinite(value?.y)) {
      return { x: value.x, y: value.y };
    }
  } catch {
    return null;
  }

  return null;
}

function clampWishCloudPosition(x, y) {
  const size = wishCloud.offsetWidth || 58;
  const padding = 12;
  const maxX = Math.max(padding, window.innerWidth - size - padding);
  const maxY = Math.max(padding, window.innerHeight - size - padding);

  return {
    x: Math.min(Math.max(x, padding), maxX),
    y: Math.min(Math.max(y, padding), maxY),
  };
}

function applyWishCloudPosition() {
  if (!wishCloudPosition) {
    wishCloud.style.left = "";
    wishCloud.style.top = "";
    wishCloud.style.right = "";
    wishCloud.style.bottom = "";
    return;
  }

  const position = clampWishCloudPosition(wishCloudPosition.x, wishCloudPosition.y);
  wishCloudPosition = position;
  wishCloud.style.left = `${position.x}px`;
  wishCloud.style.top = `${position.y}px`;
  wishCloud.style.right = "auto";
  wishCloud.style.bottom = "auto";
}

function saveWishCloudPosition() {
  if (!wishCloudPosition) {
    localStorage.removeItem(WISH_CLOUD_POSITION_KEY);
    return;
  }

  localStorage.setItem(WISH_CLOUD_POSITION_KEY, JSON.stringify(wishCloudPosition));
}

function createSupabaseClient() {
  const config = window.APP_CONFIG || {};
  const url = config.SUPABASE_URL;
  const key = config.SUPABASE_ANON_KEY;

  if (!url || !key || !window.supabase) return null;
  return window.supabase.createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

function getAuthIdentity() {
  const rawLogin = authEmail.value.trim().toLowerCase();
  if (!rawLogin) return { error: "Введите логин." };

  if (rawLogin.includes("@")) {
    return { email: rawLogin, login: rawLogin.split("@")[0] };
  }

  const login = rawLogin.replace(/\s+/g, "");
  if (!/^[a-z0-9._-]{3,32}$/.test(login)) {
    return { error: "Логин: 3-32 символа, латиница, цифры, точка, дефис или _." };
  }

  return {
    email: `${login}@users.manager.app`,
    login,
  };
}

function createEmptyState() {
  return {
    lastOpened: todayISO(),
    tasks: [],
    habits: [],
    habitChecks: [],
    finance: createEmptyFinance(),
    goals: [],
    wishes: [],
  };
}

function createEmptyFinance() {
  return {
    monthly: [],
    extra: [],
  };
}

function loadLocalState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch {
      return createInitialState();
    }
  }

  const oldTasks = localStorage.getItem(OLD_STORAGE_KEY);
  if (oldTasks) {
    try {
      return migrateOldTasks(JSON.parse(oldTasks));
    } catch {
      return createInitialState();
    }
  }

  return createInitialState();
}

async function loadRemoteState() {
  const { data, error } = await db
    .from("tasks")
    .select("id,title,plan,done,completed_at,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase unavailable, using localStorage", error);
    db = null;
    return loadLocalState();
  }

  const { data: habitsData, error: habitsError } = await db
    .from("habits")
    .select("id,title,color,created_at")
    .order("created_at", { ascending: true });

  const { data: checksData, error: checksError } = await db
    .from("habit_checks")
    .select("habit_id,check_date,created_at")
    .order("check_date", { ascending: true });

  if (habitsError || checksError) {
    console.warn("Supabase habits unavailable, using localStorage", habitsError || checksError);
    db = null;
    return loadLocalState();
  }

  const moduleState = await loadRemoteModuleState();

  return {
    lastOpened: localStorage.getItem(LAST_OPENED_KEY) || todayISO(),
    tasks: data.map((task) => ({
      id: task.id,
      title: task.title,
      plan: task.plan,
      done: task.done,
      completedAt: task.completed_at ? new Date(task.completed_at).getTime() : null,
      createdAt: new Date(task.created_at).getTime(),
    })),
    habits: habitsData.map((habit) => ({
      id: habit.id,
      title: habit.title,
      color: normalizeHabitColor(habit.color),
      createdAt: new Date(habit.created_at).getTime(),
    })),
    habitChecks: checksData.map((check) => ({
      habitId: check.habit_id,
      date: check.check_date,
      createdAt: check.created_at ? new Date(check.created_at).getTime() : Date.now(),
    })),
    finance: moduleState.finance,
    goals: moduleState.goals,
    wishes: moduleState.wishes,
  };
}

async function loadRemoteModuleState() {
  if (!db || !currentUser) return loadModuleState();

  const { data, error } = await db
    .from("module_state")
    .select("data")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.warn("Could not load module state", error);
    return loadModuleState();
  }

  return normalizeModuleState(data?.data || {});
}

function loadModuleState() {
  const saved = localStorage.getItem(MODULE_STORAGE_KEY);
  if (!saved) return { finance: createEmptyFinance(), goals: [], wishes: [] };

  try {
    const value = JSON.parse(saved);
    return normalizeModuleState(value);
  } catch {
    return { finance: createEmptyFinance(), goals: [], wishes: [] };
  }
}

function normalizeModuleState(value) {
  const finance = value.finance || createEmptyFinance();
  const monthly = Array.isArray(finance.monthly) ? finance.monthly : [];
  const extra = Array.isArray(finance.extra) ? finance.extra : [];
  const goals = Array.isArray(value.goals) ? value.goals : [];
  const wishes = Array.isArray(value.wishes) ? value.wishes : [];

  return {
    finance: {
      monthly: monthly.map(normalizeMoneyItem).filter(Boolean),
      extra: extra.map(normalizeMoneyItem).filter(Boolean),
    },
    goals: goals
      .filter((goal) => goal && goal.title)
      .map((goal) => ({
        id: goal.id || crypto.randomUUID(),
        title: String(goal.title).trim(),
        horizon: ["month", "year", "three", "five"].includes(goal.horizon) ? goal.horizon : "month",
        createdAt: goal.createdAt || Date.now(),
      })),
    wishes: wishes
      .filter((wish) => wish && wish.title)
      .map((wish) => ({
        id: wish.id || crypto.randomUUID(),
        title: String(wish.title).trim(),
        done: Boolean(wish.done),
        createdAt: wish.createdAt || Date.now(),
        completedAt: wish.completedAt || null,
      })),
  };
}

function normalizeMoneyItem(item) {
  if (!item) return null;
  const amount = Number(item.amount);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return {
    id: item.id || crypto.randomUUID(),
    title: String(item.title || item.note || "Запись").trim(),
    amount,
    type: item.type === "expense" ? "expense" : "income",
    category: item.category || "",
    createdAt: item.createdAt || Date.now(),
  };
}

function createInitialState() {
  return {
    lastOpened: todayISO(),
    tasks: [
      createTask("Выбрать 3 главных дела на сегодня", "today"),
      createTask("Подготовить план на завтра", "tomorrow"),
      createTask("Определить цель месяца", "month"),
    ],
    habits: [createHabit("2 литра воды", "#67c22f")],
    habitChecks: [],
    finance: createEmptyFinance(),
    goals: [],
    wishes: [],
  };
}

function normalizeState(value) {
  const tasks = Array.isArray(value.tasks) ? value.tasks : [];
  const habits = Array.isArray(value.habits) ? value.habits : [];
  const habitChecks = Array.isArray(value.habitChecks) ? value.habitChecks : [];
  const moduleState = normalizeModuleState(value);
  return {
    lastOpened: value.lastOpened || todayISO(),
    tasks: tasks
      .filter((task) => task && task.title)
      .map((task) => ({
        id: task.id || crypto.randomUUID(),
        title: String(task.title).trim(),
        plan: PLANS[task.plan] ? task.plan : "today",
        done: Boolean(task.done),
        completedAt: task.completedAt || null,
        createdAt: task.createdAt || Date.now(),
      })),
    habits: habits
      .filter((habit) => habit && habit.title)
      .map((habit) => ({
        id: habit.id || crypto.randomUUID(),
        title: String(habit.title).trim(),
        color: normalizeHabitColor(habit.color),
        createdAt: habit.createdAt || Date.now(),
      })),
    habitChecks: habitChecks
      .filter((check) => check && check.habitId && isISODate(check.date))
      .map((check) => ({
        habitId: check.habitId,
        date: check.date,
        createdAt: check.createdAt || Date.now(),
      })),
    finance: moduleState.finance,
    goals: moduleState.goals,
    wishes: moduleState.wishes,
  };
}

function migrateOldTasks(oldTasks) {
  return {
    lastOpened: todayISO(),
    tasks: oldTasks
      .filter((task) => task && task.title)
      .map((task) =>
        createTask(
          task.title,
          task.dueDate === todayISO() ? "today" : "week",
          Boolean(task.done),
          task.createdAt || Date.now(),
          task.completedAt || null,
        ),
      ),
    habits: [],
    habitChecks: [],
    finance: createEmptyFinance(),
    goals: [],
    wishes: [],
  };
}

function createTask(
  title,
  plan = activePlan,
  done = false,
  createdAt = Date.now(),
  completedAt = done ? Date.now() : null,
) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    plan: PLANS[plan] ? plan : "today",
    done,
    createdAt,
    completedAt,
  };
}

function createHabit(title, color = "#67c22f", createdAt = Date.now()) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    color: normalizeHabitColor(color),
    createdAt,
  };
}

function normalizeHabitColor(color) {
  const value = String(color || "").trim();
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#67c22f";
}

function isISODate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveModuleState();
}

function saveModuleState() {
  const data = {
    finance: state.finance || createEmptyFinance(),
    goals: state.goals || [],
    wishes: state.wishes || [],
  };
  localStorage.setItem(MODULE_STORAGE_KEY, JSON.stringify(data));

  if (db && currentUser) {
    db.from("module_state")
      .upsert({ user_id: currentUser.id, data, updated_at: new Date().toISOString() })
      .then(({ error }) => {
        if (error) console.warn("Could not save module state", error);
      });
  }
}

async function rollTomorrowIntoToday() {
  const today = todayISO();
  if (state.lastOpened === today) return;

  const movingIds = state.tasks
    .filter((task) => task.plan === "tomorrow" && !task.done)
    .map((task) => task.id);

  state.tasks = state.tasks.map((task) => {
    if (movingIds.includes(task.id)) return { ...task, plan: "today" };
    return task;
  });
  state.lastOpened = today;

  if (db && movingIds.length) {
    const { error } = await db.from("tasks").update({ plan: "today" }).in("id", movingIds);
    if (error) console.warn("Could not roll tomorrow into today", error);
  }

  if (db) {
    localStorage.setItem(LAST_OPENED_KEY, today);
  } else {
    saveState();
  }
}

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readableDate() {
  return new Intl.DateTimeFormat(activeLang === "ru" ? "ru-RU" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function dateISO(year, monthIndex, day) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const date = String(day).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function formatMonthName(year, monthIndex) {
  return new Intl.DateTimeFormat(activeLang === "ru" ? "ru-RU" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, 1));
}

function habitText() {
  return HABIT_COPY[activeLang] || HABIT_COPY.ru;
}

function tasksFor(plan) {
  return state.tasks.filter((task) => task.plan === plan);
}

function tasksForActiveView() {
  if (activePlan === "completed") return state.tasks.filter((task) => task.done);
  if (activePlan === "settings" || activePlan === "habits") return [];
  return tasksFor(activePlan).filter((task) => !task.done);
}

function openPlan(plan) {
  if (plan === "work") {
    activePlan = activeWorkPlan;
  } else {
    activePlan = plan;
    if (PLANS[plan]) activeWorkPlan = plan;
    if (plan !== "habits") selectedHabitId = null;
  }
  render();
}

function openModule(module) {
  activeModule = module;

  if (module === "planner") {
    activePlan = activeWorkPlan;
  }

  if (module === "habits") {
    activePlan = "habits";
  }

  render();
}

function openHome() {
  activeModule = "home";
  selectedHabitId = null;
  render();
}

function topModeFor(plan) {
  if (plan === "completed") return "completed";
  if (plan === "habits" || plan === "settings") return "";
  return "work";
}

function render() {
  const needsAuth = Boolean(db && (forceAuth || !currentUser));
  authPanel.hidden = !needsAuth;
  homePanel.hidden = needsAuth || activeModule !== "home";
  plannerModule.hidden = needsAuth || !["planner", "habits"].includes(activeModule);
  financeModule.hidden = needsAuth || activeModule !== "finance";
  goalsModule.hidden = needsAuth || activeModule !== "goals";
  wishesModule.hidden = needsAuth || activeModule !== "wishes";
  wishCloud.hidden = needsAuth;

  if (needsAuth) {
    document.querySelector("h1").textContent = homeTitleText();
    dateLine.textContent = readableDate();
    return;
  }

  const current = copy().views[activePlan];
  const visibleTasks = tasksForActiveView().sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  homePanel.hidden = activeModule !== "home";
  plannerModule.hidden = !["planner", "habits"].includes(activeModule);
  plannerModule.classList.toggle("is-habits-module", activeModule === "habits");
  financeModule.hidden = activeModule !== "finance";
  goalsModule.hidden = activeModule !== "goals";
  wishesModule.hidden = activeModule !== "wishes";

  dateLine.textContent = readableDate();
  applyWishCloudPosition();
  planTitle.textContent = current.title;
  planHint.textContent = current.hint;
  emptyHint.textContent = current.empty;
  taskForm.hidden = activePlan === "completed" || activePlan === "settings" || activePlan === "habits";
  taskList.hidden = activePlan === "settings" || activePlan === "habits";
  emptyState.hidden = activePlan === "settings" || activePlan === "habits";
  settingsPanel.hidden = activePlan !== "settings";
  habitsPanel.hidden = activePlan !== "habits";
  renderStaticText();
  document.querySelector("h1").textContent = activeModule === "home" ? homeTitleText() : copy().appTitle;

  tabs.forEach((tab) => {
    const tabPlan = tab.dataset.plan;
    tab.classList.toggle("is-active", tabPlan === topModeFor(activePlan));
  });
  settingsButton.classList.toggle("is-active", activePlan === "settings");
  planCards.forEach((card) => {
    const plan = card.dataset.planCard;
    card.classList.toggle("is-current", plan === activePlan);
    card.querySelector("span").textContent =
      plan === "habits"
        ? state.habits.filter((habit) => !isHabitChecked(habit.id, todayISO())).length
        : tasksFor(plan).filter((task) => !task.done).length;
  });

  if (activePlan !== "settings" && activePlan !== "habits") {
    taskList.innerHTML = "";
    visibleTasks.forEach((task) => taskList.append(createTaskElement(task)));
    emptyState.classList.toggle("is-visible", visibleTasks.length === 0);
  }
  renderHabits();
  renderFinance();
  renderGoals();
  renderWishes();
  renderDailyQuote();
  renderSettingsState();
}

function renderDailyQuote() {
  const quotes = DAILY_QUOTES[activeLang] || DAILY_QUOTES.ru;
  const daySeed = Number(todayISO().replaceAll("-", ""));
  const offset = Number(localStorage.getItem(QUOTE_OFFSET_KEY) || 0);
  const index = (daySeed + offset) % quotes.length;

  quoteText.textContent = quotes[index];
}

function renderFinance() {
  const finance = state.finance || createEmptyFinance();
  const monthlyIncome = sumMoney(finance.monthly, "income");
  const monthlyExpense = sumMoney(finance.monthly, "expense");
  const extraIncome = sumMoney(finance.extra, "income");
  const extraExpense = sumMoney(finance.extra, "expense");
  const balance = monthlyIncome + extraIncome - monthlyExpense - extraExpense;
  const totalExpense = monthlyExpense + extraExpense;
  const recurringShare = totalExpense ? Math.round((monthlyExpense / totalExpense) * 100) : 0;

  financeSummary.textContent = `Баланс месяца: ${formatMoney(balance)} · доходы ${formatMoney(monthlyIncome + extraIncome)} · расходы ${formatMoney(monthlyExpense + extraExpense)}`;
  if (financeDonut.style?.setProperty) {
    financeDonut.style.setProperty("--recurring-share", `${recurringShare}%`);
  }
  financeDonutTotal.textContent = formatMoney(totalExpense);
  recurringExpenseValue.textContent = formatMoney(monthlyExpense);
  extraExpenseValue.textContent = formatMoney(extraExpense);
  renderMoneyList(monthlyIncomeList, finance.monthly.filter((item) => item.type === "income"), "monthly");
  renderMoneyList(monthlyExpenseList, finance.monthly.filter((item) => item.type === "expense"), "monthly");
  renderMoneyList(extraMoneyList, finance.extra, "extra");
}

function renderMoneyList(container, items, group) {
  container.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "simple-empty";
    empty.textContent = "Пока пусто";
    container.append(empty);
    return;
  }

  items
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((item) => {
      const row = document.createElement("div");
      row.className = `simple-row ${item.type}`;

      const title = document.createElement("span");
      title.textContent = item.category ? `${item.title} · ${item.category}` : item.title;

      const amount = document.createElement("strong");
      amount.textContent = `${item.type === "income" ? "+" : "-"}${formatMoney(item.amount)}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "x";
      remove.addEventListener("click", () => deleteMoneyItem(group, item.id));

      row.append(title, amount, remove);
      container.append(row);
    });
}

function renderGoals() {
  Object.entries(goalLists).forEach(([horizon, container]) => {
    container.innerHTML = "";
    const goals = (state.goals || []).filter((goal) => goal.horizon === horizon);
    if (!goals.length) {
      const empty = document.createElement("p");
      empty.className = "simple-empty";
      empty.textContent = "Пока пусто";
      container.append(empty);
      return;
    }

    goals
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((goal) => {
        const row = document.createElement("div");
        row.className = "simple-row";

        const title = document.createElement("span");
        title.textContent = goal.title;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "x";
        remove.addEventListener("click", () => deleteGoal(goal.id));

        row.append(title, remove);
        container.append(row);
      });
  });
}

function renderWishes() {
  const wishes = state.wishes || [];
  const active = wishes.filter((wish) => !wish.done);
  const done = wishes.filter((wish) => wish.done);
  const free = Math.max(0, 100 - active.length);

  wishesSummary.textContent =
    activeWishView === "active"
      ? `${active.length}/100 заполнено · свободно ${free}`
      : `Выполнено желаний: ${done.length}`;
  wishForm.hidden = activeWishView !== "active" || active.length >= 100;
  wishTabs.forEach((tab) => {
    tab.classList.toggle("is-selected", tab.dataset.wishView === activeWishView);
  });

  wishList.innerHTML = "";
  const visible = activeWishView === "active" ? active : done;

  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "simple-empty";
    empty.textContent = activeWishView === "active" ? "Пока есть свободные места для желаний." : "Выполненные желания появятся здесь.";
    wishList.append(empty);
    return;
  }

  visible
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((wish) => {
      wishList.append(createWishElement(wish));
    });
}

function createWishElement(wish) {
  const row = document.createElement("div");
  row.className = `wish-row${wish.done ? " is-done" : ""}`;

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = wish.done;
  check.disabled = wish.done;
  check.addEventListener("change", () => completeWish(wish.id));

  const content = document.createElement("div");
  content.className = "wish-content";

  const title = document.createElement("strong");
  title.textContent = wish.title;
  content.append(title);

  const meta = document.createElement("small");
  meta.textContent = wish.done
    ? `Выполнено спустя ${formatDuration(wish.createdAt, wish.completedAt || Date.now())}`
    : `Добавлено ${formatShortDate(wish.createdAt)}`;
  content.append(meta);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "x";
  remove.addEventListener("click", () => deleteWish(wish.id));

  row.append(check, content, remove);
  return row;
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat(activeLang === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDuration(start, end) {
  let startDate = new Date(start);
  const endDate = new Date(end);
  let months = 0;

  while (true) {
    const next = new Date(startDate);
    next.setMonth(next.getMonth() + 1);
    if (next > endDate) break;
    startDate = next;
    months += 1;
  }

  const days = Math.max(0, Math.floor((endDate - startDate) / 86400000));
  const parts = [];
  if (months) parts.push(`${months} ${pluralRu(months, "месяц", "месяца", "месяцев")}`);
  if (days || !parts.length) parts.push(`${days} ${pluralRu(days, "день", "дня", "дней")}`);
  return parts.join(" ");
}

function pluralRu(value, one, few, many) {
  const last = value % 10;
  const lastTwo = value % 100;
  if (last === 1 && lastTwo !== 11) return one;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
  return many;
}

function sumMoney(items, type) {
  return items.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function formatMoney(value) {
  return new Intl.NumberFormat(activeLang === "ru" ? "ru-RU" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function homeTitleText() {
  if (profileName) return profileName;
  return activeLang === "ru" ? "Менеджер" : "Manager";
}

function renderStaticText() {
  const text = copy();
  document.title = text.appTitle;
  document.querySelector("h1").textContent =
    activeModule === "home" ? (activeLang === "ru" ? "Менеджер" : "Manager") : text.appTitle;
  taskInput.placeholder = text.addPlaceholder;
  document.querySelector(".add-label").textContent = text.addButton;
  clearDone.textContent = text.clearDone;
  settingsButton.setAttribute("aria-label", text.settings);
  settingsButton.title = text.settings;
  themeTitle.textContent = text.themeTitle;
  languageTitle.textContent = text.languageTitle;
  cleanupTitle.textContent = text.cleanupTitle;
  habitInput.placeholder = habitText().placeholder;
  habitColorLabel.textContent = habitText().color;
  habitAddLabel.textContent = habitText().add;

  tabs.forEach((tab) => {
    tab.querySelector(".tab-label").textContent = text.views[tab.dataset.plan].title;
  });

  planCards.forEach((card) => {
    const plan = card.dataset.planCard;
    card.querySelector("strong").textContent = text.views[plan].title;
  });

  themeChoices.forEach((button) => {
    button.querySelector("span:last-child").textContent = text.themes[button.dataset.theme];
  });
}

function renderSettingsState() {
  themeChoices.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.theme === activeTheme);
  });
  langChoices.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.lang === activeLang);
  });
  profileNameTitle.textContent = activeLang === "ru" ? "Имя" : "Name";
  profileNameInput.placeholder = activeLang === "ru" ? "Твое имя" : "Your name";
  if (profileNameInput.value !== profileName) {
    profileNameInput.value = profileName;
  }
}

function renderHabits() {
  if (activePlan !== "habits") return;

  const text = habitText();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = todayISO();

  habitList.innerHTML = "";
  habitForm.hidden = Boolean(selectedHabitId);

  if (!state.habits.length) {
    const empty = document.createElement("div");
    empty.className = "habit-empty";
    empty.textContent = text.empty;
    habitList.append(empty);
    return;
  }

  const selectedHabit = state.habits.find((habit) => habit.id === selectedHabitId);
  if (selectedHabit) {
    habitList.append(createHabitDetailElement(selectedHabit, year, month, today));
    return;
  }

  const title = document.createElement("div");
  title.className = "habit-section-title";
  title.textContent = text.title;
  habitList.append(title);

  state.habits
    .slice()
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach((habit) => {
      habitList.append(createHabitListItem(habit, today));
    });
}

function createHabitListItem(habit, today) {
  const text = habitText();
  const item = document.createElement("article");
  item.className = "habit-row";
  item.style.setProperty("--habit-color", habit.color);

  const check = document.createElement("button");
  check.className = "habit-check";
  check.type = "button";
  check.classList.toggle("is-checked", isHabitChecked(habit.id, today));
  check.setAttribute("aria-label", isHabitChecked(habit.id, today) ? text.unmarkToday : text.markToday);
  check.addEventListener("click", async () => {
    await toggleHabitCheck(habit.id, today, { openDetail: true });
  });

  const title = document.createElement("button");
  title.className = "habit-row-title";
  title.type = "button";
  title.textContent = habit.title;
  title.addEventListener("click", () => {
    selectedHabitId = habit.id;
    render();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "habit-delete";
  deleteButton.type = "button";
  deleteButton.title = text.delete;
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", () => deleteHabit(habit.id));

  item.append(check, title, deleteButton);
  return item;
}

function createHabitDetailElement(habit, year, month, today) {
  const text = habitText();
  const card = document.createElement("article");
  card.className = "habit-card";
  card.style.setProperty("--habit-color", habit.color);

  const backButton = document.createElement("button");
  backButton.className = "habit-back";
  backButton.type = "button";
  backButton.textContent = `← ${text.back}`;
  backButton.addEventListener("click", () => {
    selectedHabitId = null;
    render();
  });

  const head = document.createElement("div");
  head.className = "habit-head";

  const titleWrap = document.createElement("div");
  titleWrap.className = "habit-title-wrap";

  const dot = document.createElement("span");
  dot.className = "habit-dot";

  const title = document.createElement("h3");
  title.textContent = habit.title;

  titleWrap.append(dot, title);

  const actions = document.createElement("div");
  actions.className = "habit-actions";

  const todayButton = document.createElement("button");
  todayButton.className = "habit-today";
  todayButton.type = "button";
  todayButton.textContent = isHabitChecked(habit.id, today) ? text.doneToday : text.today;
  todayButton.title = isHabitChecked(habit.id, today) ? text.unmarkToday : text.markToday;
  todayButton.classList.toggle("is-checked", isHabitChecked(habit.id, today));
  todayButton.addEventListener("click", () => toggleHabitCheck(habit.id, today));

  const deleteButton = document.createElement("button");
  deleteButton.className = "habit-delete";
  deleteButton.type = "button";
  deleteButton.title = text.delete;
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", () => deleteHabit(habit.id));

  actions.append(todayButton, deleteButton);
  head.append(titleWrap, actions);

  const monthBlock = document.createElement("div");
  monthBlock.className = "habit-block";

  const monthTitle = document.createElement("div");
  monthTitle.className = "habit-block-title";
  monthTitle.textContent = `${text.month}: ${formatMonthName(year, month)}`;

  const monthGrid = document.createElement("div");
  monthGrid.className = "habit-month-grid";
  const days = daysInMonth(year, month);
  for (let day = 1; day <= days; day += 1) {
    const date = dateISO(year, month, day);
    monthGrid.append(createHabitDay(habit.id, date, day, date === today));
  }

  monthBlock.append(monthTitle, monthGrid);

  const yearBlock = document.createElement("div");
  yearBlock.className = "habit-block";

  const yearTitle = document.createElement("div");
  yearTitle.className = "habit-block-title";
  yearTitle.textContent = `${text.year}: ${year}`;

  const yearGrid = document.createElement("div");
  yearGrid.className = "habit-year-grid";
  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    yearGrid.append(createHabitMonthCell(habit.id, year, monthIndex));
  }

  yearBlock.append(yearTitle, yearGrid);
  card.append(backButton, head, monthBlock, yearBlock);
  return card;
}

function createHabitDay(habitId, date, day, isToday) {
  const button = document.createElement("button");
  button.className = "habit-day";
  button.type = "button";
  button.textContent = day;
  button.classList.toggle("is-checked", isHabitChecked(habitId, date));
  button.classList.toggle("is-today", isToday);
  button.setAttribute("aria-label", date);
  button.addEventListener("click", () => toggleHabitCheck(habitId, date));
  return button;
}

function createHabitMonthCell(habitId, year, monthIndex) {
  const cell = document.createElement("div");
  cell.className = "habit-month-cell";
  const days = daysInMonth(year, monthIndex);
  let completed = 0;
  for (let day = 1; day <= days; day += 1) {
    if (isHabitChecked(habitId, dateISO(year, monthIndex, day))) completed += 1;
  }
  const ratio = completed / days;
  cell.style.opacity = String(Math.max(0.22, ratio || 0.12));
  cell.title = `${completed}/${days}`;
  cell.textContent = String(monthIndex + 1);
  return cell;
}

function isHabitChecked(habitId, date) {
  return state.habitChecks.some((check) => check.habitId === habitId && check.date === date);
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.done ? " is-done" : ""}`;

  const check = document.createElement("input");
  check.className = "task-check";
  check.type = "checkbox";
  check.checked = task.done;
  check.setAttribute("aria-label", `Отметить задачу "${task.title}"`);
  check.addEventListener("change", () => toggleTask(task.id));

  const content = document.createElement("div");
  content.className = "task-content";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = task.title;
  content.append(title);

  if (activePlan === "completed") {
    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = `${copy().completedAt}: ${formatCompletedDate(task.completedAt || task.createdAt)}`;
    content.append(meta);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.className = "task-action";
  editButton.type = "button";
  editButton.title = copy().editTitle;
  editButton.textContent = copy().edit;
  editButton.addEventListener("click", () => editTask(task.id));

  const deleteButton = document.createElement("button");
  deleteButton.className = "task-action delete";
  deleteButton.type = "button";
  deleteButton.title = copy().deleteTitle;
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  actions.append(editButton, deleteButton);
  item.append(check, content, actions);
  return item;
}

function formatCompletedDate(value) {
  return new Intl.DateTimeFormat(activeLang === "ru" ? "ru-RU" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

async function toggleTask(id) {
  const target = state.tasks.find((task) => task.id === id);
  if (!target) return;
  const nextDone = !target.done;
  const completedAt = nextDone ? Date.now() : null;

  state.tasks = state.tasks.map((task) =>
    task.id === id ? { ...task, done: nextDone, completedAt } : task,
  );

  if (db) {
    const { error } = await db
      .from("tasks")
      .update({ done: nextDone, completed_at: completedAt ? new Date(completedAt).toISOString() : null })
      .eq("id", id);
    if (error) console.warn("Could not update task", error);
  } else {
    saveState();
  }

  render();
}

async function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);

  if (db) {
    const { error } = await db.from("tasks").delete().eq("id", id);
    if (error) console.warn("Could not delete task", error);
  } else {
    saveState();
  }

  render();
}

async function editTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  const nextTitle = prompt("Изменить задачу", task.title);
  if (!nextTitle || !nextTitle.trim()) return;

  task.title = nextTitle.trim();

  if (db) {
    const { error } = await db.from("tasks").update({ title: task.title }).eq("id", id);
    if (error) console.warn("Could not edit task", error);
  } else {
    saveState();
  }

  render();
}

async function addHabit(title, color) {
  const habit = createHabit(title, color);
  state.habits.push(habit);

  if (db) {
    const { data, error } = await db
      .from("habits")
      .insert({ title: habit.title, color: habit.color })
      .select("id,created_at")
      .single();

    if (error) {
      console.warn("Could not add habit", error);
    } else {
      habit.id = data.id;
      habit.createdAt = new Date(data.created_at).getTime();
    }
  } else {
    saveState();
  }

  render();
}

async function deleteHabit(id) {
  state.habits = state.habits.filter((habit) => habit.id !== id);
  state.habitChecks = state.habitChecks.filter((check) => check.habitId !== id);
  if (selectedHabitId === id) selectedHabitId = null;

  if (db) {
    const { error } = await db.from("habits").delete().eq("id", id);
    if (error) console.warn("Could not delete habit", error);
  } else {
    saveState();
  }

  render();
}

async function toggleHabitCheck(habitId, date, options = {}) {
  const exists = isHabitChecked(habitId, date);

  if (exists) {
    state.habitChecks = state.habitChecks.filter(
      (check) => !(check.habitId === habitId && check.date === date),
    );
  } else {
    state.habitChecks.push({ habitId, date, createdAt: Date.now() });
  }

  if (db) {
    const request = exists
      ? db.from("habit_checks").delete().eq("habit_id", habitId).eq("check_date", date)
      : db.from("habit_checks").insert({ habit_id: habitId, check_date: date });
    const { error } = await request;
    if (error) console.warn("Could not update habit check", error);
  } else {
    saveState();
  }

  if (options.openDetail) selectedHabitId = habitId;
  render();
}

function addMoneyItem(group, type, title, amount, category = "") {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return;

  if (!state.finance) state.finance = createEmptyFinance();
  state.finance[group].push({
    id: crypto.randomUUID(),
    title: title.trim() || (type === "income" ? "Доход" : "Расход"),
    amount: value,
    type,
    category: type === "expense" ? category : "",
    createdAt: Date.now(),
  });
  saveModuleState();
  render();
}

function deleteMoneyItem(group, id) {
  if (!state.finance) return;
  state.finance[group] = state.finance[group].filter((item) => item.id !== id);
  saveModuleState();
  render();
}

function addGoal(title, horizon) {
  state.goals.push({
    id: crypto.randomUUID(),
    title: title.trim(),
    horizon,
    createdAt: Date.now(),
  });
  saveModuleState();
  render();
}

function deleteGoal(id) {
  state.goals = state.goals.filter((goal) => goal.id !== id);
  saveModuleState();
  render();
}

function addWish(title) {
  const activeCount = (state.wishes || []).filter((wish) => !wish.done).length;
  if (activeCount >= 100) return;

  state.wishes.push({
    id: crypto.randomUUID(),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
    completedAt: null,
  });
  saveModuleState();
  render();
}

function completeWish(id) {
  state.wishes = state.wishes.map((wish) =>
    wish.id === id ? { ...wish, done: true, completedAt: Date.now() } : wish,
  );
  activeWishView = "done";
  saveModuleState();
  render();
}

function deleteWish(id) {
  state.wishes = state.wishes.filter((wish) => wish.id !== id);
  saveModuleState();
  render();
}

async function logout() {
  forceAuth = true;
  localStorage.setItem(FORCE_AUTH_KEY, "1");
  currentUser = null;
  activeModule = "home";
  activePlan = "today";
  activeWorkPlan = "today";
  selectedHabitId = null;
  activeWishView = "active";
  state = createEmptyState();
  authMessage.textContent = "";
  authPassword.value = "";
  render();

  if (!db) return;
  const { error } = await db.auth.signOut();
  if (error) console.warn("Could not sign out cleanly", error);
}

function handleLogoutClick(event) {
  event.stopPropagation();
  logout();
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  const task = createTask(title);
  state.tasks.unshift(task);

  if (db) {
    const { data, error } = await db
      .from("tasks")
      .insert({ title: task.title, plan: task.plan, done: task.done })
      .select("id,created_at")
      .single();

    if (error) {
      console.warn("Could not add task", error);
    } else {
      task.id = data.id;
      task.createdAt = new Date(data.created_at).getTime();
    }
  } else {
    saveState();
  }

  taskForm.reset();
  taskInput.focus();
  render();
});

habitForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = habitInput.value.trim();
  if (!title) return;

  await addHabit(title, habitColor.value);
  habitForm.reset();
  habitColor.value = "#67c22f";
  habitInput.focus();
});

financeFormButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.financeForm}`);
    const willOpen = target.hidden;
    financeEntryForms.forEach((form) => {
      form.hidden = true;
    });
    target.hidden = !willOpen;
    button.blur();
  });
});

monthlyIncomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMoneyItem("monthly", "income", document.querySelector("#monthlyIncomeTitle").value, document.querySelector("#monthlyIncomeAmount").value);
  monthlyIncomeForm.reset();
  monthlyIncomeForm.hidden = true;
});

monthlyExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMoneyItem(
    "monthly",
    "expense",
    document.querySelector("#monthlyExpenseTitle").value,
    document.querySelector("#monthlyExpenseAmount").value,
  );
  monthlyExpenseForm.reset();
  monthlyExpenseForm.hidden = true;
});

quickIncomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMoneyItem("extra", "income", document.querySelector("#quickIncomeNote").value || "Дополнительный доход", document.querySelector("#quickIncomeAmount").value);
  quickIncomeForm.reset();
  quickIncomeForm.hidden = true;
});

quickExpenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMoneyItem(
    "extra",
    "expense",
    document.querySelector("#quickExpenseNote").value || "Дополнительный расход",
    document.querySelector("#quickExpenseAmount").value,
    document.querySelector("#quickExpenseCategory").value,
  );
  quickExpenseForm.reset();
  quickExpenseForm.hidden = true;
});

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addGoal(document.querySelector("#goalTitle").value, document.querySelector("#goalHorizon").value);
  goalForm.reset();
});

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addWish(wishInput.value);
  wishForm.reset();
  wishInput.focus();
});

wishTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeWishView = tab.dataset.wishView;
    render();
    tab.blur();
  });
});

wishCloud.addEventListener("pointerdown", (event) => {
  if (event.button !== undefined && event.button !== 0) return;

  const rect = wishCloud.getBoundingClientRect();
  wishCloudDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    moved: false,
  };

  wishCloud.classList.add("is-dragging");
  if (typeof wishCloud.setPointerCapture === "function") {
    wishCloud.setPointerCapture(event.pointerId);
  }
});

wishCloud.addEventListener("pointermove", (event) => {
  if (!wishCloudDrag || event.pointerId !== wishCloudDrag.pointerId) return;

  const nextX = event.clientX - wishCloudDrag.offsetX;
  const nextY = event.clientY - wishCloudDrag.offsetY;
  const deltaX = event.clientX - wishCloudDrag.startX;
  const deltaY = event.clientY - wishCloudDrag.startY;

  if (!wishCloudDrag.moved && Math.hypot(deltaX, deltaY) > 6) {
    wishCloudDrag.moved = true;
  }

  if (!wishCloudDrag.moved) return;

  event.preventDefault();
  wishCloudPosition = clampWishCloudPosition(nextX, nextY);
  applyWishCloudPosition();
});

wishCloud.addEventListener("pointerup", (event) => {
  if (!wishCloudDrag || event.pointerId !== wishCloudDrag.pointerId) return;

  const moved = wishCloudDrag.moved;
  if (typeof wishCloud.releasePointerCapture === "function") {
    wishCloud.releasePointerCapture(event.pointerId);
  }

  wishCloud.classList.remove("is-dragging");
  wishCloudDrag = null;

  if (moved) {
    wishCloudSuppressClickUntil = Date.now() + 250;
    saveWishCloudPosition();
  }
});

wishCloud.addEventListener("pointercancel", () => {
  wishCloud.classList.remove("is-dragging");
  wishCloudDrag = null;
});

wishCloud.addEventListener("click", () => {
  if (Date.now() < wishCloudSuppressClickUntil) return;
  activeModule = "wishes";
  render();
  wishCloud.blur();
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!db) return;

  const identity = getAuthIdentity();
  if (identity.error) {
    authMessage.textContent = identity.error;
    return;
  }

  authMessage.textContent = "Входим...";
  const { error } = await db.auth.signInWithPassword({
    email: identity.email,
    password: authPassword.value,
  });
  if (error) {
    authMessage.textContent = "Логин или пароль не подошли.";
    return;
  }

  forceAuth = false;
  localStorage.removeItem(FORCE_AUTH_KEY);
  authMessage.textContent = "";
});

signupButton.addEventListener("click", async () => {
  if (!db) return;

  const identity = getAuthIdentity();
  if (identity.error) {
    authMessage.textContent = identity.error;
    return;
  }

  authMessage.textContent = "Создаем аккаунт...";
  const { data, error } = await db.auth.signUp({
    email: identity.email,
    password: authPassword.value,
    options: {
      data: {
        login: identity.login,
      },
    },
  });
  if (error) {
    authMessage.textContent = error.message;
    return;
  }

  if (!data.session) {
    const { error: loginError } = await db.auth.signInWithPassword({
      email: identity.email,
      password: authPassword.value,
    });
    if (!loginError) {
      forceAuth = false;
      localStorage.removeItem(FORCE_AUTH_KEY);
    }
    authMessage.textContent = loginError
      ? "Аккаунт создан, но Supabase просит подтверждение email. В Auth отключи Confirm email."
      : "";
    return;
  }

  forceAuth = false;
  localStorage.removeItem(FORCE_AUTH_KEY);
  authMessage.textContent = "";
});

logoutButton.addEventListener("click", handleLogoutClick);

if (typeof document.addEventListener === "function") {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target && typeof target.closest === "function" && target.closest("#logoutButton")) {
      logout();
    }
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openPlan(tab.dataset.plan);
    tab.blur();
  });
});

settingsButton.addEventListener("click", () => {
  activeModule = "planner";
  openPlan("settings");
  settingsButton.blur();
});

profileNameInput.addEventListener("input", () => {
  profileName = profileNameInput.value.trim().slice(0, 32);
  if (profileName) {
    localStorage.setItem(PROFILE_NAME_KEY, profileName);
  } else {
    localStorage.removeItem(PROFILE_NAME_KEY);
  }
  document.querySelector("h1").textContent = activeModule === "home" ? homeTitleText() : copy().appTitle;
});

moduleCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModule(card.dataset.module);
    card.blur();
  });
});

moduleBacks.forEach((button) => {
  button.addEventListener("click", () => {
    openHome();
    button.blur();
  });
});

quoteNext.addEventListener("click", () => {
  const nextOffset = Number(localStorage.getItem(QUOTE_OFFSET_KEY) || 0) + 1;
  localStorage.setItem(QUOTE_OFFSET_KEY, String(nextOffset));
  renderDailyQuote();
  quoteNext.blur();
});

planCards.forEach((card) => {
  card.addEventListener("click", () => {
    openPlan(card.dataset.planCard);
    card.blur();
  });
});

themeChoices.forEach((button) => {
  button.addEventListener("click", () => {
    activeTheme = button.dataset.theme;
    localStorage.setItem(THEME_KEY, activeTheme);
    applyPreferences();
    render();
  });
});

langChoices.forEach((button) => {
  button.addEventListener("click", () => {
    activeLang = button.dataset.lang;
    localStorage.setItem(LANG_KEY, activeLang);
    applyPreferences();
    render();
  });
});

clearDone.addEventListener("click", async () => {
  const doneIds = state.tasks.filter((task) => task.done).map((task) => task.id);
  state.tasks = state.tasks.filter((task) => !task.done);

  if (db && doneIds.length) {
    const { error } = await db.from("tasks").delete().in("id", doneIds);
    if (error) console.warn("Could not clear completed tasks", error);
  } else {
    saveState();
  }

  render();
});
