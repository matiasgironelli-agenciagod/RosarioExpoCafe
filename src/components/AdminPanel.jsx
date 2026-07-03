import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { workshops } from '../data/workshopsData';
import { 
  Users, 
  Sparkles, 
  Search, 
  Download, 
  LogOut, 
  Coffee, 
  Eye, 
  EyeOff, 
  Loader2, 
  TrendingUp 
} from 'lucide-react';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Data States
  const [generalRegs, setGeneralRegs] = useState([]);
  const [workshopRegs, setWorkshopRegs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generalSearch, setGeneralSearch] = useState('');
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(workshops[0]?.id || '');
  const [workshopSearch, setWorkshopSearch] = useState('');

  // Check login session in localStorage
  useEffect(() => {
    const session = localStorage.getItem('rosario_expo_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (username === 'rosarioexpocafe' && password === 'pregot2026') {
      setIsAuthenticated(true);
      localStorage.setItem('rosario_expo_admin_session', 'true');
      fetchData();
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rosario_expo_admin_session');
    setUsername('');
    setPassword('');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (supabase) {
        // Fetch General Registrations
        const { data: generalData, error: generalError } = await supabase
          .from('general_registrations')
          .select('*')
          .order('created_at', { ascending: false });

        if (generalError) throw generalError;
        setGeneralRegs(generalData || []);

        // Fetch Workshop Registrations
        const { data: workshopData, error: workshopError } = await supabase
          .from('workshop_registrations')
          .select('*')
          .order('created_at', { ascending: false });

        if (workshopError) throw workshopError;
        setWorkshopRegs(workshopData || []);
      } else {
        // Fallback localStorage data
        const localGeneral = JSON.parse(localStorage.getItem('general_registrations') || '[]');
        // Sort descending
        localGeneral.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setGeneralRegs(localGeneral);

        const localWorkshops = JSON.parse(localStorage.getItem('workshop_registrations') || '[]');
        localWorkshops.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setWorkshopRegs(localWorkshops);
      }
    } catch (err) {
      console.error("Error al cargar datos del panel:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to export to CSV (UTF-8 BOM added for Excel compatibility)
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    // Headers
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header] === null || row[header] === undefined ? '' : row[header];
        // Escape double quotes
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvContent = "\uFEFF" + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for dashboard
  const totalGeneralCount = generalRegs.length;
  const totalWorkshopCount = workshopRegs.length;
  const totalActiveWorkshops = workshops.length;

  // Filtered lists
  const filteredGeneral = generalRegs.filter(reg => {
    const term = generalSearch.toLowerCase();
    return reg.name.toLowerCase().includes(term) || reg.email.toLowerCase().includes(term);
  });

  const selectedWorkshopRegs = workshopRegs.filter(reg => reg.workshop_id === selectedWorkshopId);
  const filteredWorkshopRegs = selectedWorkshopRegs.filter(reg => {
    const term = workshopSearch.toLowerCase();
    return reg.name.toLowerCase().includes(term) || reg.email.toLowerCase().includes(term);
  });

  // Calculate counts for individual workshops
  const getWorkshopCounts = (id) => {
    return workshopRegs.filter(reg => reg.workshop_id === id).length;
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  if (!isAuthenticated) {
    // LOGIN VIEW
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4 py-12 relative overflow-hidden">
        {/* Floating background coffee bean SVGs */}
        <CoffeeBean className="absolute top-12 left-[10%] w-24 h-24 text-brand-green-dark/5 animate-float-slow" />
        <CoffeeBean className="absolute bottom-12 right-[10%] w-32 h-32 text-brand-green-dark/5 animate-float-medium" />

        <div className="w-full max-w-md border border-brand-green-dark/20 bg-white p-8 shadow-brutal rounded-[2rem] text-left relative z-10">
          <div className="flex flex-col items-center mb-8">
            <img src="/REC png.png" alt="Logo" className="h-16 w-auto mb-4" onError={(e) => e.target.style.display = 'none'} />
            <h1 className="font-chaloops text-2xl font-black text-brand-green-dark text-center leading-none">
              Acceso Organizadores
            </h1>
            <p className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider mt-2">
              Rosario EXPO CAFE 2026
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                Usuario
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full border border-brand-green-dark/20 bg-white p-3 text-sm font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 transition-all placeholder:text-brand-green-dark/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-green-dark/70 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-brand-green-dark/20 bg-white p-3 text-sm font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/50 pr-10 transition-all placeholder:text-brand-green-dark/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-brand-green-dark/40 hover:text-brand-green-dark"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 p-3 rounded-xl">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full neo-brutal-btn-dark py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="#" className="text-xs font-bold text-brand-green-dark/60 hover:text-brand-green-dark transition-colors">
              ← Volver al Sitio
            </a>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED PANEL VIEW
  return (
    <div className="min-h-screen bg-brand-cream py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="mx-auto max-w-7xl">
        
        {/* Cabecera del Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between border border-brand-green-dark/15 bg-white p-6 rounded-[2rem] shadow-sm mb-8 gap-4">
          <div className="flex items-center gap-4">
            <img src="/REC png.png" alt="Logo" className="h-12 w-auto" onError={(e) => e.target.style.display = 'none'} />
            <div>
              <h1 className="font-chaloops text-2xl font-black text-brand-green-dark leading-none">
                Panel de Control
              </h1>
              <p className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider mt-1">
                Administración y Métricas del Evento
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-brand-green-dark/15 bg-brand-cream text-brand-green-dark shadow-sm hover:shadow transition-all disabled:opacity-50"
              title="Refrescar Datos"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <TrendingUp className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-red-200 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-red-100 transition-all shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Bloque de Métricas Generales */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="border border-brand-green-dark/15 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green-dark/50">
                Acreditaciones Feria
              </span>
              <p className="font-chaloops text-4xl font-black text-brand-green-dark mt-2">
                {loading ? '...' : totalGeneralCount}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green-dark/10 bg-brand-cream text-brand-green-dark shadow-sm">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="border border-brand-green-dark/15 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green-dark/50">
                Reservas de Workshops
              </span>
              <p className="font-chaloops text-4xl font-black text-brand-green-dark mt-2">
                {loading ? '...' : totalWorkshopCount}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green-dark/10 bg-brand-cream text-brand-green-dark shadow-sm">
              <Coffee className="h-6 w-6" />
            </div>
          </div>

          <div className="border border-brand-green-dark/15 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green-dark/50">
                Talleres Activos
              </span>
              <p className="font-chaloops text-4xl font-black text-brand-green-dark mt-2">
                {totalActiveWorkshops}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green-dark/10 bg-brand-green-light/40 text-brand-green-dark shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Sección Workshops - Inscripciones por Taller */}
        <div className="border border-brand-green-dark/15 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm mb-8">
          <h2 className="font-chaloops text-xl font-black text-brand-green-dark mb-6">
            Inscriptos por Workshop
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workshops.map(ws => {
              const currentSeats = getWorkshopCounts(ws.id);

              return (
                <div key={ws.id} className="border border-brand-green-dark/10 bg-brand-cream/30 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
                  <div>
                    <h3 className="font-serif text-sm font-black text-brand-green-dark line-clamp-2 mb-1" title={ws.title}>
                      {ws.title}
                    </h3>
                    <p className="text-[10px] font-bold text-brand-green-dark/50 uppercase tracking-wider mb-4 line-clamp-1">
                      {ws.speaker}
                    </p>
                  </div>

                  <div className="flex items-end justify-between border-t border-brand-green-dark/10 pt-3 text-xs font-bold text-brand-green-dark">
                    <span>Total Inscriptos</span>
                    <span className="text-brand-brown-dark font-black text-sm">
                      {currentSeats}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablas de Gestión */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Tabla Acreditados Generales */}
          <div className="border border-brand-green-dark/15 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm flex flex-col justify-between min-h-[450px]">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-chaloops text-xl font-black text-brand-green-dark leading-none">
                    Acreditaciones Feria
                  </h2>
                  <p className="text-xs font-bold text-brand-green-dark/50 uppercase tracking-wider mt-1">
                    Visitantes Registrados
                  </p>
                </div>
                <button
                  onClick={() => exportToCSV(generalRegs, 'acreditados_generales_expo_cafe.csv')}
                  disabled={generalRegs.length === 0}
                  className="inline-flex items-center justify-center gap-2 border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark px-4 py-2.5 rounded-xl text-xs font-black hover:bg-brand-green-dark hover:text-brand-cream transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar CSV</span>
                </button>
              </div>

              {/* Barra de Búsqueda */}
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-3 flex items-center text-brand-green-dark/30">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={generalSearch}
                  onChange={(e) => setGeneralSearch(e.target.value)}
                  placeholder="Buscar por nombre o correo..."
                  className="w-full border border-brand-green-dark/15 bg-white pl-9 pr-3 py-2 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/30 placeholder:text-brand-green-dark/30"
                />
              </div>

              {/* List Table Container */}
              <div className="overflow-x-auto border border-brand-green-dark/10 rounded-xl max-h-[300px] overflow-y-auto">
                <table className="min-w-full divide-y divide-brand-green-dark/10 text-xs text-left">
                  <thead className="bg-brand-cream/60 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Nombre</th>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Correo</th>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-green-dark/5 bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-brand-green-dark/50 font-bold">
                          Cargando...
                        </td>
                      </tr>
                    ) : filteredGeneral.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-brand-green-dark/50 font-bold">
                          No se encontraron registros.
                        </td>
                      </tr>
                    ) : (
                      filteredGeneral.map(reg => (
                        <tr key={reg.id} className="hover:bg-brand-cream/10">
                          <td className="px-4 py-3.5 font-bold text-brand-green-dark whitespace-nowrap">{reg.name}</td>
                          <td className="px-4 py-3.5 font-medium text-brand-green-dark/80">{reg.email}</td>
                          <td className="px-4 py-3.5 text-brand-green-dark/60 whitespace-nowrap">{formatDate(reg.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-brand-green-dark/10 pt-4 mt-6 flex justify-between items-center text-xs font-bold text-brand-green-dark/60">
              <span>Total filtrados: {filteredGeneral.length}</span>
              <span>Total registros: {generalRegs.length}</span>
            </div>
          </div>

          {/* Tabla Workshops */}
          <div className="border border-brand-green-dark/15 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm flex flex-col justify-between min-h-[450px]">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-chaloops text-xl font-black text-brand-green-dark leading-none">
                    Inscripción a Talleres
                  </h2>
                  <p className="text-xs font-bold text-brand-green-dark/50 uppercase tracking-wider mt-1">
                    Inscriptos por Workshop
                  </p>
                </div>
                <button
                  onClick={() => {
                    const wsInfo = workshops.find(w => w.id === selectedWorkshopId);
                    const filename = `inscriptos_${wsInfo?.title.toLowerCase().replace(/ /g, '_')}_expo_cafe.csv`;
                    exportToCSV(selectedWorkshopRegs, filename);
                  }}
                  disabled={selectedWorkshopRegs.length === 0}
                  className="inline-flex items-center justify-center gap-2 border border-brand-green-dark/20 bg-brand-cream text-brand-green-dark px-4 py-2.5 rounded-xl text-xs font-black hover:bg-brand-green-dark hover:text-brand-cream transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar CSV</span>
                </button>
              </div>

              {/* Selector de Workshop & Buscador */}
              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <select
                  value={selectedWorkshopId}
                  onChange={(e) => setSelectedWorkshopId(e.target.value)}
                  className="w-full border border-brand-green-dark/15 bg-white p-2.5 text-xs font-bold text-brand-green-dark rounded-xl shadow-sm focus:outline-none appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23204532' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                >
                  {workshops.map(ws => (
                    <option key={ws.id} value={ws.id}>
                      {ws.title} ({getWorkshopCounts(ws.id)})
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-brand-green-dark/30">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={workshopSearch}
                    onChange={(e) => setWorkshopSearch(e.target.value)}
                    placeholder="Buscar por nombre o correo..."
                    className="w-full border border-brand-green-dark/15 bg-white pl-9 pr-3 py-2.5 text-xs font-medium text-brand-green-dark rounded-xl shadow-sm focus:outline-none focus:border-brand-green-dark/30 placeholder:text-brand-green-dark/30"
                  />
                </div>
              </div>

              {/* List Table Container */}
              <div className="overflow-x-auto border border-brand-green-dark/10 rounded-xl max-h-[290px] overflow-y-auto">
                <table className="min-w-full divide-y divide-brand-green-dark/10 text-xs text-left">
                  <thead className="bg-brand-cream/60 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Nombre</th>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Correo</th>
                      <th className="px-4 py-3 font-bold text-brand-green-dark uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-green-dark/5 bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-brand-green-dark/50 font-bold">
                          Cargando...
                        </td>
                      </tr>
                    ) : filteredWorkshopRegs.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-brand-green-dark/50 font-bold">
                          No se encontraron registros.
                        </td>
                      </tr>
                    ) : (
                      filteredWorkshopRegs.map(reg => (
                        <tr key={reg.id} className="hover:bg-brand-cream/10">
                          <td className="px-4 py-3.5 font-bold text-brand-green-dark whitespace-nowrap">{reg.name}</td>
                          <td className="px-4 py-3.5 font-medium text-brand-green-dark/80">{reg.email}</td>
                          <td className="px-4 py-3.5 text-brand-green-dark/60 whitespace-nowrap">{formatDate(reg.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-brand-green-dark/10 pt-4 mt-6 flex justify-between items-center text-xs font-bold text-brand-green-dark/60">
              <span>Total filtrados: {filteredWorkshopRegs.length}</span>
              <span>Total taller: {selectedWorkshopRegs.length}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

const CoffeeBean = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <ellipse cx="50" cy="50" rx="25" ry="38" transform="rotate(-30 50 50)" fill="currentColor" fillOpacity="0.04" />
    <path d="M36 28C43 40 45 60 66 72" />
  </svg>
);
