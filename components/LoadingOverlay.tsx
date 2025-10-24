
import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-white">{message}</p>
    </div>
  );
};
