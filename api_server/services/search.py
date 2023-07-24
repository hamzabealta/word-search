
from services.translator import UniversalTranslator
from elasticsearch import Elasticsearch
from services.utils import *

class SearchEngine:

    def __init__(self):
        # Create an instance of the Google Translator class
        self.translator = UniversalTranslator()
        self.es = Elasticsearch("http://elasticsearch:9200/", basic_auth=('elastic', 'testpassword'))
        # self.es = Elasticsearch("http://localhost:9200/", basic_auth=('elastic', 'testpassword'))

    def translate(self, text, source_language, target_language):
        return self.translator.get_text_translation(text, source_language, target_language)
    
    def search(self, input_text, input_word, source_language, target_language, size=10):
        return get_translations(self.es, input_text, input_word, source_language, target_language, size)