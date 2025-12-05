import React from 'react';
import { X, Shield, Truck, Package, MapPin, Users } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/95 z-[60] flex flex-col p-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Manual de Campo</h2>
        <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <div className="overflow-y-auto space-y-8 pb-10">
        
        {/* Intro */}
        <div className="space-y-2">
          <h3 className="text-cyan-400 font-bold text-lg uppercase flex items-center">
            <Shield className="mr-2" size={20} /> Bem-vindo ao Nexus War
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            O mundo mudou. Você é um sobrevivente em uma guerra territorial baseada em localização. 
            Sua jornada começa com combate básico, mas o verdadeiro poder reside na economia e na logística.
          </p>
        </div>

        {/* Addresses */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-white font-bold text-md uppercase flex items-center mb-2">
            <MapPin className="mr-2 text-purple-400" size={18} /> Sistema de Endereçamento
          </h3>
          <p className="text-slate-400 text-xs mb-3">
            Cada jogador possui um Endereço Virtual Único vinculado à sua Fortaleza (ex: <span className="font-mono text-cyan-300">CMDR_Alfa7_BOX42</span>).
          </p>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            <li>Use este endereço para receber itens de outros jogadores.</li>
            <li>Itens enviados vão para sua <strong>Caixa Postal</strong> (acessível em qualquer lugar) ou <strong>Armazém</strong> (local físico).</li>
          </ul>
        </div>

        {/* Logistics & Mail */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-white font-bold text-md uppercase flex items-center mb-2">
            <Package className="mr-2 text-emerald-400" size={18} /> Correios e Entregas
          </h3>
          <p className="text-slate-400 text-xs mb-3">
            O comércio move o mundo. Você pode enviar recursos de duas formas:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900 p-2 rounded">
              <span className="block font-bold text-emerald-400 mb-1">Correio do Sistema</span>
              <p className="text-slate-500">Lento (24h), mas 100% seguro. Ideal para itens valiosos de baixo volume.</p>
            </div>
            <div className="bg-slate-900 p-2 rounded">
              <span className="block font-bold text-amber-400 mb-1">Correio Privado</span>
              <p className="text-slate-500">Transportado por outros jogadores. Rápido, mas arriscado (pode ser roubado em PvP).</p>
            </div>
          </div>
        </div>

        {/* Companies */}
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <h3 className="text-white font-bold text-md uppercase flex items-center mb-2">
            <Truck className="mr-2 text-blue-400" size={18} /> Empresas Virtuais
          </h3>
          <p className="text-slate-300 text-xs mb-2">
            Ao atingir nível suficiente, você pode fundar sua própria <strong>Empresa de Logística</strong>.
          </p>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            <li><strong>Gerencie Frotas:</strong> Compre caminhões, drones e veículos blindados.</li>
            <li><strong>Contratos:</strong> Aceite missões de entrega de NPCs ou outros jogadores.</li>
            <li><strong>Rotas:</strong> Defina rotas comerciais entre cidades para gerar renda passiva.</li>
          </ul>
        </div>

        {/* Combat */}
        <div className="space-y-2">
          <h3 className="text-red-400 font-bold text-lg uppercase flex items-center">
             Combate & Sobrevivência
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Não esqueça suas raízes. O mundo é perigoso. Proteja suas cargas, ataque comboios rivais e mantenha sua vitalidade alta. Se você morrer, perderá itens não segurados.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-cyan-600 text-white font-bold py-3 rounded-xl mt-4 uppercase tracking-widest shadow-lg shadow-cyan-900/20"
        >
          Entendido, Comandante
        </button>
      </div>
    </div>
  );
};

export default Tutorial;