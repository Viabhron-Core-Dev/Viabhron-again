import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Globe, 
  Zap, 
  Layout, 
  Settings, 
  Plus,
  Search,
  Users,
  Menu
} from 'lucide-react';
import { Tab } from '@/core/kernel/types';

interface BottomNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  isSidebarOpen: boolean;
  onTabSelect: (id: string) => void;
  onAddTab: () => void;
  onToggleSidebar: () => void;
  onShareTab: (tab: any) => void;
  onTabClose: (id: string) => void;
  onShelveTab?: (id: string) => void;
  onWakeTab?: (id: string) => void;
  onToggleUIMode: () => void;
  onOpenTabSwitcher: () => void;
  onOpenSystemMenu: () => void;
  onEditTab: (tab: any) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  tabs,
  activeTabId,
  isSidebarOpen,
  onTabSelect,
  onAddTab,
  onToggleSidebar,
  onShareTab,
  onTabClose,
  onShelveTab,
  onWakeTab,
  onToggleUIMode,
  onOpenTabSwitcher,
  onOpenSystemMenu,
  onEditTab
}) => {
  const items = [
    { id: 'chats', icon: MessageSquare, label: 'Comms' },
    { id: 'discovery', icon: Globe, label: 'Mesh' },
    { id: 'workflow', icon: Zap, label: 'Lab' },
    { id: 'extensions', icon: Layout, label: 'Vault' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-gray-950/80 backdrop-blur-2xl border-t border-white/5 px-6 flex items-center justify-between z-[100] md:hidden">
      <button 
        onClick={onToggleSidebar}
        className={`p-2 rounded-xl transition-all ${isSidebarOpen ? 'text-blue-400' : 'text-gray-600'}`}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2 flex-1 justify-around">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabSelect(item.id)}
            className={`flex flex-col items-center gap-1.5 p-2 transition-all ${
              activeTabId === item.id ? 'text-blue-400' : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTabId === item.id ? 'fill-blue-400/10' : ''}`} />
            <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
      
      <button 
        onClick={onAddTab}
        className="ml-4 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
};
