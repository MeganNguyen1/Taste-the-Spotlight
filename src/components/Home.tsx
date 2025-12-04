import { useState } from 'react';
import { Search, ChefHat } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'browse', searchQuery?: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('browse', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="pt-8 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChefHat className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                  StarPlate
                </span>
              </div>
              <button
                onClick={() => onNavigate('browse')}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Browse All
              </button>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-4xl w-full text-center space-y-12">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                  <span className="block text-white mb-2">Taste the</span>
                  <span className="block bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent">
                    Spotlight
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Step behind the velvet rope and discover the signature dishes of your favorite stars.
                  From Oscar winners to Grammy legends, explore the recipes that fuel greatness and
                  bring a taste of Hollywood glamour to your kitchen.
                </p>
              </div>

              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative flex items-center bg-zinc-900 rounded-full border border-zinc-800 focus-within:border-red-600 transition-colors">
                    <Search className="w-6 h-6 text-gray-400 ml-6" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for your favorite celebrity..."
                      className="flex-1 bg-transparent px-6 py-5 text-white placeholder-gray-500 outline-none text-lg"
                    />
                  </div>
                </div>
              </form>

              <button
                onClick={() => onNavigate('browse')}
                className="group relative inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full transition-all group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-600/50"></div>
                <span className="relative">Explore Celebrity Recipes</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <div className="pt-8 flex items-center justify-center space-x-8 text-center">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-400">Celebrities</div>
                </div>
                <div className="h-12 w-px bg-zinc-800"></div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-400">Recipes</div>
                </div>
                <div className="h-12 w-px bg-zinc-800"></div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Authentic</div>
                </div>
              </div>
            </div>
          </main>

          <footer className="py-8 text-center text-gray-500 text-sm">
            <p>Bringing star power to your kitchen</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
