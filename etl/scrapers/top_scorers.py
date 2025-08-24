# etl/scrapers/top_scorers.py

import logging
import requests

logging.basicConfig(level=logging.INFO)

# هدرهای کامل برای استفاده در تمام درخواست‌ها
COMPLETE_HEADERS = {
    'authority': 'footballapi.pulselive.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.premierleague.com',
    'referer': 'https://www.premierleague.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
}

def get_top_scorers_from_api():
    """
    لیست خام گلزنان را از API دریافت می‌کند.
    """
    logging.info("Fetching top scorers directly from the Premier League API...")
    
    api_url = "https://footballapi.pulselive.com/football/stats/ranked/players/goals"
    params = {
        "page": 0,
        "pageSize": 100,
        "comps": 1,
        "altIds": "true"
    }

    try:
        response = requests.get(api_url, headers=COMPLETE_HEADERS, params=params, timeout=20)
        response.raise_for_status()
        
        json_data = response.json()
        stats_content = json_data.get('stats', {}).get('content', [])
        
        logging.info(f"Successfully fetched raw data for {len(stats_content)} players from API.")
        return stats_content

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data from API: {e}")
        return []

def get_player_details_from_api(player_id: int):
    """
    جزئیات یک بازیکن خاص را بر اساس ID عددی او از API دریافت می‌کند.
    """
    logging.info(f"Fetching details for player ID: {player_id}...")
    
    api_url = f"https://footballapi.pulselive.com/football/players/{player_id}"
    
    try:
        response = requests.get(api_url, headers=COMPLETE_HEADERS, timeout=10)
        response.raise_for_status()
        
        player_data = response.json()
        
        details = {
            "name": player_data.get('name', {}).get('display', 'N/A'),
            "nationality": player_data.get('country', {}).get('country', 'N/A'),
            "birthDate": player_data.get('birth', {}).get('date', {}).get('label', 'N/A'),
            "height_cm": player_data.get('height', 'N/A'),
            "weight_kg": player_data.get('weight', 'N/A')
        }
        
        logging.info(f"Successfully fetched details for {details['name']}.")
        return details

    except requests.exceptions.RequestException as e:
        logging.error(f"API error for player ID {player_id}: {e}")
        return None
    except Exception as e:
        logging.error(f"Error parsing details for player ID {player_id}: {e}")
        return None