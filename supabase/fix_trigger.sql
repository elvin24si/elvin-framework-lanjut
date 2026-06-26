-- ============================================================
-- FIX TRIGGER — Jalankan script INI saja di Supabase SQL Editor
-- Root cause: SECURITY DEFINER tanpa SET search_path tidak bisa
-- menemukan tipe ENUM (user_role, member_tier) di schema public
-- ============================================================

-- Fix 1: Recreate fungsi trigger dengan search_path yang benar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public        -- <-- INI yang hilang, penyebab error!
AS $$
DECLARE
    assigned_role user_role;
BEGIN
    -- Tentukan role
    IF NEW.email LIKE '%@admin.com' THEN
        assigned_role := 'admin';
    ELSE
        assigned_role := 'member';
    END IF;

    -- Buat profile
    INSERT INTO profiles (id, full_name, role, points, tier)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        assigned_role,
        0,
        'bronze'
    )
    ON CONFLICT (id) DO NOTHING;

    -- Buat customer (hanya untuk member)
    IF assigned_role = 'member' THEN
        INSERT INTO customer (user_id, nama, email)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Member Baru'),
            NEW.email
        );
    END IF;

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'handle_new_user error for %: %', NEW.email, SQLERRM;
    RETURN NEW;  -- Jangan batalkan signup meski trigger error
END;
$$;

-- Fix 2: Tambah policy INSERT agar frontend bisa buat profile sebagai fallback
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Member insert own customer" ON public.customer;
CREATE POLICY "Member insert own customer"
    ON public.customer FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Konfirmasi
SELECT 'Trigger fix berhasil diterapkan!' AS status;
