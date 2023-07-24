from sanic import Sanic
from sanic_cors import CORS
from sanic.response import json
from services.search import SearchEngine


app = Sanic(name='Word-Search-App')
CORS(app, origins=['*'])

sengine = SearchEngine()

@app.post("/translate")
async def translate(request):
    text = request.form.get('text')
    source_language = request.form.get('sourceLanguage')
    target_language = request.form.get('targetLanguage')
    translation = sengine.translate(text=text, source_language=source_language, target_language=target_language)
    return json({"status": "success", "data": translation}, status=200)


@app.post("/search")
async def search(request):
    input_text = request.form.get('text')
    input_word = request.form.get('word')
    source_language = request.form.get('sourceLanguage')
    target_language = request.form.get('targetLanguage')
    size = request.form.get('size', 10)
    size = int(size)

    sentence_pairs = sengine.search(input_text, input_word, source_language, target_language, size)

    return json({"status": "success", "data": sentence_pairs}, status=200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5034)
