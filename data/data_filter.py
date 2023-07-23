import pandas as pd

def filter_csv(sentences_file_path, links_file_path):
    # Headers for each file
    sentences_headers = ['id', 'language_code', 'text']
    links_headers = ['source_id', 'translation_id']
    
    print("sentence filtering")
    # Read and filter sentences
    sentences_df = pd.read_csv(sentences_file_path, sep='\t', names=sentences_headers)
    languages = ['eng', 'spa', 'deu', 'cat', 'ara']
    sentences_df = sentences_df[sentences_df['language_code'].isin(languages)]
    sentences_df = sentences_df[sentences_df['text'].str.len() <= 200]
    sentences_df.drop_duplicates(subset=['id'], keep='first', inplace=True)
    sentences_df = sentences_df.where(pd.notnull(sentences_df), None)

    print("writing sentences")

    # Write sentences to new CSV file
    sentences_df.to_csv("filtered_sentences.csv", sep='\t', index=False, header=False)

    print("links filtering")

    # Read and filter links
    links_df = pd.read_csv(links_file_path, sep='\t', names=links_headers)
    links_df = links_df[links_df['source_id'].isin(sentences_df['id'])]  # Keep only links with source_id in filtered sentences
    links_df.drop_duplicates(subset=['source_id', 'translation_id'], keep='first', inplace=True)
    links_df = links_df.where(pd.notnull(links_df), None)

    print("writing links")

    # Write links to new CSV file
    links_df.to_csv("filtered_links.csv", sep='\t', index=False, header=False)

filter_csv("sentences.csv",
           "links.csv")
