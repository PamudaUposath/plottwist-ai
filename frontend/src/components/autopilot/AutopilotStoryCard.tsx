import React from 'react';
import { AutonomousStory } from '../../../../agent/src/types/story';

interface AutopilotStoryCardProps {
  story: AutonomousStory;
  onRead: (storyId: string) => void;
}

export const AutopilotStoryCard: React.FC<AutopilotStoryCardProps> = ({ story, onRead }) => {
  const formattedDate = new Date(story.generatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl hover:border-purple-500/30 transition-all group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-medium tracking-wide">
            {story.genre}
          </span>
          <span className="text-xs text-slate-500">{formattedDate}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-400 transition-colors mb-2">
          {story.title}
        </h3>

        <p className="text-xs text-purple-400 font-semibold mb-3 flex items-center gap-1">
          <span>✨</span> Theme: {story.theme}
        </p>

        <p className="text-sm text-slate-400 line-clamp-3 mb-6">
          {story.summary}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
        <span className="text-xs text-slate-500 italic bg-slate-950/60 px-2 py-1 rounded">
          🕒 {story.timePeriod}
        </span>
        <button
          onClick={() => onRead(story.storyId)}
          className="text-xs bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Read Story
        </button>
      </div>
    </div>
  );
};
