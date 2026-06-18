const revealElements = document.querySelectorAll('.reveal');
const backToTopBtn = document.querySelector('.back-to-top');

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetValue = Number(element.dataset.counter);
        const duration = 1600;
        const startTime = performance.now();

        const update = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const value = Math.floor(progress * targetValue);
          element.textContent = `${value}${element.dataset.counter === '35' ? '+' : ''}`;
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
        obs.unobserve(element);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function initBackToTop() {
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const note = document.querySelector('.form-note');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'Thank you for contacting Jamal Group. Our team will reach out shortly.';
    form.reset();
  });

  const sendButton = document.getElementById('sendBtn');
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      note.textContent = 'Thank you for contacting Jamal Group. Our team will reach out shortly.';
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initBackToTop();
  initAnchorLinks();
  initContactForm();
});