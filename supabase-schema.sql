create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  plan text not null check (plan in ('today', 'tomorrow', 'week', 'month', 'year')),
  done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

alter table public.tasks enable row level security;

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
