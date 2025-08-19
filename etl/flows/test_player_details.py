# etl/flows/test_player_details.py

# ماژول pprint برای نمایش زیبای خروجی در ترمینال است
from pprint import pprint
from etl.scrapers.top_scorers import get_player_details_from_api

def run_test():
    print("--- Running test to fetch single player details ---")

    # ID آلن شیرر در API لیگ برتر 848 است. ما از این ID برای تست استفاده می‌کنیم.
    alan_shearer_id = 848

    details = get_player_details_from_api(alan_shearer_id)

    if details:
        print("\n--- Player Details Fetched Successfully: ---")
        pprint(details)
    else:
        print("\n--- Failed to fetch player details. ---")

if __name__ == "__main__":
    run_test()