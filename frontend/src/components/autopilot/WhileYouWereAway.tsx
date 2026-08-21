import React from 'react';

interface WhileYouWereAwayProps {
  count: number;
  onExplore: () => void;
  onClose: () => void;
}

export const WhileYouWereAway: React.FC<WhileYouWereAwayProps> = ({ count, onExplore, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 rounded-2xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 text-3xl">
            ✍️
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight mb-2">
            While You Were Away...
          </h2>
          
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            PlotTwist keeps creating stories autonomously, even when nobody is here. Since your last visit, our agent has written:
          </p>

          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 mb-8">
            <span className="block text-4xl font-black text-purple-400">
              {count}
            </span>
            <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
              New Autonomous Stories
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onExplore}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 text-sm"
            >
              Explore New Stories
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-300 border border-slate-800 font-medium py-2.5 px-6 rounded-xl transition-all text-xs"
            >
              Close Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
