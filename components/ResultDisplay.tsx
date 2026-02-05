
import React from 'react';
import { Interpretation, BirthData } from '../types';
import BirthChart from './BirthChart';
import { GALACTIC_ORIGINS } from '../constants';

interface Props {
  data: Interpretation;
  birth: BirthData;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ data, birth, onReset }) => {
  const galacticInfo = GALACTIC_ORIGINS.find(g => data.starseed.origin.includes(g.name)) || GALACTIC_ORIGINS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side: Chart and Basic Info */}
        <div className="w-full md:w-1/3 bg-slate-900/60 p-6 rounded-2xl border border-violet-500/20 backdrop-blur-xl">
          <h3 className="text-2xl font-mystical text-violet-200 mb-1">{birth.name}</h3>
          <p className="text-slate-400 text-sm mb-6">{birth.birthDate} | {birth.birthLocation}</p>
          
          <BirthChart 
            planets={data.planets} 
            aspects={data.aspects} 
            ascendant={data.ascendant}
            midheaven={data.midheaven}
            onSelectElement={() => {}} 
          />
          
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <h4 className="text-xs uppercase font-bold text-violet-400 mb-2">Firma Primaria</h4>
              <p className="text-slate-200 text-sm leading-relaxed">{data.classical}</p>
            </div>
          </div>

          <button 
            onClick={onReset}
            className="mt-8 w-full py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
          >
            Nueva Sesión
          </button>
        </div>

        {/* Right Side: Deep Interpretations */}
        <div className="w-full md:w-2/3 space-y-8">
          
          {/* Galactic Origin Section */}
          <div className="relative overflow-hidden bg-slate-900/60 p-8 rounded-3xl border border-blue-500/30 backdrop-blur-xl group">
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none rounded-full blur-3xl -mr-20 -mt-20"
              style={{ backgroundColor: galacticInfo.color }}
            />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div>
                <h3 className="text-3xl font-mystical text-white tracking-widest">{data.starseed.origin}</h3>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Linaje Estelar</span>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed italic mb-4">
              "Tu alma resuena con la frecuencia de {galacticInfo.name}..."
            </p>
            <p className="text-slate-400 leading-relaxed">
              {data.starseed.narrative}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-500">Claves de Sincronía: </span>
              <span className="text-xs text-blue-400 font-mono">{data.starseed.connectionDegrees}</span>
            </div>
          </div>

          {/* Karmic Records Section */}
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-amber-500/30 backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-500/20 rounded-full text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-mystical text-amber-100">Espejo Kármico Akáshico</h3>
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">Vidas Pasadas y Lecciones</span>
              </div>
            </div>
            {/* Fixed: Access karmicBalance instead of non-existent karmic property */}
            <p className="text-slate-300 leading-relaxed text-lg">
              {data.karmicBalance}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
