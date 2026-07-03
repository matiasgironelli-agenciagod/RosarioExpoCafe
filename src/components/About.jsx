import React from 'react';
import { Coffee, Store, Users, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const cards = [
    {
      icon: <Coffee className="h-6 w-6 text-brand-green-dark" />,
      title: "Expendio de Café Especial",
      description: "Probá espressos y filtrados elaborados con granos de diversos orígenes y métodos de preparación de clase mundial.",
      colorClass: "bg-brand-green-light"
    },
    {
      icon: <Store className="h-6 w-6 text-brand-cream" />,
      title: "Corredor Gastronómico",
      description: "En el sector externo se dispondrá de un corredor compuesto por 10 a 12 pagodas para emprendimientos gastronómicos regionales.",
      colorClass: "bg-brand-brown-dark text-brand-cream"
    },
    {
      icon: <Users className="h-6 w-6 text-brand-green-dark" />,
      title: "Espacio Corporativo B2B",
      description: "El espacio interior se reservará exclusivamente para fortalecer el sector corporativo y profesional del café.",
      colorClass: "bg-white",
      showStamp: true
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-brand-green-dark" />,
      title: "Cultura y Aprendizaje",
      description: "Participá de conferencias, workshops y talleres gratuitos dedicados al consumo responsable y la cultura del café.",
      colorClass: "bg-brand-cream"
    }
  ];

  return (
    <section id="la-feria" className="relative overflow-hidden bg-white pt-16 pb-28 md:pt-24 md:pb-36">
      
      {/* Ilustraciones Flotantes en el Fondo */}
      <Dripper className="absolute bottom-12 right-[5%] w-32 h-32 text-brand-green-dark/5 animate-float-medium hidden lg:block" />
      <CoffeeBean className="absolute top-16 right-[12%] w-24 h-24 text-brand-brown-dark/5 animate-float-slow hidden md:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16 text-left" delay={50}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-brown-dark mb-3">
            Acerca del evento
          </p>
          <h2 className="font-chaloops text-3xl font-black text-brand-green-dark sm:text-4xl md:text-5xl leading-none">
            Una experiencia diseñada para profesionales y apasionados del café
          </h2>
        </ScrollReveal>

        {/* 2x2 Grid of Event Aspects */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <ScrollReveal 
              key={index} 
              delay={index * 120}
              className="flex relative"
            >
              {card.showStamp && (
                <SelloFeria className="absolute -top-8 -right-4 z-30" />
              )}
              <div 
                className={`border border-brand-green-dark/15 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:border-brand-green-dark/30 hover:shadow-md transition-all w-full relative z-10 ${card.colorClass}`}
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-white shadow-sm mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-serif text-xl font-black mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mid banner with statistical summary / features */}
        <ScrollReveal delay={150}>
          <div className="mt-16 border border-brand-green-dark/25 bg-brand-cream p-8 sm:p-12 rounded-[2rem] shadow-sm grid gap-8 md:grid-cols-3 text-left">
            <div>
              <span className="font-serif text-5xl font-black text-brand-green-dark block mb-2">12+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark">
                Cafeterías & Tostadores
              </span>
              <p className="text-sm text-brand-green-dark/70 font-medium mt-2 leading-relaxed">
                Los máximos exponentes locales e invitados especiales del país sirviendo café fresco sin costo adicional de entrada.
              </p>
            </div>
            <div className="border-t border-brand-green-dark/15 md:border-t-0 md:border-l border-dashed pt-6 md:pt-0 md:pl-8">
              <span className="font-serif text-5xl font-black text-brand-green-dark block mb-2">100%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark">
                Acceso Gratuito
              </span>
              <p className="text-sm text-brand-green-dark/70 font-medium mt-2 leading-relaxed">
                Todo el cronograma de charlas, workshops y el acceso general a la feria es libre y abierto al público general.
              </p>
            </div>
            <div className="border-t border-brand-green-dark/15 md:border-t-0 md:border-l border-dashed pt-6 md:pt-0 md:pl-8">
              <span className="font-serif text-5xl font-black text-brand-green-dark block mb-2">B2B</span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brown-dark">
                Networking Corporativo
              </span>
              <p className="text-sm text-brand-green-dark/70 font-medium mt-2 leading-relaxed">
                Rondas de negocios diseñadas para que marcas de insumos, máquinas y distribuidores consoliden su base comercial regional.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Wave divider transitioning from white background into brand-cream (#fff0de) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-brand-cream">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z"></path>
        </svg>
      </div>
    </section>
  );
}

const SelloFeria = ({ className, angle = '8deg' }) => (
  <div 
    className={`w-20 h-20 rounded-full border border-brand-brown-dark/30 flex flex-col items-center justify-center text-center p-1 bg-brand-cream text-brand-brown-dark select-none shadow-md ${className}`}
    style={{ transform: `rotate(${angle})` }}
  >
    <div className="w-full h-full rounded-full border border-dashed border-brand-brown-dark/50 flex flex-col items-center justify-center">
      <span className="text-[6px] tracking-[0.15em] uppercase font-black leading-none text-brand-brown-dark/70">NEGOCIOS</span>
      <span className="font-serif text-sm font-black leading-none my-0.5">EXPO</span>
      <span className="text-[6px] tracking-[0.1em] uppercase font-black leading-none text-brand-brown-dark/70">CONECTA</span>
    </div>
  </div>
);

const Dripper = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 25H80L65 65H35L20 25Z" fill="currentColor" fillOpacity="0.04" />
    <path d="M32 75H68V85C68 87.2 66.2 89 64 89H36C33.8 89 32 87.2 32 85V75Z" />
    <path d="M30 69H70" strokeWidth="4" />
    <path d="M65 40C72 40 76 43 76 48C76 53 72 56 65 56" />
  </svg>
);

const CoffeeBean = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <ellipse cx="50" cy="50" rx="25" ry="38" transform="rotate(-30 50 50)" fill="currentColor" fillOpacity="0.04" />
    <path d="M36 28C43 40 45 60 66 72" />
  </svg>
);
