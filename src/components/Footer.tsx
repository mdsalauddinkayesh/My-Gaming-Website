import React from 'react';
import { retroAudio } from '../utils/audio';

interface FooterProps {
  onLinkClick: (link: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const footerLinks = ['About', 'Contact', 'Terms', 'Privacy', 'Game Licenses'];

  return (
    <footer className="mt-12 bg-[#090918] border-t border-[#1a1a36] pt-10 pb-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + "RetroPlay" */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-purple-600/30">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M5 6a3 3 0 00-3 3v6a3 3 0 003 3h2a3 3 0 002.83-2h2.34A3 3 0 0015 18h2a3 3 0 003-3V9a3 3 0 00-3-3H5zm2 5h-1V9h2v2h1v2H9v2H7v-2H6v-2h1v-2zm10 2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm2-3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Retro<span className="text-purple-400">Play</span>
            </span>
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            {footerLinks.map((link) => (
              <button
                key={link}
                onClick={() => {
                  retroAudio.playSelect();
                  onLinkClick(link);
                }}
                className="hover:text-purple-300 transition-colors cursor-pointer focus:outline-none"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right: Social Icons (Discord, YouTube, X, Facebook, Instagram) */}
          <div className="flex items-center gap-4 text-gray-400">
            {/* Discord */}
            <a
              href="#discord"
              onClick={(e) => {
                e.preventDefault();
                retroAudio.playSelect();
              }}
              title="Discord"
              aria-label="Discord"
              className="p-2 rounded-lg bg-[#14142e] border border-[#25254a] hover:text-white hover:border-purple-500/50 hover:bg-[#1f1f42] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#youtube"
              onClick={(e) => {
                e.preventDefault();
                retroAudio.playSelect();
              }}
              title="YouTube"
              aria-label="YouTube"
              className="p-2 rounded-lg bg-[#14142e] border border-[#25254a] hover:text-white hover:border-purple-500/50 hover:bg-[#1f1f42] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X */}
            <a
              href="#x"
              onClick={(e) => {
                e.preventDefault();
                retroAudio.playSelect();
              }}
              title="X"
              aria-label="X"
              className="p-2 rounded-lg bg-[#14142e] border border-[#25254a] hover:text-white hover:border-purple-500/50 hover:bg-[#1f1f42] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#facebook"
              onClick={(e) => {
                e.preventDefault();
                retroAudio.playSelect();
              }}
              title="Facebook"
              aria-label="Facebook"
              className="p-2 rounded-lg bg-[#14142e] border border-[#25254a] hover:text-white hover:border-purple-500/50 hover:bg-[#1f1f42] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h4.819l-.777 3.667h-4.042v7.98z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#instagram"
              onClick={(e) => {
                e.preventDefault();
                retroAudio.playSelect();
              }}
              title="Instagram"
              aria-label="Instagram"
              className="p-2 rounded-lg bg-[#14142e] border border-[#25254a] hover:text-white hover:border-purple-500/50 hover:bg-[#1f1f42] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#181830] text-center text-xs text-gray-500">
          <p>© 2026 RetroPlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
