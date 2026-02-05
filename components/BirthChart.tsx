
import React from 'react';
import { SIGNS } from '../constants';
import { PlanetPlacement, Aspect, Point } from '../types';

interface Props {
  planets: PlanetPlacement[];
  aspects: Aspect[];
  ascendant?: Point;
  midheaven?: Point;
  onSelectElement: (el: { type: 'planet' | 'house' | 'aspect' | 'point', data: any }) => void;
}

const BirthChart: React.FC<Props> = ({ planets, aspects, ascendant, midheaven, onSelectElement }) => {
  const radius = 160;
  const innerRadius = 100;
  const aspectRadius = 90;
  const center = 200;

  // Calculate rotation to place Ascendant at the 9 o'clock position (180 degrees in SVG space)
  const getSignStartAngle = (sign: string) => SIGNS.indexOf(sign) * 30;
  
  const ascDegree = ascendant ? getSignStartAngle(ascendant.sign) + ascendant.degree : 0;
  // We want Ascendant to be at exactly 180 degrees (left side). 
  // SVG 0 is Top. So Ascendant Angle - Rotation = 180 => Rotation = Ascendant Angle - 180
  const rotation = ascDegree - 180;

  const getCoordinates = (angle: number, r: number) => {
    // Subtract rotation to align wheel with Ascendant
    const rad = ((angle - 90 - rotation) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const getPlanetAngle = (planet: { sign: string, degree: number }) => {
    return getSignStartAngle(planet.sign) + planet.degree;
  };

  return (
    <div className="relative group">
      <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-[0_0_25px_rgba(139,92,246,0.2)]">
        {/* Outer Zodiac Circle */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#4c1d95" strokeWidth="2" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#4c1d95" strokeWidth="1" opacity="0.3" />

        {/* Sign Segments */}
        {SIGNS.map((sign, i) => {
          const startAngle = i * 30;
          const p1 = getCoordinates(startAngle, radius);
          const p2 = getCoordinates(startAngle, innerRadius);
          
          const labelAngle = startAngle + 15;
          const labelPos = getCoordinates(labelAngle, radius + 15);

          return (
            <g key={sign}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#6d28d9" strokeWidth="1" opacity="0.5" />
              <text 
                x={labelPos.x} 
                y={labelPos.y} 
                fill="#a78bfa" 
                fontSize="9" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="font-bold cursor-help hover:fill-white transition-colors"
              >
                {sign.substring(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* House Lines */}
        {[...Array(12)].map((_, i) => {
          const angle = ascDegree + (i * 30);
          const p1 = getCoordinates(angle, innerRadius);
          const p2 = getCoordinates(angle, 40);
          return (
            <g key={`house-${i}`}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fcd34d" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
              <text 
                {...getCoordinates(angle + 15, 60)} 
                fill="#fbbf24" 
                fontSize="8" 
                opacity="0.6"
                textAnchor="middle"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* ASC/MC Axes */}
        {ascendant && (
          <line 
            x1={getCoordinates(ascDegree, radius + 20).x} 
            y1={getCoordinates(ascDegree, radius + 20).y}
            x2={getCoordinates(ascDegree + 180, radius + 20).x} 
            y2={getCoordinates(ascDegree + 180, radius + 20).y}
            stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" opacity="0.5"
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => onSelectElement({ type: 'point', data: ascendant })}
          />
        )}
        {midheaven && (
          <line 
            x1={getCoordinates(getPlanetAngle(midheaven), radius + 20).x} 
            y1={getCoordinates(getPlanetAngle(midheaven), radius + 20).y}
            x2={getCoordinates(getPlanetAngle(midheaven) + 180, radius + 20).x} 
            y2={getCoordinates(getPlanetAngle(midheaven) + 180, radius + 20).y}
            stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" opacity="0.5"
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => onSelectElement({ type: 'point', data: midheaven })}
          />
        )}

        {/* Aspect Lines */}
        {aspects.map((aspect, idx) => {
          const p1Data = planets.find(p => p.name === aspect.planets[0]);
          const p2Data = planets.find(p => p.name === aspect.planets[1]);
          if (!p1Data || !p2Data) return null;

          const a1 = getPlanetAngle(p1Data);
          const a2 = getPlanetAngle(p2Data);
          const start = getCoordinates(a1, aspectRadius);
          const end = getCoordinates(a2, aspectRadius);

          return (
            <line 
              key={`aspect-${idx}`}
              x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
              stroke={aspect.color || '#94a3b8'} 
              strokeWidth="1.5" 
              opacity="0.6"
              className="hover:opacity-100 hover:stroke-white transition-all cursor-pointer"
              onClick={() => onSelectElement({ type: 'aspect', data: aspect })}
            />
          );
        })}

        {/* Planets */}
        {planets.map((planet) => {
          const angle = getPlanetAngle(planet);
          const pos = getCoordinates(angle, aspectRadius + 10);
          return (
            <g 
              key={planet.name} 
              className="cursor-pointer group/planet" 
              onClick={() => onSelectElement({ type: 'planet', data: planet })}
            >
              <circle cx={pos.x} cy={pos.y} r="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1" />
              <text 
                x={pos.x} 
                y={pos.y} 
                fill="#ddd6fe" 
                fontSize="10" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="font-mystical group-hover/planet:fill-white"
              >
                {planet.symbol || planet.name.charAt(0)}
              </text>
            </g>
          );
        })}

        {/* Center Soul Core */}
        <circle cx={center} cy={center} r="15" fill="#4c1d95" opacity="0.5" />
        <path 
          d="M200 188 L203 197 L212 200 L203 203 L200 212 L197 203 L188 200 L197 197 Z" 
          fill="#fcd34d" 
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default BirthChart;
