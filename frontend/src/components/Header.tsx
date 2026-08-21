import React from 'react';
import { BookOpen, Sparkles, PlusCircle } from 'lucide-react';
import { ViewStage, StoryState } from '../types/story';

interface HeaderProps {
  viewStage: ViewStage;
  storyState: StoryState | null;
  onRequestNewStory: () => void;
  onGoToLanding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewStage,
  storyState,
  onRequestNewStory,
  onGoToLanding,
}) => {
  const currentChapterNum = storyState?.chapters.length || 1;
  const totalChapters = storyState?.config.totalChapters || 5;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-story-border/60 bg-[#0a0d14]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={onGoToLanding}
          className="group flex items-center gap-3 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
          aria-label="PlotTwist Home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5" />
            <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-amber-400 animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              PlotTwist
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium hidden sm:inline">
              Every Choice Creates a Story
            </span>
          </div>
        </button>

        {/* Center Story Indicator (Active Story Screen) */}
        {viewStage === 'story' && storyState && (
          <div className="hidden md:flex items-center gap-3 bg-story-card/80 border border-story-border/80 rounded-full px-4 py-1.5 text-xs">
            <span className="font-semibold text-purple-400 uppercase tracking-wider">
              {storyState.config.genre}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">
              Chapter {currentChapterNum} of {totalChapters}
            </span>
            <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden ml-1">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${(currentChapterNum / totalChapters) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onGoToLanding()}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${viewStage === 'landing' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Story
          </button>
          <button
            id="nav-autopilot-btn"
            onClick={() => {
              // Custom navigation handler will be plugged into App.tsx
              (window as any).__onNavigateAutopilot?.();
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${viewStage === 'autopilot' || viewStage === 'autopilotStory' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Autopilot
          </button>

          {viewStage !== 'landing' && viewStage !== 'autopilot' && viewStage !== 'autopilotStory' && (
            <button
              onClick={onRequestNewStory}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1.5 text-xs font-medium text-white shadow-md hover:from-purple-500 hover:to-purple-600 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>New Story</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
