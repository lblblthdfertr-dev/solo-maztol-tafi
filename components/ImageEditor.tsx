
import React, { useState, useRef } from 'react';
import { ImageIcon, Wand2, Upload, Loader2, RefreshCw } from 'lucide-react';
import { editImageWithAI } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = (event.target?.result as string).split(',')[1];
        setImage(base64String);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    try {
      const result = await editImageWithAI(image, mimeType, prompt);
      if (result) setEditedImage(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/80 border border-green-900 rounded-lg p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-green-900 pb-2">
        <ImageIcon size={20} className="text-green-500" />
        <h2 className="text-lg font-bold uppercase tracking-widest">Nano-Banana Image Synthesizer</h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative border border-green-900 bg-black aspect-video flex items-center justify-center overflow-hidden">
            {editedImage ? (
              <img src={editedImage} alt="Edited" className="w-full h-full object-contain" />
            ) : image ? (
              <img src={`data:${mimeType};base64,${image}`} alt="Original" className="w-full h-full object-contain opacity-50" />
            ) : (
              <div className="text-green-900 text-sm tracking-widest flex flex-col items-center gap-2">
                <Upload size={32} />
                <span>LOAD ASSET</span>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-green-500" size={40} />
                <span className="text-green-500 text-xs tracking-[0.3em] uppercase">Synthesizing Pixels...</span>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-green-950/30 border border-green-900 hover:border-green-500 text-green-600 hover:text-green-400 py-2 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Upload size={14} /> NEW SOURCE
            </button>
            {editedImage && (
              <button
                onClick={() => setEditedImage(null)}
                className="bg-green-950/30 border border-green-900 hover:border-green-500 text-green-600 hover:text-green-400 px-4 py-2 text-xs uppercase tracking-widest transition-all"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-green-700 uppercase tracking-widest font-bold">Instruction Vector</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. 'Add a retro glitch effect', 'Remove the person', 'Transform into cyberpunk'..."
              className="w-full bg-black border border-green-800 text-green-400 p-3 focus:outline-none focus:border-green-400 text-sm h-32 resize-none"
            />
          </div>

          <button
            onClick={handleEdit}
            disabled={loading || !image || !prompt}
            className="w-full bg-green-500 hover:bg-green-400 text-black py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all"
          >
            <Wand2 size={20} /> SYNTHESIZE
          </button>

          <div className="mt-auto border-t border-green-900 pt-4">
            <p className="text-[10px] text-green-900 uppercase tracking-widest leading-relaxed">
              * Using Gemini 2.5 Flash Image engine for low-latency visual manipulation. Base64 encoding enforced for secure transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
