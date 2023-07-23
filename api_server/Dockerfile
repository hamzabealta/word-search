FROM sanicframework/sanic:3.10-latest

WORKDIR /sanic

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5034

CMD ["python", "server.py"]