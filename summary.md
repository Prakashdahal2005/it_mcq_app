# MCQ Trainer — Complete Behavior, Architecture & Session Log

## 1. Purpose and Boundaries

`mcq_trainer.html` is a single-file, zero-dependency, offline-capable browser-based study trainer for the **TU IOST MIT entrance exam**. All progress, history, spaced-repetition intervals, bank archives, and settings persist in browser `localStorage`. No server, no account, no CDN needed.

---

## 2. Evidence-Based Core Mechanics

### 2.1 Single "Today's Session" Hub
- Primary action: **12–15 minute interleaved session** (due items → weakest calibrated subject → fresh items).
- Interleaving is automatic; single-subject blocked drills are only accessible via "More Study Modes".
- Session opens with 2 sure-wins and closes on a win (motivation bookends).

### 2.2 Latency-Based Confidence Inference (Zero Button Friction)

`getTimingConfidence(rawQ, elapsedSec)` — **Oct 18 patch**:

| Condition | Threshold | Result |
|---|---|---|
| Any question, elapsed < 2.0s | Floor | Guess (1) — pure reflex, not retrieval |
| Conceptual/factual | < 5.5s + readingBuffer | Confident (3) |
| Conceptual/factual | 5.5s – 12.0s + readingBuffer | Unsure (2) |
| Conceptual/factual | > 12.0s + readingBuffer | Guess (1) |
| Calc/trace (quick=false, has code, or tag C/T/P) | < 18s + readingBuffer | Confident (3) |
| Calc/trace | 18s – 38s + readingBuffer | Unsure (2) |
| Calc/trace | > 38s + readingBuffer | Guess (1) |

- `readingBuffer = min(6, max(0, (wordCount - 25) * 0.1))` — longer stems get more time.
- Timer `T0` starts **at render** for new questions and is **reset when the recall gate lifts** for review items — the 3s gate never inflates your latency clock.

### 2.3 No Silent Skips / No Silent Corrects
- "Skip" replaced by **"Don't know"** — reveals answer, schedules tomorrow.
- Correct + Unsure latency: brief explanation pause (discrepancy effect).
- Correct + Slow latency (Guess): pause + explanation + scheduled as tomorrow.

### 2.4 Option Shuffling with Pinned Retention
- Options A-D shuffled on every presentation.
- "All of the above", "None of the above", "Both A and B" etc. detected by regex and pinned to their original position(s).

### 2.5 Recall-First Gate (Review Items Only)
- 3-second overlay forces active retrieval before answer choices appear.
- Auto-reveals after 3s, or on any keypress/click.
- **T0 is reset at reveal time** so latency is measured only from when options became visible.

### 2.6 Deadline-Aware Dynamic Spacing

- `EXAM_DATE` defaults to **2026-11-30** (fixed in Oct 18 patch; was previously "+50 days from now", which was silently wrong).
- Editable at any time via ⚙ Settings or the clickable chip on the dashboard.
- Interval cap formula: `max(1, round(daysLeft * 0.22))`.
  - Sweep phase (≤10 days): cap 2 days.
  - Final phase (≤2 days): cap 1 day.
- Confident-wrong items re-tested at +1 and +3 days (`confWrongRetest`).

### 2.7 AI Variant Engine — Safer Architecture (Oct 18 patch)

**Previous behavior:** Overwrote `q.q / q.o / q.a` directly in-place for all missed/slow questions.

**New behavior — 5 hard safety rules:**

1. **Regeneratable items only.** The bank's explicit `regeneratable` flag controls current questions; legacy imported questions without the flag use the older calc/code/tag fallback. The quick flag is separate: a mental-math question can be quick and still regeneratable.
2. **Original never overwritten.** Variant stored in `q._variant` as a separate object. The original `q.q / q.o / q.a` remain untouched forever.
3. **Dual blind-solve validation.** Two sequential Gemini API calls:
   - Call 1: Generate variant with changed numbers/variables.
   - Call 2: Blind re-solve (variant stem + options only, answer index withheld). If both calls agree on the same answer index, the variant is accepted. If they disagree, it is silently discarded and logged to console.
4. **One-tap delete.** Question header shows a "✕ Variant wrong" button (red, confirm-guarded) whenever `q._variant` exists. Deletes the variant immediately and saves.
5. **Toggle.** "↺ View original question" / "✨ View AI variant" button toggles `q._useOriginal` and re-renders. State persisted in localStorage.

`prepareQuestionForDisplay()` automatically serves `q._variant` as the active source when present and `_useOriginal` is not set — transparent to the rest of the app.

### 2.8 Commute Quick Drill — Explicit Per-Question Flags

The bundled `question_bank.json` provides `quick` and `regeneratable` booleans for each question. `quick` means it can be attempted casually without pen-and-paper work; `regeneratable` means its values or code can be varied without changing the underlying concept. These flags are independent.

For imports without an explicit `quick` value, `isQuickQuestion` falls back to:

| Priority | Check | Result |
|---|---|---|
| 1 | Explicit `quick: true/false` flag | Honoured directly |
| 2 | `q.code` exists | Paper (quick=false) |
| 3 | Tag `q.t` contains C, T, or P | Paper (quick=false) |
| 4 | Keyword regex scan on stem + subject | Paper (quick=false) |
| 5 | Default | Commute-safe (quick=true) |

Regex keywords include: `binary`, `hexadecimal`, `2's complement`, `overflow`, `k-map`, `subnet`, `/24`, `/27`, `crc`, `postfix`, `prefix`, `kruskal`, `dijkstra`, `matrix`, `determinant`, `eigenvalue`, `derivative`, `integral`, `bresenham`, `turnaround time`, `page fault`, numeric arithmetic patterns, etc.

### 2.9 Default Bank and Backup Merge

- `question_bank.json` is loaded and selected automatically when the app opens without an active set; it is also cached for offline use after first load.
- Re-importing questions with matching subject-scoped IDs updates their latest content and flags while retaining questions not present in the import.
- Progress-backup imports merge study history and archives, keep the imported backup's active set, and prefer its version of matching question IDs rather than replacing all local data.

### 2.10 Leech Handling

- After **3 misses**: item flagged `v.leech = true`, prompts own-words mnemonic input instead of looping immediately.
- **Max 3 leeches per session** enforced in `buildTodaySession` — prevents a single session from being dominated by stuck items.

---

## 3. Readiness Meter — Honest Score Projection (Oct 18 patch)

**Old:** Average raw accuracy across calibrated subjects (memory-inflated by repeat practice).

**New — strict first-attempt + mock weighting:**

| Available data | Projection formula |
|---|---|
| Timed mock (>=10 Q) + first-attempt (>=10 Q) | 0.60 * mockAcc + 0.40 * firstAttemptAcc |
| Timed mock only (>=10 Q) | mockAcc |
| First-attempt only | firstAttemptAcc |
| Nothing adequate | Calibrated subject average (fallback) |

- Mock attempts logged with `mock: 1` in `L[]`.
- Repeat accuracy shown as a separate labeled chip — clearly flagged as memory-inflated, not used in the projection.
- Subjects need >=8 attempts before status labels (Calibrating / Needs focus / Getting there / On target) appear.

---

## 4. Session Composition (`buildTodaySession`)

1. Open with 2 sure-wins (non-due, previously answered confidently).
2. Due spaced-review items — leeches capped at 3 per session.
3. Up to 3 items from the weakest calibrated subject (<60%).
4. Fresh unattempted items.
5. Filler to reach target question count.
6. End on a win (1 sure-win or unseen item).
7. Middle positions randomly interleaved to prevent blocked-subject clustering.

---

## 5. Exam Date & Settings

- Default `EXAM_DATE = '2026-10-31'` (hardcoded in `getDaysLeft()` if unset).
- Dashboard: "🎯 Exam in N days (cap: Xd) ✎" chip — click to open Settings.
- Settings page: date picker + Gemini API key field.
- Changing the exam date re-runs the entire spacing engine on next session.

---

## 6. File Inventory

| File | Role |
|---|---|
| `index.html` | Trainer interface, session logic, local progress, and backup import/export. |
| `cloud-sync.js` | Upstash Redis cloud sync and conflict-aware question/progress merging. |
| `api/state.js` | Vercel Serverless Function interfacing with Upstash Redis (GET/POST with optional APP_SECRET lock). |
| `question_bank.json` | Bundled question bank with quick and regeneratable flags. |
| `sw.js` | Offline cache and application-shell updates. |
| `summary.md` | This document. Authoritative reference. |
| `MIT_Entrance_Master_Guide_and_Syllabus.md` | Syllabus, formula sheets, exam blueprint. |

---

## 7. Patch History

| Date | Change |
|---|---|
| Pre Oct-18 | Core app: spaced repetition, Today button, latency confidence, leech handling, commute drill, option shuffle, recall gate, mock exam, backup nudge. |
| Oct 18 Session 1 | 4-layer `isQuickQuestion` auto-classifier, background AI variant generation, `_orig` preservation with toggle, subject name normalization (`canonSubj`), 0-attempt row filtering, readiness meter calibration. |
| Oct 18 Session 2 | Safety patch: AI rewrites restricted to calc/trace only; dual blind-solve validation; `_variant` stored separately (original never overwritten); one-tap delete; 2s confidence floor; calc/trace thresholds corrected (18s/38s + reading buffer); `T0` reset when recall gate lifts; `EXAM_DATE` defaulted to `2026-10-31`; readiness projection based on first-attempt + mock scores; leech session cap (max 3). |
| Oct 26 | Bundled `question_bank.json` loads by default; every question has independent quick/regeneratable flags; duplicate bank imports update matching subject-scoped IDs; backup imports merge history and prefer the imported active set. |
| Oct 28 | Comprehensive MIT Scope Guide & Architecture Upgrade: 14 Pure JS local calculation generators (`CALC_FAMILIES`); FSRS-4.5 spaced repetition with retrievability target 87%, lucky-guess penalty, and deadline interval capping; Dual-model AI variant engine (`gemini-2.0-flash-lite` generator + `gemini-3.8-flash` blind validator) with zero-quota GET connection tester; Full/Half/Diagnostic timed mock engine with persistent reload-safe timer; Calibrated 19-subject readiness meter (Red ≤40%, Amber 41–79%, Green ≥80%, Gray <5) with 1-tap whole-bank subject drills; 7-step Milestones ladder (M1–M7); Spaced flashcard system (`CARDS`) with daily cap and stuck-concept rescue ladder (Rungs 1–4); Memory anchor/mnemonic chips; Calm session recap card with recovery tracking (`↑ N recovered`); 25+ entry Curated Resource Library with anti-spam cooldown; Quiet Mode; Schema v2 with pre-migration safety backup and Google Drive sync merge. |

---

## 8. Current Architecture & Verified Safety Rules (Oct 28 Patch)

1. **FSRS-4.5 Spaced Repetition**: Target retrievability 87%. Grades: 1 = miss/guess/lucky-guess, 2 = unsure, 3 = confident (≥15s), 4 = confident (<15s). Wrong at confidence 3 gets top priority in due queue (+10000). Deadlines capped dynamically so all active items are reviewed within the final 2 weeks before exam date.
2. **14 Pure JS Calculation Generators (`CALC_FAMILIES`)**: `OS-01` (page bits), `OS-02` (FCFS vs SJF wait time), `DL-01` (Mod-N flip-flops), `DL-02` (2's complement range), `MP-01` (pipeline cycles), `DSA-01` (bubble sort inversions), `DSA-02` (infix to postfix), `LA-01` (matrix det), `STAT-01` (shift/scale expectation & variance), `CAL-01` (limits), `CN-01` (IPv4 class 0–127 & mask), `SE-01` (alpha/beta/verification/validation), `DBMS-01` (normal forms 1NF–BCNF), `AI-01` (Greedy Best-First vs A*). Works 100% offline with scalar avoid list (`_pastValues`).
3. **Dual-Blind AI Generation**: Generator model `gemini-2.0-flash-lite`, blind-solver model `gemini-3.8-flash`. Single-pass unverified variants display an `unverified` pill. Student can quarantine any question with `"🚩 Looks wrong"`.
4. **Zero-Quota Test Connection**: Validates API Studio key and model readiness via `GET https://generativelanguage.googleapis.com/v1beta/models/{model}` without burning token quota.
5. **Session Navigation & History**: Full back (`B`) and forward (`N`) navigation with complete option order and locked answer preservation. Practice mode scores first attempt only; mock exam allows free changing until final submission.
6. **Milestones & Diagnostics**: 7-stage guide ladder (M1 Day-1 Diagnostic to M7 Exam Ready). Fix days tracked per subject (`FIX_DAYS[s]`).
7. **Curated Resources & Quiet Mode**: 26 curated interactive resources from Section 10.1 of the guide, suggested only for weak/stuck concepts (<75%), max 1 per session, 14-day cooldown. Quiet Mode hides anxiety metrics and auto-enables 7 days before exam.
8. **Cloud & State Persistence**: Schema version 2 with snapshot backup in `localStorage['bitmcq_backup_pre_v2']` and automatic Google Drive bidirectional sync.
