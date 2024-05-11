from fastapi import FastAPI, Header
import requests

app = FastAPI()

@app.get("/process-ingredient/")
async def process_ingredient(ingredient: str, api_key: str = Header(None), app_id: str = Header(None)):
    edamam_url = "https://api.edamam.com/api/nutrition-data"
    edamam_params = {
        "app_id": app_id,
        "app_key": api_key,
        "nutrition-type": "cooking",
        "ingr": ingredient
    }
    edamam_headers = {
    }

    response = requests.get(edamam_url, params=edamam_params, headers=edamam_headers)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to get nutrition data from Edamam API"}
