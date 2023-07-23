def ISO1toText(language):
    language_mapping = {
        'eng': 'English (detected)',
        'spa': 'Spanish (detected)',
        'cat': 'Catalan (detected)',
        'arb': 'Arabic (detected)',
        'en': 'English (detected)',
        'es': 'Spanish (detected)',
        'ca': 'Catalan (detected)',
        'ar': 'Arabic (detected)',
        'ary': 'Darija (detected)',
        'tzm': 'Tamazight (detected)',
        'auto': 'Detect Language'
    }
    if language in language_mapping.keys():
        return language_mapping[language]
    else:
        return 'Detect Language'


def ISO1to2(language):
    language_mapping = {
        'eng': 'eng',
        'spa': 'spa',
        'cat': 'cat',
        'arb': 'arb',
        'ary': 'ary',
        'tzm': 'tzm',
        'deu': 'deu',
        'fra': 'fra',
        'ita': 'ita',
        'jpn': 'jpn',
        'zho': 'zho',
        'zh-CN': 'zh-CN',
        'en': 'eng',
        'es': 'spa',
        'ca': 'cat',
        'ar': 'arb',
        'de': 'deu',
        'fr': 'fra',
        'it': 'ita',
        'ja': 'jpn',
        'zh': 'zh-CN',
        'auto': 'auto'
    }
    if language in language_mapping:
        return language_mapping[language]
    elif language is None:
        return 'auto'
    else:
        return 'en'

def ISO2to1(language):
    language_mapping = {
        'eng': 'en',
        'spa': 'es',
        'cat': 'ca',
        'arb': 'ar',
        'deu': 'de',
        'fra': 'fr',
        'ita': 'it',
        'jpn': 'ja',
        'zho': 'zh',
        'zh-CN': 'zh-CN',
        'en': 'en',
        'es': 'es',
        'ca': 'ca',
        'ar': 'ar',
        'de': 'de',
        'fr': 'fr',
        'it': 'it',
        'ja': 'ja',
        'zh': 'zh-CN',
        'ary': 'ary',
        'tzm': 'tzm',
        'auto': 'auto'
    }
    if language in language_mapping:
        return language_mapping[language]
    else:
        return 'auto'

def is_language_google_supported(language):
    """
    Returns whether a given language is supported by the Google Translator library.

    Parameters:
    - language (str): the 2-letter ISO 639-1 code of the language to check.

    Returns:
    - bool: True if the language is supported, False otherwise.
    """
    languages = ["auto", "af", "ach", "ak", "am", "ar", "az", "be", "bem", "bg", "bh", "bn", 
                 "br", "bs", "ca", "chr", "ckb", "co", "crs", "cs", "cy", "da", "de",
                 "ee", "el", "en", "eo", "es", "es-419", "et", "eu", "fa", "fi", "fo", 
                 "fr", "fy", "ga", "gaa", "gd", "gl", "gn", "gu", "ha", "haw", "hi", 
                 "hr", "ht", "hu", "hy", "ia", "id", "ig", "is", "it", "iw", "ja", "jw", 
                 "ka", "kg", "kk", "km", "kn", "ko", "kri", "ku", "ky", "la", "lg", "ln", 
                 "lo", "loz", "lt", "lua", "lv", "mfe", "mg", "mi", "mk",
                 "ml", "mn", "mo", "mr", "ms", "mt", "ne", "nl", "nn", "no", "nso", "ny", 
                 "nyn", "oc", "om", "or", "pa", "pcm", "pl", "ps", "pt-BR", "pt-PT", "qu", 
                 "rm", "rn", "ro", "ru", "rw", "sd", "sh", "si", "sk", "sl", "sn", "so", "sq", 
                 "sr", "sr-ME", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", 
                 "tn", "to", "tr", "tt", "tum", "tw", "ug", "uk", "ur", "uz", "vi", "wo", "xh", 
                 "xx-bork", "xx-elmer", "xx-hacker", "xx-klingon", "xx-pirate", "yi", "yo","zh", "zh-CN", "zh-TW", "zu"]

    # Check if the language is in the list of supported languages
    return language in languages

def get_translations(es, input_text, input_word, source_language, target_language, size=10):

    # Increase the number of source language sentences retrieved
    search_size = size * 1000

    # Step 1: Search for source language sentences containing the input word and sort by similarity to input text
    response = es.search(
        index="sentences",
        query={
            "bool": {
                "must": [
                    {"match": {"text": input_word}},
                    {"match": {"language_code": source_language}}
                ],
                "should": [
                    {"match_phrase": {"text": {"query": input_text, "slop": 10}}}
                ]
            }
        },
        size=search_size  # get top 'size' source language sentences
    )

    # Store the IDs of the source language sentences and their corresponding documents
    source_ids = [hit["_id"] for hit in response["hits"]["hits"]]
    source_docs = {hit["_source"]["id"]: (hit["_source"], hit["_score"]) for hit in response["hits"]["hits"]}

    # Step 2: Search for links where the source_id is in the list of source language sentence IDs
    response = es.search(
        index="links",
        query={
            "terms": {
                "source_id": source_ids
            }
        },
        size=search_size  # get top 'size' links
    )

    # Store the target language translation IDs along with the corresponding source_ids
    links = {(hit["_source"]["source_id"], hit["_source"]["translation_id"]) for hit in response["hits"]["hits"]}

    # Step 3: Retrieve the target language translations
    response = es.search(
        index="sentences",
        query={
            "bool": {
                "must": [
                    {"terms": {"id": [link[1] for link in links]}},
                    {"match": {"language_code": target_language}}
                ]
            }
        },
        size=search_size  # get top 'size' target language translations
    )

    # Store the target language translation documents
    target_docs = {hit["_source"]["id"]: hit["_source"] for hit in response["hits"]["hits"]}

    # Construct the final list of source-target sentence pairs
    sentence_pairs = []
    for source_id, target_id in links:
        if source_id in source_docs and target_id in target_docs:
            sentence_pairs.append({
                "source_doc": source_docs[source_id][0],
                "target_doc": target_docs[target_id],
                "score": source_docs[source_id][1]
            })

    return sorted(sentence_pairs, key=lambda x: x["score"], reverse=True)[:size]
