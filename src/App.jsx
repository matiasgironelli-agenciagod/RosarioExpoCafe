import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Workshops from './components/Workshops';
import B2BSection from './components/B2BSection';
import Stage from './components/Stage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminRoute = currentHash === '#/admin' || currentHash === '#admin' || currentHash.startsWith('#/admin') || currentHash.startsWith('#admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-brand-cream text-brand-green-dark selection:bg-brand-green-light selection:text-brand-green-dark">
        <AdminPanel />
      </div>
    );
  }

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
