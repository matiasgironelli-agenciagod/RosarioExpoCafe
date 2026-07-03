import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Workshops from './components/Workshops';
import B2BSection from './components/B2BSection';
import Stage from './components/Stage';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-green-dark selection:bg-brand-green-light selection:text-brand-green-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Workshops />
        <B2BSection />
        <Stage />
      </main>
      <Footer />
    </div>
  );
}
