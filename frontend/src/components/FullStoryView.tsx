import React, { useState } from 'react';
import { StoryState } from '../types/story';
import { Copy, Check, Share2, RotateCcw, PlusCircle, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

interface FullStoryViewProps {
  storyState: StoryState;
  onBackToStory: () => void;
  onRestartSameConfig: () => void;
  onRequestNewStory: () => void;
}

export const FullStoryView: React.FC<FullStoryViewProps> = ({
  storyState,
  onBackToStory,
  onRestartSameConfig,
  onRequestNewStory,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Format full story into plain text string for copying
  const formatStoryPlainText = (): string => {
    let text = `========================================\n`;
    text += `${storyState.title.toUpperCase()}\n`;
    text += `Genre: ${storyState.config.genre} | Setting: ${storyState.config.setting}\n`;
    if (storyState.config.characterName) {
      text += `Protagonist: ${storyState.config.characterName}\n`;
    }
    text += `========================================\n\n`;

    storyState.chapters.forEach((ch) => {
      text += `[CHAPTER ${ch.number}: ${ch.title}]\n`;
      text += `${ch.content}\n\n`;
      if (ch.selectedChoice) {
        text += `👉 Decision: Selected Option [${ch.selectedChoice.id}] - "${ch.selectedChoice.text}"\n\n`;
      }
    });

    text += `--- THE END ---\n`;
    text += `Created with PlotTwist - Built with React and deployed on AWS Amplify\n`;
    return text;
  };

  const handleCopyStory = async () => {
    try {
      await navigator.clipboard.writeText(formatStoryPlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy story to clipboard:', err);
    }
  };

  const handleShareStory = async () => {
    const shareData = {
      title: storyState.title,
      text: `I just created "${storyState.title}" with PlotTwist. Every choice changed the story!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareData.text} Check it out: ${shareData.url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToStory}
          className="flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Interactive Reader</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyStory}
            className="flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-950/30 px-3.5 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-900/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300">Story Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-purple-400" />
                <span>Copy Story</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareStory}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {shared ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-slate-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Full Story Paper Container */}
      <article className="glass-card rounded-3xl border border-story-border p-6 sm:p-12 shadow-2xl space-y-10">
        {/* Story Header Summary */}
        <div className="text-center pb-8 border-b border-story-border/80">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Complete Tale • {storyState.config.genre}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {storyState.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
            <span className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              Setting: {storyState.config.setting}
            </span>
            {storyState.config.characterName && (
              <span className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
                Hero: {storyState.config.characterName}
              </span>
            )}
            <span className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              Chapters: {storyState.chapters.length}
            </span>
          </div>
        </div>

        {/* Chapters Sequential Display */}
        <div className="space-y-12 max-w-2xl mx-auto">
          {storyState.chapters.map((ch) => (
            <section key={ch.number} className="space-y-4">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-purple-200">
                Chapter {ch.number}: {ch.title}
              </h2>

              <div className="font-serif-story text-slate-200 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {ch.content}
              </div>

              {ch.selectedChoice && (
                <div className="mt-4 my-6 rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 text-xs sm:text-sm font-sans flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold">
                    {ch.selectedChoice.id}
                  </span>
                  <div>
                    <span className="font-semibold text-purple-300">Your Decision: </span>
                    <span className="text-slate-200 font-medium">{ch.selectedChoice.text}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Final Ending Footer */}
        <div className="pt-8 border-t border-story-border/80 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-6">
            <BookOpen className="h-4 w-4" />
            <span>End of Adventure</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onRestartSameConfig}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Another Path</span>
            </button>

            <button
              onClick={onRequestNewStory}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <PlusCircle className="h-4 w-4 text-purple-400" />
              <span>Start New Story</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
