# etl/flows/premier_league.py

from prefect import flow, task
from etl.scrapers.top_scorers import get_top_scorers_from_api, get_player_details_from_api
import pandas as pd
from sqlalchemy import create_engine, text
import os
import time
from datetime import datetime

DATABASE_URL = "postgresql+psycopg2://postgres:12345678@localhost:5432/footzi_stats"

@task(retries=3, retry_delay_seconds=10)
def get_top_scorers_list_task():
    """تسک ۱: لیست اولیه گلزنان را از API اول می‌گیرد."""
    print("🚀 Starting: Fetching top scorers list...")
    data = get_top_scorers_from_api()
    if not data:
        print("⚠️ Scraper returned no data from API.")
        return []
    print(f"✅ Success: Fetched {len(data)} player records.")
    return data

# In etl/flows/premier_league.py, replace the entire function with this one

@task
def process_and_enrich_players_task(players_list: list):
    """Task 2: Gets details for each player and creates a complete data list."""
    print("🔄 Starting: Enriching player data...")

    # ✅ This is the missing line that creates the list
    enriched_players = []

    # We process only the first 10 players for testing speed
    for player_stat in players_list[:10]:
        player_id_api = player_stat.get('owner', {}).get('id')
        if not player_id_api:
            continue

        player_id_int = int(player_id_api)
        details = get_player_details_from_api(player_id_int)

        if details:
            try:
                birth_date_obj = datetime.strptime(details['birthDate'], '%d %B %Y')
                birth_date_sql = birth_date_obj.strftime('%Y-%m-%d')
            except (ValueError, TypeError):
                birth_date_sql = None

            enriched_players.append({
                "full_name": details.get('name'),
                "known_as": player_stat.get('owner', {}).get('name', {}).get('display'),
                "birth_date": birth_date_sql,
                "nationality": [details.get('nationality')] if details.get('nationality') != 'N/A' else [],
                "goals": player_stat.get('value'),
            })

        time.sleep(0.5)

    print(f"✅ Success: Enriched details for {len(enriched_players)} players.")
    return enriched_players

@task
def load_players_to_db_task(players_data: list):
    """تسک ۳: داده‌های کامل را به جدول دائمی `players` وارد می‌کند."""
    print("💾 Starting: Loading enriched data into 'players' table...")
    if not players_data:
        print("⚠️ No enriched data to load.")
        return

    df = pd.DataFrame(players_data)

    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("✅ Successfully connected to the database.")
            # ابتدا جدول players را خالی می‌کنیم
            conn.execute(text("TRUNCATE TABLE players RESTART IDENTITY;"))
            # داده‌های جدید را وارد می‌کنیم
            df.to_sql('players', con=conn, if_exists='append', index=False)
            conn.commit()
        print(f"✅ Success: Loaded {len(df)} rows into 'players' table.")
    except Exception as e:
        print("\n❌❌❌ AN ERROR OCCURRED ❌❌❌")
        print(f"Error details: {e}")

@flow(name="EPL Player Details ETL")
def player_details_etl_flow():
    """Flow اصلی که فرآیند کامل را مدیریت می‌کند."""
    print("--- Starting Full Player Details ETL Flow ---")
    top_scorers = get_top_scorers_list_task()
    enriched_data = process_and_enrich_players_task(top_scorers)
    load_players_to_db_task(enriched_data)
    print("--- Flow Finished Successfully ---")

if __name__ == "__main__":
    player_details_etl_flow()