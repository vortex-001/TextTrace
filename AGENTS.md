# AGENTS.md — read this first (keep it short, it is loaded every session)

## Project
TextTrace: a Flask website that compares two plain-text documents and shows a similarity score,
statistics and highlighted matching passages. It is a 3rd-year B.Tech IAA (Algorithms) project.
All comparison logic must be written by hand in Python so the student can explain it in the viva.

## Read order (save tokens)
1. docs/PROGRESS.md  (where we are right now)
2. Only the doc you need for the current task: docs/PRD.md (what), docs/ARCHITECTURE.md (how), docs/TEST_CASES.md (checks)
3. Do NOT re-read everything every time.

## Stack
Python 3 + Flask, HTML/CSS/vanilla JS, Fetch API with JSON, pytest. No database. No other libraries.

## Hard rules
- Hand-write: tokenizer, Rabin–Karp, merge sort, similarity formulas, (optional) LCS.
- Do NOT use: difflib, sklearn, nltk, fuzzywuzzy, numpy, or sorted()/list.sort() for the passage sort.
- Python dict = HashMap, set = HashSet (that is allowed and intended).
- Do not add features that are not in docs/PRD.md. No PDF/DOCX, no login, no database.
- Work on ONE task from docs/TASKS.md at a time. Touch only the files that task needs.
- After a task: run pytest, then add 3-5 lines to docs/PROGRESS.md. Reply with a diff or only changed functions, not whole files.

## Code style (must look like a student wrote it)
- Simple functions, plain names (tokenize, build_freq, find_matches). Classes only if really needed.
- Short comments in simple English that explain WHY, not what. Not on every line.
- No big docstrings, no heavy type-hint chains, no decorators or patterns the student has not studied.
- Small readable code over clever code. A normal for-loop is better than a one-line trick.
- No emojis in code, comments, commit messages or UI. Avoid words like "robust", "seamless", "leverage".

## UI style
- Plain and clean: white/light-grey background, one accent colour, system fonts, simple table and two text boxes.
- No gradients, no glassmorphism, no hero banner, no stock icons. Looks like a college project done carefully.
