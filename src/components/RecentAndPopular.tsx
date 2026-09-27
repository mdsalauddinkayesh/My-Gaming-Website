import React from 'react';
import { Game } from '../types/game';
import { Clock, Flame, Star, Play } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface RecentAndPopularProps {
  recentGames: Game[];
  popularGames: Game[];
  onPlay: (game: Game) => void;
  onViewAllRecent: () => void;
  onViewAllPopular: () => void;
}

export const RecentAndPopular: React.FC<RecentAndPopularProps> = ({
  recentGames,
  popularGames,
  onPlay,
  onViewAllRecent,
  onViewAllPopular,
}) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Recently Played */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Recently Played
                </h3>
              </div>
              <button
                onClick={() => {
                  retroAudio.playSelect();
                  onViewAllRecent();
                }}
                className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentGames.map((game) => (
                <div
                  key={`recent-${game.id}`}
                  onClick={() => onPlay(game)}
                  className="group bg-[#12122a] border border-[#232345] hover:border-purple-500/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0d0d1e]">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover pixelated group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300">
                      {game.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">
                      {game.genre.split('•')[0].trim()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Most Popular */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-pink-500" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Most Popular
                </h3>
              </div>
              <button
                onClick={() => {
                  retroAudio.playSelect();
                  onViewAllPopular();
                }}
                className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {popularGames.map((game) => (
                <div
                  key={`popular-${game.id}`}
                  onClick={() => onPlay(game)}
                  className="group bg-[#12122a] border border-[#232345] hover:border-purple-500/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0d0d1e]">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover pixelated group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300">
                      {game.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                        {game.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span className="truncate">{game.plays || '10K plays'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
