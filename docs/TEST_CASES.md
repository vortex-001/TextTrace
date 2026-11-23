# TEST CASES (write these as pytest tests early, before the UI)

| # | Case | Input | Expected |
|---|------|-------|----------|
| T1 | Tokenize basic | "Hello, World!" | words ["hello","world"], positions (0,5) and (7,12) |
| T2 | Apostrophe | "Don't stop" | ["don't","stop"] |
| T3 | Extra spaces/newlines | "a   b\n\nc" | 3 tokens, correct positions |
| T4 | Identical docs | same 20-word text twice, k=5 | overall 100, overlap 100, coverage 100/100, 1 passage |
| T5 | No shared words | "red green blue yellow orange purple" vs "one two three four five six" | overall 0, 0 passages |
| T6 | Synopsis Figure 2 | A: "Data structures help programmers organise information. A hash map stores key value pairs so that a value can be found quickly. Students often use it in their projects." B: "Many students prefer this approach. A hash map stores key value pairs so that a value can be found quickly, which makes searching faster." (k=5) | one passage of 15 words in each doc |
| T7 | Shared words but no 5-word phrase | texts sharing single words only | word overlap > 0, coverage 0, overall = overlap/2 |
| T8 | Case/punctuation ignored | "Hash, MAP stores keys." vs "hash map stores keys" (k=3) | full match |
| T9 | Rolling hash == direct hash | random word lists | rolled hash equals hash computed from scratch for every window |
| T10 | Collision check | force M tiny (e.g. 7) in a test | no false matches in results |
| T11 | Merge sort | passage lengths [3,9,1,9,5] | [9,9,5,3,1]; empty and 1-item lists work |
| T12 | Empty input | "" | 400 with message |
| T13 | Fewer than k words | 3 words, k=5 | 400 with message |
| T14 | Too large | 100,001 chars | 400 with message |
| T15 | Bad k | k=1 or k=50 | 400 with message |
| T16 | Repeated phrase | "go go go go go go" vs same | no crash, sensible result |
| T17 | Special characters | text with <b> & " ' | page shows them as plain text, not HTML |
| T18 | Large input timing | two ~5,000-word docs | responds in about 1 second |
| T19 | LCS (optional) | ["a","b","c","d"] vs ["b","d","c"] | length 2 |
| T20 | Unicode | text with accents/emojis | no crash, positions still highlight correctly |

Manual browser checks: load .txt file, wrong file type, Clear button, long text scrolling, highlight alignment on both sides.
