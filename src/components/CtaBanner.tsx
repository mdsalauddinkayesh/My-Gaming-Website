import React from 'react';
import { Play } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface CtaBannerProps {
  onStartPlaying: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartPlaying }) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#201547] via-[#24134a] to-[#1c123d] border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-950/40">
          {/* Left: Device Icons & Text */}
          <div className="flex items-center gap-6">
            {/* Monitor + Tablet + Phone vector outline icons */}
            <div className="hidden sm:flex items-end gap-1.5 text-purple-400 p-2 rounded-xl bg-purple-950/50 border border-purple-500/20">
              {/* Desktop Monitor */}
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              {/* Tablet */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current stroke-2">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
              </svg>
              {/* Phone */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
              </svg>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Play Anywhere
              </h3>
              <p className="text-purple-200/80 text-sm sm:text-base">
                Phone, tablet or PC — no download required.
              </p>
            </div>
          </div>

          {/* Right: Start Playing Button */}
          <button
            onClick={() => {
              retroAudio.playCoin();
              onStartPlaying();
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Playing</span>
          </button>
        </div>
      </div>
    </section>
  );
};
