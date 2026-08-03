-- Run this once in the Supabase SQL editor for the BRIDGE project.
-- It creates one private progress document per authenticated learner.

create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;

drop policy if exists "Learners can read their own progress" on public.learning_progress;
create policy "Learners can read their own progress"
on public.learning_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Learners can create their own progress" on public.learning_progress;
create policy "Learners can create their own progress"
on public.learning_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Learners can update their own progress" on public.learning_progress;
create policy "Learners can update their own progress"
on public.learning_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- A normalized answer table makes submitted Practice Lab work easy to review
-- and export as CSV/Excel without unpacking the progress document.
create table if not exists public.practice_responses (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  collection_id text not null,
  card_title text not null,
  answer text not null check (char_length(answer) between 1 and 12000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index if not exists practice_responses_updated_at_idx
on public.practice_responses (updated_at desc);

alter table public.practice_responses enable row level security;

drop policy if exists "Learners can read their own answers" on public.practice_responses;
create policy "Learners can read their own answers"
on public.practice_responses
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Learners can create their own answers" on public.practice_responses;
create policy "Learners can create their own answers"
on public.practice_responses
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Learners can update their own answers" on public.practice_responses;
create policy "Learners can update their own answers"
on public.practice_responses
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- One reviewable row per learner and Journey Card. The feedback also remains
-- inside learning_progress so a learner's full account state stays portable.
create table if not exists public.card_feedback (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  collection_id text not null,
  card_title text not null,
  rating text not null check (rating in ('Yes', 'Partly', 'No')),
  reason text,
  note text check (note is null or char_length(note) <= 400),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index if not exists card_feedback_updated_at_idx
on public.card_feedback (updated_at desc);

alter table public.card_feedback enable row level security;

drop policy if exists "Learners can read their own feedback" on public.card_feedback;
create policy "Learners can read their own feedback"
on public.card_feedback
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Learners can create their own feedback" on public.card_feedback;
create policy "Learners can create their own feedback"
on public.card_feedback
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Learners can update their own feedback" on public.card_feedback;
create policy "Learners can update their own feedback"
on public.card_feedback
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Run this query in the SQL editor, then download the result as CSV. Excel and
-- Google Sheets can open the exported file directly.
-- select u.email, p.card_id, p.collection_id, p.card_title, p.answer, p.updated_at
-- from public.practice_responses p
-- join auth.users u on u.id = p.user_id
-- order by p.updated_at desc;
