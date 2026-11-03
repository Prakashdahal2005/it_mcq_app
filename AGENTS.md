# Workspace guide

## App layout

- `index.html` is the browser app: markup, styles, state, question flows, flashcards, exports, and mocks live in its inline script. Use its `AGENT NAVIGATION` comment and section headings to find the relevant behavior.
- `cloud-sync.js` normalizes, merges, and syncs app state; `api/state.js` is the Vercel state endpoint.
- `question_bank.json` is bundled question data. Avoid editing it for UI or behavior changes.

## Feature map

Search `index.html` for the named section or function; line numbers are intentionally omitted because they shift.

| Change area | Start here | Also trace |
|---|---|---|
| Stored state, load/save, migrations | `Core State`, `save()`, `load()` | `AppState`, `cloud-sync.js` |
| Question identity, edits, deletion, source links | `questionUid()`, `openQuestionEditorForQuestion()`, `deleteQuestionByQ()` | `applyQuestionOverridesEverywhere()`, `syncFlashcardSourceLinks()`, `cloud-sync.js` |
| MCQ/TF/free-response presentation and grading | `Question Screen & Presentation`, `prepareQuestionForDisplay()`, `pick()` | `showTypedAnswerPanel()`, `submitFreeResponse()`, `freeResponseGrade()`, `sr()` |
| Spaced repetition and weak-topic/readiness decisions | `Spaced Repetition, Deadline & Locked-In Logic`, `sr()`, `buildTodaySession()`, `readinessStats()` | `milestoneSubjectSignals()`, `recordFixDay()` |
| Flashcard creation, links, review, and ratings | `PHASE 5`, `generateConceptCardData()`, `saveConceptCard()`, `findSourceQuestionForCard()`, `renderFlashcardView()`, `rateCard()` | MCQ feedback in `pick()`, `CARD_TOMBSTONES`, `cloud-sync.js` |
| Timed and weekly mocks | `weeklyMockStatus()`, `mock()`, `mockEnd()` | `WEEKLY_MOCK`, `persistMockState()` |
| Bank import, backups, and exports | `Import & Bank Handling`, `Backup & Persistence`, `exportLog()` | `restore()`, `cloud-sync.js` |
| Settings and AI configuration | `Settings`, `saveSettings()` | Gemini request helpers and local storage |

## Safe-change rules

- Keep changes surgical. Do not reformat or split the inline script as part of an unrelated feature.
- Before changing persisted state, trace its initialization, `save()`/`load()`, backup normalization, and cloud merge. Preserve old records and support missing fields.
- Question and card deletion use tombstones; preserve those markers so synced devices do not resurrect deleted items.
- Question copies can exist in the active set, banks, drills, mocks, and attempt history. Prefer stable question identity over array position or question number when updating them.
- Keep quiz feedback, flashcard links, review scheduling, and session navigation consistent when changing a shared flow.
- Run the smallest relevant validation available. `package.json` defines `npm run dev` but no test, lint, or build script; do not claim a test suite ran if none is configured.
