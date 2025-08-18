import logging
import requests # <- از کتابخانه جدید استفاده می‌کنیم
from typing import List
from pydantic import BaseModel, Field

logging.basicConfig(level=logging.INFO)

class ScrapedPlayerStat(BaseModel):
    name: str = Field(..., description="Player's full name")
    club: str = Field(..., description="Player's current club")
    goals: int = Field(..., description="Number of goals scored")

def get_top_scorers_from_api() -> List[ScrapedPlayerStat]:
    """
    مستقیماً به API سایت لیگ برتر وصل شده و داده‌های بهترین گلزنان را
    به صورت JSON دریافت و پردازش می‌کند.
    """
    logging.info("Fetching top scorers directly from the Premier League API...")
    
    # آدرس API و پارامترهای مورد نیاز
    api_url = "https://footballapi.pulselive.com/football/stats/ranked/players/goals"
    params = {
        "page": 0,
        "pageSize": 100, # دریافت ۱۰۰ گلزن برتر
        "comps": 1,      # کد مربوط به لیگ برتر انگلیس
        "altIds": "true"
    }
    
    # هدرهای ضروری برای اینکه درخواست ما توسط سرور پذیرفته شود
    headers = {
        "Origin": "https://www.premierleague.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }

    try:
        response = requests.get(api_url, headers=headers, params=params, timeout=20)
        response.raise_for_status()  # اگر درخواست ناموفق بود (مثلاً خطای 404 یا 500)، خطا می‌دهد
        
        json_data = response.json()
        stats = json_data.get('stats', {}).get('content', [])
        
        if not stats:
            logging.warning("API returned no stats content.")
            return []
            
        parsed_data = []
        for player_stat in stats:
            player_name = player_stat.get('owner', {}).get('name', {}).get('display', 'N/A')
            club_name = player_stat.get('owner', {}).get('currentTeam', {}).get('name', 'N/A')
            goals = player_stat.get('value', 0)
            
            parsed_data.append(ScrapedPlayerStat(name=player_name, club=club_name, goals=goals))
        
        logging.info(f"Successfully parsed {len(parsed_data)} players from API.")
        return parsed_data

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data from API: {e}")
        return []
    except (KeyError, IndexError) as e:
        logging.error(f"Error parsing JSON data structure: {e}")
        return []

# --- دو تابع قدیمی را حذف کردیم و نیازی به آنها نیست ---