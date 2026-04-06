// =====================================================
// HOUSE OF SHAFAQ - Main JavaScript
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navigation Scroll Effect ----
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // ---- Active Nav Link ----
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (href.includes('projects') && currentPath.includes('projects') && !currentPath.includes('privacy')) ||
        (href.includes('about') && currentPath.includes('about')) ||
        (href.includes('services') && currentPath.includes('services'))) {
      link.classList.add('active');
    }
  });

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      if (mobileNav.classList.contains('open')) {
        mobileNav.style.opacity = '0';
        mobileNav.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          mobileNav.classList.remove('open');
        }, 350);
      } else {
        mobileNav.classList.add('open');
        requestAnimationFrame(() => {
          mobileNav.style.opacity = '1';
          mobileNav.style.transform = 'translateY(0)';
        });
      }
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    revealEls.forEach(el => observer.observe(el));
    // Immediately reveal elements already in viewport
    setTimeout(() => {
      revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 50);
  }

  // ---- Testimonial Slider ----
  const track = document.querySelector('.testimonial-track');
  if (track) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    const prevBtn = document.querySelector('.t-btn.prev');
    const nextBtn = document.querySelector('.t-btn.next');
    
    function getCardWidth() {
      const card = cards[0];
      return card ? card.offsetWidth + 24 : 444; // 24 = gap
    }

    function slide(dir) {
      currentIndex = (currentIndex + dir + total) % total;
      track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

    // Drag / swipe
    let startX = 0;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });
    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) {
        slide(diff > 0 ? 1 : -1);
      }
    });
    track.addEventListener('mouseleave', () => { isDragging = false; });

    // Touch
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1);
    });

    // Auto-advance
    let autoplay = setInterval(() => slide(1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', () => { autoplay = setInterval(() => slide(1), 5000); });
  }

  // ---- Project Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
          const cat = card.dataset.category || '';
          const show = filter === 'all' || cat === filter;
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.display = show ? 'block' : 'none';
            if (show) {
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              });
            }
          }, 150);
        });
      });
    });
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ---- Smooth Counter Animation ----
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, parseInt(entry.target.dataset.counter), 1800);
          cObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  // ---- Cursor Glow Effect ----
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(229,0,0,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%); transition: transform 0.1s ease;
    will-change: transform; left: -9999px; top: -9999px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // ---- Showreel video click ----
  const videoPlayer = document.querySelector('.video-player');
  const videoPlayerPlaceholder = document.querySelector('.video-player-placeholder');
  if (videoPlayer && videoPlayerPlaceholder) {
    videoPlayerPlaceholder.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      const videoId = videoPlayer.dataset.videoId || 'dQw4w9WgXcQ';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoPlayer.innerHTML = '';
      videoPlayer.appendChild(iframe);
    });
  }

  // ---- Page transitions ----
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="tel"]):not([href^="mailto"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    });
  });

});
