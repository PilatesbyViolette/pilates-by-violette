-- ═══════════════════════════════════════════════════
-- SÉCURITÉ SUPABASE - Pilates by Violette
-- À exécuter dans le SQL Editor du dashboard Supabase
-- ═══════════════════════════════════════════════════

-- Fonction helper : vérifie si l'utilisateur courant est admin
-- SET search_path prévient les attaques par injection de schéma
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ── USERS ──
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select" ON public.users
  FOR SELECT USING (id = auth.uid() OR is_admin());

CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (id = auth.uid());

-- Utilisateur peut modifier son profil MAIS PAS son rôle
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = 'client');

-- Admin peut tout modifier (y compris les rôles)
CREATE POLICY "users_update_admin" ON public.users
  FOR UPDATE USING (is_admin());

CREATE POLICY "users_delete_admin" ON public.users
  FOR DELETE USING (is_admin());

-- ── SESSIONS ──
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select" ON public.sessions
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "sessions_insert" ON public.sessions
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_admin());

CREATE POLICY "sessions_update" ON public.sessions
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "sessions_delete" ON public.sessions
  FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- ── BOOKINGS ──
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings_select" ON public.bookings
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "bookings_insert" ON public.bookings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "bookings_update" ON public.bookings
  FOR UPDATE USING (is_admin());

CREATE POLICY "bookings_delete" ON public.bookings
  FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- ── SLOTS (lecture publique, écriture admin) ──
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "slots_select_public" ON public.slots
  FOR SELECT USING (true);

CREATE POLICY "slots_insert_admin" ON public.slots
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "slots_update_admin" ON public.slots
  FOR UPDATE USING (is_admin());

CREATE POLICY "slots_delete_admin" ON public.slots
  FOR DELETE USING (is_admin());

-- ── MEASURES ──
ALTER TABLE public.measures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "measures_select" ON public.measures
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "measures_insert" ON public.measures
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "measures_update" ON public.measures
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "measures_delete" ON public.measures
  FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- ── QUOTES (lecture publique) ──
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quotes_select_public" ON public.quotes
  FOR SELECT USING (true);

CREATE POLICY "quotes_admin_all" ON public.quotes
  FOR ALL USING (is_admin());

-- ── POSTS ──
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select" ON public.posts
  FOR SELECT USING (
    visibility = 'public'
    OR user_id = auth.uid()
    OR is_admin()
  );

CREATE POLICY "posts_insert" ON public.posts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "posts_update" ON public.posts
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "posts_delete" ON public.posts
  FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- ── POST_LIKES ──
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "post_likes_select_all" ON public.post_likes
  FOR SELECT USING (true);

CREATE POLICY "post_likes_insert" ON public.post_likes
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "post_likes_delete" ON public.post_likes
  FOR DELETE USING (user_id = auth.uid() OR is_admin());

-- ── MESSAGES ──
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select" ON public.messages
  FOR SELECT USING (
    sender_id = auth.uid()
    OR receiver_id = auth.uid()
    OR is_admin()
  );

-- sender_id NULL réservé aux notifications système (admin authentifié uniquement)
CREATE POLICY "messages_insert" ON public.messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    OR (sender_id IS NULL AND is_admin() AND auth.uid() IS NOT NULL)
  );

CREATE POLICY "messages_update" ON public.messages
  FOR UPDATE
  USING (receiver_id = auth.uid() OR is_admin());

CREATE POLICY "messages_delete" ON public.messages
  FOR DELETE USING (
    sender_id = auth.uid()
    OR receiver_id = auth.uid()
    OR is_admin()
  );

-- ── ENCAISSEMENTS ──
ALTER TABLE public.encaissements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "encaissements_select" ON public.encaissements
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "encaissements_insert_admin" ON public.encaissements
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "encaissements_update_admin" ON public.encaissements
  FOR UPDATE USING (is_admin());

CREATE POLICY "encaissements_delete_admin" ON public.encaissements
  FOR DELETE USING (is_admin());

-- ── SETTINGS (tarifs admin, stockés côté serveur) ──
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Seul l'admin peut lire/écrire les settings
CREATE POLICY "settings_select_admin" ON public.settings
  FOR SELECT USING (is_admin());

CREATE POLICY "settings_upsert_admin" ON public.settings
  FOR ALL USING (is_admin());

-- ═══════════════════════════════════════════════════
-- STORAGE POLICIES
-- ═══════════════════════════════════════════════════

-- Bucket avatars : chaque user gère son propre fichier
CREATE POLICY "avatars_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_update_own" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Bucket community : lecture publique, upload authentifié
CREATE POLICY "community_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'community');

CREATE POLICY "community_insert_auth" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'community'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "community_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'community'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR is_admin()
    )
  );
