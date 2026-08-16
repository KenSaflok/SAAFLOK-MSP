/* Saaflok Computers MSP – Main JS */
(function () {
  'use strict';

  /* ── Mobile navigation ──────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Sticky header shadow ───────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8
        ? '0 2px 16px rgba(0,0,0,.10)'
        : '';
    }, { passive: true });
  }

  /* ── Contact form ───────────────────────────────── */
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form && feedback) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset previous error states
      form.querySelectorAll('.invalid').forEach(function (el) {
        el.classList.remove('invalid');
      });

      // Basic required-field validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('invalid');
          valid = false;
        }
      });

      // Email format check
      const emailField = form.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          emailField.classList.add('invalid');
          valid = false;
        }
      }

      if (!valid) {
        showFeedback('error', 'Please fill in all required fields correctly.');
        return;
      }

      // Simulate form submission (replace with real endpoint)
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        showFeedback('success', '✓ Thank you! Your enquiry has been received. A member of our team will be in touch within one business day.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      }, 1200);
    });
  }

  function showFeedback(type, message) {
    if (!feedback) { return; }
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = message;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ── Smooth scroll for anchor links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Intersection Observer – fade-in cards ──────── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.service-card, .why-card, .pricing-card').forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

}());
