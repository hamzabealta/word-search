from services.translator import UniversalTranslator
from elasticsearch import Elasticsearch
from services.utils import get_translations
import os

class SearchEngine:
    def __init__(self):
        """Initialize the SearchEngine with a translator and Elasticsearch client."""
        self.translator = UniversalTranslator()
        self.es = Elasticsearch(
            os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200/"),
            basic_auth=(os.getenv("ELASTIC_USER", "elastic"), os.getenv("ELASTIC_PASSWORD", "testpassword"))
        )

    def translate(self, text: str, source_language: str, target_language: str) -> str:
        """Translate text from source to target language."""
        return self.translator.get_text_translation(text, source_language, target_language)
    
    def search(self, text: str, word: str, source_language: str, target_language: str, size: int = 10):
        """Search for word occurrences in input_text, with optional translation."""
        return get_translations(self.es, text, word, source_language, target_language, size)
