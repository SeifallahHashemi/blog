alter table "public"."comment_reactions" drop constraint "comment_reactions_comment_id_fkey";

alter table "public"."comments" drop constraint "comments_parent_id_fkey";

alter table "public"."moderation_reports" drop constraint "moderation_reports_comment_id_fkey";

alter table "public"."comment_reactions" add constraint "comment_reactions_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comment_reactions" validate constraint "comment_reactions_comment_id_fkey";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."moderation_reports" add constraint "moderation_reports_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."moderation_reports" validate constraint "moderation_reports_comment_id_fkey";

drop trigger if exists "on_auth_user_created" on "auth"."users";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


