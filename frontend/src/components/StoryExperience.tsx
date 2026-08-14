import React, { useState, useEffect } from 'react';
import { StoryChoice, StoryState } from '../types/story';
import { ChoiceCard } from './ChoiceCard';
import { LoadingState } from './LoadingState';
import { ErrorAlert } from './ErrorAlert';
import { Sparkles, BookOpen, RotateCcw, PlusCircle, Award } from 'lucide-react';

interface StoryExperienceProps {
  storyState: StoryState;
  isGenerating: boolean;
  loadingMessage: string;
  error: { title: string; message: string } | null;
  onSelectChoice: (choice: StoryChoice) => void;
  onRetry: () => void;
  onViewFullStory: () => void;
  onRestartSameConfig: () => void;
  onRequestNewStory: () => void;
}

export const StoryExperience: React.FC<StoryExperienceProps> = ({
  storyState,
  isGenerating,
  loadingMessage,
  error,
  onSelectChoice,
  onRetry,
  onViewFullStory,
  onRestartSameConfig,
  onRequestNewStory,
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const chapters = storyState.chapters;
  const currentChapter = chapters[chapters.length - 1];
  const currentChapterNum = chapters.length;
  const totalChapters = storyState.config.totalChapters;
  const isFinalChapter = storyState.completed || currentChapter.choices?.length === 0;

  // Reset selected choice ID whenever chapter changes or if an error occurs
  useEffect(() => {
    setSelectedChoiceId(null);
  }, [currentChapterNum, storyState?.storyId, error]);

  const handleChoiceClick = (choice: StoryChoice) => {
    if (isGenerating || selectedChoiceId) return;
    setSelectedChoiceId(choice.id);
    onSelectChoice(choice);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 animate-fade-in">
      {/* Digital Book Frame */}
      <div className="glass-card relative overflow-hidden rounded-3xl border border-story-border p-6 sm:p-10 shadow-2xl">
        {/* Top Story Header Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-story-border/70 text-xs">
          <div className="flex items-center gap-2 text-purple-400 font-semibold tracking-wider uppercase">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>{storyState.config.genre}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-normal capitalize">{storyState.config.setting}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>
              Chapter {currentChapterNum} of {totalChapters}
            </span>
          </div>
        </div>

        {/* Story Title & Chapter Title */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {storyState.title}
          </h1>
          <h2 className="mt-2 text-base sm:text-lg font-serif italic text-purple-300">
            {currentChapter.title}
          </h2>
        </div>

        {/* Main Story Content Text */}
        <div className="story-text-container font-serif-story text-slate-200 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto my-6 whitespace-pre-line tracking-wide">
          {currentChapter.content}
        </div>

        {/* Loading Spinner / Skeletal State */}
        {isGenerating && <LoadingState message={loadingMessage} />}

        {/* Error Handling Alert */}
        {error && <ErrorAlert title={error.title} message={error.message} onRetry={onRetry} />}

        {/* Choices Section for Non-Final Chapters */}
        {!isFinalChapter && !isGenerating && (
          <div className="mt-10 pt-8 border-t border-story-border/80 space-y-4">
            <h3 className="font-heading text-lg font-bold text-white text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span>What do you do?</span>
            </h3>

            <div className="space-y-3">
              {currentChapter.choices?.map((choice) => (
                <ChoiceCard
                  key={choice.id}
                  choice={choice}
                  isSelected={selectedChoiceId === choice.id}
                  isDisabled={isGenerating}
                  onSelect={handleChoiceClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Final Chapter Banner & Action Buttons */}
        {isFinalChapter && !isGenerating && (
          <div className="mt-12 pt-8 border-t border-purple-500/40 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-900 to-pink-900 px-6 py-2 text-sm font-bold text-amber-300 shadow-lg border border-amber-500/30 mb-4">
              <Award className="h-5 w-5 text-amber-400" />
              <span className="uppercase tracking-widest">The End</span>
            </div>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
              Your choices created this version of the story. Another path could have ended very differently.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
              <button
                onClick={onViewFullStory}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <BookOpen className="h-4 w-4" />
                <span>Read Full Story</span>
              </button>

              <button
                onClick={onRestartSameConfig}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <RotateCcw className="h-4 w-4 text-purple-300" />
                <span>Try Another Path</span>
              </button>

              <button
                onClick={onRequestNewStory}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 px-5 py-3 text-sm font-semibold text-purple-200 hover:bg-purple-900/60 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Story</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
