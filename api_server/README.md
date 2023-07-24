## API Server Description

This is a Sanic-based server, offering the /translate and /search functionalities via respective endpoints.

For our translation service, we employ a blend of googletrans, which is an unofficial Google API, and our proprietary Glosbe module. The Glosbe module interacts with the Glosbe API to establish a robust translation mechanism. We also incorporate Text-to-Speech (TTS) capabilities leveraging built-in browser libraries.

In terms of the search functionality, we communicate with the Elasticsearch server to find sentences that contain the specified word. These sentences are ranked based on their degree of similarity. Additionally, we offer paired examples of these sentences to demonstrate the practical usage of the selected word.
