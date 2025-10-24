
import React, { useState } from 'react';
import type { Tool } from '../types';

interface ToolPanelProps {
  tool: Tool;
  onEdit: (prompt: string, loadingText: string) => void;
  onClose: () => void;
}

const PRESETS = {
  'Verão Vibrante': 'Apply a vibrant summer preset with bright colors and high saturation.',
  'Filme Vintage': 'Give the image a vintage film look with faded colors and slight grain.',
  'P&B Dramático': 'Convert the image to a dramatic, high-contrast black and white.',
  'Urbano Intenso': 'Add a gritty, urban feel with high sharpness and cool tones.',
  'Brilho do Pôr do Sol': 'Enhance the image with a warm, golden sunset glow.',
  'Estilo Disney Pixar': `Redraw this image in the style of a Disney Pixar animated movie, keeping the facial features and characteristics of the people recognizable.`,
  'Estilo Cartoon': `Turn this image into a classic 2D cartoon style, preserving the main features of the subjects.`,
  'Estilo Turma da Mônica': `Redraw this image in the distinct cartoon style of 'Turma da Mônica' (Monica's Gang) by Mauricio de Sousa, making sure the people look like characters from that universe but still recognizable.`,
  'Estilo Ghibli': `Transform this image into the beautiful, painterly anime style of Studio Ghibli, maintaining the essence of the original subjects.`,
  '3D Realista': `Render this image as a realistic 3D model, like a modern video game character, keeping the person's likeness.`,
  '3D Cartoon': `Recreate this image in a stylized 3D cartoon style, like the game Fortnite, but ensure the original person is identifiable.`,
};

const FACIAL_MOODS = {
  'Mais Feliz': 'Make the person in the photo look slightly happier, with a natural smile.',
  'Mais Sério': 'Give the person in the photo a more serious, contemplative expression.',
  'Surpreso': 'Subtly alter the expression to look surprised.',
  'Relaxado': 'Make the person look relaxed and at ease.',
  'Pensativo': 'Adjust the expression to look thoughtful or pensive.',
};

export const ToolPanel: React.FC<ToolPanelProps> = ({ tool, onEdit, onClose }) => {
  const [prompt, setPrompt] = useState('');

  const renderContent = () => {
    switch (tool) {
      case 'presets':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Filtros Inteligentes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Object.entries(PRESETS).map(([name, prompt]) => (
                <button
                  key={name}
                  onClick={() => onEdit(prompt, `Aplicando ${name}...`)}
                  className="bg-gray-600 hover:bg-purple-600 p-2 rounded-lg text-sm transition-colors h-16 flex items-center justify-center text-center"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        );
      case 'editObject':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Editar Objetos</h3>
            <p className="text-sm text-gray-400 mb-2">Descreva o que adicionar, remover ou alterar, incluindo a localização na imagem para maior precisão. Ex: "adicione um gato no sofá à direita" ou "remova o carro no fundo".</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="ex: Adicione um balão vermelho no canto superior"
                className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button onClick={() => {if(prompt) onEdit(prompt, 'Editando objetos...')}} disabled={!prompt} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed">Aplicar</button>
            </div>
          </div>
        );
      case 'facialMood':
        return (
            <div>
              <h3 className="text-lg font-semibold mb-3">Alterar Expressão Facial</h3>
              <p className="text-sm text-gray-400 mb-2">Escolha uma expressão ou descreva uma personalizada.</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                {Object.entries(FACIAL_MOODS).map(([name, prompt]) => (
                  <button
                    key={name}
                    onClick={() => onEdit(prompt, `Alterando expressão para ${name}...`)}
                    className="bg-gray-600 hover:bg-purple-600 p-2 rounded-lg text-sm transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
               <div className="flex space-x-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="ex: Dê um sorriso com a boca fechada"
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={() => {if(prompt) onEdit(`Change the facial expression to: ${prompt}, keeping the person's unique features.`, 'Alterando expressão...')}} disabled={!prompt} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed">Aplicar</button>
            </div>
            </div>
          );
      case 'background':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Ferramentas de Fundo</h3>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button onClick={() => onEdit('Remove the background, make it transparent', 'Removendo fundo...')} className="flex-grow bg-gray-600 hover:bg-purple-600 px-4 py-2 rounded-md font-semibold">Remover Fundo</button>
                <div className="flex-grow flex space-x-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Descreva o novo fundo..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button onClick={() => {if(prompt) onEdit(`Change the background to: ${prompt}`, 'Alterando fundo...')}} disabled={!prompt} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed">Gerar</button>
                </div>
            </div>
          </div>
        );
      case 'upscale':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Super Resolução</h3>
            <p className="text-sm text-gray-400 mb-3">Melhore a qualidade e os detalhes da imagem. Isso pode levar um momento.</p>
            <div className="flex space-x-2">
                <button onClick={() => onEdit('Upscale this image, enhance the details and resolution to 4K', 'Ampliando para 4K...')} className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Melhorar para 4K</button>
                <button onClick={() => onEdit('Upscale this image, enhance the details and resolution to 8K', 'Ampliando para 8K...')} className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Melhorar para 8K</button>
            </div>
          </div>
        );
      case 'prompt':
        return (
            <div>
              <h3 className="text-lg font-semibold mb-3">Comando Livre</h3>
              <p className="text-sm text-gray-400 mb-2">Descreva qualquer alteração que você queira fazer na imagem.</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="ex: Deixe o céu mais azul e adicione nuvens"
                  className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={() => {if(prompt) onEdit(prompt, 'Aplicando seu comando...')}} disabled={!prompt} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed">Gerar</button>
              </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-4 border-t-2 border-purple-500/50">
       <div className="max-w-3xl mx-auto relative">
         <button onClick={onClose} className="absolute -top-1 right-0 md:-right-1 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>
         {renderContent()}
       </div>
    </div>
  );
};
