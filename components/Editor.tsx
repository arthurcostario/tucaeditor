import React, { useState } from 'react';
import type { Tool } from '../types';
import type { Adjustments } from '../App';
import { Toolbar } from './Toolbar';
import { ToolPanel } from './ToolPanel';
import { AdjustmentsPanel } from './AdjustmentsPanel';
import { UndoIcon } from './icons/UndoIcon';
import { ResetIcon } from './icons/ResetIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface EditorProps {
  image: string;
  onEdit: (prompt: string, loadingText: string) => void;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
  onDownload: () => void;
  adjustments: Adjustments;
  onAdjustmentsChange: (adjustments: Adjustments) => void;
}

export const Editor: React.FC<EditorProps> = ({ 
  image, 
  onEdit, 
  onUndo, 
  onReset, 
  canUndo,
  onDownload,
  adjustments,
  onAdjustmentsChange 
}) => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleToolSelect = (tool: Tool) => {
    setActiveTool(tool === activeTool ? null : tool);
  };

  const imageStyle = {
    filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      <header className="flex-shrink-0 bg-gray-800/50 p-2 flex justify-between items-center z-20">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">tuCa Editor</h1>
        <div className="flex items-center space-x-2">
            <button 
                onClick={onUndo} 
                disabled={!canUndo}
                className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                title="Desfazer"
            >
                <UndoIcon className="w-5 h-5" />
            </button>
            <button 
                onClick={onReset}
                className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 transition-colors"
                title="Restaurar Original"
            >
                <ResetIcon className="w-5 h-5" />
            </button>
            <button 
                onClick={onDownload}
                className="p-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
                title="Baixar Imagem"
            >
                <DownloadIcon className="w-5 h-5" />
            </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
            <img src={image} style={imageStyle} alt="Conteúdo editável" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"/>
        </div>
      </main>

      <footer className="flex-shrink-0 z-20">
        {activeTool && activeTool !== 'adjust' && <ToolPanel tool={activeTool} onEdit={onEdit} onClose={() => setActiveTool(null)} />}
        {activeTool === 'adjust' && <AdjustmentsPanel adjustments={adjustments} onAdjustmentsChange={onAdjustmentsChange} onClose={() => setActiveTool(null)} />}
        <Toolbar activeTool={activeTool} onSelectTool={handleToolSelect} />
      </footer>
    </div>
  );
};
