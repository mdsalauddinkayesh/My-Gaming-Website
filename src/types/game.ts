export interface ConsoleSystem {
  id: string; // 'gba' | 'snes' | 'nes' | 'segaMD' | 'gb' | 'gbc' | 'n64' | 'psx' | 'arcade'
  name: string;
  shortName: string;
  core: string;
  coreName: string;
  company: string;
  year: number;
  color: string;
  badgeBg: string;
  icon: string;
  supportedExtensions: string[];
  gamesCount: number;
  description: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  category: 'arcade' | 'racing' | 'adventure' | 'fighting' | 'puzzle' | 'rpg' | 'shooter' | 'platformer' | 'simulation';
  system: string; // e.g. 'gba', 'snes', 'nes', 'segaMD', 'n64', 'psx', 'gbc'
  core: string;   // EmulatorJS core identifier
  rating: number;
  plays?: string;
  image: string;
  badge?: string;
  isNew?: boolean;
  isTrending?: boolean;
  description: string;
  controls?: string;
  romUrl?: string; // Built-in or external ROM URL for EmulatorJS
  fileSize?: string;
  year?: number;
  players?: number;
  savesSupported?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}

export interface NextJsSnippet {
  title: string;
  filename: string;
  language: string;
  code: string;
  description: string;
}
