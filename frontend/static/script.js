// TextTrace Frontend Engine & Visual Analytics
const USE_MOCK = false;

document.addEventListener("DOMContentLoaded", () => {
  // Required 19 Elements
  const textareaA = document.getElementById("textarea-a");
  const textareaB = document.getElementById("textarea-b");
  const fileA = document.getElementById("file-a");
  const fileB = document.getElementById("file-b");
  const loadABtn = document.getElementById("load-a-btn");
  const loadBBtn = document.getElementById("load-b-btn");
  const kInput = document.getElementById("k-input");
  const compareBtn = document.getElementById("compare-btn");
  const clearBtn = document.getElementById("clear-btn");
  const errorBox = document.getElementById("error-box");
  const resultsSection = document.getElementById("results");
  const scoreOverall = document.getElementById("score-overall");
  const scoreOverlap = document.getElementById("score-overlap");
  const scoreCovA = document.getElementById("score-cov-a");
  const scoreCovB = document.getElementById("score-cov-b");
  const statsBody = document.getElementById("stats-body");
  const docAView = document.getElementById("doc-a-view");
  const docBView = document.getElementById("doc-b-view");
  const passagesList = document.getElementById("passages-list");

  // Secondary elements & controls
  const sampleBtn = document.getElementById("sample-btn");
  const countA = document.getElementById("count-a");
  const countB = document.getElementById("count-b");
  const panelA = document.getElementById("panel-a");
  const panelB = document.getElementById("panel-b");
  const statusA = document.getElementById("status-a");
  const statusB = document.getElementById("status-b");
  const clearABtn = document.getElementById("clear-a-btn");
  const clearBBtn = document.getElementById("clear-b-btn");

  // Mode tabs & panes
  const tabAEdit = document.getElementById("tab-a-edit");
  const tabADrop = document.getElementById("tab-a-drop");
  const paneAText = document.getElementById("pane-a-text");
  const paneADrop = document.getElementById("pane-a-drop");
  const dropBoxA = document.getElementById("drop-box-a");

  const tabBEdit = document.getElementById("tab-b-edit");
  const tabBDrop = document.getElementById("tab-b-drop");
  const paneBText = document.getElementById("pane-b-text");
  const paneBDrop = document.getElementById("pane-b-drop");
  const dropBoxB = document.getElementById("drop-box-b");

  // Progress meters
  const donutFill = document.getElementById("donut-fill");
  const meterOverlap = document.getElementById("meter-overlap");
  const meterCovA = document.getElementById("meter-cov-a");
  const meterCovB = document.getElementById("meter-cov-b");

  // Chart instances
  let vocabChartInstance = null;
  let metricsChartInstance = null;

  // Real-time word and character counts
  function updateCounts() {
    const textA = textareaA.value;
    const textB = textareaB.value;
    const wordsA = textA.trim() ? textA.trim().split(/\s+/).length : 0;
    const wordsB = textB.trim() ? textB.trim().split(/\s+/).length : 0;

    if (countA) countA.textContent = `${wordsA} words \u00b7 ${textA.length} chars`;
    if (countB) countB.textContent = `${wordsB} words \u00b7 ${textB.length} chars`;
  }

  textareaA.addEventListener("input", updateCounts);
  textareaB.addEventListener("input", updateCounts);

  // Tab switching helpers
  function setupTabs(tabEdit, tabDrop, paneText, paneDrop) {
    if (!tabEdit || !tabDrop) return;
    tabEdit.addEventListener("click", () => {
      tabEdit.classList.add("active");
      tabDrop.classList.remove("active");
      paneText.hidden = false;
      paneDrop.hidden = true;
    });

    tabDrop.addEventListener("click", () => {
      tabDrop.classList.add("active");
      tabEdit.classList.remove("active");
      paneDrop.hidden = false;
      paneText.hidden = true;
    });
  }

  setupTabs(tabAEdit, tabADrop, paneAText, paneADrop);
  setupTabs(tabBEdit, tabBDrop, paneBText, paneBDrop);

  // Preset k buttons
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      kInput.value = btn.getAttribute("data-k");
    });
  });

  kInput.addEventListener("input", () => {
    const val = kInput.value;
    document.querySelectorAll(".preset-btn").forEach((b) => {
      if (b.getAttribute("data-k") === val) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
  });

  // Clear single doc buttons
  if (clearABtn) {
    clearABtn.addEventListener("click", () => {
      textareaA.value = "";
      fileA.value = "";
      updateCounts();
    });
  }

  if (clearBBtn) {
    clearBBtn.addEventListener("click", () => {
      textareaB.value = "";
      fileB.value = "";
      updateCounts();
    });
  }

  // Error helpers
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.hidden = true;
  }

  // Universal File & OCR Handler
  async function handleFile(file, textarea, statusPill, tabEdit, tabDrop, paneText, paneDrop) {
    if (!file) return;
    clearError();

    const lowerName = file.name.toLowerCase();
    if (statusPill) {
      statusPill.className = "status-pill busy";
      statusPill.textContent = "Processing...";
    }

    // 1. Plain Text (.txt)
    if (lowerName.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        textarea.value = e.target.result;
        updateCounts();
        if (statusPill) {
          statusPill.className = "status-pill ready";
          statusPill.textContent = `Loaded ${file.name.slice(0, 16)}`;
        }
        // Switch back to editor view so text is visible
        if (tabEdit && paneText) {
          tabEdit.click();
        }
      };
      reader.onerror = () => {
        showError("Failed to read text file.");
        if (statusPill) {
          statusPill.className = "status-pill ready";
          statusPill.textContent = "Error";
        }
      };
      reader.readAsText(file, "UTF-8");
      return;
    }

    // 2. OCR Images (PNG, JPG, BMP, WEBP, etc.)
    if (file.type.startsWith("image/") || /\.(png|jpe?g|bmp|webp|gif)$/i.test(lowerName)) {
      if (statusPill) {
        statusPill.className = "status-pill busy";
        statusPill.textContent = "OCR Reading...";
      }
      showError(`Extracting text from image "${file.name}" using OCR...`);

      try {
        if (typeof Tesseract !== "undefined") {
          const result = await Tesseract.recognize(file, "eng", {
            logger: (m) => {
              if (m.status === "recognizing text" && m.progress) {
                const pct = (m.progress * 100).toFixed(0);
                if (statusPill) statusPill.textContent = `OCR ${pct}%`;
              }
            },
          });

          const extracted = result.data.text;
          if (extracted && extracted.trim()) {
            textarea.value = extracted.trim();
            updateCounts();
            clearError();
            if (statusPill) {
              statusPill.className = "status-pill ready";
              statusPill.textContent = "OCR Complete";
            }
            if (tabEdit && paneText) {
              tabEdit.click();
            }
          } else {
            showError(`No readable text found in image "${file.name}".`);
            if (statusPill) {
              statusPill.className = "status-pill ready";
              statusPill.textContent = "No text";
            }
          }
        } else {
          showError("OCR library is initializing. Please retry in a few seconds.");
        }
      } catch (err) {
        showError(`OCR failed on "${file.name}": ${err.message || err}`);
        if (statusPill) {
          statusPill.className = "status-pill ready";
          statusPill.textContent = "OCR Failed";
        }
      }
      return;
    }

    // 3. Document files (.docx, .pdf, .doc) via /api/extract
    if (lowerName.endsWith(".docx") || lowerName.endsWith(".pdf") || lowerName.endsWith(".doc")) {
      if (statusPill) {
        statusPill.className = "status-pill busy";
        statusPill.textContent = "Extracting Doc...";
      }
      showError(`Extracting text from "${file.name}"...`);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/extract", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (res.ok && json.text) {
          textarea.value = json.text;
          updateCounts();
          clearError();
          if (statusPill) {
            statusPill.className = "status-pill ready";
            statusPill.textContent = `Loaded ${file.name.slice(0, 16)}`;
          }
          if (tabEdit && paneText) {
            tabEdit.click();
          }
        } else {
          showError(json.error || `Failed to extract text from "${file.name}".`);
          if (statusPill) {
            statusPill.className = "status-pill ready";
            statusPill.textContent = "Failed";
          }
        }
      } catch (err) {
        showError(`Network error while extracting text from "${file.name}".`);
        if (statusPill) {
          statusPill.className = "status-pill ready";
          statusPill.textContent = "Failed";
        }
      }
      return;
    }

    showError(`Unsupported file "${file.name}". Please upload a .txt, .docx, .pdf or image file.`);
    if (statusPill) {
      statusPill.className = "status-pill ready";
      statusPill.textContent = "Unsupported";
    }
  }

  // File picker and drag-drop wiring
  function setupUploader(btn, input, textarea, panel, dropBox, statusPill, tabEdit, tabDrop, paneText, paneDrop) {
    if (btn) {
      btn.addEventListener("click", () => input.click());
    }

    if (dropBox) {
      dropBox.addEventListener("click", (e) => {
        if (e.target !== btn) {
          input.click();
        }
      });
    }

    input.addEventListener("change", () => {
      if (input.files.length > 0) {
        handleFile(input.files[0], textarea, statusPill, tabEdit, tabDrop, paneText, paneDrop);
        input.value = "";
      }
    });

    const dropTargets = [panel, dropBox].filter(Boolean);
    dropTargets.forEach((tgt) => {
      tgt.addEventListener("dragover", (e) => {
        e.preventDefault();
        panel.classList.add("drag-over");
      });

      tgt.addEventListener("dragleave", (e) => {
        e.preventDefault();
        panel.classList.remove("drag-over");
      });

      tgt.addEventListener("drop", (e) => {
        e.preventDefault();
        panel.classList.remove("drag-over");
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0], textarea, statusPill, tabEdit, tabDrop, paneText, paneDrop);
        }
      });
    });
  }

  setupUploader(loadABtn, fileA, textareaA, panelA, dropBoxA, statusA, tabAEdit, tabADrop, paneAText, paneADrop);
  setupUploader(loadBBtn, fileB, textareaB, panelB, dropBoxB, statusB, tabBEdit, tabBDrop, paneBText, paneBDrop);

  // Sample load button (Figure 2 case)
  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      textareaA.value =
        "Data structures help programmers organise information. A hash map stores key value pairs so that a value can be found quickly. Students often use it in their projects.";
      textareaB.value =
        "Many students prefer this approach. A hash map stores key value pairs so that a value can be found quickly, which makes searching faster.";
      kInput.value = 5;
      document.querySelectorAll(".preset-btn").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-k") === "5");
      });
      tabAEdit.click();
      tabBEdit.click();
      updateCounts();
      clearError();
    });
  }

  // Clear button logic
  clearBtn.addEventListener("click", () => {
    textareaA.value = "";
    textareaB.value = "";
    fileA.value = "";
    fileB.value = "";
    kInput.value = 5;
    document.querySelectorAll(".preset-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-k") === "5");
    });
    updateCounts();
    clearError();
    resultsSection.hidden = true;

    // Reset gauge
    if (donutFill) donutFill.style.strokeDashoffset = "251.32";
    if (meterOverlap) meterOverlap.style.width = "0%";
    if (meterCovA) meterCovA.style.width = "0%";
    if (meterCovB) meterCovB.style.width = "0%";

    if (vocabChartInstance) {
      vocabChartInstance.destroy();
      vocabChartInstance = null;
    }
    if (metricsChartInstance) {
      metricsChartInstance.destroy();
      metricsChartInstance = null;
    }
  });

  // Highlight passages securely without innerHTML on raw input
  function renderHighlightedText(container, text, passages) {
    container.textContent = "";
    if (!text) return;
    if (!passages || passages.length === 0) {
      container.appendChild(document.createTextNode(text));
      return;
    }

    const sorted = passages.slice().sort((a, b) => a.start_char - b.start_char);
    let current = 0;

    for (const p of sorted) {
      if (p.start_char > current) {
        container.appendChild(document.createTextNode(text.slice(current, p.start_char)));
      }
      const mark = document.createElement("mark");
      mark.textContent = text.slice(p.start_char, p.end_char);
      container.appendChild(mark);
      current = Math.max(current, p.end_char);
    }

    if (current < text.length) {
      container.appendChild(document.createTextNode(text.slice(current)));
    }
  }

  // Populate stats table
  function updateStatsTable(stats) {
    statsBody.textContent = "";

    const rows = [
      { label: "Total words", a: stats.words_a, b: stats.words_b },
      { label: "Unique words", a: stats.unique_a, b: stats.unique_b },
      { label: "Common words", val: stats.common_words },
      { label: "Union words", val: stats.union_words },
      { label: "Matched passages", a: stats.passages_a, b: stats.passages_b },
      { label: "Longest passage (words)", val: stats.longest_passage },
      { label: "LCS length", val: stats.lcs_length !== null ? stats.lcs_length : "N/A (> 2000 words)" },
    ];

    for (const r of rows) {
      const tr = document.createElement("tr");
      const tdLabel = document.createElement("td");
      tdLabel.textContent = r.label;
      tr.appendChild(tdLabel);

      if ("val" in r) {
        const tdVal = document.createElement("td");
        tdVal.colSpan = 2;
        tdVal.textContent = r.val;
        tr.appendChild(tdVal);
      } else {
        const tdA = document.createElement("td");
        tdA.textContent = r.a;
        tr.appendChild(tdA);

        const tdB = document.createElement("td");
        tdB.textContent = r.b;
        tr.appendChild(tdB);
      }

      statsBody.appendChild(tr);
    }
  }

  // Render passages list (sorted longest first via backend Merge Sort)
  function renderPassagesList(container, passagesA) {
    container.textContent = "";
    if (!passagesA || passagesA.length === 0) {
      container.textContent = "No matching passages of at least k words found.";
      return;
    }

    passagesA.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "passage-card";

      const meta = document.createElement("div");
      meta.className = "passage-meta";

      const tag = document.createElement("span");
      tag.className = "passage-tag";
      tag.textContent = `Match #${idx + 1} \u00b7 ${p.word_count} words`;
      meta.appendChild(tag);

      const range = document.createElement("span");
      range.className = "passage-range";
      range.textContent = `Offset: [${p.start_char} \u2013 ${p.end_char}]`;
      meta.appendChild(range);

      card.appendChild(meta);

      const quote = document.createElement("div");
      quote.className = "passage-text";
      quote.textContent = `\u201c${p.text}\u201d`;
      card.appendChild(quote);

      container.appendChild(card);
    });
  }

  // Chart Rendering using Chart.js
  function renderCharts(scores, stats) {
    if (typeof Chart === "undefined") return;

    // 1. Vocabulary Distribution Chart (Doughnut)
    const ctxVocab = document.getElementById("vocab-chart");
    if (ctxVocab) {
      if (vocabChartInstance) vocabChartInstance.destroy();

      const uniqueOnlyA = Math.max(stats.unique_a - stats.common_words, 0);
      const uniqueOnlyB = Math.max(stats.unique_b - stats.common_words, 0);
      const common = stats.common_words;

      vocabChartInstance = new Chart(ctxVocab, {
        type: "doughnut",
        data: {
          labels: ["Unique to Doc A", "Shared Vocabulary", "Unique to Doc B"],
          datasets: [
            {
              data: [uniqueOnlyA, common, uniqueOnlyB],
              backgroundColor: ["#b91c1c", "#f59e0b", "#3b82f6"],
              borderWidth: 2,
              borderColor: "#ffffff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: { family: "Inter", size: 11 },
                color: "#334155",
              },
            },
          },
          cutout: "60%",
        },
      });
    }

    // 2. Metrics Comparison Bar Chart
    const ctxMetrics = document.getElementById("metrics-chart");
    if (ctxMetrics) {
      if (metricsChartInstance) metricsChartInstance.destroy();

      // Approximate matched words from coverage % * total words
      const matchedWordsA = Math.round((scores.coverage_a / 100) * stats.words_a);
      const matchedWordsB = Math.round((scores.coverage_b / 100) * stats.words_b);

      metricsChartInstance = new Chart(ctxMetrics, {
        type: "bar",
        data: {
          labels: ["Total Words", "Unique Words", "Matched in Phrases"],
          datasets: [
            {
              label: "Document A",
              data: [stats.words_a, stats.unique_a, matchedWordsA],
              backgroundColor: "#b91c1c",
              borderRadius: 4,
            },
            {
              label: "Document B",
              data: [stats.words_b, stats.unique_b, matchedWordsB],
              backgroundColor: "#3b82f6",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: { family: "Inter", size: 11 },
                color: "#334155",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#f1f5f9" },
              ticks: { font: { family: "JetBrains Mono", size: 11 }, color: "#64748b" },
            },
            x: {
              grid: { display: false },
              ticks: { font: { family: "Inter", size: 11 }, color: "#334155" },
            },
          },
        },
      });
    }
  }

  // Compare Handler
  compareBtn.addEventListener("click", async () => {
    clearError();

    const textA = textareaA.value;
    const textB = textareaB.value;
    const k = parseInt(kInput.value, 10);

    if (!textA.trim()) {
      showError("Document A cannot be empty.");
      return;
    }
    if (!textB.trim()) {
      showError("Document B cannot be empty.");
      return;
    }
    if (isNaN(k) || k < 2 || k > 10) {
      showError("Phrase length k must be an integer between 2 and 10.");
      return;
    }

    compareBtn.disabled = true;
    compareBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Analyzing...
    `;

    try {
      let data;
      if (USE_MOCK) {
        const mockRes = await fetch("/static/mock_response.json");
        data = await mockRes.json();
      } else {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text_a: textA, text_b: textB, k: k }),
        });

        const json = await res.json();
        if (!res.ok) {
          showError(json.error || "Comparison failed.");
          resultsSection.hidden = true;
          return;
        }
        data = json;
      }

      // Populate scores
      scoreOverall.textContent = data.scores.overall.toFixed(2) + "%";
      scoreOverlap.textContent = data.scores.word_overlap.toFixed(2) + "%";
      scoreCovA.textContent = data.scores.coverage_a.toFixed(2) + "%";
      scoreCovB.textContent = data.scores.coverage_b.toFixed(2) + "%";

      // Radial Gauge (circumference = 251.327)
      if (donutFill) {
        const circumference = 251.327;
        const pct = Math.min(Math.max(data.scores.overall, 0), 100);
        const offset = circumference * (1 - pct / 100);
        donutFill.style.strokeDashoffset = offset.toFixed(2);
      }

      // Progress bars
      if (meterOverlap) {
        meterOverlap.style.width = Math.min(Math.max(data.scores.word_overlap, 0), 100) + "%";
      }
      if (meterCovA) {
        meterCovA.style.width = Math.min(Math.max(data.scores.coverage_a, 0), 100) + "%";
      }
      if (meterCovB) {
        meterCovB.style.width = Math.min(Math.max(data.scores.coverage_b, 0), 100) + "%";
      }

      // Render Charts
      renderCharts(data.scores, data.stats);

      // Populate statistics table
      updateStatsTable(data.stats);

      // Render highlighted side-by-side views
      renderHighlightedText(docAView, textA, data.passages_a);
      renderHighlightedText(docBView, textB, data.passages_b);

      // Render matched passages
      renderPassagesList(passagesList, data.passages_a);

      // Reveal results
      resultsSection.hidden = false;
      resultsSection.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      showError("Network error or failed to reach the server.");
    } finally {
      compareBtn.disabled = false;
      compareBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Compare Documents
      `;
    }
  });

  // Animated Sun / Moon Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("texttrace-theme", theme);
    } catch (e) {}

    // Update chart colors if charts are currently visible
    if (metricsChartInstance) {
      const isDark = theme === "dark";
      metricsChartInstance.options.scales.y.grid.color = isDark ? "#243147" : "#f1f5f9";
      metricsChartInstance.options.scales.y.ticks.color = isDark ? "#94a3b8" : "#64748b";
      metricsChartInstance.options.scales.x.ticks.color = isDark ? "#cbd5e1" : "#334155";
      metricsChartInstance.update();
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });

    try {
      const savedTheme = localStorage.getItem("texttrace-theme");
      if (savedTheme) {
        applyTheme(savedTheme);
      }
    } catch (e) {}
  }

  // ========================================================
  // Interactive Algorithm Visualizer (IAA - Analysis of Algorithms)
  // ========================================================

  // 1. Rabin-Karp Rolling Hash Simulation Engine
  const rkTokens = [
    "many", "students", "prefer", "this", "approach",
    "a", "hash", "map", "stores", "key",
    "value", "pairs", "so", "that"
  ];
  // Modulo M = 1,000,000,007; Base B = 131; Multiplier 31
  const rkHashes = [
    329139701, 750574890, 643355478, 39509098, 307557335,
    185578863, 212333653, 426615122, 526040649, 547263125
  ];
  const rkMatchIndex = 5; // Phrase: "a hash map stores key" matches Target Hash 185,578,863

  const simStream = document.getElementById("sim-stream");
  const simPlayBtn = document.getElementById("sim-play-btn");
  const simStepBtn = document.getElementById("sim-step-btn");
  const simResetBtn = document.getElementById("sim-reset-btn");
  const simWindowText = document.getElementById("sim-window-text");
  const simHashVal = document.getElementById("sim-hash-val");
  const simStatus = document.getElementById("sim-status");
  const simTargetVal = document.getElementById("sim-target-val");
  const algoVizToggle = document.getElementById("algo-viz-toggle");
  const algoVizSection = document.getElementById("algo-viz-section");

  let rkIndex = 0;
  let rkInterval = null;

  function initRabinKarpVisualizer() {
    if (!simStream) return;
    simStream.innerHTML = rkTokens
      .map(
        (word, idx) => `
        <div class="sim-token-item" id="rk-token-${idx}">
          <span class="tok-idx">[${idx}]</span>
          <span class="tok-word">${word}</span>
        </div>
      `
      )
      .join("");

    if (simTargetVal) {
      simTargetVal.textContent = "185,578,863";
    }

    updateRabinKarpView(0);
  }

  function updateRabinKarpView(idx) {
    if (!simStream) return;

    // Reset styles on all tokens
    for (let i = 0; i < rkTokens.length; i++) {
      const tok = document.getElementById(`rk-token-${i}`);
      if (tok) {
        tok.classList.remove("in-window", "is-match");
      }
    }

    // Highlight current 5-token window
    const isMatch = idx === rkMatchIndex;
    for (let j = idx; j < idx + 5 && j < rkTokens.length; j++) {
      const tok = document.getElementById(`rk-token-${j}`);
      if (tok) {
        tok.classList.add("in-window");
        if (isMatch) {
          tok.classList.add("is-match");
        }
      }
    }

    // Update Math readout
    const currentSlice = rkTokens.slice(idx, idx + 5);
    const windowPhrase = `"${currentSlice.join(" ")}"`;
    if (simWindowText) simWindowText.textContent = windowPhrase;

    const currentHash = rkHashes[idx] || 0;
    if (simHashVal) {
      if (idx === 0) {
        simHashVal.textContent = `${currentHash.toLocaleString()} (Initial Polynomial)`;
      } else {
        simHashVal.textContent = `${currentHash.toLocaleString()} (O(1) Rolling Update)`;
      }
    }

    if (simStatus) {
      if (isMatch) {
        simStatus.className = "math-status match";
        simStatus.textContent = "\u2705 MATCH FOUND! Verified in O(1) time via HashMap";
      } else {
        simStatus.className = "math-status";
        simStatus.textContent = "Scanning... No HashMap match at current window";
      }
    }

    // Keep active token centered in stream
    const activeTok = document.getElementById(`rk-token-${idx}`);
    if (activeTok && simStream.parentElement) {
      const parent = simStream.parentElement;
      const tokLeft = activeTok.offsetLeft;
      parent.scrollTo({
        left: Math.max(0, tokLeft - parent.clientWidth / 2 + 36),
        behavior: "smooth",
      });
    }
  }

  function toggleRabinKarpPlay() {
    if (rkInterval) {
      // Pause
      clearInterval(rkInterval);
      rkInterval = null;
      if (simPlayBtn) {
        simPlayBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Play</span>
        `;
      }
    } else {
      // Start auto-stepping
      if (simPlayBtn) {
        simPlayBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>Pause</span>
        `;
      }
      rkInterval = setInterval(() => {
        rkIndex = (rkIndex + 1) % rkHashes.length;
        updateRabinKarpView(rkIndex);
      }, 1000);
    }
  }

  if (simPlayBtn) simPlayBtn.addEventListener("click", toggleRabinKarpPlay);

  if (simStepBtn) {
    simStepBtn.addEventListener("click", () => {
      if (rkInterval) toggleRabinKarpPlay();
      rkIndex = (rkIndex + 1) % rkHashes.length;
      updateRabinKarpView(rkIndex);
    });
  }

  if (simResetBtn) {
    simResetBtn.addEventListener("click", () => {
      if (rkInterval) toggleRabinKarpPlay();
      rkIndex = 0;
      updateRabinKarpView(0);
    });
  }

  // 2. Merge Sort Divide & Conquer Visualizer
  const simSortBtn = document.getElementById("sim-sort-btn");
  const sortVisualContainer = document.getElementById("sort-visual-container");

  const mergeSortSteps = [
    {
      label: "Initial Passages",
      sub: "Unsorted matched passages discovered by Rabin-Karp",
      groups: [[4, 15, 2, 8, 6]],
      sortedGroup: -1,
      final: false,
    },
    {
      label: "Divide (Level 1)",
      sub: "Split at mid = len // 2 -> Recurrence: T(n) = 2T(n/2) + O(n)",
      groups: [[4, 15], [2, 8, 6]],
      sortedGroup: -1,
      final: false,
    },
    {
      label: "Divide (Level 2)",
      sub: "Sub-arrays reduced to base atomic elements (length 1)",
      groups: [[4], [15], [2], [8, 6]],
      sortedGroup: -1,
      final: false,
    },
    {
      label: "Conquer & Merge 1",
      sub: "Merge pairs: 15 >= 4 -> [15, 4]; 8 >= 6 -> [8, 6]",
      groups: [[15, 4], [2], [8, 6]],
      sortedGroup: 0,
      final: false,
    },
    {
      label: "Conquer & Merge 2",
      sub: "Merge [2] and [8, 6] -> [8, 6, 2]",
      groups: [[15, 4], [8, 6, 2]],
      sortedGroup: 1,
      final: false,
    },
    {
      label: "Final Merge",
      sub: "Two-pointer merge in descending order: 15 >= 8, 8 >= 6, 6 >= 4, 4 >= 2",
      groups: [[15, 8, 6, 4, 2]],
      sortedGroup: 0,
      final: true,
    },
  ];

  function renderMergeSortStepRow(step) {
    const row = document.createElement("div");
    row.className = "sort-step-row";

    const label = document.createElement("div");
    label.className = "sort-step-label";
    label.innerHTML = `<strong>${step.label}</strong><br><span style="font-size:10px;font-weight:normal;color:var(--muted-text);">${step.sub}</span>`;

    const bars = document.createElement("div");
    bars.className = "sort-bars";

    step.groups.forEach((grp, gIdx) => {
      const grpWrap = document.createElement("div");
      grpWrap.style.display = "inline-flex";
      grpWrap.style.gap = "6px";
      grpWrap.style.padding = "3px 6px";
      grpWrap.style.borderRadius = "6px";
      grpWrap.style.backgroundColor =
        step.final || gIdx === step.sortedGroup
          ? "rgba(239, 68, 68, 0.08)"
          : "transparent";

      grp.forEach((val) => {
        const bar = document.createElement("span");
        bar.className = "sort-bar" + (step.final || gIdx === step.sortedGroup ? " sorted" : "");
        bar.textContent = `${val} words`;
        grpWrap.appendChild(bar);
      });
      bars.appendChild(grpWrap);
    });

    row.appendChild(label);
    row.appendChild(bars);
    return row;
  }

  function initMergeSortView() {
    if (!sortVisualContainer) return;
    sortVisualContainer.innerHTML = "";
    // Show initial unsorted row
    const row = renderMergeSortStepRow(mergeSortSteps[0]);
    sortVisualContainer.appendChild(row);
  }

  let isSortRunning = false;
  async function runMergeSortAnimation() {
    if (isSortRunning || !sortVisualContainer || !simSortBtn) return;
    isSortRunning = true;
    simSortBtn.disabled = true;
    simSortBtn.textContent = "Sorting in O(P log P)...";
    sortVisualContainer.innerHTML = "";

    for (let i = 0; i < mergeSortSteps.length; i++) {
      const step = mergeSortSteps[i];
      const row = renderMergeSortStepRow(step);
      row.style.opacity = "0";
      row.style.transform = "translateY(8px)";
      row.style.transition = "all 0.35s ease";

      sortVisualContainer.appendChild(row);

      // Smooth fade-in
      await new Promise((resolve) => setTimeout(resolve, 40));
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";

      // Step pause
      await new Promise((resolve) => setTimeout(resolve, 650));
    }

    simSortBtn.disabled = false;
    simSortBtn.textContent = "Replay Merge Sort";
    isSortRunning = false;
  }

  if (simSortBtn) {
    simSortBtn.addEventListener("click", runMergeSortAnimation);
  }

  // 3. Visualizer Tabs & Scroll Toggle
  const vizTabBtns = document.querySelectorAll(".viz-tab-btn");
  const vizTabContents = document.querySelectorAll(".viz-tab-content");

  vizTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      vizTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      vizTabContents.forEach((content) => {
        if (content.id === targetId) {
          content.hidden = false;
          content.classList.add("active");
        } else {
          content.hidden = true;
          content.classList.remove("active");
        }
      });
    });
  });

  if (algoVizToggle && algoVizSection) {
    algoVizToggle.addEventListener("click", () => {
      algoVizSection.scrollIntoView({ behavior: "smooth" });
      algoVizSection.style.borderColor = "var(--primary-red)";
      setTimeout(() => {
        algoVizSection.style.borderColor = "";
      }, 1500);
    });
  }

  // Initialize Visualizers
  initRabinKarpVisualizer();
  initMergeSortView();

  // Initial count calculation
  updateCounts();
});
