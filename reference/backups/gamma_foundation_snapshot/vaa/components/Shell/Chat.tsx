import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Sparkles, 
  Zap, 
  Shield, 
  Cpu, 
  Bot,
  Terminal,
  Layers,
  MoreVertical,
  Plus,
  Search,
  MessageSquare
} from 'lucide-react';
import { Extension, UIMode } from '@/core/kernel/types';
import { ChatList } from '../ChatList';
import { ChatView } from '../ChatView';

interface ChatProps {
  tabId: string;
  userId?: string;
  agentId?: string;
  isBridged?: boolean;
  geminiApiKey?: string;
  availableExtensions: Extension[];
  activeExtensionIds: string[];
  externalPlugins: any[];
  onUpdateExternalPlugins: (plugins: any[]) => void;
  onUpdateExtensions: (ids: string[]) => void;
  isLockdown?: boolean;
  checkSovereignProcedures?: (action: string, metadata?: any) => { allowed: boolean; message?: string };
  uiMode: UIMode;
}

export const Chat: React.FC<ChatProps> = ({
  tabId,
  userId,
  agentId,
  isBridged,
  geminiApiKey,
  availableExtensions,
  activeExtensionIds,
  externalPlugins,
  onUpdateExternalPlugins,
  onUpdateExtensions,
  isLockdown,
  checkSovereignProcedures,
  uiMode
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  // Mock data for now to get the UI running
  const mockChats = [
    { id: '1', name: 'Nexus Architect', lastMessage: 'System synthesis complete.', timestamp: new Date(), unread: 0 },
    { id: '2', name: 'Creative Director', lastMessage: 'Visual assets ratified.', timestamp: new Date(), unread: 2 },
    { id: '3', name: 'Security Guardian', lastMessage: 'Lockdown protocol standby.', timestamp: new Date(), unread: 0 }
  ];

  return (
    <div className="flex h-full bg-[#08080a] overflow-hidden">
      {/* Chat Sidebar */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-gray-900/20 backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Sovereign Comms</h2>
            <div className="p-2 bg-blue-600/10 rounded-xl">
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input 
              type="text" 
              placeholder="Search transmissions..."
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[10px] text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <ChatList 
            chats={mockChats as any} 
            onSelectChat={(chat) => setSelectedChatId(chat.id)} 
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {selectedChatId ? (
          <ChatView 
            chat={{
              ...mockChats.find(c => c.id === selectedChatId) as any,
              messages: messages
            }}
            onSendMessage={(content) => {
              const newMessage = { id: Date.now().toString(), content, sender: 'user', timestamp: new Date() };
              setMessages([...messages, newMessage]);
            }}
            isLockdown={isLockdown}
            onBack={() => setSelectedChatId(null)}
            onShowMenu={() => {}}
            onOpenCommandCenter={() => {}}
            showMenu={false}
            menuRef={{ current: null } as any}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/5">
                <Bot className="w-10 h-10 text-gray-700" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Select Transmission</h3>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Awaiting secure handshake...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
