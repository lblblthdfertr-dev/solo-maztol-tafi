
import React, { useState } from 'react';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { searchGrounding } from '../services/geminiService';
import { SearchResult } from '../types';

const SearchTerminal: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchGrounding(query);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/80 border border-green-900 rounded-lg p-6 flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-green-900 pb-2">
        <Search size={20} className="text-green-500" />
        <h2 className="text-lg font-bold uppercase tracking-widest">Web Grounding Engine</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="QUERY THE EXTERNAL NETWORK..."
          className="flex-1 bg-transparent border border-green-800 text-green-400 p-3 focus:outline-none focus:border-green-400 text-sm"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-green-900/30 hover:bg-green-500 hover:text-black border border-green-500 px-6 disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "EXEC"}
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {result ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-green-400 leading-relaxed whitespace-pre-wrap text-sm border-l-2 border-green-900 pl-4 py-2 bg-green-950/10">
              {result.text}
            </div>
            {result.sources.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xs text-green-700 uppercase tracking-widest mb-2 font-bold">Verification Sources:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-green-950/30 border border-green-900 text-green-600 px-3 py-1 rounded hover:bg-green-500 hover:text-black transition-all flex items-center gap-1"
                    >
                      {source.title.slice(0, 30)}{source.title.length > 30 ? '...' : ''} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !loading && (
          <div className="h-full flex items-center justify-center text-green-900 text-sm tracking-widest italic opacity-50">
            Waiting for input...
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="animate-spin text-green-500" size={40} />
            <span className="text-green-500 text-xs tracking-[0.3em] uppercase animate-pulse">Scanning Grid...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTerminal;
