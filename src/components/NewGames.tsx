import React from 'react';
import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { retroAudio } from '../utils/audio';

interface NewGamesProps {
  games: Game[];
  onPlay: (game: Game) => void;
  onViewAll: () => void;
}

export const NewGames: React.FC<NewGamesProps> = ({ games, onPlay, onViewAll }) => {
  return (
    <section id="new-games" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with "NEW" magenta badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            {/* Pink / Magenta "NEW" badge */}
            <span className="px-2 py-0.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-[11px] rounded-md tracking-wider shadow-sm shadow-pink-600/40">
              NEW
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              New Games
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
