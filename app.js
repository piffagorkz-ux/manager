const STORAGE_KEY = "simple-plans-v2";
const OLD_STORAGE_KEY = "codex-todo-tracker-v1";
const LAST_OPENED_KEY = "simple-plans-last-opened";
const THEME_KEY = "simple-plans-theme";
const LANG_KEY = "simple-plans-lang";

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
    month: "Month",
    year: "Year",
    empty: "Add your first habit, for example: 2 liters of water.",
    delete: "Delete",
    completed: "days",
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
const settingsButton = document.querySelector("#settingsButton");

let activePlan = "today";
let activeWorkPlan = "today";
let state = createEmptyState();
let db = null;
let activeTheme = loadPreference(THEME_KEY, THEMES, "scheme1", THEME_ALIASES);
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
    habits: [],
    habitChecks: [],
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
  };
}

function normalizeState(value) {
  const tasks = Array.isArray(value.tasks) ? value.tasks : [];
  const habits = Array.isArray(value.habits) ? value.habits : [];
  const habitChecks = Array.isArray(value.habitChecks) ? value.habitChecks : [];
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
  }
  render();
}

function topModeFor(plan) {
  if (plan === "completed") return "completed";
  if (plan === "habits") return "habits";
  return "work";
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
  taskForm.hidden = activePlan === "completed" || activePlan === "settings" || activePlan === "habits";
  taskList.hidden = activePlan === "settings" || activePlan === "habits";
  emptyState.hidden = activePlan === "settings" || activePlan === "habits";
  settingsPanel.hidden = activePlan !== "settings";
  habitsPanel.hidden = activePlan !== "habits";
  renderStaticText();

  tabs.forEach((tab) => {
    const tabPlan = tab.dataset.plan;
    tab.classList.toggle("is-active", tabPlan === topModeFor(activePlan));
  });
  settingsButton.classList.toggle("is-active", activePlan === "settings");
  planCards.forEach((card) => {
    const plan = card.dataset.planCard;
    card.classList.toggle("is-current", plan === activePlan);
    card.querySelector("span").textContent = tasksFor(plan).filter((task) => !task.done).length;
  });

  if (activePlan !== "settings" && activePlan !== "habits") {
    taskList.innerHTML = "";
    visibleTasks.forEach((task) => taskList.append(createTaskElement(task)));
    emptyState.classList.toggle("is-visible", visibleTasks.length === 0);
  }
  renderHabits();
  renderSettingsState();
}

function renderStaticText() {
  const text = copy();
  document.title = text.appTitle;
  document.querySelector("h1").textContent = text.appTitle;
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
}

function renderHabits() {
  if (activePlan !== "habits") return;

  const text = habitText();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = todayISO();

  habitList.innerHTML = "";

  if (!state.habits.length) {
    const empty = document.createElement("div");
    empty.className = "habit-empty";
    empty.textContent = text.empty;
    habitList.append(empty);
    return;
  }

  state.habits
    .slice()
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach((habit) => {
      habitList.append(createHabitElement(habit, year, month, today));
    });
}

function createHabitElement(habit, year, month, today) {
  const text = habitText();
  const card = document.createElement("article");
  card.className = "habit-card";
  card.style.setProperty("--habit-color", habit.color);

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
  card.append(head, monthBlock, yearBlock);
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

  if (db) {
    const { error } = await db.from("habits").delete().eq("id", id);
    if (error) console.warn("Could not delete habit", error);
  } else {
    saveState();
  }

  render();
}

async function toggleHabitCheck(habitId, date) {
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

habitForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = habitInput.value.trim();
  if (!title) return;

  await addHabit(title, habitColor.value);
  habitForm.reset();
  habitColor.value = "#67c22f";
  habitInput.focus();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openPlan(tab.dataset.plan);
    tab.blur();
  });
});

settingsButton.addEventListener("click", () => {
  openPlan("settings");
  settingsButton.blur();
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
