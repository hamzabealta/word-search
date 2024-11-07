from fake_useragent import UserAgent
import urllib3
import json
from urllib.parse import urlencode
from typing import Dict, Union

class GlosbeTranslator:
    BASE_URL = "https://translator-api.glosbe.com"

    def __init__(self) -> None:
        """Initialize with a user agent and HTTP connection pool."""
        self.ua = UserAgent(browsers=["edge", "chrome"])
        self.http = urllib3.PoolManager()

    def translate(self, text: str, src: str, dest: str) -> Dict[str, Union[str, None]]:
        """Translate text from source to destination language using Glosbe API."""
        endpoint = "/translateByLangDetect" if src == "auto" else "/translateByLang"
        url = f"{self.BASE_URL}{endpoint}"
        params = urlencode({"sourceLang": src if src != "auto" else "en", "targetLang": dest})
        
        headers = {
            "Content-Type": "text/plain",
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": self.ua.random
        }

        response = self.http.request("POST", url=f"{url}?{params}", headers=headers, body=text.encode("utf-8"))
        return self._parse_response(response, src)

    def _parse_response(self, response, src: str) -> Dict[str, Union[str, None]]:
        """Parse the API response and return the translation data."""
        if response.status != 200:
            return {"text": "Something went wrong", "src": src}

        data = json.loads(response.data.decode("utf-8"))
        return {
            "text": data.get("translation"),
            "src": data.get("suggestedLanguage") or src
        }
