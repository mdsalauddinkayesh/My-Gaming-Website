import React, { useRef, useState } from 'react';
import { Game } from '../types/game';
import { UploadCloud, FileCode2, Play, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface RomDropZoneProps {
  onLaunchRom: (game: Game) => void;
  onOpenNextJsModal: () => void;
}

export const RomDropZone: React.FC<RomDropZoneProps> = ({ onLaunchRom, onOpenNextJsModal }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);

  const detectCoreFromFileName = (fileName: string): { core: string; system: string; name: string } => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    let core = 'gba';
    let system = 'gba';

    if (ext === 'nes') {
      core = 'nes';
      system = 'nes';
    } else if (['sfc', 'smc'].includes(ext)) {
      core = 'snes';
      system = 'snes';
    } else if (['md', 'bin', 'gen', 'smd'].includes(ext)) {
      core = 'segaMD';
      system = 'segaMD';
    } else if (['gb', 'gbc'].includes(ext)) {
      core = 'gb';
      system = 'gbc';
    } else if (['z64', 'n64', 'v64'].includes(ext)) {
      core = 'n64';
      system = 'n64';
    } else if (['cue', 'iso', 'chd', 'pbp'].includes(ext)) {
      core = 'psx';
      system = 'psx';
    } else if (['zip', '7z'].includes(ext)) {
      core = 'arcade';
      system = 'arcade';
    }

    const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
    return { core, system, name: cleanName };
  };

  const handleProcessFile = (file: File) => {
    const { core, system, name } = detectCoreFromFileName(file.name);
    const blobUrl = URL.createObjectURL(file);
    const fileSizeFormatted = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

    setLastUploadedName(file.name);
    retroAudio.playCoin();

    const customGame: Game = {
      id: `custom-${Date.now()}`,
      title: name,
      genre: `${system.toUpperCase()} ROM • Custom File`,
      category: 'arcade',
      system,
      core,
      rating: 5.0,
      plays: 'Direct Launch',
      image: '',
      badge: 'CUSTOM ROM',
      description: `User-loaded ${file.name} (${fileSizeFormatted}) running natively on EmulatorJS ${core.toUpperCase()} WebAssembly core.`,
      controls: 'Full Gamepad, Keyboard & Touch Supported',
      romUrl: blobUrl,
      fileSize: fileSizeFormatted,
      year: new Date().getFullYear(),
      players: 2,
      savesSupported: true
    };

    onLaunchRom(customGame);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Drag & Drop ROM Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`lg:col-span-8 rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
              isDragging
                ? 'bg-purple-900/40 border-purple-400 scale-[1.01] shadow-2xl shadow-purple-600/40'
                : 'bg-[#101026] border-purple-500/40 hover:border-purple-400 hover:bg-[#141432]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".gba,.nes,.smc,.sfc,.md,.bin,.gen,.gb,.gbc,.z64,.n64,.zip"
              className="hidden"
            />

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 group-hover:scale-110 transition-transform shrink-0">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30">
                    Instant EmulatorJS Runner
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:inline">• Zero Upload to Server</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Drop Any Retro ROM Here to Play
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                  Drag and drop your own ROM file or click to browse. Automatically identifies core:
                  <span className="text-purple-300 font-mono ml-1 font-semibold">
                    .gba, .nes, .smc, .md, .gb, .z64, .zip
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/40 group-hover:shadow-pink-600/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Select ROM File</span>
              </button>
              <span className="text-[11px] text-gray-400">Runs locally via WebAssembly</span>
            </div>

            {/* Background subtle glow */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right: Next.js Direct Integration Widget */}
          <div className="lg:col-span-4 bg-[#12122a] border border-[#26264d] hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-500/30 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5" />
                  Next.js App Router
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Turnkey Ready
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Add to your Next.js Site
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Ready-to-copy <code className="text-purple-300 bg-[#1c1c38] px-1 py-0.5 rounded">page.tsx</code> and client component with clean WASM lifecycle management.
                </p>
              </div>

              <div className="p-3 bg-[#0a0a1a] rounded-xl border border-[#202042] text-[11px] font-mono text-gray-300 space-y-1">
                <p className="text-purple-400 font-semibold">// 1-Line Drop In:</p>
                <p className="truncate">&lt;EmulatorPlayer core=&quot;gba&quot; romUrl=&quot;...&quot; /&gt;</p>
              </div>
            </div>

            <button
              onClick={() => {
                retroAudio.playSelect();
                onOpenNextJsModal();
              }}
              className="w-full py-2.5 bg-[#1f1a44] hover:bg-purple-600 border border-purple-500/50 hover:border-purple-400 text-purple-200 hover:text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCode2 className="w-4 h-4" />
              <span>View Next.js Integration Code</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
