import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

import { SecurityRule, UIMode } from '@/core/kernel/types';

interface SecurityDivisionProps {
  rules: SecurityRule[];
  onAddRule: (rule: Omit<SecurityRule, "id" | "createdAt">) => void;
  onToggleRule: (id: string) => void;
  onDeleteRule: (id: string) => void;
  onLockdown: () => void;
  isLockdownActive: boolean;
  onUnlock: () => void;
  uiMode: UIMode;
}

export const SecurityDivision: React.FC<SecurityDivisionProps> = ({ 
  rules, 
  onAddRule, 
  onToggleRule, 
  onDeleteRule, 
  onLockdown, 
  isLockdownActive, 
  onUnlock, 
  uiMode 
}) => {
  return (
    <div className={`h-full bg-gray-950 flex flex-col font-mono overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      <div className="h-16 bg-red-950/20 border-b border-red-900/30 flex items-center justify-between px-8 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-500/10 rounded-xl">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">Security Division</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-500 uppercase">Active Monitoring</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Firewall', status: 'Hardened', icon: <Lock className="w-5 h-5" />, color: 'text-blue-400' },
            { label: 'Intrusion', status: 'Zero Threats', icon: <Eye className="w-5 h-5" />, color: 'text-emerald-400' },
            { label: 'Bulkheads', status: 'Sealed', icon: <ShieldCheck className="w-5 h-5" />, color: 'text-purple-400' }
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] space-y-4">
              <div className={`p-3 bg-white/5 rounded-2xl w-fit ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                <div className="text-lg font-black text-white uppercase">{stat.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-950/10 border border-red-900/20 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-widest">Sovereign Guardrails</h3>
              <p className="text-xs text-gray-500">Natural language policy enforcement substrate.</p>
            </div>
            <button className="px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-600/20">
              Update Charter
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              "Block all non-accredited API calls to external domains.",
              "Enforce 1024-bit encryption on all Neural Archive pulses.",
              "Silent-block any agent attempt to modify Kernel SOPs."
            ].map((rule, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-white/5 group">
                <ShieldAlert className="w-4 h-4 text-red-900 group-hover:text-red-500 transition-colors" />
                <span className="text-xs text-gray-400 font-medium">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
