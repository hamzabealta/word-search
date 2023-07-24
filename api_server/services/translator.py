from googletrans import Translator
from services.utils import *
from services.glosbe import GlosbeTranslator


class UniversalTranslator:

    def __init__(self):
        # Create an instance of the Google Translator class
        self.google_translator = Translator()
        # Create an instance of the Glosbe Translator class
        self.glosbe_translator = GlosbeTranslator()

    def translate_to_language(self, text, source_language='auto', target_language='auto'):
        """
        Translates a text from a given source language to a given target language.

        Parameters:
        - text (str): the text to translate.
        - target_language (str): the language to translate the text to. Must be a 2-letter ISO 639-1 code.
        - source_language (str, optional): the language of the text. If not provided, the language will be detected automatically. Must be a 2-letter ISO 639-1 code.

        Returns:
        - tuple: a tuple containing the following elements:
            - str: the translated text.
            - str: the detected source language (if not provided).

        Notes:
        - Translation is performed using the Translator class.

        # DEEPL
        # translation =  self.translator.translate_text(text,
        #     target_lang=language)

        # return translation.text, translation.detected_source_lang

        # GoogleTranslator
        """
        # Convert the language codes to 1-letter codes
       
        if isinstance(text, list):
            translations = self.google_translator.translate(text,
                                                            src=source_language,
                                                            dest=target_language)

            return [translation.text for translation in translations], None
        else:
            if (is_language_google_supported(source_language) and is_language_google_supported(target_language)):
                # Translate the text using the Translator class
                translation = self.google_translator.translate(text=text,
                                                        src=source_language,
                                                        dest=target_language)
                
                return translation.text, translation.src
            else:
                # Translate the text using the GlosbeTranslator class
                translation = self.glosbe_translator.translate(text=text,
                                                            src=source_language,
                                                            dest=target_language)
                return translation['text'], translation['src']


    def get_text_translation(self, text=None,  source_language='auto', target_language='en'):
        """
        Returns information about a given text or word, including translations and definitions, in a given target language.

        Parameters:
        - text (str, optional): the text to get information for. If not provided, the word parameter must be provided.
        - source_language (str, optional): the language of the text. If not provided, the language will be detected automatically. Must be a 2-letter ISO 639-1 code.
        - target_language (str, optional): the language to get information in. Must be a 2-letter ISO 639-1 code.

        Returns:
        - dict: a dictionary containing the following keys:
            - source_language_code (str): the language of the text.
            - target_language_code (str): the language of the translated text.
            - translation (str): the translation of the text to the target language.
        """

        source_language = ISO2to1(source_language)
        target_language = ISO2to1(target_language)


        if is_language_google_supported(source_language) and is_language_google_supported(target_language):
            # Translate the text to the target language
            translated_text, detected_language = self.translate_to_language(
                text, source_language, target_language)
        else:
            translated_text = "we do not support this language"
            
        if source_language == 'auto':
            source_language = ISO2to1(detected_language)
            
        return {
            'source_language_code' : source_language,
            'target_language_code' : target_language,
            'translation' : translated_text
        }
