
import React, { useState } from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import ProfileForm from './components/ProfileForm';
import SoulExplorer from './components/SoulExplorer';
import { AppState, BirthData, Interpretation, ActiveTab } from './types';
import { getAstrologicalInterpretation } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);

  const handleFormSubmit = async (data: BirthData) => {
    setState(AppState.LOADING);
    setError(null);
    setBirthData(data);

    try {
      const result = await getAstrologicalInterpretation(data);
      setInterpretation(result);
      setState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Celestial interference detected. Please try again.");
      setState(AppState.ERROR);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setBirthData(null);
    setInterpretation(null);
    setError(null);
  };

  return (
    <div className="min-h-screen relative bg-slate-950 overflow-hidden">
      <StarfieldBackground />

      {state === AppState.IDLE && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <header className="mb-12 text-center animate-fadeIn">
            <div className="inline-block p-1 mb-4 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-amber-500">
              <div className="bg-slate-950 rounded-full p-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400"><path d="M12 2v20M2 12h20M5.07 5.07l13.86 13.86M18.93 5.07L5.07 18.93"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-mystical font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-violet-400 tracking-tighter">
              AKASHA EXPLORER
            </h1>
            <p className="text-slate-400 mt-3 text-lg font-light max-w-2xl mx-auto">
              Decrypt your soul's multidimensional origins.
            </p>
          </header>
          <ProfileForm onSubmit={handleFormSubmit} isLoading={false} />
        </div>
      )}

      {state === AppState.LOADING && (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-t-4 border-b-4 border-violet-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-violet-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl text-violet-200 font-mystical">Channeling Akashic Data</h3>
            <p className="text-slate-500 animate-pulse italic">Scanning soul memory banks across 12 dimensions...</p>
          </div>
        </div>
      )}

      {state === AppState.RESULTS && interpretation && birthData && (
        <SoulExplorer interpretation={interpretation} birthData={birthData} onReset={reset} />
      )}

      {state === AppState.ERROR && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-md bg-red-900/20 border border-red-500/30 p-8 rounded-2xl text-center">
            <h3 className="text-xl text-red-400 mb-2 font-mystical">Celestial Blockage</h3>
            <p className="text-slate-400 mb-6">{error}</p>
            <button onClick={reset} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
