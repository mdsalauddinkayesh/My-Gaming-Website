import React from 'react';
import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { retroAudio } from '../utils/audio';

interface TrendingGamesProps {
  games: Game[];
  onPlay: (game: Game) => void;
  onViewAll: () => void;
}

export const TrendingGames: React.FC<TrendingGamesProps> = ({ games, onPlay, onViewAll }) => {
  return (
    <section id="trending" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Trending Games
            </h2>
          </div>

          <button
            onClick={() => {
              retroAudio.playSelect();
              onViewAll();
            }}
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <span>View All</span>
            <span>→</span>
          </button>
        </div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onPlay={onPlay} />
          ))}
        </div>
      </div>
    </section>
  );
};
