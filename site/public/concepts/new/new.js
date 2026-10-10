// Fence Wizards homepage concept: small, dependency-free behaviour.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu (below 1180px)
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    var setMenu = function (open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    };
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
  }

  // Hero reel: the poster paints first; the video file loads after, sized to the screen.
  // Reduced motion keeps the poster only.
  var video = document.querySelector('.reel');
  var toggle = document.querySelector('.reel-toggle');
  if (video && !reduce) {
    var src = window.matchMedia('(min-width: 1000px) and (min-resolution: 1.5dppx), (min-width: 1500px)').matches
      ? video.dataset.srcLg : video.dataset.srcSm;
    var start = function () {
      video.src = src;
      video.preload = 'auto';
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked: poster stays */ });
      if (toggle) toggle.hidden = false;
    };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var paused = toggle.getAttribute('aria-pressed') === 'true';
        if (paused) { video.play(); } else { video.pause(); }
        toggle.setAttribute('aria-pressed', String(!paused));
        toggle.querySelector('.sr').textContent = paused ? 'Pause video' : 'Play video';
      });
    }
    // Pause when the hero is off screen (saves battery and data)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!video.src || (toggle && toggle.getAttribute('aria-pressed') === 'true')) return;
          if (en.isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause();
        });
      }, { threshold: 0.1 }).observe(video);
    }
  }

  // Scroll reveal (IntersectionObserver, no scroll listeners). Siblings get a short stagger.
  var reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    reveals.forEach(function (el) {
      var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [];
      el.style.setProperty('--i', Math.max(0, sibs.indexOf(el)) % 5);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Fence types index: hovering or focusing an item swaps the photo frame
  var items = document.querySelectorAll('.index-item');
  var frames = document.querySelectorAll('.index-frame img');
  var activate = function (i) {
    items.forEach(function (it, n) { it.classList.toggle('is-active', n === i); });
    frames.forEach(function (im, n) { im.classList.toggle('is-active', n === i); });
  };
  items.forEach(function (it, n) {
    it.addEventListener('mouseenter', function () { activate(n); });
    it.addEventListener('focusin', function () { activate(n); });
  });

  // Quote form: concept only, never sends anything
  var form = document.querySelector('.form');
  if (form) {
    var status = form.querySelector('.form-status');
    var messages = { name: 'Add your name so Richard knows who to ask for.', phone: 'Add a phone number Richard can call back.', location: 'Add a city or address for the job.' };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      ['name', 'phone', 'location'].forEach(function (name) {
        var input = form.elements[name];
        var err = document.getElementById(input.getAttribute('aria-describedby').split(' ').pop());
        var bad = !input.value.trim();
        input.setAttribute('aria-invalid', String(bad));
        err.textContent = bad ? messages[name] : '';
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) { status.textContent = ''; status.classList.remove('show'); firstBad.focus(); return; }
      status.textContent = 'Concept preview: this form isn’t connected.';
      status.classList.add('show');
    });
  }

  var y = document.querySelector('.year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
