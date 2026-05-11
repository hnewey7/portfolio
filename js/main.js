/* ============================================================
   PORTFOLIO — main.js
   ============================================================ */

/* ── Scroll reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.project-item, .timeline-item, .value-card, .skills-group, .project-card'
  );
  els.forEach(el => el.classList.add('js-reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach(el => observer.observe(el));
}

/* ── Project filter (projects.html) ────────────────────────── */
function initFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'grid' : 'none';
      });
    });
  });
}

/* ── Nav scroll style ───────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 1px 16px rgba(0,0,0,0.07)'
      : 'none';
  }, { passive: true });
}

/* ── Contact form feedback ──────────────────────────────────── */
function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // If using Formspree, you can replace this with actual submission logic.
  // This just provides a basic UX placeholder.
  form.addEventListener('submit', e => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Remove e.preventDefault() once you've set up a real form endpoint.
    // For now it prevents the page from navigating to "#".
    e.preventDefault();
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
    }, 1200);
  });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initFilter();
  initNav();
  initForm();
  initSlideshow();
});

/* ── Slideshow ───────────────────────────────────────────────────── */ 

function initSlideshow() {
  const track = document.querySelector('.slideshow-track');
  if (!track) return;

  const dots = document.querySelectorAll('.dot');
  let current = 0;
  const total = track.children.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.querySelector('.slide-btn.prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.slide-btn.next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));

  setInterval(() => goTo(current + 1), 4000);
}