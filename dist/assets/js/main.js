/**
 * assets/js/main.js
 * -----------------
 * - i18n loader (basic - uses assets/i18n/en.json etc. if you add them)
 * - dynamic loader for 'events' and 'programmes' (Firestore preferred if window.FIREBASE_CONFIG exists)
 * - renders latest items on index; full lists on programmes.html/events.html
 * - contact form using EmailJS (config in assets/js/email-config.js)
 * - page-specific animation init hooks (no heavy libs)
 *
 * Admin -> update content:
 *  - Recommended: Firestore collections 'events' and 'programmes' with fields:
 *      { title, date (ISO), time (optional), place, description, youtube (optional) }
 *  - Fallback: static files content/events.json and content/programmes.json
 *
 * IMPORTANT: Ensure email-config.js is loaded before this file.
 */

/* global firebase, emailjs */
(function () {
  'use strict';

  // Helper: set footer year
  document.addEventListener('DOMContentLoaded', () => {
    ['year','year2','year3','year4'].forEach(id => {
      const el = document.getElementById(id); if (el) el && (el.textContent = new Date().getFullYear());
    });
  });

  // -------------------------
  // i18n (simple loader)
  // -------------------------
  const translations = {};
  let dict = null;
  async function loadLang(lang = 'en') {
    try {
      const r = await fetch(`assets/i18n/${lang}.json`, { cache: 'no-store' });
      if (!r.ok) throw new Error('i18n file not found');
      translations[lang] = await r.json();
      return translations[lang];
    } catch (err) {
      console.warn('i18n load failed', err);
      return null;
    }
  }
  async function applyLang(lang) {
    if (!translations[lang]) await loadLang(lang);
    dict = translations[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.documentElement.lang = (lang === 'ml') ? 'ml' : 'en';
    document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
  }
  document.addEventListener('DOMContentLoaded', async () => {
    await loadLang('en'); applyLang('en');
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', async () => { await loadLang(btn.dataset.lang); applyLang(btn.dataset.lang); }));
  });

  // -------------------------
  // Data fetching (Firestore or static)
  // -------------------------
  async function fetchFromFirestore(collectionName) {
    if (!window.FIREBASE_CONFIG) throw new Error('no FIREBASE_CONFIG');
    // lazy load firebase compat libraries if not present
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      await new Promise((resolve, reject) => {
        const s1 = document.createElement('script'); s1.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js';
        s1.onload = () => { const s2 = document.createElement('script'); s2.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js'; s2.onload = resolve; s2.onerror = reject; document.head.appendChild(s2); };
        s1.onerror = reject; document.head.appendChild(s1);
      });
    }
    try {
      if (!firebase.apps || firebase.apps.length === 0) firebase.initializeApp(window.FIREBASE_CONFIG);
      const db = firebase.firestore();
      const snapshot = await db.collection(collectionName).orderBy('date','desc').get();
      const items = []; snapshot.forEach(doc => items.push(Object.assign({ id: doc.id }, doc.data())));
      return items;
    } catch (err) {
      console.warn('Firestore fetch fail', err);
      throw err;
    }
  }

  async function fetchStatic(collectionName) {
    try {
      const res = await fetch(`content/${collectionName}.json`, { cache: 'no-store' });
      if (!res.ok) throw new Error('static not found');
      const json = await res.json();
      if (json[collectionName] && Array.isArray(json[collectionName])) return json[collectionName];
      if (Array.isArray(json.items)) return json.items;
      return [];
    } catch (err) {
      console.warn('static fetch fail', err);
      return [];
    }
  }

  async function fetchCollection(collectionName) {
    // prefer Firestore if configured
    if (window.FIREBASE_CONFIG) {
      try { const items = await fetchFromFirestore(collectionName); if (items && items.length) return items; } catch (err) { /* fallback */ }
    }
    return await fetchStatic(collectionName);
  }

  // -------------------------
  // Rendering helpers
  // -------------------------
  function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]); }

  function buildCard(item) {
    const date = item.date ? new Date(item.date) : null;
    const dateStr = date ? date.toLocaleDateString() + (item.time ? ' • ' + item.time : '') : (item.displayDate || '');
    const place = item.place ? `<div class="muted tiny">${escapeHtml(item.place)}</div>` : '';
    const desc = item.description ? `<p class="tiny muted">${escapeHtml(item.description)}</p>` : '';
    const ytBtn = item.youtube ? `<a class="btn ghost" href="${escapeHtml(item.youtube)}" target="_blank" rel="noopener noreferrer">Watch</a>` : '';
    return `
      <article class="card programme">
        <div>
          <h3>${escapeHtml(item.title || 'Untitled')}</h3>
          <div class="muted">${escapeHtml(dateStr)}</div>
          ${place}
          ${desc}
        </div>
        <div style="margin-top:.6rem">${ytBtn}</div>
      </article>
    `;
  }

  /* -----------------------------
     Dynamic render helpers (updated)
     - renderEmptyState: creative fallback UI when no items
     - renderLatest: shows up to 'limit' items or creative empty state
     - renderFull: shows full list or creative empty state
     ----------------------------- */

  /**
   * renderEmptyState(collectionName, selector, isIndex)
   * - collectionName: 'events' or 'programmes'
   * - selector: DOM selector string for container
   * - isIndex: boolean indicating if called on index page (affects CTA wording)
   *
   * This function renders a friendly illustration, explanation and CTAs
   * instead of a plain 'No items found' message.
   */
  function renderEmptyState(collectionName, selector, isIndex = false) {
    const container = document.querySelector(selector);
    if (!container) return;

    // friendly copy
    const title = (collectionName === 'events') ? 'No upcoming events yet' : 'No programmes scheduled';
    const sub = (collectionName === 'events')
      ? (isIndex ? 'We are planning more events — would you like to be first to know?' : 'No events are listed right now.')
      : (isIndex ? 'Programmes will appear here once scheduled. Want to suggest one?' : 'No programmes are listed right now.');

    // mailto CTA (quick join)
    const mailto = `mailto:mahanaimgospelteam@gmail.com?subject=${encodeURIComponent('Interest: ' + collectionName)}&body=${encodeURIComponent('Hi Mahanaim team,\n\nI am interested in your ' + collectionName + '. Please let me know when new items are scheduled.\n\nBlessings,\n')}`;

    // If FIREBASE_CONFIG exists we can show an admin hint
    const isFirestorePossible = !!window.FIREBASE_CONFIG;
    const isAdmin = !!window.IS_ADMIN; // you may set window.IS_ADMIN = true on admin pages

    // Build HTML (uses inline SVG for lightweight illustration)
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-illustration" aria-hidden="true">
          <!-- gentle brand-colour illustration: calendar + sparkles -->
          <svg width="120" height="96" viewBox="0 0 120 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="gA" x1="0" x2="1"><stop offset="0" stop-color="#FF6F00"/><stop offset="1" stop-color="#00B0FF"/></linearGradient>
            </defs>
            <rect x="6" y="16" width="84" height="64" rx="8" fill="rgba(255,255,255,0.03)"/>
            <rect x="8" y="18" width="80" height="12" rx="4" fill="url(#gA)" />
            <rect x="18" y="38" width="18" height="12" rx="3" fill="rgba(255,255,255,0.02)"/>
            <rect x="42" y="38" width="18" height="12" rx="3" fill="rgba(255,255,255,0.02)"/>
            <rect x="66" y="38" width="18" height="12" rx="3" fill="rgba(255,255,255,0.02)"/>
            <!-- sparkle -->
            <g transform="translate(96,12) rotate(18)">
              <path d="M2 8 L6 10 L10 8 L6 6 Z" fill="#FFB300" opacity="0.95"/>
              <path d="M6 2 L7 6 L11 7 L7 8 L6 12 L5 8 L1 7 L5 6 Z" fill="#00C853" opacity="0.9"/>
            </g>
          </svg>
        </div>

        <div class="empty-content">
          <h3>${title}</h3>
          <p>${sub}</p>

          <div class="empty-actions">
            <a class="btn primary" href="${mailto}" id="empty-mail">Join Mailing List</a>
            <button class="btn ghost" id="empty-suggest">Suggest an ${collectionName === 'events' ? 'Event' : 'Programme'}</button>
            ${isAdmin ? `<a class="btn ghost" href="admin.html">Open Admin</a>` : ''}
          </div>

          ${isFirestorePossible ? `<div class="empty-admin">Tip for organisers: Add items quickly via the Firebase Console or click <a href="admin.html">Admin</a> to use the admin tool.</div>` : `<div class="empty-helper">You can also <strong>suggest an idea</strong> via email or the contact form.</div>`}
        </div>
      </div>
    `;

    // Hook the Suggest button to scroll to contact form if present
    setTimeout(() => {
      const suggestBtn = document.getElementById('empty-suggest');
      if (suggestBtn) {
        suggestBtn.addEventListener('click', () => {
          const contact = document.getElementById('contact') || document.getElementById('contactForm');
          if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
          else window.location.href = 'index.html#contact';
        });
      }
      const mailBtn = document.getElementById('empty-mail');
      if (mailBtn) mailBtn.setAttribute('target','_blank');
    }, 60);
  }

  /**
   * renderLatest(collectionName, limit, selector)
   * - tries to fetch data; if empty -> creative empty state
   */
  async function renderLatest(collectionName, limit, selector) {
    const container = document.querySelector(selector);
    if (!container) return;
    container.innerHTML = '<div class="muted tiny">Loading…</div>';
    const items = await fetchCollection(collectionName);
    if (!items || items.length === 0) {
      // creative empty state on index
      renderEmptyState(collectionName, selector, true);
      return;
    }
    // Sort newest first and render slice
    items.sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
    const slice = items.slice(0, limit);
    container.innerHTML = slice.map(buildCard).join('');
  }

  /**
   * renderFull(collectionName, selector)
   * - renders full list or creative empty state if none exist
   */
  async function renderFull(collectionName, selector) {
    const container = document.querySelector(selector);
    if (!container) return;
    container.innerHTML = '<div class="muted tiny">Loading…</div>';
    const items = await fetchCollection(collectionName);
    if (!items || items.length === 0) {
      // creative empty state (not index)
      renderEmptyState(collectionName, selector, false);
      return;
    }
    items.sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
    container.innerHTML = items.map(buildCard).join('');
  }

  // -------------------------
  // Rendering and page logic
  // -------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const isIndex = path === '' || path === 'index.html';
    const isProgrammesPage = path.includes('programmes');
    const isEventsPage = path.includes('events');

    if (isIndex) {
      renderLatest('events', 3, '#events');
      renderLatest('programmes', 3, '#programmes-list');
    }
    if (isProgrammesPage) {
      renderFull('programmes', '#programmes-list');
    }
    if (isEventsPage) {
      renderFull('events', '#events');
    }

    // Native UI: show/hide mobile nav
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        mainNav.style.display = expanded ? '' : 'flex';
      });
    }

    // initialize page-specific animation helpers (non-blocking)
    try { initPageAnimations(); } catch (err) { console.warn('anim init failed', err); }
  });

  // -------------------------
  // Contact form via EmailJS
  // -------------------------
  const cfg = window.EMAIL_CONFIG || {};
  const emailJsConfigured = cfg.serviceId && cfg.templateId && cfg.publicKey;
  if (emailJsConfigured && typeof emailjs !== 'undefined') {
    try { emailjs.init(cfg.publicKey); } catch (err) { console.warn('emailjs init error', err); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      if (!name || !email || !message) { status.textContent = 'Please fill all fields.'; status.style.color = '#f66'; return; }
      status.textContent = 'Sending...'; status.style.color = '#999';
      const params = { from_name: name, from_email: email, message: message, to_email: cfg.destinationEmail || 'mahanaimgospelteam@gmail.com' };
      if (emailJsConfigured && typeof emailjs !== 'undefined') {
        try { await emailjs.send(cfg.serviceId, cfg.templateId, params); status.textContent = 'Thanks — your message was sent.'; status.style.color = '#0a6'; form.reset(); return; }
        catch (err) { console.warn('EmailJS send error', err); }
      }
      status.textContent = 'Unable to send from site. Please email mahanaimgospalteam@gmail.com'; status.style.color = '#f66';
    });
  });

  // -------------------------
  // Page animation initializers
  // -------------------------
  function initPageAnimations() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const isIndex = path === '' || path === 'index.html';
    const isProgrammesPage = path.includes('programmes');
    const isPastor = path.includes('pastor');
    const isChurch = path.includes('church');

    // index: gentle parallax on scroll for hero gradient (subtle)
    if (isIndex) {
      const hero = document.querySelector('.hero');
      if (hero) {
        window.addEventListener('scroll', () => {
          const rect = hero.getBoundingClientRect();
          const pct = Math.max(0, Math.min(1, 1 - (rect.top / (window.innerHeight * 0.6))));
          hero.style.setProperty('--hero-parallax', `${pct * 18}px`);
          const anim = document.querySelector('.hero-anim');
          if (anim) anim.style.transform = `translateY(${pct * -10}px)`;
        }, { passive: true });
      }
    }

    // programmes: animate wave speed on mouse move (desktop)
    if (isProgrammesPage && window.matchMedia('(hover: hover)').matches) {
      const banner = document.querySelector('.wave-banner');
      if (banner) {
        banner.addEventListener('mousemove', (e) => {
          const w = banner.clientWidth; const pct = (e.clientX / w - 0.5) * 2;
          const waves = banner.querySelectorAll('.wave');
          waves.forEach((wEl, i) => {
            const speed = 6 + (pct * (i+1) * 1.6);
            wEl.style.animationDuration = `${Math.abs(speed)}s`;
          });
        });
        banner.addEventListener('mouseleave', () => {
          const waves = banner.querySelectorAll('.wave');
          waves.forEach((wEl, i) => wEl.style.animationDuration = i===0 ? '6s':'9s');
        });
      }
    }

    // pastor: nothing heavy — CSS handles notes; add small interactions
    if (isPastor) {
      // handled in page-scoped script of pastor.html
    }

    // church: minor parallax movement for the map parallax background
    if (isChurch) {
      const mapWrap = document.querySelector('.map-wrap');
      if (mapWrap && window.matchMedia('(hover: hover)').matches) {
        mapWrap.addEventListener('mousemove', (e) => {
          const rect = mapWrap.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          const bg = mapWrap.querySelector('.parallax-bg');
          if (bg) bg.style.transform = `translate(${nx*8}px, ${ny*-8}px) scale(1.02)`;
        });
        mapWrap.addEventListener('mouseleave', () => {
          const bg = mapWrap.querySelector('.parallax-bg');
          if (bg) bg.style.transform = '';
        });
      }
    }
  }

  // expose small helpers for debugging
  window.mahanaim = { fetchCollection, renderLatest, renderFull };

})();
