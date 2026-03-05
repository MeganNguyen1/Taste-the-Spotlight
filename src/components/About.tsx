import { Award, Users, Heart } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="block text-white mb-2">About</span>
              <span className="block bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                StarPlate
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              StarPlate is your exclusive culinary guide to the world's most glamorous kitchens.
              We believe that everyone deserves to taste the spotlight, and now you can with our
              carefully curated collection of celebrity favorite recipes.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To bring the culinary excellence of the world's most iconic celebrities to your
                kitchen. From Michelin-starred chefs to Grammy-winning musicians, we celebrate
                the diverse food preferences and signature dishes that fuel greatness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-white">Authentic Recipes</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Every recipe featured is inspired by real celebrity preferences and documented
                  culinary traditions.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-white">Diverse Collection</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Featuring actors, athletes, singers, chefs, and bands from around the world with
                  unique culinary stories.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-white">Passion for Food</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  We celebrate the intersection of fame and food culture with authentic fun facts
                  and culinary insights.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Signature recipes from over 16 celebrities and bands</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Advanced filtering by difficulty, dietary preferences, and celebrity type</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Fun facts about celebrities' food preferences and allergies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Curated content from red carpet to kitchen table</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Regular updates with new celebrity recipes and stories</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-red-950/50 to-amber-950/50 border border-red-900/50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-3">Behind the Glamour</h2>
              <p className="text-gray-300 leading-relaxed">
                StarPlate was created for food enthusiasts who want to experience the culinary
                world of their favorite celebrities. Whether you're looking to replicate a Grammy
                winner's pre-show meal or master a Michelin-starred chef's signature dish, we've
                got you covered. Step into the spotlight and taste the difference.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => onNavigate('browse')}
              className="group relative inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full transition-all group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-600/50"></div>
              <span className="relative">Start Exploring</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
