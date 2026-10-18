# MIT Entrance Master Guide (19 Subjects)

**A complete, unified reference combining Exam Strategy, Active Recall Webs, and Formal Syllabus for all 19 Entrance Subjects.**

---

## Table of Contents

- [Part I: Exam Blueprint, Marks Math & Scope Strategies](#part-i-exam-blueprint-marks-math--scope-strategies)
  - [1. Scope and marks](#1-scope-and-marks)
  - [2. What the paper really is](#2-what-the-paper-really-is)
  - [3. Subject cheat lines (Tier M, Tier A, Tier B)](#3-subject-cheat-lines)
- [Part II: Active Recall Web & Confusion Traps (A ≠ B)](#part-ii-active-recall-web--confusion-traps-a--b)
  - [16 Computing Subjects (BIT101–BIT403)](#1-introduction-to-it-bit101)
  - [3 Mathematics & Statistics Subjects (MTH104, MTH168, STA154)](#17-basic-mathematics-mth104)
- [Part III: Clean Prioritized Syllabus & Course Contents](#part-iii-clean-prioritized-syllabus--course-contents)
  - [All 19 Subjects Course Contents & Bounds](#1-introduction-to-information-technology-bit101)
  - [Exam Quality Rules & Candidate Profile](#candidate-profile)

---

# Part I: Exam Blueprint, Marks Math & Scope Strategies

# MIT Entrance: Short Master Reference (50 days, target 75%+)

**Profile:** BSc CSIT graduate, all subjects studied once, revision started. Light plan: about 2 h a day, MCQ-focused. Method: **attempt → check → patch → log → re-test.** Never re-learn from zero.
**Assume (verify):** 100 Qs, 120 min, 4 options. Negative marking unknown.

---

## 1. Scope and marks

**Wide but shallow.** 160 syllabus units, but single-concept, one-line questions.

- **Q21–100 = 16 computing subjects x 5 Qs.** Every subject is worth 5 marks whatever its syllabus size, so study by **marks per hour**.
- **Q1–20 = Math/Stats:** Calculus 9, Linear Algebra 6, Statistics 5. The only block that needs real calculation. Calculus alone outweighs any computing subject.
- **75/100 target:** if Math = 15/20, you need 60/80. If Math = 10, you need 65/80. Plan for Math ≈ 15 and computing ≈ 65 (about 80 total, a buffer).

| Tier | Subjects | Aim |
|---|---|---|
| **M** | Calculus, Linear Algebra, Statistics | 15/20 |
| **A** (cheap recall) | IIT, DL, EC, MIS, CG, AI, SAD, SE, Web | 4.5/5 |
| **B** (trace, calc, wide) | C, OOP, DSA, DBMS, CN, MP, OS | 3.5/5 |

## 2. What the paper really is

- **Computing (80 Qs):** roughly 60–70% single-fact recall, 20–30% pick-the-sibling (2NF vs 3NF, alpha vs beta), about 10% one-step calc/trace (Q59, 71, 72, 73, 74, 84, 85). **Math/Stats:** about 65% need a small calculation.
- Each subject's 5 Qs come from 3–5 different units. **Breadth beats depth.** The 100 Qs touch about 48% of units. "Not sampled" means lower priority, not ignorable.
- **The exam follows the textbook chapter, not just the syllabus line** (Ostrich algorithm Q83, SQL execution order Q49, plane equation Q15).
- 6 of 80 keys are "All of the above / Both" (Q31, 35, 43, 44, 62, 89). Filler options give free eliminations (Q29, 39, 97). Stems can include irrelevant data (Q85).
- **Depth ceiling:** one fact or one small step. Don't prepare derivations (CG midpoint ellipse, Shannon, epsilon-delta, ALU design).
- **Study once, score twice:** number systems (DL), CPU/memory/DMA (MP), networking (CN), security (EC), ER/normalization (DBMS), SDLC/testing (SAD, then SE), pointers/functions (C), ethics/value chain (MIS).

---

## 3. Subject cheat lines

Format: **know cold** | *trap* | skip deep until the core is fluent.

### Tier M
- **Calculus (9):** derivative rules (chain, implicit); limit as a derivative (xᵏ−2ᵏ)/(x−2) = k·2ᵏ⁻¹; extremes = critical points **plus endpoints**; f'>0 increasing; ∫ and substitution; improper integral with a discontinuity inside diverges (∫dx/(x−a)); y'+ky=0 → Ce⁻ᵏˣ; partial derivative; plane a(x−x₀)+b(y−y₀)+c(z−z₀)=0. | *trap:* skipped endpoints, hidden discontinuity | skip volumes, arc length, Newton/Euler, Lagrange. **Promote first:** series tests, related rates.
- **Linear Algebra (6):** reduce to 0 = nonzero → no solution; det 0 → singular/dependent; 2×2 inverse = (1/det)[[d,−b],[−c,a]]; symmetric A=Aᵀ; |a+b| ≤ |a|+|b|; group = closure, associativity, identity, inverse. | *trap:* forgetting ÷det (Q4), two true options (Q2) | skip Gram-Schmidt, SVD, rings. **Promote first:** 2×2 eigenvalues, Cramer.
- **Statistics (5):** nominal < ordinal < interval < ratio; shift by c: mean ±c, variance unchanged; scale by c: mean×c, variance×c²; constants → variance 0; total probability ΣP(A|Bᵢ)P(Bᵢ), Bayes; r sign = direction, |r| = strength, correlation ≠ causation. | skip CI, sampling distributions. **Promote first:** binomial, normal.

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

**Math/Stats Q1–20 (my own answers, the file had no key):** 1 b · 2 a (c also true) · 3 c · 4 d · 5 a · 6 b · 7 c · 8 d (k=4) · 9 a (4) · 10 c · 11 b · 12 d · 13 b · 14 b · 15 d · 16 a · 17 c · 18 d · 19 b (0.5) · 20 b.

---

## 5. Shaky keys and ambiguous questions

| Q | Issue |
|---|---|
| Q33 TCP header | Key says 40–60 B; textbook is 20–60. Pick the closest |
| Q35 coax | "All of the above" is relative to twisted pair |
| Q75 | Indirection operator = star operator; know both |
| Q87 / Q88 | `.class` and `#id` are both valid; `echo` and `print` are both valid |
| Q90 | Differs from the wrong option only by the semicolon |
| Q2 / Q6 / Q15 / Q19 | Two true options / option a is false / not in any unit line / loosely worded (total probability) |

**Golden rule: in practice investigate the question, in the exam maximise marks.**
- **Two options look right:** find the qualifier (BEST / MOST / ONLY / EXCEPT), compare against the textbook definition, pick the primary and most specific term.
- **None looks right:** recheck for a misread word, pick the closest defensible option, never invent a justification that contradicts a fact.
- **Question is badly written:** pick the most defensible answer, flag it, move on.

---

## 6. Method (optimal and non-boring)

**Core loop:** answer **before** seeing options → check → patch from notes → log the error → re-test at +1, +3, +7, +14 days. Rereading and highlighting are the weakest methods; being tested is the strongest.

- **Interleave** subjects after the first pass. **Confidence-tag** answers 1–3 and study every "wrong at 3" first.
- **Cards only** for `A ≠ B` pairs, formulas and ordered lists. About 20 new cards a day at most.
- **Notes:** one page per subject, built from your errors only.
- **Math is skill, not recall:** small problems by hand, spaced over weeks.
- **Error log line:** `Q-id | subject | concept | cause | fix | re-test date`. Causes: **K** knowledge gap (make an `A ≠ B` card if siblings), **W** wording trap, **A** ambiguity (record the standard rule), **G** guessing/reasoning slip (redo by hand). The same mistake three times means go back to the chapter.
- **Beat boredom:** blocks of 35–40 min, switching the task type (read → quiz → draw → teach); quiz first, read second; if bored, raise difficulty; keep a "marks banked /5" heat map and streak; weekly timed mock as a boss fight; surprise set of 5 random Qs from 5 random subjects; clear 5 old errors a day; teach one confusable pair aloud in 60 seconds; phone in another room; never a zero day; sleep 7+ hours.

---

## 7. 50-day plan (light version: about 1 h 55 min a day, MCQ-focused)

**Why light works here:** typical toppers reportedly score around 65, and a 70–75 mock score already gives a buffer. Marks come from error-fixing and timed practice, not more hours.

**Daily template (about 115 min)**

| Time | Task |
|---|---|
| 10 min | Cards and error-log items due today |
| 30 min | **Deep block:** cue pass → patch gaps → 10 MCQs (answer before seeing options) |
| 5 min | Break, move |
| 25 min | **Light block:** pick a *different* task each day: draw a diagram (8085, OSI, ER, DFD, A\*) · teach one `A ≠ B` pair aloud · error bounty (re-solve 5 old mistakes cold) · roulette (5 random Qs from 5 random subjects) · pair flashcards |
| 15 min | Timed mixed MCQs |
| 10 min | Error log (K / W / A / G) |
| 20 min | **Math slot** |

**Minimum day (about 60 min):** 10 review + 25 deep + 10 MCQs + 15 math. This counts as a full day. Never a zero day.
**Every 7th day is a light day** (days 7, 14, 21, 28, 35, 42, 49): 30 min mixed MCQs + error log, or off. Sleep 7+ hours always.

| Days | What |
|---|---|
| 1 | **Diagnostic:** all 100 Qs timed (120 min), confidence-tagged. Score each subject out of 5 and Math out of 20. **Red** ≤2, **Amber** 3, **Green** 4–5 |
| 2–18 | **Fix only what the diagnostic shows:** Reds get 2 days each, Ambers 1 day each. Greens skip coverage and appear only in mixed sets. Already scoring 70+? Skip straight to mocks and error-fixing |
| 19–20 | Repair + buffer (absorbs slipped days) |
| 21–43 | **Mixed retrieval:** 3 subjects a day, 10 min cues + 8 MCQs each, plus error-log items. Reds appear twice as often |
| 44–48 | No new material: confusables, formulas, error-log cards; redo the official paper and explain why each wrong option is wrong |
| 49–50 | Day 49 light. Day 50: 30-min glance, early sleep |

**Mocks (the main score driver):** alternate half and full so it never exhausts you. **Half mocks (50 Qs, 60 min) on days 8, 22, 36. Full mocks (100 Qs, 120 min) on days 15, 29, 43.** Mock day = mock + 45 min review, nothing else. The review is where the marks come from: sort every miss into K / W / A / G and push the W and G counts toward zero.

**Math slot (20 min):** days 2–12 Calculus, 13–20 Linear Algebra, 21–26 Statistics, 27+ timed mixed sets of 10–15 problems plus the promote-first topics.

**Adjust by score, not by guilt:**
- Two mocks in a row at 72+ → go to maintenance: error log, 20 min math and one mixed set only.
- A subject under 3/5 on two mocks → one extra slot a week until it recovers.
- Falling behind → drop second passes on Greens. **Never cut the mocks.**

---

## 8. Exam day

- **Time (100 Qs in 120 min):** recall about 40–45 s each (about 60 min), Math up to about 2 min each (about 40 min), about 20 min left for flagged questions.
- **Two passes:** answer sure ones fast and mark `?`, then return. Do computing recall first, then Math.
- **Read the stem for NOT / FALSE / EXCEPT / BEST / ONLY** before the options. **Compute before looking at options.**
- **Stuck:** after 30–45 s (about 2 min for Math), compare the two best options against the textbook definition, choose, flag, move on.
- **Elimination:** drop filler; drop two options saying the same thing; be wary of "always / never / only".
- **"All of the above / Both":** if two options are confirmed true, pick it; if any is false, eliminate it.
- **Math checks:** both endpoints, ÷ determinant, where an improper integral is undefined.
- **Guessing:** with no negative marking, never leave blanks. **Verify the rule first.**
- Change an answer only for a specific reason.

## 9. Don't

Re-learn from page one · write long programs · start with the biggest syllabus (Web, C) · start with derivations · go deep on "skip" items before the core is fluent · import outside material (GATE-style, B-trees) · treat "not in the sample" as "never asked" · memorise from a doubtful key · judge yourself by how familiar notes feel.

## 10. Verify before the exam

Duration, number of Qs, pass mark and negative marking in the official notice · that the real paper keeps the 20 + 5-per-subject split · Nepal specifics (ETA, e-payment status) against your notes · any key you disagree with (the textbook is the authority) · the Math answers above (my own working).

**Done when:** a full 100-Q mock fits in 120 min with review time, scores 70–75+, and every wrong answer is traced to a unit.

---

# Part II: Active Recall Web & Confusion Traps (A ≠ B)

# MIT Entrance Recall Web (BIT Syllabus)

Oct 13, 2026 · @prakash

Cue-only recall web for every non-trivial or confusable unit in the 16 syllabus subjects: read a cue, retrieve what you know, then check your notes. Every cue is a syllabus term or a direct sub-part of one; nothing from outside the listed units. A ≠ B marks a pair you must be able to tell apart; \[calc\] marks topics to practise by hand.

## 1. Introduction to IT (BIT101)

- **U2 Computer hardware**
  - CPU: components of CPU · instruction format · instruction set · instruction cycle · microprocessor
  - Bus and cabinet: computer bus · power supply · motherboard · expansion slots · ports and interfaces
  - Memory: memory representation · memory hierarchy · CPU registers · cache · RAM ≠ ROM
  - Secondary storage: magnetic tape ≠ magnetic disk · optical disk · magneto-optical disk · flash · sequential access ≠ direct access
  - I/O: human data entry devices ≠ source data entry devices · I/O port · I/O system
- **U3 Computer software**
  - System software ≠ application software · device drivers ≠ utility software
  - Operating system: objectives · types · functions · process / memory / file / device management · protection and security · user interface
  - Assembler ≠ compiler
  - Software licensing · open source software · Unix ≠ Windows (case study)
- **U4 Data representation** \[calc\]
  - Decimal → binary / octal / hex · binary / octal / hex → decimal · binary ↔ octal / hex · binary arithmetic
- **U5 Networks and Internet services**
  - Media: twisted pair · coaxial · optical fiber · RF · microwave · satellite
  - Networks: network types · topology · communication protocol · network devices · wireless networking
  - Internet: internetworking protocol · Internet architecture · Internet address · DNS · WWW · Internet services · e-mail working principle
  - Newer ideas: Web 2.0 · IoT · wearable computing · cloud computing · smart city · e-commerce ≠ e-governance
  - Case study: ISPs in Nepal and their services
- **U6 Database systems**
  - Database ≠ DBMS ≠ database system · architectures · data models · data warehousing ≠ data mining · big data
- **U7 Computer security**
  - Security threat ≠ security attack · malicious software · cryptography · digital signature · firewall ≠ IDS · user authentication · security policy

Skipped as low recall risk: U1 Introduction to computers, U8 Application and impact of IT.

## 2. C Programming (BIT102)

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
  - fgetc · fputc · fgets · fputs · fread · fwrite · random access

Skipped as low recall risk: U1 Introduction.

## 3. Digital Logic (BIT103)

- **U1 Number systems, operations and codes** \[calc\]
  - Conversions between number systems · 1's complement ≠ 2's complement · binary addition ≠ subtraction by complement
  - Binary codes (BCD · Gray) · error detection codes (parity)
- **U2 Digital design fundamentals and Boolean algebra**
  - Digital ≠ analog signals · logic operations · basic gates ≠ derived gates ≠ universal gates
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
  - Variables · data types · operators · flow control · looping · functions
  - Popup boxes: alert ≠ confirm ≠ prompt
  - Objects and properties · constructors · arrays · user-defined objects
  - Built-in objects: Window · String · Number · Boolean · Date · Math · RegExp · Form
  - Event handling · form validation · error handling · cookies · AJAX ≠ jQuery basics
- **U5 XML**
  - Syntax rules · elements ≠ attributes · XML tree · namespace
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

Skipped as low recall risk: U1 Introduction (professional software development, ethics, case studies).

## 13. Management Information System (BIT353)

- **U1 Information systems in global business**
  - Strategic business objectives · dimensions of an information system · complementary assets · sociotechnical systems
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
  - Customer relationship management · challenges of enterprise applications
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
  - Computer graphics ≠ image processing · coordinate systems
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

# Part III: Clean Prioritized Syllabus & Course Contents

# PART II: BIT PRIORITIZED SYLLABUS

---

## 1. Introduction to Information Technology (BIT101)

### Course Contents

#### Unit 1: Introduction to Computer (4 Hrs.)
Introduction of Computer; Characteristics of Computer; History of Computer; Generations of Computer; Digital and Analog Computers; Classification of Computer based on size; The Computer System; Application of Computers

#### Unit 2: Computer Hardware (8 Hrs.)
Introduction; Central Processing Unit; Components of CPU, Instruction Format; Instruction Set; Instruction Cycle; Microprocessor; Computer Bus, Components of Computer Cabinet (power supply, motherboard, memory chips, expansion slots, ports and interface, processor, cables and storage devices)
- **Computer Memory:** Memory Representation; Memory Hierarchy; CPU Registers; Cache Memory; Primary Memory (RAM, ROM); Secondary Memory (Magnetic Tape; Magnetic Disk; Optical Disk; Magneto-Optical Disk, Flash Memory Device), Access Types of Storage Devices (sequential and direct)
- **Input and Output Devices:** Input-Output Unit; Input Devices; Human Data Entry Devices; Source Data Entry Devices; Output Devices; I/O Port; I/O System

#### Unit 3: Computer Software (6 Hrs.)
Introduction; Types of Software; System Software; Application Software; Operating System (Introduction, Objectives of Operating System, Types of OS, Functions of OS, Process Management, Memory Management, File Management, Device Management, Protection and Security, User Interface, Examples of Operating Systems); Device Drivers and Utility Software; Programming Languages, Language Translators: assembler, compiler; Software Licensing, Open Source Software; Case study: Unix Vs Windows

#### Unit 4: Data Representation (5 Hrs.)
Introduction; Number System; Conversion from Decimal to Binary, Octal, Hexadecimal; Conversion of Binary, Octal, Hexadecimal to Decimal; Conversion of Binary to Octal, Hexadecimal; Conversion of Octal, Hexadecimal to Binary; Binary Arithmetic

#### Unit 5: Computer Networks and Internet Services (10 Hrs.)
Introduction; Importance of Networking; Data Transmission Media (Twisted pair, coaxial cable, optical fiber, RF transmission, microwave transmission, satellite transmission); Data Transmission across Media; Data Transmission and Data Networking; Computer Network; Network Types; Network Topology; Communication Protocol; Network Devices; Wireless Networking.
Internet; History of Internet; Internetworking Protocol; The Internet Architecture; Managing the Internet; Internet Connections; Internet Address; WWW, Domain Name System, Internet Services; E-mail and its working principle; E-commerce and E-governance; Web 2.0; Internet of Things (IoT); Wearable Computing; Cloud Computing; Smart City; Case Study: ISP in Nepal and their services

#### Unit 6: Database Systems (5 Hrs.)
Introduction; Database; Database System; Database Management System; Database System Architectures; Data Models, Database Applications; Introduction to Data Warehousing, Data mining, and BigData

#### Unit 7: Computer Security (4 Hrs.)
Introduction; Security Threat and Security Attack; Malicious Software; Security Mechanisms (Cryptography, Digital Signature, Firewall, Users Authentication, Intrusion Detection Systems); Security Awareness; Security Policy

#### Unit 8: Application and Impact of IT (3 Hrs.)
Applications of IT; Impact of IT on Organization and individuals; Societal Impacts of IT, IT Strategic Planning, IT and Business Alignment

---

## 2. C Programming (BIT102)

### Course Contents

#### Unit 1: Introduction (3 Hrs.)
History and advantages of C; Problems analysis, algorithm and flowchart; Structure of a C Program; Writing, compiling, debugging, executing and testing a C Program in windows and Unix/Unix like environment

#### Unit 2: Elements of C (3 Hrs.)
C Tokens; C Character Sets; Data types, Constants and Variables; Expression, statements and comments; Escape sequences and Delimiters

#### Unit 3: Input/output function (2 Hrs.)
Conversion Specifiers; I/O functions; Formatted I/O

#### Unit 4: Operators and Expression (4 Hrs.)
Arithmetic operators; Relational operators; Logical operators; Assignment operators; Type conversion in assignment; Increment and decrement operators; Ternary operator; Bitwise operator; Other operators (comma, sizeof); Expression evaluation; Operator precedence and associativity

#### Unit 5: Control Structures (8 Hrs.)
Introduction to selection and iterative statements; GOTO and labels; Selection statements: if, if..else, if..else if ladder, nested if, switch case; Conditional operator; Iterative statement: For Loop, While Loop, Do while Loop, Nested Loop; The odd loop; Controlling the loop execution break and continue

#### Unit 6: Arrays and Strings (5 Hrs.)
Introduction to Arrays; Initializing Arrays; The meaning of array indexing; One dimensional and Multidimensional Arrays; String and Basic functions dedicated to string manipulation

#### Unit 7: Functions (6 Hrs.)
Introduction and types of functions; Declaring, Defining and calling functions; Arguments and Return Statement; Recursive functions; Function call by value and reference; Variables' scope, local variables and function parameters; Arrays as function parameter; Void as a parameter; Parameterizing the main function; External function and variables; Header files; Static variables; Register Variables

#### Unit 8: The C Preprocessor (2 Hrs.)
Features of C Preprocessor; Macro Expansion; Macros with Arguments; Macros versus Functions; File Inclusion; Conditional Compilation; #if and #elif Directives; #undef Directive; #pragma Directive; The Build Process; Preprocessing; Compiling; Assembling; Linking; Loading

#### Unit 9: Pointers (5 Hrs.)
Introduction of Pointers, declaration and initialization of pointer variables; An address, a reference, a dereference and the sizeof operator; Pointer to nothing (NULL); Pointer assignment; Pointer Arithmetic; Pointer as argument and Pointer as return values; Pointers vs. arrays; Dynamic memory allocation

#### Unit 10: Structure and Unions (5 Hrs.)
Definition of Structure; Array of structures; Passing structure and array of structure to function; Pointers to structures and arrays of structures; Self-referential structures; Typedef; Table Lookup; Unions

#### Unit 11: File Handling (2 Hrs.)
Files vs. streams; Header files needed for stream operations; Opening and closing a stream, open modes, errno variable; Reading and writing to/from a stream; Predefined streams: stdin, stdout and stderr; Stream manipulation: fgetc(), fputc(), fgets() and fputs() functions; Raw input/output: fread() and fwrite() functions; Random access to files

---

## 3. Digital Logic (BIT103)

### Course Contents

#### Unit 1: Number Systems, Operations and Codes (6 Hrs.)
Introduction to Number System, Decimal, Binary, Octal, Hexadecimal Number Systems, Conversion from one number system to another, Complements of Numbers, Addition and Subtraction of Binary Numbers, Binary Codes and Error Detection Codes

#### Unit 2: Digital Design Fundamentals and Boolean algebra (8 Hrs.)
Digital and Analog Signals, Logic Operations, Introduction to the System Concept, Logic Gates (Basic Gates, Derived Gates, Universal Gates), Logic Function and Boolean Algebra

#### Unit 3: Simplification of Boolean Functions (5 Hrs.)
K-map, Two and Three variable maps, Four variable maps, product of sum simplification, NAND and NOR implementation, Don't Care conditions

#### Unit 4: Combinational Logic (7 Hrs.)
Adders and Subtractors, Parallel Binary Adders, Multiplexers and Demultiplexers, Encoders and Decoders, Seven segment decoder, Code Converters

#### Unit 5: Sequential Logic (4 Hrs.)
Latches, Edge-Triggered Flip-Flops, Flip-Flop Operating Characteristics, Flip-Flop Application

#### Unit 6: Counters, Registers and Memory (9 Hrs.)
Asynchronous Counters, Synchronous Counters, Up/Down Counters, Counter Applications, Basic Shift Register Operations, Shift Register Types, Bidirectional Shift Registers, Shift Register Counters, Basic Memory Operations and memory types

#### Unit 7: Processor Logic Design (6 Hrs.)
Processor Organization, Arithmetic Logic Unit, Design of Arithmetic Circuit, Design of Logic Circuit, Design of Arithmetic Logic Unit, Status Register, Design of Shifter

---

## 4. Microprocessor and Computer Architecture (BIT151)

### Course Contents

#### Unit 1: Introduction to Microprocessor (6 Hrs.)
Components of a Microprocessor: Registers, ALU, Control and Timing, System Buses, Microprocessor Systems with Bus Organization, Introduction to SAP1 and SAP2

#### Unit 2: Intel 8085 (8 Hrs.)
Functional Block Diagram and Pin Configuration, Timing and control Unit, Registers, Data and Address Bus, Intel 8085 Instructions, Operation Code and Operands, Addressing Modes, Interrupts, Flags, Instructions and Data Flow inside 8085, Basic Assembly Language Programming Using 8085 Instruction Sets

#### Unit 3: Microoperations (3 Hrs.)
Arithmetic Microoperations, Logic Microoperations, Shift Microoperations, Arithmetic Logic Shift Unit

#### Unit 4: Control Unit and Central Processing Unit (9 Hrs.)
Control Unit of Basic Computer, Computer Arithmetic (Adder, Subtractor, Divider, and Multiplicator), Timing Signal, Micro-Instruction and Micro-Operation Format, Symbolic Microinstructions, Symbolic Micro-program, Binary Micro-Program, Register Organization, Register Stack and Memory Stack, Data transfer and Manipulation, Introduction to RISC and CISC

#### Unit 5: Fixed point Computer Arithmetic (5 Hrs.)
Addition and Subtraction, Multiplication, Division Algorithm (Booth's Algorithm)

#### Unit 6: Input and Output Organization (5 Hrs.)
Introduction to Peripheral Devices, I/O interface, Direct Memory Access (DMA), I/O Processor, Data communication processor

#### Unit 7: Memory Organization (5 Hrs.)
Hierarchy of Memory System, Primary and Secondary Memory, Virtual Memory, Memory Management hardware

#### Unit 8: Pipelining (4 Hrs.)
Concept of Pipelining, Arithmetic Pipeline, Instruction Pipeline, Data Dependency, Handling of branch Instruction

---

## 5. Object Oriented Programming (BIT153)

### Course Contents

#### Unit 1: Introduction to Object Oriented Programming (3 Hrs.)
Overview of structured and object oriented programming approach, Characteristics of object oriented languages

#### Unit 2: Basics of C++ programming (5 Hrs.)
C++ Program Structure, Character Set and Tokens, Data Type, Type Conversion, Preprocessor Directives, Namespace, Input/Output Streams and Manipulators, Dynamic Memory Allocation with new and delete, Control Statements.
- **Functions:** Function Overloading, Inline Functions, Default Argument, Pass by Reference, Return by Reference, Scope and Storage Class.
- **Pointers:** Pointer variables declaration & initialization, Operators in pointers, Pointers and Arrays, Pointer and Function.

#### Unit 3: Class and Objects (8 Hrs.)
Class and Object, Accessing members of class, Initialization of class object (Constructor), Destructor, Default Constructor, Parameterized Constructor, Copy Constructor, The Default Copy Constructor, Objects as Function Arguments, Returning Objects from Functions, Structures and Classes, Memory allocation for Objects, Static members, Member functions defined outside the class.

#### Unit 4: Operator Overloading (7 Hrs.)
Fundamental of operator overloading, Restriction on operator overloading, Operator functions as a class members, Overloading unary and binary operator, Data Conversion (basic to basic, basic to user-defined, user-defined to basic, user-defined to user-defined)

#### Unit 5: Inheritance (7 Hrs.)
Introduction to inheritance, Derived Class and Base Class, Access Specifiers (private, protected, and public), Types of inheritance, Public and Private Inheritance, Constructor and Destructor in derived classes, Aggregation, Ambiguity

#### Unit 6: Virtual Function, Polymorphism, and other C++ Features (5 Hrs.)
Concept of Virtual functions, Late Binding, Abstract class and pure virtual functions, Virtual Destructors, Virtual base class, Friend function and Static function, Assignment and copy initialization, Copy constructor, This pointer, Concrete classes, Polymorphism and its roles.

#### Unit 7: Function Templates and Exception Handling (4 Hrs.)
Function templates, Function templates with multiple arguments, Class templates, templates and inheritance, Exceptional Handling (Try, throw and catch), Use of exceptional handling.

#### Unit 8: File and Streams (6 Hrs.)
Stream Class Hierarchy, String I/O (Reading I/O, Writing I/O, Detecting end of file), Character I/O, Object I/O (Writing an object to Disk, Reading an object from Disk), File pointers

---

## 6. Data Structures and Algorithms (BIT201)

### Course Contents

#### Unit 1: Background and Concept of Data Structures (2 Hrs.)
- Introduction: Data Types, Data Structure, Abstract Data Type
- Background for Data Structure: Array, Array as an ADT, Structure, Pointer, Class in C++

#### Unit 2: Algorithms (2 Hrs.)
- Fundamentals of Algorithm
- Elementary Analysis of algorithm with asymptotic notations and their properties, time and space complexities

#### Unit 3: Stack (4 Hrs.)
- Definition, Primitive Operations, Stack as an ADT
- Stack Applications: Evaluation of Infix, Postfix and Prefix expressions, converting from infix to postfix/prefix

#### Unit 4: Queue (3 Hrs.)
- Definition, Primitive Operations, Queue as an ADT
- Circular and Priority Queues

#### Unit 5: Recursion (2 Hrs.)
- Definition and Principle
- Application of recursion with TOH problem, Factorial, Fibonacci Sequences

#### Unit 6: List (9 Hrs.)
- Definition, Static and Dynamic List Structure
- Operations on Linked List
- Linked implementation of a stack and queue
- Circular Linked List, Doubly Linked List, Doubly Circular Linked List

#### Unit 7: Tree (7 Hrs.)
- Definition and basic terminologies
- Binary Tree: Introduction, Types of Binary Tree, Operations
- Binary Search Tree: Insertion, Deletion, Searching
- Tree Traversal: Pre-order traversal, In-order traversal, Post-order traversal
- Applications of Binary Tree

#### Unit 8: Sorting (6 Hrs.)
- Introduction and types of sorting
- Algorithm and implementation of Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, Merge Sort
- Comparison and Efficiency of sorting algorithms

#### Unit 9: Searching (5 Hrs.)
- Introduction, Sequential Search, Binary Search and Tree Search
- Comparison and Efficiency of Searching
- Hashing

#### Unit 10: Graph (5 Hrs.)
- Definition, Representation of Graph, Types of Graph
- Graph Traversal: Depth First Search, Breadth First Search
- Spanning Tree, Prim's Algorithm, Kruskal's algorithm and Round Robin Algorithm
- Shortest Path Algorithm, Greedy and Dijkstra's Algorithm

---

## 7. Database Management System (BIT202)

### Course Contents

#### Unit 1: Database Concepts and Architecture (4 Hrs.)
Database, Database Management System, Database Users, and Benefits of Databases; Data Models, Schemas, and Instances; Three-Schema Architecture and Data Independence; Database Languages and Interfaces; the Database System Environment; Centralized and Client/Server Architectures for DBMSs; Classification of Database Management Systems

#### Unit 2: Data Modeling Using the Entity-Relational Model (5 Hrs.)
Using High-Level Conceptual Data Models for Database Design; Entity Types, Entity Sets, Attributes, and Keys; Relationship Types, Relationship Sets, Roles, and Structural Constraints; Weak Entity Types; ER Diagrams, Naming Conventions, and Design Issues; Relationship Types of Degree Higher Than Two; Subclasses, Superclasses, and Inheritance; Specialization and Generalization; Constraints and Characteristics of Specialization and Generalization

#### Unit 3: The Relational Data Model and Relational Database Constraints (5 Hrs.)
Relational Model Concepts; Relational Model Constraints and Relational Database Schemas; Update Operations, Transactions, and Dealing with Constraint Violations; Basic Relational Algebra Operations

#### Unit 4: SQL (10 Hrs.)
Data Definition and Data Types; Specifying Constraints; Basic Retrieval Queries; Complex Retrieval Queries; INSERT, DELETE, and UPDATE Statements; Views

#### Unit 5: Relational Database Design (7 Hrs.)
Relational Database Design Using ER-to-Relational Mapping; Informal Design Guidelines for Relational Schemas; Functional Dependencies; Normal Forms Based on Primary Keys; General Definitions of Second and Third Normal Forms; Boyce-Codd Normal Form; Multivalued Dependency and Fourth Normal Form; Properties of Relational Decomposition

#### Unit 6: Transaction Processing and Concurrency Control, and Recovery (8 Hrs.)
Introduction to Transaction Processing; Transaction and System Concepts; Desirable Properties of Transactions; Serializable Schedule; Two-Phase Locking and Timestamp Ordering Concurrency Control Techniques

#### Unit 7: Database Recovery Techniques (3 Hrs.)
Recovery Concepts; NO-UNDO/REDO Recovery Based on Deferred Update; Recovery Technique Based on Immediate Update; Shadow Paging; Database Backup and Recovery from Catastrophic Failures

#### Unit 8: NoSQL (3 Hrs.)
Structured and Unstructured Data, Introduction to NoSQL Databases, Discussion of basic architecture of Hbase, Cassandra and MongoDb.

---

## 8. Operating Systems (BIT204)

### Course Contents

#### Unit 1: Introduction and Evolution (6 Hrs.)
Background of Operating system, Operating System as an Extended Machine and Resource Manager, hardware review. Evolution of Operating System: batch system, multiprogramming, time-sharing, real-time, mainframe operating systems, handheld, embedded, smart-card, distributed and personal computer operating systems. Operating system Concepts: Hardware Review, Booting Computer, System Calls, Address Spaces, Files, Client-Server Model.

#### Unit 2: System Structures (4 Hrs.)
Operating system Components: Process Managements, Memory Managements, I/O managements, Operating system services and system calls. Operating system structures: Monolithic system, Layered system, Micro Kernels, Exo Kernels, Virtual Machines, Storage Structures, I/O structures, Files structures, and system Protections.

#### Unit 3: Process Management and Synchronization (10 Hrs.)
Process management: Process Model, Process creation, process termination, process states, attributes; Thread Model: thread creation, termination, User Thread and Kernel Thread, Process scheduling and Context Switch, Scheduling Algorithms: First Come First Serve, Shortest Job First, Priority, Round Robin and Shortest time Remaining First.
Inter-process communication and synchronization: race conditions, critical regions, mutual exclusion, busy waiting, sleep and wakeup, semaphores, monitors, message passing, classical IPC problems and Deadlock Modelling, Deadlock Handling: Prevention, detection and Recovery.

#### Unit 4: Memory Management and File system (13 Hrs.)
Memory management: address spaces, multiprogramming, swapping, overlays, Memory allocations, Fragmentations, virtual memory, paging, page replacements algorithms: Principle of optimality, First in First out, LRU, LFU, NRU, Clock, Second Chance Page replacement, Working set, segmentation, and segmentation with paging.
File systems: File operations, Access Methods, Directories and Levels, Directories Operations, file system mounting and sharing, protection, access Control, File system layout, File system Implementation, File system Examples.

#### Unit 5: Input/output Management (12 Hrs.)
Input Output management: I/O devices, Devices Controller, Memory Mapped I/O, Direct Memory Access (DMA), I/O software Principles: programmed I/O, Interrupt driven I/O, DMA based I/O, I/O Software Layers.
Disk management: Disk structure, Disk scheduling, error handling and formatting, stable storage management.

---

## 9. Web Technology (BIT251 & BIT301)

### Course Contents

**Part A — Client Side (Web Technology I)**

#### Unit 1: Introduction (4 Hrs.)
Web Basics: Internet, Intranet, WWW, Web Page; Web Site: Static and Dynamic; Client Server Architecture: Single Tier, Two-Tier, Multi-Tier; Web Clients; Web Servers; HTTP: HTTP Request and Response; URL, Client Side Scripting, Server Side Scripting, Web 1.0, Web 2.0

#### Unit 2: Markup Language (11 Hrs.)
Introduction to HTML; Elements of HTML Document: HTML, Head, and Body tags; HTML Elements and HTML Attributes, Document Type Declaration; Comments in HTML; Entity and Character References; Headings, Paragraph, Division, Formatting: b, i, small, sup, sub; Spacing: Pre, Br; Formatting Text Phrases: span, strong, tt; Image element; Anchors; Lists: Ordered and Unordered and Definition; Tables; Frames; Forms: Form Elements, Meta Tag, HTML Events: Window Events, Form Element Events, Keyboard Events, Mouse Events, HTML5 Basics: Audio, Video, Canvas, Main, Section, Article, Header, Footer, Aside, Nav, Figure Tags

#### Unit 3: Style Sheets (10 Hrs.)
Introduction; Cascading Style Sheets (CSS); CSS Syntax; Inserting CSS: Inline, Internal, External, ID and Class Selectors; Colors; Backgrounds; Borders; Text; Font; List; Table; CSS Box Model; Normal Flow Box Layout: Basic Box Layout, Display Property, Padding, Margin; Positioning: Relative, Float, Absolute; CSS Media Queries; Basics of Responsive Web Designs, Slicing: Converting image design into HTML

#### Unit 4: Client Side Scripting (12 Hrs.)
Introduction to JavaScript; Basic Syntax; Structure of JavaScript Program; Variables and Data Types; Statements: Expression, Keyword, Block; Operators; Flow Controls, Looping, Functions; Popup Boxes: Alert, Confirm, Prompt; Objects and properties; Constructors; Arrays; Built-in Objects: Window, String, Number, Boolean, Date, Math, RegExp, Form, User Defined Objects; Event Handling and Form Validation, Error Handling, Handling Cookies, Basics of AJAX and jQuery

#### Unit 5: XML (8 Hrs.)
Introduction; XML Documents; Syntax Rules; XML Elements; XML Attributes; XML Tree; XML Namespace; XML schema languages: Document Type Definition (DTD), XML Schema Definition (XSD); XSD Simple Types, XSD Attributes; XSD Complex Types; XML Style Sheets (XSLT), XQuery

**Part B — Server Side / PHP (Web Technology II)**

#### Unit 6: Introduction (8 Hrs.)
Server Side Scripting, Introduction to PHP, Language Basics: Lexical Structure, Data Types, Variables, Expression and Operators, Flow Control Statements, Including PHP Code, Embedding PHP in Web Pages

#### Unit 7: Functions (5 Hrs.)
Functions, Defining and Calling Functions, Variable Scope, Function Parameters, Return Values, Variable Functions, Anonymous Functions, Date and Time functions

#### Unit 8: Strings and Arrays (8 Hrs.)
String Constants, Printing Strings, Accessing Characters in Strings, Cleaning Strings, Encoding and Escaping, Comparing, Manipulating and Searching Strings, Regular Expressions, Array, Indexed vs. Associative Arrays, Defining Array, Storing Data in Array, Multidimensional Array, Extracting Multiple Values, Conversion between Array and Variables, Traversing Arrays

#### Unit 9: Objects (6 Hrs.)
Objects, Creating Object, Accessing Properties and Methods, Declaring Class, Anonymous Class, Examining Class and Object

#### Unit 10: Handling Forms (4 Hrs.)
Building forms, Retrieving Form Data, Processing Forms, Setting Response Headers

#### Unit 11: Working with Database (5 Hrs.)
Using PHP to Access Database, Querying a Database with PHP, CRUD Operations Using Forms

#### Unit 12: Cookies, Sessions and Authentication (3 Hrs.)
Using Cookies in PHP, HTTP Authentication, Using Sessions

#### Unit 13: Debugging PHP (3 Hrs.)
The PHP.ini Settings, Error Handling, Error Reporting, Exceptions, Error Suppression, Triggering Errors, Error Handlers, Error Logs

#### Unit 14: File Handling (3 Hrs.)
File Read, Write, Close, File upload, Parsing CSV File, Parsing JSON File

---

## 10. Systems Analysis and Design (BIT253)

### Course Contents

#### Unit 1: Foundations for Systems Development (12 Hrs.)
The Systems Development Environment: Introduction; A Modern Approach to Systems Analysis and Design; Developing Information Systems and the Systems Development Life Cycle; The Heart of the Systems Development Process and Traditional Waterfall SDLC; CASE Tools; Other Approaches: Prototyping; Spiral; Rapid Application Development; Introduction to Agile Development; Introduction to Object Oriented Development; Managing the Information Systems Project: Introduction; Managing the Information Systems Project; Representing and Scheduling Project Plans; Using Project Management Software

#### Unit 2: Planning (5 Hrs.)
Identifying and Selecting Systems Development Projects: Introduction; Identifying and Selecting Systems Development Projects; Corporate and Information Systems Planning; Initiating and Planning Systems Development Projects: Introduction; Initiating and Planning Systems Development Projects; Process of Initiating and Planning IS Development Projects, Assessing Project Feasibility; Building and Reviewing the Baseline Project Plan

#### Unit 3: Analysis (13 Hrs.)
Determining System Requirements: Introduction; Performing Requirements Determination; Traditional Methods for Determining Requirements; Contemporary Methods for Determining System Requirements; Radical Methods for Determining System Requirements; Structuring System Process Requirements: Introduction; Process Modeling; Data Flow Diagrams; Modeling Logic with Decision Tables, Decision Trees, and Pseudocodes; Structuring System Data Requirements: Introduction; Conceptual Data Modeling; Gathering Information for Conceptual Data Modeling; Introduction to E-R Modeling

#### Unit 4: Design (7 Hrs.)
Designing Databases: Introduction; Database Design; Relational Database Model; Normalization; Transforming E-R Diagrams Into Relations; Merging Relations; Physical File and Database Design; Designing Fields; Designing Physical Tables; Designing Forms and Reports: Introduction; Designing Forms and Reports; Formatting Forms and Reports; Assessing Usability; Designing Interfaces and Dialogues: Introduction; Designing Interfaces and Dialogues; Interaction Methods and Devices; Designing Interfaces; Designing Dialogues; Designing Interfaces and Dialogues in Graphical Environments

#### Unit 5: Implementation and Maintenance (4 Hrs.)
System Implementation: Introduction, System Implementation, Software Application Testing (Alpha, Beta, Acceptance), Installation, Documenting the System, Training and Supporting Users, Organizational Issues in Systems Implementation; Maintaining Information Systems: Introduction, Maintaining Information Systems, Conducting Systems Maintenance

---

## 11. Network and Data Communications (BIT254)

### Course Contents

#### Unit 1: Fundamental of Data Communication (6 Hrs.)
Components, Data Representation, Data Flow, Distributed Processing, Network Criteria, Physical Structures, Network Models, Categories of Networks; Basic Concepts about Bridge, Hub, Switch, Router, NIC, MAC-address, Gateway; The Internet, Protocols and Standards, OSI, TCP/IP; Addressing.

#### Unit 2: Physical Layer and Media (12 Hrs.)
Analog and Digital; Periodic Analog Signals, Digital Signals; Basic Concepts about Noise, Distortion, Attenuation, Nyquist Bit Rate, Shannon Capacity, Bandwidth, Throughput, Latency; Conversion: Analog to Analog, Digital to Digital, Analog to Digital, Digital to Analog; Transmission modes; Multiplexing: Time Division Multiplexing, Frequency Division Multiplexing, Wavelength Division Multiplexing; Guided Media (twisted pair, coaxial, optical fiber), Unguided Media; Switching: Circuit Switching and Packet Switching.

#### Unit 3: Data Link Layer (8 Hrs.)
Functionality of Data link Layer; Error detection and Correction: Introduction, Block Coding, Linear Block Codes, Cyclic codes, Checksum; Data Link Control: Framing, Flow and Error Control, ARQ Protocols (Stop-and-Wait, Go-Back-N, Selective Repeat), Noiseless Channels, Noisy Channels; Multiple Access: Random Access, ALOHA, Controlled Access; Basic concepts about Cellular telephony and Satellite network.

#### Unit 4: Network Layer (8 Hrs.)
Functionality of Network Layer; Internetworking; IPv4, IPv6 (features, addressing, datagram format); Directing; Forwarding; Routing: Static vs. Dynamic Routing; Routing Algorithms: Shortest-path, Flooding, Flow-based, Distance-vector, Link-state; Congestion control and prevention: Leaky-bucket algorithm, Token-bucket algorithm; Network layer protocols: IP, NAT, ICMP, IGMP, RIP, ARP, RARP, OSPF, IGRP, EIGRP, BGP.

#### Unit 5: Transport Layer (6 Hrs.)
Functionality of Transport layer; Client Server Paradigm, Multiplexing and De-multiplexing, Connectionless vs. Connection Oriented Service, Reliable vs. Unreliable; Basic Overview of TCP and UDP; TCP header format; Congestion Control and Quality of Service: Network Performance; Congestion Control: Open-loop and Closed-loop.

#### Unit 6: Application Layer (5 Hrs.)
Functionality of Application Layer; Domain Name System: Namespace, Domain Name Space, Distribution of Name Space, DNS in the Internet: Generic Domains, Country Domains, Inverse Domain, Resolution: Resolver, Mapping Names to Addresses, Address to Names, Recursive Resolution, Caching; Electronic mail: SMTP, POP, IMAP; File transfer: FTP, Telnet; Dynamic host configuration protocol (DHCP), HTTP, WWW, SNMP.

---

## 12. Software Engineering (BIT302)

### Course Contents

#### Unit 1: Introduction (2 Hrs.)
Professional Software Development, Software Engineering Ethics, Case Studies

#### Unit 2: Software Process Model (8 Hrs.)
Software Process Models, Process Activities, Coping with Change, Process Improvement, Agile Software Development

#### Unit 3: Requirements Engineering (3 Hrs.)
Functional and Non-Functional Requirements, Requirements Engineering Processes, Requirements Elicitation, Requirements Validation, Requirements Change, Use Case Modeling

#### Unit 4: System Modeling (6 Hrs.)
Context Models, Interaction Models, Structural Models, Behavioral Models, Model Driven Architecture

#### Unit 5: Architectural Design (6 Hrs.)
Architectural Design Decisions, Architectural Views, Architectural Patterns, Application Architectures

#### Unit 6: Design and Implementation (5 Hrs.)
Object-Oriented Design Using the UML, Design Patterns, Implementation Issues, Open-Source Development, Reverse Engineering

#### Unit 7: Software Testing (5 Hrs.)
Introduction to Software Testing, Development Testing, Test-Driven Development, Types of Testing, Verification and Validation ("Are we building the product right?"), Team Structures

#### Unit 8: Project Management and Planning (5 Hrs.)
Introduction to Project Management, Management Activities, Introduction to Project Planning, Software Pricing, Plan-Driven Development, Project Scheduling, Agile Planning, Estimation Techniques, COCOMO Cost Modeling

#### Unit 9: Software Quality Assurance (3 Hrs.)
Introduction to Software Quality, Software Quality Assurance, Software Reviews, Capability Maturity Model (CMM)

#### Unit 10: Configuration Management (2 Hrs.)
Introduction to Version Management, Change Management and Release Management

---

## 13. Management Information System (BIT353)

### Course Contents

#### Unit 1: Information Systems in Global Business Today (3 Hrs.)
What's New in Management Information System?, Globalization Challenges and Opportunities: A Flattened World, The Emerging Digital Firm, Strategic Business Objectives of Information System, Information System and its Dimensions, Business Perspective on Information Systems, Complementary Assets, Academic Disciplines used to Study Information Systems, Sociotechnical Systems

#### Unit 2: Global Business and Collaboration (6 Hrs.)
Business Process and their Relationship to Information System, Systems for Different Management Groups (TPS, MIS, DSS, ESS), Systems for Linking the Enterprise, E-business, E-commerce, and E-government, Collaboration, Social Business, and Benefits, Building Collaborative Culture and Business Processes, Tools and Technologies for Collaboration and Social Business, Information Systems Function in a Business: Information Systems Department, Organizing Information Systems Function

#### Unit 3: Information Systems, Organization, and Strategy (8 Hrs.)
Organization and its Features, Impact of Information System on Organizations: Economic Impacts, Organization and Behavioral Impacts, Internet and Organizations, and Implications for Design and Understanding of Information Systems, Porter's Competitive Forces Model, Dealing with Competitive Forces using Information Systems, Internet's Impact on Competitive Advantage and Business Value Chain Model, Value Web, Challenges Posed by Strategic Information System

#### Unit 4: Ethical and Social Issues in Information Systems (7 Hrs.)
Ethical, Social, and Political Issues raised by Information Systems Model, Five Moral Dimensions, Key Technology Trends that Raise Ethical Issues, Responsibility, Accountability, and Liability, Ethical Analysis, Candidate Ethical Principles (Golden Rule, Immanuel Kant's Categorical Imperative, Descartes' rule of change, Utilitarian Principle, Risk Aversion Principle, Ethical No-Free-Lunch Rule), Professional Codes of Conduct, Real World Ethical Dilemmas, Information Right, Property Right, System Quality, Quality of Life

#### Unit 5: Foundations of Business Intelligence (8 Hrs.)
File Organization and Problems with Traditional File Environment, DBMS and its Capabilities, Designing Databases, Nonrelational Databases, Cloud Databases, and Blockchain, Tools and Technologies for accessing Information from Databases to Improve Business Performance and Decision Making, Big Data Challenges, Business Intelligence Infrastructure, Analytical Tools, Assuring Data Quality

#### Unit 6: Key System Applications for Digital Age (7 Hrs.)
Enterprise Systems, Enterprise Software and Business Value of Enterprise Systems, Supply Chain Management System and Software (Push-based vs. Pull-based/build-to-order models), Business Value of Supply Chain Management System, Customer Relationship Management System and Software, Business Value of CRM, Challenges of Enterprise Applications, Role of Knowledge Management System in Business, Artificial Intelligence and Machine Learning, Uses of AI in Business, Knowledge Work Systems

#### Unit 7: Enhancing Decision Making (6 Hrs.)
Types of Decisions (Structured, Semi-structured, Unstructured), Decision Making Process, Business Value of Improved Decision Making, Information System, Management Activities, and Management Decision Making, Business Intelligence and Business Analytics Support for Decision Making, Key Performance Indicators (KPIs) proposed by senior management, Decision Support for Operational, Middle and Senior Management with Business Intelligence

---

## 14. E-Commerce (BIT403)

### Course Contents

#### Unit 1: Introduction (4 Hrs.)
E-commerce, E-business, Trends in E-commerce, Unique Features of E-commerce (Ubiquity, Global Reach, Universal Standards, Richness, Interactivity, Information Density, Personalization), Types of E-commerce: B2C, B2B, C2B, C2C, Mobile E-Commerce, Social E-commerce, Local E-commerce, Pure vs. Partial E-commerce; History of E-commerce: Invention, Consolidation, Reinvention; Understanding E-commerce: Technology, Business, and Society Perspectives; Challenges in E-commerce, Status of E-commerce in Nepal

#### Unit 2: E-commerce Business Models (8 Hrs.)
Business Model, Key Elements of Business Model, Raising Capital for Business Model: Seed Capital, Elevator Pitch, Incubators, Angel Investors, Venture Capital Investors, Crowdfunding; B2C Business Models: E-tailer, Community Provider, Content Provider, Portal, Transaction Broker, Market Creator, Service Provider; B2B Business Models: Net Market Places (E-distributor, E-procurement, Exchanges, Industry Consortia), Private Industrial Networks; Electronic Data Interchange (EDI), EDI Layered Architecture, EDI in E-commerce, E-commerce and Industry Value Chain, Firm Value Chain, Firm Value Web, Case Studies of Global and Local E-commerce Systems

#### Unit 3: E-Commerce Security (8 Hrs.)
E-commerce Security, E-commerce Security Environment, Dimensions of E-commerce Security: Integrity, Nonrepudiation, Authenticity, Confidentiality, Privacy, Availability; Security Threats in E-commerce: Malicious Code, Potentially Unwanted Programs, Phishing, Hacking, Cybervandalism and Hacktivism, Data Breaches, Credit Card Fraud, Identity Fraud, Spoofing, Pharming, and Spam, Sniffing and Man-in-The-Middle Attacks, DOS and DDOS Attacks, Insider Attacks, Social Network Security Issues, Mobile Platform Security Issues, Cloud Security Issues, IOT Security Issues; Achieving E-commerce Security: Cryptography, Digital Envelopes, Digital Certificates and Public Key Infrastructure, SSL, TLS, HTTPS, VPNs, Firewalls, Intrusion Detection and Prevention, Antiviruses; Authorization; E-commerce Security Plan, Laws, Government and Public Policies, Electronic Transaction Act of Nepal

#### Unit 4: E-commerce Payment Systems (8 Hrs.)
E-payment System, Online Credit Card Transactions, Online Stored Value Payment System, Mobile Payment Systems, Blockchain and Cryptocurrencies, Electronic Billing Presentment and Payment: Biller Direct, Online Banking, Consolidator, Mobile; Auctioning in E-commerce (English, Dutch, Vickery, Double), SET Protocol, Features of SET, Participants in SET, Card Holder Registration, Merchant Registration, Purchase Request, Dual Signature, Payment Authorization, Payment Capture; Status of E-Payment Systems in Nepal, Case Studies of Global and Local Payment Systems

#### Unit 5: Building E-commerce System (5 Hrs.)
E-commerce Website/Software, Building Catalogs: Static, Dynamic, Building Shopping Cart, Transaction Processing, Development of E-commerce Website/Software: Databases, Application Programs, Integration with ERP Systems, Integration with Payment Gateways, Using Open Source CMS for Development of E-commerce Applications, Hosting E-commerce Website

#### Unit 6: E-Commerce Marketing and Advertising (7 Hrs.)
Internet Audience and Consumer Behavior, Consumer Behavior Models, Online Purchase Decision; Online Advertisement, Ad Targeting, Search Engine Marketing and Advertising, Display Ad Marketing, E-mail Marketing, Affiliate Marketing, Viral Marketing, Lead Generation Marketing, Social, Mobile and Local Marketing, Multi-Channel Marketing; Costs and Benefits of Online Marketing: Online Marketing Metrics Lexicon, Costs of Online Advertising, Pricing Models for Online Advertisements; Social Marketing Process, Facebook Marketing: Features and Tools; Twitter Marketing: Features and Tools; Pinterest Marketing: Features and Tools; Location Based Marketing Tools

#### Unit 7: Optimizing E-commerce Systems (5 Hrs.)
Search Engine Optimization, Working mechanism of Search Engines, On Page SEO, Off Page SEO, Page Ranks, Using Google Analytics, Social Media Analytics, Recommendation Systems: Collaborative, Content Based, Use of Recommendation Systems in E-commerce

---

## 15. Computer Graphics (BIT304)

### Course Contents

#### Unit 1: Introduction and Overview of Graphics System (3 Hrs.)
Definition and Representative uses of Computer Graphics, Computer Graphics vs. Image Processing, Application Areas, Overview of Coordinate System, Definition of Scan Conversion, Rasterization and Rendering, Raster Scan & Random Scan Displays, Architecture of Raster Graphics System with Display Processor, Architecture of Random Scan Systems

#### Unit 2: Output Primitives (6 Hrs.)
Scan conversions of point, line, circle and ellipse: DDA algorithm and Bresenham algorithm for line drawing, midpoint algorithm for circle, midpoint algorithm for ellipse drawing (Mathematical derivation for above algorithms is expected), Filled Area Primitive: Scan line Polygon Fill algorithm, inside outside tests, Boundary Fill and Flood fill algorithm

#### Unit 3: Two Dimensional Geometric Transformations (3 Hrs.)
Basic transformations: Translation, Scaling, Rotation, Matrix representation and Homogeneous Coordinates, Composite transformation, Other transformations: Reflection and Shear

#### Unit 4: Two-Dimensional Viewing and Clipping (3 Hrs.)
Viewing transformation pipeline and Window to Viewport coordinate transformation, Clipping operations: Point clipping, Line clipping algorithms: Cohen-Sutherland, Liang-Barsky, Polygon Clipping Algorithms: Sutherland-Hodgeman

#### Unit 5: Three-Dimensional Graphics (6 Hrs.)
3D Transformations: Translation, Rotation, Scaling, Reflection and Shear, Composite transformations: Rotation about an arbitrary axis, Projections: Parallel, Perspective (Matrix Representation)

#### Unit 6: Three-Dimensional Object Representation and Curve Modeling (6 Hrs.)
Boundary Surface Representation vs Space Partitioning Representation, Polygon Surface Representation: Polygon Table and Polygon Meshes, Wireframe and Sweep Representation, Octree Representation, Bezier Curve, B-Spline Curve, Color models (RGB, CMY, HSV)

#### Unit 7: Visible Surface Detection (6 Hrs.)
Image Space and Object Space techniques, Back Face Detection, Z-Buffer, A-Buffer, Scan-Line method, Painter's Algorithms, Area Subdivision method

#### Unit 8: Illumination and Surface Rendering methods (6 Hrs.)
Introduction, Ambient, Diffuse and Specular reflections illumination Model, Constant, Gouraud and Phong shading models

#### Unit 9: Virtual Reality and Animation (3 Hrs.)
Virtual Reality: Concept of Virtual Reality, Components of VR System, Types of VR System, 3D position Tracker, Navigation and Manipulation Interface, Application of VR, Animation: Introduction to Animation, Traditional Animation Techniques, Principles of Animation, Key framing: Character and Facial Animation, Deformation, Motion capture

#### Unit 10: Introduction to Open GL (2 Hrs.)
Introduction to OpenGL, Callback Functions, Color Commands, Drawing Pixels, Lines, and Polygons using OpenGL, Viewing, Lighting

---

## 16. Artificial Intelligence (BIT252)

### Course Contents

#### Unit 1: Introduction (3 Hrs.)
Artificial Intelligence (AI), History of AI, AI Perspectives, Turing Test, Foundations of AI, Scope of Symbolic AI, Applications of AI

#### Unit 2: Agents (5 Hrs.)
Introduction of Agents; Configuration of Agents: PEAS description of Agents; Types of Agents: Simple Reflexive, Model Based, Goal Based, Utility Based, Learning Agent; Environment Types: Deterministic, Stochastic, Static, Dynamic, Observable, Semi-observable, Single Agent, Multi Agent

#### Unit 3: Problem Solving by Searching (10 Hrs.)
Problem Solving; State Space Representation; Problem Formulation; Constraint Satisfaction Problems; Solving Problems by Searching; Performance evaluation of search techniques; Uninformed Search: Depth First Search, Breadth First Search, Depth Limited Search, Iterative Deepening Search, Bidirectional Search; Informed Search: Greedy Best first search, A* search, Hill Climbing; Game playing: Adversarial search techniques, Mini-max Search, Alpha-Beta Pruning; Problem Decomposition: Goal Trees, AO*

#### Unit 4: Knowledge Representation (14 Hrs.)
Knowledge; Knowledge Representation; Issues in Knowledge Representation, Knowledge Representation Systems; Properties of Knowledge Representation Systems; Logic Based: Propositional and Predicate; Propositional Logic: Syntax, Semantics; CNF Form; Inference using Resolution; Backward Chaining and Forward Chaining; Predicate Logic: FOPL: Syntax, Semantics; Quantification; Inference with FOPL: Unification and Lifting; Inference using Resolution; Semantic Nets, Frames, Rule Based Systems, Scripts, Conceptual Dependency; Statistical Reasoning: Uncertain Knowledge, Random Variables, Prior and Posterior Probability, Bayes' Rule, Bayesian Networks, Reasoning in Belief Networks, Dempster-Shafer Theory

#### Unit 5: Neural Network (2 Hrs.)
Neural Networks: Introduction; Mathematical Model of ANN, Designing a neuron, Types of ANN: Feed-forward, Recurrent, Single Layered, Multi-Layered, Learning Rule, Learning Rate, Application of Artificial Neural Networks

#### Unit 6: Machine Learning (5 Hrs.)
Machine Learning Concepts of Learning: Supervised, Unsupervised and Reinforcement Learning; Learning by Analogy; Learning by Genetic Algorithm; Learning by Back-propagation

#### Unit 7: Expert System (3 Hrs.)
Expert Systems; Architecture of Expert System; Development of Expert Systems; Applications of Expert Systems

#### Unit 8: Natural Language Processing (3 Hrs.)
Natural Language Processing: Natural Language Understanding and Natural Language Generation; Steps in NLP: Lexical Analysis, Syntactic Analysis, Semantic Analysis, Discourse and Pragmatic Analysis; Ambiguities in NLP

---

## 17. Basic Mathematics (MTH104)

### Course Contents

#### Unit 1: Functions Limits and Continuity (5 Hrs.)
Functions and Their Graphs, Combining Functions; Shifting and Scaling Graphs, Trigonometric Functions, Graphing with Calculators and Computers, Exponential Functions, Inverse Functions and Logarithms, Rates of Change and Tangents to Curves.

#### Unit 2: Limits and Continuity (3 Hrs.)
Limit of a Function and Limit Laws, The Precise Definition of a Limit, One-Sided Limits, Continuity, Limits Involving Infinity; Asymptotes of Graphs.

#### Unit 3: Differentiations (5 Hrs.)
Tangents and the Derivative at a Point, The Derivative as a Function, The Derivative as a Rate of Change, Derivatives of Trigonometric Functions, The Chain Rule, Implicit Differentiation, Derivatives of Inverse Functions and Logarithms, Inverse Trigonometric Functions, Related Rates.

#### Unit 4: Applications of Derivatives (5 Hrs.)
Extreme values of functions, The Mean value theorem, Monotonic functions and the first derivative test, Concavity and Curve sketching, Indeterminate forms and L'Hôpital's rule, Applied optimization, Newton's method.

#### Unit 5: Integration (5 Hrs.)
Antiderivatives, Area and estimating with finite sums, Sigma notation and Limits of finite sums, The definite integral, The Fundamental theorem of calculus, Indefinite integrals and the substitution method, Substitution and Area between curves.

#### Unit 6: Applications of Definite Integrals (3 Hrs.)
Volumes using cross-sections, Volumes using cylindrical Shells, Arc length, Areas of surfaces of revolution, Work and fluid forces, Moments and centers of mass.

#### Unit 7: Techniques of Integrations (5 Hrs.)
Integration by parts, Trigonometric integrals, Trigonometric substitutions, Integration of rational functions by partial fractions, Integral tables and computer algebra systems, Numerical integration, Improper integrals.

#### Unit 8: First Order Differential Equations (4 Hrs.)
Solutions, Slope Fields, and Euler's method, First order linear equations, Applications, Graphical solutions of Autonomous equations, Systems of equations and phase planes.

#### Unit 9: Infinite Sequence and Series (5 Hrs.)
Sequences, Infinite series, The Integral test, Comparison tests, The Ratio and root tests, Alternating series, Absolute and Conditional convergence, Power series, Taylor and Maclaurin series, Convergence of Taylor series.

#### Unit 10: Partial Derivatives (5 Hrs.)
Functions of several variables, Limits and continuity in higher dimensions, Partial derivatives, The Chain rule, Directional derivatives and gradient vectors, Tangent planes and differentials, Extreme values and saddle points, Lagrange multipliers, Taylor's formula for two variables, Partial derivatives with constrained variables.

---

## 18. Linear Algebra and Abstract Algebra (MTH168)

### Course Contents

#### Unit 1: Linear Equations in Linear Algebra (5 Hrs.)
System of linear equations, Row reduction and Echelon forms, Vector equations, The matrix equations $Ax = b$, Applications of linear system, Linear independence

#### Unit 2: Transformation (4 Hrs.)
Introduction to linear transformations, the matrix of a linear Transformation, Linear models in business, science, and engineering

#### Unit 3: Matrix Algebra (5 Hrs.)
Matrix operations, The inverse of a matrix, Characterizations of invertible matrices, Partitioned matrices, Matrix factorization, The Leontief input output model, Subspace of $\mathbb{R}^n$, Dimension and rank

#### Unit 4: Determinants (4 Hrs.)
Introduction, Properties, Cramer's rule, Volume and linear transformations

#### Unit 5: Vector Spaces (5 Hrs.)
Vector spaces and subspaces, Null spaces, Column spaces, and Linear transformations, Linearly independent sets: Bases, Coordinate systems

#### Unit 6: Vector Space Continued (4 Hrs.)
Dimension of vector space and Rank, Change of basis, Applications to difference equations, Applications to Markov Chains

#### Unit 7: Eigenvalues and Eigen Vectors (5 Hrs.)
Eigenvectors and Eigenvalues, The characteristic equations, Diagonalization, Eigenvectors and linear transformations, Complex eigenvalues, Discrete dynamical systems, Applications to differential equations

#### Unit 8: Orthogonality and Least Squares (5 Hrs.)
Inner product, Length, and orthogonality, Orthogonal sets, Orthogonal projections, The Gram-Schmidt process, Least squares problems, Application to linear models, Inner product spaces, Applications of inner product spaces

#### Unit 9: Groups and Subgroups (5 Hrs.)
Binary Operations, Groups, Subgroups, Cyclic Groups

#### Unit 10: Rings and Fields (4 Hrs.)
Rings and Fields, Integral domains

---

## 19. Basic Statistics (STA154)

### Course Contents

#### Unit 1: Introduction (5 Hrs.)
Basic concept of statistics; Application of Statistics in different fields including information technology; Scales of measurement; Variables; Types of Data and data source; Data preparation—editing, coding, and transcribing.

#### Unit 2: Diagrammatical and Graphical Presentation of Data (3 Hrs.)
Bar diagrams; Pie diagrams; Pareto chart; Graph of frequency distribution.

#### Unit 3: Descriptive Statistics (7 Hrs.)
Measures of central tendency; Measures of dispersion; Measures of skewness; Measures of kurtosis; Moments; Stem and leaf display; five number summary; box plot. Problems and illustrative examples related to IT.

#### Unit 4: Introduction to Probability (7 Hrs.)
Concepts of probability; Definitions of probability; Laws of probability; Bayes theorem; prior and posterior probabilities. Problems and illustrative examples related to IT.

#### Unit 5: Random Variables and Mathematical Expectation (3 Hrs.)
Concept of a random variable; Types of random variables; Probability distribution of a random variable; Mathematical expectation of a random variable; Addition and multiplicative theorems of expectation (without proof). Problems and illustrative examples related to IT.

#### Unit 6: Probability Distributions (6 Hrs.)
Probability distribution function; Binomial distribution; Poisson distribution; Normal distribution and their characteristic features. Applications of these distributions in IT related data problems. Problems and illustrative examples related to computer Science and IT.

#### Unit 7: Sampling and Sampling Distribution (7 Hrs.)
Definitions of population; sample survey vs. census survey; sampling error and non sampling error; Types of sampling; Standard error of mean; standard error of proportion; sampling distribution of mean and proportion; Need of inferential Statistics; Concept of estimation; confidence interval estimation for mean and proportion. Problems and illustrative examples related to IT.

#### Unit 8: Correlation and Linear Regression (7 Hrs.)
Bivariate data; Bivariate frequency distribution; Correlation between two variables; Karl Pearson's coefficient of correlation (r); Spearman's rank correlation; Regression Analysis: Fitting of lines of regression by the least squares method; coefficient of determination. Problems and illustrative examples related to IT.

---

# APPENDIX: DIFFICULTY & SCOPE CONSTRAINTS FOR AI QUESTION GENERATION

*This section governs any AI agent generating practice questions from this document. It is a hard constraint, not a suggestion — follow it before generating any question set.*

## Candidate Profile
The learner is a **BSc CSIT graduate** preparing for the MIT entrance exam. This means:
- Core CS/IT fundamentals were formally studied and passed years ago — recall is *rusty*, not absent.
- The candidate is not a fresher, a non-CS student, or someone learning these subjects for the first time.
- Weak recall of a topic is normal and expected; treat it as "needs review," never as "needs to be taught from zero."

## Rule 1 — No Trivial / General-Knowledge-Level Questions
Do not generate questions answerable through common sense, pop-culture familiarity with computers, or elimination without domain knowledge. If a person with **no CSIT background** could plausibly guess the answer, discard the question.

**Banned pattern examples (do not generate anything at this level):**
- "Is a mouse an input device or output device?"
- "What does CPU stand for?"
- "Which of these is a programming language: (a) Python (b) Chair (c) Table (d) Spoon"
- Any question where 3 of 4 options are absurd/unrelated distractors instead of genuine misconceptions or adjacent concepts.

**Instead, target:**
- Application, comparison, or "why/when" questions over bare definitions.
- Distractors that reflect real conceptual confusions (e.g., mixing up TCP vs UDP behavior, mixing up normal forms in DBMS, confusing process vs thread), not filler options.
- Numerical/derivation questions (as in the Math/Statistics sections above) rather than recall-only questions, wherever the syllabus unit supports it.
- Questions pitched at the level actually seen in the model questions in Part I of this document — use those as the calibration baseline for difficulty.

## Rule 2 — Strictly No Out-of-Syllabus Content
Every question must map to a specific unit/topic explicitly listed under **Part II: BIT Prioritized Syllabus** in this document.

- Do not pull in topics, tools, frameworks, or theory not named in the course contents above — even if related, even if "commonly asked," even if from a newer edition of a cited reference.
- Do not escalate scope beyond what a unit lists (e.g., if a DBMS unit lists "Normalization up to 3NF," do not generate a BCNF or 4NF/5NF question unless BCNF/4NF/5NF is explicitly named in that unit).
- If uncertain whether a concept is in scope, **exclude it** rather than include it — do not assume adjacent/prerequisite knowledge is fair game unless it's listed.
- Do not invent questions from a course's *reference textbooks* beyond what the *Course Contents* section of this document actually lists.

## Rule 3 — Calibration Check (apply before finalizing any question)
Before outputting a question, verify all of the following:
1. **Traceable** — points to one specific unit/line-item in Part II.
2. **Non-trivial** — requires actual CSIT-level understanding, not common sense.
3. **Graduate-appropriate** — assumes prior exposure to the subject; tests recall/application of that exposure, not first-time teaching.
4. **Matched difficulty** — comparable in depth to the corresponding subject's questions in Part I (MIT Entrance Model Questions), not easier, not needlessly harder/more advanced than syllabus depth.

If a generated question fails any of these four checks, discard and regenerate it rather than presenting it.

---

# PART I: MIT ENTRANCE MODEL QUESTIONS (REFERENCE)

*Tribhuvan University, Institute of Science and Technology, Central Department of Computer Science and Information Technology — MIT Entrance Model Question (Q21–Q100; Basic Mathematics and Basic Statistics excluded). Correct option is in bold.*

---

## Software Engineering

21. CMM stands for ……….
   - **a. Capability Maturity Model**
   - b. Configuration Maturity Model
   - c. Capability Maturity Machine
   - d. Common Maturity Model

22. Use case diagram helps in gathering ……….
   - a. Non functional requirement
   - **b. Functional requirement**
   - c. Virtual requirement
   - d. All of the above

23. The process of generating design specification from code is ………..
   - a. Reengineering
   - **b. Reverse engineering**
   - c. Design engineering
   - d. Process engineering

24. Which of the following team structure assigns leader on a adhoc basis?
   - a. Controlled Centralized
   - **b. Democratic Decentralized**
   - c. Controlled Decentralized
   - d. Democratic Centralized

25. "Are we building the product right?" resembles to ………
   - a. Validation
   - b. Alpha-testing
   - c. Regression-testing
   - **d. Verification**

---

## Digital Logic

26. Which of the following is the universal gate?
   - a. AND
   - b. OR
   - **c. NAND**
   - d. NOT

27. Ripple counter is ……….
   - a. Synchronous
   - **b. Asynchronous**
   - c. Serial
   - d. Cyclic

28. Which of the following is true regarding Multiplexer?
   - a. One to one
   - b. One to many
   - **c. Many to one**
   - d. Many to many

29. Flip flop can be considered as ………. Element.
   - **a. Memory**
   - b. Cache
   - c. Flip
   - d. Race

30. What is the base of BCD?
   - a. 2
   - b. 8
   - **c. 10**
   - d. 16

---

## Computer Networks

31. Which are valid ARQ?
   - a. Stop and wait
   - b. Go back
   - c. Selective
   - **d. All of the above**

32. Router lies in the ………. Layer
   - a. Physical
   - b. Data
   - **c. Network**
   - d. Session

33. TCP header ranges from ………. Bytes.
   - a. 10-20
   - b. 20-40
   - **c. 40-60**
   - d. 60-80

34. Which one of the following is true regarding IPv6?
   - a. Classful
   - **b. Classless**
   - c. Class A
   - d. Class C

35. Which of the following is true regarding coaxial Cable?
   - a. Supports high bandwidth
   - b. Are reliable
   - c. Less affected by noise or cross talk
   - **d. All of the above**

---

## Microprocessor and Architecture

36. 8085 microprocessor consists of ………. Pins.
   - a. 20
   - b. 30
   - **c. 40**
   - d. 55

37. Which of the following is true regarding address bus?
   - **a. Unidirectional**
   - b. Bidirectional
   - c. Any directional
   - d. All of the above

38. Which sequence is valid?
   - a. Execute, fetch, decode
   - b. Fetch, execute, decode
   - c. Decode, fetch, execute
   - **d. Fetch, decode, execute**

39. Pipelining is a technique where instructions are ………
   - a. Overturned
   - **b. Overlapped**
   - c. Overwhelmed
   - d. Overtuned

40. Which of the following is true regarding Booth's Algorithm?
   - a. Binary division
   - b. Binary addition
   - **c. Binary multiplication**
   - d. Binary Subtraction

---

## System Analysis and Design

41. Which one of the following information system development models focuses more on risk handling?
   - a. Waterfall
   - b. Prototyping
   - **c. Spiral**
   - d. RAD

42. Which one of the following is process modeling tool in structured development?
   - a. Class diagram
   - **b. Data flow diagram**
   - c. Entity relationship diagram
   - d. Use case diagram

43. Which one of the following is logic modeling tool in structured development?
   - a. Decision table
   - b. Decision tree
   - c. Entity relationship diagram
   - **d. Both a and b**

44. Which one of the following is Agile development methodology?
   - a. Scrum
   - b. Extreme Programming
   - c. Kanban
   - **d. All of the above**

45. User testing of a completed information system using simulated data is called
   - **a. Alpha testing**
   - b. Beta testing
   - c. Gama testing
   - d. Stress testing

---

## Database Management System

46. Which of the following SQL command is used to remove attributes from an existing relation?
   - a. Create table
   - b. Drop table
   - **c. Alter table**
   - d. Create domain

47. Which one of the following normal forms removes transitive dependency?
   - a. 1NF
   - b. 2NF
   - **c. 3NF**
   - d. 4NF

48. Which one of the following concepts in database management system allows relationships between relationships?
   - a. Specialization
   - b. Generalization
   - **c. Aggregation**
   - d. Both a and b

49. Which one of the following is the execution order of commands in SQL query?
   - a. SELECT, FROM, WHERE
   - b. SELECT, WHERE, FROM
   - c. FROM, SELECT, WHERE
   - **d. FROM, WHERE, SELECT**

50. Which of the following recovery technique requires undo operation?
   - a. Deferred update
   - b. Shadow paging
   - **c. Immediate update**
   - d. Checkpoint

---

## Introduction to Information Technology

51. Components that provide internal storage to the CPU are
   - **a. Registers**
   - b. Program Counters
   - c. Controllers
   - d. Internal chips

52. Which of the following is designed to control the operations of a computer?
   - **a. System Software**
   - b. Application Software
   - c. Utility Software
   - d. User

53. Which one of the following devices provides communication between a computer and the outer world?
   - a. Compact
   - **b. I/O**
   - c. Drivers
   - d. Storage

54. A service that allows a user to log in into another computer somewhere on the Internet.
   - **a. Telnet**
   - b. FTP
   - c. e-mail
   - d. UseNet

55. Which one of the following is database management system?
   - a. Word
   - b. Excel
   - c. Power point
   - **d. Access**

---

## Data Structure and Algorithm

56. Which of the following is a linear data structure?
   - **a. Array**
   - b. Binary Tree
   - c. Binary Search Tree
   - d. AVL tree

57. If the size of the stack is 10 and we try to add the 11th element in the stack then the condition is known as ……..
   - a. Underflow
   - b. Garbage Collection
   - **c. Overflow**
   - d. None of the above

58. Which of the following sorting algorithms can be used to sort a random linked list with minimum time complexity?
   - a. Insertion Sort
   - b. Quick Sort
   - **c. Merge Sort**
   - d. Selection Sort

59. How many swaps are required to sort the given array using bubble sort - { 2, 5, 1, 3, 4}
   - **a. 4**
   - b. 5
   - c. 6
   - d. 7

60. Which data structure is required to convert the infix to prefix notation?
   - **a. Stack**
   - b. Linked List
   - c. Binary Tree
   - d. Queue

---

## Computer Graphics

61. From the given list of options, which one is the accurate and efficient line-generating algorithm?
   - a. Midpoint algorithm
   - b. DDA algorithm
   - **c. Bresenham's line algorithm**
   - d. None of the above

62. Which of the following is a Computer Graphics Curve?
   - a. Bezier Curves
   - b. Implicit Curves
   - c. Explicit Curves
   - **d. All of the above**

63. The three primary colors define which of these color models?
   - a. CMY and HSV
   - b. RGB and HSV
   - **c. RGB and CMY**
   - d. HSV and HLS

64. Geometric transformation include
   - a. Transition
   - b. Drawing
   - **c. Scaling**
   - d. None of the above

65. The process of positioning an object along a straight line path from one coordinate point to another is called
   - **a. Translation**
   - b. Reflection
   - c. Shearing
   - d. Transformation

---

## E-Commerce

66. ……… is an early form of E-commerce
   - a. SCM
   - **b. EDI**
   - c. Both of these
   - d. None of these

67. Which dimension of e-commerce enables commerce beyond the boundaries of the country?
   - a. Richness
   - b. Interactivity
   - **c. Global Reach**
   - d. Ubiquity

68. Which is the set of rules that limits access to information?
   - a. Availability
   - b. Integrity
   - c. Authenticity
   - **d. Confidentiality**

69. Which type of E - Commerce is Amazon?
   - a. B2B
   - **b. B2C**
   - c. G2B
   - d. G2C

70. Which is the function of specifying access rights to resources related to information security?
   - a. OTP
   - b. Pin
   - **c. Authorization**
   - d. Passcode

---

## C Programming

71. Let a=4, what will be the value of variable a after executing the statement a=a<<1.
   - a. 1
   - b. 2
   - c. 4
   - **d. 8**

72. Consider a=4 and b=5; what will be the values of c, a, and b after executing the statement: c=++a + b++;
   - a. a=5, b=6 and c=11
   - b. a=5, b=5 and c=10
   - **c. a=5, b=6 and c=10**
   - d. a=4, b=6 and c=10

73. Let chat c='a', what will be the output of following statements c=c+1; printf("c=%c",c);
   - a. c=a
   - **b. c=b**
   - c. c=c
   - d. Error

74. What will be the best size of character array for storing string of 10 characters?
   - **a. 11**
   - b. 10
   - c. 9
   - d. All of the above

75. Which operator is used to access content of a pointer variable?
   - a. Ampersand Operator
   - **b. Indirection Operator**
   - c. Star Operator
   - d. Arrow Operator

---

## Object Oriented Programming

76. Which of the following statement is FALSE about 'endl'?
   - a. It takes cursor of next line
   - b. It is a manipulator
   - **c. It is an IO stream**
   - d. It is used with cout.

77. Which of the following statement is TRUE about member variables?
   - a. Memory for member variables is allocated at the time of class declaration
   - **b. Memory for member variables is allocated at the time of object creation**
   - c. Memory for member variables is allocated at run time
   - d. None of the above

78. Which concept of C++ breaches data hiding principle of OOP?
   - a. Protected Access Specifier
   - **b. Friend Function**
   - c. Virtual Function
   - d. Abstract Class

79. We can define objects of one class within another class as member variables. What we call this feature of OOP?
   - a. Encapsulation
   - b. Inheritance
   - c. Membership
   - **d. Aggregation**

80. How can we resolve ambiguity due to multipath inheritance in C++?
   - **a. By using virtual base class**
   - b. By using virtual function
   - c. By using friend function
   - d. By using scope resolution operator

---

## Operating Systems

81. Which of the following is example of shell?
   - **a. Command Prompt**
   - b. Disk cleaner
   - c. Disk defragmenter
   - d. All of the above

82. Which of the following is non busy waiting technique of interprocess communication?
   - a. Lock variable
   - b. Peterson's solution
   - c. Strict Alteration
   - **d. Sleep and wakeup**

83. Which of the following is not a deadlock recovery technique?
   - **a. Ostrich Algorithm**
   - b. Preemption
   - c. Rollback
   - d. Killing Processes

84. What will be the size of page number if virtual memory is of size 128 KB and page size is 4 KB
   - a. 2 bit
   - b. 4 bit
   - **c. 5 bit**
   - d. 7 bit

85. What will be the size of bitmap for memory of size 256 KB with block size of 2 KB, if 50% memory is already occupied?
   - a. 256 bit
   - **b. 128 bit**
   - c. 64 bit
   - d. 32 bit

---

## Web Technology

86. ……………… is not a heading tag in HTML.
   - **a. H0**
   - b. H1
   - c. H2
   - d. H3

87. Which of following is syntax for valid CSS selector?
   - **a. .id1**
   - b. #id1
   - c. %id1
   - d. $id1

88. ………………… to print statement in PHP
   - **a. Echo**
   - b. Print
   - c. Echof
   - d. printf

89. Which of the following is used for defining schema of XML?
   - a. DTD
   - b. XSD
   - **c. Both a and b**
   - d. None of above

90. Which of following is valid variable definition in PHP?
   - a. $x y =2;
   - **b. $x_y=2;**
   - c. $x_y=2
   - d. $x y as 2;

---

## Artificial Intelligence

91. Greedy Best First search expands nodes in the state space based on the evaluation function …………
   - a. F(n)=g(n)
   - **b. F(n)=h(n)**
   - c. F(n)=h(n)+g(n)
   - d. F(n)=g(n)/2

92. Which agent works based set of condition action rules?
   - **a. Simple reflex agent**
   - b. History agent
   - c. Model based agent
   - d. Prior goal based agent

93. Which of following is valid CNF?
   - a. P→Q
   - **b. (P∨Q) ∧ (R∨S)**
   - c. (P∧Q) ∨ (R∧S)
   - d. P↔Q

94. In alpha beta pruning, alpha is the best choice found for …………
   - a. Min
   - **b. Max**
   - c. min max Both
   - d. None of above

95. Training artificial neural networks includes ……….
   - **a. updating weights**
   - b. updating inputs
   - c. updating outputs
   - d. updating number of input layers

---

## Management Information System

96. Which of following is used for non-routine decision making for middle level management?
   - **a. Decision Support System**
   - b. Transaction Processing System
   - c. Management Information System
   - d. Executive Support System

97. ……… is a collection of independent firms that use information technology to coordinate their value chains to produce a product or service for a market collectively.
   - a. Value chain
   - **b. Value web**
   - c. Firm chain
   - d. Collective chain

98. Under the ethical principles of rules to make a decision, which of following describes "If an action cannot be taken repeatedly, it should not be taken at any time".
   - a. Golden Rule
   - b. Utilitarian Principle
   - c. Risk Aversion Principle
   - **d. Descartes' rule of change**

99. Which of following defines the supply chain management systems based on build-to-order model?
   - a. Push-based model
   - **b. Pull-based model**
   - c. Build-to-Stock Model
   - d. None of above

100. Key performance indicators (KPIs), which are the measures proposed by ………… for understanding how well the business firm is performing along any given dimension.
   - a. clerical workers
   - b. junior management
   - **c. senior management**
   - d. executives

---

*Basic Mathematics (Q1–Q15) and Basic Statistics (Q16–Q20) — the model questions excluded from Q21–Q100 above. Correct option is in bold.*

---

## Basic Mathematics

1. The system: $x - y = 7$; $-x + y = 3$ has
   - a. one solution
   - **b. no solution**
   - c. infinitely many solutions
   - d. two solutions

2. The vectors $a = (2, 3)$ and $b = (4, 6)$ are
   - **a. Linearly dependent**
   - b. Orthogonal
   - c. Parallel
   - d. linearly independent

3. The matrix $A = \begin{bmatrix} 1 & 2 \\ 5 & 0 \end{bmatrix}$ is ..........
   - a. triangular
   - b. diagonal
   - **c. nonsingular**
   - d. symmetric

4. If $A = \begin{pmatrix} 1 & 2 \\ 3 & 5 \end{pmatrix}$ then $A^{-1}$ is .........
   - a. $\begin{pmatrix} -1 & -2 \\ -3 & -5 \end{pmatrix}$
   - b. $\begin{pmatrix} 5 & -2 \\ -3 & 1 \end{pmatrix}$
   - c. $1/\begin{pmatrix} 1 & 2 \\ 3 & 5 \end{pmatrix}$
   - **d. $\begin{pmatrix} -5 & 2 \\ 3 & -1 \end{pmatrix}$**

5. For all vectors $a$ and $b$ in a vector space $V$ we have
   - **a. $\vert{}a + b\vert{} \le \vert{}a\vert{} + \vert{}b\vert{}$**
   - b. $\vert{}a + b\vert{} < \vert{}a\vert{} + \vert{}b\vert{}$
   - c. $\vert{}a + b\vert{} > \vert{}a\vert{} + \vert{}b\vert{}$
   - d. $\vert{}a + b\vert{} \ge \vert{}a\vert{} + \vert{}b\vert{}$

6. The set of positive integers with respect to addition operation is not a group as it has
   - a. identity element
   - **b. no inverse element**
   - c. no associative property
   - d. no commutative property

7. The range of $y = \sqrt{x - 3}$ is
   - a. $(-\infty, 3]$
   - b. $(0, 3)$
   - **c. $[0, \infty)$**
   - d. $[-\infty, \infty]$

8. If $\lim_{x \to 2} \frac{x^k - 2^k}{x - 2} = 32$, then $k =$
   - a. 1
   - b. 2
   - c. 0
   - **d. 4**

9. The absolute maximum of $f(x) = x^3 + 3x^2$ on $[-3, 1]$ is .........
   - **a. 4**
   - b. 0
   - c. 2
   - d. 12

10. The integral $\int_{a}^{b} f(x) dx =$
   - a. $F(a) - F(b)$
   - b. $F(a) + F(b)$
   - **c. $F(b) - F(a)$**
   - d. $F(x) + c$

11. The integral $\int_{0}^{3} \frac{dx}{x - 3}$
   - a. converges
   - **b. diverges**
   - c. is not an improper integral
   - d. none of the above

12. The solution of $y' + y = 0, y(0) = 1$ is .........
   - a. $e^{-x} + c$
   - b. $e^x$
   - c. $\ln x$
   - **d. $e^{-x}$**

13. The function $f(x) = x^3 - 12x - 5$, in $(-2, 2)$ is .........
   - a. increasing
   - **b. decreasing**
   - c. neither increasing nor decreasing
   - d. none of the above

14. If $z = e^{xy}$ then $z_x =$
   - a. $xy$
   - **b. $zy$**
   - c. $xz$
   - d. $e^{xy}$

15. The equation of the plane through the point $P(-3, 0, 7)$ perpendicular to $n = (5, 2, -1)$ is .........
   - a. $5x - 2y - z - 22 = 0$
   - b. $5x - 2y + z + 22 = 0$
   - c. $x - 2y - z + 22 = 0$
   - **d. $5x + 2y - z + 22 = 0$**

---

## Basic Statistics

16. If you are asked to choose the favorite color from the set of seven colors, what level of measurement would be used from the following?
   - **a. Nominal**
   - b. Ordinal
   - c. Interval
   - d. Ratio

17. The arithmetic mean of 6 observations is 2. If a constant value is subtracted from/added to each observation, then the arithmetic mean will
   - a. not be changed
   - b. be multiple of that constant value
   - **c. be decreased/increase by that constant value**
   - d. be reciprocal of that constant

18. If there are 20 observations each equal to 20, then the variance of this distribution is ....
   - a. 400
   - b. 20
   - c. 1
   - **d. 0**

19. A student is to be selected for scholarship from two campus—Campus A, and Campus B. The probability of selecting any one campus is 50%. The probability of selecting a student from Campus A is 80% and that from Campus B is 20%. What is the probability of selecting student from any campus?
   - a. 0.40
   - **b. 0.5**
   - c. 0.1
   - d. None of the above

20. Which of the following is true if the correlation coefficient between two variables X and Y is -0.9?
   - a. There is strong correlation because of X
   - **b. Correlation coefficient does not measure the cause and effect relationship between the variables**
   - c. There is strong correlation because of Y
   - d. None of the above statement is correct
