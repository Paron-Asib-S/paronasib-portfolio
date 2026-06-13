/* =============================================
   PARON ASIB S — Portfolio Scripts
   All animations & interactions
   ============================================= */

(function () {
  "use strict";

  /* ---- LOADER ---- */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(function () { loader.remove(); }, 700);
      }
      // trigger hero reveals after load
      document.querySelectorAll('.hero .reveal-up').forEach(function (el) {
        el.classList.add('active');
      });
    }, 600);
  });

  /* ---- CURSOR GLOW ---- */
  var glow = document.querySelector('.cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---- NAVBAR SCROLL ---- */
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('scrolled');
    } else {
      navbar && navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 300) {
      backToTop && backToTop.classList.add('visible');
    } else {
      backToTop && backToTop.classList.remove('visible');
    }
  });

  backToTop && backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- MOBILE NAV TOGGLE ---- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  toggle && toggle.addEventListener('click', function () {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '64px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10,10,10,.95)';
      navLinks.style.padding = '20px 40px';
      navLinks.style.backdropFilter = 'blur(16px)';
      navLinks.style.borderBottom = '1px solid rgba(245,230,66,.12)';
    }
  });

  /* ---- TYPED EFFECT ---- */
  var words = ['AI Engineer', 'Java Developer', 'Deep Learning Developer', 'Published Researcher'];
  var wi = 0, ci = 0, deleting = false;
  var typedEl = document.getElementById('typed-out');

  function tick() {
    if (!typedEl) return;
    var word = words[wi];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      typedEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 50 : 95);
  }
  setTimeout(tick, 1200);

  /* ---- SCROLL REVEAL ---- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-up:not(.hero .reveal-up)').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---- ANIMATED SKILL BARS ---- */
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fill = entry.target.querySelector('.bar-fill');
        if (fill) fill.style.width = entry.target.dataset.width;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-row').forEach(function (el) {
    barObserver.observe(el);
  });

  /* ---- COUNT-UP STATS ---- */
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(function (el) {
    countObserver.observe(el);
  });

  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || '';
    var decimal = el.dataset.decimal || null;
    var start = 0;
    var duration = 1800;
    var startTime = null;

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * ease;

      if (decimal) {
        el.textContent = parseFloat(decimal) * (current / target) < parseFloat(decimal)
          ? (parseFloat(decimal) * ease).toFixed(2)
          : decimal;
      } else {
        el.textContent = Math.ceil(current) + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = decimal || (Math.ceil(target) + suffix);
    }
    requestAnimationFrame(update);
  }

  /* ---- 3D TILT PROJECT CARDS ---- */
  document.querySelectorAll('.proj-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var rotX = (y / rect.height - 0.5) * 16;
      var rotY = (x / rect.width - 0.5) * 16;
      card.style.transform = 'perspective(900px) rotateX(' + (-rotX) + 'deg) rotateY(' + rotY + 'deg) scale(1.03)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  /* ---- MAGNETIC BUTTONS ---- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.18) + 'px,' + (y * 0.18) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0,0)';
    });
  });

  /* ---- PARTICLES ---- */
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: '#F5E642' },
        shape: { type: 'circle' },
        opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false } },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#F5E642', opacity: 0.08, width: 1 },
        move: { enable: true, speed: 1.2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.25 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---- SMOOTH SCROLL NAV LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        // close mobile nav if open
        if (navLinks && navLinks.style.display === 'flex' && navLinks.style.position === 'absolute') {
          navLinks.style.display = 'none';
        }
      }
    });
  });

})();