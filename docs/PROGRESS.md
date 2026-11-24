# PROGRESS LOG (update after every session; paste this into any new AI chat so context is never lost)

## Current status
Phase: UI Refinement & Polish
Last working feature: Full end-to-end document similarity comparison (API, Rabin-Karp, Merge Sort, LCS, UI with visual meters)
Next task: Phase 9 (Report, screenshots, and viva prep)

## Decisions made
- k default 5, allowed 2-10; max 100,000 chars per doc
- Overall = (WordOverlap + avg(CoverageA, CoverageB)) / 2
- B = 131, M = 1_000_000_007, word_hash multiplier 31
- Paper and ink theme with CSS variables in :root, 0 shadows/gradients, max 4px border radius
- Academic Red accent (--accent: #b91c1c); pure SVG donut ring and CSS score meters
- PDF/DOCX and OCR kept strictly out of scope per PRD and AGENTS.md to protect algorithm viva scope
- Hand-written stable Merge Sort for passages; no built-in sorted() or list.sort() used
- Dynamic programming LCS computed for documents <= 2000 words; null otherwise

## Done log (newest on top)
- 2026-11-25: Updated run.bat and start.bat to support the new frontend/ and backend/ directory layout. Added automatic local Wi-Fi IP detection and display for mobile access, and created test.bat for one-click pytest execution. All 39 tests passing.
- 2026-11-25: Reorganized project into physical frontend/ and backend/ folder architecture. Created frontend/ (containing templates/ and static/), backend/ (containing backend/app.py and pure algorithmic package backend/texttrace/), and root entrypoints (app.py, conftest.py) supporting Gunicorn, Docker, run.bat, and pytest seamlessly. Verified in-memory zero-database architecture for IAA viva. All 39 tests passing.
- 2026-11-25: Added interactive DSA & Algorithm Visualizer (IAA - Analysis of Algorithms) with animations: Tab 1 simulates Rabin-Karp sliding window (O(1) rolling hash with base 131, mod 10^9+7, real-time match detection), Tab 2 simulates divide-and-conquer Merge Sort (T(n)=2T(n/2)+O(n) with animated step-by-step tree breakdown and stable descending merge), and Tab 3 provides the comprehensive Big-O asymptotic complexity analysis matrix. Fully responsive and styled for both Light and Dark modes. All 39 tests passing.
- 2026-11-25: Added full cross-platform and mobile responsiveness (< 768px and < 480px breakpoints, thumb-friendly actions, PWA meta tags). Prepared deployment configuration (host 0.0.0.0, dynamic PORT, requirements.txt, Procfile, Dockerfile, docs/DEPLOYMENT.md). Verified mobile network access on Wi-Fi. All 39 tests passing.
- 2026-11-25: Fixed word/char counter badge in dark mode (.stat-counter) to blend seamlessly with dark header (#0c1322 bg, #243147 border, #94a3b8 text) instead of displaying as a white box. All 39 tests passing.
- 2026-11-25: Added smooth cubic-bezier transitions across all page surfaces, cards, textareas, tables, and borders when switching between Light and Dark mode. Enhanced Sun/Moon toggle icon rotation and spring thumb animation. All 39 tests passing.
- 2026-11-25: Added animated Sun & Moon Dark/Light mode toggle with smooth rotation and sliding thumb. Implemented complete dark mode palette (obsidian canvas, dark card surfaces, crimson accents) while preserving the warm cream default light theme. All 39 tests passing.
- 2026-11-25: Replaced multi-dot tone palette with a clean two-option theme switcher (Warm Cream and Cool Slate). Updated author label in the top right to Harsh Garg. All 39 tests passing.
- 2026-11-25: Created run.bat and start.bat one-click launchers. Automatically detects virtual environment, starts the Flask server, and opens the default web browser to http://127.0.0.1:5000/.
- 2026-11-23: Reverted extra structural chrome (dark header, dark footer, breadcrumbs) back to the clean light theme, adjusting only the page canvas background color (--app-bg: #eaedf2) to eliminate the harsh all-white glare. All 39 tests passing.
- 2026-11-23: Eliminated harsh all-white appearance by introducing a deep navy command-bar header (#0f172a), comfortable architectural slate canvas (#edf2f7), tinted card headers (#f1f5f9), and grounded dark footer. Maintained high contrast, academic red accents, and all 19 required DOM IDs. All 39 tests passing.
- 2026-11-23: Redesigned UI with crafted red theme, interactive visual charts (Doughnut chart for vocabulary distribution, Bar chart for corpus comparison), and prominent multi-format document uploader (.txt, .docx, .pdf, and image OCR). Removed artificial AI boilerplate appearance. Maintained all 19 required DOM IDs. All 39 tests passing.
- 2026-11-23: Redesigned UI to match Academic Algorithmic Instrument theme: dark navigation bar with active
  algorithm telemetry pill, workspace breadcrumbs, card-based matched passages list with offset pills, and refined
  high-contrast document panels. All 39 unit/API tests passing.
- 2026-11-23: Expanded file input to accept .txt, .pdf, .docx, and images. Added texttrace/extractor.py
  (pure Python standard-library extraction for Word .docx, pypdf for PDF) and POST /api/extract endpoint.
  Integrated browser-side OCR via Tesseract.js for image uploads. All 39 unit/API tests passing.
- 2026-11-23: UI styling updated to Academic Red (--accent: #b91c1c). Added pure SVG progress donut chart,
  horizontal metric meters, and distribution comparison bars without external charting libraries.
  Maintained strict plain-text scope per AGENTS.md and PRD.md (no PDF/DOCX/OCR). All 36 tests passing.
- 2026-11-23: Built complete backend and connected frontend end-to-end (Phases 1-8).
  Implemented texttrace/rabinkarp.py (rolling hash, B=131, M=1_000_000_007, word-by-word collision verification),
  texttrace/passages.py (run-length passage merging), texttrace/mergesort.py (hand-written stable merge sort),
  texttrace/similarity.py (PRD formulas, stats dict, overall scores), texttrace/lcs.py (DP word sequence LCS),
  app.py (POST /api/compare route with error handling), and static/script.js (DOM safe highlighting, .txt reader, USE_MOCK=false).
  Figure 2 verification confirmed: overall 49.61%, overlap 41.18%, coverage A 53.57%, coverage B 62.5%.
  Full test suite passed (36 tests covering T1-T20). What is left: Phase 9 report, documentation, and viva prep.
- 2026-11-23: Phases 1 and 2 completed. Added conftest.py and unit test suite for T1-T3, T5, T7, T12-T15. Implemented texttrace/preprocess.py (tokenize with character offsets), texttrace/validate.py (validation for k, empty text, word count, character limits), and texttrace/wordcompare.py (build_freq, unique_set, common_and_union, word_overlap). All 16 tests passing. Files changed: texttrace/preprocess.py, texttrace/validate.py, texttrace/wordcompare.py, conftest.py, tests/test_*.py, docs/PROGRESS.md. Next task = Phase 3 Rabin-Karp.
- 2026-11-23: Phase 0 + F1 + F2 completed. Initialized folder structure from ARCHITECTURE.md with algorithm placeholders, minimal Flask app.py serving index.html. Rebuilt UI with Paper & Ink theme (all 19 required IDs, placeholder dashes, calculation notes, and PRD footer notice). Verified page loads at http://127.0.0.1:5000. Files changed/created: app.py, templates/index.html, static/style.css, static/script.js, texttrace/*.py, tests/__init__.py, docs/PROGRESS.md. Next task = F3.

## Known bugs / todo
- none

## Prompts that worked well (copy them here)
- 
