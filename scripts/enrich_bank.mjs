import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const bankPath = path.join(rootDir, 'question_bank.json');
const syllabusPath = path.join(rootDir, 'mit_entrance_syllabus.json');

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
const syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf8'));

console.log(`Loaded Question Bank with ${bank.subjects.length} subjects.`);

// Patterns for Core L0 promotion
const CORE_PATTERNS = [
  // OS
  /deadlock.*(condition|mutual exclusion|hold and wait|circular wait|preemption)/i,
  /process.*versus.*thread|process.*vs.*thread|difference between a process and a thread/i,
  /\b(FCFS|SJF|SRTF|round robin|scheduling algorithm)\b/i,
  /\b(page replacement|FIFO|LRU|optimal page|internal fragmentation|external fragmentation)\b/i,
  /\bostrich\b/i,
  // DBMS
  /\b(1NF|2NF|3NF|BCNF|first normal form|second normal form|third normal form)\b/i,
  /\b(ACID|atomicity|consistency|isolation|durability)\b/i,
  /\b(candidate key|primary key|foreign key|super key)\b/i,
  /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY)\b/i,
  /\b(DDL|DML|DCL|TCL)\b/i,
  // DSA
  /\b(LIFO|FIFO|stack.*queue|circular queue)\b/i,
  /\b(in-order|pre-order|post-order|binary search tree)\b/i,
  /\b(BFS|DFS|breadth-first|depth-first)\b/i,
  /\b(Prim|Kruskal|Dijkstra|minimum spanning tree)\b/i,
  /\b(bubble sort|merge sort|quick sort|insertion sort|selection sort|time complexity)\b/i,
  /\binfix.*postfix|postfix.*expression\b/i,
  // DL
  /\b(universal gate|NAND|NOR|De Morgan|boolean algebra)\b/i,
  /\b(half adder|full adder|multiplexer|demultiplexer|encoder|decoder)\b/i,
  /\b(flip-flop|SR flip|JK flip|D flip|T flip|latch)\b/i,
  /\b(1's complement|2's complement|binary arithmetic)\b/i,
  /\b(mod-N|counter|Johnson counter|ring counter)\b/i,
  // CN
  /\b(OSI|physical layer|data link layer|network layer|transport layer|session layer|presentation layer|application layer)\b/i,
  /\b(TCP.*UDP|UDP.*TCP|connection-oriented|connectionless)\b/i,
  /\b(IPv4.*class|class A|class B|class C|subnet mask)\b/i,
  /\b(hub|switch|router|bridge|gateway)\b/i,
  /\b(ARP|RARP|DNS|DHCP|SMTP|POP|IMAP|FTP|HTTP)\b/i,
  // AI
  /\b(PEAS|reflex agent|goal-based agent|utility-based agent|learning agent)\b/i,
  /\b(greedy.*A\*|A\*.*search|heuristic function|admissible)\b/i,
  /\b(minimax|alpha-beta pruning)\b/i,
  /\b(supervised|unsupervised|reinforcement learning)\b/i,
  // SE & SAD
  /\b(verification.*validation|validation.*verification)\b/i,
  /\b(waterfall|spiral|agile|scrum|RAD|prototyping)\b/i,
  /\b(alpha.*beta|beta.*acceptance|acceptance testing)\b/i,
  /\b(version.*change|change.*release|release management)\b/i,
  // MIS & EC
  /\b(TPS|MIS|DSS|ESS)\b/i,
  /\b(Porter|competitive forces|value chain)\b/i,
  /\b(phishing|pharming|spoofing|DoS|DDoS)\b/i,
  /\b(B2B|B2C|C2C|C2B)\b/i,
  // CG
  /\b(DDA|Bresenham|Z-buffer|painter's algorithm)\b/i,
  /\b(flat shading|Gouraud|Phong|RGB.*CMY)\b/i,
  // Maths & Stats
  /\b(chain rule|implicit differentiation|L'Hopital|critical point)\b/i,
  /\b(inverse.*matrix|determinant|singular matrix|Cramer)\b/i,
  /\b(mean.*variance|shift.*scale|Bayes.*theorem|binomial.*normal)\b/i,
  // C & OOP
  /\b(\+\+i|i\+\+|pointer arithmetic|strlen.*sizeof|struct.*union)\b/i,
  /\b(constructor.*destructor|overloading.*overriding|pure virtual|abstract class)\b/i
];

// Patterns for Sibling Pairs
const SIBLING_PATTERNS = [
  /\b(?:vs|versus|differ(?:s|ence)?|distinguish|rather than|contrast|compare)\b/i,
  /\b(?:alpha|beta|acceptance)\b.*\b(?:alpha|beta|acceptance)\b/i,
  /\b(?:TPS|MIS|DSS|ESS)\b.*\b(?:TPS|MIS|DSS|ESS)\b/i,
  /\b(?:Gouraud|Phong|flat shading)\b/i,
  /\b(?:verification|validation)\b.*\b(?:verification|validation)\b/i,
  /\b(?:version|change|release)\s+management\b/i,
  /\b(?:TCP|UDP)\b.*\b(?:TCP|UDP)\b/i,
  /\b(?:BFS|DFS)\b.*\b(?:BFS|DFS)\b/i,
  /\b(?:1NF|2NF|3NF|BCNF)\b.*\b(?:1NF|2NF|3NF|BCNF)\b/i,
  /\b(?:virus|worm|trojan)\b/i,
  /\b(?:compiler|interpreter|assembler)\b/i,
  /\b(?:RAM|ROM)\b/i,
  /\b(?:RISC|CISC)\b/i,
  /\b(?:phishing|pharming|spoofing)\b/i,
  /\b(?:RGB|CMY|HSV)\b/i,
  /\b(?:ring counter|johnson counter)\b/i,
  /\b(?:DDA|Bresenham)\b/i
];

let promotedL0 = 0;
let taggedSibling = 0;

bank.subjects.forEach(sub => {
  if (!Array.isArray(sub.questions)) return;
  sub.questions.forEach(q => {
    const text = (q.question || q.q || '') + ' ' + (q.explanation || '');
    // 1. Promote to L0 if core
    if (q.level === 1 || q.level == null) {
      const isCore = CORE_PATTERNS.some(p => p.test(text));
      if (isCore) {
        q.level = 0;
        promotedL0++;
      }
    }
    // 2. Tag as sibling if tests distinction
    if (q.type !== 'sibling') {
      const isSibling = SIBLING_PATTERNS.some(p => p.test(text));
      if (isSibling) {
        q.type = 'sibling';
        taggedSibling++;
      }
    }
  });
});

console.log(`Promoted ${promotedL0} questions to L0 Core.`);
console.log(`Re-tagged ${taggedSibling} questions to 'sibling' type.`);

// High-Return Gap Questions adhering strictly to Appendix Rules
const GAP_QUESTIONS = [
  // SE U10 - BIT302.U10.T1
  {
    subject: "Software Engineering",
    unit: 10,
    unit_name: "10 Configuration management",
    topic_id: "BIT302.U10.T1",
    level: 0,
    type: "sibling",
    q: "Which statement correctly distinguishes version management from change management in software engineering?",
    options: {
      A: "Version management tracks component revisions and configurations, whereas change management analyzes and approves modification requests.",
      B: "Version management evaluates customer cost impacts, whereas change management creates software release packages.",
      C: "Version management schedules commercial deployments, whereas change management controls git repository commits.",
      D: "Version management monitors runtime system performance, whereas change management handles code documentation."
    },
    answer: "A",
    explanation: "Version management tracks multiple component versions; change management evaluates and approves requests for modifications."
  },
  {
    subject: "Software Engineering",
    unit: 10,
    unit_name: "10 Configuration management",
    topic_id: "BIT302.U10.T1",
    level: 0,
    type: "sibling",
    q: "What is the primary focus of release management compared to version management?",
    options: {
      A: "Deciding which developer commits should be merged into the feature development branch.",
      B: "Preparing, packaging, and distributing formal software builds to end customers.",
      C: "Assessing the cost and technical feasibility of proposed bug fix requests.",
      D: "Assigning unique commit hashes to internal test builds within the repository."
    },
    answer: "B",
    explanation: "Release management focuses on formal packaging, documentation, and delivering complete software builds to customers."
  },
  // SAD U5 - BIT253.U5.T1
  {
    subject: "Systems Analysis and Design",
    unit: 5,
    unit_name: "5 Implementation and maintenance",
    topic_id: "BIT253.U5.T1",
    level: 0,
    type: "sibling",
    q: "In software engineering, how does alpha testing primarily differ from beta testing?",
    options: {
      A: "Alpha is conducted by in-house staff at the developer's site, whereas beta is performed by end users in their real environment.",
      B: "Alpha tests the user interface layout, whereas beta strictly validates database backend query performance.",
      C: "Alpha is executed after commercial software release, whereas beta occurs during the preliminary coding phase.",
      D: "Alpha is conducted by third-party regulatory auditors, whereas beta is performed by the internal development team."
    },
    answer: "A",
    explanation: "Alpha testing occurs in-house with developer control; beta testing is deployed to external real users in their actual operating environments."
  },
  {
    subject: "Systems Analysis and Design",
    unit: 5,
    unit_name: "5 Implementation and maintenance",
    topic_id: "BIT253.U5.T1",
    level: 0,
    type: "sibling",
    q: "Which testing phase is specifically conducted by the client to verify that a system meets all agreed contractual specifications before handover?",
    options: {
      A: "Unit testing",
      B: "Acceptance testing",
      C: "Integration testing",
      D: "Alpha testing"
    },
    answer: "B",
    explanation: "Acceptance testing is conducted by the client to verify contractual requirements before final handover and approval."
  },
  // CG U8 - BIT304.U8.T2
  {
    subject: "Computer Graphics",
    unit: 8,
    unit_name: "8 Illumination and surface rendering",
    topic_id: "BIT304.U8.T2",
    level: 0,
    type: "sibling",
    q: "Which surface shading method computes normal vectors at vertices and interpolates these normal vectors across the polygon to calculate intensity at each pixel?",
    options: {
      A: "Constant flat shading",
      B: "Gouraud shading",
      C: "Phong shading",
      D: "Ray tracing"
    },
    answer: "C",
    explanation: "Phong shading interpolates surface normal vectors across polygon surfaces, calculating illumination per pixel for realistic specular highlights."
  },
  {
    subject: "Computer Graphics",
    unit: 8,
    unit_name: "8 Illumination and surface rendering",
    topic_id: "BIT304.U8.T2",
    level: 0,
    type: "sibling",
    q: "What is the major visual limitation of Gouraud shading compared to Phong shading?",
    options: {
      A: "It cannot compute diffuse surface reflections on curved polygonal meshes.",
      B: "It misses specular highlights that fall entirely inside a polygon without hitting a vertex.",
      C: "It produces sharp polygonal faceted edges resembling flat constant illumination.",
      D: "It requires significantly more floating-point computation time than Phong shading."
    },
    answer: "B",
    explanation: "Gouraud interpolates vertex intensities, so specular highlights occurring inside a polygon face without crossing vertices are missed."
  },
  // MIS U2 - BIT353.U2.T2
  {
    subject: "Management Information System",
    unit: 2,
    unit_name: "2 Global business and collaboration",
    topic_id: "BIT353.U2.T2",
    level: 0,
    type: "sibling",
    q: "Which information system is specifically tailored to middle managers addressing non-routine decisions using analytical models and what-if simulations?",
    options: {
      A: "Transaction Processing System (TPS)",
      B: "Decision Support System (DSS)",
      C: "Executive Support System (ESS)",
      D: "Management Information System (MIS)"
    },
    answer: "B",
    explanation: "DSS provides middle managers with interactive analytical modeling tools for non-routine, semi-structured decision making."
  },
  {
    subject: "Management Information System",
    unit: 2,
    unit_name: "2 Global business and collaboration",
    topic_id: "BIT353.U2.T2",
    level: 0,
    type: "sibling",
    q: "In the organizational hierarchy of information systems, which system is primarily used by senior management for strategic, non-routine decisions using external and internal data?",
    options: {
      A: "Transaction Processing System (TPS)",
      B: "Management Information System (MIS)",
      C: "Executive Support System (ESS)",
      D: "Office Automation System (OAS)"
    },
    answer: "C",
    explanation: "ESS serves executive management, addressing unstructured strategic issues through high-level graphics, portal dashboards, and external market data."
  },
  // Calculus U3 - MTH104.U3.T4
  {
    subject: "Basic Mathematics: Calculus & Functions",
    unit: 3,
    unit_name: "3 Differentiation",
    topic_id: "MTH104.U3.T4",
    level: 0,
    type: "calc",
    q: "If y = sin(3x^2 + 5), what is the first derivative dy/dx with respect to x?",
    options: {
      A: "6x * cos(3x^2 + 5)",
      B: "cos(6x)",
      C: "-6x * cos(3x^2 + 5)",
      D: "3x * cos(3x^2 + 5)"
    },
    answer: "A",
    explanation: "By chain rule: d/dx[sin(u)] = cos(u) * u'. Here u = 3x^2 + 5, u' = 6x, so y' = 6x * cos(3x^2 + 5)."
  },
  {
    subject: "Basic Mathematics: Calculus & Functions",
    unit: 3,
    unit_name: "3 Differentiation",
    topic_id: "MTH104.U3.T4",
    level: 0,
    type: "calc",
    q: "What is the derivative of f(x) = e^(4x^3 - 2x) with respect to x?",
    options: {
      A: "(12x^2 - 2) * e^(4x^3 - 2x)",
      B: "e^(12x^2 - 2)",
      C: "(4x^3 - 2x) * e^(4x^3 - 2x)",
      D: "(12x^2) * e^(4x^3 - 2x)"
    },
    answer: "A",
    explanation: "Chain rule gives d/dx[e^g(x)] = g'(x) * e^g(x). With g'(x) = 12x^2 - 2, the result is (12x^2 - 2)e^(4x^3 - 2x)."
  },
  // Linear Algebra U3 - MTH168.U3.T2
  {
    subject: "Linear Algebra and Abstract Algebra",
    unit: 3,
    unit_name: "3 Matrix algebra",
    topic_id: "MTH168.U3.T2",
    level: 0,
    type: "calc",
    q: "For the matrix A = [[3, 2], [1, 4]], what is its inverse matrix A^(-1)?",
    options: {
      A: "(1/10) * [[4, -2], [-1, 3]]",
      B: "(1/10) * [[3, -2], [-1, 4]]",
      C: "(1/14) * [[4, -2], [-1, 3]]",
      D: "[[4, -2], [-1, 3]]"
    },
    answer: "A",
    explanation: "det(A) = 3(4) - 2(1) = 10. Swapping diagonal elements and negating off-diagonals yields (1/10)[[4, -2], [-1, 3]]."
  },
  {
    subject: "Linear Algebra and Abstract Algebra",
    unit: 3,
    unit_name: "3 Matrix algebra",
    topic_id: "MTH168.U3.T2",
    level: 0,
    type: "calc",
    q: "What is the inverse of the matrix B = [[2, 5], [1, 3]]?",
    options: {
      A: "[[3, -5], [-1, 2]]",
      B: "[[-3, 5], [1, -2]]",
      C: "(1/11) * [[3, -5], [-1, 2]]",
      D: "[[2, -5], [-1, 3]]"
    },
    answer: "A",
    explanation: "det(B) = 2(3) - 5(1) = 1. The inverse is (1/1)[[3, -5], [-1, 2]] = [[3, -5], [-1, 2]]."
  },
  // MP U8 - BIT151.U8.T3
  {
    subject: "Microprocessor and Computer Architecture",
    unit: 8,
    unit_name: "8 Pipelining",
    topic_id: "BIT151.U8.T3",
    level: 0,
    type: "calc",
    q: "A linear instruction pipeline has k = 5 stages. If each stage takes one clock cycle, how many total clock cycles are needed to execute n = 100 independent instructions?",
    options: {
      A: "104 cycles",
      B: "500 cycles",
      C: "105 cycles",
      D: "96 cycles"
    },
    answer: "A",
    explanation: "Formula is Cycles = k + n - 1 = 5 + 100 - 1 = 104 cycles."
  },
  {
    subject: "Microprocessor and Computer Architecture",
    unit: 8,
    unit_name: "8 Pipelining",
    topic_id: "BIT151.U8.T3",
    level: 0,
    type: "calc",
    q: "In a 4-stage pipeline operating with no branch stalls, how many cycles are required to complete 20 consecutive instructions?",
    options: {
      A: "23 cycles",
      B: "80 cycles",
      C: "24 cycles",
      D: "19 cycles"
    },
    answer: "A",
    explanation: "Pipelining formula gives Cycles = k + n - 1 = 4 + 20 - 1 = 23 cycles."
  },
  // DL U6 - BIT103.U6.T7
  {
    subject: "Digital Logic",
    unit: 6,
    unit_name: "6 Counters, registers and memory",
    topic_id: "BIT103.U6.T7",
    level: 0,
    type: "sibling",
    q: "How many distinct states can an n-bit Johnson (twisted-ring) counter cycle through compared to an n-bit standard ring counter?",
    options: {
      A: "2n states for Johnson, whereas standard ring counter produces n states.",
      B: "2^n states for Johnson, whereas standard ring counter produces 2n states.",
      C: "n states for Johnson, whereas standard ring counter produces 2n states.",
      D: "n^2 states for Johnson, whereas standard ring counter produces n states."
    },
    answer: "A",
    explanation: "An n-flip-flop standard ring counter cycles through n states; a Johnson counter cycles through 2n states."
  },
  {
    subject: "Digital Logic",
    unit: 6,
    unit_name: "6 Counters, registers and memory",
    topic_id: "BIT103.U6.T7",
    level: 0,
    type: "calc",
    q: "What is the minimum number of flip-flops required to construct a synchronous Mod-12 counter?",
    options: {
      A: "4 flip-flops",
      B: "12 flip-flops",
      C: "3 flip-flops",
      D: "6 flip-flops"
    },
    answer: "A",
    explanation: "A Mod-N counter requires ceil(log2 N) flip-flops. For Mod-12, ceil(log2 12) = 4 flip-flops (since 2^3 < 12 <= 2^4)."
  },
  // CG U6 - BIT304.U6.T6
  {
    subject: "Computer Graphics",
    unit: 6,
    unit_name: "6 3D object representation and curves",
    topic_id: "BIT304.U6.T6",
    level: 0,
    type: "sibling",
    q: "Which statement correctly distinguishes the RGB color model from the CMY color model?",
    options: {
      A: "RGB is an additive color model used for screen displays, whereas CMY is a subtractive color model used in printing.",
      B: "RGB is a subtractive color model used for paper printing, whereas CMY is an additive model used for monitors.",
      C: "Combining full intensities of RGB produces black, whereas combining full intensities of CMY produces white.",
      D: "RGB defines colors using Hue and Saturation, whereas CMY defines colors strictly using wavelength coordinates."
    },
    answer: "A",
    explanation: "RGB adds light wavelengths on emissive displays; CMY absorbs light wavelengths on printed reflective surfaces."
  },
  // OS U3 - BIT204.U3.T16
  {
    subject: "Operating Systems",
    unit: 3,
    unit_name: "3 Process management and synchronization",
    topic_id: "BIT204.U3.T16",
    level: 0,
    type: "sibling",
    q: "What is the core strategy of the Ostrich algorithm when dealing with operating system deadlocks?",
    options: {
      A: "Stick your head in the sand and ignore the deadlock problem because it happens rarely and recovery overhead is high.",
      B: "Periodically detect deadlocked processes and terminate the thread consuming the largest CPU quota.",
      C: "Prevent deadlock by ensuring the circular wait condition can never mathematically occur.",
      D: "Roll back all active transactions to the most recent filesystem checkpoint whenever contention is detected."
    },
    answer: "A",
    explanation: "The Ostrich algorithm ignores deadlocks under the trade-off that occurrences are rare and prevention overhead is not worth it."
  }
];

// Group gap questions by target subject
const subjectMap = new Map();
bank.subjects.forEach(sub => {
  subjectMap.set(sub.subject, sub);
});

let addedCount = 0;
GAP_QUESTIONS.forEach((gq, idx) => {
  let sub = subjectMap.get(gq.subject);
  if (!sub) {
    // Try relaxed search
    sub = bank.subjects.find(s => s.subject && s.subject.toLowerCase().includes(gq.subject.toLowerCase().slice(0, 10)));
  }
  if (!sub) {
    console.warn(`Subject not found for gap question: ${gq.subject}`);
    return;
  }
  const newQuestion = {
    id: `GAP-${Date.now()}-${idx + 1}`,
    question: gq.q,
    options: gq.options,
    answer: gq.answer,
    level: gq.level,
    type: gq.type,
    tag: `L${gq.level} - ${gq.topic_id}`,
    topic_id: gq.topic_id,
    regeneratable: false,
    shuffle_safe: true,
    giveaway_risk: false,
    unit: gq.unit,
    unit_name: gq.unit_name,
    unit_conf: "high",
    explanation: gq.explanation,
    source: "appendix_high_return_gap"
  };
  sub.questions.push(newQuestion);
  addedCount++;
});

console.log(`Successfully added ${addedCount} high-return gap questions with exact topic_id.`);

// Update meta
let total = 0;
bank.subjects.forEach(s => { total += s.questions.length; });
bank.meta.total_questions = total;
console.log(`Total questions in bank is now: ${total}`);

fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf8');
console.log(`Saved updated question_bank.json successfully.`);

