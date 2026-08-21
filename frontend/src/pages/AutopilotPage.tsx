import React, { useEffect, useState } from 'react';
import { AutonomousStory } from '../../../agent/src/types/story';
import { AutopilotStatus as AutopilotStatusType } from '../types/autopilot';
import { fetchStories, fetchAgentStatus } from '../services/autopilotApi';
import { AutopilotStatus } from '../components/autopilot/AutopilotStatus';
import { AutopilotStoryList } from '../components/autopilot/AutopilotStoryList';

interface AutopilotPageProps {
  onReadStory: (id: string) => void;
}

export const AutopilotPage: React.FC<AutopilotPageProps> = ({ onReadStory }) => {
  const [stories, setStories] = useState<AutonomousStory[]>([]);
  const [status, setStatus] = useState<AutopilotStatusType | null>(null);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [storiesError, setStoriesError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingStories(true);
        const data = await fetchStories();
        setStories(data);
        setStoriesError(null);
      } catch (err: any) {
        setStoriesError(err.message || 'Autopilot is temporarily unavailable. Please try again shortly.');
      } finally {
        setLoadingStories(false);
      }

      try {
        setLoadingStatus(true);
        const statusData = await fetchAgentStatus();
        setStatus(statusData);
        setStatusError(null);
      } catch (err: any) {
        setStatusError(err.message || 'Status fetch failed');
      } finally {
        setLoadingStatus(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-purple-900/40 to-slate-900/60 border border-purple-500/20 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <span className="text-xs bg-purple-500/20 text-purple-300 font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-purple-500/30 inline-block mb-3">
          Challenge Edition
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-2 tracking-tight">
          PlotTwist Autopilot
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
          PlotTwist keeps writing while you're away. The autonomous story agent uses Amazon Bedrock and Scheduled EventBridge execution to compile full stories independently, 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Stories list */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <span>📚</span> Recent Autonomous Stories
          </h2>

          {loadingStories ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-48 animate-pulse" />
              ))}
            </div>
          ) : storiesError ? (
            <div className="bg-slate-900/60 border border-red-950 rounded-xl p-6 text-center text-slate-400">
              <span className="text-2xl block mb-2">⚠️</span>
              <p className="text-sm">{storiesError}</p>
            </div>
          ) : (
            <AutopilotStoryList stories={stories} onRead={onReadStory} />
          )}
        </div>

        {/* Right Column: Status & statistics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <span>📊</span> Agent Overview
          </h2>
          <AutopilotStatus status={status} loading={loadingStatus} error={statusError} />

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 text-xs text-slate-500 leading-relaxed">
            <p className="font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <span>💡</span> About Autonomous Generation
            </p>
            PlotTwist Autopilot runs on a separate SAM/CloudFormation stack. An EventBridge Scheduler triggers a generator Lambda function on a cycle (e.g. rate limit of 3 hours) which calls Amazon Bedrock to draft a standalone complete narrative.
          </div>
        </div>
      </div>
    </div>
  );
};
