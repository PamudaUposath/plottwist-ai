import React from 'react';
import { Sparkles, Wand2, Compass, Layers, GitBranch, Cpu, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartAdventure: () => void;
  savedStoryExists: boolean;
  onContinueSavedStory: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAdventure,
  savedStoryExists,
  onContinueSavedStory,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 text-center animate-fade-in">
      {/* Hero Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-md shadow-inner">
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
        <span>AWS Builder Center Weekend Creative Challenge</span>
      </div>

      {/* Main Hero Headline */}
      <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
        Every Choice Creates a <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Different Story</span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-light">
        Step into a story written around your decisions. Choose your world, make your move, and see where the story takes you.
      </p>

      {/* Primary & Restore CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={onStartAdventure}
          className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-purple-950/50 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-900/60 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <Wand2 className="h-5 w-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span>Create Your Adventure</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {savedStoryExists && (
          <button
            onClick={onContinueSavedStory}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/30 px-6 py-4 text-sm font-semibold text-purple-200 hover:bg-purple-900/50 hover:border-purple-400 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <span>Continue Adventure</span>
          </button>
        )}
      </div>

      {/* Secondary Tagline Badge */}
      <p className="mt-4 text-xs text-slate-400 flex items-center gap-1.5 justify-center">
        <Cpu className="h-3.5 w-3.5 text-purple-400" />
        <span>Interactive branching storytelling</span>
      </p>

      {/* Homepage Feature Preview Cards */}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full text-left">
        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-900/40 text-purple-300 border border-purple-500/30">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Choose Your World</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Pick a genre, character, and setting. Combine custom ideas or craft an unexpected realm.
          </p>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-900/40 text-pink-300 border border-pink-500/30">
            <GitBranch className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Make Your Move</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every chapter ends with three meaningful decisions. Your choice actively directs the plot and character choices.
          </p>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-900/40 text-amber-300 border border-amber-500/30">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Change the Ending</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            A creative story engine where every decision changes what happens next.
          </p>
        </div>
      </div>
    </div>
  );
};
