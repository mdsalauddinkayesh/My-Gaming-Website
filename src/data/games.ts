import { Game, Category } from '../types/game';

// Generated image assets
import heroImage from '../assets/images/hero_retro_sunset_city_1790481072255.jpg';
import dungeonQuestImage from '../assets/images/game_dungeon_quest_knight_1790481084537.jpg';
import pixelRacerImage from '../assets/images/thumb_pixel_racer_1790481097928.jpg';
import retroFighterImage from '../assets/images/thumb_retro_fighter_1790481112773.jpg';
import spaceDefenderImage from '../assets/images/thumb_space_defender_1790481125795.jpg';

export { heroImage, dungeonQuestImage };

// Pixel art SVG assets for matching game aesthetics
export const SVG_THUMBNAILS = {
  superPlatformer: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="70%" stop-color="#7dd3fc"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#sky)"/>
      <!-- Pixel Clouds -->
      <path d="M40 30 h40 v10 h-10 v10 h-40 v-10 h10 z M180 20 h50 v10 h-10 v10 h-50 v-10 h10 z" fill="#ffffff" opacity="0.9"/>
      <!-- Background hills -->
      <path d="M-20 140 Q 60 80, 140 140 T 300 140 T 360 140 L 360 180 L -20 180 Z" fill="#22c55e" opacity="0.8"/>
      <!-- Bricks / Platforms -->
      <g fill="#b45309">
        <rect x="60" y="90" width="24" height="24" rx="2" stroke="#78350f" stroke-width="2"/>
        <rect x="84" y="90" width="24" height="24" rx="2" stroke="#78350f" stroke-width="2" fill="#f59e0b"/>
        <text x="96" y="107" font-family="monospace" font-size="14" font-weight="bold" fill="#78350f" text-anchor="middle">?</text>
        <rect x="108" y="90" width="24" height="24" rx="2" stroke="#78350f" stroke-width="2"/>
        <rect x="180" y="70" width="24" height="24" rx="2" stroke="#78350f" stroke-width="2"/>
        <rect x="204" y="70" width="24" height="24" rx="2" stroke="#78350f" stroke-width="2"/>
      </g>
      <!-- Ground -->
      <rect x="0" y="140" width="320" height="40" fill="#15803d"/>
      <rect x="0" y="148" width="320" height="32" fill="#854d0e"/>
      <!-- Platformer Hero Character -->
      <g transform="translate(140, 112)">
        <!-- Cap -->
        <rect x="4" y="0" width="16" height="6" fill="#ef4444"/>
        <rect x="6" y="2" width="16" height="4" fill="#ef4444"/>
        <!-- Face -->
        <rect x="6" y="6" width="12" height="8" fill="#fed7aa"/>
        <rect x="14" y="8" width="2" height="3" fill="#0f172a"/>
        <!-- Mustache -->
        <rect x="10" y="11" width="8" height="3" fill="#78350f"/>
        <!-- Dungarees & Shirt -->
        <rect x="4" y="14" width="16" height="8" fill="#2563eb"/>
        <rect x="2" y="14" width="4" height="6" fill="#ef4444"/>
        <rect x="18" y="14" width="4" height="6" fill="#ef4444"/>
        <!-- Shoes -->
        <rect x="2" y="22" width="7" height="6" fill="#78350f"/>
        <rect x="15" y="22" width="7" height="6" fill="#78350f"/>
      </g>
      <!-- Little Mushroom enemy -->
      <g transform="translate(250, 122)">
        <rect x="2" y="0" width="14" height="10" rx="3" fill="#854d0e"/>
        <circle cx="5" cy="5" r="1.5" fill="#fef08a"/>
        <circle cx="12" cy="5" r="1.5" fill="#fef08a"/>
        <rect x="4" y="10" width="10" height="8" fill="#fef08a"/>
        <rect x="3" y="16" width="12" height="2" fill="#1e293b"/>
      </g>
    </svg>
  `)}`,
  blockPuzzle: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <rect width="320" height="180" fill="#0b0f19"/>
      <!-- Grid Lines -->
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="0.8"/>
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#grid)"/>
      <!-- Neon Blocks -->
      <!-- T-Piece Purple -->
      <g stroke="#ffffff" stroke-width="1" stroke-opacity="0.3">
        <rect x="40" y="80" width="20" height="20" fill="#10b981" rx="2"/>
        <rect x="40" y="100" width="20" height="20" fill="#10b981" rx="2"/>
        <rect x="60" y="100" width="20" height="20" fill="#10b981" rx="2"/>
        <rect x="60" y="120" width="20" height="20" fill="#10b981" rx="2"/>
        <!-- Cyan Line -->
        <rect x="100" y="40" width="20" height="20" fill="#06b6d4" rx="2"/>
        <rect x="100" y="60" width="20" height="20" fill="#06b6d4" rx="2"/>
        <rect x="100" y="80" width="20" height="20" fill="#06b6d4" rx="2"/>
        <rect x="100" y="100" width="20" height="20" fill="#06b6d4" rx="2"/>
        <!-- Magenta T -->
        <rect x="160" y="60" width="20" height="20" fill="#ec4899" rx="2"/>
        <rect x="140" y="80" width="20" height="20" fill="#ec4899" rx="2"/>
        <rect x="160" y="80" width="20" height="20" fill="#ec4899" rx="2"/>
        <rect x="180" y="80" width="20" height="20" fill="#ec4899" rx="2"/>
        <!-- Orange L -->
        <rect x="220" y="80" width="20" height="20" fill="#f97316" rx="2"/>
        <rect x="220" y="100" width="20" height="20" fill="#f97316" rx="2"/>
        <rect x="220" y="120" width="20" height="20" fill="#f97316" rx="2"/>
        <rect x="240" y="120" width="20" height="20" fill="#f97316" rx="2"/>
        <!-- Yellow Box -->
        <rect x="160" y="120" width="20" height="20" fill="#eab308" rx="2"/>
        <rect x="180" y="120" width="20" height="20" fill="#eab308" rx="2"/>
        <rect x="160" y="140" width="20" height="20" fill="#eab308" rx="2"/>
        <rect x="180" y="140" width="20" height="20" fill="#eab308" rx="2"/>
        <!-- Blue Bottom Row -->
        <rect x="80" y="140" width="20" height="20" fill="#3b82f6" rx="2"/>
        <rect x="100" y="140" width="20" height="20" fill="#3b82f6" rx="2"/>
        <rect x="120" y="140" width="20" height="20" fill="#3b82f6" rx="2"/>
        <rect x="140" y="140" width="20" height="20" fill="#3b82f6" rx="2"/>
        <rect x="200" y="140" width="20" height="20" fill="#10b981" rx="2"/>
        <rect x="220" y="140" width="20" height="20" fill="#10b981" rx="2"/>
        <rect x="240" y="140" width="20" height="20" fill="#ec4899" rx="2"/>
      </g>
    </svg>
  `)}`,
  racingDrift: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <defs>
        <linearGradient id="driftSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#driftSky)"/>
      <!-- Track curve -->
      <path d="M 0 90 Q 160 80, 320 100 L 320 180 L 0 180 Z" fill="#1e293b"/>
      <!-- Curbs -->
      <path d="M 0 95 Q 160 85, 320 105" stroke="#ef4444" stroke-width="4" stroke-dasharray="10 10"/>
      <!-- Drift smoke -->
      <circle cx="90" cy="145" r="18" fill="#e2e8f0" opacity="0.3"/>
      <circle cx="110" cy="140" r="14" fill="#e2e8f0" opacity="0.4"/>
      <circle cx="70" cy="148" r="12" fill="#e2e8f0" opacity="0.2"/>
      <!-- Blue Sports Car Drifting -->
      <g transform="translate(90, 85) rotate(-12)">
        <!-- Shadow -->
        <ellipse cx="65" cy="50" rx="60" ry="12" fill="#000000" opacity="0.6"/>
        <!-- Body -->
        <path d="M 10 32 C 15 20, 35 15, 60 15 C 85 15, 110 22, 120 32 L 125 42 L 5 42 Z" fill="#2563eb"/>
        <!-- Windshield -->
        <path d="M 30 28 C 40 18, 70 18, 90 28 Z" fill="#60a5fa" opacity="0.8"/>
        <!-- Spoiler -->
        <rect x="0" y="16" width="10" height="18" fill="#1d4ed8"/>
        <!-- Wheels -->
        <circle cx="28" cy="42" r="11" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
        <circle cx="102" cy="42" r="11" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
        <circle cx="28" cy="42" r="5" fill="#e2e8f0"/>
        <circle cx="102" cy="42" r="5" fill="#e2e8f0"/>
        <!-- Headlights -->
        <path d="M 120 34 L 124 38 L 118 39 Z" fill="#fef08a"/>
      </g>
    </svg>
  `)}`,
  bubbleShooter: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <defs>
        <radialGradient id="bubPurple" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#d8b4fe"/>
          <stop offset="60%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#581c87"/>
        </radialGradient>
        <radialGradient id="bubCyan" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#a5f3fc"/>
          <stop offset="60%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#164e63"/>
        </radialGradient>
        <radialGradient id="bubAmber" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="60%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#713f12"/>
        </radialGradient>
        <radialGradient id="bubPink" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fbcfe8"/>
          <stop offset="60%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#831843"/>
        </radialGradient>
        <radialGradient id="bubGreen" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#bbf7d0"/>
          <stop offset="60%" stop-color="#22c55e"/>
          <stop offset="100%" stop-color="#14532d"/>
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#111827"/>
      <!-- Bubble Rows -->
      <!-- Row 1 -->
      <circle cx="30" cy="22" r="16" fill="url(#bubPurple)"/>
      <circle cx="62" cy="22" r="16" fill="url(#bubCyan)"/>
      <circle cx="94" cy="22" r="16" fill="url(#bubCyan)"/>
      <circle cx="126" cy="22" r="16" fill="url(#bubPink)"/>
      <circle cx="158" cy="22" r="16" fill="url(#bubGreen)"/>
      <circle cx="190" cy="22" r="16" fill="url(#bubGreen)"/>
      <circle cx="222" cy="22" r="16" fill="url(#bubAmber)"/>
      <circle cx="254" cy="22" r="16" fill="url(#bubPurple)"/>
      <circle cx="286" cy="22" r="16" fill="url(#bubCyan)"/>
      <!-- Row 2 -->
      <circle cx="46" cy="50" r="16" fill="url(#bubPurple)"/>
      <circle cx="78" cy="50" r="16" fill="url(#bubCyan)"/>
      <circle cx="110" cy="50" r="16" fill="url(#bubPink)"/>
      <circle cx="142" cy="50" r="16" fill="url(#bubPink)"/>
      <circle cx="174" cy="50" r="16" fill="url(#bubGreen)"/>
      <circle cx="206" cy="50" r="16" fill="url(#bubAmber)"/>
      <circle cx="238" cy="50" r="16" fill="url(#bubAmber)"/>
      <circle cx="270" cy="50" r="16" fill="url(#bubPurple)"/>
      <!-- Row 3 -->
      <circle cx="62" cy="78" r="16" fill="url(#bubCyan)"/>
      <circle cx="94" cy="78" r="16" fill="url(#bubPink)"/>
      <circle cx="126" cy="78" r="16" fill="url(#bubGreen)"/>
      <circle cx="158" cy="78" r="16" fill="url(#bubAmber)"/>
      <circle cx="190" cy="78" r="16" fill="url(#bubAmber)"/>
      <circle cx="222" cy="78" r="16" fill="url(#bubPurple)"/>
      <circle cx="254" cy="78" r="16" fill="url(#bubCyan)"/>
      <!-- Cannon Arrow pointing up -->
      <g transform="translate(160, 160)">
        <circle cx="0" cy="0" r="22" fill="#374151" stroke="#9ca3af" stroke-width="2"/>
        <path d="M 0 -12 L 0 -45" stroke="#f59e0b" stroke-width="4" stroke-dasharray="4 4"/>
        <circle cx="0" cy="-35" r="14" fill="url(#bubPink)"/>
      </g>
    </svg>
  `)}`,
  stickmanWarriors: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <defs>
        <radialGradient id="spark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="60%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#090d16"/>
      <line x1="0" y1="145" x2="320" y2="145" stroke="#334155" stroke-width="3"/>
      <!-- Clash energy explosion -->
      <circle cx="160" cy="95" r="45" fill="url(#spark)" opacity="0.6"/>
      <!-- Energy sparks -->
      <line x1="160" y1="95" x2="185" y2="70" stroke="#7dd3fc" stroke-width="2"/>
      <line x1="160" y1="95" x2="135" y2="65" stroke="#7dd3fc" stroke-width="2"/>
      <line x1="160" y1="95" x2="160" y2="60" stroke="#bae6fd" stroke-width="3"/>
      <!-- Fighter 1 (Left, Cyan Energy) -->
      <g stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none">
        <!-- Head -->
        <circle cx="110" cy="75" r="10" fill="#ffffff"/>
        <!-- Spine -->
        <line x1="110" y1="85" x2="118" y2="115"/>
        <!-- Arms striking -->
        <line x1="112" y1="92" x2="140" y2="88"/>
        <line x1="140" y1="88" x2="160" y2="95"/>
        <!-- Back arm -->
        <line x1="112" y1="92" x2="95" y2="105"/>
        <!-- Legs in dynamic kick -->
        <line x1="118" y1="115" x2="100" y2="145"/>
        <line x1="118" y1="115" x2="135" y2="135"/>
        <line x1="135" y1="135" x2="145" y2="145"/>
      </g>
      <!-- Fighter 2 (Right, Red Aura) -->
      <g stroke="#ef4444" stroke-width="4" stroke-linecap="round" fill="none">
        <circle cx="210" cy="75" r="10" fill="#ef4444"/>
        <line x1="210" y1="85" x2="202" y2="115"/>
        <line x1="208" y1="92" x2="180" y2="92"/>
        <line x1="180" y1="92" x2="160" y2="95"/>
        <line x1="208" y1="92" x2="225" y2="105"/>
        <line x1="202" y1="115" x2="220" y2="145"/>
        <line x1="202" y1="115" x2="185" y2="135"/>
        <line x1="185" y1="135" x2="175" y2="145"/>
      </g>
    </svg>
  `)}`,
  farmFrenzy: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
      <defs>
        <linearGradient id="farmSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#86efac"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#farmSky)"/>
      <!-- Sun -->
      <circle cx="280" cy="40" r="22" fill="#facc15"/>
      <!-- Distant Hills -->
      <path d="M-20 110 Q 70 80, 160 110 T 340 100 L 340 180 L -20 180 Z" fill="#22c55e"/>
      <path d="M-10 130 Q 110 110, 220 130 T 340 125 L 340 180 L -10 180 Z" fill="#16a34a"/>
      <!-- Red Barn on right -->
      <g transform="translate(220, 75)">
        <polygon points="40,0 10,25 70,25" fill="#dc2626"/>
        <rect x="15" y="25" width="50" height="40" fill="#b91c1c"/>
        <rect x="30" y="40" width="20" height="25" fill="#7f1d1d"/>
        <line x1="30" y1="40" x2="50" y2="65" stroke="#ffffff" stroke-width="2"/>
        <line x1="50" y1="40" x2="30" y2="65" stroke="#ffffff" stroke-width="2"/>
      </g>
      <!-- Pixel Cow Center Left -->
      <g transform="translate(100, 95)">
        <!-- Body -->
        <rect x="10" y="10" width="48" height="26" rx="4" fill="#ffffff"/>
        <!-- Spots -->
        <ellipse cx="22" cy="18" rx="7" ry="5" fill="#1e293b"/>
        <ellipse cx="42" cy="22" rx="8" ry="6" fill="#1e293b"/>
        <!-- Legs -->
        <rect x="14" y="36" width="6" height="14" fill="#ffffff"/>
        <rect x="14" y="46" width="6" height="4" fill="#1e293b"/>
        <rect x="24" y="36" width="6" height="14" fill="#ffffff"/>
        <rect x="24" y="46" width="6" height="4" fill="#1e293b"/>
        <rect x="40" y="36" width="6" height="14" fill="#ffffff"/>
        <rect x="40" y="46" width="6" height="4" fill="#1e293b"/>
        <rect x="48" y="36" width="6" height="14" fill="#ffffff"/>
        <rect x="48" y="46" width="6" height="4" fill="#1e293b"/>
        <!-- Head -->
        <rect x="0" y="2" width="18" height="20" rx="3" fill="#ffffff"/>
        <rect x="-3" y="12" width="14" height="10" rx="2" fill="#fbcfe8"/>
        <!-- Eyes & Horns -->
        <circle cx="6" cy="8" r="2" fill="#0f172a"/>
        <polygon points="12,2 15,-4 17,2" fill="#eab308"/>
        <polygon points="4,2 1,-4 -1,2" fill="#eab308"/>
      </g>
    </svg>
  `)}`
};

export const ALL_GAMES: Game[] = [
  // Trending Games
  {
    id: 'pixel-racer',
    title: 'Pixel Racer',
    genre: 'Racing • Arcade',
    category: 'racing',
    system: 'segaMD',
    core: 'segaMD',
    rating: 4.7,
    plays: '12.4K',
    image: pixelRacerImage,
    isTrending: true,
    description: 'High-octane retro highway racing! Weave through rush hour traffic, collect turbo canisters, and set top speed records.',
    controls: 'Arrow Keys or A/D to steer, Space for Turbo Boost',
    fileSize: '1.2 MB',
    year: 1993,
    players: 1,
    savesSupported: true
  },
  {
    id: 'retro-fighter',
    title: 'Retro Fighter',
    genre: 'Fighting • Arcade',
    category: 'fighting',
    system: 'arcade',
    core: 'arcade',
    rating: 4.5,
    plays: '10.2K',
    image: retroFighterImage,
    isTrending: true,
    description: 'Classic 16-bit arcade combat! Battle fierce rivals, unleash combo strikes, and become the champion of the streets.',
    controls: 'A/D to move, J to Punch, K to Kick, L to Block',
    fileSize: '3.4 MB',
    year: 1994,
    players: 2,
    savesSupported: true
  },
  {
    id: 'space-defender',
    title: 'Space Defender',
    genre: 'Shooter • Arcade',
    category: 'shooter',
    system: 'nes',
    core: 'nes',
    rating: 4.6,
    plays: '9.8K',
    image: spaceDefenderImage,
    isTrending: true,
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/blade_buster.nes',
    description: 'Earth is under alien siege. Pilot the prototype Starwing fighter, blast invading swarms, and protect our solar system!',
    controls: 'Arrow Keys to fly, Space or Click to fire photon lasers',
    fileSize: '512 KB',
    year: 1989,
    players: 1,
    savesSupported: true
  },
  {
    id: 'super-platformer',
    title: 'Super Platformer',
    genre: 'Platformer • Adventure',
    category: 'platformer',
    system: 'snes',
    core: 'snes',
    rating: 4.4,
    plays: '7.6K',
    image: SVG_THUMBNAILS.superPlatformer,
    isTrending: true,
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/super_boss.smc',
    description: 'Run, jump, and collect golden coins across perilous floating islands, mystery question blocks, and tricky foes.',
    controls: 'Left/Right arrows to run, Space or Up to jump',
    fileSize: '2.1 MB',
    year: 1991,
    players: 2,
    savesSupported: true
  },
  {
    id: 'block-puzzle',
    title: 'Block Puzzle',
    genre: 'Puzzle • Casual',
    category: 'puzzle',
    system: 'gbc',
    core: 'gb',
    rating: 4.3,
    plays: '8.7K',
    image: SVG_THUMBNAILS.blockPuzzle,
    isTrending: true,
    description: 'The addictive falling tetromino challenge. Fit geometric blocks together to clear horizontal rows and rack up massive combos.',
    controls: 'Left/Right to move, Up to rotate, Down to soft drop, Space to hard drop',
    fileSize: '256 KB',
    year: 1989,
    players: 1,
    savesSupported: true
  },

  // New Games
  {
    id: 'dungeon-quest',
    title: 'Dungeon Quest',
    genre: 'RPG • Adventure',
    category: 'rpg',
    system: 'gba',
    core: 'gba',
    rating: 4.5,
    plays: '14.1K',
    image: dungeonQuestImage,
    isNew: true,
    romUrl: 'https://raw.githubusercontent.com/emulator-js/emulator-js/master/docs/demo/anguna.gba',
    description: 'Embark on an epic adventure in Dungeon Quest! Fight monsters, collect treasures and become the ultimate hero in this action-packed RPG adventure.',
    controls: 'WASD / Arrow keys to explore, Space to strike with sword',
    fileSize: '4.8 MB',
    year: 2003,
    players: 1,
    savesSupported: true
  },
  {
    id: 'racing-drift',
    title: 'Racing Drift',
    genre: 'Racing • Arcade',
    category: 'racing',
    system: 'psx',
    core: 'psx',
    rating: 4.2,
    plays: '6.3K',
    image: SVG_THUMBNAILS.racingDrift,
    isNew: true,
    description: 'Master the art of tight asphalt cornering and high-angle tire smoking drifts through illuminated night mountain passes.',
    controls: 'A/D to steer, Shift to trigger handbrake drift',
    fileSize: '8.5 MB',
    year: 1998,
    players: 2,
    savesSupported: true
  },
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    genre: 'Puzzle • Casual',
    category: 'puzzle',
    system: 'nes',
    core: 'nes',
    rating: 4.1,
    plays: '5.9K',
    image: SVG_THUMBNAILS.bubbleShooter,
    isNew: true,
    description: 'Aim your marble cannon, match 3 or more colored orbs, and pop the cascading ceiling before time runs out!',
    controls: 'Mouse to aim trajectory, Click to launch bubble',
    fileSize: '384 KB',
    year: 1990,
    players: 2,
    savesSupported: true
  },
  {
    id: 'stickman-warriors',
    title: 'Stickman Warriors',
    genre: 'Fighting • Action',
    category: 'fighting',
    system: 'segaMD',
    core: 'segaMD',
    rating: 4.3,
    plays: '8.2K',
    image: SVG_THUMBNAILS.stickmanWarriors,
    isNew: true,
    description: 'High-speed martial arts duel with acrobatic kicks, counter parries, and spectacular ki blast explosions.',
    controls: 'A/D to move, J to punch, K to air kick, Space to dash',
    fileSize: '1.8 MB',
    year: 1995,
    players: 2,
    savesSupported: true
  },
  {
    id: 'farm-frenzy',
    title: 'Farm Frenzy',
    genre: 'Simulation • Casual',
    category: 'simulation',
    system: 'gba',
    core: 'gba',
    rating: 4.0,
    plays: '4.7K',
    image: SVG_THUMBNAILS.farmFrenzy,
    isNew: true,
    description: 'Cultivate pastures, feed happy dairy cows, collect fresh milk, and build the most prosperous countryside homestead.',
    controls: 'Click to plant clover, click cows to harvest',
    fileSize: '2.4 MB',
    year: 2004,
    players: 1,
    savesSupported: true
  }
];

export const CATEGORIES: Category[] = [
  { id: 'arcade', name: 'Arcade', icon: 'joystick', bgColor: 'bg-[#7c3aed]', hoverColor: 'hover:bg-[#6d28d9]' },
  { id: 'racing', name: 'Racing', icon: 'car', bgColor: 'bg-[#ef4444]', hoverColor: 'hover:bg-[#dc2626]' },
  { id: 'adventure', name: 'Adventure', icon: 'mountain', bgColor: 'bg-[#10b981]', hoverColor: 'hover:bg-[#059669]' },
  { id: 'fighting', name: 'Fighting', icon: 'fist', bgColor: 'bg-[#f97316]', hoverColor: 'hover:bg-[#ea580c]' },
  { id: 'puzzle', name: 'Puzzle', icon: 'puzzle', bgColor: 'bg-[#3b82f6]', hoverColor: 'hover:bg-[#2563eb]' },
  { id: 'rpg', name: 'RPG', icon: 'hat', bgColor: 'bg-[#8b5cf6]', hoverColor: 'hover:bg-[#7c3aed]' },
  { id: 'shooter', name: 'Shooter', icon: 'rocket', bgColor: 'bg-[#14b8a6]', hoverColor: 'hover:bg-[#0d9488]' },
  { id: 'platformer', name: 'Platformer', icon: 'bricks', bgColor: 'bg-[#ec4899]', hoverColor: 'hover:bg-[#db2777]' },
];

export const RECENTLY_PLAYED_IDS = ['pixel-racer', 'super-platformer', 'space-defender', 'block-puzzle'];
export const MOST_POPULAR_IDS = ['pixel-racer', 'retro-fighter', 'space-defender', 'block-puzzle'];
