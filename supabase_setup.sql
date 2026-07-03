-- =======================================================
-- CONFIGURACIÓN DE BASE DE DATOS PARA ROSARIO EXPO CAFE
-- Ejecutar este script en el editor SQL de tu panel de Supabase.
-- =======================================================

-- 1. TABLA: REGISTROS GENERALES (Para la entrada libre de la feria)
CREATE TABLE IF NOT EXISTS public.general_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS) para proteger los datos
ALTER TABLE public.general_registrations ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inserciones públicas (anónimas) para que cualquiera pueda registrarse
CREATE POLICY "Permitir inserción de registros generales públicos"
  ON public.general_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Bloquear lectura pública de correos (Solo lectura para personal con cuenta de Supabase)
CREATE POLICY "Permitir lectura de registros generales solo a autenticados"
  ON public.general_registrations
  FOR SELECT
  TO authenticated
  USING (true);


-- 2. TABLA: REGISTROS DE WORKSHOPS (Inscripciones a talleres específicos)
CREATE TABLE IF NOT EXISTS public.workshop_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  workshop_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Asegurar que el usuario no pueda registrarse más de una vez al mismo taller
  UNIQUE (email, workshop_id)
);

-- Habilitar Row Level Security (RLS) para workshops
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inscripciones públicas
CREATE POLICY "Permitir inserción de registros de workshops públicos"
  ON public.workshop_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Bloquear lectura pública de correos de los talleres
CREATE POLICY "Permitir lectura de workshops solo a autenticados"
  ON public.workshop_registrations
  FOR SELECT
  TO authenticated
  USING (true);
