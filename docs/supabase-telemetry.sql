-- Run this once in the Supabase SQL editor for the BRIDGE project.
-- It stores anonymous, non-sensitive product events and signed-in learner events.
-- Practice Lab answers, email addresses, and passwords are never included.

create table if not exists public.product_events (
  id bigint generated always as identity primary key,
  user_id uuid default auth.uid() references auth.users(id) on delete set null,
  session_id uuid,
  event_name text not null check (char_length(event_name) between 1 and 80),
  route text,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists product_events_created_at_idx
on public.product_events (created_at desc);

create index if not exists product_events_event_name_idx
on public.product_events (event_name);

alter table public.product_events enable row level security;

drop policy if exists "Visitors can record product events" on public.product_events;
create policy "Visitors can record product events"
on public.product_events
for insert
to anon, authenticated
with check (user_id is null or user_id = (select auth.uid()));

-- Intentionally no browser-facing SELECT policy. Review results in the Supabase
-- dashboard or through a server-side reporting tool with elevated credentials.

-- Useful dashboard queries:
-- select event_name, count(*) from public.product_events
-- where created_at >= now() - interval '30 days'
-- group by event_name order by count(*) desc;

-- select properties->>'cardId' as card_id,
--        properties->>'rating' as rating,
--        count(*)
-- from public.product_events
-- where event_name = 'card_feedback_submitted'
-- group by card_id, rating order by card_id, rating;

-- select route, properties->>'message' as message, count(*)
-- from public.product_events
-- where event_name = 'app_error'
-- group by route, message order by count(*) desc;
