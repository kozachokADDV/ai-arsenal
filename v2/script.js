/* ================================================================
   AI COMMAND CENTER — interactivity
   ================================================================ */

(() => {
  'use strict';

  // ----------------------------------------------------------------
  // BOOT SEQUENCE
  // ----------------------------------------------------------------
  const bootOverlay = document.getElementById('bootOverlay');
  if (bootOverlay) {
    // Skip boot if user came from anchor
    const skipBoot = sessionStorage.getItem('bootSeen') === '1';
    if (skipBoot) {
      bootOverlay.classList.add('done');
    } else {
      setTimeout(() => {
        bootOverlay.classList.add('done');
        sessionStorage.setItem('bootSeen', '1');
      }, 2800);
    }
  }

  // ----------------------------------------------------------------
  // STAT COUNTERS — count up on view
  // ----------------------------------------------------------------
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const suffix = el.dataset.suffix || ''; // explicit suffix, no auto "+"
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((c) => counterObserver.observe(c));

  // ----------------------------------------------------------------
  // AGENT FILTERS
  // ----------------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const agentCards = document.querySelectorAll('.agent-card');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      agentCards.forEach((card) => {
        const cats = (card.dataset.categories || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // ----------------------------------------------------------------
  // FADE-IN ON SCROLL (cards & sections)
  // ----------------------------------------------------------------
  const fadeTargets = document.querySelectorAll('.stat-card, .arch-card, .agent-card, .skills-group, .plugin-card, .flow-step, .tg-card, .lib-stat, .lib-div, .found-card');
  fadeTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s cubic-bezier(0.22, 1, 0.36, 1), transform .6s cubic-bezier(0.22, 1, 0.36, 1)';
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = i * 40; // stagger
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeTargets.forEach((el) => fadeObserver.observe(el));

  // ----------------------------------------------------------------
  // 3D TILT on agent / plugin cards
  // ----------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.agent-card, .plugin-card, .arch-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -3;
      const ry = ((x - cx) / cx) * 3;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ----------------------------------------------------------------
  // KONAMI EASTER EGG → retro amber palette
  // ----------------------------------------------------------------
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiBuf = [];
  document.addEventListener('keydown', (e) => {
    konamiBuf.push(e.key);
    if (konamiBuf.length > konami.length) konamiBuf.shift();
    if (konamiBuf.join(',') === konami.join(',')) {
      document.documentElement.classList.toggle('retro-amber');
      konamiBuf = [];
    }
  });

  // Apply amber palette via injected styles when toggled
  const amberStyles = document.createElement('style');
  amberStyles.textContent = `
    .retro-amber {
      --cyan: #ffb000;
      --magenta: #ff8800;
      --yellow: #ffd700;
      --purple: #ff8800;
    }
    .retro-amber body { filter: hue-rotate(0deg) sepia(0.1); }
  `;
  document.head.appendChild(amberStyles);

  // ----------------------------------------------------------------
  // SMOOTH SCROLL FOR ANCHORS (already handled by CSS, but adjust offset)
  // ----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  // ----------------------------------------------------------------
  // CONSOLE EASTER EGG
  // ----------------------------------------------------------------
  console.log('%c◆ AI COMMAND CENTER', 'font-size: 24px; font-weight: 900; color: #00f0ff; text-shadow: 0 0 10px #00f0ff;');
  console.log('%cTelegram AI 24/7 · 4 authored plugins · 212 agents · 136 skills', 'color: #ff006e; font-family: monospace;');
  console.log('%cKonami code activates retro mode 🟧', 'color: #fff200; font-family: monospace;');
})();
