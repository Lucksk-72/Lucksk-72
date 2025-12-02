import React, { useState } from 'react';
import { Archive, Package, Send, ArrowRight, Box, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { MY_MAIL, MOCK_PLAYER } from '../constants';
import { MailItem } from '../types';

const Storage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mailbox' | 'warehouse' | 'send'>('mailbox');
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);

  // Filter mail based on storage location concept
  const mailboxItems = MY_MAIL.filter(m => m.storageLocation === 'Mailbox');
  const warehouseItems = MY_MAIL.filter(m => m.storageLocation === 'Fortress Warehouse' || m.storageLocation === 'Regional Depot');

  return (
    <div className="p-4 pb-24 h-screen overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center">
          <Archive className="mr-2 text-cyan-400" />
          Storage & Mail
        </h1>
        {/* Virtual Address Display */}
        <div className="mt-2 bg-slate-800/80 border border-slate-600 rounded-lg p-3 flex items-center justify-between">
            <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">My Virtual Address</p>
                <p className="text-cyan-300 font-mono font-bold text-lg">{MOCK_PLAYER.address}</p>
            </div>
            <button className="bg-slate-700 p-2 rounded hover:text-white text-slate-400" title="Copy Address">
                <Box size={18} />
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('mailbox')}
          className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-colors ${
            activeTab === 'mailbox' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => setActiveTab('warehouse')}
          className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-colors ${
            activeTab === 'warehouse' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Warehouses
        </button>
        <button
          onClick={() => setActiveTab('send')}
          className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-colors ${
            activeTab === 'send' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Send Item
        </button>
      </div>

      {/* Content */}
      {activeTab === 'mailbox' && (
        <div className="space-y-3 animate-in fade-in">
           <p className="text-xs text-slate-400 mb-2 uppercase font-bold">Local Mailbox • Ready for Collection</p>
           {mailboxItems.map(item => (
               <div key={item.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex justify-between items-center">
                   <div className="flex items-center space-x-3">
                       <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
                           <Package size={20} />
                       </div>
                       <div>
                           <h3 className="text-white font-bold">{item.itemName} <span className="text-slate-500 text-xs">x{item.quantity}</span></h3>
                           <p className="text-xs text-slate-400">From: {item.sender}</p>
                       </div>
                   </div>
                   <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                       Collect
                   </button>
               </div>
           ))}
           {mailboxItems.length === 0 && <p className="text-slate-500 text-center py-10">Mailbox Empty</p>}
        </div>
      )}

      {activeTab === 'warehouse' && (
        <div className="space-y-3 animate-in fade-in">
             <div className="flex justify-between items-center text-xs text-slate-400 mb-2 uppercase font-bold">
                <span>Remote Storage</span>
                <span>Capacity: 45/500</span>
             </div>
             {warehouseItems.map(item => (
               <div key={item.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
                   <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center space-x-3">
                           <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
                               <Box size={20} />
                           </div>
                           <div>
                               <h3 className="text-white font-bold">{item.itemName} <span className="text-slate-500 text-xs">x{item.quantity}</span></h3>
                               <p className="text-xs text-slate-400">Loc: {item.storageLocation}</p>
                           </div>
                       </div>
                       <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                           item.status === 'In Transit' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                       }`}>
                           {item.status}
                       </span>
                   </div>
                   
                   <div className="mt-3 pt-3 border-t border-slate-700 flex space-x-2">
                       <button className="flex-1 bg-slate-700 hover:text-white text-slate-300 py-1.5 rounded text-xs font-bold flex items-center justify-center">
                           <Truck size={12} className="mr-1" /> Request Transfer
                       </button>
                       <button className="flex-1 bg-slate-700 hover:text-white text-slate-300 py-1.5 rounded text-xs font-bold">
                           Sell on Market
                       </button>
                   </div>
               </div>
           ))}
        </div>
      )}

      {activeTab === 'send' && (
          <div className="animate-in fade-in">
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Recipient Address</label>
                      <div className="flex space-x-2">
                        <input 
                            type="text" 
                            placeholder="USER_ZONE_BOX" 
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono"
                        />
                        <button className="bg-slate-700 px-3 rounded-lg text-slate-300">
                            <MapPin size={18} />
                        </button>
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Select Item</label>
                      <select className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 text-sm">
                          <option>Scrap Metal (x120)</option>
                          <option>Plasma Cell (x5)</option>
                          <option>Nutrient Paste (x45)</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Delivery Service</label>
                      <div className="space-y-2">
                          <label className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-cyan-500/50">
                              <div className="flex items-center">
                                  <input type="radio" name="service" className="mr-3 text-cyan-500" />
                                  <div>
                                      <p className="text-white font-bold text-sm">System Courier</p>
                                      <p className="text-xs text-slate-500">Safe, Slow (24h)</p>
                                  </div>
                              </div>
                              <span className="text-emerald-400 font-mono font-bold">50 CR</span>
                          </label>

                          <label className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-cyan-500/50">
                              <div className="flex items-center">
                                  <input type="radio" name="service" className="mr-3 text-cyan-500" />
                                  <div>
                                      <p className="text-white font-bold text-sm">Player Courier</p>
                                      <p className="text-xs text-slate-500">Fast, Risky (2h)</p>
                                  </div>
                              </div>
                              <span className="text-amber-400 font-mono font-bold">250 CR</span>
                          </label>
                      </div>
                  </div>

                  <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg flex items-center justify-center mt-4">
                      <Send size={18} className="mr-2" /> Send Package
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Storage;