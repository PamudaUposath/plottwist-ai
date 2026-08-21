import React, { useEffect, useState } from 'react';
import { AutonomousStory } from '../../../agent/src/types/story';
import { fetchStoryById } from '../services/autopilotApi';

interface AutopilotStoryPageProps {
  storyId: string;
  onBack: () => void;
}

export const AutopilotStoryPage: React.FC<AutopilotStoryPageProps> = ({ storyId, onBack }) => {
  const [story, setStory] = useState<AutonomousStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStory() {
      try {
        setLoading(true);
        const data = await fetchStoryById(storyId);
        setStory(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Story could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadStory();
  }, [storyId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-slate-800 rounded w-3/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-800 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <span className="text-4xl block mb-4">⚠️</span>
        <h3 className="text-lg font-bold text-slate-300 mb-2">Failed to Load Story</h3>
        <p className="text-sm text-slate-500 mb-6">{error || 'An unexpected error occurred'}</p>
        <button
          onClick={onBack}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-6 py-2 rounded-xl transition-colors text-xs font-semibold"
        >
          Return to Autopilot
        </button>
      </div>
    );
  }

  const formattedDate = new Date(story.generatedAt).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-6 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Autopilot list
      </button>

      {/* Story book design wrapper */}
      <article className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8 md:p-12 shadow-2xl relative">
        <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-400 border-b border-l border-slate-800/80 px-4 py-2 rounded-tr-2xl rounded-bl-xl text-xs font-semibold tracking-wider">
          {story.timePeriod} EDITION
        </div>

        <header className="mb-8 border-b border-slate-800/60 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-medium tracking-wide">
              {story.genre}
            </span>
            <span className="text-xs bg-slate-950/60 text-slate-400 px-2.5 py-1 rounded-full font-medium">
              Tone: {story.tone}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-100 mb-3 leading-tight tracking-tight">
            {story.title}
          </h1>

          <p className="text-xs text-slate-500 font-medium">
            Generated automatically on {formattedDate}
          </p>
        </header>

        {/* Setting / theme summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-950/40 p-4 rounded-xl border border-slate-800/40">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Setting</span>
            <span className="text-sm font-semibold text-slate-300">{story.setting}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Theme</span>
            <span className="text-sm font-semibold text-slate-300">{story.theme}</span>
          </div>
        </div>

        {/* Main narrative text */}
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-base text-slate-300 leading-relaxed whitespace-pre-line font-serif italic mb-6 border-l-2 border-purple-500/30 pl-4 bg-purple-950/5 py-2">
            {story.summary}
          </p>
          <div className="text-base md:text-lg text-slate-300 leading-relaxed font-serif whitespace-pre-line space-y-4">
            {story.story}
          </div>
        </div>

        {/* Plot twist block */}
        {story.plotTwist && (
          <div className="bg-purple-950/10 border border-purple-500/20 rounded-xl p-6 md:p-8 mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
            <h3 className="text-base font-bold text-purple-400 mb-2 flex items-center gap-1.5">
              <span>🌀</span> The Autopilot Plot Twist
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-serif">
              {story.plotTwist}
            </p>
          </div>
        )}
      </article>
    </div>
  );
};
