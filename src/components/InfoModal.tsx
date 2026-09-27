import React from 'react';
import { X, ShieldCheck, Mail, FileText, Info, Wrench } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface InfoModalProps {
  type: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type.toLowerCase()) {
      case 'about':
        return {
          title: 'About RetroPlay',
          icon: <Info className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                <strong>RetroPlay</strong> is a modern tribute to the golden era of arcade, 8-bit, and 16-bit
                gaming. We curate and engineer high-performance web titles that run natively inside any modern
                browser on mobile, tablet, or PC without any installation, registration, or paywalls.
              </p>
              <p>
                Built using state-of-the-art web canvas acceleration and Web Audio synthesis, every game is optimized
                for immediate responsive playback with zero friction.
              </p>
            </div>
          )
        };
      case 'contact':
        return {
          title: 'Contact RetroPlay Team',
          icon: <Mail className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300">
              <p>Have an indie retro game you'd like featured on RetroPlay? We love partnering with retro creators!</p>
              <div className="p-3 bg-[#181836] rounded-xl border border-[#27274f] space-y-1">
                <p className="text-xs text-gray-400">Developer Relations & Submissions</p>
                <p className="font-mono text-purple-300 text-sm">creators@retroplay.arcade</p>
              </div>
              <div className="p-3 bg-[#181836] rounded-xl border border-[#27274f] space-y-1">
                <p className="text-xs text-gray-400">Community Discord</p>
                <p className="font-mono text-purple-300 text-sm">discord.gg/retroplay-community</p>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Welcome to RetroPlay. By accessing our platform, you agree to enjoy games responsibly for personal,
                non-commercial entertainment.
              </p>
              <p>
                All games featured on RetroPlay are provided as-is without warranties. We do not require account
                creation or credit card credentials.
              </p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Your privacy is paramount. RetroPlay operates with a privacy-first architecture:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Zero mandatory user tracking or ad tracking cookies.</li>
                <li>Game scores and preferences are saved strictly in your browser's localStorage.</li>
                <li>No personal data is collected, sold, or shared with third parties.</li>
              </ul>
            </div>
          )
        };
      case 'game licenses':
        return {
          title: 'Game Licenses & Open Source',
          icon: <FileText className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                RetroPlay respects intellectual property rights. Original game concepts, artwork, and licensed
                retro sprites are used under permissive creative commons, developer agreements, or custom open-source
                licenses.
              </p>
              <p>
                If you are a copyright holder with questions regarding any game asset, please contact our rights desk
                at <span className="font-mono text-purple-400">licensing@retroplay.arcade</span>.
              </p>
            </div>
          )
        };
      case 'mods':
        return {
          title: 'Retro Mods & Community Cheats',
          icon: <Wrench className="w-5 h-5 text-purple-400" />,
          body: (
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                RetroPlay community mods allow custom color palettes, custom sprite packs, and infinite lives modes
                for supported games.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-[#181836] rounded-xl border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-xs">CRT Scanline Shader Mod</p>
                    <p className="text-[11px] text-gray-400">Emulates authentic 90s cathode ray tube curvature</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs font-semibold">Active</span>
                </div>
                <div className="p-3 bg-[#181836] rounded-xl border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-xs">Turbo Sound Synthesizer</p>
                    <p className="text-[11px] text-gray-400">Stereo FM synth expansion for 8-bit sound fx</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-600/30 text-emerald-300 rounded text-xs font-semibold">Active</span>
                </div>
              </div>
            </div>
          )
        };
      default:
        return {
          title: type,
          icon: <Info className="w-5 h-5 text-purple-400" />,
          body: <p className="text-sm text-gray-300">Information about {type}.</p>
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#12122a] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#232348] pb-3">
          <div className="flex items-center gap-2.5">
            {content.icon}
            <h3 className="text-lg font-bold text-white">{content.title}</h3>
          </div>
          <button
            onClick={() => {
              retroAudio.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#1e1e3e] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {content.body}

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              retroAudio.playSelect();
              onClose();
            }}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
