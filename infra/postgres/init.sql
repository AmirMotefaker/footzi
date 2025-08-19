-- فعال کردن افزونه برای ساختن ID های منحصر به فرد (UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- جدول بازیکنان برای ذخیره اطلاعات پایه
<<<<<<< HEAD
-- infra/postgres/init.sql

-- ... (دستور CREATE EXTENSION) ...

CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
=======
CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  wikidata_qid text,
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
  full_name text NOT NULL,
  known_as text,
  birth_date date,
  nationality text[],
<<<<<<< HEAD
  goals integer, -- <-- این خط اضافه شده است
=======
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

<<<<<<< HEAD
-- ... (بقیه جداول) ...

=======
>>>>>>> b7e3c7310cdd301a4f6dfe8c525db33518574998
-- جدول باشگاه‌ها
CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL, -- اسم هر باشگاه باید منحصر به فرد باشد
  country text,
  founded_year int,
  wikidata_qid text,
  created_at timestamptz DEFAULT now()
);

-- جدول موقت برای ذخیره اولین داده‌های استخراج شده
-- در مراحل بعد، داده‌ها از این جدول پردازش و به جداول اصلی منتقل می‌شوند
CREATE TABLE player_stats_temp (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_name text,
  club_name text,
  goals int,
  source_url text,
  fetched_at timestamptz DEFAULT now()
);