export interface Database {
  public: {
    Tables: {
      celebrities: {
        Row: Celebrity;
        Insert: Omit<Celebrity, 'id' | 'created_at'>;
        Update: Partial<Omit<Celebrity, 'id' | 'created_at'>>;
      };
      recipes: {
        Row: Recipe;
        Insert: Omit<Recipe, 'id' | 'created_at'>;
        Update: Partial<Omit<Recipe, 'id' | 'created_at'>>;
      };
      ingredients: {
        Row: Ingredient;
        Insert: Omit<Ingredient, 'id' | 'created_at'>;
        Update: Partial<Omit<Ingredient, 'id' | 'created_at'>>;
      };
      recipe_steps: {
        Row: RecipeStep;
        Insert: Omit<RecipeStep, 'id' | 'created_at'>;
        Update: Partial<Omit<RecipeStep, 'id' | 'created_at'>>;
      };
    };
  };
}

export interface Celebrity {
  id: string;
  name: string;
  type: string;
  bio: string;
  fun_fact: string;
  allergies: string;
  image_url: string;
  created_at: string;
}

export interface Recipe {
  id: string;
  celebrity_id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prep_time: number;
  cook_time: number;
  servings: number;
  dietary_tags: string[];
  image_url: string;
  created_at: string;
}

export interface Ingredient {
  id: string;
  recipe_id: string;
  name: string;
  amount: string;
  created_at: string;
}

export interface RecipeStep {
  id: string;
  recipe_id: string;
  step_number: number;
  instruction: string;
  created_at: string;
}

export interface CelebrityWithRecipe extends Celebrity {
  recipes: Recipe[];
}

export interface SearchFilters {
  search: string;
  difficulty: string[];
  celebrityType: string[];
  includeIngredients: string[];
  excludeIngredients: string[];
  dietaryNeeds: string[];
}
