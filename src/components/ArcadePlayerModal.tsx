import React, { useEffect, useRef, useState } from 'react';
import { Game } from '../types/game';
import {
  X,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Star,
  Gamepad2,
  Cpu,
  Upload,
  Info,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { retroAudio } from '../utils/audio';

declare global {
  interface Window {
    EJS_player?: string;
    EJS_core?: string;
    EJS_gameName?: string;
    EJS_gameUrl?: string;
    EJS_pathtodata?: string;
    EJS_color?: string;
    EJS_startOnLoaded?: boolean;
    EJS_volume?: number;
  }
}

interface ArcadePlayerModalProps {
  game: Game | null;
  onClose: () => void;
  onRomDrop?: (file: File) => void;
}

export const ArcadePlayerModal: React.FC<ArcadePlayerModalProps> = ({
  game,
  onClose,
  onRomDrop
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const emulatorContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeCore, setActiveCore] = useState<string>(game?.core || 'gba');
  const [useEmulatorJsEngine, setUseEmulatorJsEngine] = useState<boolean>(
    Boolean(game?.romUrl)
  );
  const [ejsLoading, setEjsLoading] = useState<boolean>(false);
  const [ejsError, setEjsError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem(`hs_${game?.id}`) || '1500');
  });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(retroAudio.enabled);
  const [showControlsGuide, setShowControlsGuide] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Sync core when game changes
  useEffect(() => {
    if (game) {
      setActiveCore(game.core || 'gba');
      setUseEmulatorJsEngine(Boolean(game.romUrl));
    }
  }, [game]);

  // EMULATORJS SCRIPT LOADER EFFECT
  useEffect(() => {
    if (!game || !useEmulatorJsEngine || !game.romUrl) return;

    setEjsLoading(true);
    setEjsError(null);

    // Setup globals
    window.EJS_player = '#emulatorjs-mount-point';
    window.EJS_core = activeCore;
    window.EJS_gameName = game.title;
    window.EJS_gameUrl = game.romUrl;
    window.EJS_color = '#7c3aed';
    window.EJS_startOnLoaded = true;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';

    // Load loader script
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.async = true;
    script.id = 'modal-ejs-loader';

    script.onload = () => {
      setEjsLoading(false);
    };

    script.onerror = () => {
      setEjsLoading(false);
      setEjsError('Could not load EmulatorJS CDN. Falling back to built-in arcade engine.');
      setUseEmulatorJsEngine(false);
    };

    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById('modal-ejs-loader');
      if (existing) existing.remove();

      delete window.EJS_player;
      delete window.EJS_core;
      delete window.EJS_gameName;
      delete window.EJS_gameUrl;

      if (emulatorContainerRef.current) {
        emulatorContainerRef.current.innerHTML = '';
      }
    };
  }, [game, useEmulatorJsEngine, activeCore]);

  // FALLBACK ARCADE ENGINE (Runs smoothly when EmulatorJS is not active or for instant arcade games)
  useEffect(() => {
    if (!game || useEmulatorJsEngine) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let localScore = 0;
    let isTerminated = false;

    // Keys state
    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // GAME ENGINES
    if (game.id === 'space-defender' || game.system === 'nes') {
      let shipX = canvas.width / 2;
      const lasers: { x: number; y: number; vy: number }[] = [];
      const aliens: { x: number; y: number; vx: number; color: string; alive: boolean }[] = [];
      const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
      let lastShot = 0;

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 7; c++) {
          aliens.push({
            x: 60 + c * 60,
            y: 40 + r * 35,
            vx: 1.2,
            color: r === 0 ? '#ec4899' : r === 1 ? '#a855f7' : '#38bdf8',
            alive: true
          });
        }
      }

      const loop = () => {
        if (isTerminated) return;
        ctx.fillStyle = '#070714';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Stars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 30; i++) {
          const sx = (i * 73 + Date.now() * 0.05) % canvas.width;
          const sy = (i * 97) % canvas.height;
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Move ship
        if (keys['ArrowLeft'] || keys['KeyA']) shipX = Math.max(30, shipX - 5);
        if (keys['ArrowRight'] || keys['KeyD']) shipX = Math.min(canvas.width - 30, shipX + 5);

        // Shoot laser
        if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && Date.now() - lastShot > 240) {
          lasers.push({ x: shipX, y: canvas.height - 45, vy: -7 });
          lastShot = Date.now();
          retroAudio.playLaser();
        }

        // Draw Player Ship
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(shipX, canvas.height - 50);
        ctx.lineTo(shipX - 18, canvas.height - 25);
        ctx.lineTo(shipX + 18, canvas.height - 25);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(shipX - 3, canvas.height - 42, 6, 10);

        // Lasers
        for (let i = lasers.length - 1; i >= 0; i--) {
          const l = lasers[i];
          l.y += l.vy;
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(l.x - 2, l.y, 4, 12);

          for (const alien of aliens) {
            if (alien.alive && Math.abs(l.x - alien.x) < 20 && Math.abs(l.y - alien.y) < 15) {
              alien.alive = false;
              lasers.splice(i, 1);
              localScore += 100;
              setScore(localScore);
              retroAudio.playExplosion();
              for (let p = 0; p < 8; p++) {
                particles.push({
                  x: alien.x,
                  y: alien.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 20,
                  color: alien.color
                });
              }
              break;
            }
          }
          if (l.y < 0) lasers.splice(i, 1);
        }

        // Aliens
        let edgeHit = false;
        for (const alien of aliens) {
          if (!alien.alive) continue;
          alien.x += alien.vx;
          if (alien.x < 30 || alien.x > canvas.width - 30) edgeHit = true;

          ctx.fillStyle = alien.color;
          ctx.fillRect(alien.x - 12, alien.y - 10, 24, 18);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(alien.x - 6, alien.y - 4, 4, 4);
          ctx.fillRect(alien.x + 2, alien.y - 4, 4, 4);
        }

        if (edgeHit) {
          for (const alien of aliens) {
            alien.vx = -alien.vx;
            alien.y += 10;
            if (alien.alive && alien.y > canvas.height - 60) {
              setGameOver(true);
            }
          }
        }

        if (aliens.every((a) => !a.alive)) {
          aliens.forEach((a, idx) => {
            a.alive = true;
            a.x = 60 + (idx % 7) * 60;
            a.y = 40 + Math.floor(idx / 7) * 35;
          });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 3, 3);
          if (p.life <= 0) particles.splice(i, 1);
        }

        animationFrameId = requestAnimationFrame(loop);
      };
      animationFrameId = requestAnimationFrame(loop);
    } else {
      // General retro arcade engine
      let heroX = canvas.width / 2;
      let heroY = canvas.height - 80;
      let roadOffset = 0;

      const loop = () => {
        if (isTerminated) return;
        roadOffset = (roadOffset + 5) % 40;

        ctx.fillStyle = '#0f0e26';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid scanlines
        ctx.strokeStyle = '#1e1c4a';
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        if (keys['ArrowLeft'] || keys['KeyA']) heroX = Math.max(50, heroX - 4);
        if (keys['ArrowRight'] || keys['KeyD']) heroX = Math.min(canvas.width - 50, heroX + 4);
        if (keys['ArrowUp'] || keys['KeyW']) heroY = Math.max(50, heroY - 4);
        if (keys['ArrowDown'] || keys['KeyS']) heroY = Math.min(canvas.height - 50, heroY + 4);

        // Hero sprite
        ctx.fillStyle = '#7c3aed';
        ctx.fillRect(heroX - 16, heroY - 20, 32, 40);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(heroX - 8, heroY - 12, 16, 12);

        if (keys['Space']) {
          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(heroX, heroY, 32, 0, Math.PI * 2);
          ctx.fill();
        }

        localScore += 1;
        setScore(localScore);

        animationFrameId = requestAnimationFrame(loop);
      };
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      isTerminated = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [game, useEmulatorJsEngine]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      if (game) {
        localStorage.setItem(`hs_${game.id}`, String(score));
      }
    }
  }, [score, highScore, game]);

  if (!game) return null;

  const toggleSound = () => {
    retroAudio.enabled = !retroAudio.enabled;
    setSoundEnabled(retroAudio.enabled);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    retroAudio.playSelect();
  };

  const handleFullscreenToggle = () => {
    const modalEl = document.getElementById('arcade-modal-root');
    if (!document.fullscreenElement) {
      modalEl?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleCustomRomSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      game.romUrl = blobUrl;
      setUseEmulatorJsEngine(true);
      retroAudio.playCoin();
    }
  };

  return (
    <div
      id="arcade-modal-root"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-5 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-[#0f0f26] border-2 border-purple-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 flex flex-col max-h-[95vh]">
        {/* Top Bar */}
        <div className="bg-[#181836] border-b border-[#292955] px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          {/* Game Title & Core Badge */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight truncate max-w-[200px] sm:max-w-xs">
              {game.title}
            </h3>

            {/* Core Pill */}
            <span className="text-[11px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" />
              {activeCore.toUpperCase()} CORE
            </span>

            {game.romUrl && (
              <span className="hidden md:inline text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                ROM LOADED
              </span>
            )}
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Core Engine Switcher */}
            <select
              value={activeCore}
              onChange={(e) => {
                setActiveCore(e.target.value);
                retroAudio.playSelect();
              }}
              className="bg-[#24244c] border border-[#3b3b75] text-purple-200 text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer hidden sm:block"
            >
              <option value="gba">mGBA (GBA)</option>
              <option value="snes">Snes9x (SNES)</option>
              <option value="nes">FCEUmm (NES)</option>
              <option value="segaMD">Genesis Plus (MD)</option>
              <option value="gb">Gambatte (GB/GBC)</option>
              <option value="n64">Mupen64Plus (N64)</option>
              <option value="psx">Beetle (PS1)</option>
            </select>

            {/* Controls Mapping Guide */}
            <button
              onClick={() => setShowControlsGuide(!showControlsGuide)}
              title="Keyboard & Controller Mapping"
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                showControlsGuide
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-[#25254a] border-[#363666] text-gray-300 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
            </button>

            {/* Load ROM directly */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Load custom ROM file into emulator"
              className="p-1.5 rounded-lg bg-[#25254a] border border-[#363666] text-gray-300 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCustomRomSelect}
                accept=".gba,.nes,.smc,.sfc,.md,.bin,.gen,.gb,.gbc,.z64"
                className="hidden"
              />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-[#25254a] border border-[#363666] text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-purple-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreenToggle}
              className="p-1.5 rounded-lg bg-[#25254a] border border-[#363666] text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls Guide Popover Banner */}
        {showControlsGuide && (
          <div className="bg-[#141432] border-b border-purple-500/30 px-5 py-3 text-xs text-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in duration-150">
            <div>
              <span className="font-bold text-purple-400">D-Pad:</span> Arrow Keys / WASD
            </div>
            <div>
              <span className="font-bold text-purple-400">Buttons A / B:</span> X / Z (or K / J)
            </div>
            <div>
              <span className="font-bold text-purple-400">Start / Select:</span> Enter / Shift
            </div>
            <div>
              <span className="font-bold text-purple-400">Shoulders L / R:</span> Q / E
            </div>
          </div>
        )}

        {/* Main Display Area */}
        <div className="relative bg-[#070714] flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[440px] p-2 overflow-hidden">
          {useEmulatorJsEngine && game.romUrl ? (
            /* Official EmulatorJS Mount Container */
            <div className="w-full h-full min-h-[420px] relative flex flex-col">
              {ejsLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070714]/90 space-y-3">
                  <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-purple-300">
                    Initializing Libretro WASM ({activeCore.toUpperCase()})...
                  </p>
                </div>
              )}
              <div
                id="emulatorjs-mount-point"
                ref={emulatorContainerRef}
                className="w-full flex-1 min-h-[420px]"
              />
            </div>
          ) : (
            /* Responsive Retro Simulation Canvas Engine */
            <div className="relative w-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={640}
                height={360}
                className="w-full max-w-[640px] aspect-[16/9] rounded-lg shadow-inner border border-purple-500/20 pixelated bg-black"
              />

              {/* Game Over Screen */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-4 text-center p-4">
                  <h4 className="text-3xl font-extrabold text-rose-500 tracking-wider">
                    GAME OVER
                  </h4>
                  <p className="text-gray-300">
                    Score: <span className="text-purple-400 font-bold">{score}</span>
                  </p>
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Cabinet Bar */}
        <div className="bg-[#12122a] border-t border-[#25254a] px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-purple-300 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Save States & Cloud Saves Ready
            </span>
            <span className="text-gray-500">•</span>
            <span>Size: {game.fileSize || '1.8 MB'}</span>
            <span className="text-gray-500">•</span>
            <span>Year: {game.year || 1995}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              {game.rating.toFixed(1)}
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">Powered by EmulatorJS WebAssembly</span>
          </div>
        </div>
      </div>
    </div>
  );
};
