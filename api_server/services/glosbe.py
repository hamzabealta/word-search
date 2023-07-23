from fake_useragent import UserAgent
import urllib3
import json
from urllib.parse import urlencode


class GlosbeTranslator:

    def __init__(self) -> None:
        self.ua = UserAgent(browsers=['edge', 'chrome'])
        self.http = urllib3.PoolManager()

    def translate(self, text, src, dest):
        if (src == 'auto'):
            encoded_args = urlencode({'sourceLang': 'en', 'targetLang': dest})
            url = "https://translator-api.glosbe.com/translateByLangDetect?" + encoded_args
        else:
            encoded_args = urlencode({'sourceLang': src, 'targetLang': dest})
            url = "https://translator-api.glosbe.com/translateByLang?" + encoded_args
            
        headers = {
            'Content-Type': 'text/plain',
            'Accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'user-agent': self.ua.random}

        r = self.http.request('POST', url=url, headers=headers, body=text.encode('utf-8'))

        if r.status == 200:
            data = json.loads(r.data.decode('utf-8'))
            print(data)
            if (src == 'auto'):
                if (data['suggestedLanguage']):
                    return {'text': data['translation'], 'src': data['suggestedLanguage']}
                return {'text': data['translation'], 'src': src}
            return {'text': data['translation'], 'src': src}
        else:
            return {'text': "Something went wrong", 'src': src}

