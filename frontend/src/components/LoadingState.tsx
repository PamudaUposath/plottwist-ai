import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  message: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div
      aria-live="polite"
      className="my-10 flex flex-col items-center justify-center rounded-2xl border border-story-border/80 bg-story-card/80 p-8 sm:p-12 text-center shadow-xl backdrop-blur-md animate-fade-in"
    >
      {/* Animated Book and Sparkle Icon */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900/60 to-pink-900/40 p-4 border border-purple-500/40 shadow-lg shadow-purple-950/40">
        <BookOpen className="h-10 w-10 text-purple-300 animate-pulse" />
        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-400 animate-bounce" />
      </div>

      {/* Cycling Message */}
      <h3 className="mb-2 text-lg sm:text-xl font-heading font-semibold text-purple-200 transition-all duration-300">
        {message}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
        Crafting a unique story chapter tailored to your decisions...
      </p>

      {/* Skeleton Text Lines Placeholder */}
      <div className="mt-8 w-full max-w-md space-y-3 opacity-60">
        <div className="h-3 w-full rounded-full bg-purple-950/60 animate-pulse" />
        <div className="h-3 w-5/6 rounded-full bg-purple-950/40 animate-pulse" />
        <div className="h-3 w-4/6 rounded-full bg-purple-950/30 animate-pulse" />
      </div>
    </div>
  );
};
