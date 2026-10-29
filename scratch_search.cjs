const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
const lines = h.split('\n');
const hits = [];
lines.forEach((l, i) => {
  const t = l.trim();
  if (
    t.includes('buildTodaySession') ||
    t.includes('dueKeys') ||
    t.includes('COLD_QS') ||
    t.includes('q.level') ||
    t.includes('Looks wrong') ||
    t.includes('quarantine') ||
    t.includes('leech') ||
    t.includes('function save') ||
    t.includes('function load')
  ) hits.push((i+1) + ': ' + t.substring(0, 110));
});
console.log(hits.join('\n'));

