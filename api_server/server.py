import os
from sanic import Sanic, Request, HTTPResponse
from sanic_cors import CORS
from sanic.response import json
from services.search import SearchEngine
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Sanic("Word-Search-App")
CORS(app, resources={r"/*": {"origins": os.getenv("ALLOWED_ORIGINS", "*")}})

sengine = SearchEngine()

@app.post("/translate")
async def translate(request: Request) -> HTTPResponse:
    """Translate text from source to target language."""
    try:
        translation = sengine.translate(
            text=request.form.get("text"),
            source_language=request.form.get("sourceLanguage"),
            target_language=request.form.get("targetLanguage"),
        )
        return json({"status": "success", "data": translation}, status=200)
    except Exception as e:
        return json({"status": "error", "message": str(e)}, status=400)

@app.post("/search")
async def search(request: Request) -> HTTPResponse:
    """Search for word occurrences in text with optional translation."""
    try:
        sentence_pairs = sengine.search(
            text=request.form.get("text"),
            word=request.form.get("word"),
            source_language=request.form.get("sourceLanguage"),
            target_language=request.form.get("targetLanguage"),
            size=int(request.form.get("size", 10)),
        )
        return json({"status": "success", "data": sentence_pairs}, status=200)
    except Exception as e:
        return json({"status": "error", "message": str(e)}, status=400)

if __name__ == "__main__":
    app.run(host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 5034)))
