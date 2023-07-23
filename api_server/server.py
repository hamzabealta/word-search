from sanic import Sanic
from sanic.response import json
from services.search import SearchEngine


app = Sanic(name='Word-Search-App')

sengine = SearchEngine()

@app.post("/translate")
async def translate(request):
    text = request.json.get('text')
    source_language = request.json.get('source_language')
    target_language = request.json.get('target_language')
    translation = sengine.translate(text=text, source_language=source_language, target_language=target_language)
    return json({"translation": translation})


@app.post("/search")
async def search(request):
    input_text = request.json.get('input_text')
    input_word = request.json.get('input_word')
    source_language = request.json.get('source_language')
    target_language = request.json.get('target_language')
    size = request.json.get('size', 10)
    sentence_pairs = sengine.search(input_text, input_word, source_language, target_language, size)
    return json(sentence_pairs)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5034)
