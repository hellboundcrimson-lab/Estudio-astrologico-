
import React, { useState } from 'react';
import { BirthData } from '../types';

interface Props {
  onSubmit: (data: BirthData) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    currentEnergyState: ''
  });

  const loadMasterProfile = () => {
    setFormData({
      name: 'Arquitecto de Akasha',
      birthDate: '1994-01-21',
      birthTime: '10:12',
      birthLocation: 'Caracas, Venezuela',
      currentEnergyState: `
        VOCACIÓN: Programador de 31 años, creador de apps de estudio esotérico/akáshico.
        IDENTIDAD: Sol, Mercurio, Venus en Acuario (Casa 11). Luna en Tauro (Casa 2).
        PUNTOS CLAVE: ASC Piscis (26°), MC Sagitario (27°). Lilith en Aries (Casa 1).
        ESTRUCTURA Y PODER: Marte, Urano y Neptuno en Capricornio (Casa 10).
        OCULTISMO Y ALQUIMIA: Júpiter en Escorpio (Casa 8), Juno en Escorpio (Casa 8), Quirón en Virgo (Casa 8).
        FILOSOFÍA: Plutón en Escorpio (Casa 9), Nodo Sur en Sagitario (Casa 9).
        MISIÓN: Nodo Norte en Géminis (Casa 3).
        MISTICISMO: Pallas y Vesta en Piscis (Casa 12).
      `
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto relative z-10">
      <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-mystical text-white tracking-widest mb-2">INICIAR SESIÓN</h2>
          <div className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.4em] opacity-80">Acceso a Registros Multidimensionales</div>
        </div>

        <div className="space-y-6">
          <div className="group/input">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1 group-focus-within/input:text-violet-400 transition-colors">Nombre de Alma</label>
            <input
              required
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-slate-100 transition-all font-light tracking-wide placeholder:text-slate-700"
              placeholder="Tu identidad conocida..."
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group/input">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1 group-focus-within/input:text-violet-400 transition-colors">Fecha Terrestre</label>
              <input
                required
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-slate-100 transition-all font-light"
                value={formData.birthDate}
                onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
            <div className="group/input">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1 group-focus-within/input:text-violet-400 transition-colors">Hora Exacta</label>
              <input
                required
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-slate-100 transition-all font-light"
                value={formData.birthTime}
                onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
              />
            </div>
          </div>

          <div className="group/input">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1 group-focus-within/input:text-violet-400 transition-colors">Coordenadas de Origen</label>
            <input
              required
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-slate-100 transition-all font-light tracking-wide placeholder:text-slate-700"
              placeholder="Ciudad, País..."
              value={formData.birthLocation}
              onChange={e => setFormData({ ...formData, birthLocation: e.target.value })}
            />
          </div>

          <div className="group/input">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1 group-focus-within/input:text-violet-400 transition-colors">Estado de Vibración / Vocación</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-slate-100 transition-all min-h-[120px] font-light tracking-wide placeholder:text-slate-700 resize-none"
              placeholder="Describe tu misión o energía actual..."
              value={formData.currentEnergyState}
              onChange={e => setFormData({ ...formData, currentEnergyState: e.target.value })}
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-violet-950/50 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-10 uppercase tracking-[0.3em] text-xs"
        >
          {isLoading ? "Estableciendo Conexión..." : "Decodificar Destino"}
        </button>
      </form>

      <button 
        onClick={loadMasterProfile}
        className="w-full py-4 bg-white/5 border border-white/5 text-slate-600 rounded-2xl text-[10px] uppercase tracking-[0.4em] hover:bg-violet-600/10 hover:text-violet-400 transition-all border-dashed"
      >
        Invocar Perfil Maestro (Programador 1994)
      </button>
    </div>
  );
};

export default ProfileForm;
