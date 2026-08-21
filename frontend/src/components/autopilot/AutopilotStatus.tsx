import React from 'react';
import { AutopilotStatus as AutopilotStatusType } from '../../types/autopilot';

interface AutopilotStatusProps {
  status: AutopilotStatusType | null;
  loading: boolean;
  error: string | null;
}

export const AutopilotStatus: React.FC<AutopilotStatusProps> = ({ status, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg animate-pulse">
        <div className="h-4 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-3 bg-slate-800 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-slate-800 rounded w-2/3"></div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="bg-slate-900 border border-red-900/50 rounded-xl p-6 shadow-lg text-slate-400">
        <p className="text-red-400 text-sm font-semibold mb-1">Status Offline</p>
        <p className="text-xs">Autopilot details are temporarily unavailable.</p>
      </div>
    );
  }

  const timeAgo = status.lastGeneratedAt
    ? `${Math.max(1, Math.round((Date.now() - new Date(status.lastGeneratedAt).getTime()) / 60000))}m ago`
    : 'Never';

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <h3 className="font-semibold text-slate-200">PlotTwist Autopilot</h3>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
          {status.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Last Story Generated</p>
          <p className="text-sm font-medium text-slate-300 mt-0.5">{timeAgo}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Generated</p>
          <p className="text-sm font-medium text-slate-300 mt-0.5">{status.totalAutonomousStories} stories</p>
        </div>
        <div className="col-span-2 pt-2 border-t border-slate-800/60">
          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="text-purple-400">⚡</span> Scheduled Schedule: {status.schedule}
          </p>
        </div>
      </div>
    </div>
  );
};
