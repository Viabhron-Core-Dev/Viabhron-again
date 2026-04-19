import React from 'react';
import { motion } from 'motion/react';
import { Store, Download, Star, ShieldCheck, Zap, Cpu, Layers } from 'lucide-react';
import { UIMode } from '@/core/kernel/types';

interface ExtensionStoreProps {
  onInstall: (extension: any) => void;
  installedIds: string[];
  uiMode: UIMode;
}

export const ExtensionStore: React.FC<ExtensionStoreProps> = ({ onInstall, installedIds, uiMode }) => {
  const extensions = [
    { id: 'ext-1', name: 'Metabolic Secretary', desc: 'Autonomous background monitoring.', icon: Zap, rating: 4.9, category: 'Productivity' },
    { id: 'ext-2', name: 'Quantum Bridge', desc: 'QaaS orchestration substrate.', icon: Cpu, rating: 4.8, category: 'Compute' },
    { id: 'ext-3', name: 'Symphony', desc: 'Autonomous project implementation.', icon: Layers, rating: 5.0, category: 'Orchestration' }
  ];

  return (
    <div className="h-full bg-[#050508] flex flex-col p-8 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Extension Vault</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em]">Accredited Sovereign Modules</p>
          </div>
          <div className="p-4 bg-blue-600/10 rounded-3xl border border-blue-500/20">
            <Store className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {extensions.map((ext) => (
            <div key={ext.id} className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-white/5 rounded-2xl text-blue-400">
                  <ext.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-white">{ext.rating}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{ext.name}</h3>
              <p className="text-sm text-gray-500 mb-8 flex-1">{ext.desc}</p>
              
              <button 
                onClick={() => onInstall(ext)}
                disabled={installedIds.includes(ext.id)}
                className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  installedIds.includes(ext.id)
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                }`}
              >
                {installedIds.includes(ext.id) ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Installed
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Ratify & Install
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
