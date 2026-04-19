import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  Workflow, 
  Play, 
  Save, 
  Share2, 
  Plus, 
  Trash2, 
  Settings,
  Sparkles,
  Zap,
  Cpu,
  MousePointer2,
  Type,
  Square,
  Eraser,
  EyeOff,
  Download,
  Image as ImageIcon,
  Undo,
  Redo,
  Maximize2,
  Lock
} from 'lucide-react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Line } from 'react-konva';
import { UIMode } from '@/core/kernel/types';

interface VisualAsset {
  id: string;
  type: 'image' | 'rect' | 'text' | 'line';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  points?: number[];
  color?: string;
  src?: string;
  isRedacted?: boolean;
}

export function Creative({ uiMode }: { uiMode?: UIMode }) {
  const [viewMode, setViewMode] = useState<'workflow' | 'vision'>('vision');
  const [assets, setAssets] = useState<VisualAsset[]>([
    { id: 'bg', type: 'image', x: 0, y: 0, width: 800, height: 600, src: 'https://picsum.photos/seed/viabhron/800/600' }
  ]);
  const [tool, setTool] = useState<'select' | 'rect' | 'text' | 'pen' | 'redact'>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Workflow state (from previous version)
  const [nodes, setNodes] = useState([
    { id: '1', title: 'Narrative Seed', type: 'generation', status: 'completed', agentId: 'Nexus-Architect' },
    { id: '2', title: 'Visual Synthesis', type: 'generation', status: 'running', agentId: 'Creative-Specialist' },
    { id: '3', title: 'Sovereign Audit', type: 'orchestration', status: 'idle', agentId: 'Guardian' }
  ]);

  const handleAddAsset = (type: VisualAsset['type']) => {
    const newAsset: VisualAsset = {
      id: `asset-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: type === 'rect' ? 100 : undefined,
      height: type === 'rect' ? 100 : undefined,
      text: type === 'text' ? 'New Text' : undefined,
      points: type === 'line' ? [0, 0, 50, 50] : undefined,
      color: tool === 'redact' ? '#000000' : '#3b82f6',
      isRedacted: tool === 'redact'
    };
    setAssets([...assets, newAsset]);
    setSelectedId(newAsset.id);
  };

  const handleAIRedaction = () => {
    setIsProcessing(true);
    // Simulate AI detecting PII and redacting
    setTimeout(() => {
      const piiRedaction: VisualAsset = {
        id: `redact-${Date.now()}`,
        type: 'rect',
        x: 200,
        y: 150,
        width: 150,
        height: 30,
        color: '#000000',
        isRedacted: true
      };
      setAssets([...assets, piiRedaction]);
      setIsProcessing(false);
      alert("Sovereign Vision Lab: PII detected and redacted automatically.");
    }, 1500);
  };

  return (
    <div className={`h-full bg-[#08080a] flex flex-col font-sans overflow-hidden ${uiMode === 'browser' ? 'pb-32 md:pb-0' : ''}`}>
      {/* Header */}
      <header className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl ${viewMode === 'vision' ? 'bg-blue-600/10' : 'bg-pink-600/10'}`}>
            {viewMode === 'vision' ? <ImageIcon className="w-5 h-5 text-blue-400" /> : <Palette className="w-5 h-5 text-pink-400" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              {viewMode === 'vision' ? 'Sovereign Vision Lab' : 'Sovereign Creative Studio'}
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              {viewMode === 'vision' ? 'AI-Powered Image Editing & Redaction' : 'Multi-Step Workflow Orchestration'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-950 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode('workflow')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'workflow' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Workflow
            </button>
            <button 
              onClick={() => setViewMode('vision')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'vision' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Vision
            </button>
          </div>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button className="p-2 text-gray-500 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Tools */}
        <aside className="w-64 border-r border-white/5 bg-gray-900/30 p-6 space-y-8 overflow-y-auto no-scrollbar">
          {viewMode === 'vision' ? (
            <>
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Vision Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                  <ToolButton icon={MousePointer2} label="Select" active={tool === 'select'} onClick={() => setTool('select')} />
                  <ToolButton icon={Square} label="Shape" active={tool === 'rect'} onClick={() => setTool('rect')} />
                  <ToolButton icon={Type} label="Text" active={tool === 'text'} onClick={() => setTool('text')} />
                  <ToolButton icon={Zap} label="Pen" active={tool === 'pen'} onClick={() => setTool('pen')} />
                  <ToolButton icon={EyeOff} label="Redact" active={tool === 'redact'} onClick={() => setTool('redact')} color="text-red-400" />
                  <ToolButton icon={Eraser} label="Eraser" active={false} onClick={() => {}} />
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Intelligence</h3>
                <button 
                  onClick={handleAIRedaction}
                  disabled={isProcessing}
                  className="w-full flex items-center gap-3 p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-600/20 transition-all group"
                >
                  <Sparkles className={`w-4 h-4 text-blue-400 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Auto-Redact PII</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-600/10 border border-purple-500/20 rounded-xl hover:bg-purple-600/20 transition-all group">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">AI In-Painting</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Workflow Blocks</h3>
              <div className="grid grid-cols-1 gap-2">
                <BlockTemplate icon={Sparkles} label="Generation" color="text-pink-400" />
                <BlockTemplate icon={Layers} label="Refinement" color="text-blue-400" />
                <BlockTemplate icon={Workflow} label="Orchestration" color="text-purple-400" />
                <BlockTemplate icon={Zap} label="Export" color="text-orange-400" />
              </div>
            </div>
          )}
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden flex items-center justify-center">
          {viewMode === 'vision' ? (
            <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <Stage width={800} height={600} onMouseDown={() => {
                if (tool !== 'select') handleAddAsset(tool === 'rect' || tool === 'redact' ? 'rect' : tool === 'text' ? 'text' : 'line');
              }}>
                <Layer>
                  {assets.map((asset) => (
                    <React.Fragment key={asset.id}>
                      {asset.type === 'rect' && (
                        <Rect 
                          x={asset.x} 
                          y={asset.y} 
                          width={asset.width} 
                          height={asset.height} 
                          fill={asset.color} 
                          draggable 
                          onClick={() => setSelectedId(asset.id)}
                        />
                      )}
                      {asset.type === 'text' && (
                        <Text 
                          x={asset.x} 
                          y={asset.y} 
                          text={asset.text} 
                          fontSize={20} 
                          fill="white" 
                          draggable 
                          onClick={() => setSelectedId(asset.id)}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Layer>
              </Stage>
            </div>
          ) : (
            <div className="relative w-full h-full p-12">
              <AnimatePresence>
                {nodes.map((node, index) => (
                  <motion.div 
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute p-5 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl cursor-move group transition-all"
                    style={{ 
                      left: `${100 + index * 250}px`, 
                      top: `${150 + (index % 2) * 100}px`,
                      width: '220px'
                    }}
                  >
                    <h4 className="text-xs font-bold text-white mb-1">{node.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-4">Agent: {node.agentId}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Canvas Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Redo className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-72 border-l border-white/5 bg-gray-900/30 p-6 space-y-6 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Properties</h3>
            {selectedId ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Asset ID</label>
                  <div className="text-[10px] text-gray-400 font-mono">{selectedId}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-950 border border-white/5 rounded-lg p-2 text-center text-[10px] text-white">X: 100</div>
                    <div className="bg-gray-950 border border-white/5 rounded-lg p-2 text-center text-[10px] text-white">Y: 100</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setAssets(assets.filter(a => a.id !== selectedId));
                    setSelectedId(null);
                  }}
                  className="w-full py-2 bg-red-600/10 border border-red-500/20 text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600/20 transition-all"
                >
                  Delete Asset
                </button>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-700 uppercase tracking-widest text-[10px]">Select an asset to edit</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

const ToolButton = ({ icon: Icon, label, active, onClick, color = "text-gray-400" }: { icon: any, label: string, active: boolean, onClick: () => void, color?: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${active ? 'bg-blue-600/10 border-blue-500/50' : 'bg-gray-950 border-white/5 hover:border-white/10'}`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : color}`} />
    <span className={`text-[8px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const BlockTemplate = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-950 border border-white/5 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/10 transition-all group">
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors">{label}</span>
  </div>
);
