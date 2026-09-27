import React from 'react';
import { CATEGORIES } from '../data/games';
import { retroAudio } from '../utils/audio';

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onViewAllCategories: () => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAllCategories
}) => {
  const renderCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'joystick':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12 2a3 3 0 00-3 3c0 .87.38 1.66.98 2.21L9.1 13H8a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4h-1.1l-.88-5.79A3 3 0 0015 5a3 3 0 00-3-3zm0 2a1 1 0 110 2 1 1 0 010-2zm-1 5.09c.32.06.65.06.98 0l.73 4.91h-2.44l.73-4.91zM6 16c0-1.1.9-2 2-2h8a2 2 0 012 2v1H6v-1z" />
          </svg>
        );
      case 'car':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
            <circle cx="7.5" cy="14.5" r="1.5" />
            <circle cx="16.5" cy="14.5" r="1.5" />
          </svg>
        );
      case 'mountain':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2L6 9 1 19h22L14 6zm-3.7 7.2l1.6-2.13 3.65 4.87H7.72l2.58-2.74z" />
          </svg>
        );
      case 'fist':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M13 3a2 2 0 00-2 2v2H9a2 2 0 00-2 2v1H6a2 2 0 00-2 2v2a6 6 0 006 6h4a6 6 0 006-6v-5a2 2 0 00-2-2h-1V5a2 2 0 00-2-2h-2zm0 2h2v4h-2V5zm-2 2h1v4h-1V7zm-3 2h1v4H8V9zm-2 2h1v4H6v-2c0-.55.45-1 1-1zm10 2a1 1 0 011 1v4a4 4 0 01-4 4h-4a4 4 0 01-4-4v-1h10v-3a1 1 0 011-1z" />
          </svg>
        );
      case 'puzzle':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 00-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 000-5z" />
          </svg>
        );
      case 'hat':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12 2L4 16h16L12 2zm0 4.2l4.8 8.4H7.2L12 6.2zM2 19h20v2H2v-2z" />
            <polygon points="12,7 13.5,10 16.5,10.5 14.2,12.7 14.8,16 12,14.3 9.2,16 9.8,12.7 7.5,10.5 10.5,10" />
          </svg>
        );
      case 'rocket':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12 2.5s-5 3.5-5 9.5c0 2.5 1 4.5 2 5.5l-3 4 3-1 2 2 4-3c1 1 3 2 5.5 2 6 0 9.5-5 9.5-5s-3-2-3.5-7.5c-.5-5.5-6-6.5-6-6.5zm-1 9a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        );
      case 'bricks':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-9 2h4v3h-4V6zM5 6h3v3H5V6zm0 5h6v3H5v-3zm8 0h6v3h-6v-3zm6 5h-4v2h4v-2zm-6 2h-4v-2h4v2zm-6 0H5v-2h2v2zm12-9h-2V6h2v3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="categories" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Browse by Category
            </h2>
          </div>

          <button
            onClick={() => {
              retroAudio.playSelect();
              onViewAllCategories();
            }}
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <span>View All Categories</span>
            <span>→</span>
          </button>
        </div>

        {/* 8 Colorful Square Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  retroAudio.playSelect();
                  onSelectCategory(cat.id);
                }}
                className={`${cat.bgColor} ${cat.hoverColor} rounded-xl p-4 flex flex-col items-center justify-center aspect-square text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer focus:outline-none relative group ${
                  isSelected ? 'ring-4 ring-white shadow-2xl scale-105' : ''
                }`}
              >
                <div className="text-white group-hover:scale-110 transition-transform duration-200 mb-2">
                  {renderCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                  {cat.name}
                </span>

                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-purple-900 rounded-full flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
