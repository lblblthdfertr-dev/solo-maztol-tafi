
import React, { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOCKED);

  const handleAuthSuccess = () => {
    setAppState(AppState.DASHBOARD);
  };

  const handleLogout = () => {
    setAppState(AppState.LOCKED);
  };

  return (
    <div className="relative min-h-screen text-green-500 overflow-x-hidden selection:bg-green-500 selection:text-black">
      {/* Visual background layer */}
      <MatrixRain />
      
      {/* Interactive layer */}
      <div className="relative z-10 w-full min-h-screen">
        {appState === AppState.LOCKED ? (
          <Auth onSuccess={handleAuthSuccess} />
        ) : (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>

      {/* Aesthetic Overlays */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default App;
