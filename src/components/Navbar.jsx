import React, { useState } from 'react';
import { Coffee, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navLinks = [
    { name: 'La Feria', href: '#la-feria' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'B2B & Negocios', href: '#b2b' },
    { name: 'Ubicación', href: '#ubicacion' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex py-2 items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-1 group relative">
              {!logoError ? (
                <img
                  src="/REC png.png"
                  alt="Rosario EXPO CAFE Logo"
                  className="h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green-dark/20 bg-brand-green-light/40 shadow-sm">
                  <Coffee className="h-6 w-6 text-brand-green-dark" />
                </div>
              )}
              <span className="bg-brand-brown-dark text-brand-cream text-[7px] md:text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded border border-brand-green-dark/15 shadow-sm animate-pulse-gentle select-none pointer-events-none whitespace-nowrap mt-3 rotate-[-3deg]">
                2da Edición
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-wider text-brand-green-dark hover:text-brand-brown-dark transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#registro" className="neo-brutal-btn-dark py-2 px-5 text-xs rounded-full">
              Registrarme gratis
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl border border-brand-green-dark/15 bg-white text-brand-green-dark shadow-sm hover:shadow transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-green-dark/10 bg-brand-cream/98 px-4 pt-4 pb-6 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl border border-brand-green-dark/10 bg-white px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-green-dark shadow-sm"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#registro"
            onClick={() => setIsOpen(false)}
            className="block text-center neo-brutal-btn-dark py-3.5 rounded-xl text-xs"
          >
            Registrarme gratis
          </a>
        </div>
      )}
    </header>
  );
}
