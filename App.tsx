import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TacticalMap from './components/TacticalMap';
import NavBar from './components/NavBar';
import Logistics from './components/Logistics';
import Market from './components/Market';
import Storage from './components/Storage';
import { MOCK_PLAYER } from './constants';
import { User, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard player={MOCK_PLAYER} />;
      case 'map':
        return <TacticalMap />;
      case 'logistics':
        return <Logistics />;
      case 'market':
        return <Market />;
      case 'storage':
        return <Storage />;
      default:
        return <Dashboard player={MOCK_PLAYER} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      <div className="max-w-md mx-auto relative h-screen bg-slate-900 shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <main className="h-full">
          {renderContent()}
        </main>

        {/* Navigation */}
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;