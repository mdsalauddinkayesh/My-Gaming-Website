import React from 'react';
import { Game } from '../types/game';
import { Play, Star, Cpu } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    retroAudio.playCoin();
    onPlay(game);
  };

  const getSystemBadgeColor = (system?: string) => {
    switch (system?.toLowerCase()) {
      case 'gba':
        return 'bg-indigo-600/90 text-indigo-100 border-indigo-400/40';
      case 'snes':
        return 'bg-purple-600/90 text-purple-100 border-purple-400/40';
      case 'nes':
        return 'bg-rose-600/90 text-rose-100 border-rose-400/40';
      case 'segamd':
        return 'bg-blue-600/90 text-blue-100 border-blue-400/40';
      case 'gbc':
      case 'gb':
        return 'bg-teal-600/90 text-teal-100 border-teal-400/40';
      case 'psx':
        return 'bg-sky-600/90 text-sky-100 border-sky-400/40';
      case 'n64':
        return 'bg-amber-600/90 text-amber-100 border-amber-400/40';
      case 'arcade':
        return 'bg-pink-600/90 text-pink-100 border-pink-400/40';
      default:
        return 'bg-purple-600/90 text-purple-100 border-purple-400/40';
    }
  };

  return (
    <div
      onClick={() => onPlay(game)}
      className="group bg-[#12122a] border border-[#232345] hover:border-purple-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/30 cursor-pointer"
    >
      <div>
        {/* 16:9 Thumbnail Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0d0d1e]">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pixelated"
            referrerPolicy="no-referrer"
          />

          {/* System Badge on top-left of thumbnail */}
          <div className="absolute top-2 left-2">
            <span
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-md border uppercase ${getSystemBadgeColor(
                game.system
              )}`}
            >
              {game.system ? game.system.toUpperCase() : 'RETRO'}
            </span>
          </div>

          {/* Quick Play overlay button on image hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 space-y-1">
          <h3 className="font-bold text-white text-base tracking-tight truncate group-hover:text-purple-300 transition-colors">
            {game.title}
          </h3>
          <p className="text-xs text-gray-400 font-medium truncate">
            {game.genre}
          </p>
        </div>
      </div>

      {/* Card Footer: Rating & Play Button */}
      <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
          <span>{game.rating.toFixed(1)}</span>
        </div>

        <button
          onClick={handlePlayClick}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-95 transition-all cursor-pointer"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>Play</span>
        </button>
      </div>
    </div>
  );
};
