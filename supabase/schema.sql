-- ============================================================
-- SEDAP DASHBOARD — SUPABASE SCHEMA (SAFE TO RUN)
-- Jalankan di: Supabase > SQL Editor > New Query > Run
-- File ini aman dijalankan meski sebagian sudah ada (IF NOT EXISTS)
-- ============================================================

-- ============================================================
-- STEP 1: ENUMS (skip jika sudah ada)
-- ============================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'member', 'guest');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE member_tier AS ENUM ('bronze', 'silver', 'gold');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'lunas', 'dibatalkan');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- STEP 2: TABLES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'member'::user_role NOT NULL,
    points INT DEFAULT 0 NOT NULL,
    tier member_tier DEFAULT 'bronze'::member_tier NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.produk (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_produk TEXT NOT NULL,
    harga NUMERIC NOT NULL CHECK (harga >= 0),
    stok INT DEFAULT 0 NOT NULL CHECK (stok >= 0),
    deskripsi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customer (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    nama TEXT NOT NULL,
    email TEXT,
    telepon TEXT,
    alamat TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pesanan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.customer(id) ON DELETE RESTRICT NOT NULL,
    tanggal_pesanan TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    total_harga NUMERIC DEFAULT 0 NOT NULL CHECK (total_harga >= 0),
    status order_status DEFAULT 'pending'::order_status NOT NULL,
    poin_diperoleh INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.detail_pesanan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pesanan_id UUID REFERENCES public.pesanan(id) ON DELETE CASCADE NOT NULL,
    produk_id UUID REFERENCES public.produk(id) ON DELETE RESTRICT NOT NULL,
    jumlah INT NOT NULL CHECK (jumlah > 0),
    harga_satuan NUMERIC NOT NULL CHECK (harga_satuan >= 0)
);

-- ============================================================
-- STEP 3: TRIGGER A — Auto-create profile + customer saat register
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    assigned_role user_role := 'member'::user_role;
BEGIN
    -- Tentukan role berdasarkan email
    IF NEW.email LIKE '%@admin.com' THEN
        assigned_role := 'admin'::user_role;
    END IF;

    -- Insert ke profiles (ON CONFLICT DO NOTHING agar aman jika sudah ada)
    INSERT INTO public.profiles (id, full_name, role, points, tier)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        assigned_role,
        0,
        'bronze'::member_tier
    )
    ON CONFLICT (id) DO NOTHING;

    -- Buat entitas customer untuk member
    IF assigned_role = 'member'::user_role THEN
        INSERT INTO public.customer (user_id, nama, email)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Member Baru'),
            NEW.email
        );
    END IF;

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Log error tapi jangan batalkan proses signup
    RAISE LOG 'handle_new_user error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger lama jika ada, lalu buat ulang
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- STEP 4: TRIGGER B — Auto-update poin & tier saat pesanan LUNAS
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_member_points_and_tier()
RETURNS TRIGGER AS $$
DECLARE
    target_user_id UUID;
    calculated_points INT;
    total_accumulated_points INT;
    new_tier member_tier;
BEGIN
    IF (OLD.status IS DISTINCT FROM NEW.status AND NEW.status = 'lunas') THEN

        SELECT user_id INTO target_user_id
        FROM public.customer WHERE id = NEW.customer_id;

        IF target_user_id IS NOT NULL THEN
            calculated_points := FLOOR(NEW.total_harga / 10000);

            UPDATE public.pesanan
            SET poin_diperoleh = calculated_points
            WHERE id = NEW.id;

            UPDATE public.profiles
            SET points = points + calculated_points
            WHERE id = target_user_id
            RETURNING points INTO total_accumulated_points;

            IF total_accumulated_points >= 5000 THEN
                new_tier := 'gold'::member_tier;
            ELSIF total_accumulated_points >= 1000 THEN
                new_tier := 'silver'::member_tier;
            ELSE
                new_tier := 'bronze'::member_tier;
            END IF;

            UPDATE public.profiles SET tier = new_tier WHERE id = target_user_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_order_status_completed ON public.pesanan;
CREATE TRIGGER on_order_status_completed
    AFTER UPDATE ON public.pesanan
    FOR EACH ROW EXECUTE FUNCTION public.update_member_points_and_tier();

-- ============================================================
-- STEP 5: ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detail_pesanan ENABLE ROW LEVEL SECURITY;

-- Helper: ambil role user aktif
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
    SELECT COALESCE(
        (SELECT role FROM public.profiles WHERE id = auth.uid()),
        'guest'::user_role
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- STEP 6: RLS POLICIES (drop dulu agar aman di-run ulang)
-- ============================================================

-- PROFILES
DROP POLICY IF EXISTS "Admin full access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Admin full access to profiles"
    ON public.profiles FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- PRODUK
DROP POLICY IF EXISTS "Admin full access to produk" ON public.produk;
DROP POLICY IF EXISTS "Authenticated can view produk" ON public.produk;
DROP POLICY IF EXISTS "Anon can view produk" ON public.produk;
CREATE POLICY "Admin full access to produk"
    ON public.produk FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Authenticated can view produk"
    ON public.produk FOR SELECT TO authenticated
    USING (true);
CREATE POLICY "Anon can view produk"
    ON public.produk FOR SELECT TO anon
    USING (true);

-- CUSTOMER
DROP POLICY IF EXISTS "Admin full access to customer" ON public.customer;
DROP POLICY IF EXISTS "Member view own customer" ON public.customer;
DROP POLICY IF EXISTS "Member update own customer" ON public.customer;
CREATE POLICY "Admin full access to customer"
    ON public.customer FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Member view own customer"
    ON public.customer FOR SELECT TO authenticated
    USING (auth.uid() = user_id);
CREATE POLICY "Member update own customer"
    ON public.customer FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

-- PESANAN
DROP POLICY IF EXISTS "Admin full access to pesanan" ON public.pesanan;
DROP POLICY IF EXISTS "Member select own pesanan" ON public.pesanan;
DROP POLICY IF EXISTS "Member insert own pesanan" ON public.pesanan;
CREATE POLICY "Admin full access to pesanan"
    ON public.pesanan FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Member select own pesanan"
    ON public.pesanan FOR SELECT TO authenticated
    USING (customer_id IN (SELECT id FROM public.customer WHERE user_id = auth.uid()));
CREATE POLICY "Member insert own pesanan"
    ON public.pesanan FOR INSERT TO authenticated
    WITH CHECK (customer_id IN (SELECT id FROM public.customer WHERE user_id = auth.uid()));

-- DETAIL_PESANAN
DROP POLICY IF EXISTS "Admin full access to detail_pesanan" ON public.detail_pesanan;
DROP POLICY IF EXISTS "Member select own detail_pesanan" ON public.detail_pesanan;
DROP POLICY IF EXISTS "Member insert own detail_pesanan" ON public.detail_pesanan;
CREATE POLICY "Admin full access to detail_pesanan"
    ON public.detail_pesanan FOR ALL TO authenticated
    USING (public.get_current_user_role() = 'admin');
CREATE POLICY "Member select own detail_pesanan"
    ON public.detail_pesanan FOR SELECT TO authenticated
    USING (pesanan_id IN (SELECT id FROM public.pesanan WHERE customer_id IN (SELECT id FROM public.customer WHERE user_id = auth.uid())));
CREATE POLICY "Member insert own detail_pesanan"
    ON public.detail_pesanan FOR INSERT TO authenticated
    WITH CHECK (pesanan_id IN (SELECT id FROM public.pesanan WHERE customer_id IN (SELECT id FROM public.customer WHERE user_id = auth.uid())));

-- ============================================================
-- SELESAI — Schema berhasil dibuat!
-- ============================================================
SELECT 'Schema Sedap Dashboard berhasil dibuat!' AS status;
