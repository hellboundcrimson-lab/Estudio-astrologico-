
import React, { useState } from 'react';
import { ActiveTab, Interpretation, BirthData, PlanetPlacement, Incarnation } from '../types';
import BirthChart from './BirthChart';

interface Props {
  interpretation: Interpretation;
  birthData: BirthData;
  onReset: () => void;
}

const SoulExplorer: React.FC<Props> = ({ interpretation, birthData, onReset }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.DASHBOARD);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPlacement | null>(null);

  const menuItems = [
    { id: ActiveTab.DASHBOARD, icon: '✧', label: 'Ethereal Hub' },
    { id: ActiveTab.KARMIC_LAB, icon: '⚖️', label: 'Karmic Lab' },
    { id: ActiveTab.INCARNATIONS, icon: '⏳', label: 'Past Lives' },
    { id: ActiveTab.BLUEPRINT, icon: '◈', label: 'Soul Profile' },
    { id: ActiveTab.CHART, icon: '❂', label: 'Sidereal Map' },
    { id: ActiveTab.AKASHIC, icon: '📖', label: 'Oracle' },
    { id: ActiveTab.GROWTH, icon: '🌿', label: 'Ascension' },
    { id: ActiveTab.SETTINGS, icon: '⚙️', label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case ActiveTab.DASHBOARD:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="glass-card p-10 rounded-[3rem] border-violet-500/20 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-violet-600/5 glow-bg pointer-events-none"></div>
               <h3 className="text-sm font-bold uppercase tracking-[0.5em] text-violet-500 mb-6">Estado Actual de la Encarnación</h3>
               <p className="text-2xl font-light text-slate-200 leading-relaxed italic">
                 "{interpretation.classical}"
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-card p-8 rounded-3xl border-blue-500/10">
                 <h4 className="font-mystical text-blue-300 text-xl mb-4">Origen Galáctico</h4>
                 <p className="text-slate-400 font-light">{interpretation.starseed.narrative.substring(0, 150)}...</p>
               </div>
               <div className="glass-card p-8 rounded-3xl border-amber-500/10">
                 <h4 className="font-mystical text-amber-300 text-xl mb-4">Balance Kármico</h4>
                 <p className="text-slate-400 font-light">{interpretation.karmicBalance.substring(0, 150)}...</p>
               </div>
            </div>
          </div>
        );

      case ActiveTab.KARMIC_LAB:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="glass-card p-10 rounded-[2.5rem] border-violet-500/20">
              <h2 className="text-3xl font-mystical text-white mb-6">Estudio Sideral vs Geocéntrico</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
                {interpretation.siderealAnalysis}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Esquema Tropical (Personalidad)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {interpretation.planets.map(p => (
                      <div key={p.name} className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                        <span className="text-violet-400 font-bold">{p.name}:</span> {p.sign} (C{p.house})
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500">Esquema Sideral (Alma Eterna)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {interpretation.siderealPlanets.map(p => (
                      <div key={p.name} className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-xs">
                        <span className="text-blue-400 font-bold">{p.name}:</span> {p.sign} (C{p.house})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case ActiveTab.INCARNATIONS:
        return (
          <div className="space-y-12 animate-fadeIn max-w-5xl mx-auto">
            <h2 className="text-4xl font-mystical text-center text-amber-200">Cronología Akáshica</h2>
            <div className="relative border-l-2 border-amber-500/20 ml-6 space-y-20 py-10">
              {interpretation.incarnations.map((inc, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                  <div className="glass-card p-8 rounded-3xl border-amber-500/10 hover:border-amber-500/30 transition-all group">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mb-4 block">Marcador: {inc.astrologicalMarker}</span>
                    <h3 className="text-3xl font-mystical text-white mb-2">{inc.role}</h3>
                    <div className="text-sm text-slate-500 font-bold mb-6 italic">{inc.era} | {inc.location}</div>
                    <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                       <h5 className="text-[10px] uppercase font-bold text-amber-400 mb-2">Lección de Alma</h5>
                       <p className="text-slate-300 text-lg font-light leading-relaxed">{inc.karmicLesson}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case ActiveTab.AKASHIC:
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fadeIn text-center space-y-12">
            <div className="relative">
               <div className="absolute inset-0 bg-fuchsia-600/20 blur-[100px] rounded-full animate-pulse"></div>
               <div className="relative glass-card p-16 rounded-[4rem] border-fuchsia-500/20 max-w-3xl">
                  <span className="text-[10px] font-bold text-fuchsia-500 uppercase tracking-[1em] mb-10 block">Frecuencia Directa</span>
                  <p className="text-3xl font-light italic text-white leading-relaxed font-serif">
                    "{interpretation.akashicMessage}"
                  </p>
               </div>
            </div>
          </div>
        );

      case ActiveTab.BLUEPRINT:
        return (
          <div className="space-y-16 animate-fadeIn max-w-4xl mx-auto">
            {interpretation.profileBreakdown.map((section, idx) => (
              <div key={idx} className="group flex gap-8 items-start">
                <div className="text-5xl opacity-50 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0">{section.emoji}</div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-mystical text-violet-200 uppercase tracking-widest">{section.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case ActiveTab.CHART:
        return (
          <div className="flex flex-col items-center justify-center animate-fadeIn space-y-12">
            <div className="glass-card p-12 rounded-[4rem] border-white/5 shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-500/5 glow-bg rounded-full"></div>
              <BirthChart 
                planets={interpretation.siderealPlanets} 
                aspects={interpretation.aspects} 
                ascendant={interpretation.ascendant}
                midheaven={interpretation.midheaven}
                onSelectElement={(el) => setSelectedPlanet(el.data)}
              />
            </div>
            <div className="max-w-xl text-center">
              <h4 className="text-blue-400 font-bold uppercase tracking-[0.4em] text-xs mb-4">Nota del Sistema</h4>
              <p className="text-slate-500 text-sm">Este mapa utiliza el sistema de casas Placidus bajo el zodiaco Sideral (Lahiri). Refleja la posición real de las constelaciones en el momento de tu encarnación.</p>
            </div>
          </div>
        );

      default:
        return <div className="text-slate-500 text-center py-20 uppercase tracking-widest">Módulo en construcción cuántica...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden">
      <aside className="w-20 md:w-72 bg-slate-950/40 backdrop-blur-3xl border-r border-white/5 flex flex-col p-6 py-12 z-20">
        <div className="mb-16 flex items-center gap-4 px-2">
           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
           </div>
           <span className="hidden md:block font-mystical text-2xl tracking-widest">AKASHA</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 px-4 py-4 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block font-bold text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onReset} className="mt-auto text-[10px] uppercase tracking-[0.3em] text-slate-600 hover:text-red-400 transition-colors">
          Cerrar Registro
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
        <header className="mb-16 flex justify-between items-end border-b border-white/5 pb-8">
           <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500 mb-2">Decodificador Geocéntrico Kármico</h2>
              <h1 className="text-5xl font-mystical uppercase tracking-tighter">{activeTab.replace('_', ' ')}</h1>
           </div>
           <div className="hidden md:block text-right opacity-40">
              <div className="text-[10px] font-mono">USUARIO: {birthData.name}</div>
              <div className="text-[10px] font-mono">MAPA: SIDERAL / LAHIRI</div>
           </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default SoulExplorer;
