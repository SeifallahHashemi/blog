drop extension if exists "pg_net";


  create table "public"."comment_reactions" (
    "id" uuid not null default gen_random_uuid(),
    "comment_id" uuid not null,
    "user_id" uuid not null,
    "reaction" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."comment_reactions" enable row level security;


  create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "post_id" text not null,
    "parent_id" uuid,
    "user_id" uuid not null,
    "content" text not null,
    "is_deleted" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."comments" enable row level security;


  create table "public"."moderation_reports" (
    "id" uuid not null default gen_random_uuid(),
    "comment_id" uuid,
    "reported_by" uuid,
    "reason" text,
    "status" text default 'open'::text,
    "created_at" timestamp with time zone default now()
      );



  create table "public"."posts_ref" (
    "id" text not null,
    "title" text not null,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."posts_ref" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "full_name" text default 'پرشین بلاگ'::text,
    "username" text not null,
    "is_premium" boolean not null,
    "avatar_url" text default ''::text,
    "user_id" uuid not null default auth.uid(),
    "mobile" text
      );


alter table "public"."profiles" enable row level security;


  create table "public"."user_favorites" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "post_id" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."user_favorites" enable row level security;

CREATE UNIQUE INDEX comment_reactions_pkey ON public.comment_reactions USING btree (id);

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE INDEX idx_comment_reactions_cemment_id ON public.comment_reactions USING btree (comment_id);

CREATE INDEX idx_comment_reactions_user_id ON public.comment_reactions USING btree (user_id);

CREATE INDEX idx_comments_parent_id ON public.comments USING btree (parent_id);

CREATE INDEX idx_comments_post_created_at ON public.comments USING btree (post_id, created_at DESC);

CREATE INDEX idx_user_favorites_post_id ON public.user_favorites USING btree (post_id);

CREATE INDEX idx_user_favorites_user_id ON public.user_favorites USING btree (user_id);

CREATE INDEX moderation_reports_comment_id_idx ON public.moderation_reports USING btree (comment_id);

CREATE UNIQUE INDEX moderation_reports_pkey ON public.moderation_reports USING btree (id);

CREATE UNIQUE INDEX posts_ref_pkey ON public.posts_ref USING btree (id);

CREATE UNIQUE INDEX profiles_id_key ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX uq_comment_user ON public.comment_reactions USING btree (comment_id, user_id);

CREATE UNIQUE INDEX uq_user_post ON public.user_favorites USING btree (user_id, post_id);

CREATE UNIQUE INDEX user_favorites_pkey ON public.user_favorites USING btree (id);

alter table "public"."comment_reactions" add constraint "comment_reactions_pkey" PRIMARY KEY using index "comment_reactions_pkey";

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."moderation_reports" add constraint "moderation_reports_pkey" PRIMARY KEY using index "moderation_reports_pkey";

alter table "public"."posts_ref" add constraint "posts_ref_pkey" PRIMARY KEY using index "posts_ref_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."user_favorites" add constraint "user_favorites_pkey" PRIMARY KEY using index "user_favorites_pkey";

alter table "public"."comment_reactions" add constraint "comment_reactions_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comment_reactions" validate constraint "comment_reactions_comment_id_fkey";

alter table "public"."comment_reactions" add constraint "comment_reactions_reaction_check" CHECK ((reaction = ANY (ARRAY['like'::text, 'dislike'::text]))) not valid;

alter table "public"."comment_reactions" validate constraint "comment_reactions_reaction_check";

alter table "public"."comment_reactions" add constraint "comment_reactions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."comment_reactions" validate constraint "comment_reactions_user_id_fkey";

alter table "public"."comment_reactions" add constraint "uq_comment_user" UNIQUE using index "uq_comment_user";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."moderation_reports" add constraint "moderation_reports_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."moderation_reports" validate constraint "moderation_reports_comment_id_fkey";

alter table "public"."moderation_reports" add constraint "moderation_reports_reported_by_fkey" FOREIGN KEY (reported_by) REFERENCES auth.users(id) not valid;

alter table "public"."moderation_reports" validate constraint "moderation_reports_reported_by_fkey";

alter table "public"."profiles" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."user_favorites" add constraint "uq_user_post" UNIQUE using index "uq_user_post";

alter table "public"."user_favorites" add constraint "user_favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_favorites" validate constraint "user_favorites_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (user_id, username, avatar_url, is_premium, created_at)
  values (
    new.id,
    split_part(new.email, '@', 1),
    'https://example.com/default-avatar.png',
    false,
    now()
  );
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.toggle_comment_reaction(p_comment_id uuid, p_reaction text)
 RETURNS TABLE(action text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  v_uid uuid := auth.uid(); -- شناسه کاربر فراخوان
  v_existing record;
begin
  -- 1. بررسی اینکه کاربر لاگین شده باشد
  if v_uid is null then
    raise exception 'not_authenticated' using errcode = 'P0001';
  end if;

  -- 2. اعتبارسنجی reaction
  if p_reaction not in ('like','dislike') then
    raise exception 'invalid_reaction' using errcode = 'P0002';
  end if;

  -- 3. اطمینان از وجود کامنت
  if not exists (select 1 from public.comments where id = p_comment_id) then
    raise exception 'comment_not_found' using errcode = 'P0003';
  end if;

  -- 4. لوک کردن (and select for update) رکورد واکنش قبلی (اگر وجود داشته باشد)
  select * into v_existing
  from public.comment_reactions
  where comment_id = p_comment_id and user_id = v_uid
  for update; -- این خط race condition را حل می‌کند

  if not found then
    -- اگر رکورد نبود => درج
    insert into public.comment_reactions (comment_id, user_id, reaction, created_at, updated_at)
    values (p_comment_id, v_uid, p_reaction, now(), now());
    return query select 'inserted'::text;
  else
    if v_existing.reaction = p_reaction then
      -- اگر همان واکنش بود => حذف (toggle off)
      delete from public.comment_reactions where id = v_existing.id;
      return query select 'deleted'::text;
    else
      -- اگر متفاوت بود => آپدیت به واکنش جدید
      update public.comment_reactions
      set reaction = p_reaction, updated_at = now()
      where id = v_existing.id;
      return query select 'updated'::text;
    end if;
  end if;
end;
$function$
;

grant delete on table "public"."comment_reactions" to "anon";

grant insert on table "public"."comment_reactions" to "anon";

grant references on table "public"."comment_reactions" to "anon";

grant select on table "public"."comment_reactions" to "anon";

grant trigger on table "public"."comment_reactions" to "anon";

grant truncate on table "public"."comment_reactions" to "anon";

grant update on table "public"."comment_reactions" to "anon";

grant delete on table "public"."comment_reactions" to "authenticated";

grant insert on table "public"."comment_reactions" to "authenticated";

grant references on table "public"."comment_reactions" to "authenticated";

grant select on table "public"."comment_reactions" to "authenticated";

grant trigger on table "public"."comment_reactions" to "authenticated";

grant truncate on table "public"."comment_reactions" to "authenticated";

grant update on table "public"."comment_reactions" to "authenticated";

grant delete on table "public"."comment_reactions" to "service_role";

grant insert on table "public"."comment_reactions" to "service_role";

grant references on table "public"."comment_reactions" to "service_role";

grant select on table "public"."comment_reactions" to "service_role";

grant trigger on table "public"."comment_reactions" to "service_role";

grant truncate on table "public"."comment_reactions" to "service_role";

grant update on table "public"."comment_reactions" to "service_role";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."moderation_reports" to "anon";

grant insert on table "public"."moderation_reports" to "anon";

grant references on table "public"."moderation_reports" to "anon";

grant select on table "public"."moderation_reports" to "anon";

grant trigger on table "public"."moderation_reports" to "anon";

grant truncate on table "public"."moderation_reports" to "anon";

grant update on table "public"."moderation_reports" to "anon";

grant delete on table "public"."moderation_reports" to "authenticated";

grant insert on table "public"."moderation_reports" to "authenticated";

grant references on table "public"."moderation_reports" to "authenticated";

grant select on table "public"."moderation_reports" to "authenticated";

grant trigger on table "public"."moderation_reports" to "authenticated";

grant truncate on table "public"."moderation_reports" to "authenticated";

grant update on table "public"."moderation_reports" to "authenticated";

grant delete on table "public"."moderation_reports" to "service_role";

grant insert on table "public"."moderation_reports" to "service_role";

grant references on table "public"."moderation_reports" to "service_role";

grant select on table "public"."moderation_reports" to "service_role";

grant trigger on table "public"."moderation_reports" to "service_role";

grant truncate on table "public"."moderation_reports" to "service_role";

grant update on table "public"."moderation_reports" to "service_role";

grant delete on table "public"."posts_ref" to "anon";

grant insert on table "public"."posts_ref" to "anon";

grant references on table "public"."posts_ref" to "anon";

grant select on table "public"."posts_ref" to "anon";

grant trigger on table "public"."posts_ref" to "anon";

grant truncate on table "public"."posts_ref" to "anon";

grant update on table "public"."posts_ref" to "anon";

grant delete on table "public"."posts_ref" to "authenticated";

grant insert on table "public"."posts_ref" to "authenticated";

grant references on table "public"."posts_ref" to "authenticated";

grant select on table "public"."posts_ref" to "authenticated";

grant trigger on table "public"."posts_ref" to "authenticated";

grant truncate on table "public"."posts_ref" to "authenticated";

grant update on table "public"."posts_ref" to "authenticated";

grant delete on table "public"."posts_ref" to "service_role";

grant insert on table "public"."posts_ref" to "service_role";

grant references on table "public"."posts_ref" to "service_role";

grant select on table "public"."posts_ref" to "service_role";

grant trigger on table "public"."posts_ref" to "service_role";

grant truncate on table "public"."posts_ref" to "service_role";

grant update on table "public"."posts_ref" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."user_favorites" to "anon";

grant insert on table "public"."user_favorites" to "anon";

grant references on table "public"."user_favorites" to "anon";

grant select on table "public"."user_favorites" to "anon";

grant trigger on table "public"."user_favorites" to "anon";

grant truncate on table "public"."user_favorites" to "anon";

grant update on table "public"."user_favorites" to "anon";

grant delete on table "public"."user_favorites" to "authenticated";

grant insert on table "public"."user_favorites" to "authenticated";

grant references on table "public"."user_favorites" to "authenticated";

grant select on table "public"."user_favorites" to "authenticated";

grant trigger on table "public"."user_favorites" to "authenticated";

grant truncate on table "public"."user_favorites" to "authenticated";

grant update on table "public"."user_favorites" to "authenticated";

grant delete on table "public"."user_favorites" to "service_role";

grant insert on table "public"."user_favorites" to "service_role";

grant references on table "public"."user_favorites" to "service_role";

grant select on table "public"."user_favorites" to "service_role";

grant trigger on table "public"."user_favorites" to "service_role";

grant truncate on table "public"."user_favorites" to "service_role";

grant update on table "public"."user_favorites" to "service_role";


  create policy "Allow update for reaction owner"
  on "public"."comment_reactions"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Enable delete for users based on user_id"
  on "public"."comment_reactions"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for users based on user_id"
  on "public"."comment_reactions"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable read access for all users"
  on "public"."comment_reactions"
  as permissive
  for select
  to public
using (true);



  create policy "Allow update for comment owner"
  on "public"."comments"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Enable delete for users based on user_id"
  on "public"."comments"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for authenticated users only"
  on "public"."comments"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Enable read access for all users"
  on "public"."comments"
  as permissive
  for select
  to public
using ((is_deleted = false));



  create policy "Enable read access for all users"
  on "public"."posts_ref"
  as permissive
  for select
  to public
using (true);



  create policy "Enable delete for users based on user_id"
  on "public"."profiles"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for users based on user_id"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable update for user_id match"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable users to view their own data only"
  on "public"."profiles"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable delete for users based on user_id"
  on "public"."user_favorites"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for authenticated users only"
  on "public"."user_favorites"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Enable users to view their own data only"
  on "public"."user_favorites"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Policy with table joins"
  on "public"."user_favorites"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


