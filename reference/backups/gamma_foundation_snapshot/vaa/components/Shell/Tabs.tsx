import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tab } from '@/core/kernel/types';

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onSwitchTab: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTabId, 
  onAddTab, 
  onCloseTab, 
  onSwitchTab 
}) => {
  return (
    <div className="h-12 bg-gray-950 border-b border-white/5 flex items-center px-4 gap-2 overflow-hidden">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
        <AnimatePresence initial={false}>
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              onClick={() => onSwitchTab(tab.id)}
              className={`group relative flex items-center gap-3 px-4 py-1.5 rounded-xl cursor-pointer transition-all min-w-[120px] max-w-[200px] border ${
                activeTabId === tab.id 
                  ? 'bg-white/10 border-white/10 text-white' 
                  : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest truncate flex-1">
                {tab.title || 'Untitled Session'}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className={`p-1 rounded-lg transition-all ${
                  activeTabId === tab.id 
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                    : 'opacity-0 group-hover:opacity-100 hover:bg-white/10 text-gray-600 hover:text-gray-300'
                }`}
              >
                <X className="w-3 h-3" />
              </button>

              {activeTabId === tab.id && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={onAddTab}
        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
