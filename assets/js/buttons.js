/**
 * assets/js/buttons.js
 * --------------------
 * - Provides ripple effect on pointerdown
 * - Provides gentle 3D tilt (pointermove) for elements with .tilt-enabled
 * - Disables tilt on touch devices or narrow viewports
 *
 * Lightweight, dependency-free.
 */
(function () {
  'use strict';

  // heuristics for touch device
  function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);
  }
  function isLargeEnoughForTilt() { return window.innerWidth >= 900; }
  function shouldEnableTilt() { if (isTouchDevice() && !isLargeEnoughForTilt()) return false; return true; }

  // RIPPLE
  function createRipple(ev, btn) {
    const rect = btn.getBoundingClientRect();
    let x = 0, y = 0;
    if (ev.touches && ev.touches.length) { x = ev.touches[0].clientX - rect.left; y = ev.touches[0].clientY - rect.top; }
    else if (ev.clientX !== undefined) { x = ev.clientX - rect.left; y = ev.clientY - rect.top; }
    else { x = rect.width / 2; y = rect.height / 2; }

    const ripple = document.createElement('span');
    ripple.className = 'ripple ripple-animate';
    const size = Math.max(rect.width, rect.height) * 1.6;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 1200);
  }

  document.addEventListener('pointerdown', function (e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    if (btn.disabled || btn.classList.contains('disabled')) return;
    createRipple(e, btn);
  }, { passive: true });

  // TILT
  const tiltMap = new WeakMap();
  function onPointerMove(e) {
    const btn = e.currentTarget;
    if (!btn.classList.contains('tilt-enabled')) return;
    if (!shouldEnableTilt()) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    const clamp = v => Math.max(-1, Math.min(1, v));
    const tiltX = clamp(-ny) * 6;
    const tiltY = clamp(nx) * 8;
    if (tiltMap.get(btn)) cancelAnimationFrame(tiltMap.get(btn));
    const raf = requestAnimationFrame(() => {
      btn.style.transform = `translateZ(0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      btn.style.boxShadow = `0 ${14 + Math.abs(tiltY)}px ${28 + Math.abs(tiltX)}px rgba(6,10,20,0.45)`;
    });
    tiltMap.set(btn, raf);
  }
  function onPointerLeave(e) {
    const btn = e.currentTarget;
    if (tiltMap.get(btn)) cancelAnimationFrame(tiltMap.get(btn));
    btn.style.transform = '';
    btn.style.boxShadow = '';
  }

  function initTilt() {
    const enable = shouldEnableTilt();
    document.querySelectorAll('.btn.tilt-enabled').forEach(el => {
      if (el.__tiltInit && !enable) {
        el.removeEventListener('pointermove', onPointerMove); el.removeEventListener('pointerleave', onPointerLeave); el.__tiltInit = false; return;
      }
      if (el.__tiltInit) return;
      if (enable) { el.addEventListener('pointermove', onPointerMove); el.addEventListener('pointerleave', onPointerLeave); el.__tiltInit = true; }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTilt); else initTilt();
  let resizeTimer = null; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(initTilt, 160); });

  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) { if (m.addedNodes && m.addedNodes.length) { initTilt(); break; } }
  });
  mo.observe(document.body, { childList: true, subtree: true });

})();
