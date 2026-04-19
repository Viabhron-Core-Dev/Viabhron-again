import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, Check, X, Info } from 'lucide-react';

interface ConfirmationGateProps {
  isOpen: boolean;
  title: string;
  description: string;
  agentName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationGate: React.FC<ConfirmationGateProps> = ({
  isOpen,
  title,
  description,
  agentName,
  onConfirm,
  onCancel
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                  <Shield className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">{title}</h2>
                  <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-1">Sovereign Ratification Required</p>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/10 rounded-xl flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Request from: {agentName}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={onCancel}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border border-white/5"
                >
                  Deny Action
                </button>
                <button 
                  onClick={onConfirm}
                  className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-orange-600/20"
                >
                  Ratify & Execute
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
