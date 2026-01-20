
import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'سلام') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 px-4">
      <div className={`w-full max-w-md p-8 bg-black border-2 ${error ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'border-green-500 shadow-[0_0_20px_rgba(0,255,65,0.5)]'} transition-all duration-300`}>
        <div className="flex justify-center mb-6">
          <Lock size={48} className={error ? 'text-red-600' : 'text-green-500'} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 tracking-widest uppercase">Access Required</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSCODE..."
              className="w-full bg-black border border-green-800 text-green-400 p-4 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all text-center tracking-widest placeholder:text-green-900"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-900/20 hover:bg-green-500 hover:text-black text-green-500 border border-green-500 py-3 font-bold transition-all duration-300 uppercase tracking-widest"
          >
            Authenticate
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-center text-sm animate-pulse">ACCESS DENIED - RETRY</p>
        )}
      </div>
      <p className="mt-8 text-green-900 text-xs tracking-[0.3em] uppercase opacity-50">Authorized Personnel Only</p>
    </div>
  );
};

export default Auth;
