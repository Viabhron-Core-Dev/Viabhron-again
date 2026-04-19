import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Database, 
  Clock, 
  Shield, 
  Box, 
  ChevronRight, 
  Map as MapIcon,
  Layers,
  Archive,
  Cpu,
  Zap,
  LayoutGrid
} from 'lucide-react';

interface MemoryRoom {
  id: string;
  name: string;
  description: string;
  icon: any;
  loci: number;
  lastUpdate: string;
}

export const MemoryPalace: React.FC = () => {
  const [rooms] = useState<MemoryRoom[]>([
    { id: 'vault', name: 'The Vault', description: 'Fiscal ledgers and x402 transaction logs.', icon: Shield, loci: 142, lastUpdate: '2m ago' },
    { id: 'forge', name: 'The Forge', description: 'Raw code snippets and verification reports.', icon: Cpu, loci: 856, lastUpdate: 'Just now' },
    { id: 'sentinel', name: 'The Watchtower', description: 'Security logs and threat detection events.', icon: Zap, loci: 2403, lastUpdate: '15m ago' },
    { id: 'nexus', name: 'The Archive', description: 'Verbatim transcripts for narrative synthesis.', icon: Archive, loci: 512, lastUpdate: '1h ago' }
  ]);

  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  return (
    <div className="h-full bg-[#050508] flex flex-col font-sans overflow-hidden">
      {/* Header HUD */}
      <div className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-600/10 rounded-xl">
            <LayoutGrid className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Memory Palace</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Spatial Long-Term Memory // Protocol 8015</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Accuracy: 96.6%
          </div>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        {/* Palace Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <motion.button
              key={room.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveRoom(room.id)}
              className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${
                activeRoom === room.id ? 'bg-emerald-600/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10' : 'bg-gray-900/40 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${activeRoom === room.id ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400 group-hover:text-white'}`}>
                  <room.icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{room.loci} Loci</div>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{room.name}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{room.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[9px] text-gray-600 uppercase font-bold">Updated {room.lastUpdate}</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${activeRoom === room.id ? 'translate-x-1 text-emerald-400' : 'text-gray-700'}`} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Room Detail / Loci Map */}
        <AnimatePresence mode="wait">
          {activeRoom ? (
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900/40 border border-white/5 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <MapIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Spatial Loci Map: {rooms.find(r => r.id === activeRoom)?.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-all">
                    Verbatim Logs
                  </button>
                  <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-all">
                    New Locus
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 group hover:border-emerald-500/30 transition-all cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-all" />
                    <span className="text-[9px] text-gray-600 uppercase font-bold group-hover:text-emerald-400">Locus_{i + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-gray-700 space-y-4">
              <Layers className="w-12 h-12 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Select a room to explore the Memory Palace</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="h-12 bg-gray-900/50 border-t border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Memory: 1.2 GB</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Retention: Infinite</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Archivist Agent Online</span>
        </div>
      </div>
    </div>
  );
};
