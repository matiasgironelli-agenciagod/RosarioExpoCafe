import React, { useState } from 'react';
import { Briefcase, Handshake, ShieldCheck, Mail, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function B2BSection() {
  const [formData, setFormData] = useState({ company: '', contactName: '', email: '', phone: '', type: 'Expositor' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simular guardado B2B
    setTimeout(() => {
      const b2bData = JSON.parse(localStorage.getItem('b2b_registrations') || '[]');
      b2bData.push({
        ...formData,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('b2b_registrations', JSON.stringify(b2bData));
      
      setSuccess(true);
      setLoading(false);
      setFormData({ company: '', contactName: '', email: '', phone: '', type: 'Expositor' });
    }, 800);
  };

  return (
    <section id="b2b" className="relative overflow-hidden bg-white pt-16 pb-28 md:pt-24 md:pb-36">
      
      {/* Ilustraciones Flotantes en el Fondo */}
      <CoffeeBag className="absolute top-12 left-[4%] w-28 h-28 text-brand-green-dark/5 animate-float-fast hidden lg:block" />
      <CoffeeCup className="absolute bottom-20 right-[8%] w-24 h-24 text-brand-brown-dark/5 animate-float-slow hidden md:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          
          {/* Text and Features */}
          <ScrollReveal className="text-left" delay={100}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-brown-dark mb-3">
              Sector Corporativo & Profesional
            </p>
            <h2 className="font-chaloops text-3xl font-black text-brand-green-dark sm:text-4xl md:text-5xl leading-none mb-6">
              Rondas de Negocios y Exposición Comercial
            </h2>
            <p className="text-sm md:text-base font-medium leading-relaxed text-brand-green-dark/80 mb-8">
              En el interior del Centro Cultural Fontanarrosa, habilitaremos espacios exclusivos para expandir la red de contactos comerciales, cerrar contratos y potenciar tu marca en el mercado regional.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark shadow-sm">
                  <Handshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-brand-green-dark mb-1">Rondas de Networking</h3>
                  <p className="text-sm font-medium text-brand-green-dark/70 leading-relaxed">
                    Reuniones cara a cara previamente agendadas entre importadores, tostadores, traders y dueños de locales gastronómicos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-brand-green-light/40 text-brand-green-dark shadow-sm">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-brand-green-dark mb-1">Stands y Muestras</h3>
                  <p className="text-sm font-medium text-brand-green-dark/70 leading-relaxed">
                    Pagodas exclusivas en el exterior y mesas interiores para exhibición de productos, catas privadas y venta mayorista.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark shadow-sm">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-brand-green-dark mb-1">Acceso Preferencial</h3>
                  <p className="text-sm font-medium text-brand-green-dark/70 leading-relaxed">
                    Acreditación especial como participante corporativo, ingreso prioritario a conferencias y catálogo digital de expositores.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* B2B Form Card */}
          <ScrollReveal className="relative border border-brand-green-dark/20 bg-white p-6 sm:p-8 shadow-brutal rounded-[1.5rem] text-left" delay={250}>
            {/* Stamp / Sello de Marca */}
            <SelloFeria className="absolute -top-8 -right-6 z-30" />

            <h3 className="font-serif text-2xl font-black text-brand-green-dark mb-2">
              Participá como Profesional
            </h3>
            <p className="text-xs font-bold text-brand-brown-dark mb-6 uppercase tracking-wider">
              Postulate para rondas de negocios o stands
            </p>

            {success ? (
              <div className="border border-brand-green-dark/20 bg-brand-green-light/10 p-6 rounded-xl text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-brand-green-dark mb-4 animate-bounce" />
                <h4 className="font-serif text-lg font-bold text-brand-green-dark mb-2">
                  ¡Solicitud Enviada!
                </h4>
                <p className="text-sm text-brand-green-dark/80 font-medium leading-relaxed">
                  Gracias por tu interés en Rosario EXPO CAFE. Nuestro equipo de coordinación B2B se pondrá en contacto a la brevedad para validar tus datos y coordinar los espacios.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 neo-brutal-btn-brown py-2.5 px-4 text-xs rounded-lg w-full"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                    Nombre de la Empresa o Emprendimiento
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Tostadero Rosario Café"
                    className="w-full border border-brand-green-dark/20 bg-white p-3 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                    Nombre del Contacto
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className="w-full border border-brand-green-dark/20 bg-white p-3 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                      WhatsApp / Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej. +54 9 341 1234567"
                      className="w-full border border-brand-green-dark/20 bg-white p-3 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                      Correo Corporativo
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-brand-green-dark/30">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@empresa.com"
                        className="w-full border border-brand-green-dark/20 bg-white pl-10 pr-3 py-3 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                    ¿Cómo querés participar?
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-brand-green-dark/20 bg-white p-3 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23204532' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                  >
                    <option value="Expositor">Quiero tener un Stand / Pagoda</option>
                    <option value="Ronda de Negocios">Participar sólo de Rondas de Negocios</option>
                    <option value="Sponsor">Quiero ser Sponsor Oficial</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full neo-brutal-btn-brown py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? 'Enviando...' : 'Enviar Solicitud B2B'}
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-brand-green-dark/10"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-white px-3 font-bold text-brand-green-dark/50">O escríbenos directamente</span>
                  </div>
                </div>

                <a 
                  href="https://wa.me/5493412296868?text=Hola!%20Quiero%20más%20información%20sobre%20los%20stands%20y%20exposición%20B2B%20de%20Rosario%20EXPO%20CAFE."
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full flex items-center justify-center gap-2 border border-green-500/20 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white py-3.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp shrink-0" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 8 0a7.85 7.85 0 0 0-7.563 5.887 7.86 7.86 0 0 0 1.082 3.97L0 16l4.24-1.113a7.96 7.96 0 0 0 3.76 1.081h.001c4.321 0 7.842-3.52 7.843-7.84a7.84 7.84 0 0 0-2.283-5.546zM8 14.333a6.76 6.76 0 0 1-3.473-.96l-.25-.148-2.584.678.69-2.522-.162-.262a6.761 6.761 0 0 1-1.036-3.6C1.248 4.417 4.27 1.39 8 1.39c1.82 0 3.53.71 4.82 2s2 3 2 4.82c-.001 3.77-3.027 6.797-6.8 6.797zM11.5 9.5c-.195-.1-.1.29-.75.29-.262 0-.585-.148-.962-.487-.306-.27-.585-.563-.82-.888-.235-.325-.347-.563-.347-.563s.112-.125.25-.262c.1-.1.15-.225.225-.325.075-.1.037-.225-.012-.325-.05-.1-.45-1.075-.612-1.475-.162-.387-.325-.337-.45-.337-.112 0-.25-.013-.387-.013s-.363.05-.55.25c-.187.2-.712.7-.712 1.712s.737 1.987.837 2.125c.1.137 1.45 2.212 3.512 3.1 2.062.888 2.062.588 2.437.55.375-.037 1.2-.5 1.363-1 .162-.5.162-.925.112-1-.05-.075-.187-.125-.375-.225z"/>
                  </svg>
                  <span>Enviar Mensaje de WhatsApp</span>
                </a>
              </form>
            )}
          </ScrollReveal>

        </div>
      </div>

      {/* Sloped divider transitioning into the light green background (#d5dabd) of Stage section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full" style={{ fill: '#d5dabd' }}>
          <path d="M1200 120L0 120 0 0z"></path>
        </svg>
      </div>
    </section>
  );
}

const SelloFeria = ({ className, angle = '-8deg' }) => (
  <div 
    className={`w-20 h-20 rounded-full border border-brand-brown-dark/30 flex flex-col items-center justify-center text-center p-1 bg-brand-cream text-brand-brown-dark select-none shadow-md ${className}`}
    style={{ transform: `rotate(${angle})` }}
  >
    <div className="w-full h-full rounded-full border border-dashed border-brand-brown-dark/50 flex flex-col items-center justify-center">
      <span className="text-[6px] tracking-[0.15em] uppercase font-black leading-none text-brand-brown-dark/70">EXPOSITOR</span>
      <span className="font-serif text-sm font-black leading-none my-0.5">B2B</span>
      <span className="text-[6px] tracking-[0.1em] uppercase font-black leading-none text-brand-brown-dark/70">ROSARIO</span>
    </div>
  </div>
);

const CoffeeBag = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30 30L35 85H65L70 30C60 27 40 27 30 30Z" fill="currentColor" fillOpacity="0.04" />
    <path d="M30 30C35 33 65 33 70 30" />
    <path d="M28 35H72" strokeWidth="3" />
    <rect x="40" y="48" width="20" height="20" rx="2" />
    <path d="M45 58H55" />
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
