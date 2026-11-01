/* MrClean website scripts
   1. Phone menu: open and close the menu with the menu button
   2. Active link: highlight the menu link of the section being viewed
   The site still works if this file fails to load. */

(function () {
  'use strict';

  // Lets the CSS know scripts are running (the phone menu is hidden only then)
  document.documentElement.classList.add('js');

  // ---------- 1. Phone menu ----------
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    // Close the menu after tapping a link
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    // Close with the Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });

    // Reset when the window becomes wide (for example, a phone turned sideways)
    window.matchMedia('(min-width: 769px)').addEventListener('change', function () {
      setMenu(false);
    });
  }

  // ---------- 2. Active link while scrolling ----------
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var linkById = {};
  links.forEach(function (link) {
    linkById[link.getAttribute('href').slice(1)] = link;
  });

  if ('IntersectionObserver' in window && links.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove('active'); });
        linkById[entry.target.id].classList.add('active');
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    Object.keys(linkById).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
