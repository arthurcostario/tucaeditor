import React from 'react';
import type { Adjustments } from '../App';

interface AdjustmentsPanelProps {
  adjustments: Adjustments;
  onAdjustmentsChange: (adjustments: Adjustments) => void;
  onClose: () => void;
}

const Slider: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}> = ({ label, value, onChange, min = 0, max = 200 }) => (
    <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
            <label htmlFor={label} className="text-sm font-medium text-gray-300">{label}</label>
            <span className="text-xs bg-gray-600 px-2 py-1 rounded-md w-12 text-center">{value}%</span>
        </div>
        <input
            id={label}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


export const AdjustmentsPanel: React.FC<AdjustmentsPanelProps> = ({ adjustments, onAdjustmentsChange, onClose }) => {
    const handleReset = () => {
        onAdjustmentsChange({ brightness: 100, contrast: 100, saturation: 100 });
    };

    return (
        <div className="bg-gray-800/80 backdrop-blur-sm p-4 border-t-2 border-purple-500/50">
           <div className="max-w-3xl mx-auto relative">
             <button onClick={onClose} className="absolute -top-1 right-0 md:-right-1 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
             <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Ajustes Finos</h3>
                <Slider 
                    label="Brilho"
                    value={adjustments.brightness}
                    onChange={value => onAdjustmentsChange({ ...adjustments, brightness: value })}
                />
                <Slider 
                    label="Contraste"
                    value={adjustments.contrast}
                    onChange={value => onAdjustmentsChange({ ...adjustments, contrast: value })}
                />
                <Slider 
                    label="Saturação"
                    value={adjustments.saturation}
                    onChange={value => onAdjustmentsChange({ ...adjustments, saturation: value })}
                />
                <button 
                    onClick={handleReset}
                    className="w-full mt-2 bg-gray-600 hover:bg-purple-600 px-4 py-2 rounded-md font-semibold transition-colors"
                >
                    Redefinir Ajustes
                </button>
             </div>
           </div>
        </div>
    );
};
