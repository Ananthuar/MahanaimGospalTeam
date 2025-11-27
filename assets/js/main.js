/**
 * assets/js/main.js
 * -----------------
 * Main client-side logic for Mahanaim site.
 *
 * Responsibilities:
 *  - set footer years
 *  - mobile nav toggle
 *  - i18n loader (data-i18n / data-i18n-placeholder)
 *  - dynamic events loader (Firestore preferred, falls back to content/events.json)
 *  - contact form handling using EmailJS (preferred) with graceful fallback
 *
 * Requirements:
 *  - assets/js/email-config.js must be loaded before this file (it exposes window.EMAIL_CONFIG)
 *  - EmailJS SDK is loaded in the page via CDN (index.html includes it)
 *  - Optional: FIREBASE_CONFIG if you want Firestore events (not required)
 */

/* global firebase, emailjs */
document.addEventListener('DOMContentLoaded', function () {
  // -------------------------
  // Footer years
  // -------------------------
  const yearIds = ['year','year2','year3','year4'];
  const y = new Date().getFullYear();
  yearIds.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = y; });

  // -------------------------
  // Mobile nav toggle
  // -------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'flex';
    });
  }

  // -------------------------
  // i18n loader (data-i18n, data-i18n-placeholder)
  // -------------------------
  let translations = {};
  let currentDict = null;

  async function loadLang(lang) {
    try {
      const resp = await fetch(`assets/i18n/${lang}.json`, { cache: 'no-store' });
      if (!resp.ok) throw new Error('Language file not found');
      translations[lang] = await resp.json();
      return translations[lang];
    } catch (err) {
      console.warn('i18n load failed', err);
      return null;
    }
  }

  async function applyLang(lang) {
    const dict = translations[lang] || await loadLang(lang);
    if (!dict) return;
    currentDict = dict;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.documentElement.lang = (lang === 'ml') ? 'ml' : 'en';
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lang = btn.dataset.lang;
      if (!translations[lang]) await loadLang(lang);
      applyLang(lang);
    });
  });

  // initialize with English
  loadLang('en').then(() => applyLang('en')).catch(()=>{ /* ignore errors */ });

  // -------------------------
  // Dynamic events loader (Firestore preferred, fallback to static)
  // -------------------------
  function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }

  async function fetchEventsFromStatic() {
    try {
      const res = await fetch('content/events.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Static events not found');
      const data = await res.json();
      return Array.isArray(data.events) ? data.events : [];
    } catch (err) {
      console.warn('Static events fetch failed', err);
      return [];
    }
  }

  async function fetchEventsFromFirestore() {
    if (!window.FIREBASE_CONFIG) throw new Error('FIREBASE_CONFIG not present');
    if (typeof firebase === 'undefined' || !firebase.firestore) {
      // lazy load compat SDKs
      await new Promise((resolve, reject) => {
        const s1 = document.createElement('script');
        s1.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js';
        s1.onload = () => {
          const s2 = document.createElement('script');
          s2.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js';
          s2.onload = resolve; s2.onerror = reject; document.head.appendChild(s2);
        };
        s1.onerror = reject; document.head.appendChild(s1);
      });
    }
    try { if (!firebase.apps || firebase.apps.length === 0) firebase.initializeApp(window.FIREBASE_CONFIG); } catch (err) { /* ignore */ }
    const db = firebase.firestore();
    const snapshot = await db.collection('events').orderBy('date','asc').get();
    const events = []; snapshot.forEach(doc => events.push(doc.data())); return events;
  }

  function buildEventsHtml(events) {
    if (!events || events.length === 0) return '<p class="muted tiny">No events scheduled yet.</p>';
    events.sort((a,b)=> new Date(a.date) - new Date(b.date));
    return events.map(ev => {
      const displayDate = ev.displayDate || (ev.date ? new Date(ev.date).toLocaleDateString() : '');
      return `<div class="events-list"><li>
        <time datetime="${escapeHtml(ev.date||'')}">${escapeHtml(displayDate)}</time>
        <div><strong>${escapeHtml(ev.title||'')}</strong><span class="muted"> – ${escapeHtml(ev.place||'')}</span><p class="tiny muted">${escapeHtml(ev.description||'')}</p></div>
      </li></div>`;
    }).join('');
  }

  async function renderEvents() {
    const container = document.querySelector('#events');
    if (!container) return;
    try {
      const events = await fetchEventsFromFirestore();
      if (events && events.length) { container.innerHTML = buildEventsHtml(events); return; }
    } catch (err) {
      // Firestore unavailable or not configured — fallback below
    }
    const staticEvents = await fetchEventsFromStatic();
    if (staticEvents && staticEvents.length) { container.innerHTML = buildEventsHtml(staticEvents); return; }
    container.innerHTML = `<h2 data-i18n="events_title">Events</h2><p class="small muted">Events are not available right now.</p>`;
  }

  renderEvents();
  window.renderEvents = renderEvents; // expose for debugging

  // -------------------------
  // Contact form: EmailJS integration + fallback
  // -------------------------
  const cfg = window.EMAIL_CONFIG || {};
  const emailJsConfigured = cfg.serviceId && cfg.templateId && cfg.publicKey;
  const formspreeEndpoint = cfg.formspreeEndpoint || null; // optional fallback if you added it

  // Initialize EmailJS if configured and the library is present
  if (emailJsConfigured && typeof emailjs !== 'undefined') {
    try {
      emailjs.init(cfg.publicKey);
      console.info('EmailJS initialized');
    } catch (err) {
      console.warn('EmailJS init error', err);
    }
  }

  // Contact form DOM refs
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.textContent = '';
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      // validation
      if (!name || !email || !message) {
        status.textContent = currentDict?.form_fill_error || 'Please fill all fields before sending.';
        status.style.color = '#f66'; return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = currentDict?.form_email_error || 'Please provide a valid email address.';
        status.style.color = '#f66'; return;
      }

      status.textContent = currentDict?.form_sending || 'Sending...';
      status.style.color = '#999';

      // prepare template parameters for EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: cfg.destinationEmail || 'mahanaimgospelteam@gmail.com'
      };

      // Try EmailJS (preferred)
      if (emailJsConfigured && typeof emailjs !== 'undefined') {
        try {
          await emailjs.send(cfg.serviceId, cfg.templateId, templateParams);
          status.textContent = currentDict?.form_success || 'Thank you — your message was sent.';
          status.style.color = '#0a6';
          form.reset(); return;
        } catch (err) {
          console.warn('EmailJS send failed', err);
        }
      }

      // Optional: try Formspree fallback if you configured an endpoint in EMAIL_CONFIG
      if (formspreeEndpoint) {
        try {
          const res = await fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, message })
          });
          if (res.ok) {
            status.textContent = currentDict?.form_success || 'Thank you — your message was sent.';
            status.style.color = '#0a6';
            form.reset(); return;
          } else {
            console.warn('Formspree response not ok', res.status);
          }
        } catch (err) {
          console.warn('Formspree send failed', err);
        }
      }

      // If we reach here, everything failed — show manual fallback
      status.innerHTML = 'Unable to send message from the site. Please email <a href="mailto:mahanaimgospelteam@gmail.com">mahanaimgospelteam@gmail.com</a>';
      status.style.color = '#f66';
    });
  } // end contact form

  // -------------------------
  // Social buttons setup
  // -------------------------
  (function setupSocialButtons() {
    // Replace the links below with your actual channel / invite links
    const youtube = document.getElementById('btn-youtube');
    const whatsapp = document.getElementById('btn-whatsapp');
    const directions = document.getElementById('btn-directions');
    const directions2 = document.getElementById('btn-directions-2');

    if (youtube) youtube.href = 'https://www.youtube.com/your-channel'; // <-- Replace
    if (whatsapp) whatsapp.href = 'https://chat.whatsapp.com/YOUR_INVITE_LINK'; // <-- Replace
    if (directions) directions.href = 'https://www.google.com/maps/place/Mahanaim+Worship+Center'; // <-- Replace
    if (directions2) directions2.href = 'https://www.google.com/maps/place/Mahanaim+Worship+Center'; // same
  })();

}); // DOMContentLoaded end
