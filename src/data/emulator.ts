import { ConsoleSystem, NextJsSnippet } from '../types/game';

export const CONSOLE_SYSTEMS: ConsoleSystem[] = [
  {
    id: 'gba',
    name: 'Game Boy Advance',
    shortName: 'GBA',
    core: 'gba',
    coreName: 'mGBA / VBA-M',
    company: 'Nintendo',
    year: 2001,
    color: 'from-purple-600 to-indigo-600',
    badgeBg: 'bg-indigo-600',
    icon: 'gamepad-2',
    supportedExtensions: ['.gba', '.bin', '.zip'],
    gamesCount: 1420,
    description: '32-bit handheld powerhouse with legendary JRPGs, action platformers, and arcade ports.'
  },
  {
    id: 'snes',
    name: 'Super Nintendo',
    shortName: 'SNES',
    core: 'snes',
    coreName: 'Snes9x',
    company: 'Nintendo',
    year: 1990,
    color: 'from-violet-600 to-purple-800',
    badgeBg: 'bg-purple-600',
    icon: 'tv',
    supportedExtensions: ['.sfc', '.smc', '.zip'],
    gamesCount: 1757,
    description: '16-bit perfection with Mode 7 graphics, timeless soundtracks, and iconic platformers.'
  },
  {
    id: 'nes',
    name: 'Nintendo Entertainment System',
    shortName: 'NES',
    core: 'nes',
    coreName: 'FCEUmm / Nestopia',
    company: 'Nintendo',
    year: 1983,
    color: 'from-red-600 to-rose-700',
    badgeBg: 'bg-rose-600',
    icon: 'cpu',
    supportedExtensions: ['.nes', '.zip'],
    gamesCount: 1438,
    description: 'The revolutionary 8-bit home console that revived the video game industry.'
  },
  {
    id: 'segaMD',
    name: 'Sega Genesis / Mega Drive',
    shortName: 'Genesis',
    core: 'segaMD',
    coreName: 'Genesis Plus GX',
    company: 'Sega',
    year: 1988,
    color: 'from-blue-600 to-cyan-700',
    badgeBg: 'bg-blue-600',
    icon: 'zap',
    supportedExtensions: ['.md', '.bin', '.smd', '.gen', '.zip'],
    gamesCount: 890,
    description: '16-bit blast processing, blazing speed, edgy action, and arcade beat-em-ups.'
  },
  {
    id: 'gbc',
    name: 'Game Boy / Color',
    shortName: 'GBC',
    core: 'gb',
    coreName: 'Gambatte',
    company: 'Nintendo',
    year: 1998,
    color: 'from-teal-600 to-emerald-600',
    badgeBg: 'bg-teal-600',
    icon: 'battery-charging',
    supportedExtensions: ['.gb', '.gbc', '.zip'],
    gamesCount: 920,
    description: 'Vibrant color pocket gaming that dominated the late 90s portable scene.'
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    shortName: 'N64',
    core: 'n64',
    coreName: 'Mupen64Plus-Next',
    company: 'Nintendo',
    year: 1996,
    color: 'from-amber-600 to-orange-600',
    badgeBg: 'bg-amber-600',
    icon: 'box',
    supportedExtensions: ['.z64', '.n64', '.v64', '.zip'],
    gamesCount: 388,
    description: 'Pioneered true 3D analog gaming, open-world platforming, and 4-player split-screen battles.'
  },
  {
    id: 'psx',
    name: 'Sony PlayStation 1',
    shortName: 'PS1',
    core: 'psx',
    coreName: 'Beetle PSX / PCSX ReARMed',
    company: 'Sony',
    year: 1994,
    color: 'from-sky-600 to-blue-700',
    badgeBg: 'bg-sky-600',
    icon: 'disc',
    supportedExtensions: ['.chd', '.cue', '.bin', '.pbp', '.iso'],
    gamesCount: 1850,
    description: 'CD-ROM cinematic gaming revolution featuring 3D polygons, FMVs, and iconic franchises.'
  },
  {
    id: 'arcade',
    name: 'Arcade Classics (MAME)',
    shortName: 'Arcade',
    core: 'arcade',
    coreName: 'FinalBurn Neo (FBNeo)',
    company: 'Coin-Op Arcade',
    year: 1985,
    color: 'from-pink-600 to-rose-600',
    badgeBg: 'bg-pink-600',
    icon: 'joystick',
    supportedExtensions: ['.zip', '.7z'],
    gamesCount: 2400,
    description: 'Golden age quarter-munchers, high-speed shoot-em-ups, and legendary coin-op machines.'
  }
];

export const NEXTJS_SNIPPETS: NextJsSnippet[] = [
  {
    title: 'EmulatorJS Client Component',
    filename: 'components/EmulatorPlayer.tsx',
    language: 'tsx',
    description: 'React/Next.js client component that safely mounts EmulatorJS into the DOM, manages WASM data loading, handles cleanup on unmount, and provides audio/fullscreen controls.',
    code: `'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EmulatorPlayerProps {
  core: string;       // e.g. 'gba', 'snes', 'nes', 'segaMD', 'n64', 'psx', 'gb'
  romUrl: string;     // URL to the ROM file or Blob URL
  gameName: string;
  onClose?: () => void;
  pathtodata?: string; // default: 'https://cdn.emulatorjs.org/stable/data/'
}

declare global {
  interface Window {
    EJS_player?: string;
    EJS_core?: string;
    EJS_gameName?: string;
    EJS_gameUrl?: string;
    EJS_pathtodata?: string;
    EJS_color?: string;
    EJS_startOnLoaded?: boolean;
    EJS_fullscreenOnLoad?: boolean;
    EJS_volume?: number;
    EJS_DEBUG_XX?: boolean;
  }
}

export default function EmulatorPlayer({
  core,
  romUrl,
  gameName,
  onClose,
  pathtodata = 'https://cdn.emulatorjs.org/stable/data/',
}: EmulatorPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Configure EmulatorJS global parameters before loading script
    window.EJS_player = '#emulator-container';
    window.EJS_core = core;
    window.EJS_gameName = gameName;
    window.EJS_gameUrl = romUrl;
    window.EJS_color = '#7c3aed';
    window.EJS_startOnLoaded = true;
    window.EJS_pathtodata = pathtodata;

    // 2. Dynamically load the EmulatorJS loader.js script
    const script = document.createElement('script');
    script.src = \`\${pathtodata}loader.js\`;
    script.async = true;
    script.id = 'emulatorjs-loader-script';

    script.onload = () => {
      setLoading(false);
    };

    document.body.appendChild(script);

    // 3. Cleanup when component unmounts or game changes
    return () => {
      const existingScript = document.getElementById('emulatorjs-loader-script');
      if (existingScript) existingScript.remove();
      
      // Clean up globals
      delete window.EJS_player;
      delete window.EJS_core;
      delete window.EJS_gameName;
      delete window.EJS_gameUrl;
      
      // Clear container DOM
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [core, romUrl, gameName, pathtodata]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-black rounded-2xl overflow-hidden border border-purple-500/30 flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#12122a] border-b border-[#222248] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-bold text-white text-sm sm:text-base">{gameName}</h3>
          <span className="text-xs text-purple-400 font-mono uppercase bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
            {core.toUpperCase()} CORE
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Exit Game
          </button>
        )}
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#070714] text-purple-300 space-y-3">
          <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-sm font-medium">Booting EmulatorJS WASM Core...</p>
        </div>
      )}

      {/* Emulator Canvas / Iframe mount target */}
      <div className="flex-1 w-full relative">
        <div id="emulator-container" ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}`
  },
  {
    title: 'Next.js 14/15 App Router Page',
    filename: 'app/page.tsx',
    language: 'tsx',
    description: 'Complete Next.js App Router homepage with ROM drag-and-drop, console selector, game cards, and instant EmulatorJS launch modal.',
    code: `'use client';

import React, { useState } from 'react';
import EmulatorPlayer from '@/components/EmulatorPlayer';

interface RetroGame {
  id: string;
  title: string;
  system: string;
  core: string;
  romUrl: string;
  image: string;
  genre: string;
}

const FEATURED_GAMES: RetroGame[] = [
  {
    id: 'anguna-gba',
    title: 'Anguna: Warriors of Demis',
    system: 'GBA',
    core: 'gba',
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/anguna.gba',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    genre: 'Action RPG'
  },
  {
    id: 'blade-buster-nes',
    title: 'Blade Buster',
    system: 'NES',
    core: 'nes',
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/blade_buster.nes',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    genre: 'Vertical Shmup'
  },
  {
    id: 'super-boss-snes',
    title: 'Super Boss Gaiden',
    system: 'SNES',
    core: 'snes',
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/super_boss.smc',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    genre: 'Action Platformer'
  }
];

export default function HomePage() {
  const [activeGame, setActiveGame] = useState<RetroGame | null>(null);

  // Handle custom user ROM drop
  const handleCustomRomDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    let core = 'gba';
    if (ext === 'nes') core = 'nes';
    else if (['sfc', 'smc'].includes(ext || '')) core = 'snes';
    else if (['md', 'bin', 'gen'].includes(ext || '')) core = 'segaMD';
    else if (['gb', 'gbc'].includes(ext || '')) core = 'gb';
    else if (['z64', 'n64'].includes(ext || '')) core = 'n64';

    const blobUrl = URL.createObjectURL(file);
    setActiveGame({
      id: 'custom-' + Date.now(),
      title: file.name.replace(/\\.[^/.]+$/, ''),
      system: core.toUpperCase(),
      core,
      romUrl: blobUrl,
      image: '',
      genre: 'Custom ROM'
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-[#1f1f3d]">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            RetroPlay EmulatorJS
          </h1>
          <span className="text-xs bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/40">
            Next.js App Router Ready
          </span>
        </header>

        {/* ROM Drop Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleCustomRomDrop}
          className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 bg-[#12122a] rounded-2xl p-8 text-center cursor-pointer transition-colors"
        >
          <p className="text-lg font-bold text-purple-300">Drag & Drop any ROM here</p>
          <p className="text-xs text-gray-400 mt-1">Supports .gba, .nes, .smc, .sfc, .md, .gb, .z64</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FEATURED_GAMES.map((game) => (
            <div key={game.id} className="bg-[#12122a] rounded-xl p-4 border border-[#222248] space-y-3">
              <h3 className="font-bold text-white">{game.title}</h3>
              <p className="text-xs text-purple-400">{game.system} • {game.genre}</p>
              <button
                onClick={() => setActiveGame(game)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 font-bold rounded-lg transition-colors text-sm"
              >
                Launch EmulatorJS
              </button>
            </div>
          ))}
        </div>

        {/* Emulator Modal */}
        {activeGame && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl h-[650px]">
              <EmulatorPlayer
                core={activeGame.core}
                romUrl={activeGame.romUrl}
                gameName={activeGame.title}
                onClose={() => setActiveGame(null)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}`
  },
  {
    title: 'Next.js Configuration (next.config.mjs)',
    filename: 'next.config.mjs',
    language: 'javascript',
    description: 'Configures SharedArrayBuffer headers required for high-speed multi-threaded WebAssembly emulation in Next.js.',
    code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required headers for Libretro WebAssembly SharedArrayBuffer execution
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
        ],
      },
    ];
  },
};

export default nextConfig;`
  },
  {
    title: 'Self-Hosting EmulatorJS Assets Guide',
    filename: 'docs/EMULATORJS_SETUP.md',
    language: 'markdown',
    description: 'Instructions to self-host data files in your Next.js public/ folder vs using the official high-speed CDN.',
    code: `# EmulatorJS with Next.js Integration Guide

## Option 1: Official CDN (Recommended & Fastest)
By default, the \`components/EmulatorPlayer.tsx\` uses:
\`\`\`js
pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
\`\`\`
No downloads or extra files needed in your repo!

## Option 2: Self-Hosting in Next.js \`/public\` directory
If you want to host all WASM cores locally:
1. Download the EmulatorJS release from https://github.com/emulator-js/emulator-js/releases
2. Unpack the \`data\` folder into \`public/emulatorjs/data/\`
3. Update your component:
\`\`\`tsx
<EmulatorPlayer
  core="gba"
  romUrl="/roms/pokemon.gba"
  gameName="Pokemon Emerald"
  pathtodata="/emulatorjs/data/"
/>
\`\`\`

## Supported Cores:
- **gba**: Game Boy Advance (mGBA)
- **snes**: Super Nintendo (Snes9x)
- **nes**: Nintendo Entertainment System (FCEUmm)
- **segaMD**: Sega Genesis / Mega Drive (Genesis Plus GX)
- **gb**: Game Boy / Game Boy Color (Gambatte)
- **n64**: Nintendo 64 (Mupen64Plus)
- **psx**: PlayStation 1 (Beetle PSX)
- **arcade**: MAME / Arcade (FBNeo)`
  }
];
