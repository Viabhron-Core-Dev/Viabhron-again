import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Save, 
  Share2,
  Maximize2,
  Minimize2,
  MousePointer2,
  Hand,
  Layers,
  Cpu,
  Sparkles
} from 'lucide-react';
import { CanvasNode, CanvasEdge, UIMode } from '@/core/kernel/types';

interface CanvasProps {
  tabId: string;
  userId?: string;
  initialData?: { nodes: CanvasNode[]; edges: CanvasEdge[] };
  viewMode?: 'logic' | 'design';
  onViewModeChange?: (mode: 'logic' | 'design') => void;
  onUpdate?: (data: { nodes: CanvasNode[]; edges: CanvasEdge[] }) => void;
  uiMode: UIMode;
}

export const Canvas: React.FC<CanvasProps> = ({
  tabId,
  userId,
  initialData,
  viewMode = 'logic',
  onViewModeChange,
  onUpdate,
  uiMode
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialData?.nodes || []);
  const [edges, setEdges] = useState<CanvasEdge[]>(initialData?.edges || []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setNodes(initialData.nodes);
      setEdges(initialData.edges);
    }
  }, [initialData]);

  const handleAddNode = (type: string) => {
    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type: type as any,
      position: { x: 100, y: 100 },
      data: { label: `New ${type}` },
      status: 'idle'
    };
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    onUpdate?.({ nodes: newNodes, edges });
  };

  const handleDeleteNode = (id: string) => {
    const newNodes = nodes.filter(n => n.id !== id);
    const newEdges = edges.filter(e => e.source !== id && e.target !== id);
    setNodes(newNodes);
    setEdges(newEdges);
    onUpdate?.({ nodes: newNodes, edges: newEdges });
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="relative w-full h-full bg-[#050508] overflow-hidden flex flex-col font-sans">
      {/* Canvas Toolbar */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl">
        <button 
          onClick={() => handleAddNode('agent')}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 group relative"
          title="Add Agent Node"
        >
          <Cpu className="w-4 h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-[8px] font-bold text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">Add Agent</span>
        </button>
        <button 
          onClick={() => handleAddNode('logic')}
          className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-600/20 group relative"
          title="Add Logic Block"
        >
          <Zap className="w-4 h-4" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-[8px] font-bold text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">Add Logic</span>
        </button>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button className="p-2.5 text-gray-500 hover:text-white transition-colors">
          <MousePointer2 className="w-4 h-4" />
        </button>
        <button className="p-2.5 text-gray-500 hover:text-white transition-colors">
          <Hand className="w-4 h-4" />
        </button>
      </div>

      {/* View Mode Switcher */}
      {onViewModeChange && (
        <div className="absolute top-6 right-6 z-20 flex bg-gray-900/80 backdrop-blur-xl border border-white/10 p-1 rounded-2xl shadow-2xl">
          <button 
            onClick={() => onViewModeChange('logic')}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'logic' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Logic
          </button>
          <button 
            onClick={() => onViewModeChange('design')}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'design' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Design
          </button>
        </div>
      )}

      {/* Main Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px]"
        style={{ transform: `scale(${scale})` }}
      >
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              layoutId={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedId(node.id)}
              className={`absolute p-5 rounded-3xl border transition-all cursor-move group ${
                selectedId === node.id 
                  ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-600/20' 
                  : 'bg-gray-900/80 backdrop-blur-xl border-white/10 hover:border-white/20'
              }`}
              style={{ left: node.position.x, top: node.position.y, width: '240px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${node.type === 'agent' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {node.type === 'agent' ? <Cpu className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{node.data.label}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(node.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>Latency: 45ms</span>
                  <span>Load: 12%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Canvas HUD */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2 px-4 border-r border-white/10">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Zoom</span>
          <span className="text-[10px] font-mono text-white">{Math.round(scale * 100)}%</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-2.5 text-gray-500 hover:text-white transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-2.5 text-gray-500 hover:text-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/5">
          <Save className="w-3.5 h-3.5" />
          Ratify
        </button>
      </div>

      {/* MiniMap / Status */}
      <div className="absolute bottom-8 right-8 w-48 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Sovereign Mesh</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
            <span>Nodes</span>
            <span className="text-white">{nodes.length}</span>
          </div>
          <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-widest">
            <span>Edges</span>
            <span className="text-white">{edges.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
