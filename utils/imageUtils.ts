import type { Adjustments } from '../App';

export function applyAdjustments(
  base64Image: string,
  adjustments: Adjustments
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`;
      
      ctx.drawImage(img, 0, 0);

      const mimeType = base64Image.substring(5, base64Image.indexOf(';'));
      
      resolve(canvas.toDataURL(mimeType));
    };
    img.onerror = (err) => reject(err);
    img.src = base64Image;
  });
}
