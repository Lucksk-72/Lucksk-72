import React, { useState } from 'react';
import { MapPin, Navigation, Crosshair, Hexagon, Package, AlertCircle } from 'lucide-react';
import { MAP_POINTS } from '../constants';
import { MapPoint } from '../types';

const TacticalMap: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  const getIcon = (type: MapPoint['type']) => {
    switch (type) {
      case 'Fortress': return <Hexagon size={24} className="text-cyan-400 fill-cyan-400/20" />;
      case 'Enemy': return <Crosshair size={24} className="text-red-500" />;
      case 'Resource': return <Package size={24} className="text-emerald-400" />;
      case 'Market': return <MapPin size={24} className="text-amber-400" />;
      case 'Warehouse': return <Hexagon size={24} className="text-purple-400" />;
      default: return <Navigation size={24} className="text-white" />;
    }
  };

  return (
    <div className="h-screen w-full relative bg-slate-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(#334155 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
             backgroundSize: '20px 20px, 40px 40px, 40px 40px'
           }}>
      </div>
      
      {/* Radar Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      <div className="scan-line"></div>

      {/* Map Points */}
      <div className="absolute inset-0 p-4 pt-16 pb-20">
        <div className="w-full h-full relative border border-slate-700 rounded-3xl bg-slate-900/50 backdrop-blur-sm overflow-hidden">
          {/* Compass Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cyan-500/20 rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-cyan-500/30 rounded-full pointer-events-none border-dashed"></div>

          {/* Render Points */}
          {MAP_POINTS.map((point) => (
            <button
              key={point.id}
              onClick={() => setSelectedPoint(point)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div className="relative group">
                {getIcon(point.type)}
                {point.type === 'Ally' && (
                  <div className="absolute -inset-4 border border-cyan-500 rounded-full animate-ping opacity-20"></div>
                )}
                <span className="absolute top-full left-1/2 -translate-x-1/2 text-[10px] text-white bg-black/80 px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {point.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div>
          <h2 className="text-white font-bold uppercase tracking-wider text-sm flex items-center">
            <Navigation className="inline mr-2 text-cyan-400" size={16} />
            Tactical Overview
          </h2>
          <p className="text-cyan-500 text-xs">GPS: 40.7128° N, 74.0060° W</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 px-2 py-1 rounded text-[10px] text-red-400 animate-pulse font-bold uppercase">
          Live Feed
        </div>
      </div>

      {/* Selected Point Detail */}
      {selectedPoint && (
        <div className="absolute bottom-20 left-4 right-4 bg-slate-800/90 border border-slate-600 p-4 rounded-xl backdrop-blur-md animate-in slide-in-from-bottom-10 z-20">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                {getIcon(selectedPoint.type)}
              </div>
              <div>
                <h3 className="text-white font-bold">{selectedPoint.name}</h3>
                <p className="text-slate-400 text-xs capitalize">{selectedPoint.type} • {selectedPoint.distance}km away</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedPoint(null)}
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg text-sm font-bold">
              Set Waypoint
            </button>
            {selectedPoint.type === 'Resource' && (
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-bold">
                Deploy Drone
              </button>
            )}
            {selectedPoint.type === 'Enemy' && (
              <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-bold">
                Attack
              </button>
            )}
            {selectedPoint.type === 'Market' && (
              <button className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2 rounded-lg text-sm font-bold">
                Trade
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TacticalMap;