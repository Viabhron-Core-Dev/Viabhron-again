import React from 'react';
import { motion } from 'motion/react';
import { Globe, Search, Zap, Shield, Cpu, Plus } from 'lucide-react';
import { UIMode } from '@/core/kernel/types';

interface DiscoveryProps {
  accessToken: string;
  onProjectSelected: (projectId: string, config: any) => Promise<void>;
  uiMode: UIMode;
}

export const Discovery: React.FC<DiscoveryProps> = ({ accessToken, onProjectSelected, uiMode }) => {
  return (
    <div className="h-full bg-[#050508] flex flex-col p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Global Discovery</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em]">Explore the Sovereign Mesh Network</p>
        </div>

        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-600" />
          <input 
            type="text" 
            placeholder="Search for projects, agents, or protocols..."
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Sovereign Finance', desc: 'RBI-compliant agentic banking substrate.', category: 'Protocol', icon: Shield, color: 'text-emerald-400' },
            { title: 'Vision Lab', desc: 'Advanced visual reasoning and synthesis.', category: 'Extension', icon: Zap, color: 'text-blue-400' },
            { title: 'Nexus Graph', desc: 'Relational persistent memory engine.', category: 'Core', icon: Globe, color: 'text-purple-400' },
            { title: 'Agent Forge', desc: 'Autonomous agent synthesis environment.', category: 'Tool', icon: Cpu, color: 'text-orange-400' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
