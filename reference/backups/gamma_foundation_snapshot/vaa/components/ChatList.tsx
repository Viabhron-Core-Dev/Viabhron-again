import React from "react";
import { Terminal, Mail, User } from "lucide-react";
import { CelestialChat } from "@/core/kernel/types";

interface ChatListProps {
  chats: CelestialChat[];
  onSelectChat: (chat: CelestialChat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-1 py-2">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onSelectChat(chat)}
          className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-3xl transition-all duration-200 mb-2 border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 group"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-sm border-2 flex-shrink-0 relative ${
            chat.type === 'gmail' ? 'bg-red-50 text-red-500 border-red-100' : 
            chat.type === 'sentinel' ? 'bg-orange-50 text-orange-500 border-orange-100' :
            chat.isHeadAgent ? 'bg-indigo-600 text-white border-indigo-400' :
            'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
            {chat.type === 'gmail' ? <Mail className="w-7 h-7" /> : chat.type === 'sentinel' ? <Terminal className="w-7 h-7" /> : chat.isHeadAgent ? "Ω" : <User className="w-7 h-7" />}
            {chat.isHeadAgent && <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /></div>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{chat.name}</h3>
                {chat.isSentinel && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50" />
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">12:45 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 truncate mt-0.5 max-w-[85%]">{chat.lastMessage}</p>
              {chat.isHeadAgent && (
                <div className="bg-wa-header text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  3
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
