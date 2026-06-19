/* ─────────────────────────────────────────
   Dark / Light mode toggle
───────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Restore saved preference on load
applyTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark'));
});

/* ─────────────────────────────────────────
   Navbar: scroll shadow + active link
───────────────────────────────────────── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Highlight active nav link via IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────
   Mobile hamburger
───────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* ─────────────────────────────────────────
   Typing / role ticker
───────────────────────────────────────── */
const roles  = ['Developer', 'YouTuber', 'Creator', 'Problem Solver'];
const ticker = document.getElementById('roleTicker');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];
  ticker.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);

  if (!deleting && ci === word.length) {
    setTimeout(() => { deleting = true; requestAnimationFrame(loop); }, 1600);
    return;
  }
  if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
  }
  requestAnimationFrame(loop);
}
function loop() { setTimeout(type, deleting ? 55 : 110); }
loop();

/* ─────────────────────────────────────────
   Scroll reveal (.reveal → .visible)
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  revealObserver.observe(el);
});

/* ─────────────────────────────────────────
   Skill progress bars
───────────────────────────────────────── */
const skillsSection = document.getElementById('skills');
let barsAnimated = false;

const barObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !barsAnimated) {
    barsAnimated = true;
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
    animateCircles();
    barObserver.disconnect();
  }
}, { threshold: 0.3 });
if (skillsSection) barObserver.observe(skillsSection);

/* ─────────────────────────────────────────
   Circular SVG charts
───────────────────────────────────────── */
function animateCircles() {
  const CIRC = 2 * Math.PI * 34; // r=34 → ≈213.6
  document.querySelectorAll('.circ-prog').forEach(circle => {
    const pct = parseInt(circle.dataset.pct, 10);
    const offset = CIRC * (1 - pct / 100);
    circle.style.strokeDasharray  = CIRC;
    circle.style.strokeDashoffset = CIRC; // start at 0%
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        circle.style.strokeDashoffset = offset; // animate to target
      });
    });
  });
}

/* ─────────────────────────────────────────
   Portfolio filter tabs
───────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    document.querySelectorAll('.pf-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.display = match ? '' : 'none';
      if (match) card.classList.remove('visible'); // re-trigger reveal
      requestAnimationFrame(() => { if (match) card.classList.add('visible'); });
    });
  });
});

/* ─────────────────────────────────────────
   Contact form
───────────────────────────────────────── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.querySelector('[name="name"]').value.trim();
  if (!name) return;

  success.textContent = `✅ Thanks ${name}! I'll get back to you soon.`;
  form.reset();
  setTimeout(() => { success.textContent = ''; }, 5000);
});
