const STORAGE_KEY = "simple-plans-v2";
const OLD_STORAGE_KEY = "codex-todo-tracker-v1";
const LAST_OPENED_KEY = "simple-plans-last-opened";
const THEME_KEY = "simple-plans-theme";
const LANG_KEY = "simple-plans-lang";

const PLAN_KEYS = ["today", "tomorrow", "week", "month", "year"];
const PLANS = Object.fromEntries(PLAN_KEYS.map((plan) => [plan, true]));
const THEMES = [
  "palette1",
  "palette2",
  "palette3",
  "palette4",
  "palette5",
  "palette6",
  "palette7",
  "palette8",
];
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
      palette1: "Схема 1",
      palette2: "Схема 2",
      palette3: "Схема 3",
      palette4: "Схема 4",
      palette5: "Схема 5",
      palette6: "Схема 6",
      palette7: "Схема 7",
      palette8: "Схема 8",
    },
    views: {
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
      palette1: "Scheme 1",
      palette2: "Scheme 2",
      palette3: "Scheme 3",
      palette4: "Scheme 4",
      palette5: "Scheme 5",
      palette6: "Scheme 6",
      palette7: "Scheme 7",
      palette8: "Scheme 8",
    },
    views: {
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

const taskForm = document.querySelector("#taskForm");
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
const themeChoices = document.querySelectorAll(".theme-choice");
const langChoices = document.querySelectorAll(".lang-choice");
const themeTitle = document.querySelector("#themeTitle");
const languageTitle = document.querySelector("#languageTitle");
const cleanupTitle = document.querySelector("#cleanupTitle");

let activePlan = "today";
let state = createEmptyState();
let db = null;
let activeTheme = loadPreference(THEME_KEY, THEMES, "palette1");
let activeLang = loadPreference(LANG_KEY, LANGS, "ru");

init();

async function init() {
  applyPreferences();
  db = createSupabaseClient();
  state = db ? await loadRemoteState() : loadLocalState();
  await rollTomorrowIntoToday();
  render();
}

function copy() {
  return COPY[activeLang];
}

function loadPreference(key, allowed, fallback) {
  const saved = localStorage.getItem(key);
  return allowed.includes(saved) ? saved : fallback;
}

function applyPreferences() {
  document.documentElement.dataset.theme = activeTheme;
  document.documentElement.lang = activeLang;
}

function createSupabaseClient() {
  const config = window.APP_CONFIG || {};
  const url = config.SUPABASE_URL;
  const key = config.SUPABASE_ANON_KEY;

  if (!url || !key || !window.supabase) return null;
  return window.supabase.createClient(url, key);
}

function createEmptyState() {
  return {
    lastOpened: todayISO(),
    tasks: [],
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
  };
}

function normalizeState(value) {
  const tasks = Array.isArray(value.tasks) ? value.tasks : [];
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

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function tasksFor(plan) {
  return state.tasks.filter((task) => task.plan === plan);
}

function tasksForActiveView() {
  if (activePlan === "completed") return state.tasks.filter((task) => task.done);
  return tasksFor(activePlan).filter((task) => !task.done);
}

function openPlan(plan) {
  activePlan = plan;
  render();
}

function render() {
  const current = copy().views[activePlan];
  const visibleTasks = tasksForActiveView().sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  dateLine.textContent = readableDate();
  planTitle.textContent = current.title;
  planHint.textContent = current.hint;
  emptyHint.textContent = current.empty;
  taskForm.hidden = activePlan === "completed" || activePlan === "settings";
  taskList.hidden = activePlan === "settings";
  emptyState.hidden = activePlan === "settings";
  settingsPanel.hidden = activePlan !== "settings";
  renderStaticText();

  tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.plan === activePlan));
  planCards.forEach((card) => {
    const plan = card.dataset.planCard;
    card.classList.toggle("is-current", plan === activePlan);
    card.querySelector("span").textContent = tasksFor(plan).filter((task) => !task.done).length;
  });

  if (activePlan !== "settings") {
    taskList.innerHTML = "";
    visibleTasks.forEach((task) => taskList.append(createTaskElement(task)));
    emptyState.classList.toggle("is-visible", visibleTasks.length === 0);
  }
  renderSettingsState();
}

function renderStaticText() {
  const text = copy();
  document.title = text.appTitle;
  document.querySelector("h1").textContent = text.appTitle;
  taskInput.placeholder = text.addPlaceholder;
  document.querySelector(".add-button").textContent = text.addButton;
  clearDone.textContent = text.clearDone;
  themeTitle.textContent = text.themeTitle;
  languageTitle.textContent = text.languageTitle;
  cleanupTitle.textContent = text.cleanupTitle;

  tabs.forEach((tab) => {
    tab.textContent = text.views[tab.dataset.plan].title;
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

tabs.forEach((tab) => {
  tab.addEventListener("click", () => openPlan(tab.dataset.plan));
});

planCards.forEach((card) => {
  card.addEventListener("click", () => openPlan(card.dataset.planCard));
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
