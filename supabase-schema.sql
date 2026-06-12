create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  plan text not null check (plan in ('today', 'tomorrow', 'week', 'month', 'year')),
  done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  color text not null default '#67c22f' check (color ~ '^#[0-9A-Fa-f]{6}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.habit_checks (
  habit_id uuid not null references public.habits(id) on delete cascade,
  check_date date not null,
  created_at timestamptz not null default now(),
  primary key (habit_id, check_date)
);

alter table public.tasks
add column if not exists completed_at timestamptz;

alter table public.tasks
add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid();

alter table public.habits
add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid();

alter table public.habit_checks
add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid();

create table if not exists public.module_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

drop trigger if exists habits_set_updated_at on public.habits;
create trigger habits_set_updated_at
before update on public.habits
for each row
execute function public.set_updated_at();

alter table public.tasks enable row level security;
alter table public.habits enable row level security;
alter table public.habit_checks enable row level security;
alter table public.module_state enable row level security;

drop policy if exists "Public read tasks" on public.tasks;
drop policy if exists "Users read own tasks" on public.tasks;
create policy "Users read own tasks"
on public.tasks for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public insert tasks" on public.tasks;
drop policy if exists "Users insert own tasks" on public.tasks;
create policy "Users insert own tasks"
on public.tasks for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Public update tasks" on public.tasks;
drop policy if exists "Users update own tasks" on public.tasks;
create policy "Users update own tasks"
on public.tasks for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Public delete tasks" on public.tasks;
drop policy if exists "Users delete own tasks" on public.tasks;
create policy "Users delete own tasks"
on public.tasks for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public read habits" on public.habits;
drop policy if exists "Users read own habits" on public.habits;
create policy "Users read own habits"
on public.habits for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public insert habits" on public.habits;
drop policy if exists "Users insert own habits" on public.habits;
create policy "Users insert own habits"
on public.habits for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Public update habits" on public.habits;
drop policy if exists "Users update own habits" on public.habits;
create policy "Users update own habits"
on public.habits for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Public delete habits" on public.habits;
drop policy if exists "Users delete own habits" on public.habits;
create policy "Users delete own habits"
on public.habits for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public read habit checks" on public.habit_checks;
drop policy if exists "Users read own habit checks" on public.habit_checks;
create policy "Users read own habit checks"
on public.habit_checks for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public insert habit checks" on public.habit_checks;
drop policy if exists "Users insert own habit checks" on public.habit_checks;
create policy "Users insert own habit checks"
on public.habit_checks for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Public delete habit checks" on public.habit_checks;
drop policy if exists "Users delete own habit checks" on public.habit_checks;
create policy "Users delete own habit checks"
on public.habit_checks for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users read own module state" on public.module_state;
create policy "Users read own module state"
on public.module_state for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users upsert own module state" on public.module_state;
create policy "Users upsert own module state"
on public.module_state for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users update own module state" on public.module_state;
create policy "Users update own module state"
on public.module_state for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
