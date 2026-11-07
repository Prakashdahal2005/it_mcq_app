# Recall — IT MCQ Trainer

Recall is a browser-based study app for the TU IOST MIT entrance exam. The interface and most application logic live in `index.html`; the app supports offline use through a service worker and stores study progress in browser storage.

## Project files

- `index.html` — app UI and inline logic: question presentation, answer grading, spaced repetition, daily sessions, mocks, flashcards, settings, imports, backups, and exports.
- `question_bank.json` — bundled question bank and metadata.
- `cloud-sync.js` — client-side state normalization, merging, and optional cloud synchronization.
- `api/state.js` — Vercel API endpoint for cloud state, backed by Upstash Redis.
- `sw.js`, `manifest.json`, `favicon.png`, `pwa-icon.png` — progressive web app and offline assets.
- `MIT_Entrance_Scope_Guide.md` — canonical human-readable guide with exam strategy, study plan, recall webs, and question-generation rules.
- `mit_entrance_syllabus.json` — structured syllabus source for syllabus-driven coverage and explicit topic-level practice tracking in the app.
- `package.json`, `package-lock.json` — Node tooling metadata and the Redis client dependency.

## State and synchronization

Study data is saved locally in the browser. Cloud sync is optional and uses the API in `api/state.js`; it requires Upstash Redis environment variables. An app passcode can be configured through `APP_SECRET` or `SYNC_SECRET`. Keep local environment files such as `.env.local` private and out of version control.

The app and cloud sync both normalize and merge existing state. When changing persisted data, preserve older records and check initialization, save/load, backup/restore, and cloud merge paths. Question and flashcard deletion markers prevent deleted items from reappearing after sync.

## Local development

Install dependencies with `npm install`, then run `npm run dev`. The script uses the Vercel CLI (`vercel dev`), which must be available in the development environment. Local study features do not require Redis; cloud sync does.

There is no configured test, lint, or build script in `package.json`.

## Maintenance notes

- Follow the `AGENT NAVIGATION` comment and section headings in `index.html` to find related behavior.
- Keep behavior changes focused; the main app is intentionally not split into modules.
- Treat `node_modules/` as generated local dependencies. It is ignored by Git and can be restored from `package-lock.json`.
- Do not commit credentials or `.env.local`.
