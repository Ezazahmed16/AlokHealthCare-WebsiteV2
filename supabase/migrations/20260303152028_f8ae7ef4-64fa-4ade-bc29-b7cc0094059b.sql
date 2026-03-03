
-- Create storage bucket for doctor images
INSERT INTO storage.buckets (id, name, public) VALUES ('doctor-images', 'doctor-images', true);

-- Allow anyone to view doctor images
CREATE POLICY "Anyone can view doctor images"
ON storage.objects FOR SELECT
USING (bucket_id = 'doctor-images');

-- Allow admins to upload doctor images
CREATE POLICY "Admins can upload doctor images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'doctor-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Allow admins to update doctor images
CREATE POLICY "Admins can update doctor images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'doctor-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Allow admins to delete doctor images
CREATE POLICY "Admins can delete doctor images"
ON storage.objects FOR DELETE
USING (bucket_id = 'doctor-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));