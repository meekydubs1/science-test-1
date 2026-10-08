// Simple inline SVG diagrams. Colours come from CSS classes so light and dark mode both work.
// D.render('animal') draws a fully labelled cell; D.render('animal:nucleus') points one "?" arrow at a part.
const D = (() => {
  const svg = (vb, body, label) =>
    `<svg viewBox="${vb}" role="img" aria-label="${label}" class="dia">${body}</svg>`;

  // ---------- cells ----------
  const ribos = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" class="d-dot"/>`).join('');
  const mito = (x, y, rot) =>
    `<g transform="translate(${x},${y}) rotate(${rot})"><ellipse rx="20" ry="9" class="d-mito"/><path d="M-14 0 q4 -7 8 0 t8 0 t8 0" class="d-thin"/></g>`;
  const chloro = (x, y, rot) =>
    `<g transform="translate(${x},${y}) rotate(${rot})"><ellipse rx="17" ry="9" class="d-chloro"/><path d="M-9 -3 h18 M-10 1 h20 M-8 5 h16" class="d-thin-g"/></g>`;

  const cells = {
    animal: {
      vb: '0 0 460 260',
      title: 'Animal cell',
      body: () =>
        `<path d="M120 60 C170 20 270 30 320 60 C370 90 360 150 330 190 C300 230 210 240 160 215 C110 190 70 150 85 110 C92 88 100 72 120 60 Z" class="d-cell"/>` +
        `<circle cx="190" cy="125" r="34" class="d-nuc"/>` +
        mito(275, 95, -20) + mito(285, 175, 25) + mito(140, 180, 10) +
        ribos([[240,140],[250,120],[230,170],[150,110],[160,90],[300,130],[220,75],[205,200],[120,140],[315,150],[260,205]]),
      parts: {
        'cell membrane': [325, 70, 410, 40],
        cytoplasm: [235, 105, 420, 120],
        nucleus: [190, 125, 40, 60],
        mitochondrion: [285, 175, 420, 200],
        ribosome: [230, 170, 40, 220],
      },
    },
    plant: {
      vb: '0 0 460 280',
      title: 'Plant cell',
      body: () =>
        `<rect x="110" y="30" width="240" height="220" rx="8" class="d-wall"/>` +
        `<rect x="120" y="40" width="220" height="200" rx="6" class="d-cell"/>` +
        `<rect x="175" y="75" width="120" height="130" rx="40" class="d-vac"/>` +
        `<circle cx="150" cy="70" r="20" class="d-nuc"/>` +
        chloro(145, 130, 80) + chloro(150, 205, 20) + chloro(320, 90, 70) + chloro(315, 175, 100) + chloro(240, 225, 0) +
        mito(235, 55, 0) + mito(318, 222, -20) +
        ribos([[140,170],[165,230],[300,60],[328,135],[200,62],[270,228],[132,100]]),
      parts: {
        'cell wall': [112, 140, 30, 140],
        'cell membrane': [340, 150, 430, 150],
        vacuole: [235, 140, 430, 110],
        nucleus: [150, 70, 30, 55],
        chloroplast: [320, 90, 430, 60],
        mitochondrion: [318, 222, 430, 250],
        cytoplasm: [160, 220, 30, 250],
        ribosome: [140, 170, 30, 195],
      },
    },
    bacteria: {
      vb: '0 0 460 240',
      title: 'Bacterial cell',
      body: () =>
        `<rect x="74" y="64" width="282" height="122" rx="60" class="d-capsule"/>` +
        `<rect x="82" y="72" width="266" height="106" rx="53" class="d-wall"/>` +
        `<rect x="90" y="80" width="250" height="90" rx="45" class="d-cell"/>` +
        `<path d="M150 125 c10 -30 40 -30 45 -5 c5 25 30 25 35 0 c4 -20 -20 -25 -30 -10 c-10 18 -50 35 -50 15 Z" class="d-dna"/>` +
        `<circle cx="275" cy="110" r="9" class="d-plasmid"/><circle cx="295" cy="145" r="7" class="d-plasmid"/>` +
        ribos([[120,110],[130,145],[250,140],[310,115],[240,100],[205,150],[320,140]]) +
        `<path d="M356 125 c20 -15 30 15 50 0 s30 15 45 0" class="d-flag"/>`,
      parts: {
        'slime capsule': [150, 66, 120, 20],
        'cell wall': [215, 74, 260, 20],
        'cell membrane': [215, 168, 215, 222],
        cytoplasm: [110, 130, 20, 200],
        'circular DNA': [171, 132, 165, 222],
        plasmid: [275, 110, 400, 60],
        ribosome: [250, 140, 400, 200],
        flagellum: [410, 125, 420, 165],
      },
    },
  };

  // Labels are numbered markers with a key underneath, so the text stays readable on a phone.
  function cell(kind, focus) {
    const c = cells[kind];
    let marks = '';
    const names = [];
    for (const [name, [ax, ay, lx, ly]] of Object.entries(c.parts)) {
      if (focus && name !== focus) continue;
      names.push(name);
      marks += `<line x1="${ax}" y1="${ay}" x2="${lx}" y2="${ly}" class="d-lead"/><circle cx="${ax}" cy="${ay}" r="3" class="d-pin"/>`;
      marks += focus
        ? `<circle cx="${lx}" cy="${ly}" r="15" class="d-q"/><text x="${lx}" y="${ly + 6}" text-anchor="middle" class="d-qt">?</text>`
        : `<circle cx="${lx}" cy="${ly}" r="14" class="d-num"/><text x="${lx}" y="${ly + 5}" text-anchor="middle" class="d-numt">${names.length}</text>`;
    }
    const pic = svg(c.vb, c.body() + marks, focus ? `${c.title}, one part marked with a question mark` : `${c.title}, labelled`);
    if (focus) return pic;
    return `<figure class="dfig">${pic}<figcaption><b>${c.title}</b><ol class="dkey">${names.map((n) => `<li>${n}</li>`).join('')}</ol></figcaption></figure>`;
  }

  // ---------- particles ----------
  function particles(state) {
    let dots = '';
    if (state === 'solid') {
      for (let r = 0; r < 5; r++) for (let k = 0; k < 7; k++) dots += `<circle cx="${40 + k * 20}" cy="${150 - r * 20}" r="9" class="d-part"/>`;
    } else if (state === 'liquid') {
      const p = [[35,152],[55,150],[76,153],[96,149],[118,152],[139,150],[160,153],[180,150],[45,132],[66,130],[88,134],[109,131],[131,133],[152,130],[172,132],[38,112],[60,114],[83,111],[126,113],[148,110],[100,113],[170,113]];
      dots = p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" class="d-part"/>`).join('');
    } else {
      const p = [[45,40],[120,30],[170,70],[70,100],[140,120],[40,150],[110,75],[175,150]];
      dots = p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" class="d-part"/>`).join('');
    }
    return svg('0 0 210 175', `<path d="M20 15 V165 H195 V15" class="d-box"/>` + dots, `Particle diagram`);
  }
  function particlesAll() {
    return `<div class="dia-row"><figure>${particles('solid')}<figcaption>Solid</figcaption></figure><figure>${particles('liquid')}<figcaption>Liquid</figcaption></figure><figure>${particles('gas')}<figcaption>Gas</figcaption></figure></div>`;
  }

  // ---------- heating curve ----------
  function heating(labels = true) {
    const pts = '60,215 120,165 200,165 260,95 360,95 410,40';
    const L = labels
      ? `<text x="98" y="207" class="d-label">A</text><text x="155" y="157" class="d-label">B</text><text x="240" y="142" class="d-label">C</text><text x="305" y="87" class="d-label">D</text><text x="396" y="82" class="d-label">E</text>`
      : '';
    return svg('0 0 440 260',
      `<path d="M50 20 V230 H430" class="d-axis"/><text x="20" y="130" transform="rotate(-90 20 130)" text-anchor="middle" class="d-small">temperature / °C</text><text x="240" y="252" text-anchor="middle" class="d-small">time (heating)</text>` +
      `<polyline points="${pts}" class="d-curve"/><line x1="50" y1="165" x2="120" y2="165" class="d-dash"/><line x1="50" y1="95" x2="260" y2="95" class="d-dash"/>` +
      `<text x="46" y="169" text-anchor="end" class="d-small">mp</text><text x="46" y="99" text-anchor="end" class="d-small">bp</text>` + L,
      'Heating curve with sections A to E');
  }

  // ---------- chromatogram ----------
  // Lanes: X (unknown mixture) and known dyes A, B, C, D. Distances in cm from the baseline.
  function chrom() {
    const base = 230, front = 30, cm = 25; // 8.0 cm solvent run
    // each spot: [distance in cm, colour class]; X's spots share the colours of A and C because they are the same dyes
    const lanes = [['X', [[2.4, 1], [5.6, 3]]], ['A', [[2.4, 1]]], ['B', [[4.0, 2]]], ['C', [[5.6, 3]]], ['D', [[0, 4]]]];
    let body = `<rect x="40" y="15" width="330" height="240" rx="4" class="d-paper"/>`;
    body += `<line x1="40" y1="${base}" x2="370" y2="${base}" class="d-pencil"/><text x="375" y="${base + 4}" class="d-small">start line (pencil)</text>`;
    body += `<line x1="40" y1="${front}" x2="370" y2="${front}" class="d-dash"/><text x="375" y="${front + 4}" class="d-small">solvent front</text>`;
    lanes.forEach(([n, spots], i) => {
      const x = 85 + i * 62;
      spots.forEach(([d, s]) => (body += `<ellipse cx="${x}" cy="${base - d * cm}" rx="11" ry="8" class="d-spot s${s}"/>`));
      body += `<text x="${x}" y="${base + 20}" text-anchor="middle" class="d-label">${n}</text>`;
    });
    return svg('0 0 500 270', body, 'Chromatogram of mixture X and dyes A to D');
  }

  function render(key) {
    const [kind, focus] = key.split(':');
    if (cells[kind]) return cell(kind, focus);
    if (kind === 'particles') return focus ? particles(focus) : particlesAll();
    if (kind === 'heating') return heating(true);
    if (kind === 'chrom') return chrom();
    return '';
  }
  return { render };
})();
