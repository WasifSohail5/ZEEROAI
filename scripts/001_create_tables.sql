-- ZEERO AI Database Schema

-- User profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text default 'student' check (role in ('student', 'educator', 'admin')),
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Lectures table
create table if not exists public.lectures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  prompt text not null,
  video_url text,
  thumbnail_url text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  academic_level text check (academic_level in ('beginner', 'intermediate', 'advanced')),
  duration integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.lectures enable row level security;

create policy "lectures_select_own" on public.lectures for select using (auth.uid() = user_id);
create policy "lectures_insert_own" on public.lectures for insert with check (auth.uid() = user_id);
create policy "lectures_update_own" on public.lectures for update using (auth.uid() = user_id);
create policy "lectures_delete_own" on public.lectures for delete using (auth.uid() = user_id);

-- Meeting rooms table
create table if not exists public.meeting_rooms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean default false,
  max_participants integer default 50,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.meeting_rooms enable row level security;

create policy "rooms_select_own" on public.meeting_rooms for select using (auth.uid() = user_id);
create policy "rooms_insert_own" on public.meeting_rooms for insert with check (auth.uid() = user_id);
create policy "rooms_update_own" on public.meeting_rooms for update using (auth.uid() = user_id);
create policy "rooms_delete_own" on public.meeting_rooms for delete using (auth.uid() = user_id);

-- Auto-create profile on signup trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
