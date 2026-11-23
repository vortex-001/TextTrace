# TASKS — build in this order (tick as you go)

Token-saving rule: one task = one short AI session. Paste AGENTS.md + the named doc section + the task prompt. Ask for only the changed code.

## Phase 0 — Setup
- [ ] Create folder, `python -m venv venv`, `pip install flask pytest`, `git init`, first commit, GitHub repo
- [ ] Copy AGENTS.md and docs/ into the repo
Prompt: "Read AGENTS.md. Create the folder structure from docs/ARCHITECTURE.md with empty files and a minimal Flask app that serves index.html. Nothing else."

## Phase 1 — Tokenizer + validation
- [ ] preprocess.tokenize, validate.validate_input, tests T1-T3, T12-T15
Prompt: "Task: tokenize() and validate_input() as in ARCHITECTURE.md steps 1. Write tests T1-T3 and T12-T15 first, then the code."

## Phase 2 — Word level (HashMap/HashSet)
- [ ] build_freq, unique_set, common/union, word_overlap, test T5, T7
Prompt: "Task: wordcompare.py as in ARCHITECTURE.md step 2. Plain loops, simple comments."

## Phase 3 — Rabin–Karp
- [ ] word_hash, rolling hash, find_matches with verification, tests T9, T10
Prompt: "Task: rabinkarp.py as in ARCHITECTURE.md step 3-4. Explain the rolling formula in a comment once. Add tests T9 and T10."

## Phase 4 — Passages + Merge Sort
- [ ] mark/merge passages, hand-written merge_sort, tests T4, T6, T8, T11, T16
Prompt: "Task: passages.py and mergesort.py as in ARCHITECTURE.md steps 5-6. No sorted()."

## Phase 5 — Scores and stats
- [ ] coverage, overall, build_stats, run all tests so far
Prompt: "Task: similarity.py using PRD section 6. Return the dicts from the API section."

## Phase 6 — Flask API
- [ ] /api/compare route, JSON errors, test with Thunder Client/Postman or curl
Prompt: "Task: connect the package to POST /api/compare exactly as in the API section. No algorithm code inside app.py."

## Phase 7 — Frontend
- [ ] index.html + style.css (simple, see AGENTS.md UI style)
- [ ] script.js: fetch, scores, stats table, safe highlighting, .txt loader, Clear
Prompt: "Task: static page and script.js per PRD section 7 and ARCHITECTURE frontend notes. Use textContent for user text. Plain styling."

## Phase 8 — Optional + polish
- [ ] LCS (only if time), limitations note on page, empty/loading/error states, test T17-T20
- [ ] Manual browser checks from TEST_CASES.md

## Phase 9 — Report and viva
- [ ] Screenshots, complexity section (copy from synopsis), README filled, docs/VIVA_NOTES.md read twice
- [ ] Each member rewrites 2-3 comments in own words and can run + explain every file

## Humanizing checklist (do before submission)
- [ ] Commit history has many small commits with normal messages ("add tokenizer", "fix highlight offset"), not one huge commit
- [ ] Variable names and comments sound like you; delete anything you cannot explain
- [ ] UI is simple; no template-looking hero sections
- [ ] You can change a small thing live (e.g. change k default, change a weight) without help
