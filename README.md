# Simple Plans Tracker

Минималистичный трекер задач с планами на сегодня, завтра, неделю, месяц и год.

## Supabase

1. Создай проект в Supabase.
2. Открой SQL Editor и выполни `supabase-schema.sql`.
3. Скопируй `Project URL` и `anon public` key.

## Render

1. Создай Web Service или Blueprint из этого репозитория.
2. Для Blueprint используй `render.yaml`.
3. Добавь переменные окружения:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

При сборке Render выполнит `npm run build` и создаст папку `dist`.

## Cloudflare Pages

Подключи GitHub-репозиторий и укажи:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: пусто

Environment variables:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Если Cloudflare деплоит проект как Worker, `wrangler.toml` уже указывает assets directory `./dist`.

## Local

```bash
npm run build
npm start
```

Если Supabase ключи пустые, приложение работает через `localStorage`.
