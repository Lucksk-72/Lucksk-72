import React, { useState, useEffect } from 'react';
import { Shield, Crosshair, Heart, Zap, AlertTriangle, Skull, CheckCircle, Truck, Package, ArrowRight } from 'lucide-react';

interface BootcampProps {
  onComplete: () => void;
}

const Bootcamp: React.FC<BootcampProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [step, setStep] = useState<'intro' | 'action' | 'result' | 'death'>('intro');
  
  // Combat State
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  // Logistics State
  const [distance, setDistance] = useState(0); // 0 to 100%
  const [eventTriggered, setEventTriggered] = useState(false);

  // Phase 1: Combat Logic
  const handleAttack = () => {
    const dmg = Math.floor(Math.random() * 20) + 10;
    const enemyDmg = Math.floor(Math.random() * 15) + 5;
    
    setEnemyHp(prev => Math.max(0, prev - dmg));
    setCombatLog(prev => [`Você causou ${dmg} de dano!`, ...prev]);

    if (enemyHp - dmg <= 0) {
      setStep('result');
    } else {
      // Enemy counter attack
      setTimeout(() => {
        setPlayerHp(prev => {
          const newHp = Math.max(0, prev - enemyDmg);
          if (newHp <= 0) setStep('death');
          return newHp;
        });
        setCombatLog(prev => [`Drone causou ${enemyDmg} de dano em você!`, ...prev]);
      }, 500);
    }
  };

  const handleDefend = () => {
    const heal = 15;
    setPlayerHp(prev => Math.min(100, prev + heal));
    setCombatLog(prev => [`Você recarregou escudos (+${heal} PV).`, ...prev]);
    
    // Enemy still attacks but reduced
    const enemyDmg = Math.floor(Math.random() * 5);
    setTimeout(() => {
        setPlayerHp(prev => Math.max(0, prev - enemyDmg));
        setCombatLog(prev => [`Drone causou ${enemyDmg} de dano (Mitigado).`, ...prev]);
    }, 500);
  };

  // Phase 2: Logistics Logic
  const advanceLogistics = () => {
    setDistance(prev => {
      const newDist = prev + 25;
      if (newDist === 50 && !eventTriggered) {
        setEventTriggered(true);
        return 50; // Pause at 50%
      }
      if (newDist >= 100) {
        setStep('result');
      }
      return newDist;
    });
  };

  const handleLogisticsChoice = (choice: 'fight' | 'pay' | 'flee') => {
    if (choice === 'fight') {
      setPlayerHp(prev => prev - 30); // Take damage
      setEventTriggered(false);
      setCombatLog(['Você lutou contra o saqueador e sofreu danos, mas manteve a carga.']);
    } else if (choice === 'pay') {
      // Lose virtual credits (simulated)
      setEventTriggered(false);
      setCombatLog(['Você pagou 100 créditos. A carga está segura e você está ileso.']);
    } else if (choice === 'flee') {
      setEventTriggered(false);
      setDistance(prev => prev - 10); // Setback
      setCombatLog(['Você fugiu! Perdeu tempo, mas evitou o conflito.']);
    }
  };

  const resetCombat = () => {
    setPlayerHp(100);
    setEnemyHp(100);
    setCombatLog([]);
    setStep('action');
  };

  if (step === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6 animate-in zoom-in duration-300">
        <Shield size={64} className="text-cyan-400 mb-4" />
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Protocolo Bootcamp</h1>
        <p className="text-slate-300">
          Bem-vindo, Recruta. Antes de entrar no Nexus, você deve provar seu valor em uma simulação controlada.
        </p>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-left w-full">
          <h3 className="text-cyan-400 font-bold mb-2 uppercase text-sm">Objetivos:</h3>
          <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
            <li>Fase 1: Sobrevivência e Combate Básico</li>
            <li>Fase 2: Logística e Tomada de Decisão</li>
          </ul>
        </div>
        <button 
          onClick={() => setStep('action')}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg w-full uppercase"
        >
          Iniciar Simulação
        </button>
      </div>
    );
  }

  if (step === 'death') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6 bg-red-950/90 animate-in fade-in">
        <Skull size={80} className="text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">SIMULAÇÃO FALHOU</h1>
        
        <div className="bg-black/50 p-6 rounded-xl border border-red-500 w-full">
          <p className="text-red-400 font-bold text-lg mb-4">VOCÊ ESTARIA MORTO.</p>
          <p className="text-slate-300 text-sm mb-4">
            No Nexus real, morrer significa perder todos os seus itens não segurados e sofrer um 
            <span className="text-red-400 font-bold"> banimento de reencarnação de 15 dias</span>.
          </p>
          <div className="bg-red-500/20 p-3 rounded text-left">
            <p className="text-red-200 text-xs font-bold uppercase mb-1 flex items-center">
                <AlertTriangle size={12} className="mr-1"/> Dica de Sobrevivência:
            </p>
            <p className="text-slate-300 text-xs">
                Se sua vida estiver baixa, use a opção <strong>RENDER-SE</strong>. Você perde alguns itens, mas continua jogando e mantém seu personagem vivo.
            </p>
          </div>
        </div>

        <button 
          onClick={resetCombat}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg w-full uppercase border border-slate-500"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (phase === 1) {
    if (step === 'result') {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6">
          <CheckCircle size={64} className="text-emerald-400" />
          <h2 className="text-2xl font-bold text-white uppercase">Combate Concluído</h2>
          <p className="text-slate-300 text-sm">
            Alvo neutralizado. Você aprendeu o básico. Lembre-se: no mundo real, inimigos humanos são imprevisíveis.
          </p>
          <button 
            onClick={() => {
                setPhase(2);
                setStep('action');
                setCombatLog([]);
                setPlayerHp(100);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg w-full uppercase"
          >
            Ir para Fase 2: Logística
          </button>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col p-4 relative overflow-hidden">
        <div className="scan-line"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <span className="text-cyan-400 font-bold uppercase text-xs border border-cyan-500 px-2 py-1 rounded">Simulação Fase 1</span>
            <span className="text-red-500 font-bold animate-pulse text-xs">INIMIGO ATIVO</span>
        </div>

        {/* Visual Combat Area */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            {/* Enemy */}
            <div className="w-full max-w-xs bg-slate-800/80 border border-red-500/30 p-4 rounded-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-3 py-1 rounded border border-red-500/50">
                    <span className="text-red-400 text-xs font-bold uppercase">Drone de Treino Mk.1</span>
                </div>
                <div className="flex justify-center my-4">
                    <Crosshair size={64} className="text-red-500 animate-pulse" />
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${enemyHp}%` }}></div>
                </div>
            </div>

            {/* Combat Log */}
            <div className="w-full h-24 bg-black/40 rounded-lg p-2 overflow-y-auto text-xs font-mono space-y-1 border border-slate-700">
                {combatLog.map((log, i) => (
                    <div key={i} className="text-slate-300 border-b border-slate-800/50 pb-1 last:border-0">
                        {log}
                    </div>
                ))}
            </div>

            {/* Player Stats */}
            <div className="w-full space-y-2">
                <div className="flex justify-between text-xs text-slate-400 uppercase font-bold">
                    <span>Sua Integridade</span>
                    <span>{playerHp}%</span>
                </div>
                <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden border border-slate-700">
                    <div className={`h-full transition-all duration-300 ${playerHp < 30 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${playerHp}%` }}></div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 w-full">
                <button onClick={handleAttack} className="bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold uppercase flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <Crosshair className="mb-1" size={20} />
                    Atacar
                </button>
                <button onClick={handleDefend} className="bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-bold uppercase flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <Shield className="mb-1" size={20} />
                    Reparar/Defender
                </button>
            </div>

            {/* Tip Box */}
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg w-full mt-4">
                <p className="text-blue-300 text-xs">
                    <strong>DICA TÁTICA:</strong> O dano é calculado com base nos seus equipamentos. No início, foque em lutas rápidas.
                </p>
            </div>
        </div>
      </div>
    );
  }

  if (phase === 2) {
    if (step === 'result') {
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6">
            <Truck size={64} className="text-emerald-400" />
            <h2 className="text-2xl font-bold text-white uppercase">Treinamento Concluído</h2>
            <div className="bg-slate-800 p-4 rounded-xl text-left w-full space-y-3">
                <p className="text-slate-300 text-sm">
                  Você provou entender que sobreviver é mais importante que matar.
                </p>
                <div className="flex items-center space-x-3 bg-slate-900 p-3 rounded-lg">
                    <Package className="text-cyan-400" size={24} />
                    <div>
                        <p className="text-white font-bold text-sm">Recompensa Inicial</p>
                        <p className="text-xs text-slate-400">1x Pistola Simples, 5x Rações</p>
                    </div>
                </div>
            </div>
            <button 
              onClick={onComplete}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg w-full uppercase animate-pulse shadow-lg shadow-cyan-500/30"
            >
              Entrar no Nexus War
            </button>
          </div>
        );
      }

    return (
        <div className="h-full flex flex-col p-4 relative">
             {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-purple-400 font-bold uppercase text-xs border border-purple-500 px-2 py-1 rounded">Simulação Fase 2</span>
                <span className="text-slate-400 font-mono text-xs">DISTÂNCIA: {distance}%</span>
            </div>

            <div className="flex-1 flex flex-col items-center space-y-6">
                <div className="w-full bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                    <Truck size={48} className="text-purple-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Missão de Entrega</h3>
                    <p className="text-slate-400 text-sm mb-4">
                        Leve o suprimento do Ponto A ao Ponto B. O caminho é perigoso.
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-600 relative">
                         <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-yellow-500 z-10" title="Ponto de Perigo"></div>
                         <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${distance}%` }}></div>
                    </div>
                </div>

                {/* Event Modal */}
                {eventTriggered ? (
                    <div className="w-full bg-red-900/20 border border-red-500 p-4 rounded-xl animate-in zoom-in duration-200">
                        <div className="flex items-start space-x-3 mb-4">
                            <AlertTriangle className="text-red-500 shrink-0" size={24} />
                            <div>
                                <h3 className="text-white font-bold">Emboscada!</h3>
                                <p className="text-slate-300 text-xs mt-1">
                                    Um saqueador bloqueia seu caminho. Ele exige pedágio ou luta. Você está carregando itens valiosos.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-black/40 p-3 rounded mb-4 text-xs text-yellow-200 border-l-2 border-yellow-500">
                            <strong>DICA DE OURO:</strong> Como transportador, sua prioridade é a carga. Lutar arrisca sua vida e os itens. Às vezes, pagar ou fugir é mais lucrativo a longo prazo.
                        </div>

                        <div className="space-y-2">
                            <button onClick={() => handleLogisticsChoice('fight')} className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded text-sm font-bold flex justify-between px-4">
                                <span>Lutar</span>
                                <span className="text-red-200 text-xs">Alto Risco</span>
                            </button>
                            <button onClick={() => handleLogisticsChoice('pay')} className="w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded text-sm font-bold flex justify-between px-4">
                                <span>Pagar (100cr)</span>
                                <span className="text-amber-200 text-xs">Seguro</span>
                            </button>
                            <button onClick={() => handleLogisticsChoice('flee')} className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded text-sm font-bold flex justify-between px-4">
                                <span>Fugir</span>
                                <span className="text-slate-300 text-xs">Perde Tempo</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full space-y-4">
                         <div className="bg-black/30 p-3 rounded h-20 overflow-y-auto text-xs font-mono text-slate-300 border border-slate-800">
                            {combatLog.length > 0 ? combatLog.map((l, i) => <div key={i}>&gt; {l}</div>) : <div className="text-slate-600 italic">Aguardando ordens...</div>}
                         </div>
                         <button 
                            onClick={advanceLogistics}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl uppercase flex items-center justify-center shadow-lg active:scale-95"
                        >
                            <ArrowRight className="mr-2" /> Avançar na Rota
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
  }

  return null;
};

export default Bootcamp;