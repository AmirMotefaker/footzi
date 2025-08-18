# FILE: etl/flows/premier_league.py

print("--- Step 1: Python is reading this file. ---") # For debugging

from prefect import flow, task
# ✅ IMPORT STATEMENT CORRECTED:
from etl.scrapers.top_scorers import get_top_scorers_from_api
import pandas as pd
from sqlalchemy import create_engine
import os
import time
from sqlalchemy import text

DATABASE_URL = "postgresql+psycopg2://postgres:12345678@localhost:5432/footzi_stats"

@task(retries=3, retry_delay_seconds=10)
def scrape_data_task():
    """
    تسک ۱: داده‌ها را مستقیماً از API استخراج می‌کند.
    """
    print("🚀 Starting: Scrape data from Premier League API...")
    data = get_top_scorers_from_api()
    if not data:
        print("⚠️ Scraper returned no data from API.")
    else:
        print(f"✅ Success: Scraped {len(data)} player records from API.")
    return data

@task
def transform_data_task(data: list) -> pd.DataFrame:
    """
    تسک ۲: داده‌های خام را به یک DataFrame تمیز و آماده ورود به دیتابیس تبدیل می‌کند.
    """
    print("🔄 Starting: Transforming raw data...")
    if not data:
        print("⚠️ Warning: No data to transform.")
        return pd.DataFrame()

    df = pd.DataFrame([item.model_dump() for item in data])
    df.rename(columns={'name': 'player_name', 'club': 'club_name'}, inplace=True)
    df['source_url'] = "https://footballapi.pulselive.com/football/stats/ranked/players/goals"
    return df

@task
def load_data_to_db_task(df: pd.DataFrame):
    """
    تسک ۳: DataFrame را به جدول موقت در دیتابیس PostgreSQL وارد می‌کند.
    """
    print("💾 Starting: Loading data into PostgreSQL...")
    if df.empty:
        print("⚠️ Warning: DataFrame is empty. No data to load.")
        return

    try:
        print("DataFrame has data. First 5 rows:")
        print(df.head())

        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("✅ Successfully connected to the database.")
            conn.execute(text("TRUNCATE TABLE player_stats_temp;"))
            df.to_sql('player_stats_temp', con=conn, if_exists='append', index=False)
            conn.commit()
        print(f"✅ Success: Loaded {len(df)} rows into 'player_stats_temp' table.")
    except Exception as e:
        print("\n❌❌❌ AN ERROR OCCURRED ❌❌❌")
        print(f"Error details: {e}")

@flow(name="EPL Top Scorers ETL")
def top_scorers_etl_flow():
    print("--- Step 3: Inside the flow function. ---")
    scraped_data = scrape_data_task()
    time.sleep(2) 
    df = transform_data_task(scraped_data)
    load_data_to_db_task(df)
    print("--- Flow Finished Successfully ---")

if __name__ == "__main__":
    print("--- Step 2: Inside the main execution block. ---")
    top_scorers_etl_flow()