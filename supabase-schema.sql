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

drop policy if exists "Public read tasks" on public.tasks;
create policy "Public read tasks"
on public.tasks for select
to anon
using (true);

drop policy if exists "Public insert tasks" on public.tasks;
create policy "Public insert tasks"
on public.tasks for insert
to anon
with check (true);

drop policy if exists "Public update tasks" on public.tasks;
create policy "Public update tasks"
on public.tasks for update
to anon
using (true)
with check (true);

drop policy if exists "Public delete tasks" on public.tasks;
create policy "Public delete tasks"
on public.tasks for delete
to anon
using (true);

drop policy if exists "Public read habits" on public.habits;
create policy "Public read habits"
on public.habits for select
to anon
using (true);

drop policy if exists "Public insert habits" on public.habits;
create policy "Public insert habits"
on public.habits for insert
to anon
with check (true);

drop policy if exists "Public update habits" on public.habits;
create policy "Public update habits"
on public.habits for update
to anon
using (true)
with check (true);

drop policy if exists "Public delete habits" on public.habits;
create policy "Public delete habits"
on public.habits for delete
to anon
using (true);

drop policy if exists "Public read habit checks" on public.habit_checks;
create policy "Public read habit checks"
on public.habit_checks for select
to anon
using (true);

drop policy if exists "Public insert habit checks" on public.habit_checks;
create policy "Public insert habit checks"
on public.habit_checks for insert
to anon
with check (true);

drop policy if exists "Public delete habit checks" on public.habit_checks;
create policy "Public delete habit checks"
on public.habit_checks for delete
to anon
using (true);
