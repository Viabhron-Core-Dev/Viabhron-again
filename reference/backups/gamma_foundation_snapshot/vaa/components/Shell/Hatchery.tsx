import React from 'react';
import { motion } from 'motion/react';
import { Egg, Sparkles, Cpu, Zap, Plus, ArrowRight } from 'lucide-react';

import { UIMode } from '@/core/kernel/types';

interface HatcheryProps {
  onHatch: (data: any) => Promise<void>;
  uiMode: UIMode;
}

export const Hatchery: React.FC<HatcheryProps> = ({ onHatch, uiMode }) => {
  return (
    <div className={`h-full bg-[#050508] p-8 flex flex-col items-center justify-center space-y-12 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-40 h-40 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-white/20"
        >
          <Egg className="w-20 h-20 text-white" />
        </motion.div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">App Hatchery</h2>
        <p className="text-sm text-gray-500 leading-relaxed">Synthesize autonomous agentic workflows and sovereign applications from pure intent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <button className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white uppercase tracking-widest">New Synthesis</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-tighter">Start from prompt</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
        </button>
        <button className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600/10 rounded-xl text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white uppercase tracking-widest">Clone Substrate</div>
              <div className="text-[10px] text-gray-600 uppercase tracking-tighter">Fork existing agent</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};
