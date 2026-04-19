import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Settings, 
  MoreVertical, 
  QrCode,
  Camera,
  LogOut,
  Users,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CelestialChat, Message, Agent } from "../../types";
import { ChatList } from "./ChatList";
import { ChatView } from "./ChatView";

interface VaaClientProps {
  agents: Agent[];
}

export const VaaClient: React.FC<VaaClientProps> = ({ agents }) => {
  const [selectedChat, setSelectedChat] = useState<CelestialChat | null>(null);
  const [chats, setChats] = useState<CelestialChat[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Basic Chat Initialization for MVK
    const cloudManager = agents.find(a => a.id === 'cloud-manager');
    const sentinel = agents.find(a => a.id === 'sentinel');

    const initialChats: CelestialChat[] = [
      {
        id: "chat-cloud-manager",
        name: "Cloud Manager",
        type: "agent",
        isHeadAgent: true,
        messages: [
          {
            id: "m1",
            role: "assistant",
            content: "Sovereign Kernel Active. I am your Cloud Manager. All infrastructure divisions are reporting optimal status. How shall we begin our mission?",
            timestamp: new Date().toISOString()
          }
        ],
        lastMessage: "Sovereign Kernel Active.",
        updatedAt: Date.now()
      },
      {
        id: "chat-sentinel",
        name: "Sentinel",
        type: "sentinel",
        isSentinel: true,
        messages: [
          {
            id: "s1",
            role: "assistant",
            content: "[LOG] Viabhron Kernel initialized successfully.",
            timestamp: new Date().toISOString()
          },
          {
            id: "s2",
            role: "assistant",
            content: "[INFO] Bulkheads at 100% integrity.",
            timestamp: new Date().toISOString()
          }
        ],
        lastMessage: "System monitoring active...",
        updatedAt: Date.now()
      }
    ];

    setChats(initialChats);
  }, [agents]);

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, userMessage],
      lastMessage: content,
      updatedAt: Date.now()
    };

    setChats(prev => prev.map(c => c.id === selectedChat.id ? updatedChat : c));
    setSelectedChat(updatedChat);

    // MVK Placeholder response logic
    setTimeout(() => {
      const response: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: `Acknowledged, Chairman. Processing protocol: "${content}".`,
        timestamp: new Date().toISOString()
      };
      
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, response],
        lastMessage: response.content,
        updatedAt: Date.now()
      };
      
      setChats(prev => prev.map(c => c.id === selectedChat.id ? finalChat : c));
      if (selectedChat?.id === finalChat.id) setSelectedChat(finalChat);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden selection:bg-indigo-100">
      <AnimatePresence mode="wait">
        {!selectedChat ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            {/* Vaa Header */}
            <div className="bg-wa-header text-white p-5 flex flex-col gap-4 shadow-lg z-20">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Vaa</h1>
                <div className="flex items-center gap-6 relative">
                  <QrCode className="w-6 h-6 text-white/90" />
                  <Camera className="w-6 h-6 text-white/90" />
                  <button onClick={() => setShowMenu(!showMenu)}>
                    <MoreVertical className="w-6 h-6 text-white/90" />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-10 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50">
                      {[
                        { label: "Settings", icon: <Settings className="w-5 h-5" /> },
                        { label: "Contacts", icon: <Users className="w-5 h-5" /> },
                        { label: "History", icon: <History className="w-5 h-5" /> },
                        { label: "Logout", icon: <LogOut className="w-5 h-5" />, color: "text-red-500" }
                      ].map((item) => (
                        <button key={item.label} className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-sm font-bold ${item.color || "text-slate-700"}`}>
                          {item.icon}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat List */}
            <ChatList chats={chats} onSelectChat={setSelectedChat} />

            {/* Bottom Nav Placeholder */}
            <div className="bg-[#f0f2f5] p-3 border-t border-slate-200 flex justify-around">
               <div className="p-2 text-indigo-600 border-t-2 border-indigo-600">
                 <MessageSquare className="w-6 h-6" />
               </div>
               <div className="p-2 text-slate-400">
                 <Users className="w-6 h-6" />
               </div>
               <div className="p-2 text-slate-400">
                 <Settings className="w-6 h-6" />
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="h-full"
          >
            <ChatView 
              chat={selectedChat} 
              onBack={() => setSelectedChat(null)} 
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
