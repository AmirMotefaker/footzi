CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  known_as text,
  birth_date date,
  nationality text[],
  goals integer,
  assists integer, -- ✅ این خط اضافه شد
  appearances integer, -- ✅ این خط اضافه شد
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  country text,
  founded_year int,
  wikidata_qid text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE player_stats_temp (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_name text,
  club_name text,
  goals int,
  source_url text,
  fetched_at timestamptz DEFAULT now()
);