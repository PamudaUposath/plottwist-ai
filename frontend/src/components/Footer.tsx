import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-story-border/50 bg-[#07090f]/90 py-8 px-4 text-xs text-slate-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 text-center">
        <div className="flex items-center justify-center gap-2 font-medium text-slate-300">
          <span>Built with React and deployed on AWS Amplify.</span>
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
        </div>
        <p className="text-slate-500">
          PlotTwist — Every Choice Creates a Different Story.
        </p>
        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
          Author: Pamuda U. de A. Goonatilake
        </p>
      </div>
    </footer>
  );
};
