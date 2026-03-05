import { ChefHat, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Browse All', page: 'browse' },
    { name: 'About', page: 'about' },
    { name: 'Contact Us', page: 'contact' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <ChefHat className="w-7 h-7 text-red-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              StarPlate
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                  currentPage === item.page
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                  currentPage === item.page
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
