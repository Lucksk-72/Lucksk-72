import React from 'react';
import { Zap, Heart, Shield, Bell, AlertTriangle, BookOpen } from 'lucide-react';
import { PlayerStats } from '../types';

interface DashboardProps {
  player: PlayerStats;
  onOpenTutorial: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ player, onOpenTutorial }) => {
  return (
    <div className="p-4 space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Nexus<span className="text-cyan-400">OS</span></h1>
          <p className="text-slate-400 text-xs">Sistema Online • Conexão Estável</p>
        </div>
        <div className="relative">
          <Bell className="text-slate-300" size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </div>
      </div>

      {/* Status Bars */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/20 p-2 rounded-lg">
              <Heart className="text-red-500" size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase">Vitalidade</div>
              <div className="text-lg font-bold text-white">{player.health}/{player.maxHealth}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Zap className="text-yellow-500" size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase">Energia</div>
              <div className="text-lg font-bold text-white">{player.energy}/{player.maxEnergy}</div>
            </div>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Progresso Nvl {player.level + 1}</span>
            <span>{Math.floor((player.xp / player.maxXp) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
              style={{ width: `${(player.xp / player.maxXp) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tutorial Banner */}
      <button 
        onClick={onOpenTutorial}
        className="w-full bg-indigo-600/20 border border-indigo-500/50 p-3 rounded-lg flex items-center justify-between group hover:bg-indigo-600/30 transition-all"
      >
        <div className="flex items-center space-x-3">
            <div className="bg-indigo-500 p-2 rounded-full text-white">
                <BookOpen size={18} />
            </div>
            <div className="text-left">
                <h3 className="text-white font-bold text-sm">Guia do Sobrevivente</h3>
                <p className="text-slate-400 text-xs">Aprenda a criar empresas e usar o correio.</p>
            </div>
        </div>
        <span className="text-indigo-400 text-xs font-bold group-hover:translate-x-1 transition-transform">ABRIR &rarr;</span>
      </button>

      {/* Alerts */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Alertas Ativos</h2>
        
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start space-x-3">
          <AlertTriangle className="text-red-500 shrink-0" size={20} />
          <div>
            <h3 className="text-white font-bold text-sm">Zona Contestada</h3>
            <p className="text-slate-400 text-xs mt-1">Facção inimiga "Legião de Ferro" detectada no Setor 7. Rotas logísticas comprometidas.</p>
          </div>
        </div>

        <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start space-x-3">
          <Shield className="text-amber-500 shrink-0" size={20} />
          <div>
            <h3 className="text-white font-bold text-sm">Fortaleza sob Cerco</h3>
            <p className="text-slate-400 text-xs mt-1">Seu depósito no Posto Norte está sofrendo danos. Reforços necessários.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-cyan-900/20 uppercase text-sm">
          Escanear Área
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-xl font-bold transition-all active:scale-95 uppercase text-sm">
          Lançar Drone
        </button>
      </div>
    </div>
  );
};

export default Dashboard;