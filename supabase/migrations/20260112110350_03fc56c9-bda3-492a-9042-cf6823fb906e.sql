-- Create specializations table
CREATE TABLE public.specializations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  name_bn text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;

-- Anyone can view specializations
CREATE POLICY "Anyone can view specializations"
ON public.specializations
FOR SELECT
USING (true);

-- Admins can insert specializations
CREATE POLICY "Admins can insert specializations"
ON public.specializations
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update specializations
CREATE POLICY "Admins can update specializations"
ON public.specializations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete specializations
CREATE POLICY "Admins can delete specializations"
ON public.specializations
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert initial specializations from existing doctors
INSERT INTO public.specializations (name) 
SELECT DISTINCT specialization FROM public.doctors 
WHERE specialization IS NOT NULL AND specialization != ''
ON CONFLICT (name) DO NOTHING;