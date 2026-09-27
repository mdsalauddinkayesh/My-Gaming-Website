import React from 'react';
import { dungeonQuestImage } from '../data/games';
import { Game } from '../types/game';
import { Play, Star, Compass, Shield } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface GameOfTheWeekProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameOfTheWeek: React.FC<GameOfTheWeekProps> = ({ game, onPlay }) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#171738] via-[#1a1742] to-[#12122a] border border-purple-500/20 shadow-2xl shadow-purple-950/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            {/* Left: Pixel Art Castle/Knight Illustration */}
            <div className="md:col-span-5 lg:col-span-5 h-64 md:h-full min-h-[260px] relative overflow-hidden">
              <img
                src={dungeonQuestImage}
                alt="Dungeon Quest Game of the Week"
                className="w-full h-full object-cover pixelated"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#171738]/90 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171738] via-transparent to-transparent md:hidden" />
            </div>

            {/* Right: Info & Play Button */}
            <div className="md:col-span-7 lg:col-span-7 p-6 sm:p-8 space-y-4">
              {/* Gold "👑 Game of the Week" label */}
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span>👑</span>
                <span>Game of the Week</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {game.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {game.description}
              </p>

              {/* Tags & Rating */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 pt-1">
                <span className="flex items-center gap-1 bg-[#23234d] px-2.5 py-1 rounded-md text-purple-300 border border-purple-500/30">
                  <Shield className="w-3.5 h-3.5" />
                  RPG
                </span>
                <span className="flex items-center gap-1 bg-[#23234d] px-2.5 py-1 rounded-md text-emerald-300 border border-emerald-500/30">
                  <Compass className="w-3.5 h-3.5" />
                  Adventure
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 stroke-none" />
                  <span className="font-bold text-white text-sm">{game.rating.toFixed(1)}</span>
                </span>
              </div>

              {/* Purple "▶ Play Now" button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    retroAudio.playCoin();
                    onPlay(game);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
