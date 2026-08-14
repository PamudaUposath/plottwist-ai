import React from 'react';
import { StoryChoice } from '../types/story';
import { ChevronRight } from 'lucide-react';

interface ChoiceCardProps {
  choice: StoryChoice;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (choice: StoryChoice) => void;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  choice,
  isSelected,
  isDisabled,
  onSelect,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onSelect(choice)}
      className={`group relative flex w-full items-center justify-between rounded-xl border p-4 sm:p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
        isSelected
          ? 'border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-950/50 ring-1 ring-purple-500'
          : isDisabled
          ? 'border-slate-800 bg-slate-900/30 text-slate-500 cursor-not-allowed opacity-60'
          : 'border-slate-800/80 bg-story-card/90 hover:border-purple-500/50 hover:bg-story-cardHover hover:shadow-md hover:shadow-purple-950/20 active:scale-[0.99]'
      }`}
      aria-label={`Choice ${choice.id}: ${choice.text}`}
    >
      <div className="flex items-start gap-3.5 sm:gap-4">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold shadow-inner transition-colors ${
            isSelected
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-purple-300 group-hover:bg-purple-900/60 group-hover:text-white'
          }`}
        >
          {choice.id}
        </span>
        <span className="text-sm sm:text-base font-medium leading-snug text-slate-200 group-hover:text-white transition-colors">
          {choice.text}
        </span>
      </div>

      <ChevronRight
        className={`h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 ${
          isSelected ? 'text-purple-400 translate-x-1' : ''
        }`}
      />
    </button>
  );
};
