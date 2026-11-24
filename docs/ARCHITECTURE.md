# ARCHITECTURE — TextTrace

## Folder structure
```
TextTrace/
  app.py                 # Root application entrypoint (delegates to backend.app)
  conftest.py            # Pytest test discovery & sys.path configuration
  backend/               # Complete Backend Tier
    app.py               # Flask REST controller & HTTP routing
    texttrace/           # Pure algorithmic engine (Zero Flask imports)
      __init__.py
      validate.py        # validate_input()
      preprocess.py      # tokenize()
      wordcompare.py     # build_freq(), unique_set(), word_overlap()
      rabinkarp.py       # word_hash(), window_hashes(), find_matches()
      passages.py        # mark_words(), merge_marked()
      mergesort.py       # merge_sort(), merge()
      similarity.py      # coverage(), overall(), build_stats()
      lcs.py             # dynamic programming LCS
      extractor.py       # document text extractor (.txt, .docx, .pdf)
  frontend/              # Complete Frontend Presentation Tier
    templates/
      index.html         # Semantic HTML5 view & DSA visualizer
    static/
      style.css          # CSS styles, theme tokens, responsive layouts
      script.js          # DOM manipulation, charts, & DSA visualizer animations
      mock_response.json
  tests/                 # Pytest test suite (39 automated unit & API tests)
  docs/                  # Specifications, progress logs, and viva defense guides
```
Rule: algorithms inside `backend/texttrace/` never import Flask; Flask never contains algorithm code. This ensures clean separation of concerns and effortless unit testing.
Note on Database: There is deliberately NO database. TextTrace is an in-memory document comparison engine for the IAA algorithms syllabus; all structures run in RAM in O(N+M) time, guaranteeing zero data retention and maximum privacy.

## Data shapes
- token: (word, start, end), start/end are character indexes in the ORIGINAL text.
- passage: dict {start_word, end_word, word_count, start_char, end_char}.

## Algorithms (plain steps)
1. tokenize(text): use re.finditer(r"[A-Za-z0-9']+", text) on the ORIGINAL text; word = match.group().lower(); keep match.start(), match.end(). (Do not lowercase first: some Unicode letters change length and break positions.)
2. Word level: freq = {} ; for w in words: freq[w] = freq.get(w,0)+1. set(words) for unique. common = setA & setB; union = setA | setB.
3. word_hash(w): h = 0; for c in w: h = (h*31 + ord(c)) % M
4. Rabin–Karp on words, constants B = 131, M = 1_000_000_007:
   - hashes of words: hw[i]
   - first window H0 = (hw[0]*B^(k-1) + ... + hw[k-1]) mod M  (compute with loop: H = (H*B + hw[j]) % M)
   - roll: H = ((H - hw[i]*B^(k-1)) * B + hw[i+k]) % M   (precompute power = B^(k-1) % M)
   - For A: dict hash -> list of start indexes. For B: roll, look up hash; for each candidate i in A, compare words A[i:i+k] == B[j:j+k] directly (collision check). If equal: mark A[i..i+k-1] and B[j..j+k-1] True.
5. merge_marked(flags, tokens): walk the boolean list; each run of True becomes one passage; start_char = tokens[run_start].start, end_char = tokens[run_end].end.
6. merge_sort(passages) by word_count, descending; hand written (split, recurse, merge). Keep it stable.
7. Scores as in PRD section 6. Guard division by zero (validation already guarantees >= k words, union >= 1).
8. Optional LCS: classic dp table of (n+1)x(m+1) over word lists; only if n, m <= 2000. Length only.

## API
POST /api/compare   Content-Type: application/json
Request:  { "text_a": "...", "text_b": "...", "k": 5 }
Success 200:
```
{
  "scores": { "overall": 0.0, "word_overlap": 0.0, "coverage_a": 0.0, "coverage_b": 0.0 },
  "stats": { "words_a": 0, "words_b": 0, "unique_a": 0, "unique_b": 0, "common_words": 0,
             "union_words": 0, "passages_a": 0, "passages_b": 0, "longest_passage": 0, "lcs_length": null },
  "passages_a": [ {"word_count": 0, "start_char": 0, "end_char": 0, "text": "..."} ],
  "passages_b": [ ... ]
}
```
Error 400: { "error": "Document A has fewer than 5 words." }
GET / returns the page.

## Frontend notes
- script.js: read inputs, fetch, render scores/stats table, render highlighted text.
- Highlight: take passages sorted by start_char, slice the original text, append text nodes and <mark> elements with textContent (no innerHTML with user text).
- .txt loading: FileReader.readAsText, reject other extensions.

## Decisions to remember
- Passages are built separately for A and B (each from its own boolean array); "matched passages" in stats shows both counts.
- k is validated in the backend too (2 to 10), never trust the browser.
- Repeated phrases can create many (i, j) pairs; this is the known worst case in the synopsis, not a bug.
- No database, nothing is stored.
