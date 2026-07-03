import React from 'react';
import { Coffee, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-green-dark border-t-2 border-brand-green-dark text-brand-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-brand-cream/10 text-center md:text-left">
          
          {/* Logo & Branding */}
          <div className="flex items-center">
            <img
              src="/REC cremita png.png"
              alt="Rosario EXPO CAFE Logo"
              className="h-20 w-auto object-contain transition-transform hover:scale-105 duration-200"
            />
          </div>

          {/* Site links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-wider">
            <a href="#la-feria" className="hover:text-brand-green-light transition-colors">La Feria</a>
            <a href="#workshops" className="hover:text-brand-green-light transition-colors">Workshops</a>
            <a href="#b2b" className="hover:text-brand-green-light transition-colors">Negocios B2B</a>
            <a href="#ubicacion" className="hover:text-brand-green-light transition-colors">Ubicación</a>
          </div>

          {/* Socials & Top */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/rosarioexpocafe" 
              target="_blank" 
              rel="noreferrer noopener" 
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-cream/30 bg-transparent hover:bg-brand-cream hover:text-brand-green-dark transition-all text-brand-cream shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <button 
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-brand-green-light text-brand-green-dark hover:bg-brand-cream hover:text-brand-green-dark transition-all shadow-sm"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Legal & Credits */}
        <div className="pt-8 text-center md:flex md:items-center md:justify-between text-xs font-semibold text-brand-green-light/60">
          <p>© 2026 Rosario EXPO CAFE. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">
            Diseñado con pasión por la cultura del café ☕
          </p>
        </div>

      </div>
    </footer>
  );
}
