import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-md rounded-2xl border border-story-border bg-story-card p-6 shadow-2xl">
        <div className="flex items-center gap-3 text-amber-400 mb-3">
          <AlertCircle className="h-6 w-6 shrink-0" />
          <h3 id="confirm-modal-title" className="font-heading text-lg font-bold text-white">
            Leave this adventure?
          </h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Starting a new story will replace your active story progress.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Keep Playing
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-purple-500 hover:to-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Start New Story
          </button>
        </div>
      </div>
    </div>
  );
};
