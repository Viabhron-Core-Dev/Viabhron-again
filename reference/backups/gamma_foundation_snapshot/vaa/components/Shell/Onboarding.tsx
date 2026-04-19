import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, Cpu, Zap, Globe } from 'lucide-react';

interface OnboardingProps {
  onComplete: (state: any) => void;
  onSkipToChat?: () => void;
  onSkipToSettings?: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ 
  onComplete,
  onSkipToChat,
  onSkipToSettings
}) => {
  const handleComplete = () => {
    onComplete({ completed: true });
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#050508] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-600/40"
        >
          <Shield className="w-12 h-12 text-white" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white uppercase tracking-tighter"
          >
            Welcome to Viabhron
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em]"
          >
            Sovereign Agentic Operating System
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Autonomous', icon: Cpu, desc: 'Self-executing agents' },
            { title: 'Sovereign', icon: Shield, desc: 'Local-first security' },
            { title: 'Connected', icon: Globe, desc: 'Mesh network ready' }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
              <item.icon className="w-6 h-6 text-blue-400 mx-auto" />
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-white uppercase tracking-widest">{item.title}</div>
                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleComplete}
            className="group flex items-center gap-4 px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-blue-600/40 mx-auto"
          >
            Initialize Substrate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <div className="flex justify-center gap-6">
            <button onClick={onSkipToChat} className="text-[10px] font-bold text-gray-600 hover:text-gray-400 uppercase tracking-widest transition-colors">Skip to Comms</button>
            <button onClick={onSkipToSettings} className="text-[10px] font-bold text-gray-600 hover:text-gray-400 uppercase tracking-widest transition-colors">Skip to Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};
