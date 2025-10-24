
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function base64ToBlob(base64: string): { base64Data: string, mimeType: string } {
    const parts = base64.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const base64Data = parts[1];
    return { base64Data, mimeType };
}
