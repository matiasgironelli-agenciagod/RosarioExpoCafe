import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, CheckCircle, Ticket } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (supabase) {
        const { error } = await supabase
          .from('general_registrations')
          .insert([{ name: formData.name, email: formData.email.toLowerCase() }]);

        if (error) {
          if (error.code === '23505') {
            throw new Error('Este correo ya se encuentra registrado.');
          }
          throw error;
        }
      } else {
        // Fallback Local Storage Mode
        const localData = JSON.parse(localStorage.getItem('general_registrations') || '[]');
        if (localData.some((item) => item.email === formData.email.toLowerCase())) {
          throw new Error('Este correo ya se encuentra registrado en el simulador local.');
        }
        localData.push({
          name: formData.name,
          email: formData.email.toLowerCase(),
          created_at: new Date().toISOString()
        });
        localStorage.setItem('general_registrations', JSON.stringify(localData));
      }

      setSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Hubo un error al registrarte. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-cream pt-12 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-36">
      {/* Decorative Grid Lines background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#204532 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      {/* Ilustraciones Flotantes de Café */}
      <CoffeeBean className="absolute top-12 left-[5%] w-24 h-24 text-brand-green-dark/10 animate-float-slow hidden md:block" />
      <CoffeeCup className="absolute bottom-20 left-[10%] w-28 h-28 text-brand-brown-dark/10 animate-float-medium hidden md:block" />
      <CoffeeBean className="absolute top-8 right-[8%] w-32 h-32 text-brand-green-dark/10 animate-float-fast hidden lg:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Main Copy */}
          <ScrollReveal className="flex flex-col text-left" delay={150}>
            <div className="inline-flex max-w-max rounded-full border border-brand-green-dark/30 bg-brand-green-light/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green-dark mb-6">
              ☕ Regresa la primera Feria del Café de Rosario
            </div>
            
            <h1 className="font-chaloops text-4xl font-black leading-[1.05] text-brand-green-dark sm:text-5xl md:text-6xl lg:text-[4rem] mb-6">
              Impulsando la cultura cafetera en la ciudad
            </h1>
            
            <p className="max-w-xl text-base md:text-lg leading-relaxed text-brand-green-dark/80 mb-8 font-medium">
              Te invitamos a la segunda edición de la feria de café de Rosario. Un corredor gastronómico al aire libre, expositores corporativos, rondas de negocios y talleres gratuitos de primer nivel.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
              <div className="flex items-center gap-3 border border-brand-green-dark/20 bg-white p-4 shadow-sm rounded-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-brand-green-dark/50 tracking-wider">Fecha</h3>
                  <p className="text-sm font-bold text-brand-green-dark">28 y 29 de Agosto</p>
                </div>
              </div>

              <a 
                href="#ubicacion" 
                className="flex items-center gap-3 border border-brand-green-dark/20 bg-white p-4 shadow-sm rounded-xl hover:border-brand-green-dark/45 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-green-dark/20 bg-brand-green-light/40 text-brand-green-dark">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-brand-green-dark/50 tracking-wider">Lugar</h3>
                  <p className="text-sm font-bold text-brand-green-dark">C.C. Fontanarrosa, Rosario</p>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Neo-brutalist Registration Card - Softened */}
          <ScrollReveal id="registro" className="relative border border-brand-green-dark/20 bg-white p-6 sm:p-8 shadow-brutal rounded-[1.5rem] text-left" delay={300}>
            {/* Stamp / Sello de Marca */}
            <SelloFeria className="absolute -top-8 -right-6 z-30" />

            <div className="flex items-center gap-3 mb-6">
              <Ticket className="h-8 w-8 text-brand-green-dark shrink-0" />
              <div>
                <h2 className="font-serif text-2xl font-black text-brand-green-dark leading-none">
                  Acreditate Gratis
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark mt-1">
                  ENTRADA LIBRE Y GRATUITA
                </p>
              </div>
            </div>

            {success ? (
              <div className="border border-brand-green-dark/20 bg-brand-green-light/10 p-6 rounded-xl text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-brand-green-dark mb-4 animate-bounce" />
                <h3 className="font-serif text-xl font-bold text-brand-green-dark mb-2">
                  ¡Ya estás acreditado!
                </h3>
                <p className="text-sm text-brand-green-dark/80 font-medium">
                  Te enviamos un correo electrónico de confirmación con las novedades del evento. ¡Te esperamos el 28 y 29 de Agosto!
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 neo-brutal-btn-dark py-2.5 px-4 text-xs rounded-lg w-full"
                >
                  Registrar otra persona
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre y apellido"
                    className="w-full border border-brand-green-dark/20 bg-white p-3 text-sm font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@email.com"
                    className="w-full border border-brand-green-dark/20 bg-white p-3 text-sm font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                  />
                </div>

                {errorMsg && (
                  <div className="border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-600 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full neo-brutal-btn-dark py-3.5 text-sm font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? 'Procesando...' : 'Obtener Acreditación Gratis'}
                </button>

                <p className="text-[10px] font-semibold text-center text-brand-green-dark/50 mt-4 leading-normal">
                  * Al registrarte aceptas recibir correos sobre la Rosario EXPO CAFE 2026.
                </p>
              </form>
            )}
          </ScrollReveal>

        </div>
      </div>

      {/* Sloped Divider to transition from cream to white section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-white">
          <path d="M1200 120L0 120 0 0z"></path>
        </svg>
      </div>
    </section>
  );
}

const SelloFeria = ({ className, angle = '-10deg' }) => (
  <div 
    className={`w-24 h-24 rounded-full border border-brand-brown-dark/30 flex flex-col items-center justify-center text-center p-1 bg-brand-cream text-brand-brown-dark select-none shadow-md ${className}`}
    style={{ transform: `rotate(${angle})` }}
  >
    <div className="w-full h-full rounded-full border border-dashed border-brand-brown-dark/50 flex flex-col items-center justify-center">
      <span className="text-[7px] tracking-[0.2em] uppercase font-black leading-none text-brand-brown-dark/70">ROSARIO</span>
      <span className="font-serif text-lg font-black leading-none my-1">2026</span>
      <span className="text-[7px] tracking-[0.1em] uppercase font-black leading-none text-brand-brown-dark/70">EXPO CAFÉ</span>
    </div>
  </div>
);

const CoffeeBean = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <ellipse cx="50" cy="50" rx="25" ry="38" transform="rotate(-30 50 50)" fill="currentColor" fillOpacity="0.04" />
    <path d="M36 28C43 40 45 60 66 72" />
  </svg>
);

const CoffeeCup = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25 40H75V63C75 71.28 68.28 78 60 78H40C31.72 78 25 71.28 25 63V40Z" fill="currentColor" fillOpacity="0.04" />
    <path d="M75 48C81.5 48 85 52 85 57C85 62 81.5 65 75 65" />
    <path d="M38 18C38 24 42 24 42 30" />
    <path d="M50 15C50 21 54 21 54 27" />
    <path d="M62 18C62 24 66 24 66 30" />
  </svg>
);
