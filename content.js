// All study content for Grade 9 Science Test 1 (Cambridge IGCSE Combined Science: B1, B2, B3, C1, C12).
// Card types:
//   qa   : question, think, reveal answer, self-grade
//   mcq  : multiple choice, auto-marked. The FIRST option is the right one; the app shuffles (unless keep:true)
//   pts  : longer answer. Reveal the mark points and tick the ones you had. need = ticks for "Got it"
//   calc : fresh numbers every time, type the answer, auto-marked (generators live in app.js)

const EXAM = { date: '2026-10-12', title: 'Science Test 1', length: '50 minutes' };

// Which day each lesson is planned for. Sunday afternoon is for the practice test.
const PLAN = [
  { date: '2026-10-08', label: 'Thursday', lessons: ['b1', 'cellparts', 'cellcompare'] },
  { date: '2026-10-09', label: 'Friday', lessons: ['special', 'levels', 'mag', 'units'] },
  { date: '2026-10-10', label: 'Saturday', lessons: ['diffusion', 'osmosis', 'active', 'states', 'changes', 'gases'] },
  { date: '2026-10-11', label: 'Sunday', lessons: ['apparatus', 'separation', 'chrom'], test: true },
];

const UNITS = [
  { id: 'B1', title: 'Living things', color: 'u1' },
  { id: 'B2', title: 'Cells', color: 'u2' },
  { id: 'B2.2', title: 'Size of specimens', color: 'u3' },
  { id: 'B3', title: 'In and out of cells', color: 'u4' },
  { id: 'C1', title: 'States of matter', color: 'u5' },
  { id: 'C12', title: 'Experimental techniques', color: 'u6' },
];

const LESSONS = [
  // ===================================================================== B1
  {
    id: 'b1', unit: 'B1', title: 'What makes something alive', mins: 12,
    learn: [
      {
        h: 'The seven characteristics of living things',
        html: `<p>Every living thing does all seven. Many students remember them as <b>MRS GREN</b>.</p>
<table class="kv">
<tr><th>Movement</th><td>an action by an organism or part of an organism causing a <b>change of position or place</b></td></tr>
<tr><th>Respiration</th><td>the <b>chemical reactions in cells</b> that <b>break down nutrient molecules</b> and <b>release energy</b> for metabolism</td></tr>
<tr><th>Sensitivity</th><td>the ability to <b>detect and respond to changes</b> in the internal or external environment</td></tr>
<tr><th>Growth</th><td>a <b>permanent increase in size and dry mass</b></td></tr>
<tr><th>Reproduction</th><td>the processes that <b>make more of the same kind of organism</b></td></tr>
<tr><th>Excretion</th><td>the <b>removal of waste products of metabolism</b> and substances <b>in excess of requirements</b></td></tr>
<tr><th>Nutrition</th><td>the <b>taking in of materials</b> for <b>energy, growth and development</b></td></tr>
</table>
<p class="tip">The marks are in the bold words. Learn these exact definitions, not your own shorter version.</p>`,
      },
      {
        h: 'Three traps that lose marks',
        html: `<ol>
<li><b>Respiration releases energy. It never "makes" energy.</b> Energy cannot be made. Your notebook says "makes energy": in the test write <i>releases energy</i>.</li>
<li><b>Respiration or excretion?</b> Respiration = releasing energy in cells. Excretion = getting rid of waste. Breathing out extra carbon dioxide is <b>excretion</b>, because carbon dioxide is a waste product of respiration.</li>
<li><b>Growth must be permanent and in dry mass.</b> A sponge soaking up water gets bigger but has not grown.</li>
</ol>
<p><b>Your notebook versions that would lose marks:</b></p>
<ul>
<li>Sensitivity "detects its environment": add <b>and responds to changes</b>.</li>
<li>Reproduction "making copies of themselves": say <b>make more of the same kind of organism</b>.</li>
<li>Nutrition "taking in substances to make energy": say <b>materials for energy, growth and development</b>.</li>
</ul>
<p>Also: breathing (moving air in and out) is <b>not</b> respiration. Respiration is the chemical reaction inside cells.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'Name all <b>seven</b> characteristics of living organisms.', a: 'Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition (MRS GREN).' },
      { t: 'pts', q: 'Define <b>respiration</b>.', p: ['chemical reactions in cells', 'break down nutrient molecules', 'release energy (for metabolism)'], need: 3 },
      { t: 'pts', q: 'Define <b>excretion</b>.', p: ['removal of waste products of metabolism', 'and substances in excess of requirements'], need: 2 },
      { t: 'pts', q: 'Define <b>growth</b>.', p: ['a permanent increase', 'in size and dry mass'], need: 2 },
      { t: 'pts', q: 'Define <b>sensitivity</b>.', p: ['the ability to detect and respond', 'to changes in the internal or external environment'], need: 2 },
      { t: 'pts', q: 'Define <b>nutrition</b>.', p: ['taking in of materials', 'for energy, growth and development'], need: 2 },
      { t: 'qa', q: 'Define <b>reproduction</b>.', a: 'The processes that make <b>more of the same kind of organism</b>.' },
      { t: 'qa', q: 'Define <b>movement</b>.', a: 'An action by an organism or part of an organism causing a <b>change of position or place</b>.' },
      { t: 'mcq', q: 'The air you breathe out contains more carbon dioxide than the air you breathe in. Which characteristic is this?', o: ['Excretion', 'Respiration', 'Nutrition', 'Movement'], why: 'Carbon dioxide is a waste product of respiration. Getting rid of it is excretion.' },
      { t: 'mcq', q: 'A <i>Mimosa</i> plant folds up its leaves when it is touched.', o: ['Sensitivity', 'Excretion', 'Growth', 'Respiration'], why: 'It detects the touch and responds to it.' },
      { t: 'mcq', q: 'A bacterium divides into two every 20 minutes.', o: ['Reproduction', 'Growth', 'Excretion', 'Movement'], why: 'One becomes two: more of the same kind of organism.' },
      { t: 'mcq', q: 'During its first year a baby may triple its birth weight.', o: ['Growth', 'Nutrition', 'Reproduction', 'Respiration'], why: 'A permanent increase in size and dry mass.' },
      { t: 'mcq', q: 'Green leaves use chlorophyll to make glucose and starch.', o: ['Nutrition', 'Respiration', 'Excretion', 'Sensitivity'], why: 'Plants make their own food: this is how they take in materials for energy and growth.' },
      { t: 'mcq', q: 'Your heart beats faster when you get a shock.', o: ['Sensitivity', 'Growth', 'Respiration', 'Excretion'], why: 'Your body detects a change and responds to it.' },
      { t: 'mcq', q: 'Humans produce urine containing waste products and water the body does not need.', o: ['Excretion', 'Nutrition', 'Respiration', 'Reproduction'], why: 'Removal of waste and of substances in excess of requirements.' },
      { t: 'mcq', q: 'At night a plant gives out carbon dioxide.', o: ['Respiration', 'Nutrition', 'Sensitivity', 'Growth'], why: 'At night there is no photosynthesis, so the carbon dioxide released comes from respiration in the cells.' },
      { t: 'mcq', q: 'Which of these is an example of <b>growth</b>?', o: ['A tree adds a new ring of wood every year', 'A dry sponge soaks up water and gets bigger', 'A balloon is blown up', 'A plant wilts on a hot day'], why: 'Growth is a permanent increase in size and dry mass. Water soaking in is not growth.' },
      { t: 'qa', q: 'A student writes: "Respiration is how an organism makes energy." Why does this lose the mark?', a: 'Energy cannot be made. Respiration <b>releases</b> energy, by chemical reactions in cells that break down nutrient molecules (such as glucose).' },
      { t: 'qa', q: 'Is <b>breathing</b> the same as respiration?', a: 'No. Breathing moves air in and out of the lungs. Respiration is the chemical reactions <b>in cells</b> that release energy.' },
    ],
  },

  // ===================================================================== B2 cell parts
  {
    id: 'cellparts', unit: 'B2', title: 'Parts of a cell and their jobs', mins: 15,
    learn: [
      {
        h: 'Eight structures, eight jobs',
        html: `<table class="kv">
<tr><th>Cell membrane</th><td><b>controls what enters and leaves</b> the cell</td></tr>
<tr><th>Cytoplasm</th><td>jelly-like substance where most <b>chemical reactions</b> take place</td></tr>
<tr><th>Nucleus</th><td>contains the <b>DNA</b> (genetic material) and <b>controls the activities</b> of the cell</td></tr>
<tr><th>Mitochondria</th><td>where <b>aerobic respiration</b> happens, <b>releasing energy</b></td></tr>
<tr><th>Ribosomes</th><td>where <b>proteins are made</b> (protein synthesis)</td></tr>
<tr><th>Cell wall</th><td>made of <b>cellulose</b>; gives <b>strength and support</b> and <b>stops the cell bursting</b></td></tr>
<tr><th>Vacuole</th><td>large and permanent, contains <b>cell sap</b>; helps keep the cell <b>firm (turgid)</b></td></tr>
<tr><th>Chloroplasts</th><td>contain <b>chlorophyll</b>, which absorbs light; where <b>photosynthesis</b> happens</td></tr>
</table>
<p class="tip">One more fact to learn: <b>new cells are made when existing cells divide.</b></p>`,
      },
      {
        h: 'See them in a cell',
        html: `${D.render('animal')}${D.render('plant')}<p class="tip">Chloroplasts are in the cytoplasm. A vacuole is the big space in the middle of a plant cell.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'What does the <b>cell membrane</b> do?', a: 'Controls what enters and leaves the cell.' },
      { t: 'qa', q: 'What is the <b>cytoplasm</b> and what happens there?', a: 'A jelly-like substance where most chemical reactions take place.' },
      { t: 'pts', q: 'State <b>two</b> things about the <b>nucleus</b>.', p: ['contains DNA (genetic material)', 'controls the activities of the cell'], need: 2 },
      { t: 'pts', q: 'State the function of <b>mitochondria</b>.', p: ['site of aerobic respiration', 'releases energy'], need: 2 },
      { t: 'qa', q: 'What do <b>ribosomes</b> do?', a: 'Make proteins (protein synthesis).' },
      { t: 'pts', q: 'What is a plant <b>cell wall</b> made of, and what does it do?', p: ['made of cellulose', 'gives strength and support', 'stops the cell bursting (when it takes in water)'], need: 2 },
      { t: 'qa', q: 'What is in the <b>vacuole</b>, and what does it do?', a: 'Cell sap. It helps keep the cell firm (turgid).' },
      { t: 'pts', q: 'What do <b>chloroplasts</b> contain, and what happens in them?', p: ['contain chlorophyll', 'site of photosynthesis'], need: 2 },
      { t: 'mcq', q: 'Which structure is the site of <b>photosynthesis</b>?', o: ['Chloroplast', 'Mitochondrion', 'Nucleus', 'Vacuole'], why: 'Chloroplasts contain chlorophyll which absorbs light for photosynthesis.' },
      { t: 'mcq', q: 'Which structure <b>releases energy</b> by aerobic respiration?', o: ['Mitochondrion', 'Chloroplast', 'Ribosome', 'Cell membrane'], why: 'Mitochondria are where aerobic respiration releases energy.' },
      { t: 'mcq', q: 'Which structure <b>prevents a plant cell from bursting</b>?', o: ['Cell wall', 'Cell membrane', 'Vacuole', 'Cytoplasm'], why: 'The strong cellulose cell wall stops the cell bursting when water enters.' },
      { t: 'mcq', q: 'Where are <b>proteins made</b>?', o: ['Ribosomes', 'Nucleus', 'Mitochondria', 'Vacuole'], why: 'Ribosomes are the site of protein synthesis.' },
      { t: 'mcq', q: 'In a leaf cell, where are the <b>chloroplasts</b> found?', o: ['In the cytoplasm', 'In the nucleus', 'In the vacuole', 'Between the cell wall and the cell membrane'], why: 'All organelles float in the cytoplasm, inside the cell membrane.' },
      { t: 'qa', q: 'How are <b>new cells</b> produced?', a: 'By division of existing cells.' },
      { t: 'mcq', q: 'What is this structure?', img: 'animal:nucleus', o: ['Nucleus', 'Vacuole', 'Mitochondrion', 'Ribosome'], why: 'The large round structure that holds the DNA.' },
      { t: 'mcq', q: 'What is this structure?', img: 'animal:mitochondrion', o: ['Mitochondrion', 'Chloroplast', 'Nucleus', 'Ribosome'], why: 'Sausage shaped with folds inside: a mitochondrion.' },
      { t: 'mcq', q: 'What is this structure?', img: 'animal:cell membrane', o: ['Cell membrane', 'Cell wall', 'Cytoplasm', 'Vacuole'], why: 'Animal cells have only a membrane on the outside, no cell wall.' },
      { t: 'mcq', q: 'What is this structure?', img: 'plant:vacuole', o: ['Vacuole', 'Nucleus', 'Cytoplasm', 'Chloroplast'], why: 'The big space filled with cell sap in the middle of a plant cell.' },
      { t: 'mcq', q: 'What is this structure?', img: 'plant:cell wall', o: ['Cell wall', 'Cell membrane', 'Vacuole', 'Cytoplasm'], why: 'The thick outer layer of a plant cell, made of cellulose.' },
      { t: 'mcq', q: 'What is this structure?', img: 'plant:chloroplast', o: ['Chloroplast', 'Mitochondrion', 'Ribosome', 'Nucleus'], why: 'Green, with stacked layers inside: a chloroplast.' },
      { t: 'mcq', q: 'What is this structure?', img: 'plant:cell membrane', o: ['Cell membrane', 'Cell wall', 'Vacuole', 'Cytoplasm'], why: 'In a plant cell the membrane is the thin layer just inside the cell wall.' },
    ],
  },

  // ===================================================================== B2 compare
  {
    id: 'cellcompare', unit: 'B2', title: 'Animal, plant and bacterial cells', mins: 15,
    learn: [
      {
        h: 'What each type of cell has',
        html: `<table class="grid3">
<tr><th></th><th>Animal</th><th>Plant</th><th>Bacteria</th></tr>
<tr><td>Cell membrane</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Cytoplasm</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Ribosomes</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Nucleus</td><td>✓</td><td>✓</td><td>✗</td></tr>
<tr><td>Mitochondria</td><td>✓</td><td>✓</td><td>✗</td></tr>
<tr><td>Cell wall</td><td>✗</td><td>✓ cellulose</td><td>✓ not cellulose</td></tr>
<tr><td>Large vacuole</td><td>✗</td><td>✓</td><td>✗</td></tr>
<tr><td>Chloroplasts</td><td>✗</td><td>✓ green parts only</td><td>✗</td></tr>
<tr><td>Circular DNA</td><td>✗</td><td>✗</td><td>✓</td></tr>
<tr><td>Plasmids</td><td>✗</td><td>✗</td><td>✓</td></tr>
</table>
<p class="tip"><b>Trap:</b> not all plant cells have chloroplasts. Root cells are underground, so they have none. But <b>all</b> plant cells have a cell wall.</p>`,
      },
      {
        h: 'The bacterial cell',
        html: `${D.render('bacteria')}
<ul>
<li><b>No nucleus.</b> Its DNA is one loop, the <b>circular DNA</b>, lying free in the cytoplasm. It carries the genes that <b>control the cell's activities</b>.</li>
<li><b>Plasmids</b>: extra small rings of DNA carrying <b>extra genes</b>, for example genes for <b>antibiotic resistance</b>.</li>
<li><b>Cell wall</b> is <b>not</b> made of cellulose.</li>
<li>Some have a <b>flagellum</b> (a tail to move) and a <b>slime capsule</b> (protection).</li>
<li>No mitochondria, no chloroplasts. Bacteria are tiny: about 1 µm long.</li>
</ul>`,
      },
    ],
    cards: [
      { t: 'pts', q: 'Name the <b>five</b> structures found in <b>both</b> animal and plant cells.', p: ['cell membrane', 'cytoplasm', 'nucleus', 'mitochondria', 'ribosomes'], need: 5 },
      { t: 'pts', q: 'Name <b>three</b> structures found in plant cells but <b>not</b> in animal cells.', p: ['cell wall', 'large (permanent) vacuole', 'chloroplasts'], need: 3 },
      { t: 'pts', q: 'Name the six structures in a <b>bacterial cell</b> you need to know.', p: ['cell wall', 'cell membrane', 'cytoplasm', 'ribosomes', 'circular DNA', 'plasmids'], need: 6 },
      { t: 'qa', q: 'Where is the DNA in a bacterial cell?', a: 'In one loop of <b>circular DNA</b> lying free in the cytoplasm (there is <b>no nucleus</b>), plus small rings called <b>plasmids</b>.' },
      { t: 'pts', q: 'State <b>two</b> structures found in <b>both</b> bacteria and plant cells.', p: ['any two of: cell wall, cell membrane, cytoplasm, ribosomes'], need: 1 },
      { t: 'pts', q: 'Name <b>two</b> structures in a bacterial cell that are <b>not</b> found in animal cells.', p: ['cell wall', 'plasmids (or circular DNA)'], need: 2 },
      { t: 'mcq', q: 'Which structure is found in <b>bacterial</b> cells but <b>not</b> in plant or animal cells?', o: ['Plasmid', 'Ribosome', 'Cell membrane', 'Mitochondrion'], why: 'Plasmids are small extra rings of DNA found only in bacteria (in this course).' },
      { t: 'mcq', q: 'Which features are found in <b>all</b> plant cells?', o: ['Cell wall: yes. Chloroplasts: no, not all.', 'Cell wall: yes. Chloroplasts: yes, all.', 'Cell wall: no. Chloroplasts: yes, all.', 'Neither'], keep: true, why: 'Every plant cell has a cell wall, but root cells have no chloroplasts (no light underground).' },
      { t: 'mcq', q: 'Which row shows structures present in <b>both</b> root hair cells and palisade mesophyll cells?', o: ['Cell wall, cytoplasm, vacuole', 'Cell wall, chloroplasts, cytoplasm, vacuole', 'Chloroplasts and cytoplasm only', 'Cell wall and chloroplasts only'], why: 'Root hair cells have no chloroplasts. Both have a cell wall, cytoplasm and a vacuole.' },
      { t: 'mcq', q: 'How is a bacterial cell wall different from a plant cell wall?', o: ['It is not made of cellulose', 'It is made of cellulose', 'Bacteria have no cell wall', 'It is inside the cell membrane'], why: 'Bacteria do have a cell wall, but unlike a plant cell wall it is not made of cellulose.' },
      { t: 'mcq', q: 'Which of these does a bacterial cell <b>not</b> have?', o: ['Nucleus', 'Ribosomes', 'Cell membrane', 'Cytoplasm'], why: 'Bacteria have no nucleus: their DNA is a loose loop in the cytoplasm.' },
      { t: 'qa', q: 'What is the job of a <b>flagellum</b> on a bacterium?', a: 'It lets the bacterium move (swim).' },
      { t: 'qa', q: 'What does the <b>slime capsule</b> do?', a: 'Protects the bacterium.' },
      { t: 'mcq', q: 'What is this structure?', img: 'bacteria:plasmid', o: ['Plasmid', 'Nucleus', 'Mitochondrion', 'Vacuole'], why: 'A small extra ring of DNA.' },
      { t: 'mcq', q: 'What is this structure?', img: 'bacteria:circular DNA', o: ['Circular DNA', 'Nucleus', 'Plasmid', 'Chloroplast'], why: 'The big loop of genetic material, free in the cytoplasm.' },
      { t: 'mcq', q: 'What is this structure?', img: 'bacteria:flagellum', o: ['Flagellum', 'Cilia', 'Slime capsule', 'Cell wall'], why: 'The long tail used for moving.' },
      { t: 'mcq', q: 'What is this structure?', img: 'bacteria:cell wall', o: ['Cell wall', 'Cell membrane', 'Slime capsule', 'Cytoplasm'], why: 'The layer between the slime capsule (outside) and the cell membrane (inside).' },
      { t: 'mcq', q: 'This cell has a cell wall, ribosomes and circular DNA but <b>no nucleus</b>. What type of cell is it?', o: ['Bacterial cell', 'Plant cell', 'Animal cell', 'Red blood cell'], why: 'No nucleus plus circular DNA: a bacterium. (A red blood cell has no nucleus, but has no cell wall or DNA either.)' },
      { t: 'qa', q: 'Describe the function of <b>plasmids</b> in bacterial cells.', a: 'Small extra rings of DNA that carry <b>extra genes</b>, for example genes for <b>antibiotic resistance</b>.' },
      { t: 'qa', q: 'What is the function of the <b>circular DNA</b> in a bacterium?', a: 'It carries the genes that <b>control the activities of the cell</b> (it does the job the nucleus does in other cells).' },
    ],
  },

  // ===================================================================== B2 specialised cells
  {
    id: 'special', unit: 'B2', title: 'Specialised cells', mins: 18,
    learn: [
      {
        h: 'Animal cells with special jobs',
        html: `<table class="kv">
<tr><th>Ciliated cell</th><td><b>Where:</b> lining the trachea and bronchi (airways).<br><b>Job:</b> movement of mucus (which traps dust and bacteria) up and out of the airways.<br><b>Adapted:</b> tiny hairs called <b>cilia</b> that beat to sweep the mucus.</td></tr>
<tr><th>Neurone (nerve cell)</th><td><b>Where:</b> nervous system.<br><b>Job:</b> conduction of <b>electrical impulses</b>.<br><b>Adapted:</b> <b>very long</b> (long axon) to carry impulses over long distances; branched endings connect to many cells.</td></tr>
<tr><th>Red blood cell</th><td><b>Where:</b> blood.<br><b>Job:</b> transport of <b>oxygen</b>.<br><b>Adapted:</b> contains <b>haemoglobin</b> which carries oxygen; <b>no nucleus</b>, so more room for haemoglobin; <b>biconcave disc</b> shape gives a large surface area.</td></tr>
</table>`,
      },
      {
        h: 'Reproduction and plant cells',
        html: `<table class="kv">
<tr><th>Sperm cell</th><td><b>Where:</b> made in the testes. A gamete.<br><b>Job:</b> reproduction (carries the father's DNA to the egg).<br><b>Adapted:</b> <b>flagellum</b> (tail) to swim; <b>many mitochondria</b> to release energy for swimming; <b>acrosome</b> with <b>enzymes</b> to digest a way into the egg.</td></tr>
<tr><th>Egg cell</th><td><b>Where:</b> made in the ovaries. A gamete.<br><b>Job:</b> reproduction.<br><b>Adapted:</b> <b>energy store</b> (food) in the cytoplasm for the embryo; <b>jelly coat</b> that changes after fertilisation so only <b>one sperm</b> gets in.</td></tr>
<tr><th>Root hair cell</th><td><b>Where:</b> plant roots.<br><b>Job:</b> <b>absorption</b> of water and mineral ions from the soil.<br><b>Adapted:</b> long hair gives a <b>large surface area</b>; no chloroplasts (it is underground).</td></tr>
<tr><th>Palisade mesophyll cell</th><td><b>Where:</b> upper part of the leaf.<br><b>Job:</b> <b>photosynthesis</b>.<br><b>Adapted:</b> packed with <b>many chloroplasts</b>; tall cells near the top surface to absorb lots of light.</td></tr>
</table>
<p class="tip">Exam pattern: "State the function" wants the job. "Explain how it is adapted" wants the feature <b>and</b> why it helps.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'Where are <b>ciliated cells</b> found, and what is their function?', a: 'Lining the <b>trachea and bronchi</b>. They move <b>mucus</b> (which traps dust and bacteria) up and out of the airways.' },
      { t: 'pts', q: 'Explain how a <b>ciliated cell</b> is adapted to its function.', p: ['has cilia (tiny hairs)', 'cilia beat / sweep', 'move mucus up and out of the airways'], need: 2 },
      { t: 'qa', q: 'What is the function of a <b>root hair cell</b>?', a: '<b>Absorption</b> of water and mineral ions from the soil.' },
      { t: 'pts', q: 'Explain how a root hair cell is adapted for absorption.', p: ['long hair-like extension', 'gives a large surface area', 'so more water and mineral ions are absorbed (faster)'], need: 2 },
      { t: 'qa', q: 'What is the function of a <b>palisade mesophyll cell</b>?', a: '<b>Photosynthesis.</b>' },
      { t: 'pts', q: 'Explain how a palisade mesophyll cell is adapted.', p: ['many chloroplasts', 'to absorb lots of light for photosynthesis', 'found near the upper surface of the leaf'], need: 2 },
      { t: 'qa', q: 'What is the function of a <b>neurone</b> (nerve cell)?', a: 'Conduction of <b>electrical impulses</b>.' },
      { t: 'pts', q: 'Explain how a neurone is adapted.', p: ['very long (long axon)', 'carries impulses over long distances', 'branched endings connect to many other cells'], need: 2 },
      { t: 'qa', q: 'What is the function of a <b>red blood cell</b>?', a: 'Transport of <b>oxygen</b>.' },
      { t: 'pts', q: 'Explain <b>three</b> ways a red blood cell is adapted to carry oxygen.', p: ['contains haemoglobin, which carries oxygen', 'no nucleus, so more room for haemoglobin', 'biconcave disc shape gives a large surface area'], need: 3 },
      { t: 'qa', q: 'What is the function of <b>sperm and egg cells</b>, and what are they called as a group?', a: '<b>Reproduction.</b> They are <b>gametes</b>.' },
      { t: 'pts', q: 'Explain how a <b>sperm cell</b> is adapted.', p: ['flagellum (tail) to swim to the egg', 'many mitochondria to release energy for swimming', 'acrosome with enzymes to digest a way into the egg'], need: 3 },
      { t: 'pts', q: 'Explain how an <b>egg cell</b> is adapted.', p: ['energy store (food) in the cytoplasm for the embryo', 'jelly coat that changes after fertilisation so only one sperm can enter'], need: 2 },
      { t: 'mcq', q: '<b>Energy store</b> is an adaptation of which cell?', o: ['Egg cell', 'Sperm cell', 'Both', 'Neither'], keep: true, why: 'The egg stores food for the early embryo.' },
      { t: 'mcq', q: '<b>Enzymes in the acrosome</b> are an adaptation of which cell?', o: ['Sperm cell', 'Egg cell', 'Both', 'Neither'], keep: true, why: 'The acrosome on the sperm head digests a way into the egg.' },
      { t: 'mcq', q: 'A <b>flagellum</b> is an adaptation of which cell?', o: ['Sperm cell', 'Egg cell', 'Both', 'Neither'], keep: true, why: 'The sperm tail lets it swim.' },
      { t: 'mcq', q: 'A <b>jelly coat</b> is an adaptation of which cell?', o: ['Egg cell', 'Sperm cell', 'Both', 'Neither'], keep: true, why: 'The jelly coat of the egg changes after one sperm enters, so no more can get in.' },
      { t: 'mcq', q: 'Which cell has <b>no nucleus</b> so it has more room to carry oxygen?', o: ['Red blood cell', 'Neurone', 'Root hair cell', 'Ciliated cell'], why: 'More room for haemoglobin.' },
      { t: 'mcq', q: 'Which cell has a <b>large surface area</b> for absorbing water and mineral ions?', o: ['Root hair cell', 'Palisade mesophyll cell', 'Red blood cell', 'Sperm cell'], why: 'Its long hair sticks out into the soil.' },
      { t: 'mcq', q: 'Which cell is <b>very long</b> so it can carry electrical impulses around the body?', o: ['Neurone', 'Ciliated cell', 'Red blood cell', 'Egg cell'], why: 'Neurones conduct electrical impulses.' },
      { t: 'mcq', q: 'Which cell has <b>many mitochondria</b> to release energy for swimming?', o: ['Sperm cell', 'Egg cell', 'Root hair cell', 'Palisade cell'], why: 'Swimming needs lots of energy from respiration.' },
    ],
  },

  // ===================================================================== B2 levels of organisation
  {
    id: 'levels', unit: 'B2', title: 'Cells, tissues, organs, systems', mins: 8,
    learn: [
      {
        h: 'From cell to organism',
        html: `<p class="chain">cell → tissue → organ → organ system → organism</p>
<table class="kv">
<tr><th>Tissue</th><td>a group of <b>cells with similar structures</b>, working together to perform a <b>shared function</b>. Example: muscle tissue, palisade mesophyll tissue.</td></tr>
<tr><th>Organ</th><td>a structure made of a <b>group of tissues</b>, working together to perform <b>specific functions</b>. Example: heart, stomach, brain, <b>leaf</b>, root.</td></tr>
<tr><th>Organ system</th><td>a <b>group of organs with related functions</b>, working together to perform body functions. Example: digestive system, circulatory system, nervous system.</td></tr>
<tr><th>Cell</th><td>the basic unit of all living things. Example: a red blood cell, a root hair cell.</td></tr>
<tr><th>Organism</th><td>an individual living thing. Large organisms are made of organ systems working together; some (like bacteria) are a single cell. Example: a human, a sunflower.</td></tr>
</table>
<p class="tip">Exam question: <i>Why is a leaf an organ?</i> Because it is made of <b>several different tissues</b> (for example palisade mesophyll, epidermis, xylem) <b>working together</b> to perform a function (photosynthesis).</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'Put these in order from smallest to largest: <i>organ, cell, organism, tissue, organ system</i>.', a: 'Cell → tissue → organ → organ system → organism.' },
      { t: 'pts', q: 'Define a <b>tissue</b>.', p: ['a group of cells with similar structures', 'working together to perform a shared function'], need: 2 },
      { t: 'pts', q: 'Define an <b>organ</b>.', p: ['a group of (different) tissues', 'working together to perform specific functions'], need: 2 },
      { t: 'pts', q: 'Define an <b>organ system</b>.', p: ['a group of organs with related functions', 'working together to perform body functions'], need: 2 },
      { t: 'pts', q: 'Explain why a <b>leaf</b> can be described as an <b>organ</b>.', p: ['made of several different tissues (e.g. palisade mesophyll, epidermis, xylem)', 'working together to perform a function (photosynthesis)'], need: 2 },
      { t: 'mcq', q: 'The heart is an example of...', o: ['an organ', 'a tissue', 'a cell', 'an organ system'], why: 'The heart is made of several tissues (muscle, nerve tissue and more) working together.' },
      { t: 'mcq', q: 'A layer of palisade mesophyll cells in a leaf is...', o: ['a tissue', 'an organ', 'an organ system', 'an organism'], why: 'Many similar cells working together = tissue.' },
      { t: 'mcq', q: 'The stomach, intestines and liver working together form...', o: ['an organ system', 'an organ', 'a tissue', 'an organism'], why: 'They are organs with related functions: the digestive system.' },
      { t: 'mcq', q: 'A single red blood cell is...', o: ['a cell', 'a tissue', 'an organ', 'an organ system'], why: 'One cell is just a cell.' },
      { t: 'qa', q: 'What is a <b>cell</b>?', a: 'The <b>basic unit</b> of all living things. Everything alive is made of one or more cells.' },
      { t: 'qa', q: 'What is an <b>organism</b>? Give an example.', a: 'An <b>individual living thing</b>, e.g. a human or a sunflower. Large organisms are made of organ systems working together; a bacterium is an organism made of one cell.' },
    ],
  },

  // ===================================================================== B2.2 magnification
  {
    id: 'mag', unit: 'B2.2', title: 'Magnification and the microscope', mins: 18,
    learn: [
      {
        h: 'One formula, three ways round',
        html: `<div class="formula">magnification = <span class="frac"><span>image size</span><span>actual size</span></span></div>
<p>Cover the one you want in the triangle:</p>
<div class="tri"><div class="t-top">I</div><div class="t-bot"><span>A</span><span>×</span><span>M</span></div></div>
<ul>
<li><b>M = I ÷ A</b> (magnification)</li>
<li><b>A = I ÷ M</b> (actual size)</li>
<li><b>I = A × M</b> (image size)</li>
</ul>
<p class="tip">Image and actual size must be in the <b>same units</b>. Magnification has <b>no units</b>. Write it with a times sign, like <b>×400</b>.</p>`,
      },
      {
        h: 'Worked examples',
        html: `<div class="ex"><b>1. Find the magnification.</b> An egg is 6.5 cm across. A drawing of it is 19.5 cm across.<br>M = I ÷ A = 19.5 ÷ 6.5 = <b>×3</b></div>
<div class="ex"><b>2. Find the magnification.</b> A red blood cell is 0.008 mm wide. In a diagram it is 40 mm wide.<br>M = 40 ÷ 0.008 = <b>×5000</b></div>
<div class="ex"><b>3. Find the actual size.</b> A cell is viewed at ×500. The image is 20 mm wide.<br>A = I ÷ M = 20 ÷ 500 = <b>0.04 mm</b></div>
<div class="ex"><b>4. Find the image size.</b> A cell is 0.025 mm long, magnified ×400.<br>I = A × M = 0.025 × 400 = <b>10 mm</b></div>
<p class="tip">If a question says "two significant figures", round: 67 ÷ 27 = 2.48, so write <b>×2.5</b>.</p>`,
      },
      {
        h: 'The microscope and drawing rules',
        html: `<p>A microscope produces a magnified image of objects too small to see with the naked eye. Parts: <b>eyepiece</b>, <b>objective lens</b>, <b>stage</b> (holds the <b>slide</b>), <b>light source</b>, <b>focusing wheel</b>, arm, base.</p>
<div class="formula">total magnification = eyepiece × objective</div>
<p>Example: eyepiece ×10 and objective ×4 gives <b>×40</b>.</p>
<p><b>Rules for a biological drawing</b> (your teacher's list):</p>
<ul><li>use a sharp pencil</li><li>no colouring or shading</li><li>give the drawing a heading</li><li>draw the specimen in a rectangle, not a circle</li><li>calculate the total magnification and write it on the drawing</li></ul>
<p>Exam papers also say: make the drawing <b>large</b>, use clear single lines, and include the inside parts.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'Write the formula for <b>magnification</b>.', a: 'magnification = image size ÷ actual size' },
      { t: 'mcq', q: 'Which equation gives the <b>actual size</b>?', o: ['actual size = image size ÷ magnification', 'actual size = image size × magnification', 'actual size = magnification ÷ image size', 'actual size = image size − magnification'], why: 'Cover A in the triangle: I over M.' },
      { t: 'mcq', q: 'Which equation gives the <b>image size</b>?', o: ['image size = actual size × magnification', 'image size = actual size ÷ magnification', 'image size = magnification ÷ actual size', 'image size = actual size + magnification'], why: 'Cover I in the triangle: A times M.' },
      { t: 'qa', q: 'What <b>units</b> does magnification have?', a: 'None. Write it as a number with a times sign, e.g. ×400.' },
      { t: 'qa', q: 'Before you divide, what must be true about the image size and the actual size?', a: 'They must be in the <b>same units</b> (both mm, or both µm).' },
      { t: 'calc', gen: 'magFind' },
      { t: 'calc', gen: 'magFind' },
      { t: 'calc', gen: 'actualFind' },
      { t: 'calc', gen: 'actualFind' },
      { t: 'calc', gen: 'imageFind' },
      { t: 'calc', gen: 'totalMag' },
      { t: 'calc', gen: 'sigFig' },
      { t: 'mcq', q: 'A student finds four worms and draws them. Which worm was <b>longest</b> in real life?<br><span class="small">A: drawing 60 mm at ×3 &nbsp; B: 70 mm at ×1 &nbsp; C: 100 mm at ×2 &nbsp; D: 120 mm at ×5</span>', o: ['B', 'A', 'C', 'D'], keep: true, why: 'Actual = image ÷ magnification: A = 20, B = 70, C = 50, D = 24 mm. B is longest.' },
      { t: 'pts', q: 'Give <b>four</b> rules for a good biological drawing.', p: ['sharp pencil', 'no colouring or shading', 'a heading (title)', 'drawn in a rectangle, not a circle', 'total magnification written on it', 'drawn large'], need: 4 },
      { t: 'qa', q: 'How do you work out the <b>total magnification</b> of a microscope?', a: 'Eyepiece magnification × objective lens magnification.' },
      { t: 'mcq', q: 'On which part of the microscope do you place the slide?', o: ['Stage', 'Eyepiece', 'Objective lens', 'Base'], why: 'The slide sits on the stage, above the light source.' },
      { t: 'mcq', q: 'Which part do you look through?', o: ['Eyepiece', 'Objective lens', 'Stage', 'Light source'], why: 'The eyepiece is at the top, where your eye goes.' },
    ],
  },

  // ===================================================================== B2.2 units
  {
    id: 'units', unit: 'B2.2', title: 'Millimetres and micrometres', mins: 15,
    learn: [
      {
        h: 'mm and µm',
        html: `<div class="formula">1 mm = 1000 µm</div>
<ul><li>mm → µm: <b>× 1000</b></li><li>µm → mm: <b>÷ 1000</b></li></ul>
<p class="chain">m ×1000→ mm ×1000→ µm ×1000→ nm</p>
<p>µm is said "micrometre". Cells are usually measured in µm.</p>`,
      },
      {
        h: 'The three-step method',
        html: `<ol><li><b>Measure</b> the image with a ruler in <b>mm</b>.</li><li><b>Convert</b> mm to µm: <b>× 1000</b> (if the actual size is in µm).</li><li><b>Divide</b>: image ÷ actual.</li></ol>
<div class="ex"><b>Example.</b> A fly's eye is 1000 µm in real life. In the photo it measures 12 mm.<br>12 mm × 1000 = 12 000 µm<br>M = 12 000 ÷ 1000 = <b>×12</b></div>
<div class="ex"><b>Example.</b> A snowflake is 700 µm high. The photo is 55 mm high.<br>55 × 1000 = 55 000 µm; 55 000 ÷ 700 = <b>×78.6</b></div>
<div class="ex"><b>Finding the actual size in µm.</b> Image 30 mm, magnification ×1500.<br>A = 30 ÷ 1500 = 0.02 mm = 0.02 × 1000 = <b>20 µm</b></div>
<p class="tip"><b>Mistakes seen in your workbook:</b> 30 × 1000 is 30 000, not 3000 (count the zeros!). Divide the number you just converted, not an older one. And never write µm after a magnification.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'How many <b>µm</b> are in <b>1 mm</b>?', a: '1000 µm.' },
      { t: 'qa', q: 'To change <b>mm into µm</b>, do you multiply or divide by 1000?', a: '<b>Multiply</b> by 1000.' },
      { t: 'qa', q: 'To change <b>µm into mm</b>, do you multiply or divide by 1000?', a: '<b>Divide</b> by 1000.' },
      { t: 'calc', gen: 'mm2um' },
      { t: 'calc', gen: 'um2mm' },
      { t: 'calc', gen: 'mm2um' },
      { t: 'calc', gen: 'magMixed' },
      { t: 'calc', gen: 'magMixed' },
      { t: 'calc', gen: 'actualUm' },
      { t: 'calc', gen: 'actualUm' },
      { t: 'pts', q: 'Describe the <b>three steps</b> to find magnification when the actual size is given in µm.', p: ['measure the image in mm with a ruler', 'convert mm to µm by multiplying by 1000', 'divide image size by actual size'], need: 3 },
    ],
  },

  // ===================================================================== B3 diffusion
  {
    id: 'diffusion', unit: 'B3', title: 'Diffusion in living things', mins: 15,
    learn: [
      {
        h: 'What diffusion is',
        html: `<div class="def"><b>Diffusion</b> is the <b>net movement of particles</b> from a region of their <b>higher concentration</b> to a region of their <b>lower concentration</b> (down a <b>concentration gradient</b>), as a result of their <b>random movement</b>.</div>
<ul><li>It is <b>passive</b>: it needs <b>no energy</b> from the cell.</li><li>Some substances move into and out of cells by diffusion <b>through the cell membrane</b>.</li></ul>`,
      },
      {
        h: 'Why living things need it',
        html: `<ul>
<li><b>Lungs:</b> oxygen diffuses from the air in the alveoli (air sacs) into the blood; carbon dioxide diffuses from the blood into the alveoli.</li>
<li><b>Leaves:</b> carbon dioxide diffuses <b>in</b> through the stomata for photosynthesis; oxygen and water vapour diffuse <b>out</b>.</li>
<li><b>Cells:</b> oxygen and glucose diffuse in for respiration; waste products like carbon dioxide diffuse out.</li>
<li><b>Small intestine:</b> digested food diffuses into the blood.</li>
</ul>
<p class="tip">Your notebook calls gas exchange "respiration". Careful: swapping gases in the lungs is <b>gas exchange</b>; respiration is the reaction in cells.</p>`,
      },
      {
        h: 'What makes diffusion faster',
        html: `<table class="kv">
<tr><th>Surface area</th><td>larger surface area → faster</td></tr>
<tr><th>Temperature</th><td>higher temperature → faster, because particles have <b>more kinetic energy</b> and move faster</td></tr>
<tr><th>Concentration gradient</th><td>bigger difference in concentration → faster</td></tr>
<tr><th>Distance</th><td>shorter distance → faster (alveoli walls are only one cell thick)</td></tr>
</table>
<div class="ex"><b>Your class experiment:</b> at 13 °C the colour took 223 s to spread, at 23 °C 106 s, at 71 °C only 35 s. Higher temperature, faster diffusion.</div>`,
      },
    ],
    cards: [
      { t: 'pts', q: 'Define <b>diffusion</b>.', p: ['net movement of particles', 'from a region of higher concentration to a region of lower concentration (down a concentration gradient)', 'as a result of their random movement'], need: 3 },
      { t: 'qa', q: 'Does diffusion need <b>energy</b> from the cell?', a: '<b>No.</b> It is passive.' },
      { t: 'qa', q: 'What does "down a <b>concentration gradient</b>" mean?', a: 'From where there is a lot of a substance (high concentration) to where there is less (low concentration).' },
      { t: 'pts', q: 'Describe the movement of gases between the <b>alveoli</b> and the <b>blood</b>.', p: ['oxygen diffuses from the alveoli into the blood', 'carbon dioxide diffuses from the blood into the alveoli'], need: 2 },
      { t: 'pts', q: 'Which gases diffuse into and out of a leaf, and through what?', p: ['carbon dioxide diffuses in', 'oxygen and water vapour diffuse out', 'through the stomata'], need: 3 },
      { t: 'pts', q: 'State <b>four</b> factors that affect the rate of diffusion.', p: ['surface area', 'temperature', 'concentration gradient', 'distance'], need: 4 },
      { t: 'pts', q: 'Explain why diffusion is <b>faster at a higher temperature</b>.', p: ['particles have more (kinetic) energy', 'so they move faster'], need: 2 },
      { t: 'mcq', q: 'Which change makes diffusion <b>slower</b>?', o: ['A longer distance', 'A larger surface area', 'A higher temperature', 'A steeper concentration gradient'], why: 'The further particles have to go, the longer it takes.' },
      { t: 'mcq', q: 'Why are the walls of the alveoli only <b>one cell thick</b>?', o: ['Short distance, so faster diffusion', 'To make them stronger', 'To stop gases escaping', 'To store oxygen'], why: 'A shorter distance makes diffusion faster.' },
      { t: 'mcq', q: 'In a class experiment, the times for a colour to spread were 223 s at 13 °C, 106 s at 23 °C and 35 s at 71 °C. What do these show?', o: ['Higher temperature, faster diffusion', 'Higher temperature, slower diffusion', 'Temperature has no effect', 'Diffusion stops above 50 °C'], why: 'Less time = faster. Particles have more kinetic energy when hotter.' },
      { t: 'pts', q: 'Give <b>two</b> reasons why diffusion is important to living cells.', p: ['getting raw materials for respiration (oxygen, glucose)', 'removing waste products (carbon dioxide)', 'getting carbon dioxide for photosynthesis (plants)'], need: 2 },
      { t: 'qa', q: 'Is swapping oxygen and carbon dioxide in the lungs called <b>respiration</b>?', a: 'No, it is <b>gas exchange</b> (by diffusion). Respiration is the chemical reaction in cells that releases energy.' },
      { t: 'qa', q: 'Through which part of a cell do substances like oxygen and carbon dioxide <b>diffuse in and out</b>?', a: 'The <b>cell membrane</b>.' },
    ],
  },

  // ===================================================================== B3 osmosis
  {
    id: 'osmosis', unit: 'B3', title: 'Osmosis', mins: 20,
    learn: [
      {
        h: 'Osmosis is diffusion of water',
        html: `<div class="def">Water diffuses through <b>partially permeable membranes</b> by <b>osmosis</b>. Water moves into and out of cells by osmosis through the cell membrane.</div>
<div class="def"><b>Full definition:</b> osmosis is the <b>net movement of water molecules</b> from a region of <b>higher water potential</b> (dilute solution) to a region of <b>lower water potential</b> (concentrated solution), through a <b>partially permeable membrane</b>.</div>
<p><b>Partially permeable</b> (your teacher also says <i>selectively</i> or <i>semi-permeable</i>): the membrane has tiny holes. Small molecules like water get through; bigger ones like sugar do not.</p>
<p class="tip">Dilute = lots of water = <b>high water potential</b>. Concentrated = little water = <b>low water potential</b>. Water always goes from high to low water potential.</p>`,
      },
      {
        h: 'Plant cells in different solutions',
        html: `<table class="kv">
<tr><th>In water or a dilute (hypotonic) solution</th><td>water <b>enters</b> by osmosis, the vacuole swells, the cell pushes against the cell wall: the cell is <b>turgid</b>. The push is called <b>turgor pressure</b>. The cell wall stops it bursting.</td></tr>
<tr><th>In a concentrated (hypertonic) solution</th><td>water <b>leaves</b> by osmosis, the cell goes soft: <b>flaccid</b>. If a lot of water leaves, the membrane pulls away from the cell wall: <b>plasmolysis</b> (the cell is <b>plasmolysed</b>).</td></tr>
<tr><th>Same concentration (isotonic)</th><td>no net movement of water.</td></tr>
</table>
<p><b>Animal cells</b> have no cell wall. In pure water a red blood cell swells and <b>bursts</b>; in a concentrated solution it <b>shrinks</b>.</p>
<p><b>Why it matters:</b> roots take up water by osmosis. Turgid cells hold a plant upright. When cells become flaccid, the plant <b>wilts</b>.</p>`,
      },
      {
        h: 'The potato experiment',
        html: `<p>Cut equal potato pieces, measure them (mass or length), leave them in sugar solutions of different concentrations, then measure again.</p>
<div class="formula">% change = <span class="frac"><span>final − initial</span><span>initial</span></span> × 100</div>
<ul><li><b>Got bigger</b>: the solution was more dilute than the potato cells; water went <b>in</b>.</li><li><b>Got smaller</b>: the solution was more concentrated; water came <b>out</b>.</li><li><b>No change</b>: the solution matched the inside of the cells.</li></ul>
<div class="ex"><b>Your class results (average length, started at 20 mm):</b> 0% sugar 22 mm (+10%), 3% 23 mm (+15%), 6% about 21.7 mm (+8%), 12% 20 mm (0%), 20% 19 mm (−5%).<br>So the inside of the potato cells is about the same as a 12% sugar solution.</div>
<p class="tip">Keep these the same for a fair test: size of the pieces, volume of solution, time, temperature. Blot the pieces dry before measuring.</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'What is <b>osmosis</b>, in one line?', a: 'The diffusion of <b>water</b> through a <b>partially permeable membrane</b>.' },
      { t: 'pts', q: 'Give the <b>full definition</b> of osmosis.', p: ['net movement of water molecules', 'from higher water potential (dilute solution) to lower water potential (concentrated solution)', 'through a partially permeable membrane'], need: 3 },
      { t: 'qa', q: 'What does <b>partially permeable</b> mean?', a: 'It lets some molecules through (small ones like water) but not others (bigger ones like sugar).' },
      { t: 'mcq', q: 'Which has the <b>higher water potential</b>?', o: ['A dilute solution', 'A concentrated solution', 'They are the same', 'It depends on the temperature'], why: 'Dilute = more water = higher water potential.' },
      { t: 'mcq', q: 'In osmosis, water moves...', o: ['from higher to lower water potential', 'from lower to higher water potential', 'from concentrated to dilute solution', 'only into cells, never out'], why: 'From dilute (high water potential) to concentrated (low water potential).' },
      { t: 'pts', q: 'Describe what happens to a <b>plant cell</b> placed in <b>pure water</b>.', p: ['water enters by osmosis', 'vacuole swells / cell pushes against the cell wall', 'cell becomes turgid', 'cell wall stops it bursting'], need: 3 },
      { t: 'pts', q: 'Describe what happens to a <b>plant cell</b> in a <b>concentrated</b> sugar solution.', p: ['water leaves by osmosis', 'cell becomes flaccid', 'membrane pulls away from the cell wall: plasmolysis'], need: 3 },
      { t: 'qa', q: 'What does <b>turgid</b> mean?', a: 'Swollen and firm: the cell is full of water and pushes against its cell wall.' },
      { t: 'qa', q: 'What does <b>flaccid</b> mean?', a: 'Soft and floppy: the cell has lost water.' },
      { t: 'qa', q: 'What is <b>plasmolysis</b>?', a: 'When so much water leaves a plant cell that the <b>cell membrane pulls away from the cell wall</b>.' },
      { t: 'qa', q: 'What is <b>turgor pressure</b>?', a: 'The pressure of the swollen cell contents pushing out against the cell wall.' },
      { t: 'mcq', q: 'A red blood cell is put in pure water. What happens?', o: ['It swells and bursts', 'It shrinks', 'It becomes plasmolysed', 'Nothing'], why: 'Water enters by osmosis and there is no cell wall to stop it bursting.' },
      { t: 'mcq', q: 'Why does a plant cell in pure water <b>not burst</b>?', o: ['The cell wall is strong and holds it in', 'The membrane is fully permeable', 'The vacuole pushes water out', 'Plant cells cannot take in water'], why: 'The cellulose cell wall resists the turgor pressure.' },
      { t: 'mcq', q: 'A <b>hypertonic</b> solution has...', o: ['a higher solute concentration than the cell, so water moves out of the cell', 'a lower solute concentration than the cell, so water moves in', 'the same concentration, so no net movement', 'no water in it'], why: 'Hyper = more solute outside, so water leaves the cell.' },
      { t: 'mcq', q: 'A <b>hypotonic</b> solution has...', o: ['a lower solute concentration than the cell, so water moves into the cell', 'a higher solute concentration, so water moves out', 'the same concentration as the cell', 'only sugar in it'], why: 'Hypo = less solute outside (more dilute), so water goes in.' },
      { t: 'mcq', q: 'An <b>isotonic</b> solution...', o: ['has the same concentration as the cell, so no net movement of water', 'makes plant cells burst', 'makes plant cells plasmolysed', 'is always pure water'], why: 'Iso = same.' },
      { t: 'calc', gen: 'pctChange' },
      { t: 'calc', gen: 'pctChange' },
      { t: 'mcq', q: 'A potato piece <b>gained mass</b> in a sugar solution. What does that tell you?', o: ['The solution was more dilute than the potato cells, so water went in', 'The solution was more concentrated, so water went in', 'Sugar went into the potato', 'The potato cells were plasmolysed'], why: 'Water moved from the higher water potential (solution) into the cells.' },
      { t: 'mcq', q: 'Potato pieces in 0%, 3% and 6% sugar got longer; at 12% no change; at 20% shorter. What is the concentration inside the potato cells?', o: ['About 12%', 'About 0%', 'About 3%', 'About 20%'], why: 'No change means no net movement of water: same concentration as the cells.' },
      { t: 'pts', q: 'Name <b>three</b> things to keep the same in the potato experiment.', p: ['size (length/mass) of the potato pieces', 'volume of solution', 'time left in the solution', 'temperature'], need: 3 },
      { t: 'pts', q: 'Explain why a plant <b>wilts</b> when it does not get enough water.', p: ['water leaves the cells by osmosis', 'cells become flaccid', 'cells no longer push against each other, so the plant loses support'], need: 2 },
      { t: 'qa', q: 'How does water get into a <b>root hair cell</b>?', a: 'By <b>osmosis</b>: soil water is more dilute (higher water potential) than the cell sap.' },
      { t: 'qa', q: 'How does water move into and out of cells, and through which structure?', a: 'By <b>osmosis</b>, through the <b>cell membrane</b> (which is partially permeable).' },
      { t: 'pts', q: 'Your teacher listed <b>four</b> things that affect the rate of osmosis. Name them.', p: ['concentration gradient', 'permeability of the membrane', 'temperature', 'surface area'], need: 3 },
    ],
  },

  // ===================================================================== B3 active transport
  {
    id: 'active', unit: 'B3', title: 'Active transport', mins: 12,
    learn: [
      {
        h: 'Moving things the hard way',
        html: `<div class="def"><b>Active transport</b> is the movement of particles through a cell membrane from a region of <b>lower concentration</b> to a region of <b>higher concentration</b> (<b>against</b> a concentration gradient), using <b>energy from respiration</b>.</div>
<ul><li><b>Transport proteins</b> (carrier proteins) in the membrane pump the particles. They change shape, which needs energy (<b>ATP</b>) from respiration.</li>
<li>Cells that do a lot of active transport have <b>many mitochondria</b>.</li>
<li>If respiration stops (no oxygen, or a poison), active transport stops.</li></ul>`,
      },
      {
        h: 'Examples and the big comparison',
        html: `<ul><li><b>Root hair cells</b> take in <b>mineral ions</b> (like nitrate) from the soil, where the concentration is <b>lower</b> than inside the cell.</li>
<li><b>Small intestine</b>: when there is less glucose in the gut than in the blood, active transport keeps absorbing it, so no food is wasted.</li></ul>
<table class="grid3">
<tr><th></th><th>Diffusion</th><th>Osmosis</th><th>Active transport</th></tr>
<tr><td>What moves</td><td>any particles</td><td>water only</td><td>particles (ions, glucose)</td></tr>
<tr><td>Direction</td><td>high → low concentration</td><td>high → low water potential</td><td><b>low → high</b> concentration</td></tr>
<tr><td>Energy?</td><td>no</td><td>no</td><td><b>yes, from respiration</b></td></tr>
<tr><td>Membrane?</td><td>not needed</td><td>partially permeable</td><td>membrane with transport proteins</td></tr>
</table>`,
      },
    ],
    cards: [
      { t: 'pts', q: 'Define <b>active transport</b>.', p: ['movement of particles through a cell membrane', 'from lower to higher concentration (against the concentration gradient)', 'using energy from respiration'], need: 3 },
      { t: 'qa', q: 'Where does the <b>energy</b> for active transport come from?', a: '<b>Respiration</b> (released as ATP).' },
      { t: 'qa', q: 'What in the membrane actually moves the particles in active transport?', a: '<b>Transport (carrier) proteins</b>, which change shape using energy.' },
      { t: 'pts', q: 'Explain why <b>root hair cells</b> need active transport.', p: ['mineral ions (e.g. nitrate) are at a lower concentration in the soil than in the cell', 'so they must be moved against the concentration gradient', 'using energy from respiration'], need: 2 },
      { t: 'qa', q: 'Why do cells that carry out active transport have <b>many mitochondria</b>?', a: 'Mitochondria carry out respiration, which releases the <b>energy</b> active transport needs.' },
      { t: 'mcq', q: 'The roots of a plant are kept in soil with <b>no oxygen</b>. What happens to the uptake of mineral ions?', o: ['It decreases, because less respiration means less energy for active transport', 'It increases', 'It stays the same, because it is diffusion', 'It stops water uptake only'], why: 'No oxygen means less aerobic respiration, so less energy.' },
      { t: 'mcq', q: 'Which process moves particles <b>against</b> a concentration gradient?', o: ['Active transport', 'Diffusion', 'Osmosis', 'All three'], why: 'Only active transport goes from low to high, and it needs energy.' },
      { t: 'mcq', q: 'Which process needs <b>energy</b> from respiration?', o: ['Active transport', 'Diffusion', 'Osmosis', 'None of them'], why: 'Diffusion and osmosis are passive.' },
      { t: 'mcq', q: 'Oxygen moves from the alveoli into the blood. Which process?', o: ['Diffusion', 'Osmosis', 'Active transport', 'Excretion'], why: 'Gas moving from high to low concentration: diffusion.' },
      { t: 'mcq', q: 'Water moves from the soil into a root hair cell. Which process?', o: ['Osmosis', 'Excretion', 'Active transport', 'Transpiration'], why: 'Water through a partially permeable membrane: osmosis.' },
      { t: 'mcq', q: 'Nitrate ions move from the soil (low concentration) into a root hair cell (high concentration). Which process?', o: ['Active transport', 'Diffusion', 'Osmosis', 'Respiration'], why: 'Low to high = against the gradient = active transport.' },
      { t: 'mcq', q: 'Glucose is absorbed from the gut even when there is <b>less</b> glucose in the gut than in the blood. Which process?', o: ['Active transport', 'Diffusion', 'Osmosis', 'Excretion'], why: 'Against the gradient.' },
      { t: 'mcq', q: 'Carbon dioxide moves into a leaf through the stomata. Which process?', o: ['Diffusion', 'Active transport', 'Osmosis', 'Respiration'], why: 'Gas from high to low concentration.' },
    ],
  },

  // ===================================================================== C1 states of matter
  {
    id: 'states', unit: 'C1', title: 'Solids, liquids and gases', mins: 15,
    learn: [
      {
        h: 'Properties you can see',
        html: `<table class="grid3">
<tr><th></th><th>Solid</th><th>Liquid</th><th>Gas</th></tr>
<tr><td>Shape</td><td>fixed</td><td>takes the shape of its container</td><td>fills the whole container</td></tr>
<tr><td>Volume</td><td>fixed</td><td>fixed</td><td>not fixed</td></tr>
<tr><td>Flow?</td><td>no</td><td>yes</td><td>yes</td></tr>
<tr><td>Squash it?</td><td>no</td><td>hardly</td><td><b>easily</b> compressed</td></tr>
</table>
<p><b>Fluids</b> are liquids and gases, because they can flow: they can be poured or pumped from one container to another.</p>`,
      },
      {
        h: 'What the particles are doing',
        html: `${D.render('particles')}
<table class="kv">
<tr><th>Solid</th><td>particles <b>very close together</b>, in a <b>regular arrangement</b>, <b>vibrate</b> about fixed positions</td></tr>
<tr><th>Liquid</th><td>particles <b>close together</b>, <b>random arrangement</b>, <b>move around</b> (slide past) each other</td></tr>
<tr><th>Gas</th><td>particles <b>far apart</b>, <b>random arrangement</b>, move <b>quickly in all directions</b></td></tr>
</table>
<p><b>Kinetic particle theory:</b> all matter is made of tiny particles that are always moving. The particles are held together by <b>forces of attraction</b>. Gas pressure comes from particles hitting the walls of the container.</p>
<p class="tip">Gases can be squashed because there is lots of empty space between the particles. Solids cannot flow because their particles are stuck in fixed positions.</p>`,
      },
    ],
    cards: [
      { t: 'mcq', q: 'Which state has a <b>fixed volume</b> but <b>no fixed shape</b>?', o: ['Liquid', 'Solid', 'Gas', 'All of them'], why: 'A liquid takes the shape of its container but keeps its volume.' },
      { t: 'mcq', q: 'Which state can be <b>easily compressed</b>?', o: ['Gas', 'Liquid', 'Solid', 'None'], why: 'Gas particles are far apart, with lots of space.' },
      { t: 'mcq', q: 'Which states are <b>fluids</b>?', o: ['Liquids and gases', 'Solids and liquids', 'Only gases', 'Only liquids'], why: 'Both can flow (be poured or pumped).' },
      { t: 'pts', q: 'Describe the <b>arrangement and movement</b> of particles in a <b>solid</b>.', p: ['very close together', 'regular arrangement (pattern)', 'vibrate about fixed positions'], need: 3 },
      { t: 'pts', q: 'Describe the arrangement and movement of particles in a <b>liquid</b>.', p: ['close together', 'random arrangement', 'move around / slide past each other'], need: 3 },
      { t: 'pts', q: 'Describe the arrangement and movement of particles in a <b>gas</b>.', p: ['far apart', 'random arrangement', 'move quickly in all directions'], need: 3 },
      { t: 'mcq', q: 'Which state is shown?', img: 'particles:solid', o: ['Solid', 'Liquid', 'Gas', 'A mixture'], why: 'Particles touching in a regular pattern.' },
      { t: 'mcq', q: 'Which state is shown?', img: 'particles:liquid', o: ['Liquid', 'Solid', 'Gas', 'A mixture'], why: 'Particles touching but jumbled up.' },
      { t: 'mcq', q: 'Which state is shown?', img: 'particles:gas', o: ['Gas', 'Liquid', 'Solid', 'A mixture'], why: 'Particles far apart.' },
      { t: 'qa', q: 'Explain why a gas can be <b>compressed</b> but a solid cannot.', a: 'In a gas the particles are <b>far apart</b> with lots of space between them, so they can be pushed closer. In a solid they are already touching.' },
      { t: 'qa', q: 'What causes <b>gas pressure</b>?', a: 'Gas particles <b>hitting (colliding with) the walls</b> of the container.' },
      { t: 'qa', q: 'Why can a liquid <b>flow</b> but a solid cannot?', a: 'Liquid particles can <b>move past each other</b>. Solid particles only vibrate in <b>fixed positions</b>.' },
    ],
  },

  // ===================================================================== C1 changes of state
  {
    id: 'changes', unit: 'C1', title: 'Changes of state', mins: 15,
    learn: [
      {
        h: 'Five changes to know',
        html: `<table class="kv">
<tr><th>Melting</th><td>solid → liquid (at the melting point)</td></tr>
<tr><th>Freezing</th><td>liquid → solid (at the same temperature as melting, for a pure substance)</td></tr>
<tr><th>Boiling</th><td>liquid → gas, happens <b>throughout</b> the liquid (bubbles), only at the <b>boiling point</b></td></tr>
<tr><th>Evaporating</th><td>liquid → gas, only at the <b>surface</b>, at <b>any temperature</b> below the boiling point</td></tr>
<tr><th>Condensing</th><td>gas → liquid</td></tr>
</table>
<p>These are <b>physical changes</b>: they can be reversed and the substance stays the same substance. Chemical changes usually cannot be reversed.</p>`,
      },
      {
        h: 'Explaining it with particles',
        html: `<ul><li>Heating gives particles <b>more kinetic energy</b>; they vibrate or move faster. Energy is transferred <b>from the surroundings to the particles</b>.</li>
<li><b>Melting:</b> particles gain enough energy to <b>overcome</b> some of the <b>forces of attraction</b> and leave their fixed positions.</li>
<li><b>Boiling:</b> particles gain enough energy to overcome the forces completely and escape as a gas.</li>
<li><b>Condensing and freezing:</b> the opposite. Particles lose energy to the surroundings and the forces pull them back together.</li></ul>`,
      },
      {
        h: 'Heating curves',
        html: `${D.render('heating')}
<ul><li><b>A</b>: solid warming up</li><li><b>B</b>: flat, <b>melting</b>: solid and liquid together</li><li><b>C</b>: liquid warming up</li><li><b>D</b>: flat, <b>boiling</b>: liquid and gas together</li><li><b>E</b>: gas warming up</li></ul>
<p class="tip">Why is it flat while melting or boiling? The energy is being used to <b>overcome the forces of attraction</b> between particles, not to raise the temperature. </p>
<p><b>Cooling curve</b> (a gas cooling down): the line goes down in steps. The <b>first flat part is condensing</b> (gas to liquid), the <b>second flat part is freezing</b> (liquid to solid). The temperature stays constant there because <b>energy is released</b> as the forces of attraction between particles form again.</p>`,
      },
    ],
    cards: [
      { t: 'mcq', q: 'What is the change from <b>gas to liquid</b> called?', o: ['Condensing', 'Evaporating', 'Freezing', 'Melting'], why: 'Steam on a cold window condenses.' },
      { t: 'mcq', q: 'What is the change from <b>liquid to solid</b> called?', o: ['Freezing', 'Condensing', 'Melting', 'Boiling'], why: 'Water freezing into ice.' },
      { t: 'pts', q: 'Give <b>two</b> differences between <b>boiling</b> and <b>evaporating</b>.', p: ['boiling happens throughout the liquid; evaporation only at the surface', 'boiling happens only at the boiling point; evaporation happens at any temperature below it'], need: 2 },
      { t: 'pts', q: 'Explain what happens to the particles when a solid <b>melts</b>.', p: ['particles gain (kinetic) energy / vibrate more', 'they overcome (some of) the forces of attraction', 'they leave their fixed positions and can move around'], need: 2 },
      { t: 'pts', q: 'Explain why the temperature stays <b>constant</b> while a substance is boiling.', p: ['energy is being used to overcome the forces of attraction between particles', 'not to increase the kinetic energy / temperature'], need: 2 },
      { t: 'mcq', q: 'On this heating curve, which section shows <b>melting</b>?', img: 'heating', o: ['B', 'A', 'C', 'D'], keep: true, why: 'The first flat section: solid turning into liquid.' },
      { t: 'mcq', q: 'On this heating curve, which section shows <b>boiling</b>?', img: 'heating', o: ['D', 'B', 'C', 'E'], keep: true, why: 'The second flat section: liquid turning into gas.' },
      { t: 'mcq', q: 'On this heating curve, in which section is the substance <b>only a liquid</b>?', img: 'heating', o: ['C', 'A', 'B', 'E'], keep: true, why: 'Between melting (B) and boiling (D).' },
      { t: 'mcq', q: 'In which section are <b>solid and liquid</b> both present?', img: 'heating', o: ['B', 'A', 'C', 'D'], keep: true, why: 'During melting, both states are there.' },
      { t: 'mcq', q: 'When a liquid is <b>cooled</b>, the particles...', o: ['lose kinetic energy and move more slowly', 'gain kinetic energy', 'get smaller', 'stop being attracted to each other'], why: 'Energy goes from the particles to the surroundings.' },
      { t: 'qa', q: 'Are changes of state <b>physical</b> or <b>chemical</b> changes?', a: '<b>Physical.</b> They can be reversed and the particles themselves do not change, only their arrangement, movement and energy.' },
      { t: 'mcq', q: 'Puddles dry up on a day when the temperature is 20 °C. This is...', o: ['evaporation', 'boiling', 'condensation', 'melting'], why: 'Water turns to gas at the surface, well below 100 °C.' },
      { t: 'mcq', q: 'A gas is cooled until it becomes a solid. On the <b>cooling curve</b>, what is happening at the <b>first</b> flat section?', o: ['Condensing', 'Freezing', 'Boiling', 'Melting'], why: 'Cooling a gas: first it condenses into a liquid, then the liquid freezes.' },
      { t: 'mcq', q: 'On the same cooling curve, what is happening at the <b>second</b> flat section?', o: ['Freezing', 'Condensing', 'Evaporating', 'Melting'], why: 'The liquid turns into a solid.' },
      { t: 'pts', q: 'Explain why the temperature stays <b>constant</b> while a liquid is <b>freezing</b>.', p: ['energy is released (given out to the surroundings)', 'as the forces of attraction between particles form again'], need: 2 },
    ],
  },

  // ===================================================================== C1 gases + diffusion
  {
    id: 'gases', unit: 'C1', title: 'Gases and diffusion in chemistry', mins: 15,
    learn: [
      {
        h: 'Temperature and pressure change a gas',
        html: `<ul>
<li><b>Higher temperature</b> (pressure kept the same): the gas <b>expands</b>, its volume increases. Particles get more kinetic energy, move faster and hit the walls harder and more often, pushing them out.</li>
<li><b>Higher pressure</b> (temperature kept the same): the volume <b>decreases</b>. The particles are pushed closer together.</li>
<li>Heat a gas in a <b>sealed</b> container (volume fixed): the <b>pressure increases</b>, because the particles hit the walls harder and more often.</li>
</ul>`,
      },
      {
        h: 'Diffusion explained by particles',
        html: `<p>Particles move <b>randomly</b> and bump into each other. Over time they spread from where there are many (high concentration) to where there are few (low concentration) until they are evenly mixed. Examples: perfume spreading across a room, purple potassium manganate(VII) spreading through water.</p>
<ul><li>Diffusion is <b>faster in gases</b> than in liquids: gas particles move faster and have more space.</li>
<li><b>Higher temperature</b> → faster diffusion.</li>
<li><b>Lower relative molecular mass</b> (lighter particles) → faster diffusion.</li></ul>
<div class="ex"><b>Classic experiment.</b> Cotton wool with ammonia (NH<sub>3</sub>, M<sub>r</sub> = 17) at one end of a long tube, hydrogen chloride (HCl, M<sub>r</sub> = 36.5) at the other. A <b>white ring</b> of ammonium chloride forms <b>nearer the HCl end</b>, because the lighter ammonia particles move faster and travel further.</div>`,
      },
    ],
    cards: [
      { t: 'mcq', q: 'A gas is heated and its pressure is kept the same. What happens to its <b>volume</b>?', o: ['It increases', 'It decreases', 'It stays the same', 'It becomes a liquid'], why: 'Particles move faster and push the walls out.' },
      { t: 'mcq', q: 'The pressure on a gas is increased at constant temperature. What happens to its volume?', o: ['It decreases', 'It increases', 'It stays the same', 'It doubles'], why: 'The particles are pushed closer together.' },
      { t: 'pts', q: 'Explain, using particles, why the <b>pressure</b> in a sealed container rises when the gas is heated.', p: ['particles gain kinetic energy and move faster', 'they collide with the walls more often', 'and harder (with more force)'], need: 2 },
      { t: 'pts', q: 'Explain <b>diffusion</b> using the kinetic particle theory.', p: ['particles move randomly', 'they spread from high concentration to low concentration', 'until evenly mixed'], need: 2 },
      { t: 'qa', q: 'Why is diffusion <b>faster in a gas</b> than in a liquid?', a: 'Gas particles <b>move faster</b> and have <b>more space</b> between them.' },
      { t: 'mcq', q: 'Which gas diffuses <b>fastest</b>?', o: ['Hydrogen, H₂ (Mr 2)', 'Oxygen, O₂ (Mr 32)', 'Carbon dioxide, CO₂ (Mr 44)', 'Chlorine, Cl₂ (Mr 71)'], why: 'Lowest relative molecular mass = lightest = fastest.' },
      { t: 'mcq', q: 'Ammonia (Mr 17) and hydrogen chloride (Mr 36.5) are released at opposite ends of a tube. Where does the white ring form?', o: ['Nearer the hydrogen chloride end', 'Nearer the ammonia end', 'Exactly in the middle', 'No ring forms'], why: 'Ammonia is lighter, moves faster, so it travels further before they meet.' },
      { t: 'pts', q: 'Explain why the white ring forms nearer the hydrogen chloride end.', p: ['ammonia has a lower relative molecular mass (is lighter)', 'so its particles move (diffuse) faster', 'and travel further in the same time'], need: 2 },
      { t: 'mcq', q: 'What effect does raising the temperature have on the rate of diffusion?', o: ['It increases it', 'It decreases it', 'No effect', 'It stops diffusion'], why: 'Particles have more kinetic energy and move faster.' },
    ],
  },

  // ===================================================================== C12 apparatus + words
  {
    id: 'apparatus', unit: 'C12', title: 'Apparatus and solution words', mins: 15,
    learn: [
      {
        h: 'Which apparatus measures what',
        html: `<table class="kv">
<tr><th>Time</th><td><b>stop-watch</b> (seconds, s)</td></tr>
<tr><th>Temperature</th><td><b>thermometer</b> (°C)</td></tr>
<tr><th>Mass</th><td><b>balance</b> (grams, g)</td></tr>
<tr><th>Volume of a liquid</th><td><b>measuring cylinder</b>: quick, approximate<br><b>volumetric pipette</b>: one exact fixed volume, e.g. exactly 25.0 cm³<br><b>burette</b>: adds accurate, variable volumes, drop by drop (titrations)</td></tr>
<tr><th>Volume of a gas</th><td><b>gas syringe</b> (cm³)</td></tr>
</table>
<p><b>Fair test:</b> change one thing (independent variable), measure one thing (dependent variable), keep everything else the same (control variables). Repeat and take a mean.</p>`,
      },
      {
        h: 'Solution words',
        html: `<table class="kv">
<tr><th>Solvent</th><td>a substance that <b>dissolves</b> a solute (e.g. water)</td></tr>
<tr><th>Solute</th><td>a substance that <b>is dissolved</b> in a solvent (e.g. salt)</td></tr>
<tr><th>Solution</th><td>a mixture of one or more solutes dissolved in a solvent (e.g. salt water)</td></tr>
<tr><th>Saturated solution</th><td>a solution containing the <b>maximum concentration</b> of a solute dissolved in the solvent <b>at a specified temperature</b></td></tr>
<tr><th>Soluble / insoluble</th><td>dissolves / does not dissolve</td></tr>
<tr><th>Residue</th><td>a <b>solid</b> that <b>remains</b> after evaporation, distillation, filtration or a similar process</td></tr>
<tr><th>Filtrate</th><td>a <b>liquid or solution</b> that has <b>passed through a filter</b></td></tr>
</table>`,
      },
    ],
    cards: [
      { t: 'mcq', q: 'Which apparatus measures <b>exactly 25.0 cm³</b> of a liquid?', o: ['Volumetric pipette', 'Measuring cylinder', 'Beaker', 'Gas syringe'], why: 'A volumetric pipette delivers one fixed volume very accurately.' },
      { t: 'mcq', q: 'Which apparatus measures the <b>volume of gas</b> given off in a reaction?', o: ['Gas syringe', 'Burette', 'Volumetric pipette', 'Balance'], why: 'The plunger moves out as gas collects.' },
      { t: 'mcq', q: 'Which apparatus adds acid <b>drop by drop</b> and measures the volume added accurately?', o: ['Burette', 'Measuring cylinder', 'Gas syringe', 'Thermometer'], why: 'A burette has a tap and fine scale; used in titrations.' },
      { t: 'mcq', q: 'Which apparatus measures <b>mass</b>?', o: ['Balance', 'Measuring cylinder', 'Thermometer', 'Stop-watch'], why: 'Mass in grams on a balance.' },
      { t: 'mcq', q: 'Which apparatus gives a <b>quick, approximate</b> volume of a liquid?', o: ['Measuring cylinder', 'Burette', 'Volumetric pipette', 'Gas syringe'], why: 'Fast but less accurate than a pipette or burette.' },
      { t: 'pts', q: 'Name the apparatus to measure: (1) time, (2) temperature, (3) mass.', p: ['stop-watch', 'thermometer', 'balance'], need: 3 },
      { t: 'qa', q: 'Define <b>solvent</b>.', a: 'A substance that <b>dissolves</b> a solute.' },
      { t: 'qa', q: 'Define <b>solute</b>.', a: 'A substance that <b>is dissolved</b> in a solvent.' },
      { t: 'qa', q: 'Define <b>solution</b>.', a: 'A mixture of one or more solutes dissolved in a solvent.' },
      { t: 'pts', q: 'Define a <b>saturated solution</b>.', p: ['contains the maximum concentration of solute (no more can dissolve)', 'at a specified temperature'], need: 2 },
      { t: 'qa', q: 'Define <b>residue</b>.', a: 'A <b>solid</b> substance that <b>remains</b> after evaporation, distillation, filtration or a similar process.' },
      { t: 'qa', q: 'Define <b>filtrate</b>.', a: 'A <b>liquid or solution</b> that has <b>passed through a filter</b>.' },
      { t: 'mcq', q: 'In salt water, which is the <b>solvent</b>?', o: ['Water', 'Salt', 'Salt water', 'Neither'], why: 'Water dissolves the salt.' },
      { t: 'mcq', q: 'In salt water, which is the <b>solute</b>?', o: ['Salt', 'Water', 'Salt water', 'Air'], why: 'The salt is what gets dissolved.' },
      { t: 'mcq', q: 'Sand and water are filtered. What is the <b>sand</b> left in the filter paper called?', o: ['Residue', 'Filtrate', 'Solute', 'Solvent'], why: 'The solid that stays behind is the residue.' },
      { t: 'mcq', q: 'In an experiment on how temperature affects the time for sugar to dissolve, what is the <b>dependent</b> variable?', o: ['Time for the sugar to dissolve', 'Temperature', 'Mass of sugar', 'Volume of water'], why: 'The dependent variable is what you measure. Temperature is what you change (independent).' },
    ],
  },

  // ===================================================================== C12 separation
  {
    id: 'separation', unit: 'C12', title: 'Separating mixtures', mins: 20,
    learn: [
      {
        h: 'Pick the right method',
        html: `<table class="kv">
<tr><th>Insoluble solid from a liquid</th><td><b>Filtration.</b> The solid stays in the filter paper (residue); the liquid passes through (filtrate). Example: sand from water.</td></tr>
<tr><th>Soluble solid from its solution</th><td><b>Crystallisation</b> (or evaporation). Example: salt from salt water.</td></tr>
<tr><th>Pure liquid (solvent) from a solution</th><td><b>Simple distillation.</b> Example: pure water from sea water.</td></tr>
<tr><th>Liquids that mix, with different boiling points</th><td><b>Fractional distillation.</b> Example: ethanol (78 °C) from water (100 °C).</td></tr>
<tr><th>Two solids, one dissolves</th><td>Use a <b>suitable solvent</b> to dissolve one, then <b>filter</b>. Example: salt from sand.</td></tr>
<tr><th>Coloured substances in a dye or ink</th><td><b>Chromatography.</b></td></tr>
</table>`,
      },
      {
        h: 'Salt from sand, and crystallisation',
        html: `<p><b>Salt and sand</b> (your class practical):</p>
<ol><li>Add water and stir: the <b>salt dissolves</b>, the sand does not (insoluble).</li><li><b>Filter</b>: sand stays in the filter paper (residue), salt water passes through (filtrate).</li><li><b>Evaporate / crystallise</b> the filtrate to get the salt.</li></ol>
<p><b>Crystallisation</b> step by step:</p>
<ol><li>Heat the solution to <b>evaporate some of the water</b> until it is <b>saturated</b> (crystals form on a cold glass rod dipped in it).</li><li>Leave it to <b>cool</b>: crystals form.</li><li><b>Filter</b> off the crystals.</li><li><b>Wash</b> with a little cold distilled water and <b>dry</b> them (between filter papers).</li></ol>`,
      },
      {
        h: 'Distillation',
        html: `<p><b>Simple distillation</b> separates a pure liquid from a solution, by boiling the liquid and condensing the vapour.</p>
<ol><li>The solution is <b>heated until it boils</b>.</li><li>The pure liquid turns into <b>vapour</b> and leaves the flask.</li><li>The vapour is cooled in the <b>condenser</b> (cold water flows in at the bottom, out at the top) and turns back into a liquid.</li><li>The liquid is collected: it is called the <b>distillate</b>. The salt stays in the flask.</li></ol>
<p><b>Fractional distillation</b> separates liquids that mix, using a <b>fractionating column</b>. The liquid with the <b>lowest boiling point</b> reaches the top first and distils over first. The thermometer at the top shows the boiling point of what is being collected.</p>`,
      },
      {
        h: 'Is it pure?',
        html: `<ul><li>A <b>pure</b> substance melts and boils at <b>one sharp, fixed temperature</b>. Pure water melts at 0 °C and boils at 100 °C.</li>
<li><b>Impurities lower the melting point</b> and make it melt over a <b>range</b> of temperatures.</li>
<li><b>Impurities raise the boiling point.</b></li>
<li>To identify a substance, measure its melting point and compare with data.</li></ul>
<p class="tip">Why it matters: medicines and food must be pure, because impurities can be harmful.</p>`,
      },
    ],
    cards: [
      { t: 'mcq', q: 'How do you separate <b>sand from water</b>?', o: ['Filtration', 'Distillation', 'Chromatography', 'Crystallisation'], why: 'Sand is an insoluble solid.' },
      { t: 'mcq', q: 'How do you get <b>pure water</b> from sea water?', o: ['Simple distillation', 'Filtration', 'Crystallisation', 'Chromatography'], why: 'Boil the water off and condense it; the salt stays behind.' },
      { t: 'mcq', q: 'How do you get <b>salt crystals</b> from salt water?', o: ['Crystallisation', 'Filtration', 'Fractional distillation', 'Chromatography'], why: 'Salt is dissolved, so filtering will not catch it.' },
      { t: 'mcq', q: 'How do you separate <b>ethanol</b> (boils at 78 °C) from <b>water</b> (100 °C)?', o: ['Fractional distillation', 'Filtration', 'Crystallisation', 'Simple distillation'], why: 'Two liquids that mix, with different boiling points.' },
      { t: 'mcq', q: 'How do you find out which <b>dyes</b> are in a black ink?', o: ['Chromatography', 'Filtration', 'Distillation', 'Crystallisation'], why: 'Chromatography separates soluble coloured substances.' },
      { t: 'pts', q: 'Describe how to get <b>salt from a mixture of salt and sand</b>.', p: ['add water and stir so the salt dissolves', 'filter: sand is the residue, salt solution is the filtrate', 'evaporate / crystallise the filtrate to get salt'], need: 3 },
      { t: 'pts', q: 'Describe how to make <b>crystals</b> from a solution.', p: ['heat to evaporate some water until saturated', 'leave to cool so crystals form', 'filter off the crystals', 'wash with a little cold water and dry'], need: 3 },
      { t: 'pts', q: 'Describe <b>simple distillation</b> of salt water.', p: ['heat the solution until it boils', 'water turns to vapour and leaves the flask', 'vapour is cooled in the condenser and condenses', 'pure water (distillate) is collected; salt stays behind'], need: 3 },
      { t: 'qa', q: 'What is the liquid collected in distillation called?', a: 'The <b>distillate</b>.' },
      { t: 'qa', q: 'What is the <b>condenser</b> for in distillation?', a: 'It <b>cools the vapour</b> so it condenses back into a liquid.' },
      { t: 'mcq', q: 'In fractional distillation of ethanol and water, which liquid is collected <b>first</b>?', o: ['Ethanol, because it has the lower boiling point', 'Water, because it has the higher boiling point', 'Both at the same time', 'Whichever there is more of'], why: 'The lower boiling point liquid reaches the top of the column first.' },
      { t: 'mcq', q: 'A substance should melt at 80 °C. A sample melts between 74 °C and 78 °C. What does this show?', o: ['It is impure', 'It is pure', 'It has been heated too fast', 'It is a different state'], why: 'Impurities lower the melting point and make it melt over a range.' },
      { t: 'mcq', q: 'Salt is added to pure water. What happens to its <b>boiling point</b>?', o: ['It goes above 100 °C', 'It goes below 100 °C', 'It stays at 100 °C', 'The water cannot boil'], why: 'Impurities raise the boiling point.' },
      { t: 'qa', q: 'How can you tell a substance is <b>pure</b> from its melting point?', a: 'A pure substance melts at <b>one sharp, fixed temperature</b> that matches the data value. Impure substances melt <b>lower</b> and over a <b>range</b>.' },
      { t: 'mcq', q: 'A mixture contains salt and a white powder that is insoluble in water but soluble in ethanol. How could you separate them?', o: ['Add ethanol to dissolve the powder, then filter', 'Add water and boil', 'Use a magnet', 'Use fractional distillation'], why: 'Pick a solvent that dissolves only one of them, then filter.' },
      { t: 'qa', q: 'What is the melting point and boiling point of <b>pure water</b>?', a: 'Melts at <b>0 °C</b>, boils at <b>100 °C</b>.' },
      { t: 'mcq', q: 'A white solid melts sharply at 122 °C. Data book melting points: P 80 °C, Q 122 °C, R 135 °C. What is the solid?', o: ['Q, and it is pure', 'Q, but it is impure', 'R, and it is impure', 'P, and it is pure'], why: 'It matches Q, and a sharp melting point at exactly the data value means it is pure.' },
    ],
  },

  // ===================================================================== C12 chromatography
  {
    id: 'chrom', unit: 'C12', title: 'Chromatography', mins: 15,
    learn: [
      {
        h: 'How paper chromatography works',
        html: `<p>Paper chromatography separates mixtures of <b>soluble coloured substances</b> (like the dyes in ink, pigments in leaves, food colourings) using a <b>suitable solvent</b>.</p>
<ol><li>Draw a <b>start line in pencil</b> near the bottom of the paper. Pencil does not dissolve or run in the solvent (ink would).</li>
<li>Put small spots of the mixture and of known substances on the line.</li>
<li>Stand the paper in a beaker of solvent. The <b>solvent level must be below the start line</b>, otherwise the spots would dissolve into the solvent in the beaker.</li>
<li>The solvent soaks up the paper and carries the substances with it. Each substance travels a different distance.</li>
<li>Take the paper out before the solvent reaches the top, mark the <b>solvent front</b>, and let it dry.</li></ol>
<p>How far a substance moves depends on how well it <b>dissolves in the solvent</b> (the <b>mobile phase</b>) and its <b>attraction to the paper</b> (the <b>stationary phase</b>).</p>
<p class="tip">Careful: one line in your notebook plenary says "attraction to the mobile phase". It is the attraction to the <b>paper</b>, which is the <b>stationary</b> phase. The solvent is the mobile phase.</p>`,
      },
      {
        h: 'Reading a chromatogram',
        html: `${D.render('chrom')}
<ul><li><b>One spot</b> = a <b>pure</b> substance. <b>Two or more spots</b> = a <b>mixture</b> (impure).</li>
<li>If a spot in the unknown is at the <b>same height</b> as a known substance, it <b>is</b> that substance. Here X contains <b>A and C</b>.</li>
<li>A spot that stays on the start line (D) is <b>insoluble</b> in this solvent.</li></ul>
<div class="formula">R<sub>f</sub> = <span class="frac"><span>distance moved by substance</span><span>distance moved by solvent</span></span></div>
<p>Measure both from the <b>start line</b>. R<sub>f</sub> has no units and is always <b>less than 1</b> (a substance can never travel further than the solvent).</p>`,
      },
    ],
    cards: [
      { t: 'qa', q: 'What does paper chromatography separate?', a: 'Mixtures of <b>soluble coloured substances</b>, using a suitable solvent.' },
      { t: 'qa', q: 'Why is the start line drawn in <b>pencil</b>, not pen?', a: 'Pencil does <b>not dissolve</b> in the solvent, so it does not run up the paper. Ink would.' },
      { t: 'qa', q: 'Why must the solvent level be <b>below the start line</b>?', a: 'Otherwise the spots would <b>dissolve into the solvent</b> in the beaker instead of moving up the paper.' },
      { t: 'mcq', q: 'A substance gives <b>one spot</b> on a chromatogram. It is...', o: ['probably pure', 'a mixture', 'insoluble', 'the solvent'], why: 'One spot = one substance.' },
      { t: 'mcq', q: 'Look at the chromatogram. Which dyes are in mixture <b>X</b>?', img: 'chrom', o: ['A and C', 'A and B', 'B and D', 'A, B and C'], why: 'X has spots at the same heights as A and C.' },
      { t: 'mcq', q: 'Is mixture X pure?', img: 'chrom', o: ['No: it has two spots', 'Yes: it has one spot', 'Yes: it moved up the paper', 'Cannot tell'], why: 'More than one spot = mixture.' },
      { t: 'mcq', q: 'Which substance is <b>insoluble</b> in this solvent?', img: 'chrom', o: ['D', 'A', 'B', 'C'], why: 'D stayed on the start line: it did not dissolve, so the solvent could not carry it.' },
      { t: 'qa', q: 'Write the formula for the <b>R<sub>f</sub> value</b>.', a: 'R<sub>f</sub> = distance moved by substance ÷ distance moved by solvent (both from the start line).' },
      { t: 'calc', gen: 'rf' },
      { t: 'calc', gen: 'rf' },
      { t: 'qa', q: 'Why is an R<sub>f</sub> value always <b>less than 1</b>?', a: 'A substance can never travel further than the solvent that carries it.' },
      { t: 'pts', q: 'How far a substance travels depends on <b>two</b> things. What are they?', p: ['how well it dissolves in the solvent (mobile phase)', 'its attraction to the paper (stationary phase)'], need: 2 },
      { t: 'mcq', q: 'An unknown dye has R<sub>f</sub> = 0.45. Known dyes: red 0.30, blue 0.45, green 0.70 (same solvent). The unknown is...', o: ['blue', 'red', 'green', 'a mixture of red and green'], why: 'Same R<sub>f</sub> in the same solvent = same substance.' },
      { t: 'pts', q: 'Describe how to carry out paper chromatography of an ink.', p: ['draw a start line in pencil', 'put a spot of ink on the line', 'stand the paper in solvent with the solvent below the line', 'let the solvent move up, remove and mark the solvent front'], need: 3 },
      { t: 'qa', q: 'Name <b>two</b> uses of chromatography.', a: 'Any two: dyes in pen ink, pigments in leaves, food additives / colourings, crime investigation (forensics), checking purity of medicines.' },
    ],
  },
];

// Blank-paper recall ("blurting") checklists for a session together.
const BLURTS = [
  { unit: 'B1', prompt: 'The seven characteristics of living things, with definitions', points: ['all seven named', 'respiration: chemical reactions in cells, break down nutrient molecules, RELEASE energy', 'excretion: waste of metabolism + substances in excess', 'growth: permanent, size and dry mass', 'sensitivity: detect AND respond', 'nutrition: materials for energy, growth, development', 'reproduction: more of the same kind', 'movement: change of position or place'] },
  { unit: 'B2', prompt: 'Parts of cells: what each does and which cell has it', points: ['membrane, cytoplasm, nucleus, mitochondria, ribosomes in animal + plant', 'wall (cellulose), vacuole, chloroplasts in plant only', 'bacteria: wall (not cellulose), membrane, cytoplasm, ribosomes, circular DNA, plasmids', 'bacteria have no nucleus', 'function of each structure', 'new cells come from division of existing cells', 'not all plant cells have chloroplasts'] },
  { unit: 'B2', prompt: 'The seven specialised cells, and cell → organism', points: ['ciliated: trachea/bronchi, move mucus, cilia', 'root hair: absorption, large surface area', 'palisade: photosynthesis, many chloroplasts', 'neurone: electrical impulses, long', 'red blood cell: oxygen, haemoglobin, no nucleus, biconcave', 'sperm: flagellum, mitochondria, acrosome enzymes', 'egg: energy store, jelly coat', 'cell → tissue → organ → organ system → organism, with definitions', 'leaf is an organ: several tissues working together'] },
  { unit: 'B2.2', prompt: 'Magnification: formula, units and a worked example', points: ['M = image ÷ actual', 'triangle: I on top, A × M', 'same units before dividing', '1 mm = 1000 µm (mm → µm × 1000)', 'no units on magnification, write ×', 'total magnification = eyepiece × objective', 'drawing rules'] },
  { unit: 'B3', prompt: 'Diffusion, osmosis and active transport', points: ['diffusion definition (net, high → low, random movement)', 'diffusion needs no energy; examples lungs and leaves', 'four factors: surface area, temperature, gradient, distance', 'osmosis definition (water, high → low water potential, partially permeable)', 'turgid / flaccid / plasmolysis', 'animal cells burst, plant cell wall prevents it', 'potato experiment and % change', 'active transport: low → high, energy from respiration, transport proteins', 'root hair cells take in mineral ions by active transport'] },
  { unit: 'C1', prompt: 'States of matter and diffusion in chemistry', points: ['properties table (shape, volume, flow, compress)', 'particle arrangement + movement for each state', 'five changes of state named', 'boiling vs evaporation', 'heating curve: flat = changing state, energy overcomes forces', 'gas: hotter → bigger volume; more pressure → smaller volume', 'diffusion explained by random movement', 'lighter (lower Mr) diffuses faster; NH₃ and HCl ring'] },
  { unit: 'C12', prompt: 'Apparatus, solution words, separation and chromatography', points: ['stop-watch, thermometer, balance, measuring cylinder, pipette, burette, gas syringe', 'solvent, solute, solution, saturated, residue, filtrate', 'filtration, crystallisation, simple and fractional distillation: when to use each', 'salt from sand method', 'chromatography method: pencil line, solvent below line', 'one spot = pure; same height = same substance', 'Rf = substance ÷ solvent', 'pure: sharp melting point; impurities lower mp, raise bp'] },
];
