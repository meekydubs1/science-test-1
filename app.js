(() => {
  'use strict';
  const KEY = 'sci-test1-v1';
  const app = document.getElementById('app');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------------------------------------------------------------- dates
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate() + n); return dayKey(d); };
  const daysBetween = (a, b) => Math.round((parseKey(b) - parseKey(a)) / 864e5);
  const today = () => dayKey();
  const EXAM_DAY = EXAM.date;
  const EXAM_EVE = addDays(EXAM_DAY, -1);

  // ---------------------------------------------------------------- content index
  const CARDS = [];
  const LESSON = {};
  LESSONS.forEach((l) => {
    LESSON[l.id] = l;
    l.cards.forEach((c, i) => { c.id = `${l.id}-${i}`; c.lesson = l.id; c.unit = l.unit; CARDS.push(c); });
  });
  const CARD = Object.fromEntries(CARDS.map((c) => [c.id, c]));
  const UNIT = Object.fromEntries(UNITS.map((u) => [u.id, u]));

  // ---------------------------------------------------------------- saved progress
  const fresh = () => ({ v: 1, cards: {}, lessons: {}, tests: [], blurts: {} });
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return Object.assign(fresh(), s); } catch (e) { /* private mode */ }
    return fresh();
  }
  let S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  // ---------------------------------------------------------------- scheduling
  // Successive relearning squeezed into the days before the test:
  // every card is answered correctly once per session, then comes back on the following days.
  // Whatever happens, everything not yet solid is due again on the day before the test.
  const GAP = [1, 1, 1, 2, 3, 6];
  function nextDue(t, box, correct) {
    if (t > EXAM_DAY) return addDays(t, correct ? GAP[box] : 1);
    if (t >= EXAM_EVE) return correct ? addDays(EXAM_DAY, 1) : (t < EXAM_DAY ? EXAM_DAY : addDays(t, 1));
    const due = addDays(t, correct ? GAP[box] : 1);
    return due > EXAM_EVE ? EXAM_EVE : due;
  }
  function grade(id, correct) {
    const t = today();
    const s = S.cards[id] || { box: 0, right: 0, wrong: 0 };
    if (correct) { s.right++; s.box = Math.min(s.box + 1, 5); } else { s.wrong++; s.box = 1; }
    s.due = nextDue(t, s.box, correct);
    s.last = Date.now();
    S.cards[id] = s;
    save();
  }
  const dueIds = () => { const t = today(); return CARDS.filter((c) => S.cards[c.id] && S.cards[c.id].due <= t).map((c) => c.id); };
  const lessonCardsLeft = (l) => l.cards.filter((c) => !(S.cards[c.id] && S.cards[c.id].right > 0));
  const lessonStarted = (l) => l.cards.some((c) => S.cards[c.id]);
  const lessonDone = (l) => !!S.lessons[l.id];

  function plannedToday() {
    const t = today();
    const ids = [];
    PLAN.forEach((p) => { if (p.date <= t) ids.push(...p.lessons); });
    return ids.map((id) => LESSON[id]);
  }
  const todayPlan = () => PLAN.find((p) => p.date === today());

  // ---------------------------------------------------------------- calculations (fresh numbers each time)
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const fmt = (n) => {
    const r = Math.round(n * 1e6) / 1e6;
    return r.toLocaleString('en-GB', { maximumFractionDigits: 6 });
  };
  const sf2 = (n) => Number(n.toPrecision(2));
  const GEN = {
    magFind() {
      for (;;) {
        const A = pick([0.02, 0.025, 0.04, 0.05, 0.08, 0.1, 0.2, 0.25, 0.5, 1.5, 2]);
        const M = pick([20, 40, 50, 100, 200, 250, 400, 500, 1000]);
        const I = A * M;
        if (I < 4 || I > 160 || Math.abs(I * 10 - Math.round(I * 10)) > 1e-9) continue;
        return { q: `A cell is <b>${fmt(A)} mm</b> wide. In a drawing it is <b>${fmt(I)} mm</b> wide. Calculate the <b>magnification</b> of the drawing.`, ans: M, unit: '×', pre: '×',
          steps: `M = image ÷ actual<br>= ${fmt(I)} ÷ ${fmt(A)}<br>= <b>×${fmt(M)}</b>`, kind: 'M', I, A };
      }
    },
    actualFind() {
      for (;;) {
        const A = pick([0.01, 0.02, 0.025, 0.03, 0.04, 0.05, 0.08, 0.1, 0.2, 0.5]);
        const M = pick([50, 100, 200, 400, 500, 1000, 1500, 2000]);
        const I = A * M;
        if (I < 5 || I > 150 || Math.abs(I - Math.round(I)) > 1e-9) continue;
        return { q: `A cell is seen at a magnification of <b>×${fmt(M)}</b>. The image is <b>${fmt(I)} mm</b> long. Calculate the <b>actual length</b> of the cell in mm.`, ans: A, unit: 'mm',
          steps: `A = image ÷ magnification<br>= ${fmt(I)} ÷ ${fmt(M)}<br>= <b>${fmt(A)} mm</b>`, kind: 'A', I, M };
      }
    },
    imageFind() {
      for (;;) {
        const A = pick([0.008, 0.01, 0.025, 0.04, 0.05, 0.1, 0.2, 0.6, 1.2]);
        const M = pick([40, 100, 250, 400, 500, 1000, 2000, 5000]);
        const I = A * M;
        if (I < 5 || I > 160 || Math.abs(I * 10 - Math.round(I * 10)) > 1e-9) continue;
        return { q: `A specimen is <b>${fmt(A)} mm</b> long. It is magnified <b>×${fmt(M)}</b>. How long is the <b>image</b>, in mm?`, ans: I, unit: 'mm',
          steps: `I = actual × magnification<br>= ${fmt(A)} × ${fmt(M)}<br>= <b>${fmt(I)} mm</b>`, kind: 'I' };
      }
    },
    totalMag() {
      const e = pick([5, 10, 15]), o = pick([4, 10, 40, 100]);
      return { q: `A microscope has an eyepiece of <b>×${e}</b> and an objective lens of <b>×${o}</b>. What is the <b>total magnification</b>?`, ans: e * o, unit: '×', pre: '×',
        steps: `total = eyepiece × objective<br>= ${e} × ${o}<br>= <b>×${e * o}</b>` };
    },
    sigFig() {
      for (;;) {
        const L = 20 + Math.floor(Math.random() * 20), D = 45 + Math.floor(Math.random() * 60);
        const raw = D / L;
        if (Math.abs(raw * 10 - Math.round(raw * 10)) < 0.05) continue;
        return { q: `A leaf is <b>${L} mm</b> long in a photograph. A student draws it <b>${D} mm</b> long. Calculate the magnification of the drawing. Give your answer to <b>two significant figures</b>.`, ans: sf2(raw), unit: '×', pre: '×', exact: true,
          steps: `M = drawing ÷ photo = ${D} ÷ ${L} = ${raw.toFixed(3)}...<br>Two significant figures: <b>×${sf2(raw)}</b>` };
      }
    },
    mm2um() {
      const x = pick([0.002, 0.008, 0.02, 0.04, 0.05, 0.25, 0.5, 1.2, 2.5, 3, 12, 30, 55]);
      return { q: `Convert <b>${fmt(x)} mm</b> into micrometres (µm).`, ans: x * 1000, unit: 'µm', steps: `mm → µm: × 1000<br>${fmt(x)} × 1000 = <b>${fmt(x * 1000)} µm</b>`, kind: 'conv' };
    },
    um2mm() {
      const x = pick([5, 8, 20, 25, 50, 150, 300, 700, 1000, 2500, 12000]);
      return { q: `Convert <b>${fmt(x)} µm</b> into millimetres (mm).`, ans: x / 1000, unit: 'mm', steps: `µm → mm: ÷ 1000<br>${fmt(x)} ÷ 1000 = <b>${fmt(x / 1000)} mm</b>`, kind: 'conv' };
    },
    magMixed() {
      // realistic real-life sizes in µm for each specimen
      const THINGS = [['a red blood cell', [8]], ['a chloroplast', [5, 8, 10]], ['a cheek cell', [40, 50, 60]], ['a leaf cell', [50, 80, 100]],
        ['a pollen grain', [25, 40, 50]], ['a fly\'s eye', [500, 1000]], ['a snowflake', [700, 1000, 2500]], ['an insect wing', [2500, 4000, 5000]]];
      for (;;) {
        const [thing, sizes] = pick(THINGS);
        const A = pick(sizes);
        const M = pick([8, 10, 12, 20, 25, 40, 50, 100, 200, 250, 400, 500, 1000, 1500, 2000, 5000]);
        const Imm = (A * M) / 1000;
        if (Imm < 5 || Imm > 150 || Math.abs(Imm - Math.round(Imm)) > 1e-9) continue;
        return { q: `The actual size of ${thing} is <b>${fmt(A)} µm</b>. In the picture it measures <b>${fmt(Imm)} mm</b>. Calculate the <b>magnification</b>.`, ans: M, unit: '×', pre: '×',
          steps: `1. Image in mm: ${fmt(Imm)} mm<br>2. Convert to µm: ${fmt(Imm)} × 1000 = ${fmt(Imm * 1000)} µm<br>3. M = ${fmt(Imm * 1000)} ÷ ${fmt(A)} = <b>×${fmt(M)}</b>`, kind: 'M' };
      }
    },
    actualUm() {
      for (;;) {
        const Aum = pick([2, 5, 8, 10, 20, 25, 30, 40, 50, 75, 100]);
        const M = pick([100, 200, 400, 500, 1000, 1500, 2000, 2500, 5000]);
        const Imm = (Aum * M) / 1000;
        if (Imm < 5 || Imm > 150 || Math.abs(Imm * 10 - Math.round(Imm * 10)) > 1e-9) continue;
        return { q: `A cell is magnified <b>×${fmt(M)}</b>. Its image is <b>${fmt(Imm)} mm</b> wide. What is its <b>actual width in µm</b>?`, ans: Aum, unit: 'µm',
          steps: `1. Convert the image to µm: ${fmt(Imm)} × 1000 = ${fmt(Imm * 1000)} µm<br>2. A = I ÷ M = ${fmt(Imm * 1000)} ÷ ${fmt(M)} = <b>${fmt(Aum)} µm</b>`, kind: 'A' };
      }
    },
    pctChange() {
      if (Math.random() < 0.5) {
        const a = pick([2.4, 2.5, 3.2, 4, 4.8, 5]);
        const pct = pick([-20, -15, -12.5, -10, -8, -5, 5, 8, 10, 12.5, 15, 20, 25]);
        const b = Math.round(a * (1 + pct / 100) * 100) / 100;
        const real = ((b - a) / a) * 100;
        return { q: `A piece of potato had a mass of <b>${a.toFixed(2)} g</b>. After 30 minutes in a sugar solution its mass was <b>${b.toFixed(2)} g</b>. Calculate the <b>percentage change in mass</b>. (Use a minus sign if it went down.)`, ans: Math.round(real * 10) / 10, unit: '%', tol: 0.2,
          steps: `% change = (final − initial) ÷ initial × 100<br>= (${b.toFixed(2)} − ${a.toFixed(2)}) ÷ ${a.toFixed(2)} × 100<br>= <b>${fmt(Math.round(real * 10) / 10)}%</b><br>${real > 0 ? 'Mass went up: water entered by osmosis (the solution was more dilute).' : 'Mass went down: water left by osmosis (the solution was more concentrated).'}` };
      }
      const after = pick([18, 19, 21, 22, 23, 24]);
      const pct = ((after - 20) / 20) * 100;
      return { q: `A potato chip was <b>20 mm</b> long. After 48 hours in a sugar solution it was <b>${after} mm</b> long. Calculate the <b>percentage change in length</b>. (Use a minus sign if it went down.)`, ans: pct, unit: '%', tol: 0.2,
        steps: `% change = (${after} − 20) ÷ 20 × 100 = <b>${fmt(pct)}%</b>` };
    },
    rf() {
      const sol = pick([6, 7.5, 8, 9, 10, 12]);
      const sub = Math.round(sol * pick([0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8]) * 10) / 10;
      const rf = Math.round((sub / sol) * 100) / 100;
      return { q: `On a chromatogram the solvent moved <b>${sol.toFixed(1)} cm</b> from the start line. A dye moved <b>${sub.toFixed(1)} cm</b>. Calculate the <b>R<sub>f</sub> value</b> (2 decimal places).`, ans: rf, unit: '', tol: 0.011,
        steps: `R<sub>f</sub> = distance moved by substance ÷ distance moved by solvent<br>= ${sub.toFixed(1)} ÷ ${sol.toFixed(1)} = <b>${rf.toFixed(2)}</b>` };
    },
  };

  function parseNum(raw) {
    let s = String(raw).trim().replace(/[×x%µumcm\s]/gi, '').replace(/[−–]/g, '-');
    if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, '');
    else s = s.replace(',', '.');
    if (s === '' || isNaN(Number(s))) return null;
    return Number(s);
  }
  function checkCalc(inst, raw) {
    const v = parseNum(raw);
    if (v === null) return { ok: false, empty: true };
    const a = inst.ans;
    let ok;
    if (inst.exact) ok = Math.abs(v - a) < 1e-9;
    else if (inst.tol) ok = Math.abs(v - a) <= inst.tol;
    else ok = Math.abs(v - a) <= Math.abs(a) * 0.005 + 1e-9;
    let hint = '';
    if (!ok && a !== 0) {
      const r = v / a;
      const near = (x) => Math.abs(r - x) / x < 0.01;
      if (near(1000) || near(0.001)) hint = 'Your answer is 1000 times too big or too small. Check the mm and µm conversion.';
      else if (near(10) || near(0.1) || near(100) || near(0.01)) hint = 'Your answer is off by a factor of 10 or 100. Count the zeros carefully.';
      else if (inst.kind === 'M' && inst.I && inst.A && Math.abs(v - inst.A / inst.I) / (inst.A / inst.I) < 0.01) hint = 'You divided the wrong way round. Magnification = image ÷ actual.';
      else if (inst.kind === 'A' && inst.I && inst.M && Math.abs(v - inst.I * inst.M) / (inst.I * inst.M) < 0.01) hint = 'You multiplied. For the actual size, divide: image ÷ magnification.';
      else if (inst.exact && Math.abs(v - a) < 0.06) hint = 'Close! Round to exactly two significant figures.';
      else if (Math.abs(v + a) < 1e-6) hint = 'Check the sign: did it go up (+) or down (−)?';
    }
    return { ok, v, hint };
  }

  // ---------------------------------------------------------------- small UI helpers
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const unitChip = (u) => `<span class="chip ${UNIT[u].color}">${u} · ${esc(UNIT[u].title)}</span>`;
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
  }
  let keyHandler = null;
  document.addEventListener('keydown', (e) => { if (keyHandler && !e.metaKey && !e.ctrlKey) keyHandler(e); });
  function render(html, onKey) { app.innerHTML = html; keyHandler = onKey || null; window.scrollTo(0, 0); }
  const on = (sel, fn) => app.querySelectorAll(sel).forEach((el) => el.addEventListener('click', fn));

  // ---------------------------------------------------------------- home
  function stats(unitId) {
    const cs = CARDS.filter((c) => c.unit === unitId);
    const learned = cs.filter((c) => S.cards[c.id] && S.cards[c.id].right > 0).length;
    const solid = cs.filter((c) => S.cards[c.id] && S.cards[c.id].box >= 3).length;
    return { total: cs.length, learned, solid };
  }
  function nextStep() {
    const due = dueIds();
    if (due.length) return { kind: 'review', label: `${due.length} review question${due.length === 1 ? '' : 's'} from earlier` };
    const l = LESSONS.find((x) => !lessonDone(x));
    if (l) return { kind: 'lesson', lesson: l, label: `${lessonStarted(l) ? 'Finish' : 'Learn'}: ${l.title}` };
    return { kind: 'none', label: 'Everything learned. Do a practice test.' };
  }
  function home() {
    const t = today();
    const left = daysBetween(t, EXAM_DAY);
    const when = left > 1 ? `${left} days to go` : left === 1 ? 'Test is tomorrow' : left === 0 ? 'Test day. Good luck!' : 'Test done';
    const step = nextStep();
    const planned = plannedToday();
    const plan = todayPlan();
    const planDone = planned.every(lessonDone);
    const due = dueIds().length;
    let planHtml = '';
    if (left >= 0) {
      const items = planned.filter((l) => !lessonDone(l) || (plan && plan.lessons.includes(l.id)));
      planHtml = `<section class="card"><h2>${plan ? plan.label + "'s plan" : left === 0 ? 'This morning' : 'Plan'}</h2>
        ${left === 0 ? `<p>Only do the review questions (10 to 15 minutes). No new topics today. Then eat breakfast and go.</p>` : ''}
        <ul class="plan">${due ? `<li class="${due ? '' : 'done'}"><span class="tick">${due ? '' : '✓'}</span> Review questions from earlier days <b>(${due})</b></li>` : ''}
        ${left > 0 ? items.map((l) => `<li class="${lessonDone(l) ? 'done' : ''}"><span class="tick">${lessonDone(l) ? '✓' : ''}</span>${esc(l.title)}<span class="muted nowrap">${l.mins} min</span></li>`).join('') : ''}
        ${plan && plan.test ? `<li class="${S.tests.some((x) => x.date === t) ? 'done' : ''}"><span class="tick">${S.tests.some((x) => x.date === t) ? '✓' : ''}</span>Practice test<span class="muted nowrap">25 min</span></li>` : ''}
        ${plan && plan.test ? `<li><span class="tick"></span>Blank page challenge with someone<span class="muted nowrap">20 min</span></li>` : ''}
        </ul>${planDone && !due && left > 0 ? `<p class="good">Today's lessons are done. Going ahead is a bonus. Sleep is part of learning: stop in good time.</p>` : ''}</section>`;
    }
    const units = UNITS.map((u) => { const s = stats(u.id); const lp = Math.round((s.learned / s.total) * 100); const sp = Math.round((s.solid / s.total) * 100);
      return `<div class="urow"><div class="uname">${unitChip(u.id)}</div><div class="bar"><span class="b1" style="width:${lp}%"></span><span class="b2" style="width:${sp}%"></span></div><div class="pct">${lp}%</div></div>`; }).join('');
    render(`
      <header class="top"><div><h1>${esc(EXAM.title)}</h1><p class="muted">Monday 12 October · ${esc(EXAM.length)}</p></div><span class="count">${when}</span></header>
      <button class="big" id="go"><span>${step.kind === 'none' ? 'Practice test' : 'Start'}</span><small>${esc(step.label)}</small></button>
      ${planHtml}
      <section class="card"><h2>How much you know</h2>${units}<p class="legend"><span class="k1"></span> answered right at least once <span class="k2"></span> right on several days</p></section>
      <nav class="tiles">
        <button data-go="test"><b>Practice test</b><small>25 mixed exam questions</small></button>
        <button data-go="topics"><b>All topics</b><small>Notes and practice per topic</small></button>
        <button data-go="blurt"><b>Blank page challenge</b><small>Do it with someone checking</small></button>
        <button data-go="help"><b>How this works</b><small>Read this first</small></button>
      </nav>
      <p class="foot"><a href="#" id="sync">Use on another device</a></p>`,
      (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('go').click(); } });
    document.getElementById('go').onclick = () => (step.kind === 'none' ? startTest() : startNext());
    on('[data-go]', (e) => { const g = e.currentTarget.dataset.go; ({ test: startTest, topics, blurt: blurtList, help })[g](); });
    document.getElementById('sync').onclick = (e) => { e.preventDefault(); syncScreen(); };
    if (!S.seenHelp) { S.seenHelp = true; save(); help(); }
  }

  // ---------------------------------------------------------------- sessions
  let run = null;
  function startNext() {
    const step = nextStep();
    if (step.kind === 'review') {
      const ids = shuffle(dueIds()).slice(0, 25);
      return startBlock({ kind: 'review', title: 'Review: questions from earlier', ids });
    }
    if (step.kind === 'lesson') {
      const l = step.lesson;
      if (!lessonStarted(l)) return learnPages(l, 0, () => startLessonQuiz(l));
      return startLessonQuiz(l);
    }
    startTest();
  }
  function startLessonQuiz(l) {
    const ids = lessonCardsLeft(l).map((c) => c.id);
    if (!ids.length) { S.lessons[l.id] = today(); save(); return breakScreen(null); }
    startBlock({ kind: 'lesson', lesson: l.id, title: l.title, ids: orderForLearning(ids) });
  }
  // Keep recall questions early and calculations spread out, so a lesson builds up.
  function orderForLearning(ids) {
    const calc = ids.filter((id) => CARD[id].t === 'calc');
    const rest = ids.filter((id) => CARD[id].t !== 'calc');
    const out = rest.slice();
    calc.forEach((id, i) => out.splice(Math.min(out.length, Math.floor(((i + 1) * out.length) / (calc.length + 1)) + i), 0, id));
    return out;
  }
  function startBlock(b) {
    run = { ...b, queue: b.ids.slice(), tried: new Set(), firstRight: 0, firstWrong: 0, total: b.ids.length, missed: [] };
    showCard();
  }

  function learnPages(l, i, then) {
    const p = l.learn[i];
    const last = i === l.learn.length - 1;
    render(`<div class="bar-top"><button class="x" id="x" aria-label="Back to start">✕</button><div class="prog"><span style="width:${((i + 1) / l.learn.length) * 100}%"></span></div><span class="n">${i + 1}/${l.learn.length}</span></div>
      <article class="learn">${unitChip(l.unit)}<p class="kicker">Learn: ${esc(l.title)}</p><h2>${esc(p.h)}</h2>${p.html}
      <p class="muted small">${last ? 'Next you get questions on this. Getting some wrong is normal and part of learning.' : ''}</p></article>
      <div class="actions">${i > 0 ? '<button class="ghost" id="back">Back</button>' : ''}<button class="primary" id="next">${last ? (then ? 'Start the questions' : 'Done') : 'Next'}</button></div>`,
      (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); document.getElementById('next').click(); } });
    document.getElementById('x').onclick = home;
    document.getElementById('next').onclick = () => (last ? (then ? then() : topics()) : learnPages(l, i + 1, then));
    const back = document.getElementById('back'); if (back) back.onclick = () => learnPages(l, i - 1, then);
  }

  function header() {
    const done = run.total - new Set(run.queue).size;
    return `<div class="bar-top"><button class="x" id="x" aria-label="Stop">✕</button><div class="prog"><span style="width:${(done / run.total) * 100}%"></span></div><span class="n">${done}/${run.total}</span></div>`;
  }
  function showCard() {
    if (!run.queue.length) return finishBlock();
    const id = run.queue[0];
    const c = CARD[id];
    if (c.t === 'calc' && (!run.inst || run.inst.id !== id)) run.inst = { id, ...GEN[c.gen]() };
    const again = run.tried.has(id) ? '<span class="again">Try again</span>' : '';
    const top = `${header()}<article class="q">${unitChip(c.unit)} ${again}<p class="kicker">${esc(LESSON[c.lesson].title)}</p>`;
    if (c.t === 'mcq') return showMcq(c, top);
    if (c.t === 'calc') return showCalc(c, top);
    return showRecall(c, top);
  }
  function wireX() { document.getElementById('x').onclick = () => { run = null; home(); }; }

  function showRecall(c, top) {
    render(`${top}<h2 class="qtext">${c.q}</h2>${c.img ? D.render(c.img) : ''}<p class="muted small">Say it out loud or write it down first. Then check.</p></article>
      <div class="actions"><button class="primary" id="show">Show answer</button></div>`,
      (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); document.getElementById('show').click(); } });
    wireX();
    document.getElementById('show').onclick = () => (c.t === 'pts' ? revealPoints(c, top) : revealQA(c, top));
  }
  function revealQA(c, top) {
    render(`${top}<h2 class="qtext">${c.q}</h2>${c.img ? D.render(c.img) : ''}<div class="answer">${c.a}</div></article>
      <p class="muted small center">Be honest: would you have got the mark?</p>
      <div class="actions two"><button class="no" id="no">Not yet <kbd>1</kbd></button><button class="yes" id="yes">Got it <kbd>2</kbd></button></div>`,
      (e) => { if (e.key === '1') answer(false); if (e.key === '2') answer(true); });
    wireX();
    document.getElementById('no').onclick = () => answer(false);
    document.getElementById('yes').onclick = () => answer(true);
  }
  function revealPoints(c, top) {
    const ticks = new Set();
    const draw = () => {
      render(`${top}<h2 class="qtext">${c.q}</h2><p class="small">Tick each point you had. You need <b>${c.need}</b> of ${c.p.length}.</p>
        <ul class="points">${c.p.map((p, i) => `<li><button class="pt ${ticks.has(i) ? 'on' : ''}" data-i="${i}"><span class="box">${ticks.has(i) ? '✓' : ''}</span><span>${esc(p)}</span></button></li>`).join('')}</ul>
        ${c.a ? `<div class="answer">${c.a}</div>` : ''}</article>
        <div class="actions"><button class="primary" id="done">${ticks.size >= c.need ? 'Done: got it' : `Done: not yet (${ticks.size}/${c.need})`}</button></div>`,
        (e) => { const n = Number(e.key); if (n >= 1 && n <= c.p.length) toggle(n - 1); if (e.key === 'Enter') document.getElementById('done').click(); });
      wireX();
      on('.pt', (e) => toggle(Number(e.currentTarget.dataset.i)));
      document.getElementById('done').onclick = () => answer(ticks.size >= c.need);
    };
    const toggle = (i) => { ticks.has(i) ? ticks.delete(i) : ticks.add(i); draw(); };
    draw();
  }
  function showMcq(c, top) {
    if (!run.opts || run.opts.id !== c.id) run.opts = { id: c.id, list: c.keep ? c.o.map((t, i) => ({ t, ok: i === 0 })) : shuffle(c.o.map((t, i) => ({ t, ok: i === 0 }))) };
    const list = run.opts.list;
    let chosen = -1;
    const draw = () => {
      const fin = chosen >= 0;
      render(`${top}<h2 class="qtext">${c.q}</h2>${c.img ? D.render(c.img) : ''}
        <div class="opts">${list.map((o, i) => `<button class="opt ${fin ? (o.ok ? 'right' : i === chosen ? 'wrong' : 'dim') : ''}" data-i="${i}" ${fin ? 'disabled' : ''}><kbd>${i + 1}</kbd><span>${o.t}</span></button>`).join('')}</div>
        ${fin ? `<div class="answer ${list[chosen].ok ? 'okbox' : 'nobox'}"><b>${list[chosen].ok ? 'Right.' : 'Not quite.'}</b> ${c.why || ''}</div>` : ''}</article>
        ${fin ? '<div class="actions"><button class="primary" id="next">Next</button></div>' : ''}`,
        (e) => { if (!fin) { const n = Number(e.key); if (n >= 1 && n <= list.length) pickOpt(n - 1); } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); } });
      wireX();
      if (!fin) on('.opt', (e) => pickOpt(Number(e.currentTarget.dataset.i)));
      else document.getElementById('next').onclick = next;
    };
    const pickOpt = (i) => { chosen = i; record(list[i].ok); draw(); };
    const next = () => { run.opts = null; advance(list[chosen].ok); };
    draw();
  }
  function showCalc(c, top) {
    const inst = run.inst;
    let res = null, typed = '';
    const draw = () => {
      render(`${top}<p class="tag-calc">Calculation</p><h2 class="qtext">${inst.q}</h2>
        <form id="f" class="calc" autocomplete="off"><label class="small" for="v">Your answer${inst.unit && inst.unit !== '×' ? ` (in ${inst.unit})` : inst.unit === '×' ? ' (just the number, e.g. 400)' : ''}</label>
        <div class="inrow"><input id="v" inputmode="decimal" enterkeyhint="done" value="${esc(typed)}" ${res ? 'disabled' : ''} placeholder="type a number">${inst.unit && inst.unit !== '×' ? `<span class="post">${inst.unit}</span>` : ''}</div>
        ${res ? '' : '<button class="primary" type="submit">Check</button>'}</form>
        ${res ? `<div class="answer ${res.ok ? 'okbox' : 'nobox'}"><b>${res.ok ? 'Right!' : 'Not quite.'}</b>${res.hint ? `<p>${res.hint}</p>` : ''}<p class="steps">${inst.steps}</p></div>` : '<p class="muted small">Use a calculator. Write the working on paper too: in the test, working gets marks.</p>'}</article>
        ${res ? '<div class="actions"><button class="primary" id="next">Next</button></div>' : `<p class="center"><button class="link" id="idk">I don't know how, show me</button></p>`}`,
        (e) => { if (res && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); next(); } });
      wireX();
      if (!res) {
        const inp = document.getElementById('v'); setTimeout(() => inp.focus({ preventScroll: true }), 50);
        document.getElementById('f').onsubmit = (e) => { e.preventDefault(); typed = inp.value; const r = checkCalc(inst, typed); if (r.empty) return inp.focus(); res = r; record(r.ok); draw(); };
        document.getElementById('idk').onclick = () => { res = { ok: false, hint: 'Here is how it is done. A new version with different numbers will come back in a moment.' }; record(false); draw(); };
      } else document.getElementById('next').onclick = next;
    };
    const next = () => { const ok = res.ok; run.inst = null; advance(ok); };
    draw();
  }

  // first answer in a block decides the schedule; later tries only clear the card from today's queue
  function record(ok) {
    const id = run.queue[0];
    if (run.tried.has(id)) return;
    run.tried.add(id);
    if (ok) run.firstRight++; else { run.firstWrong++; run.missed.push(id); }
    if (run.kind !== 'test') grade(id, ok);
    else run.testResults.push({ id, ok });
  }
  function answer(ok) { record(ok); advance(ok); }
  function advance(ok) {
    const id = run.queue.shift();
    if (!ok && run.kind !== 'test') {
      run.queue.splice(Math.min(3, run.queue.length), 0, id);
      toast('No problem. This one comes back in a moment.');
    }
    showCard();
  }
  function finishBlock() {
    const b = run;
    if (b.kind === 'lesson') { S.lessons[b.lesson] = today(); save(); }
    if (b.kind === 'test') return testResult(b);
    run = null;
    breakScreen(b);
  }
  function breakScreen(b) {
    const step = nextStep();
    const pct = b && b.total ? Math.round((b.firstRight / b.total) * 100) : 0;
    const msg = !b ? '' : pct >= 85 ? 'Excellent.' : pct >= 60 ? 'Good work.' : 'That was hard, and that is fine: the questions you missed will come back tomorrow, and that is when it sticks.';
    const planned = plannedToday();
    const allPlannedDone = planned.every(lessonDone) && !dueIds().length;
    render(`<article class="learn center">
      ${b ? `<p class="kicker">Finished</p><h2>${esc(b.title)}</h2><div class="score"><b>${b.firstRight}</b> of ${b.total} right first time</div><p>${msg}</p>` : '<h2>Lesson complete</h2>'}
      ${allPlannedDone ? `<p class="good">That's everything planned for today.${daysBetween(today(), EXAM_DAY) > 0 ? ' You can go ahead with the next topic or stop here.' : ''}</p>` : ''}
      <p class="muted">Next: ${esc(step.label)}</p></article>
      <div class="actions two"><button class="ghost" id="stop">Stop for now</button><button class="primary" id="more">Keep going</button></div>`,
      (e) => { if (e.key === 'Enter') document.getElementById('more').click(); });
    document.getElementById('stop').onclick = home;
    document.getElementById('more').onclick = startNext;
  }

  // ---------------------------------------------------------------- practice test
  function startTest() {
    const pool = CARDS.filter((c) => c.t !== 'qa');
    const learned = new Set(LESSONS.filter(lessonStarted).map((l) => l.id));
    const byUnit = {};
    pool.forEach((c) => { (byUnit[c.unit] = byUnit[c.unit] || []).push(c); });
    const picks = [];
    const units = UNITS.map((u) => u.id);
    const per = { B1: 3, B2: 6, 'B2.2': 4, B3: 5, C1: 4, C12: 5 };
    units.forEach((u) => {
      const cs = shuffle(byUnit[u]);
      const pref = cs.filter((c) => learned.has(c.lesson));
      const rest = cs.filter((c) => !learned.has(c.lesson));
      const gens = new Set();
      [...pref, ...rest].forEach((c) => { if (picks.filter((p) => p.unit === u).length >= per[u]) return; if (c.t === 'calc') { if (gens.has(c.gen)) return; gens.add(c.gen); } picks.push(c); });
    });
    const ids = shuffle(picks).map((c) => c.id);
    run = { kind: 'test', title: 'Practice test', ids, queue: ids.slice(), tried: new Set(), firstRight: 0, firstWrong: 0, total: ids.length, missed: [], testResults: [] };
    render(`<article class="learn"><p class="kicker">Practice test</p><h2>${ids.length} mixed questions, like the real test</h2>
      <ul><li>Questions from all topics, in a random order. That mixing is on purpose: the real test does it too.</li><li>Have paper and a calculator ready. Write working for calculations.</li><li>No notes. Each question counts once. You see your score at the end, and anything you miss goes into your reviews.</li></ul></article>
      <div class="actions two"><button class="ghost" id="back">Not now</button><button class="primary" id="go">Start the test</button></div>`);
    document.getElementById('back').onclick = () => { run = null; home(); };
    document.getElementById('go').onclick = showCard;
  }
  function testResult(b) {
    run = null;
    const right = b.testResults.filter((r) => r.ok).length;
    const pct = Math.round((right / b.total) * 100);
    S.tests.push({ date: today(), right, total: b.total, at: Date.now() });
    // anything missed in the test becomes due straight away
    b.testResults.forEach((r) => { const s = S.cards[r.id] || { box: 0, right: 0, wrong: 0 }; if (!r.ok) { s.box = 1; s.wrong++; s.due = today(); s.last = Date.now(); S.cards[r.id] = s; } });
    save();
    const missed = b.testResults.filter((r) => !r.ok).map((r) => CARD[r.id]);
    const byU = {};
    b.testResults.forEach((r) => { const u = CARD[r.id].unit; byU[u] = byU[u] || [0, 0]; byU[u][1]++; if (r.ok) byU[u][0]++; });
    render(`<article class="learn"><p class="kicker">Practice test</p><h2>${right} of ${b.total} (${pct}%)</h2>
      <div class="ubreak">${Object.entries(byU).map(([u, [r, t]]) => `<div>${unitChip(u)} <b>${r}/${t}</b></div>`).join('')}</div>
      ${missed.length ? `<h3>Go over these</h3><ol class="missed">${missed.map((c) => `<li>${c.t === 'calc' ? 'Calculation: ' + esc(LESSON[c.lesson].title) : c.q}<div class="small">${c.t === 'mcq' ? c.o[0] + (c.why ? '. ' + c.why : '') : c.t === 'pts' ? c.p.map(esc).join('; ') : c.t === 'qa' ? c.a : 'Practise this in the review.'}</div></li>`).join('')}</ol><p class="muted">These ${missed.length} are now in your review queue.</p>` : '<p class="good">Perfect score!</p>'}</article>
      <div class="actions"><button class="primary" id="home">Back to start</button></div>`);
    document.getElementById('home').onclick = home;
  }

  // ---------------------------------------------------------------- topics
  function topics() {
    run = null;
    render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>All topics</h1></header>
      ${UNITS.map((u) => `<section class="card"><h2>${unitChip(u.id)}</h2>${LESSONS.filter((l) => l.unit === u.id).map((l) => {
        const n = l.cards.length, k = l.cards.filter((c) => S.cards[c.id] && S.cards[c.id].right > 0).length;
        return `<div class="lrow"><div><b>${esc(l.title)}</b><div class="muted small">${k}/${n} answered right · ${lessonDone(l) ? 'done' : lessonStarted(l) ? 'started' : 'not started'}</div></div><div class="lbtn"><button class="ghost sm" data-notes="${l.id}">Notes</button><button class="primary sm" data-prac="${l.id}">Practise</button></div></div>`;
      }).join('')}</section>`).join('')}`);
    document.getElementById('x').onclick = home;
    on('[data-notes]', (e) => learnPages(LESSON[e.currentTarget.dataset.notes], 0, null));
    on('[data-prac]', (e) => { const l = LESSON[e.currentTarget.dataset.prac]; startBlock({ kind: 'lesson', lesson: l.id, title: l.title, ids: shuffle(l.cards.map((c) => c.id)) }); });
  }

  // ---------------------------------------------------------------- blank page challenge
  function blurtList() {
    render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>Blank page challenge</h1></header>
      <section class="card"><p><b>How it works.</b> Pick a topic. Take a blank sheet of paper. Write down <b>everything</b> you remember about it in <b>5 minutes</b>, without looking. Then open the checklist with the person helping you and tick what you got. Fill in what you missed in a different colour.</p><p class="muted small">This is one of the strongest ways to make things stick, because you pull it all out of your own memory.</p></section>
      <section class="card">${BLURTS.map((b, i) => { const r = S.blurts[i]; return `<button class="lrow wide" data-b="${i}"><div>${unitChip(b.unit)}<div><b>${esc(b.prompt)}</b></div>${r ? `<div class="muted small">Last time: ${r.got}/${b.points.length}</div>` : ''}</div><span>›</span></button>`; }).join('')}</section>`);
    document.getElementById('x').onclick = home;
    on('[data-b]', (e) => blurt(Number(e.currentTarget.dataset.b)));
  }
  function blurt(i) {
    const b = BLURTS[i];
    let phase = 'write', secs = 300, timer = null;
    const ticks = new Set();
    const draw = () => {
      if (phase === 'write') {
        render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>Blank page</h1></header>
          <article class="learn center">${unitChip(b.unit)}<h2>${esc(b.prompt)}</h2><p>Write everything you can remember. Lists, drawings, definitions, examples.</p>
          <div class="timer" id="t">${Math.floor(secs / 60)}:${pad(secs % 60)}</div></article>
          <div class="actions two"><button class="ghost" id="start">${timer ? 'Pause' : 'Start 5 min timer'}</button><button class="primary" id="check">Open the checklist</button></div>`);
        document.getElementById('x').onclick = () => { clearInterval(timer); blurtList(); };
        document.getElementById('start').onclick = () => { if (timer) { clearInterval(timer); timer = null; } else timer = setInterval(() => { secs = Math.max(0, secs - 1); const el = document.getElementById('t'); if (el) el.textContent = `${Math.floor(secs / 60)}:${pad(secs % 60)}`; if (!secs) { clearInterval(timer); timer = null; toast('Time! Now open the checklist.'); } }, 1000); draw(); };
        document.getElementById('check').onclick = () => { clearInterval(timer); phase = 'check'; draw(); };
      } else {
        render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>Checklist</h1></header>
          <article class="learn">${unitChip(b.unit)}<h2>${esc(b.prompt)}</h2><p class="small">Tick each point that is on the paper (it does not have to be word for word, but the key words must be there).</p>
          <ul class="points">${b.points.map((p, k) => `<li><button class="pt ${ticks.has(k) ? 'on' : ''}" data-k="${k}"><span class="box">${ticks.has(k) ? '✓' : ''}</span><span>${esc(p)}</span></button></li>`).join('')}</ul>
          <div class="score"><b>${ticks.size}</b> of ${b.points.length}</div><p class="muted small">Anything not ticked: write it in a different colour now, then practise that topic.</p></article>
          <div class="actions"><button class="primary" id="save">Save and finish</button></div>`);
        document.getElementById('x').onclick = blurtList;
        on('.pt', (e) => { const k = Number(e.currentTarget.dataset.k); ticks.has(k) ? ticks.delete(k) : ticks.add(k); draw(); });
        document.getElementById('save').onclick = () => { S.blurts[i] = { got: ticks.size, date: today() }; save(); blurtList(); };
      }
    };
    draw();
  }

  // ---------------------------------------------------------------- help
  function help() {
    render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>How this works</h1></header>
      <article class="learn">
      <h2>Just press Start</h2>
      <p>Every time you open this, press the big <b>Start</b> button. The app decides what comes next:</p>
      <ol><li><b>Review</b> of questions from earlier days, if any are due.</li><li>Then the <b>next topic</b>: a short explanation, then questions on it straight away.</li></ol>
      <p>Anything you get wrong comes back a few questions later, until you get it. Then it comes back again on the next days. That repeat on different days is what moves it into long-term memory.</p>
      <h2>Three rules</h2>
      <ol><li><b>Answer before you look.</b> Say it out loud or write it down, then press Show answer. The effort of remembering is what makes it stick. Reading the answer alone does almost nothing.</li>
      <li><b>Be honest.</b> Only press <i>Got it</i> if you would have got the mark in the test.</li>
      <li><b>Wrong answers are fine.</b> They tell the app what to show you again.</li></ol>
      <h2>The plan</h2>
      <table class="kv"><tr><th>Thursday</th><td>Living things, parts of cells, three types of cell</td></tr><tr><th>Friday</th><td>Reviews, specialised cells, tissues and organs, magnification</td></tr><tr><th>Saturday</th><td>Reviews, diffusion, osmosis, active transport, states of matter</td></tr><tr><th>Sunday</th><td>Reviews, lab techniques, separating, chromatography, practice test, blank page challenge</td></tr><tr><th>Monday</th><td>10 to 15 minutes of reviews before school. Nothing new.</td></tr></table>
      <p>Sessions of 30 to 45 minutes with a break in between work better than one long sitting. Sleep is when the brain stores what you learned, so a good night's sleep before Monday matters.</p>
      <h2>On a Mac</h2><p>Keyboard: <kbd>Space</kbd> shows the answer, <kbd>1</kbd> Not yet, <kbd>2</kbd> Got it, <kbd>1</kbd> to <kbd>4</kbd> pick an option.</p>
      <h2>On an iPhone</h2><p>In Safari tap Share, then <b>Add to Home Screen</b>. It then opens like an app.</p>
      <h2>For the person helping</h2><p>Two things help most. (1) The <b>Blank page challenge</b>: she writes everything she remembers on a topic, you tick the checklist. (2) After any answer, ask <b>"why?"</b>. Explaining why is what turns a memorised line into understanding.</p>
      </article><div class="actions"><button class="primary" id="ok">Got it, let's go</button></div>`);
    document.getElementById('x').onclick = home;
    document.getElementById('ok').onclick = home;
  }

  // ---------------------------------------------------------------- moving progress between devices
  // Progress lives on each device. To move it, the app builds a link that carries the progress
  // in the part after # (never sent to any server). Open the link on the other device to merge.
  function encodeState() {
    const cards = Object.entries(S.cards).map(([id, s]) => [id, s.box, s.due, s.right, s.wrong, s.last || 0].join('.')).join('~');
    const lessons = Object.entries(S.lessons).map(([id, d]) => `${id}.${d}`).join('~');
    const tests = S.tests.map((t) => [t.date, t.right, t.total, t.at || 0].join('.')).join('~');
    return btoa(unescape(encodeURIComponent([cards, lessons, tests].join('|')))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function mergeState(code) {
    const raw = decodeURIComponent(escape(atob(code.replace(/-/g, '+').replace(/_/g, '/'))));
    const [cards, lessons, tests] = raw.split('|');
    let n = 0;
    (cards || '').split('~').filter(Boolean).forEach((row) => {
      const parts = row.split('.');
      const last = Number(parts.pop()), wrong = Number(parts.pop()), right = Number(parts.pop());
      const [id, box, ...rest] = parts; const due = rest.join('.');
      if (!CARD[id]) return;
      const mine = S.cards[id];
      if (!mine || (mine.last || 0) < last) { S.cards[id] = { box: Number(box), due, right, wrong, last }; n++; }
    });
    (lessons || '').split('~').filter(Boolean).forEach((row) => { const [id, d] = row.split('.'); if (LESSON[id] && !S.lessons[id]) S.lessons[id] = d; });
    (tests || '').split('~').filter(Boolean).forEach((row) => { const [date, right, total, at] = row.split('.'); if (!S.tests.some((t) => t.at === Number(at))) S.tests.push({ date, right: Number(right), total: Number(total), at: Number(at) }); });
    save();
    return n;
  }
  function syncScreen() {
    const link = `${location.origin}${location.pathname}#p=${encodeState()}`;
    render(`<header class="top"><button class="x" id="x" aria-label="Back">←</button><h1>Another device</h1></header>
      <article class="learn"><p>Your progress is saved on <b>this</b> device. To continue on your phone or laptop:</p>
      <ol><li>Press the button below. It makes a link with your progress inside.</li><li>Send it to yourself (AirDrop, Messages, WhatsApp).</li><li>Open the link on the other device. Your progress is added there.</li></ol>
      <p class="muted small">Do this each time you switch. The app keeps whichever answer is newest for each question.</p></article>
      <div class="actions"><button class="primary" id="share">Send my progress</button></div>`);
    document.getElementById('x').onclick = home;
    document.getElementById('share').onclick = async () => {
      try { if (navigator.share) { await navigator.share({ title: 'My science progress', url: link }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
      try { await navigator.clipboard.writeText(link); toast('Link copied. Paste it into a message to yourself.'); } catch (e) { prompt('Copy this link:', link); }
    };
  }

  // ---------------------------------------------------------------- start
  if (location.hash.startsWith('#p=')) {
    try { const n = mergeState(location.hash.slice(3)); S.seenHelp = true; save(); setTimeout(() => toast(`Progress loaded (${n} questions updated).`), 300); } catch (e) { setTimeout(() => toast('That progress link did not work.'), 300); }
    history.replaceState(null, '', location.pathname);
  }
  home();
})();
