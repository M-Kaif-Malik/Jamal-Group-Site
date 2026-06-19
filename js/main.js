// Jamal Group main scripting

// Scroll Reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

// Stats Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetValue = Number(element.dataset.counter);
        const duration = 1500;
        const startTime = performance.now();

        const update = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const value = Math.floor(progress * targetValue);
          
          if (targetValue === 35) {
            element.textContent = `${value}+`;
          } else if (targetValue === 100) {
            element.textContent = `${value}%`;
          } else if (targetValue === 120) {
            element.textContent = `${value}+`;
          } else {
            element.textContent = value;
          }
          
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
        obs.unobserve(element);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// Back to Top & Sticky Nav Scrolled Effect
function initScrollEffects() {
  const backToTopBtn = document.querySelector('.back-to-top');
  const header = document.querySelector('.nav-main');

  window.addEventListener('scroll', () => {
    // Back to top opacity toggle
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Nav bar scrolled compression & glass opacity transition
    if (header) {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Smooth scrolling for hash links
function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'Thank you for reaching out. A corporate representative from the selected division will contact you shortly.';
    note.style.color = 'var(--secondary)';
    form.reset();
  });
}

// Initializing
window.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initScrollEffects();
  initAnchorLinks();
  initContactForm();
});