/*
  # Celebrity Recipe Book Database Schema

  ## Overview
  Creates a complete schema for a celebrity recipe book application with celebrities,
  their favorite recipes, ingredients, and cooking steps.

  ## New Tables
  
  ### `celebrities`
  - `id` (uuid, primary key) - Unique identifier for each celebrity
  - `name` (text) - Celebrity's full name
  - `type` (text) - Type of celebrity (actor, athlete, singer, chef, etc.)
  - `bio` (text) - Short biography or description
  - `fun_fact` (text) - Fun food-related fact about the celebrity
  - `allergies` (text) - Known food allergies
  - `image_url` (text) - URL to celebrity's photo
  - `created_at` (timestamptz) - Record creation timestamp

  ### `recipes`
  - `id` (uuid, primary key) - Unique identifier for each recipe
  - `celebrity_id` (uuid, foreign key) - References celebrities table
  - `title` (text) - Recipe name
  - `description` (text) - Recipe description/story
  - `difficulty` (text) - Cooking difficulty (easy, medium, hard)
  - `prep_time` (integer) - Preparation time in minutes
  - `cook_time` (integer) - Cooking time in minutes
  - `servings` (integer) - Number of servings
  - `dietary_tags` (text array) - Dietary classifications (vegetarian, vegan, gluten-free, etc.)
  - `image_url` (text) - URL to recipe photo
  - `created_at` (timestamptz) - Record creation timestamp

  ### `ingredients`
  - `id` (uuid, primary key) - Unique identifier for each ingredient entry
  - `recipe_id` (uuid, foreign key) - References recipes table
  - `name` (text) - Ingredient name
  - `amount` (text) - Amount and unit (e.g., "2 cups", "1 tbsp")
  - `created_at` (timestamptz) - Record creation timestamp

  ### `recipe_steps`
  - `id` (uuid, primary key) - Unique identifier for each step
  - `recipe_id` (uuid, foreign key) - References recipes table
  - `step_number` (integer) - Order of the step
  - `instruction` (text) - Step instruction text
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for all tables (recipe book is public)
  - No write access policies (data managed by admin only)

  ## Indexes
  - Index on celebrity_id for recipe lookups
  - Index on recipe_id for ingredient and step lookups
  - Index on dietary_tags for filtering
*/

-- Create celebrities table
CREATE TABLE IF NOT EXISTS celebrities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  bio text DEFAULT '',
  fun_fact text DEFAULT '',
  allergies text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  celebrity_id uuid NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  prep_time integer DEFAULT 0,
  cook_time integer DEFAULT 0,
  servings integer DEFAULT 1,
  dietary_tags text[] DEFAULT '{}',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  name text NOT NULL,
  amount text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_steps table
CREATE TABLE IF NOT EXISTS recipe_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  instruction text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recipes_celebrity_id ON recipes(celebrity_id);
CREATE INDEX IF NOT EXISTS idx_ingredients_recipe_id ON ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_steps_recipe_id ON recipe_steps(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipes_dietary_tags ON recipes USING gin(dietary_tags);
CREATE INDEX IF NOT EXISTS idx_celebrities_type ON celebrities(type);

-- Enable Row Level Security
ALTER TABLE celebrities ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_steps ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (recipe book is public)
CREATE POLICY "Public can view celebrities"
  ON celebrities FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view recipes"
  ON recipes FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view ingredients"
  ON ingredients FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view recipe steps"
  ON recipe_steps FOR SELECT
  TO anon
  USING (true);