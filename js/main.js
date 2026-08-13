/* ==========================================================================
   SHRADHANSH TIWARI - PORTFOLIO INTERACTIVE ENGINE
   Vanilla JS with GSAP Integration & Canvas Particle FX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Preloader Logic
  // ------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const fill = document.querySelector('.preloader-progress-fill');
  const counter = document.querySelector('.preloader-counter');

  if (preloader) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 5;
      if (progress > 100) progress = 100;
      
      if (fill) fill.style.width = `${progress}%`;
      if (counter) counter.textContent = `${progress}%`;

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.style.opacity = '0';
          preloader.style.visibility = 'hidden';
          initGSAPAnimations();
        }, 350);
      }
    }, 30);
  } else {
    initGSAPAnimations();
  }

  // ------------------------------------------------------------------------
  // 2. Custom Cursor & Magnetic Effect
  // ------------------------------------------------------------------------
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorOutline = document.querySelector('.custom-cursor-outline');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const hoverables = document.querySelectorAll('a, button, .glass-card, .skill-card, .project-card, input, textarea');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });
  }

  // ------------------------------------------------------------------------
  // 3. Hero Canvas Floating Particle Network
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.parentElement) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;

    window.addEventListener('resize', () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
      }
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(229, 57, 53, ' : 'rgba(255, 255, 255, '
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(229, 57, 53, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // ------------------------------------------------------------------------
  // 4. Hero Subtitle Typing Animation
  // ------------------------------------------------------------------------
  const typedSpan = document.querySelector('.typed-text');
  if (typedSpan) {
    const roles = ["Full Stack Developer", "Problem Solver", "UI Enthusiast", "AI/ML Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 90;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // ------------------------------------------------------------------------
  // 5. Navbar Sticky & Active Navigation Highlight
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    }

    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop - 130;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach((link) => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    links.forEach((l) => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Skills Filtering & Animated Progress Fill
  // ------------------------------------------------------------------------
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      skillCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { 
            card.style.opacity = '1'; 
            card.style.transform = 'translateY(0)'; 
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { 
            card.style.display = 'none'; 
          }, 300);
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. Interactive 3D Card Tilt Effect
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.glass-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 18;
      const rotateY = (centerX - x) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ------------------------------------------------------------------------
  // 8. Project Details Modal Logic
  // ------------------------------------------------------------------------
  const modals = document.querySelectorAll('.modal-overlay');
  const modalBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.dataset.modal;
      if (targetModalId) {
        const modal = document.getElementById(targetModalId);
        if (modal) modal.classList.add('active');
      }
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modals.forEach((m) => m.classList.remove('active'));
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((m) => m.classList.remove('active'));
    }
  });

  // ------------------------------------------------------------------------
  // 9. Button Ripple Effect
  // ------------------------------------------------------------------------
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;

      const existing = this.querySelector('.ripple');
      if (existing) existing.remove();

      this.appendChild(circle);
    });
  });

  // ------------------------------------------------------------------------
  // 10. Contact Form Real-time Validation & Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('form-name');
      const emailEl = document.getElementById('form-email');
      const subjectEl = document.getElementById('form-subject');
      const messageEl = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const subject = subjectEl ? subjectEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully to Shradhansh.`;
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
        }
      }, 1200);
    });
  }

  // ------------------------------------------------------------------------
  // 11. GSAP ScrollTrigger Animations
  // ------------------------------------------------------------------------
  function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Elements Reveal
      if (document.querySelector('.hero-badge')) gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.1 });
      if (document.querySelector('.hero-title')) gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.9, delay: 0.3 });
      if (document.querySelector('.hero-subtitle')) gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.5 });
      if (document.querySelector('.hero-description')) gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });
      if (document.querySelector('.hero-ctas')) gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.8, delay: 0.9 });
      if (document.querySelector('.hero-avatar-wrapper')) gsap.from('.hero-avatar-wrapper', { opacity: 0, scale: 0.8, duration: 1.1, delay: 0.4, ease: 'back.out(1.7)' });

      // Scroll reveal for sections
      const sections = document.querySelectorAll('.section-padding');
      sections.forEach((sec) => {
        const header = sec.querySelector('.section-header');
        if (header) {
          gsap.from(header, {
            scrollTrigger: {
              trigger: sec,
              start: 'top 82%',
            },
            opacity: 0,
            y: 35,
            duration: 0.8
          });
        }
      });

      // Animate Skill Progress Fill bars on scroll
      const skillSection = document.getElementById('skills');
      if (skillSection) {
        ScrollTrigger.create({
          trigger: skillSection,
          start: 'top 75%',
          onEnter: () => {
            document.querySelectorAll('.skill-progress-fill').forEach((fill) => {
              const targetWidth = fill.dataset.percent || '80%';
              fill.style.width = targetWidth;
            });
          }
        });
      }

      // Animate Counter Numbers smoothly avoiding NaN string coercion
      const counters = document.querySelectorAll('.stat-number, .achievement-counter');
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.count, 10) || 0;
        const animatedObj = { val: 0 };
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(animatedObj, {
              val: target,
              duration: 1.8,
              ease: 'power1.out',
              onUpdate: function () {
                const plus = counter.dataset.plus ? '+' : '';
                counter.textContent = Math.floor(animatedObj.val) + plus;
              }
            });
          }
        });
      });
    }
  }
});
