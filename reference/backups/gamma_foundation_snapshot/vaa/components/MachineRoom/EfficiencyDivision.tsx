import React from 'react';
import { motion } from 'motion/react';
import { Zap, Activity, Cpu, BarChart3, ArrowUpRight } from 'lucide-react';

import { EfficiencyPatch, SystemMode, UIMode } from '@/core/kernel/types';

interface EfficiencyDivisionProps {
  mode: SystemMode;
  onModeChange: (mode: SystemMode) => void;
  patches: EfficiencyPatch[];
  onApplyPatch: (id: string) => void;
  uiMode: UIMode;
}

export const EfficiencyDivision: React.FC<EfficiencyDivisionProps> = ({ 
  mode, 
  onModeChange, 
  patches, 
  onApplyPatch, 
  uiMode 
}) => {
  return (
    <div className={`h-full bg-[#050508] p-8 flex flex-col space-y-8 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Efficiency Division</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Resource Optimization Substrate</p>
        </div>
        <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
          <Zap className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Compute Load', value: '12.4%', icon: Cpu, color: 'text-blue-400' },
          { label: 'Neural Throughput', value: '840 TPS', icon: Activity, color: 'text-emerald-400' },
          { label: 'Energy Efficiency', value: '98.2%', icon: Zap, color: 'text-yellow-400' }
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-2 bg-white/5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-700" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white/5 border border-white/5 rounded-[3rem] p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Resource Allocation Graph</span>
          </div>
          <div className="flex gap-2">
            {['1H', '6H', '24H', '7D'].map(t => (
              <button key={t} className={`px-3 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all ${t === '1H' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 flex items-end gap-2 pb-4">
          {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85, 60, 50, 40, 30, 45, 60].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className="flex-1 bg-blue-600/20 border-t-2 border-blue-500 rounded-t-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
