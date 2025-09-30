-- Supabase Storage Setup for car-images bucket
-- Run this in your Supabase SQL Editor after creating the car-images bucket

-- Enable RLS on storage.objects table (should already be enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

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

-- Optional: Create a function to automatically organize uploaded files
CREATE OR REPLACE FUNCTION public.handle_new_car_image()
RETURNS TRIGGER AS $$
BEGIN
  -- You can add custom logic here if needed
  -- For example, logging uploads, sending notifications, etc.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Create a trigger to call the function on new uploads
CREATE TRIGGER on_car_image_uploaded
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  WHEN (NEW.bucket_id = 'car-images')
  EXECUTE FUNCTION public.handle_new_car_image();
