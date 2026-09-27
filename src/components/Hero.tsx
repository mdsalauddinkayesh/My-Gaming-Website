import React from 'react';
import { heroImage } from '../data/games';
import { retroAudio } from '../utils/audio';
import { FileCode2, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onBrowseGames: () => void;
  onTrendingGames: () => void;
  onOpenNextJsModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowseGames,
  onTrendingGames,
  onOpenNextJsModal
}) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Small purple label with EmulatorJS badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-purple-400 uppercase">
                WELCOME TO RETROPLAY
              </span>
              <span className="text-[10px] font-mono font-bold bg-gradient-to-r from-purple-900 to-pink-900 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-pink-400" />
                POWERED BY EMULATORJS
              </span>
            </div>

            {/* Large bold headline, two lines */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="block text-white">PLAY CLASSIC GAMES</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                RIGHT IN YOUR BROWSER.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Discover retro, indie and classic-style games that you can play online for free.
              Powered by high-performance Libretro WebAssembly cores. No downloads, no registration — just pure gaming fun!
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-300">
              <span className="px-2.5 py-1 bg-[#14142e] rounded-lg border border-[#25254a] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                8 Classic Systems
              </span>
              <span className="px-2.5 py-1 bg-[#14142e] rounded-lg border border-[#25254a] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                Save & Load States
              </span>
              <span className="px-2.5 py-1 bg-[#14142e] rounded-lg border border-[#25254a] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                USB / Bluetooth Gamepad
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Solid Purple Button */}
              <button
                onClick={() => {
                  retroAudio.playCoin();
                  onBrowseGames();
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>🎮</span>
                <span>Browse Games</span>
              </button>

              {/* Outlined Button */}
              <button
                onClick={() => {
                  retroAudio.playSelect();
                  onTrendingGames();
                }}
                className="px-6 py-3.5 bg-[#12122a] border border-[#2e2e5c] hover:border-purple-500/60 hover:bg-[#181836] text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>🔥</span>
                <span>Trending Games</span>
              </button>

              {/* Next.js Code Export Button */}
              <button
                onClick={() => {
                  retroAudio.playSelect();
                  onOpenNextJsModal();
                }}
                className="px-4 py-3.5 bg-[#181233] border border-purple-500/40 hover:border-purple-400 hover:bg-purple-950/40 text-purple-300 hover:text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
              >
                <FileCode2 className="w-4 h-4 text-purple-400" />
                <span>Next.js Code</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Artwork */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-950/70 group">
              <img
                src={heroImage}
                alt="RetroPlay classic games arcade city illustration with sunset and hooded gamer"
                className="w-full h-auto aspect-[16/10] object-cover pixelated transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Pixel Art "GOOD GAME" arcade sign overlay on top-right */}
              <div className="absolute top-4 right-4 bg-gradient-to-b from-teal-500 to-cyan-700 p-2 rounded-lg border-2 border-cyan-300 shadow-lg shadow-cyan-900/60 flex flex-col items-center justify-center rotate-2">
                <span className="font-pixel text-[10px] text-yellow-300 tracking-wider font-bold">GOOD</span>
                <span className="font-pixel text-[10px] text-white tracking-wider font-bold">GAME</span>
              </div>

              {/* Subtle bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
