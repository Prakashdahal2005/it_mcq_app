(function () {
  'use strict';

  var SYNC_SECRET_KEY = 'bitmcq_sync_secret';
  var SYNC_META_KEY = 'bitmcq_cloud_sync_meta';
  var FORMAT = 'it-mcq-trainer-backup';
  var SCHEMA = 1;
  var MAX_BYTES = 20 * 1024 * 1024;
  var PERIODIC_MS = 5 * 60 * 1000;
  var DEBOUNCE_SAVE_MS = 2500;

  function SyncError(kind, message) {
    this.name = 'SyncError';
    this.kind = kind;
    this.message = message;
    this.stack = (new Error(message)).stack;
  }
  SyncError.prototype = Object.create(Error.prototype);
  SyncError.prototype.constructor = SyncError;

  var state = {
    status: 'disconnected', // 'disconnected', 'synced', 'syncing', 'offline', 'error', 'unauthorized'
    message: '',
    lastSync: 0,
    dirty: false,
    busy: false,
    suppress: false,
    timer: null
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
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

  function getSecret() {
    try {
      return (localStorage.getItem(SYNC_SECRET_KEY) || '').trim();
    } catch (e) {
      return '';
    }
  }

  function setSecret(sec) {
    try {
      if (sec) {
        localStorage.setItem(SYNC_SECRET_KEY, String(sec).trim());
      } else {
        localStorage.removeItem(SYNC_SECRET_KEY);
      }
    } catch (e) {}
  }

  function loadMeta() {
    try {
      return JSON.parse(localStorage.getItem(SYNC_META_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function saveMeta(m) {
    try {
      localStorage.setItem(SYNC_META_KEY, JSON.stringify(m));
    } catch (e) {}
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
      try {
        AppState.apply(app);
      } finally {
        state.suppress = false;
      }
    }
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
      recallFirst: s.recallFirst !== false,
      CARDS: Array.isArray(s.CARDS) ? s.CARDS : [],
      RESOURCE_MARKS: (s.RESOURCE_MARKS && typeof s.RESOURCE_MARKS === 'object') ? s.RESOURCE_MARKS : {},
      FIX_DAYS: (s.FIX_DAYS && typeof s.FIX_DAYS === 'object') ? s.FIX_DAYS : {},
      DIAGNOSTIC_DONE: !!s.DIAGNOSTIC_DONE,
      QUIET_MODE: !!s.QUIET_MODE,
      PB_MOCK_SCORE: typeof s.PB_MOCK_SCORE === 'number' ? s.PB_MOCK_SCORE : 0,
      schemaVer: typeof s.schemaVer === 'number' ? s.schemaVer : 1
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
      if (raw.schemaVersion > SCHEMA) throw new SyncError('invalid', 'This backup was written by a newer app version (schema ' + raw.schemaVersion + ').');
      if (!raw.appState || typeof raw.appState !== 'object') throw new SyncError('invalid', 'Backup is missing its app state.');
      validateShape(raw.appState);
      return { envelope: raw, appState: normalizeAppState(raw.appState) };
    }
    if ('D' in raw || 'BANKS' in raw || 'A' in raw || 'R' in raw) {
      validateShape(raw);
      return { appState: normalizeAppState(raw) };
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
    var out = {};
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

      if (x.stab != null || y.stab != null) {
        var xLatest = (x.history && x.history.length) ? x.history[x.history.length - 1].t : 0;
        var yLatest = (y.history && y.history.length) ? y.history[y.history.length - 1].t : 0;
        var useX = xLatest >= yLatest;
        base.stab = (useX ? (x.stab != null ? x.stab : y.stab) : (y.stab != null ? y.stab : x.stab));
        base.diff = (useX ? (x.diff != null ? x.diff : y.diff) : (y.diff != null ? y.diff : x.diff));
        base.lapses = Math.max(x.lapses || 0, y.lapses || 0);
      }

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

  function getApiHeaders() {
    var h = {
      'Content-Type': 'application/json'
    };
    var secret = getSecret();
    if (secret) {
      h['x-secret'] = secret;
    }
    return h;
  }

  function setStatus(status, message) {
    state.status = status;
    state.message = message || '';
    refreshUI();
  }

  // Network API Operations
  async function fetchRemoteState() {
    var res = await fetch('/api/state', {
      method: 'GET',
      headers: getApiHeaders()
    });

    if (res.status === 401) {
      throw new SyncError('unauthorized', 'Passcode required or incorrect. Please enter your Sync Secret.');
    }
    if (!res.ok) {
      var errText = '';
      try {
        var errJson = await res.json();
        errText = errJson.error || errJson.details || res.statusText;
      } catch (e) {
        errText = res.statusText;
      }
      throw new SyncError('http', 'Server error (' + res.status + '): ' + errText);
    }
    return await res.json();
  }

  async function postRemoteState(stateObj) {
    var res = await fetch('/api/state', {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(stateObj)
    });

    if (res.status === 401) {
      throw new SyncError('unauthorized', 'Passcode required or incorrect. Please enter your Sync Secret.');
    }
    if (!res.ok) {
      var errText = '';
      try {
        var errJson = await res.json();
        errText = errJson.error || errJson.details || res.statusText;
      } catch (e) {
        errText = res.statusText;
      }
      throw new SyncError('http', 'Save failed (' + res.status + '): ' + errText);
    }
    return await res.json();
  }

  async function performSync(opts) {
    opts = opts || {};
    if (!navigator.onLine) {
      setStatus('offline', 'Offline. Changes will sync when connection returns.');
      return;
    }
    if (state.busy) return;
    state.busy = true;
    setStatus('syncing', 'Syncing with cloud...');

    try {
      var remote = await fetchRemoteState();
      var local = appGet();
      var meta = loadMeta();

      var remoteEmpty = !remote || (typeof remote === 'object' && Object.keys(remote).length === 0);
      var localEmpty = !hasLocalData(local);

      if (remoteEmpty && !localEmpty) {
        // First-time sync: push local state to cloud
        await postRemoteState(local);
        state.lastSync = Date.now();
        meta.lastSync = state.lastSync;
        saveMeta(meta);
        state.dirty = false;
        setStatus('synced', 'Synced to Upstash Redis (' + new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')');
        return;
      }

      if (!remoteEmpty && localEmpty) {
        // New device: restore from cloud directly
        var normalized = normalizeAppState(remote);
        appApply(normalized);
        state.lastSync = Date.now();
        meta.lastSync = state.lastSync;
        saveMeta(meta);
        state.dirty = false;
        setStatus('synced', 'Restored from cloud (' + new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')');
        return;
      }

      if (!remoteEmpty && !localEmpty) {
        // Both exist: smart merge
        var genSets = (window.AppState && window.AppState.genSets) ? window.AppState.genSets : null;
        var merged = mergeAppStates(local, normalizeAppState(remote), genSets, {
          preferRemoteActive: !!opts.preferRemote
        });

        appApply(merged.appState);
        // Push merged state back to Redis
        await postRemoteState(merged.appState);
        state.lastSync = Date.now();
        meta.lastSync = state.lastSync;
        saveMeta(meta);
        state.dirty = false;
        setStatus('synced', 'Synced & merged with cloud (' + new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')');
        return;
      }

      // Both empty
      state.lastSync = Date.now();
      meta.lastSync = state.lastSync;
      saveMeta(meta);
      state.dirty = false;
      setStatus('synced', 'Connected (cloud is ready)');
    } catch (err) {
      console.warn('Cloud sync error:', err);
      if (err.kind === 'unauthorized') {
        setStatus('unauthorized', err.message);
      } else {
        setStatus('error', err.message || 'Sync failed');
      }
    } finally {
      state.busy = false;
      refreshUI();
    }
  }

  async function pushToCloud() {
    if (!navigator.onLine) {
      alert('You are offline. Cannot push to cloud right now.');
      return;
    }
    var local = appGet();
    if (!hasLocalData(local)) {
      if (!confirm('Local study data appears empty. Do you really want to push empty data to cloud?')) return;
    }
    state.busy = true;
    setStatus('syncing', 'Pushing to cloud...');
    try {
      await postRemoteState(local);
      state.lastSync = Date.now();
      var meta = loadMeta();
      meta.lastSync = state.lastSync;
      saveMeta(meta);
      state.dirty = false;
      setStatus('synced', 'Pushed to Upstash Redis at ' + new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      alert('Successfully uploaded local progress to cloud!');
    } catch (err) {
      alert('Push failed: ' + err.message);
      setStatus(err.kind === 'unauthorized' ? 'unauthorized' : 'error', err.message);
    } finally {
      state.busy = false;
      refreshUI();
    }
  }

  async function pullFromCloud() {
    if (!navigator.onLine) {
      alert('You are offline. Cannot pull from cloud right now.');
      return;
    }
    if (!confirm('This will replace or merge your local progress with the latest version from Upstash Redis. Continue?')) return;
    state.busy = true;
    setStatus('syncing', 'Pulling from cloud...');
    try {
      var remote = await fetchRemoteState();
      if (!remote || Object.keys(remote).length === 0) {
        alert('Cloud storage is currently empty. Nothing to restore.');
        setStatus('synced', 'Cloud is empty');
        return;
      }
      var normalized = normalizeAppState(remote);
      appApply(normalized);
      state.lastSync = Date.now();
      var meta = loadMeta();
      meta.lastSync = state.lastSync;
      saveMeta(meta);
      state.dirty = false;
      setStatus('synced', 'Restored from cloud at ' + new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      alert('Successfully loaded progress from cloud!');
    } catch (err) {
      alert('Pull failed: ' + err.message);
      setStatus(err.kind === 'unauthorized' ? 'unauthorized' : 'error', err.message);
    } finally {
      state.busy = false;
      refreshUI();
    }
  }

  function onLocalSave() {
    if (state.suppress) return;
    state.dirty = true;
    if (state.timer) clearTimeout(state.timer);
    state.timer = setTimeout(function () {
      if (state.dirty && !state.busy && navigator.onLine) {
        performSync({ mode: 'auto' });
      }
    }, DEBOUNCE_SAVE_MS);
  }

  function init() {
    var meta = loadMeta();
    if (meta.lastSync) state.lastSync = meta.lastSync;

    window.addEventListener('online', function () {
      setStatus('syncing', 'Online. Resuming sync...');
      performSync({ mode: 'auto' });
    });

    window.addEventListener('offline', function () {
      setStatus('offline', 'Offline. Changes saved locally and will sync when reconnected.');
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        if (state.dirty && !state.busy) performSync({ mode: 'auto' });
      }
    });

    window.addEventListener('pagehide', function () {
      if (state.dirty && !state.busy && navigator.onLine) {
        var local = appGet();
        if (local && window.fetch) {
          fetch('/api/state', {
            method: 'POST',
            headers: getApiHeaders(),
            body: JSON.stringify(local),
            keepalive: true
          }).catch(function () {});
        }
      }
    });

    setInterval(function () {
      if (navigator.onLine && (state.dirty || (Date.now() - state.lastSync > PERIODIC_MS))) {
        performSync({ mode: 'auto' });
      }
    }, PERIODIC_MS);

    // Initial check after page loads
    if (navigator.onLine) {
      setTimeout(function () {
        performSync({ mode: 'auto' });
      }, 1200);
    } else {
      setStatus('offline', 'Offline mode');
    }
  }

  function saveSecretFromUI() {
    var el = document.getElementById('cloud-sync-secret');
    if (!el) return;
    var val = el.value.trim();
    setSecret(val);
    var statusEl = document.getElementById('cloud-secret-saved-msg');
    if (statusEl) {
      statusEl.textContent = val ? '✓ Secret saved locally' : '✓ Secret cleared (open mode)';
      statusEl.style.display = 'inline';
      setTimeout(function () { if (statusEl) statusEl.style.display = 'none'; }, 2500);
    }
    // Test sync immediately with new secret
    performSync({ mode: 'manual' });
  }

  function toggleSecretVisibility() {
    var el = document.getElementById('cloud-sync-secret');
    var btn = document.getElementById('cloud-toggle-secret-btn');
    if (!el || !btn) return;
    if (el.type === 'password') {
      el.type = 'text';
      btn.textContent = 'Hide';
    } else {
      el.type = 'password';
      btn.textContent = 'Show';
    }
  }

  function settingsHTML() {
    var currentSecret = getSecret();
    var statusBadgeColor = '#16a34a'; // green
    var statusBadgeBg = '#f0fdf4';
    var statusText = 'Ready';

    if (state.status === 'syncing') {
      statusBadgeColor = '#2563eb';
      statusBadgeBg = '#eff6ff';
      statusText = 'Syncing...';
    } else if (state.status === 'offline') {
      statusBadgeColor = '#d97706';
      statusBadgeBg = '#fffbeb';
      statusText = 'Offline';
    } else if (state.status === 'unauthorized') {
      statusBadgeColor = '#dc2626';
      statusBadgeBg = '#fef2f2';
      statusText = 'Passcode Required (401)';
    } else if (state.status === 'error') {
      statusBadgeColor = '#dc2626';
      statusBadgeBg = '#fef2f2';
      statusText = 'Error';
    } else if (state.status === 'synced') {
      statusBadgeColor = '#16a34a';
      statusBadgeBg = '#f0fdf4';
      statusText = 'Connected & Synced';
    }

    var lastSyncText = state.lastSync
      ? new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : 'Not yet synced';

    return `
      <div class="card" id="cloud-sync-container" style="margin-top:20px;border:1px solid var(--bd);padding:18px;border-radius:12px;background:var(--card)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:1.2rem">☁️</span>
            <strong style="font-size:1.05rem">Cloud Sync (Upstash Redis & Vercel)</strong>
          </div>
          <div id="cloud-status-badge" style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:600;padding:3px 10px;border-radius:999px;background:${statusBadgeBg};color:${statusBadgeColor};border:1px solid ${statusBadgeColor}40">
            <span style="width:8px;height:8px;border-radius:50%;background:${statusBadgeColor}"></span>
            <span id="cloud-status-text">${esc(statusText)}</span>
          </div>
        </div>

        <p class="mu" style="font-size:0.88rem;margin:0 0 14px 0;line-height:1.4">
          Syncs all study progress, questions, bookmarks, and Leitner/FSRS intervals across your phone, tablet, and computer seamlessly via your Vercel serverless function and Upstash Redis.
        </p>

        <div style="background:var(--code);padding:12px;border-radius:8px;margin-bottom:14px;border:1px solid var(--bd)">
          <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">
            Sync Passcode (Optional APP_SECRET)
          </label>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <input type="password" id="cloud-sync-secret" value="${esc(currentSecret)}" placeholder="Enter secret from Vercel env (if set)" style="flex:1;min-width:200px;font-family:monospace;padding:6px 10px;border-radius:6px;border:1px solid var(--bd)">
            <button type="button" class="sm" id="cloud-toggle-secret-btn" onclick="CloudSync.toggleSecret()">Show</button>
            <button type="button" class="sm p" onclick="CloudSync.saveSecret()">Save & Connect</button>
          </div>
          <div style="font-size:0.78rem;color:var(--mu);margin-top:6px;line-height:1.35">
            If you set <code>APP_SECRET</code> in Vercel environment variables, type it here to unlock access. If no password is set on Vercel, leave this empty.
            <span id="cloud-secret-saved-msg" style="color:var(--ok);font-weight:bold;margin-left:6px;display:none"></span>
          </div>
        </div>

        <div id="cloud-sync-msg-box" style="font-size:0.85rem;margin-bottom:12px;color:var(--mu)">
          ${state.message ? `Status: <span>${esc(state.message)}</span>` : `Last cloud sync: <span>${lastSyncText}</span>`}
        </div>

        <div class="row" style="gap:8px;flex-wrap:wrap">
          <button type="button" class="p sm" onclick="CloudSync.syncNow()">🔄 Sync Now</button>
          <button type="button" class="sm" onclick="CloudSync.pullFromCloud()">⬇️ Pull from Cloud</button>
          <button type="button" class="sm" onclick="CloudSync.pushToCloud()">⬆️ Push to Cloud</button>
        </div>
      </div>
    `;
  }

  function refreshUI() {
    var badgeText = document.getElementById('cloud-status-text');
    var badge = document.getElementById('cloud-status-badge');
    var msgBox = document.getElementById('cloud-sync-msg-box');
    if (!badge || !badgeText) return;

    var color = '#16a34a';
    var bg = '#f0fdf4';
    var text = 'Connected & Synced';

    if (state.status === 'syncing') {
      color = '#2563eb';
      bg = '#eff6ff';
      text = 'Syncing...';
    } else if (state.status === 'offline') {
      color = '#d97706';
      bg = '#fffbeb';
      text = 'Offline';
    } else if (state.status === 'unauthorized') {
      color = '#dc2626';
      bg = '#fef2f2';
      text = 'Passcode Required (401)';
    } else if (state.status === 'error') {
      color = '#dc2626';
      bg = '#fef2f2';
      text = 'Error';
    }

    badgeText.textContent = text;
    badge.style.color = color;
    badge.style.background = bg;
    badge.style.borderColor = color + '40';
    var dot = badge.querySelector('span');
    if (dot) dot.style.background = color;

    if (msgBox) {
      var lastSyncText = state.lastSync
        ? new Date(state.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : 'Not yet synced';
      msgBox.innerHTML = state.message
        ? `Status: <span>${esc(state.message)}</span>`
        : `Last cloud sync: <span>${lastSyncText}</span>`;
    }
  }

  // Public Interface
  window.CloudSync = {
    init: init,
    onLocalSave: onLocalSave,
    settingsHTML: settingsHTML,
    refreshUI: refreshUI,
    syncNow: function () { performSync({ mode: 'manual', preferRemote: false }); },
    pushToCloud: pushToCloud,
    pullFromCloud: pullFromCloud,
    saveSecret: saveSecretFromUI,
    toggleSecret: toggleSecretVisibility,
    getSecret: getSecret,
    setSecret: setSecret,
    _state: state,
    _validateBackup: validateBackup,
    _mergeAppStates: mergeAppStates
  };

  // Backward compatibility alias for any existing references
  window.DriveSync = window.CloudSync;
})();
