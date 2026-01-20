
import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Shield, Power } from 'lucide-react';
import SearchTerminal from './SearchTerminal';
import ImageEditor from './ImageEditor';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-1000">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-green-500/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded text-black">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-green-400 uppercase">System-01 // Matrix Core</h1>
            <p className="text-[10px] text-green-700 tracking-[0.3em] font-medium">AI INTEGRATION ACTIVE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-green-600 tracking-widest uppercase font-bold">System Time</span>
            <span className="text-sm font-mono text-green-400">{currentTime}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-green-700 text-xs px-3 py-1 border border-green-900 rounded">
              <Shield size={14} /> SECURE
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-red-600 hover:bg-red-950/20 rounded border border-transparent hover:border-red-900 transition-all"
            >
              <Power size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
        <div className="h-[500px] lg:h-auto overflow-hidden">
          <SearchTerminal />
        </div>
        <div className="h-[600px] lg:h-auto overflow-hidden">
          <ImageEditor />
        </div>
      </main>

      {/* Footer / System Status */}
      <footer className="mt-8 flex flex-wrap justify-between items-center gap-4 text-[10px] text-green-900 tracking-widest uppercase py-4 border-t border-green-900">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> Gemini 3 Pro Connected</span>
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> Nano-Banana Ready</span>
        </div>
        <div>
          &copy; 2025 ZION NETWORK // ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
