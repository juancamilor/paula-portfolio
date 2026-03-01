/* === Paula González — v03 Fashion Editorial === */
(function () {
  'use strict';

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Scroll reveal --- */
  var reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    var trigger = window.innerHeight * 0.88;
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('is-visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);

  /* --- Card hover class (CSS-driven zoom, JS adds class) --- */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mouseenter', function () { this.classList.add('is-hovered'); });
    card.addEventListener('mouseleave', function () { this.classList.remove('is-hovered'); });
  });

  /* --- Lightbox --- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var closeBtn = lightbox.querySelector('.lightbox__close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Portfolio image';
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      var src = this.getAttribute('data-src');
      var alt = this.querySelector('img').alt;
      if (src) openLightbox(src, alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
