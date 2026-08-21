import React from 'react';
import { AutonomousStory } from '../../../../agent/src/types/story';
import { AutopilotStoryCard } from './AutopilotStoryCard';

interface AutopilotStoryListProps {
  stories: AutonomousStory[];
  onRead: (storyId: string) => void;
}

export const AutopilotStoryList: React.FC<AutopilotStoryListProps> = ({ stories, onRead }) => {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8">
        <span className="text-4xl block mb-4">📭</span>
        <h3 className="text-lg font-bold text-slate-300 mb-1">No Autopilot Stories Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          The autonomous generator agent hasn't compiled any stories yet. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <AutopilotStoryCard key={story.storyId} story={story} onRead={onRead} />
      ))}
    </div>
  );
};
