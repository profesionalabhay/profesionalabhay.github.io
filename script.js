(function () {
  'use strict';

  // --- PRELOADER ---
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () { preloader.classList.add('hidden'); }, 600);
    }
    initCounters();
  });

  // --- PARTICLES ---
  function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 40; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 3 + 2) + 'px';
      p.style.height = p.style.width;
      p.style.animationDuration = (Math.random() * 15 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }
  createParticles();

  // --- HERO METRIC COUNTERS ---
  function animateHeroMetrics() {
    var metrics = document.querySelectorAll('.hero-metric-value[data-count]');
    metrics.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'));
      var duration = 1500;
      var steps = 25;
      var stepTime = duration / steps;
      var current = 0;
      var increment = target / steps;
      function update() {
        current += increment;
        if (current >= target) { el.textContent = target; return; }
        el.textContent = Math.round(current);
        setTimeout(update, stepTime);
      }
      update();
    });
  }
  setTimeout(animateHeroMetrics, 600);

  // --- NAVBAR ---
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
    updateActiveNav();
  });

  navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
  navAnchors.forEach(function (a) { a.addEventListener('click', function () { navLinks.classList.remove('open'); }); });

  function updateActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var current = '';
    sections.forEach(function (s) {
      var top = s.offsetTop - 150;
      var bottom = top + s.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) { current = s.getAttribute('id'); }
    });
    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) { a.classList.add('active'); }
    });
  }
  updateActiveNav();

  // --- SCROLL REVEAL ---
  function initReveal() {
    var els = document.querySelectorAll('.section-header, .solution-card, .showcase-card, .gallery-item, .why-card, .impact-tile, .demo-card, .roadmap-item, .arch-layer, .contact-card, .case-item, .cta-box');
    function check() {
      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) { el.classList.add('visible'); }
      });
    }
    els.forEach(function (el) { el.classList.add('reveal'); });
    window.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    check();
  }
  initReveal();

  // --- GALLERY FILTER + SEARCH ---
  function initGallery() {
    var filterBtns = document.querySelectorAll('.gallery-filter');
    var items = document.querySelectorAll('.gallery-item');
    var searchInput = document.getElementById('gallerySearch');
    var emptyMsg = document.getElementById('galleryEmpty');

    function filterGallery() {
      var activeFilter = document.querySelector('.gallery-filter.active');
      var filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      var search = searchInput ? searchInput.value.toLowerCase().trim() : '';
      var visibleCount = 0;

      items.forEach(function (item) {
        var cat = item.getAttribute('data-category');
        var title = item.querySelector('.gallery-info h4')?.textContent.toLowerCase() || '';
        var desc = item.querySelector('.gallery-info span')?.textContent.toLowerCase() || '';
        var tag = item.querySelector('.gallery-tag')?.textContent.toLowerCase() || '';
        var matchesFilter = filter === 'all' || cat === filter;
        var matchesSearch = search === '' || title.indexOf(search) !== -1 || desc.indexOf(search) !== -1 || tag.indexOf(search) !== -1;

        if (matchesFilter && matchesSearch) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (emptyMsg) {
        emptyMsg.classList.toggle('visible', visibleCount === 0);
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filterGallery();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterGallery);
    }
  }
  initGallery();

  // --- LIGHTBOX ---
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImage');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var viewBtns = document.querySelectorAll('.gallery-view');
    var currentIndex = -1;
    var images = [];

    function buildImageList() {
      images = [];
      document.querySelectorAll('.gallery-view').forEach(function (btn) {
        var img = btn.getAttribute('data-img');
        if (img) images.push(img);
      });
    }
    buildImageList();

    function openLightbox(index) {
      currentIndex = index;
      var imgSrc = images[currentIndex];
      if (!imgSrc) return;
      lightboxImg.setAttribute('src', imgSrc);
      var parent = viewBtns[currentIndex]?.closest('.gallery-item');
      var title = parent?.querySelector('.gallery-info h4')?.textContent || 'Solution Screenshot';
      lightbox.querySelector('.lightbox-title').textContent = title;
      lightbox.querySelector('.lightbox-download').setAttribute('href', imgSrc);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    viewBtns.forEach(function (btn, idx) {
      btn.addEventListener('click', function () { openLightbox(idx); });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      var next = currentIndex + dir;
      if (next >= 0 && next < images.length) { openLightbox(next); }
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () { navigate(-1); });
    nextBtn.addEventListener('click', function () { navigate(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }
  initLightbox();

  // --- ACCORDION (CASE STUDIES) ---
  function initAccordion() {
    var triggers = document.querySelectorAll('.case-trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.case-item');
        var isOpen = item.classList.contains('open');

        // close all
        document.querySelectorAll('.case-item.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });

        if (!isOpen) { item.classList.add('open'); }
      });
    });
  }
  initAccordion();

  // --- COUNTERS (Impact Section) ---
  function initCounters() {
    var counters = document.querySelectorAll('.impact-tile .counter');
    if (!counters.length) return;

    var animated = false;

    function animate() {
      if (animated) return;
      var trigger = window.scrollY + window.innerHeight;
      var section = document.querySelector('#impact');
      if (!section) return;
      if (trigger > section.offsetTop + 100) {
        animated = true;
        counters.forEach(function (counter) {
          var target = parseInt(counter.getAttribute('data-target'));
          if (isNaN(target)) return;
          var duration = 2000;
          var steps = 30;
          var stepTime = duration / steps;
          var current = 0;
          var increment = target / steps;

          // Animate the bar too
          var tile = counter.closest('.impact-tile');
          var fill = tile ? tile.querySelector('.impact-tile-fill') : null;

          function update() {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              if (fill) fill.style.width = Math.min(target, 100) + '%';
              return;
            }
            counter.textContent = Math.round(current);
            if (fill) fill.style.width = Math.min(current, 100) + '%';
            setTimeout(update, stepTime);
          }
          update();
        });
      }
    }

    window.addEventListener('scroll', animate);
    window.addEventListener('load', function () { setTimeout(animate, 600); });
  }

  // --- MODALS ---
  function initModals() {
    var overlays = document.querySelectorAll('.modal-overlay');
    var closeBtns = document.querySelectorAll('.modal-close');
    var solutionLinks = document.querySelectorAll('.solution-link');

    solutionLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = 'modal-' + link.getAttribute('data-modal');
        var overlay = document.getElementById(modalId);
        if (overlay) {
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var overlay = btn.closest('.modal-overlay');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    overlays.forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        overlays.forEach(function (o) { o.classList.remove('active'); });
        document.body.style.overflow = '';
      }
    });
  }
  initModals();

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var top = target.getAttribute('id') === 'home' ? 0 : target.offsetTop - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
