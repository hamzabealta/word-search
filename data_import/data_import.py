from elasticsearch import Elasticsearch, ConnectionError
from elasticsearch.helpers import bulk

import pandas as pd
from tqdm import tqdm
import time

def create_bulk_data(index_name, records):
    bulk_data = []
    for record in tqdm(records):
        doc_id = record['id'] if index_name == 'sentences' else f"{record['source_id']}-{record['translation_id']}"
        data_dict = {
            "_index": index_name,
            "_id": doc_id,
            "_source": record
        }
        bulk_data.append(data_dict)
    return bulk_data

def import_csv_to_es_bulk(es, index_name, csv_file_path):
    headers = None
    if index_name == 'sentences':
        headers = ['id', 'language_code', 'text']
    elif index_name == 'links':
        headers = ['source_id', 'translation_id']

    df = pd.read_csv(csv_file_path, sep='\t', names=headers)

    return None
    if index_name == 'sentences':
        languages = ['eng', 'spa', 'deu', 'cat', 'ara']
        df = df[df['language_code'].isin(languages)]
        df = df[df['text'].str.len() <= 200]

    df = df.where(pd.notnull(df), None)
    records = df.to_dict(orient='records')

    bulk_data = create_bulk_data(index_name, records)

    print(f'Starting bulk import for {len(bulk_data)} documents...')
    success, _ = bulk(es, bulk_data, index=index_name, raise_on_error=True)
    print(f'Successfully indexed {success} out of {len(bulk_data)} documents.')

while True:
    try:
        es = Elasticsearch("http://elasticsearch:9200", basic_auth=('elastic', 'testpassword'))
        es.info()
        break
    except ConnectionError:
        print("Elasticsearch is not yet available, retrying...")
        time.sleep(5)

print("starting")
import_csv_to_es_bulk(es, "sentences", "data/filtered_sentences.csv")
# import_csv_to_es_bulk(es, "links", "app/data/filtered_links.csv")
