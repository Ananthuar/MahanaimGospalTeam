/**
 * assets/js/buttons.js
 * --------------------
 * Adds:
 *  - ripple effect on click/touch
 *  - gentle 3D tilt on pointer move for elements with class ".tilt-enabled"
 *
 * Usage:
 *  - Add 'tilt-enabled' class to any .btn to enable tilt
 *  - Primary buttons often include 'tilt-enabled' and optionally 'pulse' classes
 *
 * No external dependencies.
 */
(function () {
  'use strict';

  // Utility: create and animate ripple
  function createRipple(ev, btn) {
    const rect = btn.getBoundingClientRect();
    let x = 0, y = 0;
    if (ev.touches && ev.touches.length) {
      x = ev.touches[0].clientX - rect.left;
      y = ev.touches[0].clientY - rect.top;
    } else if (ev.clientX !== undefined) {
      x = ev.clientX - rect.left;
      y = ev.clientY - rect.top;
    } else {
      x = rect.width / 2; y = rect.height / 2;
    }

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

  // Attach ripple to buttons on pointerdown
  document.addEventListener('pointerdown', function (e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    if (btn.disabled || btn.classList.contains('disabled')) return;
    createRipple(e, btn);
  }, { passive: true });

  // TILT EFFECT
  const tiltMap = new WeakMap();

  function onPointerMove(e) {
    const btn = e.currentTarget;
    if (!btn.classList.contains('tilt-enabled')) return;
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
    document.querySelectorAll('.btn.tilt-enabled').forEach(el => {
      if (el.__tiltInit) return;
      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerleave', onPointerLeave);
      el.__tiltInit = true;
    });
  }

  // Initialize on DOM ready and watch for future additions
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTilt);
  else initTilt();

  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.addedNodes && m.addedNodes.length) { initTilt(); break; }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

})();
