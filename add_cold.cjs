const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// ── 1. Global variable declaration ──────────────────────────────────────────
// Add COLD_QS after PB_MOCK_SCORE line
h = h.replace(
  'let PB_MOCK_SCORE = parseInt(localStorage.getItem(\'bitmcq_pb_mock\') || \'0\', 10);',
  "let PB_MOCK_SCORE = parseInt(localStorage.getItem('bitmcq_pb_mock') || '0', 10);\r\nlet COLD_QS = {}; // n -> true for questions marked as cold/useless"
);

// ── 2. save() — persist COLD_QS ─────────────────────────────────────────────
h = h.replace(
  'CARDS, RESOURCE_MARKS, FIX_DAYS, DIAGNOSTIC_DONE, QUIET_MODE, PB_MOCK_SCORE',
  'CARDS, RESOURCE_MARKS, FIX_DAYS, DIAGNOSTIC_DONE, QUIET_MODE, PB_MOCK_SCORE, COLD_QS'
);

// ── 3. load() — restore COLD_QS ─────────────────────────────────────────────
h = h.replace(
  'PB_MOCK_SCORE = typeof s.PB_MOCK_SCORE === \'number\' ? s.PB_MOCK_SCORE : parseInt(localStorage.getItem(\'bitmcq_pb_mock\') || \'0\', 10);',
  "PB_MOCK_SCORE = typeof s.PB_MOCK_SCORE === 'number' ? s.PB_MOCK_SCORE : parseInt(localStorage.getItem('bitmcq_pb_mock') || '0', 10);\r\n      COLD_QS = (s.COLD_QS && typeof s.COLD_QS === 'object') ? s.COLD_QS : {};"
);

// ── 4. toggleColdQuestion() function — after quarantineCurrentQuestion ───────
const coldFn = `
function toggleColdQuestion() {
  if (MK) return; // no cold-marking during mock exams
  const rawQ = byN(Q[P]);
  if (!rawQ) return;
  const n = rawQ.n;
  if (COLD_QS[n]) {
    delete COLD_QS[n];
    // Remove extended interval we set
    const k = qk(rawQ);
    if (V[k] && V[k]._coldSet) {
      V[k].d = today(); // make it due normally again
      delete V[k]._coldSet;
    }
    save();
    show(); // re-render to update button
  } else {
    COLD_QS[n] = true;
    // Push due date far into the future (180 days)
    const k = qk(rawQ);
    V[k] = V[k] || {};
    V[k].d = today() + 180;
    V[k].stab = V[k].stab ? Math.max(V[k].stab, 180) : 180;
    V[k]._coldSet = true;
    save();
    show();
  }
}
`;

h = h.replace(
  'function quarantineCurrentQuestion() {',
  coldFn + '\r\nfunction quarantineCurrentQuestion() {'
);

// ── 5. Button in question header (next to 🚩 Looks wrong) ────────────────────
// We inject a cold button right before the quarantine button
// and make it aware of current cold state by computing isCold in the show() template context
// Find the spot where we render the "Looks wrong" button area
// We need to add isCold variable into the show() context and then insert the button

// First find where rawQ is defined in show() to add isCold
// The quarantine button references rawQ, so just insert the button next to it
h = h.replace(
  '          <button class="sm" style="padding:2px 8px;font-size:11px;color:var(--no);border-color:var(--no-bd)" onclick="quarantineCurrentQuestion()" title="Mark question as questionable and exclude from review">\r\n            🚩 Looks wrong\r\n          </button>',
  `          \${!MK ? \`<button class="sm" style="padding:2px 8px;font-size:11px;\${COLD_QS[rawQ?.n] ? 'background:#e8f4ff;color:#1971c2;border-color:#74c0fc' : 'color:#555;border-color:#bbb'}" onclick="toggleColdQuestion()" title="Mark as too easy/irrelevant — will appear very rarely">\r\n            \${COLD_QS[rawQ?.n] ? '🧊 Cold (tap to restore)' : '🧊 Too easy'}\r\n          </button>\` : ''}\r\n          <button class="sm" style="padding:2px 8px;font-size:11px;color:var(--no);border-color:var(--no-bd)" onclick="quarantineCurrentQuestion()" title="Mark question as questionable and exclude from review">\r\n            🚩 Looks wrong\r\n          </button>`
);

// ── 6. dueKeys() — skip cold questions ──────────────────────────────────────
// After: const pool = (D || []).filter(q => !quickOnly || effQuick(q));
h = h.replace(
  'const pool = (D || []).filter(q => !quickOnly || effQuick(q));\r\n\r\n  const dueItems = [];',
  "const pool = (D || []).filter(q => (!quickOnly || effQuick(q)) && !COLD_QS[q.n]);\r\n\r\n  const dueItems = [];"
);

// ── 7. buildTodaySession() — skip cold in pool ───────────────────────────────
// After: const pool = quickOnly ? (D || []).filter(q => effQuick(q)) : (D || []);
h = h.replace(
  'const pool = quickOnly ? (D || []).filter(q => effQuick(q)) : (D || []);\r\n  if (!pool.length) return [];',
  "const pool = (quickOnly ? (D || []).filter(q => effQuick(q)) : (D || [])).filter(q => !COLD_QS[q.n]);\r\n  if (!pool.length) return [];"
);

fs.writeFileSync('index.html', h, 'utf8');
console.log('Done. Lines now:', h.split('\n').length);

