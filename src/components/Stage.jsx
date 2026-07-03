import React from 'react';
import { Music, Gift, Map, Compass, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Stage() {
  return (
    <section id="ubicacion" className="relative overflow-hidden bg-brand-green-light pt-16 pb-28 md:pt-24 md:pb-36 text-left">
      
      {/* Ilustraciones Flotantes en el Fondo */}
      <TakeawayCup className="absolute top-12 left-[12%] w-28 h-28 text-brand-green-dark/5 animate-float-slow hidden lg:block" />
      <CoffeeBean className="absolute bottom-20 right-[10%] w-20 h-20 text-brand-brown-dark/5 animate-float-medium hidden md:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          
          {/* Experience, Music & Sorteos */}
          <ScrollReveal className="flex flex-col justify-between" delay={100}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green-dark/70 mb-3">
                Entretenimiento y Comunidad
              </p>
              <h2 className="font-chaloops text-3xl font-black text-brand-green-dark sm:text-4xl md:text-5xl leading-none mb-6">
                Escenario y Sorteos en Vivo
              </h2>
              <p className="text-sm md:text-base font-medium leading-relaxed text-brand-green-dark/80 mb-8">
                La feria no es sólo negocios y capacitación, también es un punto de encuentro social. Tendremos una grilla de actividades culturales para disfrutar en familia y con amigos.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border border-brand-green-dark/20 bg-white p-5 rounded-xl shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark mb-4">
                    <Music className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-black text-brand-green-dark mb-2">Música y Shows</h3>
                  <p className="text-xs font-medium text-brand-green-dark/70 leading-relaxed">
                    Bandas locales en vivo, sets acústicos y sets de DJs que darán el marco sonoro perfecto al atardecer en el sector exterior.
                  </p>
                </div>

                <div className="border border-brand-green-dark/20 bg-white p-5 rounded-xl shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark mb-4">
                    <Gift className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-black text-brand-green-dark mb-2">Sorteos de Insumos</h3>
                  <p className="text-xs font-medium text-brand-green-dark/70 leading-relaxed">
                    Sorteos exclusivos para el público registrado: bolsas de café de diversos tostadores, kits de filtrado manual y accesorios de barista.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-brand-green-dark/20 bg-brand-cream p-5 rounded-xl">
              <p className="text-xs font-bold text-brand-green-dark/80 leading-normal">
                💡 **¿Sabías qué?** Todos los talleres y workshops tienen acceso libre con tu acreditación general, pero la capacidad de la sala es por orden de llegada hasta agotar cupos de la sala física. ¡Te recomendamos pre-inscribirte arriba!
              </p>
            </div>
          </ScrollReveal>

          {/* Location & Map representation */}
          <ScrollReveal className="border border-brand-green-dark/20 bg-white p-6 sm:p-8 shadow-brutal rounded-[1.5rem] flex flex-col justify-between" delay={250}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Map className="h-7 w-7 text-brand-green-dark shrink-0" />
                <h3 className="font-chaloops text-2xl font-black text-brand-green-dark leading-none">
                  ¿Cómo Llegar?
                </h3>
              </div>

              <p className="text-sm font-medium text-brand-green-dark/80 mb-6 leading-relaxed">
                El **Centro Cultural Fontanarrosa** está ubicado en pleno centro de Rosario, un lugar emblemático de fácil acceso desde cualquier punto de la ciudad y de la región.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-brand-brown-dark shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-brand-green-dark">Dirección</h4>
                    <p className="text-sm font-bold text-brand-green-dark">San Martín 1080, Rosario, Santa Fe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-brand-brown-dark shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-brand-green-dark">Días y Horarios</h4>
                    <p className="text-sm font-bold text-brand-green-dark">28 y 29 de Agosto — 12:00 a 20:00 hs (A confirmar)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded maps or stylized maps placeholder representing top UI/UX */}
            <div className="mt-8 border border-brand-green-dark/20 bg-brand-cream rounded-2xl overflow-hidden aspect-video relative group shadow-sm">
              <div className="absolute inset-0 bg-brand-cream/80 flex flex-col items-center justify-center p-6 text-center z-10">
                <MapPin className="h-10 w-10 text-brand-brown-dark mb-2 animate-bounce" />
                <h4 className="font-serif text-lg font-black text-brand-green-dark">Centro Cultural Fontanarrosa</h4>
                <p className="text-xs font-bold text-brand-green-dark/70 mt-1 max-w-[200px]">
                  Plaza Montenegro, San Martín 1080
                </p>
                <a 
                  href="https://maps.google.com/?q=Centro+Cultural+Fontanarrosa+Rosario" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="mt-4 neo-brutal-btn-dark py-2.5 px-4 text-[10px] rounded-lg"
                >
                  Abrir en Google Maps
                </a>
              </div>
              
              {/* Map background grid pattern representing abstract streets */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#204532 2px, transparent 2px), linear-gradient(90deg, #204532 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* Wave divider transitioning from light green background into dark green (#204532) of the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full" style={{ fill: '#204532' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z"></path>
        </svg>
      </div>
    </section>
  );
}

const TakeawayCup = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 35L38 85H62L68 35" fill="currentColor" fillOpacity="0.04" />
    <path d="M28 30H72V35H28V30Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M34 50H66L64 70H36L34 50Z" strokeWidth="2" fill="currentColor" fillOpacity="0.04" />
  </svg>
);

const CoffeeBean = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <ellipse cx="50" cy="50" rx="25" ry="38" transform="rotate(-30 50 50)" fill="currentColor" fillOpacity="0.04" />
    <path d="M36 28C43 40 45 60 66 72" />
  </svg>
);
