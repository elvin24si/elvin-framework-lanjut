-- ============================================================
-- MIGRATION: FIX FOREIGN KEY CONSTRAINT & RELATIONSHIP
-- Jalankan script ini di Supabase SQL Editor.
-- ============================================================

-- 1. Hapus constraint foreign key lama yang mengarah ke auth.users
ALTER TABLE public.customer 
DROP CONSTRAINT IF EXISTS customer_user_id_fkey;

-- 2. Buat constraint foreign key baru yang mengarah langsung ke public.profiles
ALTER TABLE public.customer 
ADD CONSTRAINT customer_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) 
ON DELETE SET NULL;

SELECT 'Migration berhasil! Sekarang relasi customer -> profiles sudah valid.' AS status;
