import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, Volume2, VolumeX, FileCode2, Gamepad2 } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  onOpenProfile: () => void;
  onOpenNextJsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
  onOpenProfile,
  onOpenNextJsModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(retroAudio.enabled);
  const [gamepadConnected, setGamepadConnected] = useState(false);

  useEffect(() => {
    const handleGamepadConnected = () => setGamepadConnected(true);
    const handleGamepadDisconnected = () => setGamepadConnected(false);

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Initial check
    if (typeof navigator !== 'undefined' && navigator.getGamepads) {
      const pads = navigator.getGamepads();
      if (pads && pads.some(p => p !== null)) {
        setGamepadConnected(true);
      }
    }

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);

  const toggleSound = () => {
    retroAudio.enabled = !retroAudio.enabled;
    setSoundEnabled(retroAudio.enabled);
    if (retroAudio.enabled) {
      retroAudio.playCoin();
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'systems', label: 'Consoles' },
    { id: 'trending', label: 'Trending' },
    { id: 'categories', label: 'Categories' },
    { id: 'mods', label: 'Mods' },
    { id: 'about', label: 'About' },
  ];

  const handleLinkClick = (id: string) => {
    retroAudio.playSelect();
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a1a]/95 backdrop-blur-md border-b border-[#1f1f3d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Left: Pixel Art Controller Icon + Logo + EmulatorJS tag */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="RetroPlay Home"
          >
            {/* Pixel-art Game Controller Icon */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M5 6a3 3 0 00-3 3v6a3 3 0 003 3h2a3 3 0 002.83-2h2.34A3 3 0 0015 18h2a3 3 0 003-3V9a3 3 0 00-3-3H5zm2 5h-1V9h2v2h1v2H9v2H7v-2H6v-2h1v-2zm10 2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm2-3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors leading-none">
                Retro<span className="text-purple-400">Play</span>
              </span>
              <span className="text-[9px] font-mono text-purple-400/80 tracking-wider">
                EMULATORJS PORTAL
              </span>
            </div>
          </button>

          {/* Center/Left Nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-semibold transition-all relative py-1 focus:outline-none cursor-pointer ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Next.js Code Button, Sound, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gamepad Status Pill */}
          {gamepadConnected && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-[11px] text-emerald-300">
              <Gamepad2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Gamepad Ready</span>
            </div>
          )}

          {/* Next.js Code Button */}
          <button
            onClick={() => {
              retroAudio.playSelect();
              onOpenNextJsModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#171736] hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <FileCode2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Next.js Code</span>
          </button>

          {/* Search Bar */}
          <div className="relative w-36 sm:w-48 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games or cores..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#12122a] border border-[#26264d] focus:border-purple-500 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Sound Synthesizer */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Retro Audio FX' : 'Enable Retro Audio FX'}
            aria-label="Toggle retro audio"
            className="p-2 rounded-xl bg-[#12122a] border border-[#26264d] text-gray-300 hover:text-purple-400 hover:border-purple-500/50 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-purple-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Circular Purple User Profile Button */}
          <button
            onClick={() => {
              retroAudio.playSelect();
              onOpenProfile();
            }}
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 flex items-center justify-center text-purple-300 hover:text-white transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#12122a] border border-[#26264d] text-gray-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d22] border-b border-[#25254a] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeNav === link.id
                  ? 'bg-purple-600/20 text-purple-300 border-l-4 border-purple-500'
                  : 'text-gray-300 hover:bg-[#1a1a36]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenNextJsModal();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/30 flex items-center gap-2"
          >
            <FileCode2 className="w-4 h-4 text-purple-400" />
            <span>Next.js Code Export & Docs</span>
          </button>
        </div>
      )}
    </header>
  );
};
