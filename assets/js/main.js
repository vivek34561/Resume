// Init AOS (scroll animations)
AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-out-cubic',
  offset: 90
});

// Typed animation removed per user preference (no animation below name)

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scroll (for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href');
    if (!targetId || targetId === '#' || targetId.length < 2) return;
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Subtle parallax on avatar (safe, low CPU)
const avatar = document.querySelector('.avatar');
if (avatar) {
  window.addEventListener('scroll', () => {
    const rect = avatar.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const translateY = (progress - 0.5) * 6; // range ~ -3 to 3px
    avatar.style.transform = `translateY(${translateY}px)`;
  });
}

// Press ripple for buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousedown', (e) => {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.inset = '0';
    ripple.style.borderRadius = 'inherit';
    ripple.style.background = 'radial-gradient(120px 120px at '+e.offsetX+'px '+e.offsetY+'px, rgba(255,255,255,.15), transparent 60%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.opacity = '0';
    ripple.style.animation = 'btnRipple .6s ease';
    btn.style.position = 'relative';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const applyThemeIcon = () => {
  if (!themeToggle) return;
  const usingLight = root.classList.contains('light');
  themeToggle.innerHTML = usingLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.classList.add('light');
}
applyThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    applyThemeIcon();
  });
}

// Header shadow on scroll for depth
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 8) header.style.boxShadow = '0 6px 20px rgba(0,0,0,.25)';
    else header.style.boxShadow = 'none';
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Simple typewriter effect for hero kicker
(function(){
  const el = document.getElementById('typeKicker');
  if (!el) return;
  const fullText = 'Machine Learning • Generative AI • LLMs • RAG • FastAPI • MLOps';
  let idx = 0;
  let deleting = false;
  const typingSpeed = 40; // ms per char
  const pause = 1400; // pause at full text

  const type = () => {
    if (!deleting) {
      el.textContent = fullText.slice(0, idx + 1);
      idx++;
      if (idx === fullText.length) {
        deleting = true;
        setTimeout(type, pause);
        return;
      }
      setTimeout(type, typingSpeed);
    } else {
      el.textContent = fullText.slice(0, idx - 1);
      idx--;
      if (idx === 0) {
        deleting = false;
        setTimeout(type, typingSpeed);
        return;
      }
      setTimeout(type, typingSpeed / 1.2);
    }
  };
  // Start with empty then type
  el.textContent = '';
  type();
})();

// Projects tabs filtering
(function(){
  const tabs = document.querySelectorAll('.projects-tabs .tab');
  const cards = document.querySelectorAll('#projects-list .project.card');
  if (!tabs.length || !cards.length) return;

  const hasCategory = (el, filter) => {
    const cats = (el.dataset.category || '').split(/\s+/).filter(Boolean);
    return cats.includes(filter);
  };

  const setActive = (filter) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.filter === filter));
    cards.forEach(c => {
      const match = hasCategory(c, filter);
      c.style.display = match ? '' : 'none';
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      setActive(filter);
    });
  });

  // Default to Top Projects
  setActive('top');
})();

// View All Projects: show all categories
(function(){
  const btn = document.getElementById('viewAllProjects');
  const tabs = document.querySelectorAll('.projects-tabs .tab');
  const cards = document.querySelectorAll('#projects-list .project.card');
  if (!btn || !cards.length) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove('active'));
    cards.forEach(c => { c.style.display = ''; });
  });
})();
