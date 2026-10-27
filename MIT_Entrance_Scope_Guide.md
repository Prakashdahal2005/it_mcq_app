# MIT Entrance Master Guide (19 Subjects)

**A complete, unified reference combining Exam Strategy and Active Recall Webs for all 19 Entrance Subjects.**

---

## Table of Contents

- [Part I: Exam Blueprint, Marks Math & Scope Strategies](#part-i-exam-blueprint-marks-math--scope-strategies)
  - [1. Scope and marks](#1-scope-and-marks)
  - [2. What the paper really is](#2-what-the-paper-really-is)
  - [3. Subject cheat lines (Tier A, Tier B)](#3-subject-cheat-lines)
- [Part II: Active Recall Web & Confusion Traps (A ≠ B)](#part-ii-active-recall-web--confusion-traps-a--b)
  - [16 Computing Subjects (BIT101–BIT403)](#1-introduction-to-it-bit101)
  - [3 Mathematics & Statistics Subjects (MTH104, MTH168, STA154)](#17-basic-mathematics-mth104)
- [Appendix: Levels, Scope, Option-Quality & Variant Rules for AI Question Generation](#appendix-levels-scope-option-quality--variant-rules-for-ai-question-generation)
- [Tool Adjustments (general)](#tool-adjustments-general-not-specific-to-this-guide)

---

# Part I: Exam Blueprint, Marks Math & Scope Strategies

# MIT Entrance: Short Master Reference (about 2 months, target 75%+)

**Profile:** BSc CSIT graduate, all subjects studied once, revision started. Light plan: about 2 h a day, MCQ-focused. Method: **attempt → check → patch → log → re-test.** Never re-learn from zero.
**Fixed:** exam is exactly 2 hours (120 min), about 2 months away. **Assume (verify):** 100 Qs, 4 options, exact exam date (so keep a buffer), negative marking unknown.

---

## 1. Scope and marks

**Wide but shallow.** 160 syllabus units, but single-concept, one-line questions.

- **Q21–100 = 16 computing subjects x 5 Qs.** Every subject is worth 5 marks whatever its syllabus size, so study by **marks per hour**.
- **Q1–20 = Math/Stats:** Calculus 9, Linear Algebra 6, Statistics 5. Math/Stats is ranked by marks per hour like every other block. The one real difference: it is a skill (small calculations by hand), not recall, so it is practised rather than memorised.
- **75/100 target:** the tier aims below add up to about 79 (computing ≈ 65 of 80, Math ≈ 14 of 20), a small buffer. Math has no special target: if any block lags, the others cover it (e.g. Math = 10 means computing must give 65/80).

| Tier | Subjects | Aim |
|---|---|---|
| **A** (cheap recall) | IIT, DL, EC, MIS, CG, AI, SAD, SE, Web | 4.5/5 |
| **B** (trace, calc, wide) | C, OOP, DSA, DBMS, CN, MP, OS, plus Calculus (9 marks), Linear Algebra (6), Statistics (5) | about 70% of each subject's marks (3.5/5 for the computing ones) |

## 2. What the paper really is

- **Computing (80 Qs):** roughly 60–70% single-fact recall, 20–30% pick-the-sibling (2NF vs 3NF, alpha vs beta), about 10% one-step calc/trace . **Math/Stats:** about 65% need a small calculation.
- Each subject's 5 Qs come from 3–5 different units. **Breadth beats depth.** The 100 Qs touch about 48% of units. "Not sampled" means lower priority, not ignorable.
- **The exam follows the textbook chapter, not just the syllabus line** (e.g. Ostrich algorithm, SQL execution order, plane equation).
- About 6 of 80 keys are "All of the above / Both". Filler options give free eliminations. Stems can include irrelevant data.
- **Depth ceiling:** one fact or one small step. Don't prepare derivations (CG midpoint ellipse, Shannon, epsilon-delta, ALU design).
- **Study once, score twice:** number systems (DL), CPU/memory/DMA (MP), networking (CN), security (EC), ER/normalization (DBMS), SDLC/testing (SAD, then SE), pointers/functions (C), ethics/value chain (MIS).

---

## 3. Subject cheat lines

Format: **know cold** | *trap* | skip deep until the core is fluent.

### Tier A
- **IIT:** hierarchy registers → cache → RAM → disk → tape; RAM≠ROM; system≠application≠utility software; assembler≠compiler; virus≠worm≠Trojan; firewall≠IDS; DNS/DHCP/FTP/Telnet/SMTP roles; Access is a DBMS. | *trap:* easy wording → skipping options | skip history, case studies.
- **DL:** NAND/NOR universal; De Morgan; half/full adder; mux 2ⁿ:1 needs n selects; encoder≠decoder; SR/D/JK/T (JK=11 toggles, SR=11 invalid); latch≠FF; sync≠async (ripple) counter; mod-N → ⌈log₂N⌉ FFs; ring≠Johnson; K-map (Gray order); 1's≠2's complement; BCD, Gray, parity. | *trap:* edge vs level | skip ALU/shifter design.
- **Web:** h1–h6, HTML5 semantic tags; `.class`≠`#id`; box model; JS alert/confirm/prompt; PHP `$var` rules, `;`, `echo`; cookies≠sessions; DTD≠XSD (both schemas); XSLT≠XQuery. | *trap:* tiny syntax differences | skip AJAX/jQuery, PHP DB/upload (14 units for 5 Qs, so syntax-level only).
- **SAD:** waterfall / prototype (unclear requirements) / **spiral (risk)** / RAD (speed) / agile (Scrum, XP, Kanban); DFD=process, ERD=data, decision table/tree=logic; **alpha (in-house) ≠ beta (real users) ≠ acceptance**. | *trap:* structured vs OO tool | skip Gantt/PERT, interface design.
- **SE:** **verification (product right) ≠ validation (right product)**; functional≠non-functional; CMM levels; COCOMO (organic/semi/embedded); version≠change≠release; team structures (democratic decentralized = no permanent leader). | *trap:* reverse engineering ≠ re-engineering | skip design patterns.
- **MIS:** TPS (operational) / MIS (middle, routine) / DSS (middle, non-routine) / ESS (senior); Porter's 5 forces; value chain≠value web; 6 ethical principles (Descartes: if it can't be done repeatedly, don't do it once); push (build-to-stock)≠pull (build-to-order); structured/semi/unstructured; ERP/SCM/CRM/KMS. | *trap:* wording-matching, so memorise the one-liners.
- **EC:** 7 unique features; B2C/B2B/C2C/C2B; 6 security dimensions; **phishing≠pharming≠spoofing**; DoS≠DDoS; SSL/TLS, PKI, VPN; auctions; EDI; Nepal ETA. | *trap:* dimension vs attack names | skip SET steps, social-media tools.
- **CG:** DDA (float) ≠ Bresenham (integer); translation/scaling/rotation matrices; Cohen-Sutherland≠Liang-Barsky; Z-buffer (image space)≠painter's (object space); flat≠Gouraud≠Phong; Bezier≠B-spline; RGB (additive)≠CMY (subtractive)≠HSV. | *trap:* translation/transformation wording | skip derivations, OpenGL, VR.
- **AI:** PEAS, 5 agent types; BFS/DFS/IDS; **greedy f=h ≠ A\* f=g+h**; minimax, alpha-beta (alpha = best for MAX); CNF; forward≠backward chaining; Bayes; supervised/unsupervised/RL; ANN training updates weights. | *trap:* which f for which search | skip Dempster-Shafer, scripts, NLP detail.

### Tier B
- **C:** precedence; pre vs post `++`; integer division; `=` vs `==`; switch fall-through; macro without parentheses; pointer arithmetic scales by type size; `strlen`≠`sizeof`; fopen modes; struct≠union; array size n+1 for a string of n. | *trap:* trace on paper; "compile error" is often an option | skip file handling, preprocessor.
- **OOP:** struct (public) ≠ class (private); **ctor base→derived, dtor reverse**; copy ctor takes a reference; static = one per class; overloading≠overriding; pure virtual = abstract; virtual destructor; non-overloadable `:: . .* ?: sizeof`; member memory allocated at **object creation**. | *trap:* "declaration" vs "creation" | skip template depth, file streams.
- **DSA:** LIFO/FIFO; overflow≠underflow; infix↔postfix by hand; BST in-order = sorted; BFS=queue, DFS=stack; Prim/Kruskal=MST, Dijkstra=shortest path; array/stack/queue/list are linear, trees/graphs aren't; merge sort suits linked lists. | skip worked graph algorithms, hashing detail.
- **DBMS:** **FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY**; 1NF atomic, 2NF no partial, 3NF no transitive, BCNF every determinant a candidate key; specialization≠generalization≠aggregation; ACID; deferred (NO-UNDO/REDO)≠immediate (UNDO/REDO)≠shadow paging; DDL/DML/DCL/TCL. | *trap:* ALTER vs DROP vs UPDATE | skip NoSQL detail, MVD derivations.
- **OS:** process≠thread; FCFS/SJF/SRTF/RR/priority; busy-waiting (lock, strict alternation, Peterson) ≠ blocking (sleep/wakeup, semaphore, monitor); **4 deadlock conditions** (mutual exclusion, hold & wait, no preemption, circular wait); Ostrich = ignore, not recovery; internal≠external fragmentation; FIFO/LRU/optimal. | *trap:* ignore extra numbers in the stem | skip file-system implementation, I/O layers.
- **CN:** layers and devices (hub 1, switch 2, router 3); TCP≠UDP; IPv4 32-bit classful ≠ IPv6 128-bit classless; ARP≠RARP; SMTP (send) ≠ POP/IMAP (receive); stop-and-wait / Go-Back-N / selective repeat; TDM≠FDM≠WDM; RIP (distance-vector)≠OSPF (link-state); fibre immune to EMI. | *trap:* TCP header is 20–60 B | skip CRC/Hamming, routing walkthroughs.
- **MP:** 8085 = 8-bit data, 16-bit address (64 KB), 40 pins; address bus one-way, data bus two-way; flags S Z AC P CY; interrupts TRAP > 7.5 > 6.5 > 5.5 > INTR; fetch→decode→execute; RISC≠CISC; Booth = multiplication; pipelining = overlap. | skip assembly programs, microprogramming.
- **Calculus (9):** derivative rules (chain, implicit); limit as a derivative (xᵏ−2ᵏ)/(x−2) = k·2ᵏ⁻¹; extremes = critical points **plus endpoints**; f'>0 increasing; ∫ and substitution; improper integral with a discontinuity inside diverges (∫dx/(x−a)); y'+ky=0 → Ce⁻ᵏˣ; partial derivative; plane a(x−x₀)+b(y−y₀)+c(z−z₀)=0. | *trap:* skipped endpoints, hidden discontinuity | skip volumes, arc length, Newton/Euler, Lagrange. **Promote first:** series tests, related rates.
- **Linear Algebra (6):** reduce to 0 = nonzero → no solution; det 0 → singular/dependent; 2×2 inverse = (1/det)[[d,−b],[−c,a]]; symmetric A=Aᵀ; |a+b| ≤ |a|+|b|; group = closure, associativity, identity, inverse. | *trap:* forgetting ÷det, two true options | skip Gram-Schmidt, SVD, rings. **Promote first:** 2×2 eigenvalues, Cramer.
- **Statistics (5):** nominal < ordinal < interval < ratio; shift by c: mean ±c, variance unchanged; scale by c: mean×c, variance×c²; constants → variance 0; total probability ΣP(A|Bᵢ)P(Bᵢ), Bayes; r sign = direction, |r| = strength, correlation ≠ causation. | skip CI, sampling distributions. **Promote first:** binomial, normal.

---

## 4. Calc and trace bank

- **Number systems:** binary↔octal groups of 3, ↔hex groups of 4; 2's complement = invert + 1; n-bit range −2ⁿ⁻¹ … 2ⁿ⁻¹−1.
- **Logic and architecture:** mod-N counter ⌈log₂N⌉ FFs; n address lines → 2ⁿ locations; **pipeline cycles = k + n − 1**.
- **OS:** page-number bits = log₂(VAS ÷ page size) (128 KB ÷ 4 KB = 32 pages = 5 bits); bitmap = memory ÷ block size bits (256 KB ÷ 2 KB = 128).
- **DSA:** bubble-sort swaps = **inversions** ({2,5,1,3,4} → 4); max nodes at level i = 2ⁱ; TOH = 2ⁿ−1. Sorts: bubble/insertion best n, avg and worst n²; selection n²; merge n log n always; quick n log n, worst n².
- **CN:** Nyquist 2B·log₂L; Shannon B·log₂(1+SNR); pure ALOHA 18.4%, slotted 36.8%; UDP header 8 B; class A 0–127, B 128–191, C 192–223, D 224–239.
- **CG:** Bresenham p₀ = 2Δy−Δx; midpoint circle p₀ = 1−r; Cohen-Sutherland: both codes 0 accept, AND ≠ 0 reject.
- **COCOMO basic:** E = a·KLOC^b, D = c·E^d; organic 2.4/1.05/2.5/0.38, semi 3.0/1.12/2.5/0.35, embedded 3.6/1.20/2.5/0.32.
- **C precedence (high→low):** postfix `++ --` · unary · `* / %` · `+ -` · `<< >>` · relational · `== !=` · `&` · `^` · `|` · `&&` · `||` · `?:` · `=` · `,`.
- **Mnemonics:** OSI "Please Do Not Throw Sausage Pizza Away"; SQL order "Few Warriors Get Hurt Seriously Often"; normal forms "the key, the whole key, nothing but the key".
- **By hand, 3 each:** page replacement (FIFO/LRU/optimal), scheduling waiting times, infix→postfix, BST insert + in-order, one K-map.

---

## 5. Shaky keys and ambiguous questions

| Topic | Issue |
|---|---|
| TCP header size | Some keys say 40–60 B; textbook is 20–60. Pick the closest |
| Coaxial cable | "All of the above" is relative to twisted pair |
| C indirection operator | Indirection operator = star operator; know both |
| CSS / PHP syntax | `.class` and `#id` are both valid selectors; `echo` and `print` are both valid |
| PHP statements | A wrong option can differ from the right one only by the semicolon |
| Math/Stats | Watch for two true options, a false option a, out-of-unit-line questions, loosely worded total probability |

**Golden rule: in practice investigate the question, in the exam maximise marks.**
- **Two options look right:** find the qualifier (BEST / MOST / ONLY / EXCEPT), compare against the textbook definition, pick the primary and most specific term.
- **None looks right:** recheck for a misread word, pick the closest defensible option, never invent a justification that contradicts a fact.
- **Question is badly written:** pick the most defensible answer, flag it, move on.

---

## 6. Method (optimal and non-boring)

**Core loop:** answer **before** seeing options → check → patch from notes → log the error → re-test at +1, +3, +7, +14 days. Rereading and highlighting are the weakest methods; being tested is the strongest.

- **Mix subjects in blocks** after the first pass: each subject in one unbroken run, never alternating question by question (Appendix, Rule 12). **Confidence-tag** answers 1–3 and study every "wrong at 3" first.
- **Cards only** for `A ≠ B` pairs, formulas and ordered lists. About 20 new cards a day at most.
- **Notes:** one page per subject, built from your errors only.
- **Calculation topics are skill, not recall:** every `[calc]` unit (Math/Stats, plus C traces, DSA sorts and trees, OS scheduling and paging, CN formulas, MP pipelining) is practised with small problems by hand, spaced over weeks.
- **Interleave the confusable pairs.** Mix `A ≠ B` siblings and maths problem types *inside one subject's run*, which is where interleaving helps most (never across subjects, see Rule 12). Learn a brand-new fact blocked first, then mix it in.
- **Spacing rule of thumb:** with about 60 days left, see an item again about 6-12 days after the last look, and land the last review of each weak item 7-14 days before the exam. The +1, +3, +7, +14 ladder already fits this.
- **Difficulty sweet spot:** aim for about 75-85% correct in practice sets. Much higher means too easy (use free recall before options, raise difficulty); much lower means go back to the concept pass.
- **One if-then plan for starting:** write "If [daily cue, e.g. tea finished], then I open Continue and do the first 10 minutes." A fixed cue beats willpower.
- **Sleep is part of the plan:** memory is consolidated after a heavy study day, so cut study before cutting sleep, especially in the last week.
- **Error log line:** `Q-id | subject | concept | cause | fix | re-test date`. Causes: **K** knowledge gap (make an `A ≠ B` card if siblings), **W** wording trap, **A** ambiguity (record the standard rule), **G** guessing/reasoning slip (redo by hand). The same mistake three times means go back to the chapter.
- **Beat boredom:** use the interest-break menu (Section 12); blocks of 35–40 min, switching the task type (read → quiz → draw → teach); quiz first, read second; if bored, raise difficulty; keep a "marks banked /5" heat map and streak; weekly timed mock as a boss fight; surprise set (5 Qs from one random subject, or 2-3 random subjects each in its own unbroken block); clear 5 old errors a day; teach one confusable pair aloud in 60 seconds; phone in another room; never a zero day; sleep 7+ hours.

---

## 7. 60-day plan (light version: about 1 h 55 min a day, MCQ-focused)

**Why light works here:** typical toppers reportedly score around 65, and a 70–75 mock score already gives a buffer. Marks come from error-fixing and timed practice, not more hours.

**Daily template (about 115 min)**

| Time | Task |
|---|---|
| 10 min | Cards and error-log items due today |
| 30 min | **Deep block:** cue pass → patch gaps → 10 MCQs (answer before seeing options) |
| 5 min | Break, move |
| 25 min | **Light block:** pick a *different* task each day: draw a diagram (8085, OSI, ER, DFD, A\*) · teach one `A ≠ B` pair aloud · error bounty (re-solve 5 old mistakes cold) · roulette (2-3 random subjects, a few Qs each, one subject at a time) · pair flashcards · an interest break (Section 12) |
| 15 min | Timed mixed MCQs (subject by subject, never alternating) |
| 10 min | Error log (K / W / A / G) |
| 20 min | **Calc slot** (by-hand practice on `[calc]` topics, any subject) |

**Minimum day (about 60 min):** 10 review + 25 deep + 10 MCQs + 15 calc. This counts as a full day. Never a zero day.
**Every 7th day is a light day** (days 7, 14, 21, 28, 35, 42, 49, 56): 30 min mixed MCQs + error log, or off. Sleep 7+ hours always.

| Days | What |
|---|---|
| 1 | **Diagnostic:** all 100 Qs timed (120 min), confidence-tagged. Score every subject by its own marks (Calculus /9, Linear Algebra /6, Statistics /5, the other 16 /5). Same rule for all 19: **Red** ≤40%, **Amber** about 60%, **Green** 80%+ |
| 2–20 | **Fix only what the diagnostic shows:** Reds get 2 days each, Ambers 1 day each. Greens skip coverage and appear only in mixed sets. Already scoring 70+? Skip straight to mocks and error-fixing |
| 21–23 | Repair + buffer (absorbs slipped days) |
| 24–53 | **Mixed retrieval:** 3 subjects a day, 10 min cues + 8 MCQs each, plus error-log items. Reds appear twice as often |
| 54–58 | No new material: confusables, formulas, error-log cards; redo the official paper and explain why each wrong option is wrong |
| 59–60 | Day 59 light. Day 60: 30-min glance, early sleep. If the exam date moves earlier, cut from days 24–53, never the mocks |

**Mocks (the main score driver):** alternate half and full so it never exhausts you. **Half mocks (50 Qs, 60 min) on days 8, 22, 36, 50. Full mocks (100 Qs, 120 min) on days 15, 29, 43, 55.** Mock day = mock + 45 min review, nothing else. Lay mocks out like the real paper: Math/Stats first, then the computing subjects in unbroken blocks of 5; a half mock uses the same layout with fewer subjects. The review is where the marks come from: sort every miss into K / W / A / G and push the W and G counts toward zero.

**Calc slot (20 min):** picked from the diagnostic like every other block: Red `[calc]` subjects first (Math/Stats and computing alike), then Ambers, rotating so each gets two or three slots a week. From about day 32, timed mixed sets of 10–15 calc problems (grouped by subject) plus the promote-first topics.

**Adjust by score, not by guilt:**
- Two mocks in a row at 72+ → go to maintenance: error log, 20 min calc and one mixed set only.
- A subject under 3/5 on two mocks → one extra slot a week until it recovers.
- Falling behind → drop second passes on Greens. **Never cut the mocks.**

---

## 8. Exam day

- **Time (100 Qs in 120 min):** recall about 40–45 s each (about 60 min), calc and trace questions up to about 2 min each (Math/Stats plus computing traces, about 40 min), about 20 min left for flagged questions.
- **Two passes:** answer sure ones fast and mark `?`, then return. Take the fast recall questions first across the whole paper, and leave calc and trace questions (Math/Stats and computing) for the second pass.
- **Read the stem for NOT / FALSE / EXCEPT / BEST / ONLY** before the options. **Compute before looking at options.**
- **Stuck:** after 30–45 s (about 2 min for a calc or trace question), compare the two best options against the textbook definition, choose, flag, move on.
- **Elimination:** drop filler; drop two options saying the same thing; be wary of "always / never / only".
- **"All of the above / Both":** if two options are confirmed true, pick it; if any is false, eliminate it.
- **Calc checks:** both endpoints, ÷ determinant, where an improper integral is undefined; for traces, precedence, pre/post `++` and off-by-one.
- **Guessing:** with no negative marking, never leave blanks. **Verify the rule first.**
- **Revising answers:** switch an answer you flagged as a guess when you find a specific reason; keep answers you were confident about unless you spot a clear slip. (In real exams, wrong-to-right changes outnumber right-to-wrong roughly 2:1, so "never change your first answer" is a myth, but second-guessing confident answers does not help.)

## 9. Don't

Re-learn from page one · write long programs · start with the biggest syllabus (Web, C) · start with derivations · go deep on "skip" items before the core is fluent · import outside material (GATE-style, B-trees) · treat "not in the sample" as "never asked" · memorise from a doubtful key · judge yourself by how familiar notes feel.

## 10. Verify before the exam

Number of Qs, pass mark, exact exam date and negative marking in the official notice · that the real paper keeps the 20 + 5-per-subject split · Nepal specifics (ETA, e-payment status) against your notes · any key you disagree with (the textbook is the authority).

**Done when:** a full 100-Q mock fits in 120 min with review time, scores 70–75+, and every wrong answer is traced to a unit.

---

## 11. From MCQs to real learning (the weak-subject loop)

MCQs alone are not enough. Practice tests beat re-reading, but multiple-choice has known traps, so every miss must turn into understanding, not just a remembered letter.

- **Every miss needs an explanation, not just the key.** The wrong options (lures) can leave false memories, and feedback that explains why is what cancels this. For every miss, read why the right answer is right and why the option you picked is wrong.
- **A lucky guess is a miss.** If you answered right at confidence 1, treat it as wrong and make a card for it. Do not let guessed points hide a weak topic.
- **Confident wrong answers are the best ones to fix.** High-confidence errors are corrected well once you see the feedback, so study "wrong at confidence 3" first (already in the method).
- **Math and calculation topics are different:** retrieval practice is not clearly proven for maths, so learn them with worked examples and then fresh variants (Appendix, Rule 9), not formula flashcards alone.

**Weak-subject concept pass (25–30 min, replaces some MCQ time for Red and Amber subjects)**
1. Pick one Red/Amber subject and 3–5 **L0** concepts from the Part II recall web.
2. **Blank-page recall:** write everything you remember about one concept from its cue, without looking.
3. Compare with notes, patch the gaps, and add one "confused with" line for each A ≠ B pair.
4. Finish with 5 MCQs on exactly those concepts, and log any miss.

**Balance rule of thumb:** for a Red subject, spend about half the time on concept pass, cards and by-hand work and about half on MCQs. When it turns Green, flip to mostly MCQs and mixed mocks.

**What the tool should generate for you:** flashcards and concept sheets built from your own misses (Appendix, Rule 10). They update after every session, so you are never just doing MCQs.

**Not exhausting yourself:** keep to the light plan (about 2 h), keep the weekly light day, keep sleep at 7+ hours, stop at a fixed time, and never add hours to fix a bad day. Short breaks (5-10 min) between blocks keep energy up. **Rule for any new idea:** it only gets added if it replaces something or costs under 2 minutes.

## 12. Interest breaks (for boring stretches)

Long prep gets dull, and choosing what you work on is part of staying motivated. So the plan allows one **interest break** a day (20–25 min), chosen by you, using the Light block slot. It must stay inside the syllabus so it still counts.

- **Watch (15–20 min):** a visual explainer on something you are weak or curious about, such as an essence-of-linear-algebra or essence-of-calculus series, a sorting-algorithm visualisation, an A\* pathfinding demo, or how Bresenham or the Z-buffer works. After it, write 3 lines from memory.
- **Solve for fun (DSA / AI / CG):** one small algorithm problem by hand or in code: a sort trace, BST insert and traversal, Dijkstra on a tiny graph, A\* on a small grid, a Bresenham plot, or a K-map.
- **Maths play:** pick a problem type you like (limits, determinants, probability) and solve 3 fresh ones by hand with no timer, or explain to yourself why det = 0 means singular.
- **Make something:** draw the 8085, the OSI stack, an ER diagram, or a DFD from memory and check it.
- **Teach it:** explain one confusable pair out loud in 60 seconds.

Rules: one break a day, picked from this menu or your own idea in the same spirit, never replacing the error log or the day's mock work. Choosing the break yourself is the point.

## 13. Milestones and satisfaction (staying consistent without a countdown)

**Why it matters.** Studies of motivation point the same way: seeing real progress is the strongest everyday booster, and setbacks hurt more than they seem to. Feeling competent is the strongest predictor of self-driven motivation in students, ahead of autonomy and relatedness, and self-driven motivation goes with persistence and better results. Effort also rises as a goal gets closer, so goals that feel far away lose pull, and motivation dips right after a goal is reached unless the next one is already set. (Most of this research comes from workplaces, shops and classrooms, so we apply it by analogy.)

**How we do it here, without adding study time**
- **Milestones, not a countdown.** Keep a private ladder and never display days left:
  1. Diagnostic done and every subject coloured Red / Amber / Green.
  2. Every Red subject has had its fix days.
  3. First full 120-min mock finished and reviewed.
  4. Second full mock beats the first.
  5. Third full mock reaches 70+.
  6. Final full mock finished with time to review.
  7. Exam day.
- **Always know the next one.** When you hit a milestone, write the next milestone and its first task before you celebrate, so motivation doesn't drop.
- **Daily close (60 s):** write 3 concrete wins (e.g. "fixed 5 errors", "solved 3 of 3 page-bit variants", "Normal Forms moved Amber → Green") and tomorrow's first task.
- **Weekly (5 min):** list what you can do now that you could not last week. Compare with the diagnostic subject by subject, using the marks-banked heat map.
- **After a bad mock:** review it, fix three errors, and stop for the day. A small win right after a setback matters.
- **Small rewards** at milestones that are not study (a walk, a match, a good meal). Treat them as celebration after the fact, not a bribe per task: rewards announced in advance for just taking part can reduce interest in the work itself.
- **Keep it honest:** progress must reflect real learning (scores, subjects moving colour), not a progress bar that fills regardless. No streak guilt and no comparing yourself with others.

## 14. Evidence behind the plan (compact)

Tags: **[M]** meta-analysis, **[S]** single study, **[D]** design judgment. Details and sources are in the separate findings log.

- **Test yourself, do not reread [review]:** practice testing and distributed practice rate highest; rereading, highlighting and summarising rate lowest (Dunlosky 2013). Practice tests beat restudy in a 118-article meta-analysis (Adesope 2017 [M]); answering from memory before seeing options (a hybrid format) is the safest choice.
- **Spacing [S]:** the best gap is roughly 10-20% of the time until the exam (Cepeda 2008). With about 60 days left, that is a 6-12 day gap, and spaced items resist the harm of short sleep better than crammed ones.
- **Interleaving [M]:** overall g=0.42, maths g=0.34, strongest for *similar* categories (Brunmair & Richter 2019). So mix confusable pairs and maths types inside a subject. Blocking won for word-like material.
- **Subject blocks [D]:** mixed sets keep each subject in one unbroken run (Rule 12). It matches the real paper's layout, avoids constant switching, and loses little of the interleaving benefit.
- **Difficulty [S]:** about 75-85% correct is a sensible target. The "85% rule" was derived for simple two-choice tasks, so use it as a guide.
- **Sleep [M]:** a night without sleep before or after learning hurts memory (g=0.28 after learning). Sleep after heavy study days.
- **Starting [M]:** if-then plans raise follow-through (d=0.65 in 94 tests; larger when rehearsed and motivation is high).
- **Gamification [M]:** small-to-moderate learning effect (about g=0.5), weaker on motivation and behaviour, fading novelty; rewards for just taking part can reduce interest, informative feedback raises it. Use feedback and progress, not points (Tool Adjustments, section 7).
- **Anxiety [S]:** timed mocks and retrieval practice are the main tools. Worry-writing helped in one study and failed in a later classroom replication, so it is optional.
- **Answer changing [S]:** wrong-to-right changes outnumber right-to-wrong about 2:1. Revise guesses, keep confident answers.
- **Breaks [M, workplace]:** breaks of 10 minutes or less reduce fatigue; they do not by themselves raise performance.
- **Scheduler [community benchmarks]:** FSRS-style scheduling needs roughly 20-30% fewer reviews than SM-2 for the same retention.

---

# Part II: Active Recall Web & Confusion Traps (A ≠ B)

# MIT Entrance Recall Web (BIT Syllabus)

Oct 13, 2026 · @prakash

Cue-only recall web for every non-trivial or confusable unit in the 16 syllabus subjects: read a cue, retrieve what you know, then check your notes. Every cue is a syllabus term or a direct sub-part of one; nothing from outside the listed units. Merged with the formal syllabus, so no separate syllabus is needed: every unit of every subject is covered here. A ≠ B marks a pair you must be able to tell apart; \[calc\] marks topics to practise by hand.

## 1. Introduction to IT (BIT101)

- **U1 Introduction to computer**
  - Characteristics of a computer · history · generations of computers (vacuum tube → transistor → IC → microprocessor → AI)
  - Digital ≠ analog ≠ hybrid computers · classification by size (super ≠ mainframe ≠ mini ≠ micro) · the computer system · application areas
- **U2 Computer hardware**
  - CPU: components of CPU · instruction format · instruction set · instruction cycle · microprocessor
  - Bus and cabinet: computer bus · power supply · motherboard · expansion slots · ports and interfaces
  - Memory: memory representation · memory hierarchy · CPU registers · cache · RAM ≠ ROM
  - Secondary storage: magnetic tape ≠ magnetic disk · optical disk · magneto-optical disk · flash · sequential access ≠ direct access
  - I/O: input devices ≠ output devices · human data entry devices ≠ source data entry devices · I/O port · I/O system
- **U3 Computer software**
  - System software ≠ application software · device drivers ≠ utility software
  - Operating system: objectives · types · functions · process / memory / file / device management · protection and security · user interface
  - Programming languages (machine ≠ assembly ≠ high-level) · language translators: assembler ≠ compiler ≠ interpreter
  - Software licensing · open source software · Unix ≠ Windows (case study)
- **U4 Data representation** \[calc\]
  - Decimal → binary / octal / hex · binary / octal / hex → decimal · binary ↔ octal / hex · binary arithmetic
- **U5 Networks and Internet services**
  - Importance of networking · data transmission across media · data transmission ≠ data networking
  - Media: twisted pair · coaxial · optical fiber · RF · microwave · satellite
  - Networks: network types · topology · communication protocol · network devices · wireless networking
  - Internet: history of the Internet · internetworking protocol · Internet architecture · managing the Internet · Internet connections · Internet address · DNS · WWW · Internet services · e-mail working principle
  - Newer ideas: Web 2.0 · IoT · wearable computing · cloud computing · smart city · e-commerce ≠ e-governance
  - Case study: ISPs in Nepal and their services
- **U6 Database systems**
  - Database ≠ DBMS ≠ database system · architectures · data models · data warehousing ≠ data mining · big data
- **U7 Computer security**
  - Security threat ≠ security attack · malicious software · cryptography · digital signature · firewall ≠ IDS · user authentication · security awareness · security policy
- **U8 Application and impact of IT**
  - Applications of IT · impact on organizations ≠ impact on individuals · societal impacts · IT strategic planning · IT and business alignment

No unit skipped.

## 2. C Programming (BIT102)

- **U1 Introduction**
  - History and advantages of C · problem analysis ≠ algorithm ≠ flowchart · structure of a C program
  - Writing → compiling → debugging → executing → testing · Windows ≠ Unix/Unix-like environment
- **U2 Elements of C**
  - C tokens · character sets · data types · constants ≠ variables · expressions ≠ statements · comments · escape sequences · delimiters
- **U3 Input/output functions**
  - Conversion specifiers · I/O functions · formatted I/O
- **U4 Operators and expressions** \[calc\]
  - Arithmetic · relational · logical · assignment · type conversion in assignment
  - Increment ≠ decrement · prefix ≠ postfix · ternary · bitwise · comma · sizeof
  - Expression evaluation · operator precedence · associativity
- **U5 Control structures** \[calc\]
  - if · if-else · else-if ladder · nested if · switch and case fall-through · conditional operator
  - for · while · do-while · nested loops · the odd loop
  - break ≠ continue · goto and labels
- **U6 Arrays and strings**
  - Array indexing · initializing arrays · one-dimensional ≠ multidimensional · string manipulation functions
- **U7 Functions**
  - Declaring ≠ defining ≠ calling · arguments · return statement · void as a parameter
  - Call by value ≠ call by reference · arrays as function parameters · recursion
  - Scope: local variables ≠ external variables · static ≠ register variables · header files · parameterizing main
- **U8 Preprocessor**
  - Macro expansion · macros with arguments · macros ≠ functions · file inclusion
  - Conditional compilation · #if / #elif · #undef · #pragma
  - Build process: preprocessing · compiling · assembling · linking · loading
- **U9 Pointers** \[calc\]
  - Declaration and initialization · address ≠ reference ≠ dereference · sizeof · NULL · pointer assignment
  - Pointer arithmetic · pointer as argument ≠ pointer as return value · pointers ≠ arrays · dynamic memory allocation
- **U10 Structures and unions**
  - Structure definition · array of structures · passing structures to functions · pointers to structures · self-referential structures
  - typedef · table lookup · structure ≠ union
- **U11 File handling**
  - Files ≠ streams · stream header files · open modes · errno · stdin / stdout / stderr
  - Reading and writing to/from a stream: fprintf · fscanf · fgetc · fputc · fgets · fputs · fread · fwrite · random access

No unit skipped.

## 3. Digital Logic (BIT103)

- **U1 Number systems, operations and codes** \[calc\]
  - Decimal · binary · octal · hexadecimal · conversions between number systems · 1's complement ≠ 2's complement · binary addition ≠ subtraction by complement
  - Binary codes (BCD · Gray) · error detection codes (parity)
- **U2 Digital design fundamentals and Boolean algebra**
  - System concept · digital ≠ analog signals · logic operations · basic gates ≠ derived gates ≠ universal gates
  - Boolean laws · De Morgan's theorems
- **U3 Simplification of Boolean functions** \[calc\]
  - K-map: two-variable · three-variable · four-variable
  - SOP ≠ POS simplification · NAND-only ≠ NOR-only implementation · don't-care conditions
- **U4 Combinational logic**
  - Half adder ≠ full adder · half subtractor ≠ full subtractor · parallel binary adder
  - Multiplexer ≠ demultiplexer · encoder ≠ decoder · seven-segment decoder · code converters
- **U5 Sequential logic**
  - Latch ≠ flip-flop · edge-triggered flip-flops: SR · D · JK · T
  - Flip-flop operating characteristics (propagation delay · set-up time · hold time) · flip-flop applications
- **U6 Counters, registers and memory**
  - Asynchronous counter ≠ synchronous counter · up/down counter · counter applications
  - Shift registers: basic operations · types (SISO · SIPO · PISO · PIPO) · bidirectional · shift register counters (ring ≠ Johnson)
  - Basic memory operations · memory types
- **U7 Processor logic design**
  - Processor organization · ALU · arithmetic circuit design · logic circuit design · ALU design · status register · shifter design

No unit skipped.

## 4. Microprocessor and Computer Architecture (BIT151)

- **U1 Introduction to microprocessor**
  - Registers · ALU · control and timing · system buses · bus organization · SAP-1 ≠ SAP-2
- **U2 Intel 8085** \[calc\]
  - Functional block diagram · pin configuration · timing and control unit · registers · data bus ≠ address bus
  - Instructions: operation code ≠ operand · addressing modes
  - Interrupts: TRAP · RST 7.5 / 6.5 / 5.5 · INTR · maskable ≠ non-maskable · priority
  - Flags · instruction and data flow inside the 8085 · basic assembly programs
- **U3 Microoperations**
  - Arithmetic ≠ logic ≠ shift microoperations · arithmetic logic shift unit
- **U4 Control unit and CPU**
  - Control unit of basic computer · timing signals
  - Computer arithmetic: adder · subtractor · multiplier · divider
  - Microinstruction and microoperation format · symbolic ≠ binary micro-program
  - Register organization · register stack ≠ memory stack · data transfer and manipulation
  - RISC ≠ CISC
- **U5 Fixed-point computer arithmetic** \[calc\]
  - Addition and subtraction · multiplication · division algorithm · Booth's algorithm
- **U6 Input and output organization**
  - Peripheral devices · I/O interface · DMA · I/O processor · data communication processor
- **U7 Memory organization**
  - Memory hierarchy · primary ≠ secondary memory · virtual memory · memory management hardware
- **U8 Pipelining** \[calc\]
  - Concept of pipelining · arithmetic pipeline ≠ instruction pipeline · data dependency · handling of branch instructions

No unit skipped.

## 5. Object Oriented Programming, C++ (BIT153)

- **U1 Introduction**
  - Structured ≠ object-oriented approach · characteristics of OO languages
- **U2 Basics of C++** \[calc\]
  - Namespace · I/O streams ≠ manipulators · type conversion · preprocessor directives · new ≠ delete
  - Functions: overloading · inline · default arguments · pass by reference ≠ return by reference · scope and storage class
  - Pointers: operators in pointers · pointers and arrays · pointers and functions
- **U3 Classes and objects** \[calc\]
  - Accessing members · member functions defined outside the class · structure ≠ class · memory allocation for objects
  - Constructors: default ≠ parameterized ≠ copy · the default copy constructor · destructor
  - Objects as function arguments ≠ returning objects from functions · static members
- **U4 Operator overloading**
  - Fundamentals · restrictions · operator functions as class members · unary ≠ binary overloading
  - Data conversion: basic → basic · basic → user-defined · user-defined → basic · user-defined → user-defined
- **U5 Inheritance**
  - Base ≠ derived class · access specifiers (private · protected · public) · types of inheritance
  - Public ≠ private inheritance · constructor and destructor order in derived classes
  - Aggregation ≠ inheritance · ambiguity
- **U6 Virtual functions, polymorphism and other features**
  - Virtual function · late binding · abstract class ≠ concrete class · pure virtual function · virtual destructor · virtual base class
  - Friend function ≠ static function · this pointer · assignment ≠ copy initialization · polymorphism and its roles
- **U7 Templates and exception handling**
  - Function templates (multiple arguments) ≠ class templates · templates and inheritance
  - try · throw · catch · use of exception handling
- **U8 Files and streams**
  - Stream class hierarchy · string I/O · character I/O · object I/O · detecting end of file · file pointers

No unit skipped.

## 6. Data Structures and Algorithms (BIT201)

- **U1 Background**
  - Data type ≠ data structure ≠ abstract data type · array as an ADT · structure · pointer · class in C++
- **U2 Algorithms** \[calc\]
  - Fundamentals of algorithm · asymptotic notations and their properties · time ≠ space complexity
- **U3 Stack** \[calc\]
  - Primitive operations · stack as an ADT
  - Infix ≠ postfix ≠ prefix · evaluating each · converting infix → postfix / prefix
- **U4 Queue**
  - Primitive operations · queue as an ADT · circular queue · priority queue
- **U5 Recursion** \[calc\]
  - Definition and principle · Tower of Hanoi · factorial · Fibonacci
- **U6 List**
  - Static ≠ dynamic list structure · operations on linked list
  - Linked stack ≠ linked queue
  - Circular linked list ≠ doubly linked list ≠ doubly circular linked list
- **U7 Tree** \[calc\]
  - Basic terminology · types of binary tree · binary tree operations
  - Binary search tree: insertion · deletion · searching
  - Pre-order ≠ in-order ≠ post-order traversal · applications of binary tree
- **U8 Sorting** \[calc\]
  - Bubble ≠ insertion ≠ selection ≠ quick ≠ merge sort · comparison and efficiency
- **U9 Searching**
  - Sequential ≠ binary ≠ tree search · comparison and efficiency · hashing
- **U10 Graph** \[calc\]
  - Representation of graph · types of graph
  - DFS ≠ BFS
  - Spanning tree · Prim's ≠ Kruskal's algorithm · Round Robin algorithm
  - Shortest path · greedy approach · Dijkstra's algorithm

No unit skipped.

## 7. Database Management System (BIT202)

- **U1 Concepts and architecture**
  - Database users · benefits of databases · data models ≠ schemas ≠ instances
  - Three-schema architecture · data independence · database languages and interfaces
  - Centralized ≠ client/server architecture · classification of DBMSs
- **U2 ER model**
  - Entity type ≠ entity set · attributes · keys
  - Relationship type ≠ relationship set · roles · structural constraints
  - Weak entity type · ER diagram notation · design issues · relationships of degree higher than two
  - Superclass ≠ subclass · inheritance · specialization ≠ generalization · constraints on specialization and generalization
- **U3 Relational model**
  - Relational concepts · relational constraints · relational database schemas
  - Update operations · transactions · handling constraint violations
  - Basic relational algebra operations \[calc\]
- **U4 SQL** \[calc\]
  - Data definition · data types · specifying constraints
  - Basic retrieval ≠ complex retrieval queries
  - INSERT · DELETE · UPDATE · views
- **U5 Relational database design** \[calc\]
  - ER-to-relational mapping · informal design guidelines · functional dependencies
  - Normal forms based on primary keys · general definitions of 2NF ≠ 3NF · BCNF · multivalued dependency · 4NF
  - Properties of relational decomposition
- **U6 Transaction processing and concurrency control**
  - Transaction and system concepts · desirable properties of transactions
  - Serializable schedule · two-phase locking ≠ timestamp ordering
- **U7 Database recovery**
  - Recovery concepts · NO-UNDO/REDO (deferred update) ≠ immediate update · shadow paging
  - Backup and recovery from catastrophic failures
- **U8 NoSQL**
  - Structured ≠ unstructured data · NoSQL databases · HBase ≠ Cassandra ≠ MongoDB (basic architecture)

No unit skipped.

## 8. Operating Systems (BIT204)

- **U1 Introduction and evolution**
  - OS as extended machine ≠ OS as resource manager
  - Evolution: batch · multiprogramming · time-sharing · real-time · mainframe · handheld · embedded · smart-card · distributed · personal computer OS
  - Booting · system calls · address spaces · files · client-server model
- **U2 System structures**
  - OS components · OS services ≠ system calls
  - Monolithic ≠ layered ≠ microkernel ≠ exokernel ≠ virtual machines
  - Storage structures · I/O structures · file structures · system protection
- **U3 Process management and synchronization** \[calc\]
  - Process model · creation · termination · states · attributes · context switch
  - Process ≠ thread · user thread ≠ kernel thread
  - Scheduling: FCFS ≠ SJF ≠ priority ≠ round robin ≠ shortest remaining time first
  - IPC: race condition · critical region · mutual exclusion · busy waiting ≠ sleep and wakeup
  - Semaphores ≠ monitors ≠ message passing · classical IPC problems
  - Deadlock modelling · prevention ≠ detection ≠ recovery
- **U4 Memory management and file systems** \[calc\]
  - Address spaces · multiprogramming · swapping · overlays · memory allocation · internal ≠ external fragmentation
  - Virtual memory · paging ≠ segmentation · segmentation with paging
  - Page replacement: optimal · FIFO · LRU · LFU · NRU · clock · second chance · working set
  - File operations · access methods · directories and levels · mounting and sharing · protection · access control
  - File system layout ≠ file system implementation · file system examples
- **U5 Input/output management** \[calc\]
  - I/O devices · device controller · memory-mapped I/O · DMA
  - Programmed I/O ≠ interrupt-driven I/O ≠ DMA-based I/O · I/O software layers
  - Disk structure · disk scheduling · error handling · formatting · stable storage

No unit skipped.

## 9. Web Technology (BIT251 and BIT301)

- **Part A: Client side**
- **U1 Introduction**
  - Internet ≠ intranet ≠ WWW · static ≠ dynamic web site · single-tier ≠ two-tier ≠ multi-tier
  - Web clients ≠ web servers · HTTP request ≠ HTTP response · URL
  - Client-side ≠ server-side scripting · Web 1.0 ≠ Web 2.0
- **U2 HTML**
  - Document type declaration · head ≠ body · elements ≠ attributes · comments · entity and character references
  - Headings (h1–h6) · paragraph · division
  - Formatting: b · i · small · sup · sub · pre ≠ br · span ≠ strong ≠ tt
  - Image element · anchors · ordered ≠ unordered ≠ definition lists · tables · frames
  - Forms and form elements · meta tag
  - HTML events: window ≠ form element ≠ keyboard ≠ mouse
  - HTML5: audio · video · canvas · main · section ≠ article · header · footer · aside · nav · figure
- **U3 CSS**
  - Inline ≠ internal ≠ external · ID selector ≠ class selector
  - Colors · backgrounds · borders · text · font · list · table
  - Box model · padding ≠ margin · display property
  - Positioning: relative ≠ float ≠ absolute
  - Media queries · responsive design basics · slicing
- **U4 JavaScript**
  - Basic syntax · structure of a JavaScript program · statements: expression ≠ keyword ≠ block
  - Variables · data types · operators · flow control · looping · functions
  - Popup boxes: alert ≠ confirm ≠ prompt
  - Objects and properties · constructors · arrays · user-defined objects
  - Built-in objects: Window · String · Number · Boolean · Date · Math · RegExp · Form
  - Event handling · form validation · error handling · cookies · AJAX ≠ jQuery basics
- **U5 XML**
  - XML documents · syntax rules · elements ≠ attributes · XML tree · namespace
  - DTD ≠ XSD · XSD simple types ≠ complex types · XSD attributes
  - XSLT ≠ XQuery
- **Part B: Server side (PHP)**
- **U6 PHP basics**
  - Lexical structure · data types · variables · expressions and operators · flow control
  - Including PHP code · embedding PHP in web pages
- **U7 Functions**
  - Defining ≠ calling · variable scope · parameters · return values
  - Variable functions ≠ anonymous functions · date and time functions
- **U8 Strings and arrays**
  - Printing strings · comparing ≠ manipulating ≠ searching strings · cleaning · encoding and escaping · regular expressions
  - Indexed ≠ associative arrays · multidimensional arrays · extracting multiple values · array ↔ variables · traversing arrays
- **U9 Objects**
  - Creating objects · accessing properties and methods · declaring a class ≠ anonymous class · examining class and object
- **U10 Handling forms**
  - Building forms · retrieving form data · processing forms · setting response headers
- **U11 Working with databases**
  - Accessing a database · querying · CRUD operations using forms
- **U12 Cookies, sessions and authentication**
  - Cookies ≠ sessions · HTTP authentication
- **U13 Debugging PHP**
  - php.ini settings · error handling ≠ error reporting · exceptions · error suppression · triggering errors · error handlers · error logs
- **U14 File handling**
  - Read · write · close · file upload · parsing CSV ≠ parsing JSON

No unit skipped.

## 10. Systems Analysis and Design (BIT253)

- **U1 Foundations for systems development**
  - Systems development life cycle · traditional waterfall SDLC · CASE tools
  - Prototyping ≠ spiral ≠ rapid application development ≠ agile · object-oriented development
  - Managing the project · representing and scheduling project plans · project management software
- **U2 Planning**
  - Identifying ≠ selecting development projects · corporate and information systems planning
  - Initiating and planning projects · assessing project feasibility · baseline project plan
- **U3 Analysis**
  - Requirements determination: traditional ≠ contemporary ≠ radical methods
  - Process modeling · data flow diagrams
  - Decision tables ≠ decision trees ≠ pseudocode
  - Conceptual data modeling · gathering information for it · ER modeling basics
- **U4 Design**
  - Database design · relational model · normalization · transforming ER diagrams into relations · merging relations
  - Physical file and database design · designing fields ≠ designing physical tables
  - Designing forms and reports · formatting · assessing usability
  - Designing interfaces and dialogues · interaction methods and devices · graphical environments
- **U5 Implementation and maintenance**
  - Software application testing: alpha ≠ beta ≠ acceptance
  - Installation · documenting the system · training and supporting users · organizational issues
  - Conducting systems maintenance

No unit skipped.

## 11. Network and Data Communications (BIT254)

- **U1 Fundamentals**
  - Components · data representation · data flow · distributed processing · network criteria
  - Physical structures ≠ network models · categories of networks
  - Bridge ≠ hub ≠ switch ≠ router ≠ gateway · NIC · MAC address
  - OSI ≠ TCP/IP · protocols and standards · addressing
- **U2 Physical layer and media** \[calc\]
  - Analog ≠ digital · periodic analog signals · digital signals
  - Noise ≠ distortion ≠ attenuation · Nyquist bit rate ≠ Shannon capacity · bandwidth ≠ throughput ≠ latency
  - Conversion: analog → analog · digital → digital · analog → digital · digital → analog
  - Transmission modes · multiplexing: TDM ≠ FDM ≠ WDM
  - Guided media (twisted pair · coaxial · optical fiber) ≠ unguided media
  - Circuit switching ≠ packet switching
- **U3 Data link layer** \[calc\]
  - Functionality · framing · flow control ≠ error control
  - Error detection and correction: block coding · linear block codes · cyclic codes · checksum
  - ARQ: stop-and-wait ≠ Go-Back-N ≠ selective repeat · noiseless ≠ noisy channels
  - Multiple access: random access (ALOHA) ≠ controlled access
  - Cellular telephony · satellite network
- **U4 Network layer** \[calc\]
  - Functionality · internetworking · IPv4 ≠ IPv6 (features · addressing · datagram format)
  - Directing ≠ forwarding ≠ routing · static ≠ dynamic routing
  - Routing algorithms: shortest-path · flooding · flow-based · distance-vector ≠ link-state
  - Congestion control and prevention: leaky bucket ≠ token bucket
  - Protocols: IP · NAT · ICMP · IGMP · RIP · ARP ≠ RARP · OSPF · IGRP · EIGRP · BGP
- **U5 Transport layer**
  - Functionality · client-server paradigm · multiplexing ≠ demultiplexing
  - Connectionless ≠ connection-oriented · reliable ≠ unreliable · TCP ≠ UDP · TCP header format
  - Congestion control: open-loop ≠ closed-loop · quality of service · network performance
- **U6 Application layer**
  - DNS: namespace · domain name space · distribution of name space · generic ≠ country ≠ inverse domains
  - Resolution: resolver · name → address ≠ address → name · recursive resolution · caching
  - E-mail: SMTP ≠ POP ≠ IMAP · FTP ≠ Telnet · DHCP · HTTP · WWW · SNMP

No unit skipped.

## 12. Software Engineering (BIT302)

- **U1 Introduction**
  - Professional software development · software engineering ethics · case studies
- **U2 Software process models**
  - Software process models · process activities · coping with change · process improvement
  - Agile software development
- **U3 Requirements engineering**
  - Functional ≠ non-functional requirements · requirements engineering processes
  - Elicitation ≠ validation · requirements change · use case modeling
- **U4 System modeling**
  - Context ≠ interaction ≠ structural ≠ behavioral models · model driven architecture
- **U5 Architectural design**
  - Architectural design decisions · architectural views · architectural patterns · application architectures
- **U6 Design and implementation**
  - Object-oriented design using the UML · design patterns · implementation issues
  - Open-source development · reverse engineering
- **U7 Software testing**
  - Development testing ≠ test-driven development · types of testing
  - Verification ≠ validation · team structures
- **U8 Project management and planning**
  - Management activities · project planning · software pricing · plan-driven development
  - Project scheduling · agile planning · estimation techniques · COCOMO cost modeling \[calc\]
- **U9 Software quality assurance**
  - Software quality · quality assurance · software reviews · Capability Maturity Model
- **U10 Configuration management**
  - Version management ≠ change management ≠ release management

No unit skipped.

## 13. Management Information System (BIT353)

- **U1 Information systems in global business**
  - What's new in MIS · globalization challenges and opportunities (flattened world) · the emerging digital firm
  - Strategic business objectives · dimensions of an information system · complementary assets · business perspective ≠ technical perspective · academic disciplines used to study IS · sociotechnical systems
- **U2 Global business and collaboration**
  - Business processes and information systems
  - TPS ≠ MIS ≠ DSS ≠ ESS (by management group)
  - Systems for linking the enterprise · e-business ≠ e-commerce ≠ e-government
  - Collaboration ≠ social business · information systems function in a business
- **U3 Information systems, organization and strategy**
  - Organizational features · economic impacts ≠ organizational and behavioral impacts
  - Porter's competitive forces model · dealing with forces using information systems
  - Business value chain model ≠ value web · challenges of strategic information systems
- **U4 Ethical and social issues**
  - Five moral dimensions · key technology trends that raise ethical issues
  - Responsibility ≠ accountability ≠ liability · ethical analysis
  - Candidate principles: Golden Rule · Kant's Categorical Imperative · Descartes' rule of change · Utilitarian principle · Risk Aversion principle · Ethical No-Free-Lunch rule
  - Professional codes of conduct · information rights ≠ property rights · system quality · quality of life
- **U5 Foundations of business intelligence**
  - File environment problems · DBMS capabilities · designing databases
  - Nonrelational databases ≠ cloud databases ≠ blockchain
  - Tools for accessing information · big data challenges · business intelligence infrastructure · analytical tools · data quality
- **U6 Key system applications**
  - Enterprise systems ≠ enterprise software · supply chain management: push-based ≠ pull-based
  - Customer relationship management · business value of CRM · challenges of enterprise applications
  - Knowledge management · AI and machine learning in business · knowledge work systems
- **U7 Enhancing decision making**
  - Structured ≠ semi-structured ≠ unstructured decisions · decision-making process
  - Business intelligence ≠ business analytics · KPIs · decision support for operational ≠ middle ≠ senior management

No unit skipped.

## 14. E-Commerce (BIT403)

- **U1 Introduction**
  - E-commerce ≠ e-business · seven unique features (ubiquity · global reach · universal standards · richness · interactivity · information density · personalization)
  - Types: B2C ≠ B2B ≠ C2B ≠ C2C · mobile ≠ social ≠ local e-commerce · pure ≠ partial e-commerce
  - History: invention · consolidation · reinvention · technology ≠ business ≠ society perspectives
  - Challenges · status of e-commerce in Nepal
- **U2 Business models**
  - Business model · key elements · raising capital: seed capital · elevator pitch · incubators · angel investors ≠ venture capital · crowdfunding
  - B2C models: e-tailer · community provider · content provider · portal · transaction broker · market creator · service provider
  - B2B models: net marketplaces (e-distributor · e-procurement · exchanges · industry consortia) ≠ private industrial networks
  - EDI · EDI layered architecture · EDI in e-commerce
  - Industry value chain ≠ firm value chain ≠ firm value web · case studies
- **U3 Security**
  - Six dimensions: integrity · nonrepudiation · authenticity · confidentiality · privacy · availability
  - Threats: malicious code · potentially unwanted programs · phishing ≠ pharming ≠ spoofing · hacking · cybervandalism ≠ hacktivism
  - Data breaches · credit card fraud ≠ identity fraud · spam · sniffing ≠ man-in-the-middle · DoS ≠ DDoS · insider attacks
  - Social network ≠ mobile platform ≠ cloud ≠ IoT security issues
  - Solutions: cryptography · digital envelopes · digital certificates and PKI · SSL ≠ TLS ≠ HTTPS · VPN · firewalls · intrusion detection ≠ prevention · antivirus
  - Authorization · security plan · laws and public policies · Electronic Transaction Act of Nepal
- **U4 Payment systems**
  - Online credit card transactions ≠ online stored value payment · mobile payment · blockchain and cryptocurrencies
  - EBPP: biller direct ≠ consolidator ≠ online banking ≠ mobile
  - Auctions: English ≠ Dutch ≠ Vickrey ≠ double
  - SET protocol: features · participants · cardholder registration ≠ merchant registration · purchase request · dual signature · payment authorization ≠ payment capture
  - Status of e-payment in Nepal · case studies
- **U5 Building an e-commerce system**
  - Static ≠ dynamic catalogs · shopping cart · transaction processing
  - Databases · application programs · integration with ERP ≠ payment gateways · open source CMS · hosting
- **U6 Marketing and advertising**
  - Consumer behavior models · online purchase decision · ad targeting
  - Search engine marketing ≠ display ad ≠ e-mail ≠ affiliate ≠ viral ≠ lead generation marketing
  - Social ≠ mobile ≠ local ≠ multi-channel marketing
  - Online marketing metrics lexicon · costs of online advertising · pricing models for ads
  - Social marketing process · Facebook ≠ Twitter ≠ Pinterest tools · location-based marketing tools
- **U7 Optimizing e-commerce systems**
  - SEO · how search engines work · on-page ≠ off-page SEO · page rank
  - Google Analytics ≠ social media analytics · recommendation systems: collaborative ≠ content-based

No unit skipped.

## 15. Computer Graphics (BIT304)

- **U1 Overview of graphics systems**
  - Definition and representative uses · application areas · computer graphics ≠ image processing · coordinate systems
  - Scan conversion ≠ rasterization ≠ rendering
  - Raster scan ≠ random scan displays · raster system with display processor ≠ random scan architecture
- **U2 Output primitives** \[calc\]
  - DDA ≠ Bresenham line algorithm · midpoint circle algorithm · midpoint ellipse algorithm
  - Scan-line polygon fill · inside-outside tests · boundary fill ≠ flood fill
- **U3 2D geometric transformations** \[calc\]
  - Translation ≠ scaling ≠ rotation · matrix representation · homogeneous coordinates
  - Composite transformations · reflection ≠ shear
- **U4 2D viewing and clipping** \[calc\]
  - Viewing transformation pipeline · window-to-viewport transformation
  - Point clipping · Cohen-Sutherland ≠ Liang-Barsky line clipping · Sutherland-Hodgeman polygon clipping
- **U5 3D graphics**
  - 3D translation · rotation · scaling · reflection · shear · rotation about an arbitrary axis
  - Parallel ≠ perspective projection (matrix representation)
- **U6 3D object representation and curves**
  - Boundary surface ≠ space partitioning representation · polygon table ≠ polygon mesh
  - Wireframe ≠ sweep representation · octree
  - Bezier curve ≠ B-spline curve · color models: RGB ≠ CMY ≠ HSV
- **U7 Visible surface detection**
  - Image-space ≠ object-space techniques
  - Back-face detection · Z-buffer ≠ A-buffer · scan-line method · painter's algorithm · area subdivision
- **U8 Illumination and surface rendering**
  - Ambient ≠ diffuse ≠ specular reflection
  - Constant ≠ Gouraud ≠ Phong shading
- **U9 Virtual reality and animation**
  - VR concept · components of a VR system · types of VR systems · 3D position tracker · navigation ≠ manipulation interface · applications
  - Animation: traditional techniques · principles · key framing · character and facial animation · deformation · motion capture
- **U10 OpenGL**
  - Callback functions · color commands · drawing pixels ≠ lines ≠ polygons · viewing · lighting

No unit skipped.

## 16. Artificial Intelligence (BIT252)

- **U1 Introduction**
  - History of AI · AI perspectives · Turing test · foundations of AI · scope of symbolic AI · applications
- **U2 Agents**
  - PEAS description
  - Simple reflex ≠ model-based ≠ goal-based ≠ utility-based ≠ learning agent
  - Environment types: deterministic ≠ stochastic · static ≠ dynamic · observable ≠ semi-observable · single-agent ≠ multi-agent
- **U3 Problem solving by searching** \[calc\]
  - Problem formulation · state space representation · constraint satisfaction problems · performance evaluation of search
  - Uninformed: DFS ≠ BFS ≠ depth-limited ≠ iterative deepening ≠ bidirectional
  - Informed: greedy best-first ≠ A\* ≠ hill climbing
  - Games: minimax ≠ alpha-beta pruning
  - Problem decomposition: goal trees ≠ AO\*
- **U4 Knowledge representation** \[calc\]
  - Knowledge ≠ knowledge representation · issues · properties of representation systems
  - Propositional logic: syntax ≠ semantics · CNF · inference using resolution · forward chaining ≠ backward chaining
  - Predicate logic (FOPL): syntax ≠ semantics · quantification · unification ≠ lifting · resolution
  - Semantic nets ≠ frames ≠ rule-based systems ≠ scripts ≠ conceptual dependency
  - Statistical reasoning: uncertain knowledge · random variables · prior ≠ posterior probability · Bayes' rule · Bayesian networks · reasoning in belief networks · Dempster-Shafer theory
- **U5 Neural networks**
  - Mathematical model of ANN · designing a neuron · feed-forward ≠ recurrent · single-layered ≠ multi-layered
  - Learning rule ≠ learning rate · applications
- **U6 Machine learning**
  - Supervised ≠ unsupervised ≠ reinforcement learning
  - Learning by analogy · learning by genetic algorithm · learning by back-propagation
- **U7 Expert systems**
  - Architecture · development · applications
- **U8 Natural language processing**
  - Understanding ≠ generation
  - Lexical ≠ syntactic ≠ semantic ≠ discourse and pragmatic analysis · ambiguities in NLP

No unit skipped.

## 17. Basic Mathematics (MTH104)

- **U1 Functions**
  - Functions and graphs · combining functions · shifting ≠ scaling graphs · trigonometric functions · exponential functions ≠ inverse functions and logarithms · rates of change ≠ tangents to curves
- **U2 Limits and continuity** \[calc\]
  - Limit laws · precise definition of a limit · one-sided limits · continuity · limits involving infinity ≠ asymptotes of graphs
- **U3 Differentiation** \[calc\]
  - Derivative at a point ≠ derivative as a function · derivative as a rate of change · derivatives of trigonometric functions
  - Chain rule · implicit differentiation · derivatives of inverse functions and logarithms · inverse trigonometric functions · related rates
- **U4 Applications of derivatives** \[calc\]
  - Extreme values of functions · mean value theorem · monotonic functions and the first derivative test · concavity and curve sketching
  - Indeterminate forms and L'Hôpital's rule · applied optimization · Newton's method
- **U5 Integration** \[calc\]
  - Antiderivatives ≠ indefinite integrals · area and estimating with finite sums · sigma notation and limits of finite sums
  - Definite integral · Fundamental theorem of calculus · substitution method · substitution and area between curves
- **U6 Applications of definite integrals** \[calc\]
  - Volumes: cross-sections ≠ cylindrical shells · arc length · areas of surfaces of revolution · work and fluid forces · moments and centers of mass
- **U7 Techniques of integration** \[calc\]
  - Integration by parts · trigonometric integrals ≠ trigonometric substitutions · partial fractions
  - Integral tables and computer algebra systems · numerical integration · improper integrals
- **U8 First order differential equations**
  - Solutions · slope fields · Euler's method · first order linear equations · applications
  - Graphical solutions of autonomous equations · systems of equations and phase planes
- **U9 Infinite sequence and series**
  - Sequences ≠ infinite series · integral test · comparison tests · ratio test ≠ root test · alternating series
  - Absolute ≠ conditional convergence · power series · Taylor ≠ Maclaurin series · convergence of Taylor series
- **U10 Partial derivatives** \[calc\]
  - Functions of several variables · limits and continuity in higher dimensions · partial derivatives · chain rule
  - Directional derivatives ≠ gradient vectors · tangent planes and differentials · extreme values ≠ saddle points
  - Lagrange multipliers · Taylor's formula for two variables · partial derivatives with constrained variables

No unit skipped.

## 18. Linear Algebra and Abstract Algebra (MTH168)

- **U1 Linear equations** \[calc\]
  - System of linear equations · row reduction ≠ echelon forms · vector equations ≠ matrix equation Ax = b · applications of linear systems · linear independence
- **U2 Transformation**
  - Linear transformations · matrix of a linear transformation · linear models
- **U3 Matrix algebra** \[calc\]
  - Matrix operations · inverse of a matrix · characterizations of invertible matrices · partitioned matrices · matrix factorization
  - Leontief input-output model · subspace of R^n · dimension ≠ rank
- **U4 Determinants** \[calc\]
  - Properties · Cramer's rule · volume and linear transformations
- **U5 Vector spaces**
  - Vector spaces ≠ subspaces · null spaces ≠ column spaces · linear transformations · linearly independent sets ≠ bases · coordinate systems
- **U6 Vector space continued**
  - Dimension of vector space ≠ rank · change of basis · difference equations · Markov chains
- **U7 Eigenvalues and eigenvectors** \[calc\]
  - Eigenvectors ≠ eigenvalues · characteristic equation · diagonalization · eigenvectors and linear transformations
  - Complex eigenvalues · discrete dynamical systems · differential equations
- **U8 Orthogonality and least squares** \[calc\]
  - Inner product ≠ length ≠ orthogonality · orthogonal sets · orthogonal projections · Gram-Schmidt process
  - Least squares problems · linear models · inner product spaces · applications of inner product spaces
- **U9 Groups and subgroups**
  - Binary operations · groups ≠ subgroups · cyclic groups
- **U10 Rings and fields**
  - Rings ≠ fields · integral domains

No unit skipped.

## 19. Basic Statistics (STA154)

- **U1 Introduction**
  - Basic concept of statistics · applications in IT · scales of measurement · variables · types of data ≠ data source
  - Data preparation: editing ≠ coding ≠ transcribing
- **U2 Diagrammatical and graphical presentation**
  - Bar diagrams ≠ pie diagrams · Pareto chart · graph of frequency distribution
- **U3 Descriptive statistics** \[calc\]
  - Central tendency ≠ dispersion ≠ skewness ≠ kurtosis · moments
  - Stem and leaf display · five number summary ≠ box plot
- **U4 Introduction to probability** \[calc\]
  - Concepts ≠ definitions of probability · laws of probability · Bayes theorem · prior ≠ posterior probabilities
- **U5 Random variables and mathematical expectation** \[calc\]
  - Random variable · types of random variables · probability distribution of a random variable
  - Mathematical expectation · addition ≠ multiplicative theorems of expectation
- **U6 Probability distributions** \[calc\]
  - Probability distribution function · binomial ≠ Poisson ≠ normal distribution · characteristic features · applications in IT
- **U7 Sampling and sampling distribution** \[calc\]
  - Population · sample survey ≠ census survey · sampling error ≠ non-sampling error · types of sampling
  - Standard error of mean ≠ standard error of proportion · sampling distribution of mean ≠ proportion
  - Need of inferential statistics · estimation · confidence interval for mean ≠ proportion
- **U8 Correlation and linear regression** \[calc\]
  - Bivariate data ≠ bivariate frequency distribution · correlation between two variables
  - Karl Pearson's r ≠ Spearman's rank correlation · lines of regression by least squares · coefficient of determination

No unit skipped.

---

# APPENDIX: LEVELS, SCOPE, OPTION-QUALITY & VARIANT RULES FOR AI QUESTION GENERATION

*This section governs any AI agent generating practice questions from this document. It is a hard constraint, not a suggestion: follow it before generating any question set.*

## Candidate Profile
The learner is a **BSc CSIT graduate** preparing for the MIT entrance exam (100 MCQs, 120 min).
- Core CS/IT fundamentals were studied and passed years ago, so recall is *rusty*, not absent.
- The candidate is not a fresher or a non-CS student. Weak recall of a topic means "needs review", never "teach from zero".

## Rule 1 — Match the Real Exam Mix and Depth (no trivial questions, no over-hard ones)
The real paper is about **60–70% single-fact recall, 20–30% pick-the-sibling (A ≠ B), about 10% one-step calculation or trace**. Generate questions in roughly that mix. Do **not** turn everything into scenarios or derivations: the exam's depth ceiling is one fact or one small step (Part I, section 2).

- **Banned (too easy):** anything a person with no CSIT background could guess; "What does CPU stand for?"; "Is a mouse an input or output device?"; any question where 3 of 4 options are absurd or unrelated.
- **Banned (too hard):** derivations, multi-step proofs, long programs. Exact or advanced but still in-syllabus items are not banned; they are simply high-level and low-priority (Rule 3).
- **Target:** a precise fact, a confusable pair from the recall web (the `A ≠ B` cues), or one small `[calc]` step.

## Rule 2 — Strictly No Out-of-Scope Content
Every question must map to one specific topic in the **Part II recall web** (every syllabus unit is in it).
- Do not add topics, tools, frameworks or theory the web does not name, even if related or "commonly asked".
- Do not escalate beyond what a unit lists (e.g. the DBMS unit stops at 4NF, so no 5NF question).
- If unsure whether a concept is in scope, **exclude it**.

## Rule 3 — Levels and Priority (every question carries one)
Each question gets a **level 0–3**. Lower level = higher priority: finish Level 0 across all 19 subjects before leaning on Level 1, and so on.

| Level | Meaning | Examples |
|---|---|---|
| **L0 Core** | The backbone of the subject: you cannot understand the rest without it, or it is reused in other subjects. Must be known cold | C: precedence, loops, arrays, functions, pointer basics · DSA: stack/queue, linked-list ops, tree traversals, sort complexities · DBMS: keys, SELECT/JOIN/GROUP BY, execution order, normal forms to 3NF, ACID · OS: process vs thread, scheduling, deadlock conditions, paging · CN: OSI/TCP-IP, TCP vs UDP, IP classes, devices by layer · DL: number systems, gates, Boolean laws, adders, flip-flops · Calculus: derivative rules, limits, critical points, definite integral · LA: determinant, inverse, rank, systems · Stats: mean/variance, probability, Bayes, basic distributions |
| **L1 Standard** | Ordinary syllabus content, a normal single fact or sibling pair | SDLC models, testing types, ER specialization, architectural views, CSS/PHP basics, 8085 registers and flags |
| **L2 Exact / detailed** | Needs an exact number, step order or syntax that is hard to reason out; less central | header sizes, class ranges, COCOMO constants, Peterson's algorithm, 8085 pin and timing details, the exact TCP header size |
| **L3 Advanced / low value** | Advanced, very exact, or high effort for few likely marks. Includes everything marked "skip" in Part I, section 3 | Booth's algorithm steps, Gram-Schmidt, SET protocol steps, Liang-Barsky parameters, Dempster-Shafer, microprogramming, ALU design |

**How to assign a level** (ask in order, stop at the first yes for L3, then L2, otherwise use centrality):
1. High effort for very few marks, or advanced beyond the exam's depth? → **L3**.
2. Does answering need an exact number, step order or syntax that cannot be reasoned from the concept? → **L2**.
3. Is it a foundation of the subject, or reused in other subjects (the "study once, score twice" list in Part I)? → **L0**.
4. Otherwise → **L1**.

**Rules for levels**
- The level does **not** depend on whether a similar question appeared in the model paper. A core topic that was never sampled is still L0, and "not sampled" never lowers a level.
- Default mix of a generated set: about **L0 50% · L1 30% · L2 15% · L3 5%**. Shift toward L0 for Red subjects. Use L3 only after the learner is solid on L0–L2 or asks for stretch practice.
- Tag every question, e.g. `[L0 · OS · U4]`, and repeat the tag in the answer key so the learner can see which level they are missing.
- When a learner misses an L0 question, regenerate it with new values (Rule 9) before moving on.

## Rule 4 — Distractors Come From Misconceptions, Not Randomness
Every wrong option must be a mistake a real student would plausibly make:
- the **sibling concept** from an `A ≠ B` pair (e.g. alpha for beta testing, 2NF for 3NF, UDP for TCP);
- a **classic calculation slip** (forgot ÷det, used the wrong base, off-by-one, ignored an endpoint, swapped precedence);
- a **partly right statement** with one wrong word (strict vs relaxed, sender vs receiver, MAX vs MIN).
Each distractor should be traceable to a specific confusion. If you cannot name the confusion it represents, rewrite it.

## Rule 5 — Options Must Not Give the Answer Away
- All four options are within about **20% of the same word length**, with the same grammatical structure and level of detail.
- The correct option must **not** be the longest or most specific one. Across a set, it should be the longest option no more than about 25% of the time.
- No grammar cues (a/an mismatch with the stem), no absolute words ("always", "never", "only") used only in wrong options, no repeated stem wording only in the key.
- "All of the above / Both" appears rarely (the real paper has about 6 in 80) and is only correct when every other option is truly true.

## Rule 6 — Answer Positions Are Balanced
- Decide each question's correct position independently and spread keys evenly across a, b, c, d (about 25% each over a set; never the same letter more than twice in a row).
- Output the question set **without** the key, then the key as a separate list at the end.
- Do not put the correct option first by default.

## Rule 7 — Critic Pass Before Output (generate, then attack)
After drafting each question, run a second pass as a hostile reviewer, and rewrite or discard any question that fails:
1. Can it be answered without knowing the material (by length, wording or absurd options)?
2. Is the correct answer obvious from being longest, most detailed or most "textbook"?
3. Is any distractor absurd, or could two options both be defended? (One true answer only.)
4. Is it traceable to one recall-web topic, within the depth ceiling, and correctly levelled (Rule 3)?
5. Is every calculation re-solved from scratch, and does the key match?
Only questions that survive all five are shown. Present only survivors, never the draft and the critique together.

## Rule 8 — Style Examples (copy the pattern, not the topic)
**Sibling question (Software Engineering, L1):** Which statement correctly separates verification from validation?
- a. Verification checks the product against its specification; validation checks it against the user's real needs.
- b. Validation checks the product against its specification; verification checks it against the user's real needs.
- c. Verification is done only on running code; validation is done only on written documents.
- d. Verification involves end users testing the product; validation involves developers inspecting it.
*Key: a. Distractors: b = swapped definitions, c = confusing the activity with the artifact, d = confusing it with beta testing.*

**One-step calculation (Operating Systems, L0):** A system has a 128 KB virtual address space and a 4 KB page size. How many bits of a virtual address are used for the page number?
- a. 12  b. 7  c. 5  d. 17
*Key: c (128 KB ÷ 4 KB = 32 pages = 2⁵). Distractors: 12 = offset bits, 7 = log₂128 ignoring the page size, 17 = total address bits.*

## Rule 9 — Regenerable Question Families (same concept, new values)
Goal: practise the **concept**, not the remembered answer. A family is one concept written as a template with variable slots, so it can be regenerated endlessly. Families work for calculations and also for non-calculation concepts, as long as the same reasoning applies to a new case.

**How to generate variants**
- Change the slot values **and** the surface form (names, scenario, domain). Keep the concept and the reasoning identical.
- Compute each answer from the family's answer rule (re-solve it, do not guess). Build each distractor by applying a specific slip rule to the same values, so every wrong option is a genuine wrong result and none equals the key.
- Within one batch from the same family: all keys have different values and different positions, and avoid coincidences (the answer appearing in the stem).
- Avoid degenerate values (0, 1, equal numbers, trivial powers) unless the family is testing that case.
- Rotate which slips are used as distractors between variants, so the pattern of wrong options is not memorised either.
- Non-calc families vary the *discriminating clue* (who tests, where, what is shared), not just the names, so the learner has to reason.
- Do not force a family onto a one-off fact (who proposed X, a single definition). Families are for stable, reasoned patterns.
- Tag each variant `[L? · subject · Fam ID · vN]`. Re-test a missed family at +1, +3, +7, +14 days with fresh values each time, never the same numbers twice.

**Starter families** (add more by the same pattern; ID · concept · slots → answer rule · distractor slips)
1. **OS-01 · page-number bits (L0):** virtual address space 64 KB–1 MB, page size 1–8 KB, at least 4× smaller → bits = log₂(space ÷ page). Slips: offset bits log₂(page), total address bits, log₂ of the space figure alone.
2. **OS-02 · average waiting time FCFS vs SJF (L0):** 3–4 burst times, same arrival → compute both averages. Slips: using turnaround time, SJF order reversed, forgetting the first process waits 0.
3. **DL-01 · flip-flops for a mod-N counter (L0):** N ∈ 5–100, not a power of 2 → ⌈log₂N⌉. Slips: ⌊log₂N⌋, N, ⌈log₂(N+1)⌉ when it differs.
4. **DL-02 · n-bit 2's complement range or value (L0):** n ∈ 4, 6, 8, 16, or a value to negate → range −2ⁿ⁻¹ … 2ⁿ⁻¹−1, or invert + 1. Slips: 1's complement, forgetting +1, sign-magnitude range, 0 … 2ⁿ−1.
5. **MP-01 · pipeline cycles (L1):** k stages 3–6, n tasks 5–20 → k + n − 1. Slips: k × n, k + n, n − k + 1.
6. **DSA-01 · bubble-sort swaps = inversions (L0):** 5–6 distinct numbers → count pairs out of order. Slips: n(n−1)/2 (comparisons), number of passes, n − 1.
7. **DSA-02 · infix → postfix (L0):** 3–4 operators, mixed precedence, optional brackets → apply the stack algorithm. Slips: ignoring precedence, keeping infix order, giving prefix.
8. **LA-01 · 2×2 determinant or inverse (L0):** integers with det ≠ 0 and ≠ ±1 → (1/det)[[d,−b],[−c,a]]. Slips: forgetting ÷det, wrong off-diagonal signs, swapping a and d without negating.
9. **STAT-01 · shift and scale (L0):** mean m, variance v, new data ax + b → mean am + b, variance a²v. Slips: variance a·v, variance a²v + b, mean am.
10. **CAL-01 · limit as a derivative (L0):** lim (xᵏ − aᵏ)/(x − a) → k·aᵏ⁻¹, or solve for k from a given value. Slips: aᵏ⁻¹ (forgot k), k·aᵏ (power not reduced), (k−1)·aᵏ⁻².
11. **CN-01 · IPv4 class from the first octet (L0):** first octet away from boundaries → A 0–127, B 128–191, C 192–223, D 224–239. Slips: class of the neighbouring range, treating 127 or 0 as ordinary.
12. **SE-01 · testing type from a scenario (L1, non-calc):** who tests (in-house staff / selected real users / the client for contract acceptance) and where (developer site / user site) → alpha / beta / acceptance. Slips: the other two types, unit or integration testing.
13. **DBMS-01 · which normal form is violated (L0, non-calc):** a small relation with its functional dependencies → repeating group = 1NF, partial dependency = 2NF, transitive dependency = 3NF, non-key determinant = BCNF. Slips: the neighbouring normal forms.
14. **AI-01 · greedy vs A\* choice (L1):** nodes with given g and h → greedy picks lowest h, A\* picks lowest g + h. Slips: using g alone, using h in A\*, adding instead of comparing.

## Rule 10 — Flashcards and Concept Sheets From MCQ Performance
After every session, from the learner's miss log (question, subject, topic, confidence, cause K/W/A/G, level), generate revision material that updates with their performance. The goal is understanding, not memorising letters.

**Cards (one fact per card, cue → free recall, not MCQ-format)**
- **A ≠ B pair card:** front = the discriminating clue; back = which concept it is, the other concept, and the one-line difference.
- **Cloze card** for definitions and ordered lists (keep lists to 5–7 items).
- **Lure card:** for the specific wrong option the learner chose, front = the wrong statement, back = why it is wrong and what the correct fact is. Use cue-style fronts, not four-option fronts, so wrong options are not rehearsed.
- **Calculation topics:** no formula-only cards. Give a worked example plus 2 fresh variants from the family (Rule 9).
- Every back shows the answer plus the one-line reason.

**Concept sheet (per Red/Amber subject)**
- 5–8 L0 concepts maximum, built from the Part II recall-web cues.
- Each concept: 2–3 lines, one tiny example, one "confused with" line, one blank-page recall prompt ("write everything you know about X").
- Rebuilt after every session so it shows the learner's current weakest L0 concepts first.

**Update rules**
- Right at confidence 1 (a lucky guess) counts as a miss. Wrong at confidence 3 gets top priority.
- Order: lowest level first, then most misses, then lowest confidence.
- A card graduates after 3 correct recalls at +1, +3, +7, +14 days. A card missed twice is **rewritten a different way** with an explanation, not simply repeated.
- At most about 20 new cards a day. Retire cards of Green subjects, but keep their A ≠ B cards.
- Never present only the key: always include the explanation.

## Rule 11 — Calibration Check (before finalizing any question)
1. **Traceable** to one recall-web topic. 2. **Levelled** (Rule 3) and tagged. 3. **Non-trivial** for a CSIT graduate. 4. **Matched depth** (one fact, one pair, or one small step). 5. **Rules 4–7 satisfied** (misconception distractors, balanced lengths, balanced key position, survived the critic pass). 6. **If from a family**, values differ from every earlier variant. 7. **If revision material** is requested, it follows Rule 10. 8. **Set order** follows Rule 12 (every subject in one unbroken run).
If any check fails, discard and regenerate.

## Rule 12 — Mixed Sets Keep Each Subject in One Unbroken Run
Any set, drill, mock or review round that covers more than one subject is built **subject by subject**.
- A set may cover any number of subjects and any number of questions per subject (for example 3 IIT, then 4 DBMS, then 6 OS).
- Each subject appears in **exactly one** unbroken run per set. Never alternate: IIT, DBMS, IIT is forbidden, even for a single question.
- Inside a run, units may be mixed freely. This is where interleaving confusable pairs pays off (Part I, section 14).
- Order of runs: for mocks, follow the real layout (Math/Stats first, then computing subjects in blocks of 5). For practice sets, weak-first or random. Show the subject label at the start of each run.
- Applies equally to flashcard rounds and error-log re-tests: group due items by subject.
- **Why:** the real paper is grouped by subject, so grouped practice matches it; switching subject costs mental effort; subject-level blocks keep the spacing benefit because subjects still return on different days; and the interleaving evidence is mostly about *similar* categories, which sit inside one subject.
- **Check before output:** read the sequence of subject labels. If any subject reappears after a different subject has started, regroup.

---

# TOOL ADJUSTMENTS (general, not specific to this guide)

*Settings for any practice tool or its prompt. Kept separate from the question-generation rules above.*

## 1. No exam countdown; adjust quietly instead
A visible countdown mostly adds anxiety without helping the work.
- Show no days-left counter, "X days to exam", urgency colours, or time-remaining text anywhere (home screen, reminders, summaries).
- Keep the exam date only as a private setting that drives behaviour. As the date nears, the tool adjusts silently: fewer new items, more mixed and timed practice, weak and core items reviewed more often, review intervals capped so everything due is seen before the date, and a lighter load in the last few days.
- **Scheduler:** use an FSRS-style scheduler (target retention about 85-90%, default parameters until about 1,000 reviews exist) rather than fixed intervals alone. Community benchmarks report roughly 20-30% fewer reviews than SM-2 for the same retention. Always cap intervals so every card is seen at least once in the final 2 weeks.
- Use neutral wording ("today's practice"). No guilt or "behind schedule" messages for missed days.
- If the date is unset or changes, re-plan silently or fall back to the default schedule.

## 2. Subject drill draws from the whole question bank
- The user chooses how many questions they want, and the tool draws that many from **every question stored for that subject**, across all sets and sources, not only the current set.
- A multi-subject drill follows Appendix Rule 12 (each subject one unbroken run).
- No repeats inside one drill. Show how many questions are available before the user picks a number; if they ask for more than exist, give all and say so.
- Optionally favour weak or due items, but never limit the pool to them unless the user chooses that filter.

## 3. Go back to the previous question
- A Back button (and Forward to return). Back is disabled on the first question.
- Going back shows the earlier answer, and the options stay in the same order, never reshuffled.
- Before the answer is revealed, the user can change it; after reveal, the feedback is read-only.
- In practice mode only the first attempt counts for stats and spaced repetition. In a timed mock, answers can be changed until submit, flags are kept, and the final answer counts.
- Going back never resets or pauses the timer, and position and answers survive closing the app.

## 4. Free Gemini API: efficient generation, updating and verification

**Settings, not hard-coded values.** Free-tier model names and limits change often, and the exact per-model limits are shown only inside Google AI Studio. Make the model name and daily request limit settings, show a local request counter, and on a rate-limit error queue the job and use stored material. Sources disagree on which models are free and on the daily allowance (reports range from about 20 to about 1,500 requests a day, and on whether Pro is free), so treat every number as unverified until you read it in AI Studio. In general, Flash-Lite style models allow more requests than the bigger Flash models. Use Flash-Lite for bulk generation and a Flash model only for verification and hard items.

**Privacy.** Free-tier inputs and outputs may be used by Google to improve its products. Send only question text and topic labels, never personal details.

**Cut calls and tokens**
- **Batch.** Daily *requests* are scarcer than tokens on the free tier, so ask for 10–15 questions or cards per call (one topic or family), not one per call.
- **Tiny prompt.** Send a stored ~300-token rules card (distilled from Appendix Rules 1–10), not this whole guide. Per call add only: topic ID, level, count, family ID, the 3–6 recall-web cue lines for that topic, and short IDs of questions that already exist.
- **Local caching.** Store everything. Never regenerate what is stored. Pre-generate small batches in the background so you never wait.
- **Code, not the model, for calc families.** Build the Appendix Rule 9 calc families (page bits, waiting time, pipeline cycles, 2×2 inverse and so on) as small local functions. They produce correct values and options for free, and the model is used only for wording and for non-calc families.
- **Keep reasoning short.** Where the model allows it, set a low thinking budget for bulk work, since thinking tokens count as output tokens. Use low temperature for facts.

**Clean return format** (structured JSON output with a schema, no prose or markdown)
```json
{"items":[{"q":"...","ans":"...","wrong":["...","...","..."],"why":"<=25 words","dx":["why wrong 1","why wrong 2","why wrong 3"],"topic":"OS.U4","lvl":0,"fam":"OS-01","src":"cue id"}]}
```
- The model returns the correct answer and the three wrong ones separately; **the app shuffles them** (Rule 6).
- One retry with "return valid JSON only" on a parse failure, then skip the item.

**Updating: keep one good question per slot, retire the rest.**
- Each question stores: ID, topic, the one concept it tests, level, family, status (active or retired), times seen, miss rate and last seen.
- Each concept has a small number of slots (about 3–5 for L0, fewer for higher levels). Fill thin slots first, using the miss data.
- **Retire** (archive, don't delete) a question when: it is a near-duplicate and a better one exists; its key or scope is wrong; it was answered right, fast and sure three times in a row; or you flagged it as unclear. Never retire the only question left for a concept.
- Find near-duplicates **locally** (same concept and answer plus high word overlap). Send only ambiguous pairs, in one batch, to ask which is better. To fix a flagged question, send just that question and the reason.
- Flashcards use the same pipeline. Generate them only for what you missed or guessed (Rule 10), one batch per session end, de-duplicated by concept.

**Double verification (so wrong facts don't reach you)**
1. **Code checks (free):** valid schema, four distinct options, key not repeated, length spread within about 20%, topic and level exist, and for calc families the answer recomputed in code.
2. **Grounding:** give the model the recall-web cue lines and tell it to flag any fact not supported by them as `ungrounded`.
3. **Blind solve:** a separate call (ideally a different model) gets only the question and options, with no key, and answers with a one-line reason. Disagreement or "ambiguous" means the item is held back or regenerated. Run it in batches, so one generate call plus one verify call yields 10–15 checked items.
4. **Unresolved items** are marked `unverified` and shown with a small "check this" badge, never as settled fact.
5. **Your flag and spot-check:** a "this looks wrong" button quarantines an item until re-verified, and once a week you check 5 random AI items against your textbook and record the error rate.
6. **Textbook-dependent facts** (the Part I verify list) are labelled with their chapter and never treated as final just because the AI agreed.
Two AI passes lower errors but do not remove them, because both can share the same mistake. That is why code checks, a different second model, and your flag all exist.

## 5. Interactive, low-friction and rewarding, but still teaching

The goal is something you want to open again, that is also doing real learning work. If it only feels fun, it is not enough; if it feels like homework, you will stop.

**Low friction**
- **One-tap start:** a "Continue" button builds today's round (due cards, weak L0 concepts, a few new items). No menus.
- **Short rounds** of 5–10 minutes with a clear end and an optional "one more round". Time to first question under about 5 seconds.
- **Fast controls:** keys 1–4 to answer, 1–3 for confidence, Space for next, B for back. Everything preloaded and stored locally; API calls only in the background.
- Auto-record time, answer changes and back-use instead of asking for tags (see the earlier friction rules).

**Rewards that track learning, not clicking**
- Show what actually moved: concepts upgraded Red → Amber → Green, misses that came back correct after a gap, calibration improving (confidence matching accuracy), mock trend, and the milestone ladder (Part I, section 13).
- Give **no progress credit for farming easy, already-mastered items**. Weak and L0 items count for more.
- Any streak is optional, with grace days and the weekly light day counting, and it never punishes a missed day.
- A 20-second recap at the end of each round: 3 things you now know, 2 to revisit.

**Variety and choice**
- Mix formats inside a round: a recall card, an MCQ, a calc variant, an A ≠ B pair. Keep each subject in one unbroken run, formats mixed only inside that subject (Rule 12).
- After a round, offer 2–3 next options (including an interest break from Part I, section 12), so you stay in control.

**Keep it teaching**
- Every round includes some answers recalled without options, and always shows the explanation on a miss.
- Aim for items that are mostly answerable but not trivial (about 75-85% correct is a sensible target; the "85% rule" comes from simple two-choice learning tasks, so treat it as a guide, not a law; tune it from your own data).
- No notification guilt, and a quiet mode near the exam.

**Check that it works**
Track sessions started per week, round completion rate, time to first question, confidence skip rate, weekly drop in miss rate per subject, and the gap between confidence and accuracy. If you stop opening it, cut friction; if your scores do not move, the rounds are too shallow.

## 6. Engagement design: habit-forming but professional

*Based on design judgement plus the progress and competence research (Part I, section 13). Not tested on a study tool, so judge it by results.*

**Build these first, in order**
1. **Instant start with a clear end.** One "Continue" button builds today's round (5–10 min) and shows a finish line. A low starting cost brings people back, and a defined end makes "one more round" easy.
2. **One honest progress map.** A subject grid with each topic as Red, Amber or Green, plus a before and after view against the diagnostic. This is the main reward. It shows real mastery, not points, and a topic changing colour is the moment worth marking.
3. **A "recovered" mark.** When you answer correctly a question you missed before, after a gap, show a distinct small mark and count it. It is the most meaningful win, because it shows a weakness becoming a strength.
4. **Fast, calm feedback.** The answer, a one-line reason and the contrast with the sibling concept appear immediately. Sound and animation are subtle and optional, and controls work from the keyboard.
5. **Restrained milestone moments.** After a round or mock, a short summary card: what moved and what is next. Mock milestones get a slightly bigger card. No confetti spam and no countdown.
6. **A little choice.** After each round, offer 2–3 next options, including an interest break (Part I, section 12), so you stay in control.

**Professional look**
- A calm, consistent layout with good typography, generous spacing and a dark mode.
- Red, Amber and Green used only for mastery status, and never as the only signal (add icons or labels).
- No mascots, coins, loot or cartoon rewards.

**Avoid**
- Points for volume, which rewards clicking instead of learning.
- Streaks that punish a missed day, daily-login bonuses and leaderboards, which create anxiety.
- Random reward effects and pop-ups.
- Any credit for re-answering easy items you already know.

**How to judge it:** you open it without being reminded, rounds get finished, and your Red topics are turning Amber.

## 7. Gamification: what to use and what to avoid

**Evidence in one line:** careful meta-analyses find small-to-moderate average effects (cognitive about g=0.5, motivation about 0.36, behaviour about 0.25), but results vary a lot, studies are short, and novelty fades. Rewards for merely taking part can reduce interest in the task, while informative feedback raises it (Deci et al., 1999). So the rule is **feedback and progress, not points.**

**Use**
- Mastery feedback: topics moving Red → Amber → Green, the "recovered" mark, and the confidence-versus-accuracy trend.
- A **personal best** to beat (your last mock, your last round), never other people.
- The milestone ladder (Part I, section 13) and the weekly "what I can do now" list.
- Optional light cooperation if you study with a friend (a shared target, such as both reaching 70 on a mock). Competition combined with collaboration worked better than competition alone.
- A small touch of theme only if you like it, kept professional (section 6).

**Avoid**
- Points per question, coins, loot, or badges for volume.
- Leaderboards, streak penalties, and daily-login bonuses.
- Rewards announced in advance for finishing rounds.
- Anything that pulls you into the app for the app's sake rather than for the exam.

**Test:** after two weeks, ask "would I still use this with every game element switched off?" If not, remove the game parts and keep the feedback.

## 8. Anxiety-friendly mode and exam week

- **Private by default:** no shared scores and no comparisons. Highly anxious students tend to avoid self-testing, so keep rounds low-stakes and start each with an easy item to make starting painless.
- **Mocks are the best exposure:** repeated timed mocks make the real exam familiar, and in school studies most students said regular retrieval practice made them less nervous (self-reported).
- **Optional 10-minute routine before a mock or the exam:** write your worries down, then one line such as "this nervous feeling is energy I can use." Evidence is mixed (one classroom replication found no effect), so try it on a mock first and keep it only if it helps.
- **Exam-week taper:** steady sleep times, no new topics, one light mixed set a day, the last full mock about 5-7 days before, nothing hard the evening before.
- **Exam morning:** eat, arrive early, spend the first 2 minutes scanning the paper, then take the fast recall questions first (section 8).
- A one-tap **quiet mode** (no streaks, no stats) must always be available.

## 9. Stuck-concept rescue (a different source, not just more flashcards)

**Trigger (decided in code, no API call):** a concept missed 3 times across at least 2 different days, or missed again after its card was already rewritten (Appendix, Rule 10).

**Ladder:** 1) rewrite the card a different way, 2) ask for a different explanation (analogy plus one worked example), 3) one outside source such as a video or animation, 4) the textbook section. Move up one step only when the last step failed at the next re-test.

**Rules**
- **One weekly batch call** for up to 5 stuck concepts, not one call per miss.
- **No URLs from the model.** It returns a search query and what the video must show; the app builds the YouTube search link. Optionally add 3-5 channels you have vetted to the query. "High rated" cannot be checked automatically, so you judge: 5-15 minutes, shows the exact unit, clear worked example.
- If real links are wanted through search grounding, mark them **unverified** until you open them, and watch the grounding allowance.
- It **replaces** the Light block for that day (15-20 min, at most one a day). It adds no study time.
- **After the source:** write 3 lines from memory and answer the 3 recall questions, then the item returns to normal scheduling. Ignore anything the video covers outside the syllabus unit.
- Using several sources is a design choice to vary explanations and reduce boredom; it is not proven to raise marks.

**Prompt template (send with structured JSON output)**
```
You are a tutor for a BSc CSIT graduate revising for the MIT entrance (MCQ).
Concept: {topic id and recall-web cue}. Missed {n} times over {d} days.
Typical wrong answer chosen: {lure}.
Stay inside the given cue; add no outside topics. Do not output URLs.
Return JSON only: {"alt_explain":"<=80 words with one concrete example",
"confused_with":"<=15 words","search_query":"<=8 words",
"look_for":"<=20 words on what a good video must show",
"recall_qs":["q1","q2","q3"]}
```


## 10. Resources and variety (so it never gets boring)

*This section only adds a resource layer on top of the plan above. Nothing earlier is changed. The links below are the stored resource library the tool should use, so no separate file is needed.*

**Link status key.** **Checked** = confirmed by a web search on 27 Oct 2026. **Known** = the standard address of a well-known site, not re-checked. **Search** = a YouTube search link, used where no playlist address could be confirmed. Sites can move, so every resource gets a "link broken" button.

### 10.1 Resource library (store this as data)

**Core stack**

| Resource | Link | Status | Best for |
|---|---|---|---|
| Neso Academy | https://www.nesoacademy.org/ | Known | C, DSA, DBMS, OS, CN, digital electronics |
| Neso Academy playlists (YouTube) | https://www.youtube.com/results?search_query=Neso+Academy+Database+Management+Systems+playlist | Search | DBMS (also search "Operating Systems", "Computer Networks", "Data Structures", "Digital Electronics", "C Programming") |
| Gate Smashers (YouTube) | https://www.youtube.com/results?search_query=Gate+Smashers+normalization+DBMS | Search | Normal forms, OS, CN, DL (concept only, skip the GATE numericals) |
| CrashCourse Computer Science (YouTube) | https://www.youtube.com/results?search_query=CrashCourse+Computer+Science | Search | IIT, OS, CG, AI overview |
| Computerphile (YouTube) | https://www.youtube.com/results?search_query=Computerphile+HTTPS+public+key+encryption | Search | CN, EC, AI (A\*), CG |
| Python Tutor | https://pythontutor.com/ | Checked | C and C++ line-by-line trace |
| Python Tutor: C/C++ guide | https://pythontutor.com/articles/c-cpp-visualizer.html | Checked | pointers, stack, heap, struct, union |
| VisuAlgo | https://visualgo.net/ | Checked | stack, queue, BST, sorting, BFS, DFS, Prim, Kruskal, Dijkstra |
| SQLBolt | https://sqlbolt.com/ | Checked | SQL and query execution order |
| CircuitVerse | https://circuitverse.org/ | Known | adders, mux, flip-flops, counters |
| Khan Academy | https://www.khanacademy.org/ | Known | Calculus, Linear Algebra, Statistics exercises |

**By subject (Tier B first)**

| Subject | Watch | Do (interactive) |
|---|---|---|
| C | Neso Academy C playlist (search link above, edit the query) | Python Tutor in C mode: predict the output, then step through. Cover pre vs post `++`, pointer arithmetic, struct vs union, switch fall-through |
| OOP (C++) | Neso Academy or a short C++ series, only for stuck topics | Python Tutor in C++ mode; write tiny classes with `cout` in every constructor and destructor and watch the order. Search: https://www.youtube.com/results?search_query=online+C%2B%2B+compiler |
| DSA | Neso Academy data structures playlist | VisuAlgo in predict-then-reveal mode: https://visualgo.net/ |
| DBMS | Neso Academy DBMS playlist; Gate Smashers for normal forms | SQLBolt https://sqlbolt.com/ ; SQLZoo https://sqlzoo.net/ ; SQL Murder Mystery https://mystery.knightlab.com/ |
| OS | Neso Academy OS playlist; CrashCourse CS | Draw Gantt charts by hand, then check with a CPU scheduling simulator: https://www.youtube.com/results?search_query=CPU+scheduling+simulator+FCFS+SJF+round+robin |
| CN | Neso Academy Computer Networks playlist; Computerphile for TCP vs UDP and HTTPS | One-page layer-device-protocol map from memory (hub 1, switch 2, router 3) |
| MP (8085) | Search: https://www.youtube.com/results?search_query=8085+microprocessor+pin+diagram+flags+interrupts | GNUSim8085 https://gnusim8085.github.io/ (Known; use only to watch registers and flags, skip assembly programs) |
| Calculus | 3Blue1Brown "Essence of Calculus": https://www.youtube.com/results?search_query=3Blue1Brown+Essence+of+calculus | Khan Academy exercises; Desmos https://www.desmos.com/calculator or GeoGebra https://www.geogebra.org/ to see endpoints, critical points and discontinuities |
| Linear Algebra | 3Blue1Brown "Essence of Linear Algebra": https://www.youtube.com/results?search_query=3Blue1Brown+Essence+of+linear+algebra | Khan Academy exercises; use a matrix calculator only to check hand work |
| Statistics | StatQuest: https://www.youtube.com/results?search_query=StatQuest+statistics | Seeing Theory https://seeing-theory.brown.edu/ ; Khan Academy exercises |
| IIT (Tier A) | CrashCourse CS, 2-3 episodes only | Your own comparison cards (RAM vs ROM, virus vs worm vs Trojan) |
| Digital Logic (Tier A) | Neso Academy digital electronics for weak units | CircuitVerse https://circuitverse.org/ : half adder, full adder, 4:1 mux, SR/JK/D/T, ring and Johnson counters |
| Web (Tier A) | none needed | W3Schools "Try it Yourself" https://www.w3schools.com/ ; Flexbox Froggy https://flexboxfroggy.com/ ; CSS Diner https://flukeout.github.io/ |
| SAD (Tier A) | short "waterfall vs spiral vs agile" explainers | Draw a DFD, ERD and use-case diagram for a library system in https://app.diagrams.net/ |
| SE (Tier A) | short videos on verification vs validation, COCOMO, CMM | Write each sibling pair as a two-line comparison |
| MIS (Tier A) | short explainers on TPS/MIS/DSS/ESS, Porter's five forces, value chain | Turn the one-liners into your own table |
| E-Commerce (Tier A) | Computerphile on HTTPS, public-key encryption, DDoS | Google Phishing Quiz https://phishingquiz.withgoogle.com/ , then phishing vs pharming vs spoofing in one line each |
| Computer Graphics (Tier A) | Pixar in a Box https://www.khanacademy.org/computing/pixar ; Computerphile | GeoGebra for translation, scaling, rotation; search "line drawing algorithm demo" to compare DDA and Bresenham |
| AI (Tier A) | Computerphile on A\* and search | Elements of AI https://www.elementsofai.com/ ; TensorFlow Playground https://playground.tensorflow.org/ ; Teachable Machine https://teachablemachine.withgoogle.com/ ; search "pathfinding visualizer" and "alpha beta pruning visualizer" |

**Extra MCQ banks (use with a filter):** Sanfoundry https://www.sanfoundry.com/ (textbook-style one-fact recall, closest to the exam level) and GeeksforGeeks https://www.geeksforgeeks.org/ (many GATE-style questions, often too deep). Filter every question: does it map to a unit in Part II, and is it one fact or one small step? If not, skip it. Never judge readiness by these scores, and verify any answer key that looks wrong in your textbook. Real past or model questions from your own university are the best source.

### 10.2 Rules for the tool

**Library and links**
- Store each row as data: id, name, type (video, simulator, interactive, puzzle or game, practice), subject, unit tags from Part II, tier, minutes, link, status. Seed it from the tables above.
- **No URLs from the model** (same rule as section 9). Show only links stored in this library. When a stored link is a search link, the app builds it from the stored query.
- Open links in a new tab so the round is never lost. A "link broken" button falls back to a search link and remembers it.

**Where resources appear (always optional, one tap, never blocking)**
1. **Interest break menu (Part I, section 12):** 2-3 resources for a subject you are weak or curious about, plus your own idea. It uses the existing Light block slot, at most one a day.
2. **After a miss:** a small "See it" chip under the explanation with one matching resource for that unit. It never replaces the written explanation.
3. **Stuck-concept rescue (section 9, step 3):** pick from this library first, and use a generated search query only when nothing fits.
4. **End-of-round options (sections 5 and 6):** one of the 2-3 next options can be a resource or a "do" activity.
5. **Weekly 5-minute review:** one "this week's pick" for your weakest Tier B subject.
6. **Subject page:** a Resources shelf you can open any time, with no nagging.

**Variety and frequency (boredom without clutter)**
- At most one unsolicited suggestion per round and about one a day. If you ignore it, do not repeat it.
- Rotate types (video, simulator, puzzle or game, make-something, teach-it). Avoid the same resource within 14 days unless asked, and prefer a type you have not used lately.
- Let the user mark each resource "helpful", "not for me" or "done", and offer "more like this". Hidden items stay hidden. Use the marks only to tune suggestions.
- Offer the "do" activities as in-app prompts that need no link: predict then reveal, draw from memory, write a one-line comparison card, write the two-line sibling pair.
- Surprise is welcome inside the syllabus (a different channel, a small puzzle, a visual demo), but nothing that feels like a reward for clicking.

**Keep it inside the plan**
- **Time and the loop:** a video or simulator slot is 15-25 minutes. After it, write 3 lines from memory, then do 3 MCQs the next day (Part I, section 11). It replaces the Light block or interest break and never adds study hours. Anything that costs more than 2 minutes must replace something.
- **Depth ceiling:** suggest a resource only if it maps to a unit in Part II. Use it for explanation only and ignore any GATE-style numericals and derivations.
- **Order:** Tier B subjects first (marks per hour), Tier A resources short (2-3 items per subject).
- **Never suggest:** GATE question banks and long lecture series, compiler design, ALU or datapath design, Packet Tracer deep dives, 4NF/5NF, or re-watching a video you already understood.
- **Quiet mode, timed mocks and exam week:** no suggestions beyond what the user opens themselves. No notifications, no countdown, no guilt for skipping.

**Check that it works**
Track resources opened, marked helpful or "not for me", and whether a subject's miss rate dropped after a resource. If suggestions are mostly skipped, show fewer and rotate more. If you open the app without being reminded and rounds still get finished, it is working.
