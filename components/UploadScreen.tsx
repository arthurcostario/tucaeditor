import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface UploadScreenProps {
  onImageUpload: (file: File) => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        tuCa Editor
      </h1>
      <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
        Transforme suas imagens com o poder da IA. De ajustes simples à manipulação complexa de objetos, dê vida à sua visão criativa.
      </p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <button
        onClick={handleButtonClick}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center space-x-3 transition-transform transform hover:scale-105 shadow-lg shadow-purple-500/30"
      >
        <UploadIcon className="w-6 h-6" />
        <span>Carregar Imagem</span>
      </button>
    </div>
  );
};
