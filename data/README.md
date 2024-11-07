# Sentence and Link Filtering

This project aims to filter sentences and links from the dataset provided by [Tatoeba](https://tatoeba.org/es/downloads). The primary languages we're focusing on are English (eng), Spanish (spa), German (deu), Catalan (cat), and Arabic (ara). Furthermore, sentences are filtered to have a maximum length of 200 characters.

## Prerequisites

Before you run the code, make sure you have the following files:

1. `sentences.csv` - You can download this from [Tatoeba's download page](https://tatoeba.org/es/downloads).
2. `links.csv` - You can download this from [Tatoeba's download page](https://tatoeba.org/es/downloads).

## How to Run the Code

The code filters both the `sentences.csv` and `links.csv` files and writes the filtered data into `filtered_sentences.csv` and `filtered_links.csv`, respectively.

You can run the code with the following command:

```python
python data_filter.py
```

Ensure that the sentences.csv and links.csv files are in the same directory as your Python script.

## Code Description

The code is organized as a single function, `filter_csv(sentences_file_path, links_file_path)`, which takes as arguments the file paths to the `sentences.csv` and `links.csv` files.

Here's a step-by-step description of what the function does:

1. Reads and filters sentences from the `sentences.csv` file based on the following criteria:
    - The language of the sentence is either English, Spanish, German, Catalan, or Arabic.
    - The length of the sentence is less than or equal to 200 characters.
    - Drops duplicate sentences, keeping only the first instance.
1. Writes the filtered sentences to a new file, filtered_sentences.csv.
1. Reads and filters links from the `links.csv` file, keeping only links whose source ID is in the filtered sentences.
1. Drops duplicate links, keeping only the first instance.
1. Writes the filtered links to a new file, `filtered_links.csv`.