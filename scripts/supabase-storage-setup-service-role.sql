-- Supabase Storage Setup for car-images bucket
-- IMPORTANT: This must be run with SERVICE ROLE key, not the anon key
-- Use the service role key in your Supabase project settings

-- First, ensure the bucket exists (this should be done in the dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true)
-- ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for car images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload car images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update car images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete car images" ON storage.objects;

-- Policy 1: Allow public read access for car images
CREATE POLICY "Public read access for car images" ON storage.objects
FOR SELECT USING (bucket_id = 'car-images');

-- Policy 2: Allow authenticated users to upload car images
CREATE POLICY "Authenticated users can upload car images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'car-images' AND auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to update car images
CREATE POLICY "Authenticated users can update car images" ON storage.objects
FOR UPDATE USING (bucket_id = 'car-images' AND auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to delete car images
CREATE POLICY "Authenticated users can delete car images" ON storage.objects
FOR DELETE USING (bucket_id = 'car-images' AND auth.role() = 'authenticated');
