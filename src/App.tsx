/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ALL_GAMES,
  RECENTLY_PLAYED_IDS,
  MOST_POPULAR_IDS
} from './data/games';
import { Game } from './types/game';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConsoleSystemsBar } from './components/ConsoleSystemsBar';
import { RomDropZone } from './components/RomDropZone';
import { TrendingGames } from './components/TrendingGames';
import { NewGames } from './components/NewGames';
import { Categories } from './components/Categories';
import { GameOfTheWeek } from './components/GameOfTheWeek';
import { RecentAndPopular } from './components/RecentAndPopular';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ArcadePlayerModal } from './components/ArcadePlayerModal';
import { NextJsExportModal } from './components/NextJsExportModal';
import { ProfileModal } from './components/ProfileModal';
import { InfoModal } from './components/InfoModal';
import { GameCard } from './components/GameCard';
import { X, Search, Sparkles } from 'lucide-react';
import { retroAudio } from './utils/audio';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nextJsModalOpen, setNextJsModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  // Trending & New lists
  const trendingGames = useMemo(() => ALL_GAMES.filter((g) => g.isTrending), []);
  const newGames = useMemo(() => ALL_GAMES.filter((g) => g.isNew), []);

  // Game of the week (Dungeon Quest)
  const gameOfTheWeek = useMemo(
    () => ALL_GAMES.find((g) => g.id === 'dungeon-quest') || ALL_GAMES[0],
    []
  );

  // Recently played & Most popular
  const recentlyPlayedGames = useMemo(
    () =>
      RECENTLY_PLAYED_IDS.map((id) => ALL_GAMES.find((g) => g.id === id)!).filter(Boolean),
    []
  );

  const mostPopularGames = useMemo(
    () =>
      MOST_POPULAR_IDS.map((id) => ALL_GAMES.find((g) => g.id === id)!).filter(Boolean),
    []
  );

  // Filtered games based on search, category, or selected system
  const filteredGames = useMemo(() => {
    let result = ALL_GAMES;
    if (selectedSystem) {
      result = result.filter(
        (g) => g.system === selectedSystem || g.core === selectedSystem
      );
    }
    if (selectedCategory) {
      result = result.filter((g) => g.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genre.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.system.toLowerCase().includes(q) ||
          g.core.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, selectedSystem, searchQuery]);

  const handlePlayGame = (game: Game) => {
    setActiveGame(game);
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'home') {
      setSelectedCategory(null);
      setSelectedSystem(null);
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'systems') {
      const elem = document.getElementById('systems');
      elem?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'trending') {
      const elem = document.getElementById('trending');
      elem?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'categories') {
      const elem = document.getElementById('categories');
      elem?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'mods') {
      setInfoModalType('mods');
    } else if (nav === 'about') {
      setInfoModalType('about');
    }
  };

  const handleSelectCategory = (catId: string) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catId);
      const elem = document.getElementById('filter-results');
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSystem = (systemId: string | null) => {
    setSelectedSystem(systemId);
    if (systemId) {
      const elem = document.getElementById('filter-results');
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllCategories = () => {
    setSelectedCategory(null);
    const elem = document.getElementById('categories');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrowseGames = () => {
    const elem = document.getElementById('systems');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTrendingGames = () => {
    const elem = document.getElementById('trending');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* 1. NAVBAR */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenNextJsModal={() => setNextJsModalOpen(true)}
      />

      <main className="flex-1">
        {/* Active Search / Category / System Filter Banner */}
        {(searchQuery.trim() || selectedCategory || selectedSystem) && (
          <section id="filter-results" className="py-8 bg-[#0d0d22] border-b border-[#25254a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">
                    {searchQuery.trim()
                      ? `Search: "${searchQuery}"`
                      : selectedSystem
                      ? `System: ${selectedSystem.toUpperCase()} Games`
                      : `Category: ${selectedCategory?.toUpperCase()}`}
                  </h2>
                  <span className="text-xs text-gray-400 bg-[#1e1e3e] px-2.5 py-0.5 rounded-full">
                    {filteredGames.length} games
                  </span>
                </div>

                <button
                  onClick={() => {
                    retroAudio.playSelect();
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedSystem(null);
                  }}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer self-start sm:self-auto"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
                  {filteredGames.map((game) => (
                    <GameCard key={`filtered-${game.id}`} game={game} onPlay={handlePlayGame} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#12122a] rounded-xl border border-[#232345] space-y-3">
                  <p className="text-gray-400">No games found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setSelectedSystem(null);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    View All Games
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 2. HERO SECTION */}
        <Hero
          onBrowseGames={handleBrowseGames}
          onTrendingGames={handleTrendingGames}
          onOpenNextJsModal={() => setNextJsModalOpen(true)}
        />

        {/* DRAG & DROP ROM RUNNER ZONE + NEXT.JS DIRECT INTEGRATION */}
        <RomDropZone
          onLaunchRom={handlePlayGame}
          onOpenNextJsModal={() => setNextJsModalOpen(true)}
        />

        {/* CONSOLE SYSTEMS BAR (EmulatorJS Libretro Cores) */}
        <ConsoleSystemsBar
          selectedSystem={selectedSystem}
          onSelectSystem={handleSelectSystem}
        />

        {/* 3. TRENDING GAMES SECTION */}
        <TrendingGames
          games={trendingGames}
          onPlay={handlePlayGame}
          onViewAll={handleTrendingGames}
        />

        {/* 4. NEW GAMES SECTION */}
        <NewGames
          games={newGames}
          onPlay={handlePlayGame}
          onViewAll={() => {
            const elem = document.getElementById('new-games');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. BROWSE BY CATEGORY SECTION */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onViewAllCategories={handleViewAllCategories}
        />

        {/* 6. GAME OF THE WEEK BANNER */}
        <GameOfTheWeek game={gameOfTheWeek} onPlay={handlePlayGame} />

        {/* 7. RECENTLY PLAYED + MOST POPULAR */}
        <RecentAndPopular
          recentGames={recentlyPlayedGames}
          popularGames={mostPopularGames}
          onPlay={handlePlayGame}
          onViewAllRecent={() => handlePlayGame(recentlyPlayedGames[0])}
          onViewAllPopular={() => handlePlayGame(mostPopularGames[0])}
        />

        {/* 8. CTA BANNER */}
        <CtaBanner onStartPlaying={() => handlePlayGame(trendingGames[0])} />
      </main>

      {/* 9. FOOTER */}
      <Footer onLinkClick={(link) => setInfoModalType(link)} />

      {/* EMULATORJS ARCADE PLAYER MODAL */}
      {activeGame && (
        <ArcadePlayerModal game={activeGame} onClose={() => setActiveGame(null)} />
      )}

      {/* NEXT.JS 1-CLICK INTEGRATION CODE MODAL */}
      <NextJsExportModal
        isOpen={nextJsModalOpen}
        onClose={() => setNextJsModalOpen(false)}
      />

      {/* PROFILE MODAL */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onPlayGame={handlePlayGame}
        recentGames={recentlyPlayedGames}
      />

      {/* INFO MODALS */}
      <InfoModal type={infoModalType} onClose={() => setInfoModalType(null)} />
    </div>
  );
}
