import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
import { MARKET_ITEMS, CHART_DATA } from '../constants';

const Market: React.FC = () => {
  return (
    <div className="p-4 pb-20 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-6 flex items-center">
        <ShoppingCart className="mr-2 text-cyan-400" />
        Global Market
      </h1>

      {/* Market Trend Graph */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 backdrop-blur-sm">
        <h2 className="text-sm font-bold text-slate-400 uppercase mb-4">Index: Rare Materials</h2>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="price" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-3">
        {MARKET_ITEMS.map((item) => (
          <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex justify-between items-center hover:bg-slate-750 transition-colors">
            <div className="flex-1">
              <div className="flex items-center">
                 <h3 className="text-white font-bold mr-2">{item.name}</h3>
                 <span className={`text-[10px] px-1.5 rounded uppercase font-bold border ${
                    item.rarity === 'Legendary' ? 'border-amber-500 text-amber-500' : 
                    item.rarity === 'Epic' ? 'border-purple-500 text-purple-500' :
                    item.rarity === 'Rare' ? 'border-blue-400 text-blue-400' : 'border-slate-500 text-slate-400'
                 }`}>
                    {item.rarity}
                 </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{item.type} • Stock: {item.quantity}</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-emerald-400 font-mono font-bold text-lg flex items-center">
                {item.currentPrice} CR
                {item.trend === 'up' ? 
                  <TrendingUp size={14} className="ml-1 text-emerald-500" /> : 
                  item.trend === 'down' ? 
                  <TrendingDown size={14} className="ml-1 text-red-500" /> : 
                  <span className="ml-1 text-slate-500">-</span>
                }
              </div>
              <div className="flex space-x-1 mt-2">
                <button className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1 rounded">Sell</button>
                <button className="bg-cyan-700 hover:bg-cyan-600 text-white text-xs px-3 py-1 rounded">Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;