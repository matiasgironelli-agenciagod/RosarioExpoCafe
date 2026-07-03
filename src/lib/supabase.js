import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializar Supabase sólo si las variables de entorno están presentes
// Esto evita que falle el proyecto al correr localmente antes de vincular las claves
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    "⚠️ Supabase no está configurado. Las credenciales VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY están ausentes en tu archivo .env. " +
    "El sitio funcionará en modo DEMO persistiendo los registros en localStorage."
  );
}
