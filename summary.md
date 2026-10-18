# MCQ Trainer — complete behavior and user flow

## Purpose and boundaries

This is a browser-based BIT multiple-choice study trainer, implemented as one page. A learner imports practice questions, studies them in several modes, reviews results, and tracks progress over time. It has no user account or server-side progress store. Study data belongs to the browser and device where it was created. A learner must make and transfer a backup to move that data elsewhere.

The optional AI feature is different from ordinary study: it sends the current question and configured Gemini API key to Google's Gemini service to request a new question. No AI request is made during normal importing, answering, reviewing, or coaching.

## First open and import choices

When there is no active question set, the start screen offers **Set import** and **Question bank import**. A learner may select a supported file or paste its contents. File selection immediately reads and attempts to load that file. Import errors are shown on the screen; an invalid set is not substituted with a successful-looking empty set.

### Set import

This loads one stand-alone practice set and makes it the active set:

- Text files can use the app's section-based questions and answer key.
- Markdown files can use the supported question and answer-key sections.
- JSON can be a question list, an object containing a question list, or a single question. Each accepted question needs a stem, exactly four options, and an answer expressed as A–D or an option index. Subject, unit, tag, code, and explanation are optional.
- The screen also provides an example JSON template and a built-in 80-question practice set.

The text and Markdown formats need a recognizable question section and answer key; questions missing their required choices or answer are rejected. Duplicate stems in JSON are ignored. When a stand-alone set is loaded while the current set has recorded answers, skips, or mistakes, the app asks for confirmation and archives the current attempt if the learner proceeds. If there is no recorded response, it replaces the active set without an attempt archive. Cancelling leaves the learner on the existing set.

### Question bank import

This loads a bank of subject-grouped JSON questions. Each question needs a question text, A–D options, and an answer expressed as A–D. Repeated question text is ignored; malformed questions are skipped, with a count reported. If no usable questions remain, import fails.

The accepted questions are divided into roughly 65-question sets while rotating across subjects to distribute them. The bank is added alongside existing banks. If no active set exists, its first set is loaded immediately. Otherwise, importing the bank keeps the current set open; the learner can later select any bank set or choose the next set not yet loaded. Loading a bank set archives the active attempt if it has any recorded responses, then starts the selected set with fresh per-set response status. The current active bank set is treated as loaded even before it has been archived.

## Persistent and temporary state

The app saves the active set, its current question run and position, per-question correct/wrong/skipped status, wrong choices, attempt history, review dates, archived set summaries, imported banks, and selected bank/set in browser local storage. Ordinary study progress is saved as answers are submitted and as the learner advances.

The Gemini API key is stored separately in browser local storage when saved in Settings. AI-generated variants and the AI generation count are held only in the current page session: they are not added to the imported bank, saved to local study storage, or included in progress backups. Reloading or closing the page loses generated variants and resets the generation count and cooldown state. The settings screen's cooldown and maximum-per-session values also apply only to the current page session; defaults are restored on reload.

## Main menu and choosing a study path

With an active set, the menu shows set-wide correct, wrong, and skipped counts; attempted-question count; a status grid; subject scores; study streak; and attempts logged today. It also offers these paths:

- **Resume** returns to the next position of an unfinished run, if one exists.
- **Start from Q1**, **Start at Q#**, and **Subject drill** create a run from all questions, questions at or after the chosen number, or the selected subject.
- **Unattempted**, **Retry mistakes**, and **Retry skipped** create runs from questions with those current active-set statuses.
- **Daily Mix** chooses an approximate number of questions for 10, 25, or 40 minutes, first including questions due for review and then filling from questions without a review schedule, mixed across subjects.
- **Due today** starts only questions currently due.
- **Timed mixed set** starts a separate timed assessment.
- **AI variants** starts a run of variants generated during the current page session, when any exist.
- The learner can also review the active set, inspect coaching and archived-set history, export an error log, retake the set, add/load a set, manage Gemini settings, or back up/restore data.

Starting most regular study runs does not erase the active set's recorded response status. It changes the run's ordered question list and resets the run position. The run list may contain a question more than once if a wrong answer has been queued for a later retry.

## Ordinary question-and-answer flow

1. The question screen displays progress through the run, the subject, question text, optional code, and four choices. Wording such as NOT, EXCEPT, FALSE, INCORRECT, ALWAYS, ONLY, and NEVER is highlighted.
2. Confidence begins at **Confident** for each question. The confidence control or **Z** cycles through **Guessed**, **Unsure**, and back to **Confident**.
3. The learner chooses an option by clicking it, pressing **A–D**, or pressing **1–4**. **S** skips. Keyboard shortcuts do not trigger while focus is in an input, text area, or select control.
4. On a correct answer, the choice is recorded and the app advances automatically after a short pause. A correct answer marked **Guessed** is shown as a lucky guess and is scheduled as if missed. An answer marked **Unsure** is still treated as correct for review scheduling.
5. On a wrong answer, the app highlights the chosen and correct options, displays the explanation, and pauses for the learner. The learner may select an error type—**Knowledge gap**, **Conceptual**, **Confusion**, or **Careless**—and add an optional fix note. Some types show a prompt to help identify the knowledge source, mixed-up concepts, or careless-reading/calculation cause. Continue advances even if no type or note is entered; Enter can also continue.
6. The first wrong response to a question in a run queues that question for another attempt later in the same run, approximately six to ten positions ahead or at the end if fewer questions remain. It is queued at most once per run. A wrong answer remains the active-set status until later answered correctly; later incorrect attempts are still recorded in attempt history.
7. A skip advances immediately and is kept for later practice. It does not show the answer or explanation. A question already recorded as wrong is not changed to skipped by skipping it on a later run.
8. When the run list is exhausted, the completion screen reports session correct, wrong, and skipped counts and links back to the menu. Completing a normal run does not itself archive the active set.

The ordinary review screen lists active-set mistakes and skips separately. For mistakes it shows the learner's last wrong choice, the correct choice, and the explanation. Learners can add or change error labels and fix notes there. Skipped questions show the correct choice and explanation, but do not have the mistake-label controls. Retrying a question updates active-set response status according to its new response while keeping prior attempt records in history.

## Timed mixed assessment

Timed mode takes up to five randomly selected questions per subject, shuffles the combined list, and allots 56.25 seconds per selected question. Thus an 80-question assessment lasts 75 minutes. If fewer than 80 questions are available under the five-per-subject rule, it uses the smaller selection and its correspondingly shorter time. The timer can be paused and resumed.

Timed answers are collected without telling the learner whether each choice is correct. Skipping simply leaves that question unanswered and advances. When the timer expires or the learner completes the list, the app scores all selected questions: correct choices count as correct, wrong choices as wrong, and unanswered questions as skipped. It updates active-set statuses and review schedules, displays overall and subject scores, and shows each miss with its correct answer and explanation. The learner can add an error type and fix note to each miss from this result screen.

Leaving timed mode via the menu abandons the timed run instead of producing a result. Choices not yet scored are not committed to progress. A page reload likewise loses the in-progress timed answers; the app does not restore a timed assessment as a resumable scored attempt.

## Spaced review and daily practice

Review scheduling is tied to question content, not only its displayed question number. A wrong answer or skip makes the question due the next day. A correct answer marked Guessed also becomes due the next day. Correct answers not marked Guessed progress through review intervals of 1, 3, 7, 14, and 30 days; a wrong/skip resets that progression.

The **Due today** path includes questions whose scheduled date has arrived, from the active set and archived misses that can still be identified. A daily mix starts with due questions and fills its approximate duration with questions that have not yet received a review schedule, rotating across subjects. If there is nothing due and no new eligible question, the app reports that there is nothing to practice. The streak is based on days with logged attempts; the displayed daily count is the number of attempts logged today.

## Archiving, retaking, and revising past sets

An attempt is archived when a new stand-alone set or bank set replaces an active set with recorded responses, or when the learner chooses **Retake this set** and confirms. A retake archives the current set summary, then clears its per-set answer statuses and starts the same set over. The archive keeps the set number and date, total and subject-level correct/wrong/skipped counts, and the questions missed or skipped, including the learner's wrong choice. Correct answers are represented in aggregate scores rather than copied into the archived error list.

The Study Coach combines archived summaries with the current set. It groups subjects into weak (below 60%), getting there (60% to below 75%), and on target (75% or higher), after at least three recorded responses for a subject. It also reports trends, logged attempts, first-seen versus repeat accuracy, confidence/error summaries, recurring questions missed in multiple sets, and archived errors without a fix note. A weak-subject drill includes unresolved archived questions and current non-correct questions in that subject; if there are none, it drills all questions in the subject.

Learners can retry archived wrong answers or skips individually, retry unresolved archived errors together, or open a full revision pass of an archived set's mistakes and skips. Finishing a full revision pass marks that set as revised and updates its revision date/count. This completion marker means the pass was finished; it is not a separate guarantee that every answer was correct.

## Error log and coaching summary

The active-set error-log controls let the learner choose mistakes plus skips, mistakes only, or skips only, and download or copy Markdown or plain text. Entries include question text, code when present, choices, learner response (or skipped), correct answer, explanation, optional error details, and a blank personal note area. If a download is unavailable, the app tries copying the text; if clipboard access is unavailable, it displays the text for manual copying. Nothing is exported when the selected set has no mistakes or skips.

**Copy coaching summary** creates a last-30-days text report with attempts, accuracy, average response time, subject results, tagged error counts, lucky guesses, unfixed misses, and up to ten confident wrong answers. It copies the report to the clipboard or opens a manual-copy prompt if clipboard access fails.

## AI-generated similar questions and Settings

While viewing a question, **Make similar variant** requests one new question that tests the same concept with different wording. For questions recognized as code-, calculation-, or math-oriented, it asks for changed values and a separately solved variant. The app tries Gemini 3.8 Flash first, then fallback models for selected availability, quota, or service errors. It rejects unusable output such as a missing stem, anything other than four nonempty options, an invalid answer index, a repeated stem, or duplicate options. A successful variant remains labeled unverified and is added only to the current page session's AI-variant list. The learner can continue the original run, then start a separate run of generated variants from the menu.

The feature requires a Gemini API key entered and saved in Settings. The configured key and source-question content are sent to Google's Gemini API when generating. Settings warns that unpaid API prompts and responses may be used to improve Google's services and may be reviewed by people; learners should not send personal or sensitive information and should not expose the key in a publicly hosted app. The default cooldown is 8 seconds and the default maximum is 10 successful generated variants per page session. The learner can change these values for that session or clear the saved API key. Model fallback can still be attempted when the preferred model is unavailable.

## Backup, restore, and data replacement

**Backup** downloads a JSON snapshot of saved study state, banks, and review history. It does not include AI variants held only in page memory. **Restore** asks for confirmation, then replaces the current saved state with a valid backup; invalid files produce an error message. Restoring is not a merge. To transfer progress, download the backup from the old browser/device and restore it in the new one. Clearing browser storage, using a different browser/device, or losing the backup can make locally stored study progress unavailable.

## End-to-end paths at a glance

- **New learner:** open app → choose import type → select/paste questions → resolve any import error or load set → choose a study path → answer/skip → review feedback → finish run → inspect menu, review, or coach.
- **Add stand-alone set:** open import → select/paste a set → confirm archiving if the current set has responses → load new active set; the previous attempt remains in history.
- **Add and study a bank:** import bank JSON → app validates/skips questions and creates balanced sets → choose a set or next unvisited set → prior active attempt is archived if it has responses → study the newly active set.
- **Build a revision habit:** answer questions → use due practice/daily mix → missed, skipped, or guessed-correct questions return sooner → confident correct answers move to longer intervals → use coaching and archived-set retry options to target weaknesses.
- **Use AI practice:** save API key in Settings → request a variant from a question → review it as unverified → start the separate AI-variant run → note that reload discards those variants.
- **Move to another device:** download backup → transfer the file → restore and confirm on the other device; API key and temporary AI variants are not part of that backup.
