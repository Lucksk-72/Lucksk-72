import React from 'react';
import { LayoutDashboard, Map, ShoppingBag, Truck, Archive } from 'lucide-react';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'CMD' },
    { id: 'map', icon: Map, label: 'TacMap' },
    { id: 'logistics', icon: Truck, label: 'Corp' },
    { id: 'market', icon: ShoppingBag, label: 'Market' },
    { id: 'storage', icon: Archive, label: 'Storage' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 h-16 flex items-center justify-around z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            activeTab === item.id ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <item.icon size={20} />
          <span className="text-[10px] uppercase tracking-wider font-bold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;