# Elasticsearch Bulk Import

This project's purpose is to import filtered sentences and links from CSV files to an Elasticsearch index. The primary languages we're focusing on are English (eng), Spanish (spa), German (deu), Catalan (cat), and Arabic (ara). Furthermore, sentences are filtered to have a maximum length of 200 characters.

## Prerequisites

Before you run the code, make sure you have the following:

1. Elasticsearch running at "http://elasticsearch:9200" with username 'elastic' and password 'testpassword'
2. Python packages installed: elasticsearch, pandas, tqdm
3. The CSV files `filtered_sentences.csv` and `filtered_links.csv` in a directory named "data"

## How to Run the Code

The script runs in a continuous loop, attempting to connect to the Elasticsearch server. Once it establishes a connection, it calls the `import_csv_to_es_bulk` function to import the sentences and links to their respective indices.

## Code Description

Here's a step-by-step description of the functions in the script:

1. `create_bulk_data(index_name, records)`: This function creates a bulk data payload that's suitable for Elasticsearch's bulk API. It takes as arguments the index name ('sentences' or 'links') and the records to be inserted. It then iterates over the records, assigning a unique ID for each record. This ID is either the 'id' field for sentences or a combination of 'source_id' and 'translation_id' for links.

2. `import_csv_to_es_bulk(es, index_name, csv_file_path)`: This function reads the CSV file, filters the data (if the index name is 'sentences'), converts the DataFrame to a list of dictionaries, calls `create_bulk_data` to create the bulk data, and finally uses Elasticsearch's `bulk` function to insert the data. It prints out the number of successfully indexed documents.

The main part of the script runs in a while loop, continuously trying to establish a connection with the Elasticsearch server. It sleeps for 5 seconds before retrying if it encounters a `ConnectionError`. Once it establishes a connection, it imports the sentences and links using the `import_csv_to_es_bulk` function.

## Notes

Ensure that the Elasticsearch server is running and accessible, and that the CSV files are in the correct path. Adjust the Elasticsearch URL, username, and password as necessary.
