
import React from 'react';
import { Chakra } from '../types';

interface Props {
  chakras: Chakra[];
  onSelectChakra: (chakra: Chakra) => void;
}

const ChakraSystem: React.FC<Props> = ({ chakras, onSelectChakra }) => {
  // Ordered from top to bottom
  const chakraOrder = [
    "Galactic", "Soul Star", "Crown", "Third Eye", "Throat", "Heart", "Solar Plexus", "Sacral", "Root"
  ];

  const sortedChakras = chakraOrder.map(name => chakras.find(c => c.name.includes(name))).filter(Boolean) as Chakra[];

  return (
    <div className="relative flex flex-col items-center py-10">
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        {/* Mystical Silhouette */}
        <svg viewBox="0 0 200 600" width="300" height="600" fill="currentColor" className="text-violet-200">
          <path d="M100 20 C120 20 135 35 135 55 C135 75 120 90 100 90 C80 90 65 75 65 55 C65 35 80 20 100 20 Z" />
          <path d="M100 95 C140 95 160 110 160 140 L160 250 C160 280 140 300 100 300 C60 300 40 280 40 250 L40 140 C40 110 60 95 100 95 Z" />
          <rect x="85" y="300" width="30" height="200" rx="15" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {sortedChakras.map((chakra, idx) => (
          <div 
            key={chakra.name} 
            className="group relative flex items-center justify-center cursor-pointer"
            onClick={() => onSelectChakra(chakra)}
          >
            {/* Label Line Right */}
            <div className={`absolute left-full ml-6 w-32 border-t border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block`}>
               <span className="absolute left-0 -top-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                 {chakra.name}
               </span>
            </div>

            {/* Glowing Chakra Orb */}
            <div 
              className={`w-12 h-12 rounded-full border-2 transition-all duration-500 shadow-lg flex items-center justify-center
                ${chakra.status === 'Dominant' ? 'animate-pulse scale-125' : 'scale-100'}
                ${chakra.status === 'Blocked' ? 'opacity-40 grayscale' : 'opacity-100'}
              `}
              style={{ 
                borderColor: chakra.color, 
                backgroundColor: `${chakra.color}22`,
                boxShadow: `0 0 20px ${chakra.color}44`
              }}
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chakra.color }} />
            </div>

            {/* Pulsing Aura for Dominant */}
            {chakra.status === 'Dominant' && (
              <div className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ backgroundColor: chakra.color }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChakraSystem;
