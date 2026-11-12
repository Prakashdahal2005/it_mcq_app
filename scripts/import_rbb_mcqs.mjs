import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const bankPath = path.join(rootDir, 'question_bank.json');
const syllabusPath = path.join(rootDir, 'mit_entrance_syllabus.json');
const mdPath = path.join(rootDir, 'MIT_Entrance_from_RBB_papers.md');
const dryRun = process.argv.includes('--dry-run');
const verbose = process.argv.includes('--verbose');

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
const syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf8'));
const md = fs.readFileSync(mdPath, 'utf8');

const bankSubjectByCode = new Map(bank.subjects.map(s => [s.subject_code, s]));
const topicById = new Map();
const unitById = new Map();
for (const subject of syllabus.subjects) {
  for (const unit of subject.units) {
    unitById.set(unit.id, { subject, unit });
    for (const topic of unit.topics) {
      topicById.set(topic.id, { subject, unit, topic });
    }
  }
}

const ALLOWED_TYPES = new Set(['recall', 'sibling', 'calc', 'trace', 'pair']);

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/\\[a-z]+/gi, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function tokenSet(value) {
  return new Set(normalizeText(value).split(' ').filter(word => word.length > 1));
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const value of a) {
    if (b.has(value)) intersection++;
  }
  return intersection / (a.size + b.size - intersection);
}

function optionOverlap(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const value of a) {
    if (b.has(value)) intersection++;
  }
  return intersection / Math.min(a.size, b.size);
}

function topicIdFromSyllabusLine(raw) {
  return String(raw || '').trim().split(/\s+/)[0];
}

function sectionCode(value) {
  return String(value || '').split('/')[0].trim();
}

function parseBlocks() {
  const lines = md.split(/\r?\n/);
  const blocks = [];
  let currentSection = '';
  let currentBlock = null;

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+([A-Z0-9/]+)\s*·/);
    if (sectionMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      currentSection = sectionCode(sectionMatch[1]);
      continue;
    }

    const blockMatch = line.match(/^###\s+P1-Q(\d+)\.\s*(.*)$/);
    if (blockMatch) {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        number: Number(blockMatch[1]),
        title: blockMatch[2].trim(),
        section: currentSection,
        lines: []
      };
      continue;
    }

    if (currentBlock) {
      if (/^#{1,3}\s/.test(line)) {
        blocks.push(currentBlock);
        currentBlock = null;
        continue;
      }
      currentBlock.lines.push(line);
    }
  }

  if (currentBlock) blocks.push(currentBlock);
  return blocks;
}

function parseOptions(lines) {
  const line = lines.find(value => /^\*\*A\*\*\)/.test(value));
  if (!line) return {};
  const parts = line.split(/\*\*([A-D])\*\*\)/);
  const options = {};
  for (let i = 1; i < parts.length; i += 2) {
    const letter = parts[i];
    const text = parts[i + 1] == null ? '' : parts[i + 1].trim();
    if (letter && text) options[letter] = text;
  }
  return options;
}

function parseExplanation(lines) {
  const start = lines.findIndex(value => /^\*\*Concept:\*\*/.test(value));
  if (start < 0) return null;
  const parts = [lines[start].replace(/^\*\*Concept:\*\*\s*/, '').trim()];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) break;
    if (/^\*\*/.test(line)) break;
    parts.push(line.trim());
  }
  return parts.join(' ').replace(/\*\*/g, '').replace(/`/g, '').trim() || null;
}

function buildExistingIndex() {
  const bySubject = new Map();
  const all = [];
  for (const subject of bank.subjects) {
    const records = [];
    for (const question of subject.questions) {
      const record = {
        subject: subject.subject_code,
        id: question.id,
        question: question.question,
        norm: normalizeText(question.question),
        tokens: tokenSet(question.question),
        options: new Set(Object.values(question.options || {}).map(normalizeText))
      };
      records.push(record);
      all.push(record);
    }
    bySubject.set(subject.subject_code, records);
  }
  return { bySubject, all };
}

const MANUAL_SKIPS = new Map([
  [4, 'existing BIT251 hyperlink-tag question'],
  [7, 'existing BIT252 reinforcement-learning question'],
  [18, 'existing BIT254 switch-forwarding question'],
  [21, 'existing BIT101 DNS-resolution question'],
  [22, 'existing BIT254 ARP-maps question'],
  [25, 'existing BIT101 firewall question']
]);

const { bySubject: existingBySubject, all: allExisting } = buildExistingIndex();
const additionsBySubject = new Map();
const skipped = [];
const review = [];
const added = [];
const addedIds = new Set(allExisting.map(record => String(record.id)));

function findDuplicate(record) {
  const sameSubject = existingBySubject.get(record.subject) || [];
  for (const existing of sameSubject) {
    if (record.norm === existing.norm) {
      return { reason: 'exact normalized text', existing };
    }
  }
  for (const existing of allExisting) {
    const textScore = jaccard(record.tokens, existing.tokens);
    const optionsScore = optionOverlap(record.optionSet, existing.options);
    if (textScore >= 0.8) {
      return { reason: `text similarity ${textScore.toFixed(2)}`, existing };
    }
    if (textScore >= 0.55 && optionsScore >= 0.9) {
      return { reason: `text ${textScore.toFixed(2)} + options ${optionsScore.toFixed(2)}`, existing };
    }
    if (textScore >= 0.6 || optionsScore >= 0.8) {
      review.push({ number: record.number, subject: record.subject, textScore, optionsScore, existing });
    }
  }
  return null;
}

const blocks = parseBlocks();
for (const block of blocks) {
  const text = block.lines.join('\n');
  const subject = block.section;
  const subjectRecord = bankSubjectByCode.get(subject);
  if (!subjectRecord) {
    skipped.push({ number: block.number, reason: `unknown subject section ${subject || '(none)'}` });
    continue;
  }

  const options = parseOptions(block.lines);
  const answerMatch = text.match(/\*\*Answer:\s*([A-D])\)/);
  const answer = answerMatch ? answerMatch[1] : '';
  const syllabusMatch = text.match(/\*\*Syllabus\s*\(([^)]*)\):\*\*\s*`([^`]+)`/);
  const syllabusLabel = syllabusMatch ? syllabusMatch[1] : '';
  const rawTopicId = syllabusMatch ? syllabusMatch[2] : '';
  const topicId = topicIdFromSyllabusLine(rawTopicId);
  const topicInfo = topicId ? topicById.get(topicId) : null;

  let unitConf = 'low';
  if (/exact/i.test(syllabusLabel)) unitConf = 'high';
  else if (/near/i.test(syllabusLabel)) unitConf = 'medium';

  const unitMatch = topicId.match(/\.U(\d+)\./);
  const unitNumber = unitMatch ? Number(unitMatch[1]) : null;
  const unitId = topicId.replace(/\.T\d+$/, '');
  const unitInfo = unitById.get(unitId) || (unitNumber != null ? unitById.get(`${subject}.U${unitNumber}`) : null);

  let level = topicInfo && Number.isInteger(topicInfo.topic.level) ? topicInfo.topic.level : null;
  if (!Number.isInteger(level)) {
    const levelMatch = text.match(/\(L(\d+),/);
    level = levelMatch ? Number(levelMatch[1]) : 1;
  }

  let type = topicInfo && ALLOWED_TYPES.has(topicInfo.topic.type) ? topicInfo.topic.type : 'recall';
  if (type === 'calc' || type === 'trace') type = 'recall';

  const questionText = block.title.replace(/…/g, '______').trim();
  const record = {
    id: `RBB-${subject}-P1-Q${block.number}`,
    number: block.number,
    subject,
    question: questionText,
    options,
    answer,
    level,
    type,
    tag: `L${level} - ${subject}`,
    topic_id: unitConf === 'high' && topicInfo ? topicId : '',
    unit: unitNumber,
    unit_name: unitInfo ? `${unitNumber} ${unitInfo.unit.name}` : '',
    unit_conf: unitConf,
    explanation: parseExplanation(block.lines),
    source: 'rbb-loksewa',
    norm: normalizeText(questionText),
    tokens: tokenSet(questionText),
    optionSet: new Set(Object.values(options).map(normalizeText))
  };

  if (MANUAL_SKIPS.has(block.number)) {
    skipped.push({ number: block.number, reason: MANUAL_SKIPS.get(block.number) });
    continue;
  }

  if (['A', 'B', 'C', 'D'].some(letter => !options[letter]) || !['A', 'B', 'C', 'D'].includes(answer)) {
    skipped.push({ number: block.number, reason: 'incomplete options or answer' });
    continue;
  }

  if (addedIds.has(String(record.id))) {
    skipped.push({ number: block.number, reason: `duplicate id ${record.id}` });
    continue;
  }

  const duplicate = findDuplicate(record);
  if (duplicate) {
    skipped.push({ number: block.number, reason: `${duplicate.reason} (${duplicate.existing.subject} id ${duplicate.existing.id})` });
    continue;
  }

  const alreadyAdded = (additionsBySubject.get(subject) || []).find(item => {
    if (item.norm === record.norm) return true;
    return jaccard(item.tokens, record.tokens) >= 0.8;
  });
  if (alreadyAdded) {
    skipped.push({ number: block.number, reason: `duplicate of imported RBB P1-Q${alreadyAdded.number}` });
    continue;
  }

  if (!additionsBySubject.has(subject)) additionsBySubject.set(subject, []);
  additionsBySubject.get(subject).push(record);
  added.push(record);
  addedIds.add(String(record.id));
}

for (const [subject, records] of additionsBySubject) {
  const subjectRecord = bankSubjectByCode.get(subject);
  for (const record of records) {
    subjectRecord.questions.push({
      id: record.id,
      question: record.question,
      options: record.options,
      answer: record.answer,
      level: record.level,
      type: record.type,
      tag: record.tag,
      ...(record.topic_id ? { topic_id: record.topic_id } : {}),
      regeneratable: false,
      shuffle_safe: true,
      giveaway_risk: false,
      unit: record.unit,
      unit_name: record.unit_name,
      unit_conf: record.unit_conf,
      explanation: record.explanation,
      source: record.source
    });
  }
}

let totalQuestions = 0;
for (const subject of bank.subjects) {
  subject.question_count = subject.questions.length;
  totalQuestions += subject.questions.length;
}
bank.meta.total_questions = totalQuestions;

const addedBySubject = {};
for (const record of added) addedBySubject[record.subject] = (addedBySubject[record.subject] || 0) + 1;

console.log(`Parsed ${blocks.length} Paper I MCQ blocks.`);
console.log(`Added: ${added.length}`);
if (verbose) {
  for (const record of added) {
    console.log(`  + ${record.id} [${record.subject}] unit=${record.unit} "${record.unit_name}" level=${record.level} type=${record.type} topic=${record.topic_id || '(none)'} conf=${record.unit_conf}`);
    console.log(`    Q: ${record.question}`);
    console.log(`    options: ${JSON.stringify(record.options)} answer=${record.answer}`);
  }
}
console.log('Added by subject:', addedBySubject);
console.log(`Skipped: ${skipped.length}`);
for (const item of skipped) console.log(`  P1-Q${item.number}: ${item.reason}`);

const uniqueReview = [];
const seenReview = new Set();
for (const item of review) {
  const key = `${item.number}:${item.existing.subject}:${item.existing.id}`;
  if (seenReview.has(key)) continue;
  seenReview.add(key);
  uniqueReview.push(item);
}
if (uniqueReview.length) {
  console.log(`Near-match review (${uniqueReview.length}):`);
  for (const item of uniqueReview.slice(0, 40)) {
    console.log(`  P1-Q${item.number} [${item.subject}] text=${item.textScore.toFixed(2)} options=${item.optionsScore.toFixed(2)} vs ${item.existing.subject} id ${item.existing.id}: ${String(item.existing.question).slice(0, 90)}`);
  }
}

if (dryRun) {
  console.log('Dry run: question_bank.json was not modified.');
} else {
  fs.writeFileSync(bankPath, `${JSON.stringify(bank, null, 2)}\n`, 'utf8');
  console.log(`Saved question_bank.json with ${totalQuestions} total questions.`);
}
