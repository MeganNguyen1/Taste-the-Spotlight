import { useState, useEffect } from 'react';
import { Search, Filter, ChefHat, Clock, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CelebrityWithRecipe } from '../lib/types';

interface BrowseProps {
  onNavigate: (page: 'home' | 'browse') => void;
  initialSearch?: string;
}

const CELEBRITY_TYPES = ['actor', 'athlete', 'singer', 'chef', 'band'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];
const DIETARY_TAGS = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein'];

export default function Browse({ onNavigate, initialSearch = '' }: BrowseProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [celebrities, setCelebrities] = useState<CelebrityWithRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('celebrities')
        .select(`
          *,
          recipes (*)
        `)
        .order('name');

      if (error) throw error;
      setCelebrities(data as CelebrityWithRecipe[]);
    } catch (error) {
      console.error('Error fetching celebrities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCelebrities = celebrities.filter((celebrity) => {
    const matchesSearch = searchQuery === '' ||
      celebrity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      celebrity.recipes.some(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedTypes.length === 0 ||
      selectedTypes.includes(celebrity.type);

    const matchesDifficulty = selectedDifficulty.length === 0 ||
      celebrity.recipes.some(r => selectedDifficulty.includes(r.difficulty));

    const matchesDietary = selectedDietary.length === 0 ||
      celebrity.recipes.some(r =>
        selectedDietary.every(tag => r.dietary_tags.includes(tag))
      );

    return matchesSearch && matchesType && matchesDifficulty && matchesDietary;
  });

  const toggleFilter = (category: string[], value: string, setter: (val: string[]) => void) => {
    if (category.includes(value)) {
      setter(category.filter(v => v !== value));
    } else {
      setter([...category, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedDifficulty([]);
    setSelectedDietary([]);
    setSearchQuery('');
  };

  const activeFilterCount = selectedTypes.length + selectedDifficulty.length + selectedDietary.length;

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gradient-to-b from-red-950/20 to-transparent">
        <header className="border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-3 group"
              >
                <ChefHat className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                  StarPlate
                </span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="relative w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search celebrities or recipes..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative flex items-center space-x-2 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:border-red-600 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {showFilters && (
          <div className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Filter Recipes</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-500 hover:text-red-400 flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Celebrity Type</h4>
                  <div className="space-y-2">
                    {CELEBRITY_TYPES.map(type => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleFilter(selectedTypes, type, setSelectedTypes)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                        />
                        <span className="text-white capitalize group-hover:text-red-500 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    {DIFFICULTIES.map(difficulty => (
                      <label key={difficulty} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedDifficulty.includes(difficulty)}
                          onChange={() => toggleFilter(selectedDifficulty, difficulty, setSelectedDifficulty)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                        />
                        <span className="text-white capitalize group-hover:text-red-500 transition-colors">
                          {difficulty}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Dietary Preferences</h4>
                  <div className="space-y-2">
                    {DIETARY_TAGS.map(tag => (
                      <label key={tag} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedDietary.includes(tag)}
                          onChange={() => toggleFilter(selectedDietary, tag, setSelectedDietary)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                        />
                        <span className="text-white capitalize group-hover:text-red-500 transition-colors">
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">Loading celebrity recipes...</div>
          </div>
        ) : filteredCelebrities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No recipes found matching your filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-red-500 hover:text-red-400"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCelebrities.map((celebrity) =>
              celebrity.recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all hover:scale-105"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-800">
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      recipe.difficulty === 'easy'
                        ? 'bg-green-600 text-white'
                        : recipe.difficulty === 'medium'
                        ? 'bg-amber-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                        {celebrity.name[0]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{celebrity.name}</p>
                        <p className="text-xs text-gray-600 capitalize">{celebrity.type}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {recipe.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {recipe.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prep_time + recipe.cook_time} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>

                    {recipe.dietary_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {recipe.dietary_tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-zinc-800 text-gray-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {celebrity.fun_fact && (
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <p className="text-xs text-amber-500 italic">
                          {celebrity.fun_fact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
