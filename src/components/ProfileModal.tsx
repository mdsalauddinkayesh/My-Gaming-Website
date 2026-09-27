import React from 'react';
import { X, Award, Flame, Gamepad2, Shield, Heart } from 'lucide-react';
import { Game } from '../types/game';
import { retroAudio } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayGame: (game: Game) => void;
  recentGames: Game[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onPlayGame,
  recentGames
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#12122a] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232348] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-purple-600/30">
              🎮
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Player Profile</h3>
              <p className="text-xs text-purple-400 font-mono">GamerTag: PixelChampion#2026</p>
            </div>
          </div>

          <button
            onClick={() => {
              retroAudio.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#1e1e3e] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#181836] p-3 rounded-xl border border-[#27274f]">
            <p className="text-xs text-gray-400">Games Played</p>
            <p className="text-lg font-extrabold text-white mt-0.5">24</p>
          </div>
          <div className="bg-[#181836] p-3 rounded-xl border border-[#27274f]">
            <p className="text-xs text-gray-400">High Score</p>
            <p className="text-lg font-extrabold text-purple-400 mt-0.5">14,850</p>
          </div>
          <div className="bg-[#181836] p-3 rounded-xl border border-[#27274f]">
            <p className="text-xs text-gray-400">Arcade Rank</p>
            <p className="text-lg font-extrabold text-amber-400 mt-0.5">Gold II</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Arcade Achievements
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 bg-[#181836] rounded-lg border border-purple-500/20">
              <span className="text-base">🚀</span>
              <div>
                <p className="font-bold text-white">Ace Pilot</p>
                <p className="text-[10px] text-gray-400">Score 5,000+ in Shooter</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-[#181836] rounded-lg border border-purple-500/20">
              <span className="text-base">🏎️</span>
              <div>
                <p className="font-bold text-white">Speed Demon</p>
                <p className="text-[10px] text-gray-400">No crash for 60s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jump In */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            Jump Back In
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {recentGames.slice(0, 2).map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  retroAudio.playCoin();
                  onClose();
                  onPlayGame(g);
                }}
                className="flex items-center gap-2 p-2 bg-[#181836] hover:bg-purple-950/40 border border-[#27274f] hover:border-purple-500/40 rounded-lg text-left transition-colors cursor-pointer"
              >
                <img src={g.image} alt={g.title} className="w-10 h-7 object-cover rounded" />
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">{g.title}</p>
                  <p className="text-[10px] text-purple-400">▶ Play</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-gray-500 border-t border-[#1e1e3e]">
          Free guest session active • All progress saved locally
        </div>
      </div>
    </div>
  );
};
