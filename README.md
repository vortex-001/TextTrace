# TextTrace — Document Similarity Checker

IAA project, B.Tech CSE, Rayat Bahra University (2026–27)
Team: Harsh Garg (24011010114), Babishya (24011010284)

TextTrace compares two plain-text documents and shows how similar they are, and why. Instead of only giving a
percentage, it highlights the exact passages the two texts share.

## What it does
- Paste text or load a .txt file for Document A and Document B
- Lowercases, removes punctuation and splits the text into words
- Word level: HashMap (word counts) + HashSet (unique, common, union words), Jaccard word overlap
- Phrase level: Rabin–Karp rolling hash on k-word windows (default k = 5), checked word by word
- Merge Sort puts the longest shared passages first
- Shows overall score, word overlap, phrase coverage, statistics and highlighted documents

A high score does not prove plagiarism. It only shows shared words and phrases. A person must judge the result.

## Run it
```
python -m venv venv
venv\Scripts\activate        # Windows
pip install flask pytest
python app.py
```
Open http://127.0.0.1:5000

## Run tests
```
pytest
```

## Limits
Exact word sequences only (no paraphrase detection), plain text only, nothing is saved.

## Docs
See the docs/ folder (PRD, architecture, test cases, tasks, progress).
