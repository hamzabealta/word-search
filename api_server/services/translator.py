from googletrans import Translator
from services.utils import is_language_google_supported, ISO2to1
from services.glosbe import GlosbeTranslator
from typing import Tuple, Union, List, Dict

class UniversalTranslator:
    def __init__(self):
        """Initialize UniversalTranslator with Google and Glosbe translation services."""
        self.google_translator = Translator()
        self.glosbe_translator = GlosbeTranslator()

    def translate_to_language(
        self, text: Union[str, List[str]], source_language: str = "auto", target_language: str = "auto"
    ) -> Tuple[Union[str, List[str]], str]:
        """
        Translate text from source to target language, selecting the best service based on language support.

        Parameters:
        - text (str or List[str]): Text to translate; can be a single string or a list of strings.
        - source_language (str): Source language code (ISO 639-1); defaults to automatic detection.
        - target_language (str): Target language code (ISO 639-1).

        Returns:
        - Tuple containing the translated text (str or List[str]) and the detected source language code (str).
        """
        if is_language_google_supported(source_language) and is_language_google_supported(target_language):
            translation = self.google_translator.translate(text, src=source_language, dest=target_language)
            if isinstance(text, list):
                return [t.text for t in translation], translation[0].src
            return translation.text, translation.src
        else:
            result = self.glosbe_translator.translate(text=text, src=source_language, dest=target_language)
            return result['text'], result['src']

    def get_text_translation(
        self, text: str, source_language: str = "auto", target_language: str = "en"
    ) -> Dict[str, Union[str, None]]:
        """
        Provide translation and language information for a given text.

        Parameters:
        - text (str): Text to get information and translation for.
        - source_language (str): Source language code (ISO 639-1); defaults to automatic detection.
        - target_language (str): Target language code (ISO 639-1).

        Returns:
        - Dict with source language code, target language code, and the translated text.
        """
        source_language_code = ISO2to1(source_language)
        target_language_code = ISO2to1(target_language)

        if is_language_google_supported(source_language_code) and is_language_google_supported(target_language_code):
            translated_text, detected_language = self.translate_to_language(text, source_language_code, target_language_code)
            source_language_code = detected_language if source_language == "auto" else source_language_code
        else:
            translated_text = "we do not support this language"

        return {
            "source_language_code": source_language_code,
            "target_language_code": target_language_code,
            "translation": translated_text
        }
