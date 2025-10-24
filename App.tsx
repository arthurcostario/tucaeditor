
import React, { useState, useCallback } from 'react';
import { UploadScreen } from './components/UploadScreen';
import { Editor } from './components/Editor';
import { LoadingOverlay } from './components/LoadingOverlay';
import { editImageWithAi } from './services/geminiService';
import type { Tool } from './types';
import { base64ToBlob, blobToBase64 } from './utils/fileUtils';
import { applyAdjustments } from './utils/imageUtils';

export interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
}

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>({ brightness: 100, contrast: 100, saturation: 100 });

  const areAdjustmentsDefault = useCallback(() => {
    return adjustments.brightness === 100 &&
           adjustments.contrast === 100 &&
           adjustments.saturation === 100;
  }, [adjustments]);

  const handleImageUpload = (file: File) => {
    setIsLoading(true);
    setLoadingMessage('Carregando imagem...');
    blobToBase64(file).then(base64 => {
      setOriginalImage(base64);
      setCurrentImage(base64);
      setHistory([base64]);
      setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
      setIsLoading(false);
      setLoadingMessage('');
    }).catch(err => {
        console.error(err);
        setError('Falha ao carregar a imagem. Por favor, tente outro arquivo.');
        setIsLoading(false);
        setLoadingMessage('');
    });
  };
  
  const handleEdit = useCallback(async (prompt: string, loadingText: string) => {
    if (!currentImage) return;

    setIsLoading(true);
    setLoadingMessage(loadingText);
    setError(null);

    try {
      const imageToEdit = areAdjustmentsDefault() ? currentImage : await applyAdjustments(currentImage, adjustments);
      const { base64Data, mimeType } = base64ToBlob(imageToEdit);
      const newImageBase64 = await editImageWithAi(base64Data, mimeType, prompt);
      const fullImageSrc = `data:${mimeType};base64,${newImageBase64}`;

      setCurrentImage(fullImageSrc);
      setHistory(prev => [...prev, fullImageSrc]);
      setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao editar a imagem. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [currentImage, adjustments, areAdjustmentsDefault]);
  
  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentImage(newHistory[newHistory.length - 1]);
      setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    }
  };

  const handleReset = () => {
    if (originalImage) {
      setCurrentImage(originalImage);
      setHistory([originalImage]);
      setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    }
  }
  
  const handleDownload = async () => {
    if (!currentImage) return;
    setIsLoading(true);
    setLoadingMessage('Preparando download...');
    try {
      const imageToDownload = areAdjustmentsDefault()
        ? currentImage
        : await applyAdjustments(currentImage, adjustments);

      const link = document.createElement('a');
      link.href = imageToDownload;
      const extension = imageToDownload.split(';')[0].split('/')[1] || 'png';
      link.download = `tuCaEditor_${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to prepare image for download:', err);
      setError('Não foi possível preparar a imagem para download.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center justify-center relative">
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      {error && (
        <div className="absolute top-4 bg-red-500 text-white p-3 rounded-lg z-50 animate-pulse" onClick={() => setError(null)}>
          {error}
        </div>
      )}
      {!currentImage ? (
        <UploadScreen onImageUpload={handleImageUpload} />
      ) : (
        <Editor 
          image={currentImage} 
          onEdit={handleEdit} 
          onUndo={handleUndo}
          onReset={handleReset}
          canUndo={history.length > 1}
          onDownload={handleDownload}
          adjustments={adjustments}
          onAdjustmentsChange={setAdjustments}
        />
      )}
    </div>
  );
};

export default App;