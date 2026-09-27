import React from 'react';
import { ConsoleSystem } from '../types/game';
import { CONSOLE_SYSTEMS } from '../data/emulator';
import { retroAudio } from '../utils/audio';
import { Gamepad2, Tv, Cpu, Zap, BatteryCharging, Box, Disc, Sparkles } from 'lucide-react';

interface ConsoleSystemsBarProps {
  selectedSystem: string | null;
  onSelectSystem: (systemId: string | null) => void;
}

export const ConsoleSystemsBar: React.FC<ConsoleSystemsBarProps> = ({
  selectedSystem,
  onSelectSystem,
}) => {
  const getSystemIcon = (id: string) => {
    switch (id) {
      case 'gba':
        return <Gamepad2 className="w-5 h-5" />;
      case 'snes':
        return <Tv className="w-5 h-5" />;
      case 'nes':
        return <Cpu className="w-5 h-5" />;
      case 'segaMD':
        return <Zap className="w-5 h-5" />;
      case 'gbc':
        return <BatteryCharging className="w-5 h-5" />;
      case 'n64':
        return <Box className="w-5 h-5" />;
      case 'psx':
        return <Disc className="w-5 h-5" />;
      case 'arcade':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Gamepad2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="systems" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🕹️</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                EmulatorJS Supported Consoles
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a retro system to filter library or launch with official Libretro WASM cores
            </p>
          </div>

          {selectedSystem && (
            <button
              onClick={() => {
                retroAudio.playSelect();
                onSelectSystem(null);
              }}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold px-3 py-1.5 rounded-lg bg-[#181838] border border-purple-500/30 self-start sm:self-auto cursor-pointer"
            >
              Clear System Filter (Show All)
            </button>
          )}
        </div>

        {/* Horizontal scrollable console cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CONSOLE_SYSTEMS.map((sys) => {
            const isSelected = selectedSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => {
                  retroAudio.playSelect();
                  onSelectSystem(isSelected ? null : sys.id);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#231a4a] border-purple-400 ring-2 ring-purple-500/80 shadow-lg shadow-purple-900/50 scale-[1.03]'
                    : 'bg-[#12122a] border-[#222248] hover:border-purple-500/50 hover:bg-[#181836]'
                }`}
              >
                {/* Top: Icon + Core Pill */}
                <div className="flex items-center justify-between gap-1 w-full mb-2">
                  <div
                    className={`p-2 rounded-lg text-white transition-colors ${
                      isSelected ? 'bg-purple-600' : 'bg-[#1e1e40] group-hover:bg-purple-600/70'
                    }`}
                  >
                    {getSystemIcon(sys.id)}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-[#0d0d1e] px-1.5 py-0.5 rounded border border-[#232342] uppercase">
                    {sys.core}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm tracking-tight truncate group-hover:text-purple-300">
                    {sys.shortName}
                  </h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {sys.coreName.split('/')[0].trim()}
                  </p>
                </div>

                {/* Bottom stats */}
                <div className="mt-2 pt-2 border-t border-[#1d1d3a] flex items-center justify-between text-[10px] text-gray-500">
                  <span>{sys.year}</span>
                  <span className="text-purple-400 font-semibold">{sys.gamesCount}+</span>
                </div>

                {/* Active checkmark */}
                {isSelected && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
