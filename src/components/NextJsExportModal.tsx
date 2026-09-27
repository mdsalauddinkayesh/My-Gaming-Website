import React, { useState } from 'react';
import { NEXTJS_SNIPPETS } from '../data/emulator';
import { X, Copy, Check, FileCode, Terminal, Download, Sparkles, BookOpen } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface NextJsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NextJsExportModal: React.FC<NextJsExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSnippet = NEXTJS_SNIPPETS[activeTab];

  const handleCopy = () => {
    retroAudio.playCoin();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f0f24] border-2 border-purple-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 flex flex-col">
        {/* Header */}
        <div className="bg-[#171736] border-b border-[#26264d] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                  Next.js + EmulatorJS Integration
                </h3>
                <span className="text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full uppercase">
                  App Router Ready
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Directly copy-paste these production-ready files into your Next.js project
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              retroAudio.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#25254a] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#12122a] border-b border-[#24244a] px-5 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {NEXTJS_SNIPPETS.map((snippet, idx) => (
            <button
              key={snippet.filename}
              onClick={() => {
                retroAudio.playSelect();
                setActiveTab(idx);
                setCopied(false);
              }}
              className={`px-3.5 py-2 rounded-t-lg text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer border-t border-x ${
                activeTab === idx
                  ? 'bg-[#0a0a18] text-purple-300 border-[#38386a] border-b-transparent shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 border-transparent hover:bg-[#1a1a38]'
              }`}
            >
              {snippet.filename}
            </button>
          ))}
        </div>

        {/* Snippet Info Bar */}
        <div className="bg-[#0e0e20] px-5 py-2.5 border-b border-[#1c1c38] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            <strong className="text-white font-semibold">{currentSnippet.title}:</strong> {currentSnippet.description}
          </p>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 bg-[#070714] p-4 overflow-auto font-mono text-xs text-purple-100 leading-relaxed selection:bg-purple-700 selection:text-white">
          <pre className="whitespace-pre">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>

        {/* Footer Quick Steps */}
        <div className="bg-[#12122a] border-t border-[#232348] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>
              Quick Setup: Run <code className="text-purple-300 bg-[#1c1c38] px-1.5 py-0.5 rounded">npx create-next-app@latest my-arcade</code> and paste these files.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                retroAudio.playSelect();
                onClose();
              }}
              className="px-4 py-1.5 bg-[#202042] hover:bg-[#282855] text-gray-200 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
