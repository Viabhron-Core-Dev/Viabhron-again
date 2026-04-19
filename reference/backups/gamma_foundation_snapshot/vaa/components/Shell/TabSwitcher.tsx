import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Search, Layers, Zap, MessageSquare, Globe, Cpu } from 'lucide-react';
import { Tab } from '@/core/kernel/types';

interface TabSwitcherProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddTab: () => void;
  onClose: () => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onAddTab,
  onClose
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'canvas': return <Zap className="w-4 h-4" />;
      case 'discovery': return <Globe className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-gray-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Active Substrates</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{tabs.length} Sessions Ratified</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-500 hover:text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => onTabSelect(tab.id)}
                className={`group relative p-6 rounded-[2.5rem] border transition-all cursor-pointer ${
                  activeTabId === tab.id 
                    ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-600/20' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${activeTabId === tab.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                    {getIcon(tab.type)}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}
                    className="p-2 text-gray-700 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-sm font-bold text-white mb-1 truncate">{tab.title || 'Untitled Session'}</h3>
                <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">{tab.type} substrate</p>
                
                {activeTabId === tab.id && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Active</span>
                  </div>
                )}
              </motion.div>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={onAddTab}
              className="p-6 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all group"
            >
              <div className="p-4 bg-white/5 rounded-2xl text-gray-600 group-hover:text-blue-400 group-hover:bg-blue-600/10 transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400">New Substrate</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
