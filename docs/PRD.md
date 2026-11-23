# PRD — TextTrace (Document Similarity Checker)

## 1. Overview
A website where a user gives two plain-text documents (Document A, Document B) and gets: an overall similarity
score, word overlap, phrase coverage, basic statistics, and both documents with the shared passages highlighted.
The score is explained, not a black box. Every algorithm is written by the team.

## 2. Users
Students, teachers, writers comparing two drafts/versions/answers. Not a plagiarism verdict tool: a person decides.

## 3. Goals (from synopsis objectives)
G1 Compare two pasted/.txt documents. G2 Preprocess consistently. G3 HashMap + HashSet word comparison.
G4 Rabin–Karp phrase matching. G5 Scores + statistics. G6 Highlighting + Merge Sort by length.
G7 Document time/space complexity. 

## 4. In scope / Out of scope
In: paste text, load .txt, optional k, validation, scores, stats, highlights, sorted match list, error messages,
optional LCS stat for short docs, short complexity page or section in the report.
Out: PDF/DOCX, paraphrase detection, ML, external APIs, database/history, login, comparing against many docs.

## 5. Functional requirements
| ID | Requirement |
|----|-------------|
| FR-1 | Two text areas for A and B; each can be filled by pasting or by "Load .txt file" (read in browser with FileReader). |
| FR-2 | Optional phrase length k (default 5, allowed 2 to 10). |
| FR-3 | Compare button sends JSON to the backend; show a simple "Comparing..." state. |
| FR-4 | Validation: not empty, at least k words each, at most 100,000 characters each. Clear error message, user stays on page and can fix input. |
| FR-5 | Preprocess: lowercase, remove punctuation, split into word tokens; each token keeps (word, start, end) char positions in original text. |
| FR-6 | Word level: per-document HashMap word->count and HashSet of unique words; common words = intersection; union; Jaccard word overlap. |
| FR-7 | Phrase level: Rabin–Karp rolling hash on k-word windows; verify equal-hash windows word by word; mark matched words in a boolean array per document; merge consecutive marked words into passages. |
| FR-8 | Sort passages longest first with hand-written Merge Sort. |
| FR-9 | Scores: Word Overlap, Phrase Coverage A, Phrase Coverage B, Overall Similarity (formulas below). |
| FR-10 | Statistics: total words, unique words, common words (each doc), matched passages count, longest passage (words). |
| FR-11 | Show both documents side by side with passages in <mark>; show list of passages longest to shortest. |
| FR-12 | Show a short "How this score was calculated" note and the warning that similarity is not plagiarism. |
| FR-13 (optional) | LCS length of word lists shown only if both docs <= 2000 words; not part of overall score. |
| FR-14 | "Clear" button resets both boxes and results. |

## 6. Formulas
- Word Overlap % = |A ∩ B| / |A ∪ B| × 100 (A, B = sets of unique words)
- Phrase Coverage of doc % = words of that doc inside matched passages / total words of that doc × 100
- Overall % = (Word Overlap + (CoverageA + CoverageB)/2) / 2
- Round to 2 decimals for display. Weights are a design choice and may be tuned after testing.

## 7. Screens
One page only (index). Top: title + one-line description. Middle: two text areas, k box, Compare and Clear buttons.
Below (after compare): score cards (Overall, Word Overlap, Coverage A, Coverage B), statistics table,
side-by-side highlighted documents, matched passages list. Footer: limitations note.

## 8. Non-functional
- Typical docs (a few thousand words) respond within about 1 second.
- Documents are processed in memory and never saved.
- Highlighting must not break on special characters (< > &): build DOM with textContent, never innerHTML with user text.
- Works in latest Chrome/Edge/Firefox; usable on a laptop screen. Mobile polish is not required.

## 9. Acceptance criteria
- Identical documents -> 100%. No common words -> 0%.
- The synopsis illustration (Figure 2) gives one 15-word passage with k=5.
- All cases in docs/TEST_CASES.md pass.
- Every feature above works from the browser, not only via tests.
- Each team member can explain tokenization, Rabin–Karp, HashMap/HashSet use and Merge Sort without looking at code.

## 10. Known limitations (also shown on the page)
Exact word sequences only; paraphrase/translation not detected; plain text only; quotations and common phrases
are also matched; score is not proof of plagiarism.
