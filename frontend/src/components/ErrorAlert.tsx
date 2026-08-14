import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorAlertProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, message, onRetry }) => {
  return (
    <div
      role="alert"
      className="my-6 rounded-xl border border-rose-500/40 bg-rose-950/20 p-5 sm:p-6 text-left shadow-lg backdrop-blur-md animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-900/40 text-rose-400 border border-rose-500/30">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <h4 className="text-base font-semibold text-rose-200">{title}</h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">{message}</p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
