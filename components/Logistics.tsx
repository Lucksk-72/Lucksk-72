import React, { useState } from 'react';
import { Truck, Package, Clock, ShieldAlert, Building2, MapPin, Users, Activity, Route } from 'lucide-react';
import { TRANSPORT_JOBS, MY_VEHICLES, MY_COMPANY } from '../constants';

const Logistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'company' | 'fleet'>('company');

  return (
    <div className="p-4 pb-24 h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center">
          <Truck className="mr-2 text-cyan-400" />
          Corp. Logistics
        </h1>
        <div className="text-right">
            <span className="bg-slate-800 text-cyan-400 px-2 py-1 rounded text-xs font-mono font-bold">
                LVL {MY_COMPANY.level}
            </span>
        </div>
      </div>

      {/* Logistics Tabs */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg mb-6">
        {(['company', 'jobs', 'fleet'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-colors ${
              activeTab === tab
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'company' ? 'My Corp' : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'company' && (
          <div className="space-y-6 animate-in fade-in">
              {/* Company Header */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Building2 size={100} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{MY_COMPANY.name}</h2>
                  <p className="text-cyan-400 font-mono text-sm mb-4">CEO: {MY_COMPANY.owner}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-slate-900/50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 uppercase font-bold">Balance</p>
                          <p className="text-emerald-400 font-mono font-bold text-lg">{MY_COMPANY.balance} CR</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 uppercase font-bold">Reputation</p>
                          <p className="text-amber-400 font-mono font-bold text-lg">{MY_COMPANY.reputation} / 5.0</p>
                      </div>
                  </div>
              </div>

              {/* Active Routes */}
              <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center">
                      <Route className="mr-2" size={16}/> Active Routes
                  </h3>
                  <div className="space-y-2">
                      {MY_COMPANY.routes.map((route, idx) => (
                          <div key={idx} className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex justify-between items-center">
                              <span className="text-white font-mono text-sm">{route}</span>
                              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded font-bold">Active</span>
                          </div>
                      ))}
                      <button className="w-full py-2 border border-dashed border-slate-600 text-slate-400 rounded-lg text-sm hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                          + Establish New Route
                      </button>
                  </div>
              </div>

              {/* Staff */}
              <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center">
                      <Users className="mr-2" size={16}/> Staffing
                  </h3>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                      <div>
                          <p className="text-white font-bold">{MY_COMPANY.employees} Employees</p>
                          <p className="text-xs text-slate-400">8 Drivers, 4 Security</p>
                      </div>
                      <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-xs font-bold text-white">Manage</button>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">
            <span>Marketplace Contracts</span>
          </div>
          
          {TRANSPORT_JOBS.map((job) => (
            <div key={job.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                      job.providerType === 'Player' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                      {job.providerType === 'Player' ? 'P2P Contract' : 'Corp Contract'}
                  </span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">+{job.reward} Credits</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-white">
                  <MapPin size={14} className="text-slate-500" />
                  <span className="text-sm font-bold">{job.origin}</span>
                </div>
                <div className="h-px bg-slate-600 flex-1 mx-2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] bg-slate-800 px-1 text-slate-500">
                        {job.distance}
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <MapPin size={14} className="text-cyan-500" />
                  <span className="text-sm font-bold">{job.destination}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                <div className="bg-slate-900/50 p-2 rounded flex flex-col items-center justify-center text-center">
                  <Package size={14} className="mb-1 text-slate-400" />
                  <span className="text-slate-300">{job.cargo}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded flex flex-col items-center justify-center text-center">
                  <ShieldAlert size={14} className={`mb-1 ${job.risk === 'High' ? 'text-red-500' : job.risk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`} />
                  <span className="text-slate-300">{job.risk} Risk</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded flex flex-col items-center justify-center text-center">
                  <Clock size={14} className="mb-1 text-slate-400" />
                  <span className="text-slate-300">{job.deadline}</span>
                </div>
              </div>

              <button className="w-full bg-slate-700 group-hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition-colors text-sm uppercase tracking-wide">
                Accept Contract
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'fleet' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-slate-800/80 p-4 rounded-xl mb-4 border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-bold text-sm">Fleet Status</h3>
                <span className="text-cyan-400 text-xs font-bold">2 / 5 Slots</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-2/5"></div>
              </div>
          </div>

          {MY_VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-bold">{vehicle.name}</h3>
                  <p className="text-xs text-slate-400 uppercase">{vehicle.type} • Cap: {vehicle.capacity}</p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  vehicle.status === 'Idle' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 animate-pulse'
                }`}>
                  {vehicle.status}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Hull Integrity</span>
                    <span>{vehicle.integrity}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${vehicle.integrity > 50 ? 'bg-cyan-500' : 'bg-red-500'}`} style={{ width: `${vehicle.integrity}%` }}></div>
                </div>
              </div>

              <div className="flex items-center text-xs text-slate-300 bg-slate-900 p-2 rounded">
                <MapPin size={12} className="mr-2 text-slate-500" />
                Current Loc: {vehicle.location}
              </div>

              <div className="mt-3 flex space-x-2">
                 <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-1.5 rounded text-xs font-bold text-white">Config</button>
                 <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-1.5 rounded text-xs font-bold text-white">Maintenance</button>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 font-bold hover:border-cyan-500 hover:text-cyan-500 transition-colors flex items-center justify-center">
            <Truck className="mr-2" /> Purchase New Vehicle
          </button>
        </div>
      )}
    </div>
  );
};

export default Logistics;