# Google Drive Sync Integration Plan

## 1. Purpose

Add Google Drive backup and synchronization to the IT MCQ Trainer so question
banks and study progress can be recovered after browser/site data is cleared
and kept in sync across the user's devices.

The core safety requirement is:

> An empty, reset, stale, or otherwise suspicious local browser state must never
> silently replace a populated Google Drive backup or erase its recovery data.

Normal additions and progress updates should sync with as little friction as
possible. Destructive changes, especially large question deletions, must be
detected, explained, and explicitly reviewed before they can reach Drive.

This plan uses Google Drive as storage for versioned JSON backups. It does not
create or edit a Google Docs document.

## 2. Existing App and Reference Implementation

### IT MCQ Trainer

- The app is currently a single-page HTML application in `index.html`.
- App state is persisted as one JSON object in `localStorage` under `bitmcq1`.
- The persisted state includes the active deck and answers, history and
  review data, question banks, current bank/set selection, and preferences.
- The existing downloadable JSON backup already serializes most persisted
  state. It is the best starting point for defining the contents of a cloud
  backup.
- The app has no Drive/OAuth integration or sync UI yet.
- Question import can add question banks, replace the active question set, and
  derive balanced sets from a bank. Sync must preserve the full stored bank,
  not only the currently active set.

### Quizzium

Quizzium contains a browser-only Google Drive implementation in
`C:/xampp/htdocs/quizzium/core/drive-sync.js`. It demonstrates useful patterns:

- Google Identity Services token-client authentication.
- Drive API JSON upload and download.
- Debounced upload after local data changes.
- Retrying pending work and syncing when the app becomes visible.
- A settings/status panel with connect, sync-now, and disconnect controls.

The implementation should reuse these patterns only where appropriate. Its
backup payload, merge rules, tombstones, and chapter-specific behavior are not
appropriate to copy directly into the MCQ app. In particular, its current
single-file overwrite and merge flow is not a sufficient defense against a
cleared local browser overwriting Drive.

## 3. Goals and Non-Goals

### Goals

1. Recover local app state from Drive after site data has been cleared.
2. Keep the backup current after ordinary changes without asking the user to
   press Sync each time.
3. Support an explicit manual sync and a visible sync status.
4. Merge compatible changes from multiple devices without dropping questions
   or progress.
5. Detect and block accidental bulk deletions before they reach Drive.
6. Preserve recoverable prior versions before a user approves a destructive
   update.
7. Keep the existing local-only workflow and downloadable JSON backup working
   for users who do not configure Drive.

### Non-goals

- Creating a Google Docs document or using the Docs API.
- Providing a server-side service or storing OAuth secrets in this static app.
- Promising synchronization while the browser is completely closed.
- Automatically choosing a winner when two devices make incompatible edits to
  the same question or change the same question bank independently.
- Automatically deleting old recovery snapshots.

## 4. Safety Principles

1. **Local emptiness is not intent.** A missing or empty `bitmcq1` entry is
   treated as a possible browser-data reset, not as an instruction to empty
   Drive.
2. **Remote absence is not the same as remote failure.** A confirmed Drive
   response containing no app backup may permit first-time setup; a network,
   auth, permission, or parsing error must never be treated as “no backup.”
3. **Additive changes can sync automatically.** New questions, ordinary
   progress changes, and non-destructive edits can be backed up without
   confirmation, after the merge and validation rules pass.
4. **Deletions are explicit changes.** Track deletion intent against the last
   trusted synchronized inventory; do not infer intentional deletion solely
   because an item is absent from local browser storage.
5. **A large deletion pauses sync.** More than 100 questions removed on the
   same local calendar date blocks the destructive update and requests review.
6. **Use additional anomaly checks.** A deletion count at or below 100 must
   still be blocked when the change looks like accidental total loss (for
   example, a populated bank suddenly becomes empty).
7. **Never destroy the last known-good copy.** Before an approved destructive
   update, retain an independently addressable, dated Drive snapshot of the
   previous backup. Never automatically delete these snapshots.
8. **Errors must be visible.** Failed, blocked, or pending sync must not be
   represented as a successful sync.
9. **Protect synchronization metadata independently.** Store the last known
   remote revision and question inventory separately from the main app payload
   where feasible, so replacing/importing app state cannot silently erase the
   evidence needed to detect data loss.

## 5. Proposed Components

### 5.1 Drive sync module

Add a small module (for example, `drive-sync.js`) loaded by the existing HTML
page. Keep Drive-specific concerns out of question parsing and quiz rendering.
The module should own:

- OAuth token-client initialization and access-token lifecycle.
- Drive API requests and app-backup file discovery.
- Local persistence of sync configuration and metadata.
- Backup envelope validation and migration.
- Upload/download orchestration and retry state.
- Merge/deletion analysis results used by the UI.

The module should expose a narrow interface to the existing app, such as:

- Initialize and inspect sync status.
- Connect or disconnect an account.
- Read a candidate remote backup.
- Build the local backup payload.
- Plan a merge without applying it.
- Apply an approved restore/merge.
- Queue a safe background sync.
- Run an explicit user-requested sync.

Exact function names can be chosen during implementation to match the existing
single-file app style. Avoid duplicating parsing, storage, or merge logic in
button handlers.

### 5.2 Sync settings and status UI

Add a Google Drive section to the existing Settings screen. It should show:

- Whether Drive sync is configured and connected.
- Last successful sync time.
- Whether a sync is queued, currently running, waiting for network/auth, or
  blocked for deletion review.
- The number of local changes not yet synchronized, when known.
- Connect, Sync now, and Disconnect actions.
- OAuth client ID setup instructions and the exact authorized origin required.
- A short statement that Drive sync is best-effort while the app is open and
  that downloadable backups remain available.

The UI must explain recovery and deletion prompts in plain language. Do not show
a generic “Synced” success status after only saving locally or after a failed
Drive request.

### 5.3 Local sync metadata

Keep sync metadata separate from the main `bitmcq1` application payload, using
another localStorage key or IndexedDB if the metadata warrants transactional
updates. Candidate metadata:

- Schema version.
- Stable local device identifier.
- Most recent successful Drive file ID and remote revision/ETag.
- Timestamp of last successful download and upload.
- Last trusted remote question inventory or its stable-ID manifest.
- Pending local deletion records with timestamps and origin.
- Pending sync/error state.
- A journal of the last known-good backup revision.

Do not store an access token in localStorage. Keep token handling in memory or
in the same browser-managed IndexedDB approach used by Quizzium, and treat it
as a short-lived credential. Reconnection must be possible if the token expires
or browser storage is partially cleared.

## 6. Backup Format

Create a versioned JSON envelope rather than uploading the raw `bitmcq1` value:

```json
{
  "format": "it-mcq-trainer-backup",
  "schemaVersion": 1,
  "backupId": "stable-backup-id",
  "revision": 12,
  "createdAt": "2026-10-18T12:00:00.000Z",
  "updatedAt": "2026-10-18T12:05:00.000Z",
  "deviceId": "local-device-id",
  "questionManifest": {
    "question-id-1": {
      "bankId": 1,
      "contentHash": "hash"
    }
  },
  "appState": {
    "D": [],
    "R": {},
    "W": {},
    "Q": [],
    "P": 0,
    "S": 1,
    "A": [],
    "L": [],
    "V": {},
    "BANKS": [],
    "SETBANK": null,
    "SETI": -1,
    "EXAM_DATE": "",
    "lastBackup": 0,
    "gemVars": [],
    "todayMins": 15
  }
}
```

The example is illustrative; implementation must confirm every persisted field
in the current `save()` and manual backup code and keep the cloud payload in
step with them. The Gemini API key is stored separately from the main state and
should not be included in the Drive backup unless a separate, explicit security
decision is made. Default to excluding credentials and secrets.

Requirements for the envelope:

- Reject an unsupported format or future schema version without overwriting
  local or remote data.
- Provide a migration path for known earlier backup formats.
- Validate arrays, records, question fields, and size limits before applying a
  downloaded backup.
- Include a stable question manifest so deletion counts are calculated from a
  trusted prior inventory, not from active-set numbering.
- Record revision and timestamps for comparison and diagnostics, but do not
  treat device clocks as sufficient proof of which state is correct.
- Keep the old downloadable JSON export importable; support both its current
  shape and the new envelope.

## 7. Stable Question Identity and Change Accounting

The app currently uses question numbers and may receive imported questions
without stable IDs. Numbers are not safe identifiers because imported sets,
bank splitting, and active-set selection can reorder or renumber questions.

Implementation steps:

1. Prefer an existing non-empty question ID supplied by a bank or import.
2. For questions with no ID, derive and persist an ID once during a
   deterministic migration. A normalized content hash can seed the ID, but the
   persisted ID must remain stable after later edits.
3. Define whether a bank ID is part of question identity. Prevent identical
   questions in separate banks from unexpectedly collapsing into one item.
4. Build the synced manifest from every retained bank and standalone question
   set, not just the currently active `D`.
5. Compare the manifest with the last trusted synchronized manifest to classify
   additions, edits, and removals.
6. Distinguish an intentional removal (an explicit local action or reviewed
   import replacement) from disappearance caused by a missing/reset local
   database.
7. Keep progress associated with stable question identity where practical.
   Existing progress keyed by per-set question number may require a migration
   or a careful mapping through the bank/set context.

If a trustworthy deletion event cannot be established, classify the missing
question as a deletion candidate and block it for review rather than silently
accepting the removal.

## 8. Merge and Conflict Policy

Sync must compute a merge plan before restoring local state or uploading to
Drive. It should not use a broad “local wins” or “remote wins” rule.

### Safe automatic merge candidates

- Questions present on only one side are retained on both sides.
- Independent progress records for different stable question IDs are combined.
- Append-only attempt/review history is combined by stable event ID where one
  exists; otherwise deduplication must use a documented deterministic key.
- Bank/set additions from one device are retained if no conflicting bank edit
  is detected.
- App settings can use a documented latest-update policy when the setting is
  not safety-critical.

### Conflicts requiring deliberate resolution

- The same stable question ID has different question content on both devices.
- A bank was replaced or renamed differently across devices.
- One side edited a question while the other deliberately deleted it.
- The same progress record has incompatible answers or review state.
- Local state is absent/empty while Drive contains established data.
- The backup is malformed, unsupported, or fails validation.

For a user with only one device, most merges should be automatic. For a
conflict, preserve both versions when possible (for example, create a conflict
copy of a question) and show the conflict rather than discard either version.

Do not base merge correctness solely on `updatedAt`: clocks can be wrong,
multiple devices can be offline, and a new empty local state can have a later
timestamp than the valid cloud backup.

## 9. Deletion Protection

### 9.1 Daily threshold

Count unique, stable question IDs that would be removed from the trusted Drive
inventory by an explicit local change. Use a local calendar date consistently
for the configured browser timezone, and persist the date and deletion events
so a reload does not reset the count.

If the proposed sync would delete more than 100 questions on that date:

1. Do not upload the destructive merged payload.
2. Leave the current Drive backup and its metadata untouched.
3. Set sync status to “Review required.”
4. Show the affected bank names, deletion count, and a preview/list of
   questions where practical.
5. Offer restore-from-Drive, cancel/keep-Drive, and an explicit approval path.
6. If approval is selected, create and verify a recovery snapshot first.
7. Only after the snapshot succeeds, apply the destructive change and upload
   the new revision.
8. If snapshot creation or verification fails, stop and retain the old Drive
   backup.

### 9.2 Additional anti-reset heuristics

The 100-question threshold alone is insufficient. Also block or require
confirmation when:

- A previously non-empty local state is suddenly empty or nearly empty.
- A populated Drive manifest is compared with a missing local state.
- The proposed change removes an unusually large proportion of a bank or the
  entire bank.
- The browser's main app state is missing but sync metadata indicates prior
  local data.
- A new device has no local inventory but encounters an existing Drive backup.
- A client has an older revision than Drive and would replace newer data.

These conditions must prefer restore/merge. They must not be bypassed by an
automatic retry or periodic timer.

### 9.3 Explicit approval semantics

Approval should apply only to the displayed deletion plan and specific remote
revision. If the remote revision changes before approval completes, recompute
the plan and ask again. The button must not mean “ignore all future deletion
warnings.” Record the approval event in local sync metadata and the new backup
revision for traceability.

## 10. Drive File and Snapshot Strategy

Use the narrow Google Drive `drive.file` OAuth scope, following Quizzium's
pattern, if it supports the chosen file-creation and access flow. Only operate
on files created or explicitly opened by this app.

Recommended file layout:

- One canonical backup JSON file, for example
  `it-mcq-trainer-backup.json`.
- Dated or revisioned recovery snapshots created before approved destructive
  updates, for example
  `it-mcq-trainer-backup-2026-10-18-r12.json`.

File handling requirements:

- Persist and use the Drive file ID after initial discovery. Do not select an
  arbitrary file solely because it has the same filename.
- On initial setup, distinguish “query succeeded and no app backup exists”
  from every error state.
- Use Drive ETags/revisions or another conditional update strategy where
  available to detect a second device changing the canonical file between
  download and upload.
- If the remote revision changed during sync, download it again and recompute
  the merge; do not blindly overwrite it.
- Verify a snapshot was successfully created and its content can be read before
  performing a destructive canonical update.
- Never automatically delete recovery snapshots. If storage management is
  added later, make retention visible and obtain explicit user approval before
  pruning.
- Do not delete or trash the canonical file when disconnecting. Disconnect
  revokes/clears local credentials and stops sync; it does not delete cloud
  data.

## 11. Authentication and Setup

1. Add the Google Identity Services client script.
2. Configure a Google OAuth web client outside the application source.
3. Register exact authorized JavaScript origins for each intended deployment
   (localhost development origin and production origin); do not treat the
   `http-server` port or a changed origin as automatically authorized.
4. Collect only the OAuth client ID in the UI. Never embed a client secret in
   HTML/JavaScript.
5. Request authorization synchronously from a user click when required by
   popup/browser restrictions, following Quizzium's approach.
6. Handle expired or revoked tokens clearly. A silent-token failure should
   change status to “Reconnect required”; it must not cause a failed download
   to look like a missing backup.
7. Document that OAuth consent-screen testing status and authorized test users
   can affect who is able to connect.

## 12. Sync Lifecycle

### Startup

1. Load local app data and inspect local sync metadata.
2. Initialize the Drive module without blocking the local-only app.
3. If no Drive connection exists, continue normally and show disconnected
   status only in Settings.
4. If connected and online, inspect the remote state before scheduling any
   upload.
5. If local app data is absent but a remote backup exists, validate and restore
   the remote backup before showing the empty-state import flow.
6. If both local and remote data exist, plan and apply a safe merge, or pause
   for conflicts/deletion review.
7. If Drive is unavailable, preserve local state and mark the operation as
   pending/failed; never initialize an empty remote backup as a side effect of
   that error.

### Local changes

1. Continue to save locally immediately.
2. After a short debounce (for example, two seconds after the last save),
   schedule a sync if connected.
3. Before upload, fetch/check the latest remote revision and calculate a merge
   plan.
4. Block destructive or conflicting plans as specified above.
5. Upload the merged, validated envelope and verify success.
6. Update local last-synced metadata only after a confirmed successful
   response.

### Background opportunities

- Retry pending safe uploads when the browser fires `online`.
- Check for sync when a previously hidden page becomes visible.
- Optionally poll at a modest interval while the page remains open.
- Coalesce multiple local saves into one sync.
- Avoid overlapping sync calls; serialize operations and make retries
  idempotent.
- Never let periodic sync auto-approve a blocked deletion or conflict.

### Manual sync

“Sync now” should force a current remote check, merge, and upload if safe. It
must display a success or a concrete blocked/error state. It should not simply
upload the local object.

### Disconnect

Disconnecting clears local authentication tokens and disables future automatic
sync. It leaves the local app data, configuration instructions, and all Drive
backups/snapshots intact.

## 13. Error Handling and Diagnostics

Classify errors separately:

- Authentication required/revoked.
- Network unavailable or timeout.
- Permission/OAuth-origin failure.
- Drive API quota or server failure.
- Remote backup not found after a successful query.
- Invalid or unsupported backup data.
- Remote revision changed during upload.
- Deletion guard or merge conflict.
- Local storage unavailable/quota exceeded.

For every failure:

- Preserve the last-known-good local state and remote backup.
- Keep pending work only when it can be retried safely.
- Display an accurate status in Settings.
- Log a concise diagnostic suitable for troubleshooting, but do not log access
  tokens, question contents, or credentials.
- Avoid blanket catches that report success or convert API errors into an empty
  backup.

## 14. Rollout and Implementation Phases

### Phase 0 — Confirm behavior and inventory

- Review the current complete app save payload and old downloadable backup
  format.
- Trace every question-bank mutation, set replacement, retake, archive, and
  import operation.
- Decide how question IDs will be introduced and how active-set progress maps
  to stable bank questions.
- Decide what constitutes a deliberate deletion and the local-day timezone
  policy.
- Confirm the intended `http-server` origin and production hosting origin for
  OAuth setup.

**Exit criteria:** data fields and mutation paths are documented; there is a
testable definition of deletion versus reset.

### Phase 1 — Backup envelope and recovery migration

- Add envelope serialization and validation.
- Add migrations from the existing exported backup and legacy `bitmcq1` object.
- Add stable device ID and sync metadata persistence.
- Ensure Gemini credentials remain excluded.
- Add round-trip tests for every app state field.

**Exit criteria:** exporting, parsing, and restoring current-format and legacy
backups preserves app data; invalid input cannot mutate state.

### Phase 2 — Stable identity and change detection

- Add persisted stable IDs to questions without IDs.
- Build the full inventory across banks and standalone sets.
- Record a trusted manifest only after a successful sync.
- Classify additions, edits, explicit deletions, and suspicious disappearance.
- Persist deletion events across reloads.

**Exit criteria:** reordering and renumbering do not appear as mass deletion;
clearing local app data does appear as a reset, not as thousands of deliberate
deletions.

### Phase 3 — Read-only Drive integration and first connection

- Add OAuth client initialization and token lifecycle.
- Add Drive file discovery and read-only backup download.
- Add Settings UI for OAuth Client ID and connection status.
- Validate and preview an existing cloud backup before restoring it.
- Ensure a successful “no file found” response is distinguishable from an API
  error.

**Exit criteria:** existing remote data can be safely read/restored; auth and
network failures never create or overwrite the remote backup.

### Phase 4 — Safe initial backup and snapshots

- Add canonical backup creation only after an explicit safe first-sync
  decision.
- Add dated/revisioned snapshot creation.
- Verify snapshot contents before allowing a destructive update.
- Add remote revision/ETag checks and safe retry behavior.

**Exit criteria:** initial setup cannot mistake Drive failure for a new empty
account; snapshot failure prevents destructive upload.

### Phase 5 — Merge planner and deletion review

- Implement a pure merge-planning step that makes no side effects.
- Add field-aware merge rules for question content, bank metadata, progress,
  and history.
- Add conflict reports and preserve both variants where feasible.
- Add the >100-per-day deletion block and secondary reset/anomaly checks.
- Add approval bound to the exact deletion plan and remote revision.

**Exit criteria:** all risky plans pause before restore/upload; benign additive
changes can merge automatically; tested approval creates a verified snapshot.

### Phase 6 — Automatic sync and UX completion

- Wire local saves to debounced sync.
- Add online, visibility, and modest periodic sync triggers.
- Serialize concurrent sync attempts.
- Add pending/error/reconnect states and Sync now.
- Make disconnect non-destructive and retain manual downloadable backup.

**Exit criteria:** normal edits sync in the background while online; offline
changes retry safely; users can see whether their latest changes reached Drive.

### Phase 7 — Documentation and release

- Document Google Cloud OAuth setup and authorized origins.
- Explain Drive file names, snapshots, recovery behavior, and deletion review.
- Run the full regression and recovery suite.
- Test in the actual deployment origins and browsers intended for use.

**Exit criteria:** deployment setup is reproducible; recovery and deletion
protections have passed the release checklist.

## 15. Verification Plan

### Backup correctness

- Round-trip the complete current app state through envelope serialization.
- Round-trip a legacy downloadable backup.
- Verify question banks, active set, answers, review logs, archived sets,
  variants, preferences, and dates are preserved.
- Verify API keys and access tokens are not present in uploaded JSON.
- Reject malformed JSON, invalid question structures, oversized payloads, and
  unsupported future schema versions without changing local/remote state.

### Recovery from browser-data loss

- Create and sync a populated bank and progress state.
- Clear `bitmcq1` while leaving Drive credentials/metadata intact; startup must
  restore/merge the remote backup rather than upload an empty payload.
- Clear all site data; after reconnecting and authenticating, the app must
  discover and restore Drive data before offering a new empty setup.
- Simulate Drive timeout, 401, 403, 429, and 5xx responses; none may be treated
  as “no backup” or trigger a destructive upload.

### Deletion guard

- Delete 99, 100, and 101 questions on the same local date; the documented
  threshold behavior must be exact (101 blocks).
- Verify additions and edits do not count as deletions.
- Verify reordering and question-number changes do not count as deletions.
- Verify an empty local state versus a populated remote state is blocked even
  if the deletion count is below 101.
- Verify a near-total bank loss is blocked by the secondary anomaly guard.
- Verify a deletion on a new local date does not erase the historical event
  record or bypass anomaly checks.
- Verify a changed remote revision invalidates a previously displayed approval.
- Verify periodic/online sync cannot approve or upload a blocked deletion.

### Snapshot and explicit approval

- Before an approved destructive update, create a prior-version snapshot.
- Read the snapshot back and compare its manifest/content hash with the
  pre-update canonical backup.
- Simulate snapshot creation/verification failure; canonical backup must remain
  untouched.
- Verify disconnect and normal sync never delete snapshots.
- Verify explicit approval applies only to the reviewed plan.

### Multi-device and concurrency

- Device A adds questions while Device B records progress; both changes survive
  merge.
- Both devices add different banks offline; both banks survive synchronization.
- Both devices edit the same question differently; sync pauses or preserves
  both versions instead of silently discarding one.
- Two clients upload from the same base revision; the second detects the
  changed remote revision, downloads again, and recomputes.
- Duplicate retries do not duplicate questions, history events, or snapshots.

### Existing behavior and UX

- App works normally without Google configured.
- Local save/import/export and restore continue to work.
- Repeated saves coalesce into a single upload.
- Offline status and pending work are accurately displayed.
- Token expiry requests reconnection without data loss.
- Sync status is updated only after a successful Drive operation.
- OAuth setup is verified on each intended origin, including localhost with
  port 8080 if that is the development URL.

## 16. Decisions to Confirm During Implementation

These items have sensible proposed defaults but should be made explicit before
coding the sync and deletion semantics:

1. **Daily deletion timezone:** use the browser's local calendar date, captured
   with each deletion event.
2. **Threshold:** block when more than 100 unique questions would be deleted
   in that local date; separately block suspicious near-total losses at any
   count.
3. **Snapshot retention:** retain all pre-destructive snapshots by default and
   never automatically prune them.
4. **Question conflicts:** preserve both conflicting question versions and
   require user review rather than using last-write-wins.
5. **OAuth setup:** provide an OAuth Client ID in Settings; do not ship a
   client secret or assume Quizzium's ID is valid for this app's origin.
6. **Initial connection:** if Drive has data, offer restore/merge before
   uploading local data; if Drive has no app backup, show an explicit
   first-backup confirmation.

## 17. Definition of Done

Google Drive sync is ready when:

- A normal connected user's changes are backed up automatically while the app
  is open and online.
- A user who clears site data can reconnect and recover the latest valid cloud
  backup without the empty browser overwriting it.
- A change that would delete 101 questions on one local date is blocked before
  upload.
- Suspicious mass loss below that threshold is also blocked for review.
- An approved destructive update has a verified, recoverable prior snapshot.
- Offline, auth, permission, API, and malformed-data failures are visible and
  preserve the last-known-good data.
- The original local-only app and downloadable backup workflow still works.
