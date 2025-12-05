import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TacticalMap from './components/TacticalMap';
import NavBar from './components/NavBar';
import Logistics from './components/Logistics';
import Market from './components/Market';
import Storage from './components/Storage';
import Tutorial from './components/Tutorial';
import Bootcamp from './components/Bootcamp';
import { MOCK_PLAYER } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'BOOTCAMP' | 'GAME'>('BOOTCAMP');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTutorial, setShowTutorial] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard player={MOCK_PLAYER} onOpenTutorial={() => setShowTutorial(true)} />;
      case 'map':
        return <TacticalMap />;
      case 'logistics':
        return <Logistics />;
      case 'market':
        return <Market />;
      case 'storage':
        return <Storage />;
      default:
        return <Dashboard player={MOCK_PLAYER} onOpenTutorial={() => setShowTutorial(true)} />;
    }
  };

  if (gameState === 'BOOTCAMP') {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
        <div className="max-w-md mx-auto relative h-screen bg-slate-900 shadow-2xl overflow-hidden">
          <Bootcamp onComplete={() => setGameState('GAME')} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      <div className="max-w-md mx-auto relative h-screen bg-slate-900 shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <main className="h-full">
          {renderContent()}
        </main>

        {/* Navigation */}
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tutorial Modal */}
        {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      </div>
    </div>
  );
};

export default App;