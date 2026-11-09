create extension if not exists pgcrypto;

create table if not exists public.teacher_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.classes (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(length(trim(name)) between 1 and 120),
 school_year integer check(school_year between 2000 and 2100),
 education_level text, shift text check(shift is null or shift in ('Manhã','Tarde','Noite','Integral')),
 notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.students (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references auth.users(id) on delete cascade,
 local_code text, full_name text not null check(length(trim(full_name)) between 1 and 180),
 birth_date date, sex_reference text check(sex_reference is null or sex_reference in ('F','M','Não informado')),
 active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.enrollments (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references auth.users(id) on delete cascade,
 class_id uuid not null references public.classes(id) on delete restrict,
 student_id uuid not null references public.students(id) on delete restrict,
 start_date date not null default current_date, end_date date,
 created_at timestamptz not null default now(),
 check(end_date is null or end_date >= start_date), unique(class_id,student_id,start_date)
);
create table if not exists public.assessments (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references auth.users(id) on delete cascade,
 student_id uuid not null references public.students(id) on delete restrict,
 class_id uuid references public.classes(id) on delete set null,
 moment smallint not null check(moment between 1 and 6), assessment_date date not null,
 weight_kg numeric(6,2) check(weight_kg is null or weight_kg between 1 and 500),
 height_cm numeric(6,2) check(height_cm is null or height_cm between 50 and 250),
 waist_cm numeric(6,2) check(waist_cm is null or waist_cm between 20 and 250),
 hip_cm numeric(6,2) check(hip_cm is null or hip_cm between 20 and 250),
 cardiorespiratory_test text check(cardiorespiratory_test is null or cardiorespiratory_test in ('walk_6min','run_walk_12min')),
 distance_m numeric(8,2) check(distance_m is null or distance_m between 0 and 20000),
 course_length_m numeric(7,2) check(course_length_m is null or course_length_m between 1 and 1000),
 pauses text, observations text, protocol_version text not null default '2026-v1',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(student_id,moment)
);

create index if not exists classes_teacher_idx on public.classes(teacher_id);
create index if not exists students_teacher_idx on public.students(teacher_id);
create index if not exists enrollments_teacher_class_idx on public.enrollments(teacher_id,class_id);
create index if not exists assessments_teacher_student_date_idx on public.assessments(teacher_id,student_id,assessment_date);

create or replace function public.handle_new_efieeja_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
 insert into public.teacher_profiles(id,display_name)
 values(new.id,coalesce(new.raw_user_meta_data ->> 'full_name',new.email))
 on conflict(id) do nothing;
 return new;
end;
$$;
drop trigger if exists on_auth_user_created_efieeja on auth.users;
create trigger on_auth_user_created_efieeja after insert on auth.users
for each row execute procedure public.handle_new_efieeja_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at=now(); return new; end; $$;
do $$
declare t text;
begin
 foreach t in array array['teacher_profiles','classes','students','assessments'] loop
  execute format('drop trigger if exists set_updated_at on public.%I',t);
  execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',t);
 end loop;
end $$;

alter table public.teacher_profiles enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.enrollments enable row level security;
alter table public.assessments enable row level security;

drop policy if exists "profile owner select" on public.teacher_profiles;
create policy "profile owner select" on public.teacher_profiles for select to authenticated using(id=(select auth.uid()));
drop policy if exists "profile owner update" on public.teacher_profiles;
create policy "profile owner update" on public.teacher_profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));

drop policy if exists "teacher owns classes" on public.classes;
create policy "teacher owns classes" on public.classes for all to authenticated using(teacher_id=(select auth.uid())) with check(teacher_id=(select auth.uid()));
drop policy if exists "teacher owns students" on public.students;
create policy "teacher owns students" on public.students for all to authenticated using(teacher_id=(select auth.uid())) with check(teacher_id=(select auth.uid()));

drop policy if exists "teacher owns enrollments" on public.enrollments;
create policy "teacher owns enrollments" on public.enrollments for all to authenticated
using(teacher_id=(select auth.uid())
 and exists(select 1 from public.classes c where c.id=class_id and c.teacher_id=(select auth.uid()))
 and exists(select 1 from public.students s where s.id=student_id and s.teacher_id=(select auth.uid())))
with check(teacher_id=(select auth.uid())
 and exists(select 1 from public.classes c where c.id=class_id and c.teacher_id=(select auth.uid()))
 and exists(select 1 from public.students s where s.id=student_id and s.teacher_id=(select auth.uid())));

drop policy if exists "teacher owns assessments" on public.assessments;
create policy "teacher owns assessments" on public.assessments for all to authenticated
using(teacher_id=(select auth.uid()) and exists(select 1 from public.students s where s.id=student_id and s.teacher_id=(select auth.uid())))
with check(teacher_id=(select auth.uid()) and exists(select 1 from public.students s where s.id=student_id and s.teacher_id=(select auth.uid()))
 and (class_id is null or exists(select 1 from public.classes c where c.id=class_id and c.teacher_id=(select auth.uid()))));

grant select,update on public.teacher_profiles to authenticated;
grant select,insert,update,delete on public.classes,public.students,public.enrollments,public.assessments to authenticated;
