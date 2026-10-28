/* ============================================================
   M&D Cakes — app.js
   Galería · Modal · Consulta · Slideshow · sessionStorage
   ============================================================ */

'use strict';

/* ── Datos de muestra con fotografías referenciales ────────── */
const products = [
  {
    id: 1,
    name: 'Pastel floral artesanal',
    category: 'Cumpleaños',
    description: 'Diseño floral delicado con acabado rústico en espátula. Tonos crema, acentos rosa empolvado y detalles en azúcar elaborados para celebraciones memorables.',
    alt: 'Pastel artesanal con flores delicadas y glaseado en crema suave — muestra referencial',
    image: 'assets/cake-floral.jpg',
  },
  {
    id: 2,
    name: 'Pastel temático contemporáneo',
    category: 'Celebraciones',
    description: 'Diseño moderno con drip satinado, macarons artesanales y toques dulces festivos. Ideal para aniversarios, cumpleaños y reuniones especiales.',
    alt: 'Pastel contemporáneo con macarons, merengues y acabado festivo — muestra referencial',
    image: 'assets/cake-tematico.jpg',
  },
  {
    id: 3,
    name: 'Pastel de boda / pisos elegantes',
    category: 'Bodas',
    description: 'Elegancia nupcial de dos pisos con textura satinada, cascada floral y sutiles toques dorados. Un centro de mesa sofisticado para tu gran día.',
    alt: 'Pastel de bodas de dos pisos con flores y detalles dorados — muestra referencial',
    image: 'assets/cake-boda.jpg',
  },
];

/* ── WhatsApp base ──────────────────────────────────────────── */
const WA_NUMBER = '50761795457';
function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
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
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const q = normalize(searchQuery).trim();
  const list = products.filter(p => {
    const matchFilter = activeFilter === 'Todos' || p.category === activeFilter;
    const matchSearch = !q || normalize(p.name).includes(q) || normalize(p.description).includes(q) || normalize(p.category).includes(q);
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
    card.innerHTML = `
      <button class="card-thumb" aria-label="Ver imagen de ${p.name}">
        <img src="${p.image}" alt="${p.alt}" loading="lazy">
        <span class="card-badge">${p.category}</span>
      </button>
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

    card.querySelector('.card-thumb').addEventListener('click', () => openModal(p.id));
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
    <div class="modal-thumb">
      <img src="${p.image}" alt="${p.alt}">
    </div>
    <div class="modal-info">
      <p class="category-label">${p.category}</p>
      <h2 id="dialog-title" tabindex="-1">${p.name}</h2>
      <p>${p.description}</p>
      <p class="modal-ref-note">M&D Cakes adapta cada detalle: colores, temática, dedicatoria y porciones para tu celebración.</p>
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
        <button class="button secondary" id="use-design">Personalizar esta idea</button>
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
    copyText(buildModalMsg());
  });

  document.getElementById('use-design').addEventListener('click', () => {
    document.getElementById('f-ref').value = p.name;
    document.getElementById('f-idea').value = notesEl.value.trim();
    updateConsultLink();
    modal.close();
    document.getElementById('consulta').scrollIntoView({behavior: motionQuery.matches ? 'instant' : 'smooth'});
    document.getElementById('f-ref').focus({preventScroll: true});
  });
  modal.showModal();
  document.body.classList.add('dialog-open');
  modal.querySelector('#dialog-title')?.focus();
}

closeBtn.addEventListener('click', () => modal.close());
modal.addEventListener('click', e => {
  const r = modal.getBoundingClientRect();
  if (e.target === modal && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) modal.close();
});
modal.addEventListener('close', () => document.body.classList.remove('dialog-open'));
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
  const current = products[heroIndex] || products[0];
  // Keep all three layers mounted: rapid navigation can reverse a crossfade.
  if (!heroPh.dataset.ready) {
    heroPh.innerHTML = products.map((p, i) => `<img class="hero-photo${i === heroIndex ? ' is-current' : ''}" src="${p.image}" alt="${p.alt}" width="800" height="1000" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} aria-hidden="${i !== heroIndex}">`).join('');
    heroPh.dataset.ready = 'true';
  }
  heroPh.querySelectorAll('img').forEach((img, i) => {
    img.classList.toggle('is-current', i === heroIndex);
    img.setAttribute('aria-hidden', String(i !== heroIndex));
  });
  if (slideCount) slideCount.textContent = `0${heroIndex + 1} / 0${HERO_COUNT}`;
  const figText = document.querySelector('figcaption > span');
  if (figText) figText.textContent = `${current.name} · Pastelería artesanal`;
}

prevBtn?.addEventListener('click', () => {
  heroIndex = (heroIndex - 1 + HERO_COUNT) % HERO_COUNT;
  updateHero();
});
nextBtn?.addEventListener('click', () => {
  heroIndex = (heroIndex + 1) % HERO_COUNT;
  updateHero();
});

// Manual navigation keeps the visitor in control.
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
  document.getElementById('message-preview').textContent = buildConsultMsg();
}

// Set minimum date to today
const dateInput = document.getElementById('f-date');
if (dateInput) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  dateInput.min = today;
}

// Live update on input
consultForm?.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', updateConsultLink);
});
updateConsultLink();

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); showToast('¡Consulta copiada!'); }
  catch { showToast('No se pudo copiar. Usa el enlace de WhatsApp.'); }
}
copyConsult?.addEventListener('click', () => {
  if (consultForm.reportValidity()) copyText(buildConsultMsg());
});
waConsult.addEventListener('click', e => { if (!consultForm.reportValidity()) e.preventDefault(); });
consultForm.addEventListener('reset', e => {
  e.preventDefault();
  consultForm.querySelectorAll('input, textarea').forEach(field => { field.value = ''; });
  updateConsultLink();
});
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
function closeMenu() { menuToggle.setAttribute('aria-expanded','false'); mainNav.classList.remove('is-open'); }
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open)); mainNav.classList.toggle('is-open',open);
});
mainNav.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && mainNav.classList.contains('is-open')) {closeMenu();menuToggle.focus();} });

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

/* Motion direction: a celebratory opening, then contextual feedback. */
const motionEase = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim();
const activeMotion = new Set();
let keyboardMotion = false;
document.addEventListener('keydown', () => { keyboardMotion = true; document.body.classList.add('keyboard-motion'); });
document.addEventListener('pointerdown', () => { keyboardMotion = false; document.body.classList.remove('keyboard-motion'); }, {passive:true});
function playMotion(element, frames, options = {}) {
  if (!element || motionQuery.matches || keyboardMotion || !element.animate) return;
  const animation = element.animate(frames, {duration:500,easing:motionEase,...options});
  activeMotion.add(animation);
  animation.finished.catch(() => {}).finally(() => activeMotion.delete(animation));
  return animation;
}
function stopMotion() {
  activeMotion.forEach(animation => animation.cancel());
  activeMotion.clear();
}
motionQuery.addEventListener('change', () => { if (motionQuery.matches) stopMotion(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });

// A single opening sequence; content remains visible if JS is unavailable.
playMotion(document.getElementById('hero-title'), [{transform:'translateY(12px)',opacity:.65},{transform:'none',opacity:1}], {duration:650});
playMotion(document.querySelector('.photo-frame'), [{transform:'scale(.97)',opacity:.7},{transform:'scale(1)',opacity:1}], {duration:800});
document.querySelectorAll('.cake-spark').forEach((star,i) => {
  playMotion(star, [
    {transform:'rotate(-25deg) scale(.75)',opacity:.25},
    {transform:'rotate(12deg) scale(1.12)',opacity:1,offset:.45},
    {transform:'rotate(0deg) scale(1)',opacity:.8}
  ], {duration:2200,delay:160+i*180});
});

// Each composition gets one entrance. No blanket animation of every section.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (entry.target.id === 'products') {
        entry.target.querySelectorAll('.card-thumb').forEach((card,i) => {
          playMotion(card,[{transform:'translateY(12px)',opacity:.65},{transform:'none',opacity:1}],{duration:500,delay:i*70});
        });
      } else if (entry.target.classList.contains('steps')) {
        entry.target.classList.add('steps-connected');
      } else {
        playMotion(entry.target.querySelector('h2'),[{transform:'translateY(8px)',opacity:.65},{transform:'none',opacity:1}],{duration:600});
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('#products,.steps,.closing').forEach(el => observer.observe(el));
}

// Disclosure feedback never moves inputs or delays keyboard interaction.
document.querySelectorAll('.faq-list details,.message-preview').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) playMotion(details.querySelector('p,pre'),[{opacity:.5,transform:'translateY(-4px)'},{opacity:1,transform:'none'}],{duration:200});
  });
});
filtersEl.addEventListener('click', e => {
  if (e.target.closest('button')) playMotion(productsEl,[{opacity:.6},{opacity:1}],{duration:150});
});
