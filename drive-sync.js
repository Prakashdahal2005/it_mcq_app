(function () {
  'use strict';

  var SYNC_KEY = 'bitmcq1_sync';
  var BACKUP_NAME = 'it-mcq-trainer-backup.json';
  var SNAPSHOT_PREFIX = 'it-mcq-trainer-backup-';
  var FORMAT = 'it-mcq-trainer-backup';
  var SCHEMA = 1;
  var DAILY_LIMIT = 100;
  var MAX_BYTES = 20 * 1024 * 1024;
  var PERIODIC_MS = 5 * 60 * 1000;
  var MIN_FOCUS_GAP_MS = 60 * 1000;
  var SCOPE = 'https://www.googleapis.com/auth/drive.file';
  var DRIVE = 'https://www.googleapis.com/drive/v3';
  var UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
  var FIELDS = 'id,name,modifiedTime,md5Checksum,version,size';

  function SyncError(kind, message) {
    this.name = 'SyncError';
    this.kind = kind;
    this.message = message;
    this.stack = (new Error(message)).stack;
  }
  SyncError.prototype = Object.create(Error.prototype);
  SyncError.prototype.constructor = SyncError;

  var state = {
    token: null,
    tokenExpiry: 0,
    tokenClient: null,
    resolve: null,
    reject: null,
    busy: false,
    queued: false,
    dirty: false,
    dirtyWhileBusy: false,
    lastAttempt: 0,
    suppress: false,
    pending: null,
    status: 'disconnected',
    message: '',
    lastError: ''
  };

  function rand(n) {
    var a = 'abcdefghijklmnopqrstuvwxyz0123456789', s = '';
    for (var i = 0; i < n; i++) s += a[Math.floor(Math.random() * a.length)];
    return s;
  }

  function hashStr(str) {
    str = String(str == null ? '' : str);
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h.toString(16);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function localDateStr(d) {
    var x = d ? new Date(d) : new Date();
    var p = function (n) { return String(n).length < 2 ? '0' + n : String(n); };
    return x.getFullYear() + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate());
  }

  function loadMeta() {
    try { return JSON.parse(localStorage.getItem(SYNC_KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }

  function saveMeta(meta) {
    try { localStorage.setItem(SYNC_KEY, JSON.stringify(meta)); }
    catch (e) { state.lastError = 'Could not persist sync metadata: ' + e.message; }
  }

  function getMeta() {
    var m = loadMeta();
    var dirty = false;
    if (!m.deviceId) { m.deviceId = 'dev_' + rand(16); dirty = true; }
    if (!m.backupId) { m.backupId = 'bkp_' + rand(16); dirty = true; }
    if (!m.deletionEvents) { m.deletionEvents = {}; dirty = true; }
    if (!m.journal) { m.journal = []; dirty = true; }
    if (!m.backupCreatedAt) { m.backupCreatedAt = Date.now(); dirty = true; }
    if (dirty) saveMeta(m);
    return m;
  }

  function sanitizeClientId(v) {
    return String(v || '').trim()
      .replace(/^https?:\/\//i, '')
      .replace(/^https?:/i, '')
      .replace(/[^\w.-]/g, '')
      .trim();
  }

  var dbPromise = null;
  function idb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
      var req = indexedDB.open('bitmcq1_drive', 1);
      req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('tokens')) db.createObjectStore('tokens');
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbPromise;
  }
  function idbPut(value) {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('tokens', 'readwrite');
        tx.objectStore('tokens').put(value, 'auth');
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }
  function idbGet() {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('tokens', 'readonly');
        var req = tx.objectStore('tokens').get('auth');
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }
  function idbDel() {
    return idb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('tokens', 'readwrite');
        tx.objectStore('tokens').delete('auth');
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { resolve(); };
      });
    }).catch(function () {});
  }

  function sidOf(q) {
    if (q && q.id != null && String(q.id).trim() !== '') {
      return 'id:' + String(q.u || q.s || '').trim().toLowerCase() + ':' + String(q.id).trim();
    }
    return 'h:' + contentHash(q);
  }
  function contentHash(q) {
    if (!q || typeof q !== 'object') return hashStr('null');
    return hashStr(JSON.stringify([q.u || q.s || '', q.q || '', q.code || [], q.o || [], q.a, q.e || '', q.quick, q.regeneratable, q.level]));
  }
  function questionIdentity(q) {
    if (q && q.id != null && String(q.id).trim() !== '') {
      return 'id:' + String(q.u || q.s || '').trim().toLowerCase() + ':' + String(q.id).trim();
    }
    return q && q._sid ? q._sid : sidOf(q);
  }

  function appGet() {
    return (window.AppState && AppState.get) ? AppState.get() : null;
  }
  function appApply(app) {
    if (window.AppState && AppState.apply) {
      state.suppress = true;
      try { AppState.apply(app); }
      finally { state.suppress = false; }
    }
  }
  function appSave() {
    if (window.AppState && AppState.save) AppState.save();
  }

  function ensureStableIds() {
    var s = appGet();
    if (!s) return;
    var changed = false;
    function fix(q) {
      if (q && typeof q === 'object' && !q._sid) { q._sid = sidOf(q); changed = true; }
    }
    (s.BANKS || []).forEach(function (b) { (b && b.q || []).forEach(fix); });
    (s.D || []).forEach(fix);
    if (changed) appSave();
  }

  function buildInventory(s) {
    var manifest = {};
    var total = 0;
    function add(q, bankId) {
      if (!q || typeof q !== 'object') return;
      if (!q._sid) q._sid = sidOf(q);
      manifest[q._sid] = { bankId: bankId == null ? null : bankId, contentHash: contentHash(q) };
      total++;
    }
    (s.BANKS || []).forEach(function (b) { (b && b.q || []).forEach(function (q) { add(q, b.id); }); });
    if (s.SETBANK == null && Array.isArray(s.D)) {
      s.D.forEach(function (q) { if (q && !manifest[q._sid]) add(q, null); });
    }
    return { manifest: manifest, total: total };
  }

  function pickAppState(s) {
    return {
      D: s.D == null ? null : s.D,
      R: s.R || {}, W: s.W || {}, Q: s.Q || [],
      QRESULTS: s.QRESULTS || [], P: s.P || 0,
      S: s.S || 1, A: s.A || [], L: s.L || [], V: s.V || {},
      BANKS: s.BANKS || [], SETBANK: s.SETBANK == null ? null : s.SETBANK,
      SETI: s.SETI == null ? -1 : s.SETI, EXAM_DATE: s.EXAM_DATE || '',
      lastBackup: s.lastBackup || 0, gemVars: s.gemVars || [],
      todayMins: s.todayMins || 15, lastFreshSetDay: s.lastFreshSetDay,
      QOV: s.QOV || {}, recallFirst: s.recallFirst !== false
    };
  }

  function buildEnvelope(appState, inventory, revision) {
    var meta = getMeta();
    var now = new Date().toISOString();
    return {
      format: FORMAT,
      schemaVersion: SCHEMA,
      backupId: meta.backupId,
      revision: revision,
      createdAt: meta.backupCreatedAt ? new Date(meta.backupCreatedAt).toISOString() : now,
      updatedAt: now,
      deviceId: meta.deviceId,
      questionManifest: inventory.manifest,
      appState: pickAppState(appState)
    };
  }

  function normalizeAppState(s) {
    s = s || {};
    var n = {
      D: Array.isArray(s.D) ? s.D : null,
      R: (s.R && typeof s.R === 'object') ? s.R : {},
      W: (s.W && typeof s.W === 'object') ? s.W : {},
      Q: Array.isArray(s.Q) ? s.Q : [],
      P: typeof s.P === 'number' ? s.P : 0,
      S: typeof s.S === 'number' ? s.S : 1,
      A: Array.isArray(s.A) ? s.A : [],
      L: Array.isArray(s.L) ? s.L : [],
      V: (s.V && typeof s.V === 'object') ? s.V : {},
      BANKS: Array.isArray(s.BANKS) ? s.BANKS : [],
      SETBANK: typeof s.SETBANK === 'number' ? s.SETBANK : null,
      SETI: typeof s.SETI === 'number' ? s.SETI : -1,
      EXAM_DATE: s.EXAM_DATE || '',
      lastBackup: s.lastBackup || 0,
      gemVars: Array.isArray(s.gemVars) ? s.gemVars : [],
      todayMins: typeof s.todayMins === 'number' ? s.todayMins : 15,
      QRESULTS: Array.isArray(s.QRESULTS) ? s.QRESULTS : [],
      lastFreshSetDay: Number.isInteger(s.lastFreshSetDay) ? s.lastFreshSetDay : null,
      QOV: (s.QOV && typeof s.QOV === 'object' && !Array.isArray(s.QOV)) ? s.QOV : {},
      recallFirst: s.recallFirst !== false
    };
    n.BANKS = n.BANKS.filter(function (b) { return b && typeof b === 'object'; }).map(function (b) {
      return { id: b.id, name: b.name || ('Bank ' + b.id), q: Array.isArray(b.q) ? b.q : [], sets: Array.isArray(b.sets) ? b.sets : [] };
    });
    n.BANKS.forEach(function (b) { b.q.forEach(function (q) { if (q && typeof q === 'object' && !q._sid) q._sid = sidOf(q); }); });
    if (n.D) n.D = n.D.filter(function (q) { return q && typeof q === 'object'; });
    if (n.D) n.D.forEach(function (q) { if (!q._sid) q._sid = sidOf(q); });
    return n;
  }

  function hasLocalData(s) {
    if (!s) return false;
    if (s.D && s.D.length) return true;
    if (s.BANKS && s.BANKS.some(function (b) { return b && b.q && b.q.length; })) return true;
    if (s.R && Object.keys(s.R).length) return true;
    return false;
  }

  function validateBackup(raw) {
    var text = JSON.stringify(raw);
    if (text && text.length > MAX_BYTES) throw new SyncError('invalid', 'Backup is too large to be trusted.');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new SyncError('invalid', 'Backup is not a JSON object.');
    if (raw.format === FORMAT) {
      if (typeof raw.schemaVersion !== 'number' || raw.schemaVersion < 1) throw new SyncError('invalid', 'Backup schema version is missing.');
      if (raw.schemaVersion > SCHEMA) throw new SyncError('invalid', 'This backup was written by a newer app version (schema ' + raw.schemaVersion + ') and was left untouched.');
      if (!raw.appState || typeof raw.appState !== 'object') throw new SyncError('invalid', 'Backup is missing its app state.');
      validateShape(raw.appState);
      return { envelope: raw, appState: normalizeAppState(raw.appState) };
    }
    if ('D' in raw || 'BANKS' in raw || 'A' in raw || 'R' in raw) {
      validateShape(raw);
      return { envelope: buildEnvelope(normalizeAppState(raw), { manifest: {} }, 0), appState: normalizeAppState(raw) };
    }
    throw new SyncError('invalid', 'Unrecognized backup format; nothing was changed.');
  }

  function validateShape(s) {
    if (s.D != null && !Array.isArray(s.D)) throw new SyncError('invalid', 'Backup "D" must be an array.');
    if (s.BANKS != null && !Array.isArray(s.BANKS)) throw new SyncError('invalid', 'Backup "BANKS" must be an array.');
    if (s.A != null && !Array.isArray(s.A)) throw new SyncError('invalid', 'Backup "A" must be an array.');
    if (s.L != null && !Array.isArray(s.L)) throw new SyncError('invalid', 'Backup "L" must be an array.');
    if (s.R != null && (typeof s.R !== 'object' || Array.isArray(s.R))) throw new SyncError('invalid', 'Backup "R" must be an object.');
    if (s.BANKS) {
      for (var i = 0; i < s.BANKS.length; i++) {
        var b = s.BANKS[i];
        if (!b || typeof b !== 'object' || !Array.isArray(b.q)) throw new SyncError('invalid', 'A question bank in the backup is malformed.');
        for (var j = 0; j < b.q.length; j++) {
          var q = b.q[j];
          if (!q || typeof q.q !== 'string' || !Array.isArray(q.o)) throw new SyncError('invalid', 'A question in the backup is missing its stem or options.');
        }
      }
    }
  }

  function mergeV(a, b) {
    var out = {}, k;
    var keys = {};
    Object.keys(a || {}).forEach(function (k) { keys[k] = 1; });
    Object.keys(b || {}).forEach(function (k) { keys[k] = 1; });
    Object.keys(keys).forEach(function (k) {
      var x = (a || {})[k], y = (b || {})[k];
      if (!x) { out[k] = y; return; }
      if (!y) { out[k] = x; return; }
      var base = (x.b || 0) >= (y.b || 0) ? Object.assign({}, x) : Object.assign({}, y);
      base.d = Math.max(x.d || 0, y.d || 0);
      base.missCount = Math.max(x.missCount || 0, y.missCount || 0);
      if (x.confWrongRetest || y.confWrongRetest) base.confWrongRetest = Math.max(x.confWrongRetest || 0, y.confWrongRetest || 0);

      // FSRS fields: stab, diff, lapses
      if (x.stab != null || y.stab != null) {
        var xLatest = (x.history && x.history.length) ? x.history[x.history.length - 1].t : 0;
        var yLatest = (y.history && y.history.length) ? y.history[y.history.length - 1].t : 0;
        var useX = xLatest >= yLatest;
        base.stab = (useX ? (x.stab != null ? x.stab : y.stab) : (y.stab != null ? y.stab : x.stab));
        base.diff = (useX ? (x.diff != null ? x.diff : y.diff) : (y.diff != null ? y.diff : x.diff));
        base.lapses = Math.max(x.lapses || 0, y.lapses || 0);
      }

      // Memory anchors and variants
      base.mnemonic = x.mnemonic || y.mnemonic || '';
      if (x._variant || y._variant) {
        var xDate = (x._variant && x._variant.date) || 0;
        var yDate = (y._variant && y._variant.date) || 0;
        base._variant = xDate >= yDate ? (x._variant || y._variant) : (y._variant || x._variant);
        base._useOriginal = (xDate >= yDate ? x._useOriginal : y._useOriginal);
      }
      if (x._pastValues || y._pastValues) {
        var pvCombined = (x._pastValues || []).concat(y._pastValues || []);
        var pvSeen = {}, pvList = [];
        pvCombined.forEach(function (v) {
          var sk = typeof v === 'object' ? JSON.stringify(v) : String(v);
          if (!pvSeen[sk]) { pvSeen[sk] = 1; pvList.push(v); }
        });
        base._pastValues = pvList.slice(-5);
      }

      var seen = {}, hist = [];
      (x.history || []).concat(y.history || []).forEach(function (h) {
        var key = h && (h.t + '|' + (h.ok ? 1 : 0) + '|' + (h.cf == null ? '' : h.cf));
        if (seen[key]) return;
        seen[key] = 1; hist.push(h);
      });
      base.history = hist.sort(function (p, q) { return (p && p.t || 0) - (q && q.t || 0); });
      out[k] = base;
    });
    return out;
  }

  function mergeL(a, b) {
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function (e) {
      var key = e && ((e.k || '') + '|' + (e.t || 0) + '|' + (e.ch == null ? '' : e.ch));
      if (seen[key]) return;
      seen[key] = 1; out.push(e);
    });
    return out.sort(function (p, q) { return (p && p.t || 0) - (q && q.t || 0); });
  }

  function mergeJsonList(a, b) {
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function (e) {
      var key;
      try { key = JSON.stringify(e); } catch (err) { key = String(e); }
      if (seen[key]) return;
      seen[key] = 1; out.push(e);
    });
    return out;
  }

  function mergeAppStates(local, remote, genSets, options) {
    options = options || {};
    var conflicts = [];
    var byName = {};
    var remoteBankIds = {};
    var banks = [];

    function keyName(b) { return String(b.name || ('Bank ' + b.id)).trim().toLowerCase(); }

    (local.BANKS || []).forEach(function (b) {
      var k = keyName(b);
      if (byName[k]) return;
      byName[k] = { id: b.id, name: b.name || ('Bank ' + b.id), q: [], sets: [] };
      (b.q || []).forEach(function (q) {
        if (!q) return;
        if (!q._sid) q._sid = sidOf(q);
        byName[k].q.push(q);
      });
      banks.push(byName[k]);
    });

    var maxId = 0;
    (local.BANKS || []).forEach(function (b) { maxId = Math.max(maxId, b.id || 0); });

    (remote.BANKS || []).forEach(function (b) {
      var k = keyName(b);
      var target = byName[k];
      if (!target) {
        var remoteQuestions = b.q || [];
        var remoteIdentities = {};
        remoteQuestions.forEach(function (q) { if (q) remoteIdentities[questionIdentity(q)] = 1; });
        var minimumOverlap = Math.max(1, Math.min(5, Math.ceil(remoteQuestions.length * 0.1)));
        target = banks.find(function (candidate) {
          var overlap = 0;
          candidate.q.forEach(function (q) { if (remoteIdentities[questionIdentity(q)]) overlap++; });
          return overlap >= minimumOverlap;
        }) || null;
      }
      if (!target) {
        target = { id: ++maxId, name: b.name || ('Bank ' + maxId), q: [], sets: [] };
        byName[k] = target;
        banks.push(target);
      } else if (options.preferRemoteQuestions && b.name) {
        target.name = b.name;
      }
      byName[k] = target;
      remoteBankIds[b.id] = target.id;
      var index = {};
      target.q.forEach(function (q) { index[questionIdentity(q)] = q; });
      (b.q || []).forEach(function (q) {
        if (!q) return;
        if (!q._sid) q._sid = sidOf(q);
        var identity = questionIdentity(q);
        var ex = index[identity];
        if (!ex) { target.q.push(q); index[identity] = q; return; }
        if (contentHash(ex) !== contentHash(q)) {
          if (options.preferRemoteQuestions) {
            var stableId = ex._sid || q._sid;
            Object.keys(ex).forEach(function (key) { delete ex[key]; });
            Object.assign(ex, q);
            ex._sid = stableId;
          } else {
            conflicts.push({ sid: q._sid, bank: target.name, localQuestion: ex.q, remoteQuestion: q.q });
          }
        }
      });
    });

    if (typeof genSets === 'function') {
      banks.forEach(function (b) {
        try { b.sets = genSets(b.q); } catch (err) { b.sets = b.sets || []; }
      });
    }

    var localHas = hasLocalData(local);
    var localHasProgress = !!((local.R && Object.keys(local.R).length) ||
      (local.A && local.A.length) || (local.L && local.L.length) ||
      (local.V && Object.keys(local.V).length));
    var remoteHasProgress = !!((remote.R && Object.keys(remote.R).length) ||
      (remote.A && remote.A.length) || (remote.L && remote.L.length) ||
      (remote.V && Object.keys(remote.V).length));
    var active = options.preferRemoteActive ? remote :
      (remoteHasProgress && !localHasProgress ? remote : (localHas ? local : remote));
    var activeBankId = active.SETBANK;
    if (options.preferRemoteActive && activeBankId != null && remoteBankIds[activeBankId] != null) {
      activeBankId = remoteBankIds[activeBankId];
    }

    var merged = {
      D: active.D,
      R: active.R || {},
      W: active.W || {},
      Q: active.Q || [],
      QRESULTS: active.QRESULTS || [],
      P: active.P || 0,
      S: options.preferRemoteActive
        ? Math.max(active.S || 1, banks.length ? mergeJsonList(local.A, remote.A).length + 1 : 1)
        : (active.S || 1),
      A: mergeJsonList(local.A, remote.A),
      L: mergeL(local.L, remote.L),
      V: mergeV(local.V, remote.V),
      BANKS: banks,
      SETBANK: activeBankId == null ? null : activeBankId,
      SETI: active.SETI == null ? -1 : active.SETI,
      EXAM_DATE: options.preferRemoteActive
        ? (remote.EXAM_DATE || local.EXAM_DATE || '')
        : (local.EXAM_DATE || remote.EXAM_DATE || ''),
      lastBackup: Math.max(local.lastBackup || 0, remote.lastBackup || 0),
      gemVars: mergeJsonList(local.gemVars, remote.gemVars),
      todayMins: options.preferRemoteActive
        ? (remote.todayMins || local.todayMins || 15)
        : (local.todayMins || remote.todayMins || 15),
      lastFreshSetDay: active.lastFreshSetDay == null ? null : active.lastFreshSetDay,
      QOV: Object.assign({}, local.QOV || {}, remote.QOV || {}),
      recallFirst: active.recallFirst !== false,
      CARDS: mergeJsonList(local.CARDS, remote.CARDS),
      RESOURCE_MARKS: Object.assign({}, local.RESOURCE_MARKS || {}, remote.RESOURCE_MARKS || {}),
      FIX_DAYS: Object.assign({}, local.FIX_DAYS || {}, remote.FIX_DAYS || {}),
      DIAGNOSTIC_DONE: !!(local.DIAGNOSTIC_DONE || remote.DIAGNOSTIC_DONE),
      QUIET_MODE: local.QUIET_MODE !== undefined ? !!local.QUIET_MODE : !!remote.QUIET_MODE,
      PB_MOCK_SCORE: Math.max(local.PB_MOCK_SCORE || 0, remote.PB_MOCK_SCORE || 0),
      schemaVer: Math.max(local.schemaVer || 1, remote.schemaVer || 1)
    };
    return { appState: merged, conflicts: conflicts };
  }

  function analyzeDeletions(meta, localInv, remoteInv) {
    var trusted = (meta.remoteManifest && Object.keys(meta.remoteManifest).length) ? meta.remoteManifest : (remoteInv.manifest || {});
    var trustedSids = Object.keys(trusted);
    var localSids = {};
    Object.keys(localInv.manifest).forEach(function (s) { localSids[s] = 1; });
    var removed = trustedSids.filter(function (s) { return !localSids[s]; });
    var anomalies = [];
    var block = false;

    if (meta.remoteManifest && Object.keys(meta.remoteManifest).length && localInv.total === 0 && trustedSids.length > 0) {
      block = true;
      anomalies.push('Local data looks empty or reset while Drive holds ' + trustedSids.length + ' questions. Restoring instead of deleting.');
    } else if (trustedSids.length > 20 && removed.length / trustedSids.length > 0.9) {
      block = true;
      anomalies.push('Nearly every question (' + removed.length + ' of ' + trustedSids.length + ') would be removed. This looks like data loss, not a deliberate deletion.');
    }

    var today = localDateStr();
    var prior = (meta.deletionEvents && meta.deletionEvents[today]) || 0;
    var total = prior + removed.length;
    if (removed.length > 0 && total > DAILY_LIMIT) {
      block = true;
      anomalies.push(total + ' questions would be deleted on ' + today + ', above the ' + DAILY_LIMIT + '/day safety limit.');
    }
    return { removed: removed, removedCount: removed.length, anomalies: anomalies, block: block, today: today, dayTotal: total };
  }

  function initTokenClient() {
    var meta = getMeta();
    if (!meta.clientId) { state.tokenClient = null; return; }
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) { state.tokenClient = null; return; }
    try {
      state.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: meta.clientId,
        scope: SCOPE,
        callback: function (resp) {
          var resolve = state.resolve, reject = state.reject;
          state.resolve = null; state.reject = null;
          if (resp.error) {
            var hint = resp.error === 'popup_blocked_by_browser' ? 'Allow popups for this site and try again.'
              : resp.error === 'access_denied' ? 'Access was denied. If the app is in Testing mode, add this Google account as a test user.'
              : resp.error === 'invalid_client' ? 'The Client ID is wrong or ' + window.location.origin + ' is not an Authorized JavaScript Origin.'
              : (resp.error_description || resp.error);
            reject && reject(new SyncError('auth', hint));
            return;
          }
          state.token = resp.access_token;
          state.tokenExpiry = Date.now() + (resp.expires_in || 3600) * 1000;
          idbPut({ token: state.token, expiry: state.tokenExpiry }).catch(function () {});
          resolve && resolve();
        }
      });
    } catch (err) {
      state.tokenClient = null;
    }
  }

  function requestToken(prompt) {
    if (!state.tokenClient) initTokenClient();
    if (!state.tokenClient) {
      return Promise.reject(new SyncError('auth', 'Google sign-in is not ready yet. Check your connection or ad-blocker, then try again.'));
    }
    return new Promise(function (resolve, reject) {
      state.resolve = resolve;
      state.reject = reject;
      try {
        state.tokenClient.requestAccessToken(prompt ? { prompt: prompt } : {});
      } catch (err) {
        state.resolve = null; state.reject = null;
        reject(new SyncError('auth', err.message));
      }
    });
  }

  function ensureToken() {
    var meta = getMeta();
    if (!meta.clientId) return Promise.reject(new SyncError('auth', 'Google Drive is not connected.'));
    if (state.token && Date.now() < state.tokenExpiry - 120000) return Promise.resolve();
    var attempt = idbGet().then(function (stored) {
      if (stored && stored.token && stored.expiry && Date.now() < stored.expiry - 120000) {
        state.token = stored.token;
        state.tokenExpiry = stored.expiry;
        return null;
      }
      return requestToken('');
    }).catch(function () {
      return requestToken('');
    });
    return attempt.catch(function () {
      throw new SyncError('auth', 'Google session expired. Click Connect / Reconnect to sign in again.');
    });
  }

  function httpError(res) {
    if (res.status === 401) return new SyncError('auth', 'Google Drive rejected the sign-in token.');
    if (res.status === 403) return new SyncError('permission', 'Google Drive denied access (permission or quota). Nothing was changed.');
    if (res.status === 429) return new SyncError('api', 'Google Drive is rate limiting requests. Will retry.');
    if (res.status >= 500) return new SyncError('api', 'Google Drive had a server error. Will retry.');
    return new SyncError('api', 'Google Drive request failed with status ' + res.status + '.');
  }

  function driveFetch(url, opts) {
    opts = opts || {};
    return ensureToken().then(function () {
      var headers = Object.assign({}, opts.headers || {});
      headers.Authorization = 'Bearer ' + state.token;
      return fetch(url, Object.assign({}, opts, { headers: headers }));
    }).then(function (res) {
      if (res.status !== 401) return res;
      state.token = null;
      state.tokenExpiry = 0;
      return idbDel().then(function () { return ensureToken(); }).then(function () {
        var headers = Object.assign({}, opts.headers || {});
        headers.Authorization = 'Bearer ' + state.token;
        return fetch(url, Object.assign({}, opts, { headers: headers }));
      });
    });
  }

  function getFileMeta(id) {
    return driveFetch(DRIVE + '/files/' + encodeURIComponent(id) + '?fields=' + FIELDS).then(function (res) {
      if (res.status === 404) return null;
      if (!res.ok) throw httpError(res);
      return res.json();
    });
  }

  function searchByName(name) {
    var q = "name='" + String(name).replace(/'/g, "\\'") + "' and trashed=false";
    var url = DRIVE + '/files?q=' + encodeURIComponent(q) + '&orderBy=modifiedTime desc&fields=files(' + FIELDS + ')';
    return driveFetch(url).then(function (res) {
      if (!res.ok) throw httpError(res);
      return res.json();
    }).then(function (data) {
      return (data.files && data.files.length) ? data.files[0] : null;
    });
  }

  function locateCanonical() {
    var meta = getMeta();
    var chain = Promise.resolve(null);
    if (meta.fileId) {
      chain = getFileMeta(meta.fileId).then(function (f) {
        if (f) return f;
        meta.fileId = null;
        saveMeta(meta);
        return null;
      });
    }
    return chain.then(function (f) {
      if (f) return f;
      return searchByName(BACKUP_NAME).then(function (found) {
        if (found) { meta.fileId = found.id; saveMeta(meta); }
        return found;
      });
    });
  }

  function downloadContent(id) {
    return driveFetch(DRIVE + '/files/' + encodeURIComponent(id) + '?alt=media').then(function (res) {
      if (res.status === 404) return null;
      if (!res.ok) throw httpError(res);
      return res.text();
    }).then(function (text) {
      if (text == null) return null;
      try { return JSON.parse(text); }
      catch (err) { throw new SyncError('invalid', 'The Drive backup is not valid JSON; nothing was changed.'); }
    });
  }

  function downloadText(id) {
    return driveFetch(DRIVE + '/files/' + encodeURIComponent(id) + '?alt=media').then(function (res) {
      if (!res.ok) throw httpError(res);
      return res.text();
    });
  }

  function multipartBody(boundary, metaObj, content) {
    return '--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'
      + JSON.stringify(metaObj) + '\r\n--' + boundary
      + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'
      + content + '\r\n--' + boundary + '--';
  }

  function uploadEnvelope(envelope, fileId) {
    var content = JSON.stringify(envelope);
    if (fileId) {
      return driveFetch(UPLOAD + '/' + encodeURIComponent(fileId) + '?uploadType=media&fields=' + FIELDS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: content
      }).then(function (res) {
        if (!res.ok) throw httpError(res);
        return res.json();
      });
    }
    var boundary = 'bcq' + rand(20);
    var body = multipartBody(boundary, { name: BACKUP_NAME, mimeType: 'application/json' }, content);
    return driveFetch(UPLOAD + '?uploadType=multipart&fields=' + FIELDS, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/related; boundary=' + boundary },
      body: body
    }).then(function (res) {
      if (!res.ok) throw httpError(res);
      return res.json();
    });
  }

  function setStatus(status, message) {
    state.status = status;
    state.message = message || '';
    refreshStatus();
  }

  function handleError(err, explicit) {
    var kind = (err && err.kind) ? err.kind : 'error';
    var msg = (err && err.message) ? err.message : 'Sync failed.';
    if (kind === 'blocked') state.status = 'blocked';
    else if (kind === 'auth') state.status = 'reconnect';
    else if (kind === 'offline') state.status = 'offline';
    else state.status = 'error';
    state.lastError = msg;
    state.message = msg;
    var meta = getMeta();
    meta.lastError = msg;
    meta.pendingState = (kind === 'auth') ? 'reconnect' : (kind === 'blocked' ? 'review' : 'error');
    saveMeta(meta);
    if (explicit || document.getElementById('drive-status')) refreshStatus();
  }

  function recordSync(meta, inv, uploaded) {
    meta.fileId = uploaded.id;
    meta.revision = (meta.revision || 0) + 1;
    meta.revisionAt = uploaded.modifiedTime || '';
    meta.lastSyncedAt = Date.now();
    meta.remoteManifest = inv.manifest;
    meta.pendingState = null;
    meta.lastError = '';
    saveMeta(meta);
  }

  function recordSyncMeta(meta, inv, fileMeta) {
    if (fileMeta && fileMeta.id) meta.fileId = fileMeta.id;
    if (fileMeta && fileMeta.modifiedTime) meta.revisionAt = fileMeta.modifiedTime;
    meta.lastSyncedAt = Date.now();
    meta.remoteManifest = inv.manifest;
    meta.pendingState = null;
    meta.lastError = '';
    saveMeta(meta);
  }

  function performSync(opts) {
    opts = opts || {};
    var meta = getMeta();
    if (!meta.clientId || !meta.enabled) { setStatus('disconnected', 'Google Drive is not connected.'); return Promise.resolve(); }
    if (!navigator.onLine) { setStatus('offline', 'Offline. Changes will sync when you reconnect.'); return Promise.resolve(); }
    if (state.busy) { state.queued = true; return Promise.resolve(); }
    state.busy = true;
    state.dirtyWhileBusy = false;
    state.lastAttempt = Date.now();
    setStatus('syncing', 'Checking Google Drive…');
    var remoteMeta = null;
    var failed = false;

    return locateCanonical().then(function (file) {
      remoteMeta = file;
      if (!file) return null;
      return downloadContent(file.id);
    }).then(function (raw) {
      var remote = raw ? validateBackup(raw) : null;
      var remoteApp = remote ? remote.appState : null;
      var remoteInv = remoteApp ? buildInventory(remoteApp) : { manifest: {}, total: 0 };
      var remoteEnvelope = remoteApp ? buildEnvelope(remoteApp, remoteInv, (remote.envelope && remote.envelope.revision) || meta.revision || 0) : null;
      var local = normalizeAppState(appGet());

      if (!remoteApp) {
        if (!hasLocalData(local)) { setStatus('ok', 'Nothing to back up yet.'); return null; }
        var inv0 = buildInventory(local);
        var env0 = buildEnvelope(local, inv0, (meta.revision || 0) + 1);
        return uploadEnvelope(env0, null).then(function (up) {
          recordSync(meta, inv0, up);
          setStatus('ok', 'Backed up to Google Drive.');
        });
      }

      if (!hasLocalData(local) && remoteInv.total > 0) {
        appApply(remoteApp);
        recordSyncMeta(meta, remoteInv, remoteMeta);
        setStatus('ok', 'Restored your progress from Google Drive.');
        return null;
      }

      if (JSON.stringify(local) === JSON.stringify(remoteApp)) {
        recordSyncMeta(meta, remoteInv, remoteMeta);
        setStatus('ok', 'Up to date with Google Drive.');
        return null;
      }

      var localInv = buildInventory(local);
      var analysis = analyzeDeletions(meta, localInv, remoteInv);

      if (analysis.block) {
        state.pending = {
          analysis: analysis,
          remoteModified: remoteMeta && remoteMeta.modifiedTime,
          remoteEnvelope: remoteEnvelope,
          remoteApp: remoteApp,
          remoteInv: remoteInv,
          createdAt: Date.now()
        };
        meta.pendingState = 'review';
        meta.lastError = analysis.anomalies.join(' ');
        saveMeta(meta);
        setStatus('blocked', 'Sync paused for your review. Nothing on Drive was changed.');
        return null;
      }

      var merged = mergeAppStates(local, remoteApp, window.genSets);
      var mergedInv = buildInventory(merged.appState);
      var conflicts = merged.conflicts;

      return getFileMeta(meta.fileId).then(function (cur) {
        if (!cur) throw new SyncError('revision', 'The Drive backup disappeared during sync.');
        if (remoteMeta && cur.modifiedTime !== remoteMeta.modifiedTime) {
          state.queued = true;
          setStatus('pending', 'Drive changed on another device; re-checking…');
          return null;
        }
        var env = buildEnvelope(merged.appState, mergedInv, (meta.revision || 0) + 1);
        return uploadEnvelope(env, meta.fileId).then(function (up) {
          appApply(merged.appState);
          recordSync(meta, mergedInv, up);
          var note = 'Synced with Google Drive.';
          if (conflicts.length) note += ' ' + conflicts.length + ' conflicting question(s) were kept as separate copies.';
          setStatus('ok', note);
        });
      });
    }).catch(function (err) {
      if (err && err.name === 'TypeError') err = new SyncError('network', 'Network error reaching Google Drive. Will retry.');
      state.dirtyWhileBusy = true;
      handleError(err, !!opts.explicit);
    }).then(function () {
      state.busy = false;
      if (!state.dirtyWhileBusy) state.dirty = false;
      if (state.queued) {
        state.queued = false;
        setTimeout(function () { performSync({ mode: 'auto' }); }, 1500);
      }
    });
  }

  function createVerifiedSnapshotFor(envelope, label) {
    var content = JSON.stringify(envelope);
    var name = SNAPSHOT_PREFIX + label + '.json';
    var boundary = 'snap_' + rand(20);
    var body = multipartBody(boundary, { name: name, mimeType: 'application/json' }, content);
    return driveFetch(UPLOAD + '?uploadType=multipart&fields=' + FIELDS, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/related; boundary=' + boundary },
      body: body
    }).then(function (res) {
      if (!res.ok) throw new SyncError('snapshot', 'Could not create a recovery snapshot; the Drive backup was left unchanged.');
      return res.json();
    }).then(function (created) {
      return downloadText(created.id).then(function (back) {
        if (hashStr(back) !== hashStr(content)) throw new SyncError('snapshot', 'Recovery snapshot verification failed; the Drive backup was left unchanged.');
        return created;
      });
    });
  }

  function restoreNow() {
    var meta = getMeta();
    if (!meta.clientId) { state.status = 'error'; state.message = 'Connect Google Drive first.'; refreshStatus(); return Promise.resolve(); }
    if (!state.pending && hasLocalData(normalizeAppState(appGet()))) {
      if (!window.confirm('Replace this device\'s data with the Google Drive backup?')) return Promise.resolve();
    }
    setStatus('syncing', 'Reading Google Drive…');
    return locateCanonical().then(function (file) {
      if (!file) throw new SyncError('notfound', 'No Drive backup was found for this account.');
      return downloadContent(file.id).then(function (raw) {
        if (!raw) throw new SyncError('notfound', 'No Drive backup was found for this account.');
        var v = validateBackup(raw);
        var app = normalizeAppState(v.appState);
        var inv = buildInventory(app);
        appApply(app);
        meta.fileId = file.id;
        meta.revision = (raw && raw.revision) || meta.revision || 0;
        meta.remoteManifest = inv.manifest;
        meta.lastSyncedAt = Date.now();
        meta.pendingState = null;
        saveMeta(meta);
        state.pending = null;
        state.dirty = false;
        state.dirtyWhileBusy = false;
        setStatus('ok', 'Restored from Google Drive.');
      });
    }).catch(function (err) {
      if (err && err.name === 'TypeError') err = new SyncError('network', 'Network error reaching Google Drive.');
      handleError(err, true);
    });
  }

  function approvePending() {
    var p = state.pending;
    var meta = getMeta();
    if (!p) { state.message = 'There is nothing waiting for review.'; refreshStatus(); return Promise.resolve(); }
    setStatus('syncing', 'Saving a recovery snapshot before overwriting…');
    return ensureToken().then(function () {
      return getFileMeta(meta.fileId);
    }).then(function (cur) {
      if (!cur) throw new SyncError('revision', 'The Drive backup no longer exists.');
      if (p.remoteModified && cur.modifiedTime !== p.remoteModified) {
        state.pending = null;
        state.message = 'Drive changed since you reviewed it. Re-checking…';
        refreshStatus();
        return performSync({ mode: 'auto' });
      }
      return createVerifiedSnapshotFor(p.remoteEnvelope, localDateStr() + '-r' + (meta.revision || 0)).then(function (snap) {
        var local = normalizeAppState(appGet());
        var inv = buildInventory(local);
        var env = buildEnvelope(local, inv, (meta.revision || 0) + 1);
        return uploadEnvelope(env, meta.fileId).then(function (up) {
          meta.deletionEvents[p.analysis.today] = (meta.deletionEvents[p.analysis.today] || 0) + (p.analysis.removedCount || 0);
          meta.journal.push({ at: Date.now(), revision: meta.revision || 0, snapshot: snap.name, snapshotId: snap.id });
          recordSync(meta, inv, up);
          state.pending = null;
          state.dirty = false;
          state.dirtyWhileBusy = false;
          setStatus('ok', 'Approved change saved. A recovery snapshot (' + snap.name + ') was kept on Drive.');
        });
      });
    }).catch(function (err) {
      if (err && err.name === 'TypeError') err = new SyncError('network', 'Network error reaching Google Drive.');
      handleError(err, true);
    });
  }

  function cancelPending() {
    state.pending = null;
    var meta = getMeta();
    meta.pendingState = null;
    saveMeta(meta);
    setStatus('ok', 'Kept the Google Drive backup unchanged.');
  }

  function connect() {
    var input = document.getElementById('drive-cid');
    var meta = getMeta();
    if (input) {
      meta.clientId = sanitizeClientId(input.value);
      saveMeta(meta);
    }
    if (!meta.clientId) { state.status = 'error'; state.message = 'Enter your Google OAuth Client ID first.'; refreshStatus(); return; }
    meta.enabled = true;
    saveMeta(meta);
    initTokenClient();
    requestToken('').then(function () {
      setStatus('ok', 'Connected. Syncing…');
      return performSync({ mode: 'manual', explicit: true });
    }).catch(function (err) {
      handleError(err, true);
    });
  }

  function saveClientIdOnly() {
    var inp = document.getElementById('drive-cid');
    var meta = getMeta();
    meta.clientId = sanitizeClientId(inp ? inp.value : '');
    saveMeta(meta);
    initTokenClient();
    if (meta.clientId) { state.message = 'Client ID saved. Click Connect to authorize.'; state.status = meta.enabled ? state.status : 'disconnected'; }
    else { state.message = 'Client ID cleared.'; state.status = 'disconnected'; }
    refreshStatus();
  }

  function disconnect() {
    state.token = null;
    state.tokenExpiry = 0;
    state.pending = null;
    idbDel();
    var meta = getMeta();
    meta.enabled = false;
    meta.pendingState = null;
    saveMeta(meta);
    setStatus('disconnected', 'Disconnected. Your Drive backups and recovery snapshots were left untouched.');
  }

  function statusHTML() {
    var meta = getMeta();
    var s = statusLine();
    var lines = [];
    lines.push('<div class="row" style="gap:10px;flex-wrap:wrap">'
      + '<span class="chip ' + s.cls + '">' + esc(s.text) + '</span>'
      + '<span class="mu sm">Last sync: ' + (meta.lastSyncedAt ? esc(new Date(meta.lastSyncedAt).toLocaleString()) : 'never') + '</span>'
      + (meta.clientId ? '<span class="mu sm">' + (meta.enabled ? 'Enabled' : 'Disabled') + '</span>' : '') + '</div>');
    if (state.message) lines.push('<div class="mu sm" style="margin-top:6px">' + esc(state.message) + '</div>');
    if (meta.remoteManifest) lines.push('<div class="mu sm">Drive inventory: ' + Object.keys(meta.remoteManifest).length + ' questions</div>');
    lines.push(reviewHTML());
    return lines.join('');
  }

  function statusLine() {
    if (state.busy) return { cls: 'c-sk', text: 'Syncing…' };
    return { 'ok': { cls: 'c-ok', text: '✓ Synced' }, 'syncing': { cls: 'c-sk', text: 'Syncing…' },
      'blocked': { cls: 'c-no', text: '⚠ Review required' }, 'reconnect': { cls: 'c-sk', text: 'Reconnect required' },
      'offline': { cls: 'c-sk', text: 'Offline' }, 'pending': { cls: 'c-sk', text: 'Pending' },
      'error': { cls: 'c-no', text: 'Sync error' }, 'disconnected': { cls: '', text: 'Not connected' } }[state.status]
      || { cls: '', text: 'Not connected' };
  }

  function reviewHTML() {
    var p = state.pending;
    if (!p) return '';
    var rows = p.analysis.anomalies.map(function (a) { return esc(a); }).join('<br>');
    var removed = p.analysis.removedCount ? '<div class="mu sm" style="margin-top:6px">Questions that would be removed from Drive: <b>' + p.analysis.removedCount + '</b> (today: ' + p.analysis.dayTotal + ')</div>' : '';
    return '<div style="border:1px solid var(--no);background:var(--nob);border-radius:10px;padding:12px;margin-top:12px">'
      + '<b class="c-no">Review required before syncing</b>'
      + '<div class="mu sm" style="margin-top:6px">' + rows + '</div>' + removed
      + '<div class="row" style="margin-top:10px">'
      + '<button class="p" onclick="DriveSync.restoreNow()">Restore from Drive</button>'
      + '<button onclick="DriveSync.cancelPending()">Keep Drive backup</button>'
      + '<button onclick="DriveSync.approvePending()">Approve & overwrite</button>'
      + '</div></div>';
  }

  function settingsHTML() {
    var meta = getMeta();
    return '<div class="card">'
      + '<h2 style="margin-top:0">☁ Google Drive Sync</h2>'
      + '<div id="drive-status">' + statusHTML() + '</div>'
      + '<label class="mu" style="margin-top:14px;display:block">Google OAuth Client ID</label>'
      + '<input type="text" id="drive-cid" placeholder="xxxxxxxx.apps.googleusercontent.com" value="' + esc(meta.clientId || '') + '" style="margin-top:6px;width:100%">'
      + '<div class="row" style="margin-top:12px">'
      + '<button class="p" onclick="DriveSync.connect()">' + (meta.clientId ? 'Reconnect' : 'Connect') + '</button>'
      + '<button onclick="DriveSync.saveClientIdOnly()">Save Client ID</button>'
      + '<button onclick="DriveSync.syncNow()">Sync now</button>'
      + '<button onclick="DriveSync.restoreNow()">Restore from Drive</button>'
      + '<button onclick="DriveSync.disconnect()">Disconnect</button>'
      + '</div>'
      + '<p class="mu sm" style="margin-top:12px">Sync keeps a versioned JSON backup (<b>' + BACKUP_NAME + '</b>) of your question banks and progress in your own Google Drive. Before any approved change that would delete questions, a dated recovery snapshot is written and verified first. Your Gemini API key is never uploaded. Changes upload automatically every few minutes while the app is open (and when you leave it); your downloadable JSON backup keeps working either way.</p>'
      + '</div>';
  }

  function refreshStatus() {
    var el = document.getElementById('drive-status');
    if (el) el.innerHTML = statusHTML();
  }

  function refreshUI() { refreshStatus(); }

  function init() {
    ensureStableIds();
    var meta = getMeta();
    if (meta.clientId && meta.enabled && (typeof google !== 'undefined' && google.accounts)) initTokenClient();
    window.addEventListener('online', function () {
      var m = getMeta();
      if (m.clientId && m.enabled && state.dirty) performSync({ mode: 'auto' });
    });
    window.addEventListener('offline', function () { var m = getMeta(); if (m.clientId && m.enabled) setStatus('offline', 'Offline. Changes will sync when you reconnect.'); });
    document.addEventListener('visibilitychange', function () {
      var m = getMeta();
      if (!m.clientId || !m.enabled) return;
      if (document.visibilityState === 'hidden') {
        if (state.dirty && !state.busy) performSync({ mode: 'auto' });
      } else {
        if (state.dirty && !state.busy && (Date.now() - state.lastAttempt) > MIN_FOCUS_GAP_MS) performSync({ mode: 'auto' });
      }
    });
    window.addEventListener('pagehide', function () {
      var m = getMeta();
      if (m.clientId && m.enabled && state.dirty && !state.busy) performSync({ mode: 'auto' });
    });
    setInterval(function () { var m = getMeta(); if (m.clientId && m.enabled && navigator.onLine && state.dirty) performSync({ mode: 'auto' }); }, PERIODIC_MS);
    if (meta.pendingState === 'review') { state.status = 'blocked'; state.message = 'A previous change needs your review before syncing.'; }
    else if (meta.pendingState === 'reconnect') { state.status = 'reconnect'; state.message = 'Reconnect to resume syncing.'; }
    refreshStatus();
    if (meta.clientId && meta.enabled && navigator.onLine) setTimeout(function () { performSync({ mode: 'auto' }); }, 1500);
  }

  function onLocalSave() {
    if (state.suppress) return;
    var meta = getMeta();
    if (!meta.clientId || !meta.enabled) return;
    if (state.pending) return;
    state.dirty = true;
    if (state.busy) state.dirtyWhileBusy = true;
  }

  window.DriveSync = {
    init: init,
    onLocalSave: onLocalSave,
    settingsHTML: settingsHTML,
    refreshUI: refreshUI,
    connect: connect,
    saveClientIdOnly: saveClientIdOnly,
    disconnect: disconnect,
    syncNow: function () { performSync({ mode: 'manual', explicit: true }); },
    restoreNow: restoreNow,
    approvePending: approvePending,
    cancelPending: cancelPending,
    getMeta: getMeta,
    _state: state,
    _performSync: performSync,
    _validateBackup: validateBackup,
    _buildInventory: buildInventory,
    _mergeAppStates: mergeAppStates,
    _analyzeDeletions: analyzeDeletions
  };
})();
