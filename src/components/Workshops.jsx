import React, { useState, useEffect } from 'react';
import { workshops } from '../data/workshopsData';
import { supabase } from '../lib/supabase';
import { Sparkles, Clock, User, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Workshops() {
  const [counts, setCounts] = useState({});
  const [successStatus, setSuccessStatus] = useState({}); // { [workshopId]: true/false }
  const [loadingStatus, setLoadingStatus] = useState({}); // { [workshopId]: true/false }
  const [errors, setErrors] = useState({}); // { [workshopId]: 'error message' }
  const [formData, setFormData] = useState({}); // { [workshopId]: { name, email } }

  // Cargar contador de inscritos para cada taller
  const fetchRegistrationsCount = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('workshop_registrations')
          .select('workshop_id');

        if (error) throw error;

        // Agrupar conteos
        const countsMap = {};
        data.forEach((row) => {
          countsMap[row.workshop_id] = (countsMap[row.workshop_id] || 0) + 1;
        });
        setCounts(countsMap);
      } else {
        // Fallback localStorage counts
        const localData = JSON.parse(localStorage.getItem('workshop_registrations') || '[]');
        const countsMap = {};
        localData.forEach((row) => {
          countsMap[row.workshop_id] = (countsMap[row.workshop_id] || 0) + 1;
        });
        setCounts(countsMap);
      }
    } catch (err) {
      console.error("Error cargando contadores de workshops:", err);
    }
  };

  useEffect(() => {
    fetchRegistrationsCount();
  }, []);

  const handleInputChange = (workshopId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [workshopId]: {
        ...(prev[workshopId] || { name: '', email: '' }),
        [field]: value
      }
    }));
  };

  const handleWorkshopSubmit = async (e, workshopId) => {
    e.preventDefault();
    setLoadingStatus((prev) => ({ ...prev, [workshopId]: true }));
    setErrors((prev) => ({ ...prev, [workshopId]: '' }));

    const wsData = formData[workshopId] || { name: '', email: '' };

    if (!wsData.name || !wsData.email) {
      setErrors((prev) => ({ ...prev, [workshopId]: 'Por favor, completa todos los campos.' }));
      setLoadingStatus((prev) => ({ ...prev, [workshopId]: false }));
      return;
    }

    try {
      if (supabase) {
        const { error } = await supabase
          .from('workshop_registrations')
          .insert([
            {
              name: wsData.name,
              email: wsData.email.toLowerCase(),
              workshop_id: workshopId
            }
          ]);

        if (error) {
          if (error.code === '23505') {
            throw new Error('Ya estás pre-inscripto a este workshop con este correo.');
          }
          throw error;
        }
      } else {
        // Localstorage Flow
        const localData = JSON.parse(localStorage.getItem('workshop_registrations') || '[]');
        const alreadyRegistered = localData.some(
          (row) => row.email === wsData.email.toLowerCase() && row.workshop_id === workshopId
        );

        if (alreadyRegistered) {
          throw new Error('Ya estás pre-inscripto a este workshop con este correo en la demo local.');
        }

        localData.push({
          name: wsData.name,
          email: wsData.email.toLowerCase(),
          workshop_id: workshopId,
          created_at: new Date().toISOString()
        });
        localStorage.setItem('workshop_registrations', JSON.stringify(localData));
      }

      setSuccessStatus((prev) => ({ ...prev, [workshopId]: true }));
      // Reset form fields
      setFormData((prev) => ({
        ...prev,
        [workshopId]: { name: '', email: '' }
      }));
      // Recargar contadores
      fetchRegistrationsCount();
    } catch (err) {
      setErrors((prev) => ({ ...prev, [workshopId]: err.message }));
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [workshopId]: false }));
    }
  };

  return (
    <section id="workshops" className="relative overflow-hidden bg-brand-cream pt-16 pb-28 md:pt-24 md:pb-36">
      
      {/* Ilustraciones Flotantes en el Fondo */}
      <Kettle className="absolute top-16 right-[8%] w-32 h-32 text-brand-green-dark/5 animate-float-slow hidden md:block" />
      <CoffeeBean className="absolute bottom-16 left-[6%] w-20 h-20 text-brand-brown-dark/5 animate-float-medium hidden lg:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <ScrollReveal className="max-w-3xl mb-16 text-left" delay={50}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-brown-dark mb-3">
            Formación e Innovación
          </p>
          <h2 className="font-chaloops text-3xl font-black text-brand-green-dark sm:text-4xl md:text-5xl leading-none">
            Workshops y Talleres Gratuitos
          </h2>
          <p className="mt-4 text-brand-green-dark/80 text-sm md:text-base font-medium max-w-xl">
            Aprendé de baristas expertos, tostadores y especialistas en cata. Reservá tu lugar dejando tu nombre y correo en el taller que te interese.
          </p>
        </ScrollReveal>

        {/* Visual Chronogram / Timeline Layout */}
        <div className="relative space-y-12 before:absolute before:top-2 before:bottom-2 before:left-4 md:before:left-1/2 before:w-[2px] before:bg-brand-brown-dark/20">
          {workshops.map((workshop, index) => {
            const currentRegistered = counts[workshop.id] || 0;
            const remainingSeats = Math.max(0, workshop.capacity - currentRegistered);
            const isFull = remainingSeats <= 0;
            const isSuccess = successStatus[workshop.id];
            const isLoading = loadingStatus[workshop.id];
            const errorMsg = errors[workshop.id];
            const wsForm = formData[workshop.id] || { name: '', email: '' };

            const isEven = index % 2 === 0;
            const dayText = workshop.time.split(' — ')[0];
            const hourText = workshop.time.split(' — ')[1];

            return (
              <ScrollReveal 
                key={workshop.id} 
                delay={index * 100}
                className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[9px] md:-translate-x-1/2 top-4 z-20 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-brand-brown-dark bg-brand-cream">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-brown-dark" />
                </div>

                {/* Time Badge and Day (Aligns opposite to the card on desktop) */}
                <div className={`w-full md:w-1/2 pl-10 pr-4 md:px-8 text-left ${isEven ? 'md:text-left' : 'md:text-right'} mt-2`}>
                  <span className="inline-block rounded-full bg-brand-brown-dark text-brand-cream px-3 py-1 text-xs font-black uppercase tracking-wider">
                    {hourText}
                  </span>
                  <span className="block text-xs font-bold text-brand-green-dark/60 mt-1 uppercase tracking-wider">
                    {dayText}
                  </span>
                </div>

                {/* Card Container Column */}
                <div className="w-full md:w-1/2 pl-10 pr-4 md:px-8 mt-4 md:mt-0">
                  <div className="border border-brand-green-dark/15 bg-white rounded-[1.5rem] p-6 shadow-sm hover:border-brand-green-dark/30 hover:shadow-md transition-all text-left relative z-10">
                    
                    {/* Badge & Spots Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green-dark/20 bg-brand-green-light/40 px-3 py-1 text-xs font-bold text-brand-green-dark">
                        <Sparkles className="h-3 w-3" /> Taller Gratuito
                      </span>
                      <span className={`text-xs font-black uppercase tracking-wider ${isFull ? 'text-red-500' : 'text-brand-brown-dark'}`}>
                        {isFull ? 'Cupos Agotados' : `${remainingSeats} lugares disponibles`}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-black text-brand-green-dark mb-2">
                      {workshop.title}
                    </h3>
                    
                    {/* Speaker */}
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-green-dark/60 mb-4 uppercase tracking-wider">
                      <User className="h-4 w-4 text-brand-brown-dark shrink-0" />
                      <span>{workshop.speaker}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs font-medium text-brand-green-dark/80 mb-6 leading-relaxed">
                      {workshop.description}
                    </p>

                    {/* Form state handling */}
                    {isSuccess ? (
                      <div className="border border-brand-green-dark/20 bg-brand-green-light/10 p-4 rounded-xl text-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-brand-green-dark mb-2 animate-bounce" />
                        <p className="text-xs font-bold text-brand-green-dark">
                          ¡Pre-inscripto con éxito! Te reservamos tu lugar.
                        </p>
                      </div>
                    ) : isFull ? (
                      <div className="border border-red-150 bg-red-50/50 p-4 rounded-xl text-center">
                        <p className="text-xs font-bold text-red-500">
                          Se ha alcanzado el límite máximo de participantes.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleWorkshopSubmit(e, workshop.id)} className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            type="text"
                            required
                            value={wsForm.name}
                            onChange={(e) => handleInputChange(workshop.id, 'name', e.target.value)}
                            placeholder="Tu nombre completo"
                            className="w-full border border-brand-green-dark/15 bg-white p-2.5 text-xs font-medium text-brand-green-dark rounded-lg shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                          />
                          <input
                            type="email"
                            required
                            value={wsForm.email}
                            onChange={(e) => handleInputChange(workshop.id, 'email', e.target.value)}
                            placeholder="Tu correo electrónico"
                            className="w-full border border-brand-green-dark/15 bg-white p-2.5 text-xs font-medium text-brand-green-dark rounded-lg shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
                          />
                        </div>
                        
                        {errorMsg && (
                          <div className="text-[10px] font-bold text-red-500 text-left">
                            ⚠️ {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="neo-brutal-btn-dark py-2 px-4 text-xs rounded-lg w-full"
                        >
                          {isLoading ? 'Registrando...' : 'Reservar mi lugar'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Wave divider transitioning from cream background into white background of B2B section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden leading-none pointer-events-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.83C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}

const Kettle = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30 45H70L65 80H35L30 45Z" fill="currentColor" fillOpacity="0.04" />
    <path d="M30 50C22 50 18 55 18 62C18 69 22 75 30 75" />
    <path d="M42 45L45 38H55L58 45" />
    <path d="M70 70C82 70 85 50 82 35C81 30 76 25 76 25" />
  </svg>
);

const CoffeeBean = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <ellipse cx="50" cy="50" rx="25" ry="38" transform="rotate(-30 50 50)" fill="currentColor" fillOpacity="0.04" />
    <path d="M36 28C43 40 45 60 66 72" />
  </svg>
);
