/* ============================================================
   M&D Cakes — app.js
   Galería · Modal · Consulta · Slideshow · sessionStorage
   ============================================================ */

'use strict';

/* ── Datos de muestra ───────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: 'Pastel floral',
    category: 'Cumpleaños',
    description: 'Diseño floral delicado con detalles artesanales. Pétalos y hojas elaborados a mano para dar vida a cada celebración.',
    alt: 'Pastel decorado con flores y colores suaves — imagen referencial',
  },
  {
    id: 2,
    name: 'Pastel temático',
    category: 'Celebraciones',
    description: 'Un diseño personalizado para cada temática especial. Cuéntanos qué imaginas y M&D Cakes lo hará realidad.',
    alt: 'Pastel con decoración personalizada para celebración — imagen referencial',
  },
  {
    id: 3,
    name: 'Pastel de boda',
    category: 'Bodas',
    description: 'Elegancia y personalización para el día más especial. Varios pisos, detalles únicos y acabados artesanales.',
    alt: 'Pastel de varios pisos con decoración elegante — imagen referencial',
  },
];

/* ── WhatsApp base ──────────────────────────────────────────── */
const WA_NUMBER = '50761795457';
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ── Placeholders SVG por pastel ────────────────────────────── */
function cardSVG(id) {
  const configs = {
    1: {
      bg: '#f8eef1', accent: '#3e829a', secondary: '#c996a5', tier: '#fcfaf8',
      label: 'Pastel floral',
      deco: `
        <circle cx="60" cy="55" r="12" fill="#c996a5" opacity="0.4"/>
        <circle cx="140" cy="45" r="8"  fill="#3e829a" opacity="0.3"/>
        <circle cx="100" cy="30" r="5"  fill="#d91d4a" opacity="0.4"/>
        <ellipse cx="80"  cy="62" rx="7" ry="5" fill="#3e829a" opacity="0.25"/>
        <ellipse cx="120" cy="58" rx="6" ry="4" fill="#c996a5" opacity="0.35"/>`,
    },
    2: {
      bg: '#edf5f7', accent: '#3e829a', secondary: '#b8895a', tier: '#ffffff',
      label: 'Pastel temático',
      deco: `
        <rect x="48" y="42" width="18" height="14" rx="3" fill="#3e829a" opacity="0.25"/>
        <rect x="134" y="38" width="14" height="18" rx="3" fill="#c996a5" opacity="0.25"/>
        <circle cx="100" cy="28" r="6" fill="#d91d4a" opacity="0.4"/>
        <polygon points="72,65 80,52 88,65" fill="#5c321e" opacity="0.2"/>`,
    },
    3: {
      bg: '#fdf8f4', accent: '#5c321e', secondary: '#c996a5', tier: '#ffffff',
      label: 'Pastel de boda',
      deco: `
        <circle cx="55"  cy="48" r="9"  fill="#c996a5" opacity="0.4"/>
        <circle cx="145" cy="52" r="7"  fill="#3e829a" opacity="0.3"/>
        <circle cx="100" cy="30" r="4"  fill="#d91d4a" opacity="0.45"/>
        <rect x="88" y="65" width="24" height="3" rx="1.5" fill="#3e829a" opacity="0.35"/>`,
    },
  };
  const c = configs[id] || configs[1];
  return `
    <svg viewBox="0 0 200 160" aria-hidden="true" role="img">
      <rect width="200" height="160" fill="${c.bg}" rx="4"/>
      ${c.deco}
      <!-- Pisos del pastel -->
      <rect x="70" y="100" width="60" height="18" rx="4" fill="${c.secondary}" opacity="0.7"/>
      <rect x="78" y="82"  width="44" height="20" rx="4" fill="${c.tier}"/>
      <rect x="84" y="66"  width="32" height="18" rx="4" fill="${c.secondary}" opacity="0.6"/>
      <!-- Topping -->
      <circle cx="100" cy="62" r="6" fill="${c.accent}" opacity="0.6"/>
      <!-- Etiqueta referencial -->
      <text x="100" y="134" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5"
            fill="#8a6858" opacity="0.9">Imagen referencial · M&amp;D Cakes</text>
    </svg>`;
}

function heroSVG(id) {
  const configs = {
    0: {
      bg: '#f8eef1', accent: '#3e829a', tier1: '#ffffff', tier2: '#c996a5', tier3: '#f8eef1',
      label: 'Pastel floral',
      petals: `
        <circle cx="100" cy="72" r="10" fill="#d91d4a" opacity="0.6"/>
        <circle cx="88"  cy="78" r="7"  fill="#c996a5" opacity="0.6"/>
        <circle cx="112" cy="78" r="7"  fill="#c996a5" opacity="0.6"/>
        <circle cx="82"  cy="68" r="5"  fill="#3e829a" opacity="0.4"/>
        <circle cx="118" cy="68" r="5"  fill="#3e829a" opacity="0.4"/>`,
    },
    1: {
      bg: '#edf5f7', accent: '#3e829a', tier1: '#ffffff', tier2: '#b8895a', tier3: '#edf5f7',
      label: 'Pastel temático',
      petals: `
        <rect x="84" y="64" width="32" height="16" rx="4" fill="#3e829a" opacity="0.35"/>
        <circle cx="100" cy="70" r="8" fill="#d91d4a" opacity="0.5"/>
        <rect x="88" y="62" width="8" height="10" rx="2" fill="#5c321e" opacity="0.3"/>
        <rect x="104" y="62" width="8" height="10" rx="2" fill="#5c321e" opacity="0.3"/>`,
    },
    2: {
      bg: '#fdf8f4', accent: '#5c321e', tier1: '#ffffff', tier2: '#c996a5', tier3: '#fdf8f4',
      label: 'Pastel de boda',
      petals: `
        <circle cx="100" cy="70" r="9" fill="#c996a5" opacity="0.7"/>
        <ellipse cx="86" cy="75" rx="5" ry="7" fill="#3e829a" opacity="0.4"/>
        <ellipse cx="114" cy="75" rx="5" ry="7" fill="#3e829a" opacity="0.4"/>
        <circle cx="100" cy="64" r="4" fill="#b8895a" opacity="0.5"/>`,
    },
  };
  const c = configs[id] || configs[0];
  return `
    <svg viewBox="0 0 200 260" aria-hidden="true" role="img">
      <rect width="200" height="260" fill="${c.bg}" rx="12"/>
      <!-- Layers -->
      <rect x="50" y="180" width="100" height="30" rx="6" fill="${c.tier2}" opacity="0.8"/>
      <rect x="60" y="152" width="80"  height="30" rx="6" fill="${c.tier1}"/>
      <rect x="70" y="126" width="60"  height="28" rx="6" fill="${c.tier2}" opacity="0.7"/>
      <rect x="80" y="104" width="40"  height="24" rx="6" fill="${c.tier1}"/>
      ${c.petals}
      <!-- Plate -->
      <ellipse cx="100" cy="210" rx="60" ry="6" fill="${c.accent}" opacity="0.2"/>
      <!-- Labels -->
      <text x="100" y="232" text-anchor="middle" font-family="Arial,sans-serif"
            font-size="8" fill="#8a6858">Fotografía referencial</text>
      <text x="100" y="245" text-anchor="middle" font-family="Arial,sans-serif"
            font-size="7" fill="#b8895a">Sustituir por foto de M&amp;D Cakes</text>
    </svg>`;
}

/* ── State ──────────────────────────────────────────────────── */
const STORAGE_KEY = 'md-cakes-selection';
let activeFilter = 'Todos';
let searchQuery  = '';
let heroIndex    = 0;

/* ── DOM refs ───────────────────────────────────────────────── */
const productsEl  = document.getElementById('products');
const emptyEl     = document.getElementById('empty');
const resultCount = document.getElementById('result-count');
const filtersEl   = document.getElementById('filters-container');
const searchEl    = document.getElementById('search');
const modal       = document.getElementById('modal');
const detailEl    = document.getElementById('detail');
const closeBtn    = document.getElementById('close');
const toastEl     = document.getElementById('toast');
const heroPh      = document.getElementById('hero-ph');
const slideCount  = document.getElementById('slide-count');
const prevBtn     = document.getElementById('prev');
const nextBtn     = document.getElementById('next');
const consultForm = document.getElementById('consult-form');
const waConsult   = document.getElementById('wa-consult');
const copyConsult = document.getElementById('copy-consult');

/* ── Filters ────────────────────────────────────────────────── */
function buildFilters() {
  const cats = ['Todos', ...new Set(products.map(p => p.category))];
  cats.forEach(cat => {
    if (filtersEl.querySelector(`[data-filter="${cat}"]`)) return;
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.filter = cat;
    btn.setAttribute('aria-pressed', cat === activeFilter ? 'true' : 'false');
    if (cat === activeFilter) btn.classList.add('active');
    btn.addEventListener('click', () => {
      activeFilter = cat;
      filtersEl.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === cat);
        b.setAttribute('aria-pressed', b.dataset.filter === cat ? 'true' : 'false');
      });
      renderProducts();
    });
    filtersEl.appendChild(btn);
  });
}

/* ── Render products ────────────────────────────────────────── */
function renderProducts() {
  const q = searchQuery.toLowerCase().trim();
  const list = products.filter(p => {
    const matchFilter = activeFilter === 'Todos' || p.category === activeFilter;
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  productsEl.innerHTML = '';
  emptyEl.hidden = list.length > 0;
  productsEl.hidden = list.length === 0;
  resultCount.textContent = list.length
    ? `${list.length} diseño${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}`
    : '';

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver detalles de ${p.name}`);
    card.innerHTML = `
      <div class="card-thumb" aria-label="${p.alt}">
        ${cardSVG(p.id)}
        <span class="card-badge">${p.category}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
      <div class="card-footer">
        <a class="card-wa"
           href="${waLink(`Hola, M&D Cakes. Vi el diseño "${p.name}" en su página y me gustaría consultarlo.`)}"
           target="_blank" rel="noopener"
           aria-label="Consultar ${p.name} por WhatsApp"
           onclick="event.stopPropagation()">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.5 0C5.149 0 0 5.149 0 11.5c0 2.064.546 3.999 1.498 5.676L.028 23.25l6.196-1.455A11.47 11.47 0 0011.5 23C17.851 23 23 17.851 23 11.5S17.851 0 11.5 0zm0 21.072c-1.87 0-3.607-.512-5.08-1.402l-.364-.218-3.673.862.905-3.567-.237-.38A9.524 9.524 0 011.928 11.5C1.928 6.21 6.21 1.928 11.5 1.928S21.072 6.21 21.072 11.5 16.79 21.072 11.5 21.072z"/>
          </svg>
          Consultar
        </a>
        <button class="card-details" data-id="${p.id}">Ver detalles</button>
      </div>`;

    card.addEventListener('click', () => openModal(p.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p.id); } });
    card.querySelector('.card-details').addEventListener('click', e => { e.stopPropagation(); openModal(p.id); });
    productsEl.appendChild(card);
  });

  // Save to sessionStorage
  try {
    const sel = { filter: activeFilter, query: searchQuery, ts: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
  } catch (_) { /* no-op if blocked */ }
}

/* ── Modal ──────────────────────────────────────────────────── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  detailEl.innerHTML = `
    <div class="modal-thumb">${cardSVG(p.id)}</div>
    <div class="modal-info">
      <p class="eyebrow">${p.category}</p>
      <h2 id="dialog-title">${p.name}</h2>
      <p>${p.description}</p>
      <p class="modal-ref-note">Imagen y descripción referenciales. M&D Cakes lo personalizará según tus ideas.</p>
    </div>
    <div class="modal-form">
      <label>
        Detalles adicionales <span class="optional">(opcional)</span>
        <textarea id="modal-notes" maxlength="400" rows="3"
          placeholder="Colores, temática, nombre del festejado, fecha del evento u otro detalle que quieras compartir…"></textarea>
      </label>
      <div class="modal-actions">
        <a class="button" id="modal-wa" href="#" target="_blank" rel="noopener">
          Consultar por WhatsApp ↗
        </a>
        <button class="button secondary" id="modal-copy">Copiar consulta</button>
      </div>
    </div>`;

  const modalWa   = document.getElementById('modal-wa');
  const modalCopy = document.getElementById('modal-copy');
  const notesEl   = document.getElementById('modal-notes');

  function buildModalMsg() {
    let msg = `Hola, M&D Cakes. Vi el diseño "${p.name}" (${p.category}) en su página y me gustaría consultarlo.`;
    const notes = notesEl.value.trim();
    if (notes) msg += `\n\nDetalles adicionales: ${notes}`;
    return msg;
  }

  function updateModalLink() {
    modalWa.href = waLink(buildModalMsg());
  }

  notesEl.addEventListener('input', updateModalLink);
  updateModalLink();

  modalCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(buildModalMsg()).then(() => showToast('¡Consulta copiada!')).catch(() => showToast('No se pudo copiar'));
  });

  modal.showModal();
  modal.querySelector('#dialog-title')?.focus();
}

closeBtn.addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
modal.addEventListener('keydown', e => { if (e.key === 'Escape') modal.close(); });

/* ── Search ─────────────────────────────────────────────────── */
searchEl.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderProducts();
});

document.getElementById('reset')?.addEventListener('click', () => {
  activeFilter = 'Todos';
  searchQuery  = '';
  searchEl.value = '';
  filtersEl.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === 'Todos');
    b.setAttribute('aria-pressed', b.dataset.filter === 'Todos' ? 'true' : 'false');
  });
  renderProducts();
});

/* ── Hero slideshow ─────────────────────────────────────────── */
const HERO_COUNT = 3;

function updateHero() {
  if (!heroPh) return;
  heroPh.innerHTML = heroSVG(heroIndex);
  if (slideCount) slideCount.textContent = `0${heroIndex + 1} / 0${HERO_COUNT}`;
}

prevBtn?.addEventListener('click', () => {
  heroIndex = (heroIndex - 1 + HERO_COUNT) % HERO_COUNT;
  updateHero();
});
nextBtn?.addEventListener('click', () => {
  heroIndex = (heroIndex + 1) % HERO_COUNT;
  updateHero();
});

// Auto-advance only if user does not prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroTimer = null;
if (!prefersReducedMotion) {
  heroTimer = setInterval(() => {
    heroIndex = (heroIndex + 1) % HERO_COUNT;
    updateHero();
  }, 6000);
}

// Pause/reset on manual interaction
[prevBtn, nextBtn].forEach(btn => {
  btn?.addEventListener('click', () => {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = setInterval(() => {
        heroIndex = (heroIndex + 1) % HERO_COUNT;
        updateHero();
      }, 7000);
    }
  });
});

/* ── Consulta form ──────────────────────────────────────────── */
function buildConsultMsg() {
  const ref   = document.getElementById('f-ref')?.value.trim()   || '';
  const date  = document.getElementById('f-date')?.value         || '';
  const qty   = document.getElementById('f-qty')?.value.trim()   || '';
  const idea  = document.getElementById('f-idea')?.value.trim()  || '';

  let parts = ['Hola, M&D Cakes. Vi su página y me gustaría consultar por un pastel personalizado.'];
  if (ref)  parts.push(`\nReferencia o diseño: ${ref}`);
  if (date) parts.push(`Fecha deseada: ${date}`);
  if (qty)  parts.push(`Cantidad aprox. de personas: ${qty}`);
  if (idea) parts.push(`Idea de personalización: ${idea}`);
  return parts.join('\n');
}

function updateConsultLink() {
  if (!waConsult) return;
  waConsult.href = waLink(buildConsultMsg());
}

// Set minimum date to today
const dateInput = document.getElementById('f-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// Live update on input
consultForm?.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', updateConsultLink);
});
updateConsultLink();

copyConsult?.addEventListener('click', () => {
  navigator.clipboard.writeText(buildConsultMsg())
    .then(() => showToast('¡Consulta copiada al portapapeles!'))
    .catch(() => showToast('No se pudo copiar. Inténtalo manualmente.'));
});

/* ── Toast ──────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ── Restore session ────────────────────────────────────────── */
function restoreSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const sel = JSON.parse(raw);
    // Expire after 30 min
    if (Date.now() - sel.ts > 30 * 60 * 1000) { sessionStorage.removeItem(STORAGE_KEY); return; }
    if (sel.filter && sel.filter !== 'Todos') activeFilter = sel.filter;
    if (sel.query) { searchQuery = sel.query; if (searchEl) searchEl.value = sel.query; }
  } catch (_) { /* ignore */ }
}

/* ── Init ───────────────────────────────────────────────────── */
restoreSession();
buildFilters();
renderProducts();
updateHero();
