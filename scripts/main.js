// =====================================================
// HOUSE OF SHAFAQ - Premium Cinematic JavaScript
// =====================================================

// Load Lenis smooth scrolling library
const lenisScript = document.createElement('script');
lenisScript.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.27/dist/lenis.min.js';
lenisScript.async = true;
document.head.appendChild(lenisScript);

lenisScript.onload = () => {
  initLenisSmoothScroll();
};

document.addEventListener('DOMContentLoaded', () => {

  // ---- Initialize All Enhancements ----
  initLoader();
  initNavigation();
  initMobileNav();
  initParallax();
  initMagneticButtons();
  initSmoothReveal();
  initTextReveal();
  initStaggeredCards();
  initEnhancedVideoPlayer();
  initTestimonialSlider();
  initProjectFilter();
  initFAQAccordion();
  initCounters();
  initCursorGlow();
  // initSmoothScroll(); // Replaced with Lenis
  initPerformanceOptimizations();

  // ---- Loading Screen ----
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        triggerInitialReveals();
      }, 1200);
    });
    
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        triggerInitialReveals();
      }, 800);
    }
  }

  // ---- Enhanced Navigation Scroll Effect ----
  function initNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    let scrollThreshold = 100;
    let hideThreshold = 200;
    let ticking = false;
    
    const updateNav = () => {
      const currentScroll = window.scrollY;
      const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
      
      // Add scrolled class for background blur
      nav.classList.toggle('scrolled', currentScroll > scrollThreshold);
      
      // Smooth hide/show behavior
      if (scrollDirection === 'down' && currentScroll > hideThreshold) {
        nav.style.transform = 'translateY(-100%)';
        nav.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.4)';
      } else {
        nav.style.transform = 'translateY(0)';
        nav.style.boxShadow = currentScroll > scrollThreshold 
          ? '0 8px 40px rgba(0, 0, 0, 0.4)' 
          : '0 4px 30px rgba(0, 0, 0, 0.3)';
      }
      
      // Enhanced blur effect based on scroll position
      const blurAmount = Math.min(currentScroll / 200, 1);
      const backgroundOpacity = Math.min(0.4 + (currentScroll / 500), 0.8);
      
      if (currentScroll > scrollThreshold) {
        nav.style.backdropFilter = `blur(${10 + blurAmount * 10}px)`;
        nav.style.background = `rgba(20, 20, 20, ${backgroundOpacity})`;
        nav.style.borderBottom = `1px solid rgba(255, 255, 255, ${0.1 + blurAmount * 0.05})`;
      }
      
      lastScroll = currentScroll;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
    
    // Set initial transition styles
    nav.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border-bottom 0.3s ease';
  }

  // ---- Enhanced Mobile Navigation ----
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!toggle || !mobileNav) return;
    
    // Create backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      z-index: 998;
    `;
    document.body.appendChild(backdrop);
    
    // Set initial mobile nav styles
    mobileNav.style.cssText = `
      background: rgba(20, 20, 20, 0.9);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transform: translateY(50px) scale(0.95);
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    
    // Style menu items for premium feel
    const menuItems = mobileNav.querySelectorAll('a');
    menuItems.forEach((item, index) => {
      item.style.cssText = `
        font-family: var(--font-headline);
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--white);
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        transition-delay: ${index * 0.1}s;
        position: relative;
        display: inline-block;
      `;
      
      // Add hover effect
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.color = 'var(--red)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.color = 'var(--white)';
      });
      
      // Add underline animation
      const underline = document.createElement('span');
      underline.style.cssText = `
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--red);
        transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      `;
      item.appendChild(underline);
      
      item.addEventListener('mouseenter', () => {
        underline.style.width = '100%';
      });
      
      item.addEventListener('mouseleave', () => {
        underline.style.width = '0';
      });
    });
    
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      
      if (isOpen) {
        // Close menu
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        
        // Animate items out
        menuItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
        });
        
        // Hide backdrop and menu
        backdrop.style.opacity = '0';
        backdrop.style.visibility = 'hidden';
        mobileNav.style.opacity = '0';
        mobileNav.style.visibility = 'hidden';
        mobileNav.style.transform = 'translateY(50px) scale(0.95)';
        
        document.body.style.overflow = 'auto';
      } else {
        // Open menu
        toggle.classList.add('open');
        mobileNav.classList.add('open');
        
        // Show backdrop and menu
        backdrop.style.opacity = '1';
        backdrop.style.visibility = 'visible';
        mobileNav.style.opacity = '1';
        mobileNav.style.visibility = 'visible';
        mobileNav.style.transform = 'translateY(0) scale(1)';
        
        document.body.style.overflow = 'hidden';
        
        // Animate items in with stagger
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
    
    // Close menu when clicking backdrop
    backdrop.addEventListener('click', () => {
      toggle.click();
    });
    
    menuItems.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => {
          toggle.click();
        }, 300);
      });
    });
  }

  // ---- Premium Parallax Scrolling ----
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    let lastScrollY = 0;
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollDelta = scrollY - lastScrollY;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = el.offsetHeight;
        
        // Only animate if element is in viewport or nearby
        if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
          // Calculate parallax offset based on element position in viewport
          const viewportCenter = scrollY + windowHeight / 2;
          const elementCenter = elementTop + elementHeight / 2;
          const distance = viewportCenter - elementCenter;
          
          // Apply subtle parallax movement with constraints to prevent overflow
          const yPos = Math.max(-50, Math.min(50, distance * speed * 0.03)); // Constrain vertical movement
          const xPos = Math.max(-20, Math.min(20, Math.sin(scrollY * 0.001) * speed * 1)); // Constrain horizontal movement
          const rotation = Math.max(-2, Math.min(2, Math.sin(scrollY * 0.0005) * speed * 0.3)); // Constrain rotation
          
          // Use transform3d for better performance and set transform-origin to center
          el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotateX(${rotation}deg) scale(${1 + Math.abs(yPos) * 0.00002})`;
          el.style.transformOrigin = 'center center';
        }
      });
      
      lastScrollY = scrollY;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    
    // Initial update
    updateParallax();
  }

  // ---- Magnetic Button Effect ----
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-magnetic, .play-btn-cinematic');
    if (magneticElements.length === 0) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    magneticElements.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ---- Premium Smooth Scroll Reveal ----
  function initSmoothReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right');
    if (revealElements.length === 0) return;
    
    // Set initial states for all reveal elements
    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 1.0s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.willChange = 'transform, opacity';
      
      if (el.classList.contains('reveal-up')) {
        el.style.transform = 'translateY(60px)';
      } else if (el.classList.contains('reveal-scale')) {
        el.style.transform = 'translateY(40px) scale(0.95)';
      } else if (el.classList.contains('reveal-left')) {
        el.style.transform = 'translateX(-60px)';
      } else if (el.classList.contains('reveal-right')) {
        el.style.transform = 'translateX(60px)';
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            entry.target.classList.add('in-view');
            // Remove will-change after animation
            setTimeout(() => {
              entry.target.style.willChange = 'auto';
            }, 1000);
          }, index * 150); // Increased stagger for premium feel
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // ---- Premium Text Character Reveal ----
  function initTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    if (textRevealElements.length === 0) return;
    
    textRevealElements.forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';
      
      // Apply container styles to prevent artifacts
      el.style.display = 'inline-block';
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.style.transformStyle = 'preserve-3d'; // Prevent 3D transform artifacts
      el.style.backfaceVisibility = 'hidden'; // Hide back faces during animation
      
      const words = text.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '0.3em';
        wordSpan.style.position = 'relative';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.transformStyle = 'preserve-3d';
        
        word.split('').forEach((char, charIndex) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
          span.style.display = 'inline-block';
          span.style.position = 'relative';
          span.style.overflow = 'hidden';
          span.style.transformStyle = 'preserve-3d';
          span.style.backfaceVisibility = 'hidden';
          span.style.transform = 'translateY(100%)';
          span.style.opacity = '0';
          span.style.transition = `all 0.6s cubic-bezier(0.22, 1, 0.36, 1)`;
          span.style.transitionDelay = `${(wordIndex * 0.04) + (charIndex * 0.01)}s`; // Even faster, cleaner stagger
          // Explicitly remove all potentially problematic styles
          span.style.background = 'transparent';
          span.style.border = 'none';
          span.style.outline = 'none';
          span.style.boxShadow = 'none';
          span.style.webkitTextStroke = 'none'; // Remove text stroke artifacts
          span.style.textShadow = 'none'; // Remove text shadow artifacts
          span.style.webkitFontSmoothing = 'antialiased';
          span.style.mozOsxFontSmoothing = 'grayscale';
          wordSpan.appendChild(span);
        });
        
        el.appendChild(wordSpan);
      });
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          const chars = entry.target.querySelectorAll('span span');
          chars.forEach(char => {
            char.style.transform = 'translateY(0)';
            char.style.opacity = '1';
            // Clear all potentially problematic styles
            char.style.background = 'transparent';
            char.style.border = 'none';
            char.style.outline = 'none';
            char.style.boxShadow = 'none';
            char.style.webkitTextStroke = 'none';
            char.style.textShadow = 'none';
            // Remove will-change after animation
            setTimeout(() => {
              char.style.willChange = 'auto';
            }, 600);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    textRevealElements.forEach(el => observer.observe(el));
  }


  // ---- Premium Staggered Card Animations ----
  function initStaggeredCards() {
    const cardGroups = document.querySelectorAll('.services-grid, .team-grid, .values-grid');
    
    cardGroups.forEach(group => {
      const cards = group.querySelectorAll('.service-card, .project-card, .team-card, .value-card');
      
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.92)';
        card.style.transition = `all 0.8s cubic-bezier(0.22, 1, 0.36, 1)`;
        card.style.transitionDelay = `${index * 0.15}s`; // Premium stagger
        card.style.willChange = 'transform, opacity';
      });
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card, .project-card, .team-card, .value-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                // Remove will-change after animation
                setTimeout(() => {
                  card.style.willChange = 'auto';
                }, 800);
              }, index * 150); // Staggered reveal
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -120px 0px'
      });
      
      observer.observe(group);
    });
  }

  // ---- Enhanced Video Player ----
  function initEnhancedVideoPlayer() {
    const videoPlayers = document.querySelectorAll('.video-player-enhanced');
    
    videoPlayers.forEach(player => {
      const placeholder = player.querySelector('.video-placeholder');
      const videoId = player.dataset.videoId;
      
      if (!placeholder || !videoId) return;
      
      const img = new Image();
      img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      img.onload = () => {
        placeholder.style.backgroundImage = `url(${img.src})`;
      };
      img.onerror = () => {
        placeholder.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
      };
      
      placeholder.addEventListener('click', () => {
        placeholder.style.opacity = '0';
        
        setTimeout(() => {
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          iframe.style.cssText = 'width:100%;height:100%;border:none;position:absolute;top:0;left:0;z-index:10;';
          player.appendChild(iframe);
          placeholder.remove();
        }, 300);
      });
    });
  }

  // ---- Testimonial Slider ----
  function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    const prevBtn = document.querySelector('.t-btn.prev');
    const nextBtn = document.querySelector('.t-btn.next');
    
    if (cards.length === 0) return;
    
    function getCardWidth() {
      const card = cards[0];
      const style = window.getComputedStyle(card);
      const marginRight = parseInt(style.marginRight) || 0;
      return card.offsetWidth + marginRight + 24;
    }

    function slide(dir) {
      currentIndex = (currentIndex + dir + total) % total;
      track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    if (prevBtn) prevBtn.addEventListener('click', () => slide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => slide(1));

    let startX = 0;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
      track.style.cursor = 'grabbing';
      track.style.transition = 'none';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const diff = e.clientX - startX;
      const currentTranslate = -(currentIndex * getCardWidth()) + diff;
      track.style.transform = `translateX(${currentTranslate}px)`;
    });

    track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';
      track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) {
        slide(diff > 0 ? 1 : -1);
      } else {
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      }
    });

    track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      }
    });

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        slide(diff > 0 ? 1 : -1);
      } else {
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      }
    });

    let autoplay = setInterval(() => slide(1), 5000);
    
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
      testimonialsSection.addEventListener('mouseenter', () => clearInterval(autoplay));
      testimonialsSection.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => slide(1), 5000);
      });
    }
  }

  // ---- Project Filter ----
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        projectCards.forEach((card, index) => {
          const cat = card.dataset.category || '';
          const show = filter === 'all' || cat === filter;
          
          if (show) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ---- FAQ Accordion ----
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        faqItems.forEach(i => {
          i.classList.remove('open');
          const answer = i.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = '0';
            answer.style.paddingBottom = '0';
          }
        });
        
        if (!isOpen) {
          item.classList.add('open');
          const answer = item.querySelector('.faq-answer');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.paddingBottom = '1.2rem';
          }
        }
      });
    });
  }

  // ---- Counter Animation ----
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;
    
    const animateCounter = (el, target, duration = 2000) => {
      let start = null;
      const suffix = el.dataset.suffix || '';
      
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter);
          animateCounter(entry.target, target, 1800);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(c => observer.observe(c));
  }

  // ---- Enhanced Cursor Glow ----
  function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;
    
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursorGlow.style.display = 'none';
      return;
    }
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;
    let isMoving = false;
    let timeout = null;
    
    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      
      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';
      
      if (isMoving) {
        rafId = requestAnimationFrame(animateCursor);
      }
    };
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isMoving) {
        isMoving = true;
        cursorGlow.style.opacity = '1';
        animateCursor();
      }
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isMoving = false;
        cancelAnimationFrame(rafId);
      }, 100);
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .vtype-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.opacity = '0.6';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.opacity = '1';
      });
    });
  }

  // ---- Premium Smooth Scrolling ----
  function initSmoothScroll() {
    // Custom smooth scroll implementation
    const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          
          if (isSmoothScrollSupported) {
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older browsers
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 800;
            let start = null;
            
            const animation = (currentTime) => {
              if (start === null) start = currentTime;
              const timeElapsed = currentTime - start;
              const progress = Math.min(timeElapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3); // cubic-bezier(0.16, 1, 0.3, 1)
              
              window.scrollTo(0, startPosition + (distance * ease));
              
              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            };
            
            requestAnimationFrame(animation);
          }
        }
      });
    });

    // Enhanced wheel event handling for smoother scrolling
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('wheel', (e) => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          // Enhanced scroll behavior with momentum
          const delta = e.deltaY;
          const scrollAmount = delta * 0.8; // Slightly reduce scroll speed for premium feel
          
          window.scrollBy({
            top: scrollAmount,
            behavior: 'auto'
          });
          
          isScrolling = false;
        });
        isScrolling = true;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 50);
    }, { passive: true });
  }

  // ---- Helper: Trigger Initial Reveals ----
  function triggerInitialReveals() {
    const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale');
    reveals.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => {
          el.classList.add('in-view');
        }, index * 100);
      }
    });
  }

  // ---- Premium Performance Optimizations ----
  function initPerformanceOptimizations() {
    // Global scroll optimization with throttling
    let ticking = false;
    let scrollCallbacks = [];
    
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollCallbacks.forEach(callback => callback());
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add to global scroll handler
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Reduce motion on mobile devices for better performance
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.documentElement.style.setProperty('--transition', '0.3s cubic-bezier(0.22, 1, 0.36, 1)');
      document.documentElement.style.setProperty('--transition-slow', '0.4s cubic-bezier(0.22, 1, 0.36, 1)');
      
      // Disable parallax on mobile for performance
      document.querySelectorAll('[data-parallax]').forEach(el => {
        el.removeAttribute('data-parallax');
      });
    }
    
    // Optimize images with lazy loading and progressive enhancement
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add will-change hints strategically for animated elements
    const addWillChange = (elements, duration) => {
      elements.forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
      
      setTimeout(() => {
        elements.forEach(el => {
          el.style.willChange = 'auto';
        });
      }, duration);
    };
    
    // Apply will-change to reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right');
    addWillChange(revealElements, 1200);
    
    // Apply will-change to text reveal elements
    const textElements = document.querySelectorAll('.text-reveal');
    addWillChange(textElements, 900);
    
    // Apply will-change to card elements
    const cardElements = document.querySelectorAll('.service-card, .project-card, .team-card, .value-card');
    addWillChange(cardElements, 800);
    
    // Optimize backdrop-filter for better performance
    if ('CSS' in window && CSS.supports('backdrop-filter', 'blur(10px)')) {
      // Backdrop filter is supported
      document.documentElement.style.setProperty('--backdrop-supported', '1');
    } else {
      // Fallback for browsers without backdrop-filter support
      document.documentElement.style.setProperty('--backdrop-supported', '0');
    }
    
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }

  // ---- Lenis Smooth Scrolling ----
  function initLenisSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for cinematic feel
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Reduced to prevent horizontal flicker
      smoothTouch: true,
      touchMultiplier: 1.5, // Reduced for mobile stability
      infinite: false,
      wheelMultiplier: 0.8, // Reduced to prevent overflow
      normalizeWheel: true, // Prevents erratic scrolling
    });
    
    // Connect Lenis to requestAnimationFrame with layout stability
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Prevent horizontal scroll during smooth scrolling
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      // Ensure no horizontal movement
      if (Math.abs(velocity) > 0) {
        document.body.style.overflowX = 'hidden';
      }
    });
    
    // Handle anchor links with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          lenis.scrollTo(offsetTop);
        }
      });
    });
    
    // Expose lenis globally for other functions
    window.lenis = lenis;
  }

  // ---- Active Nav Link Highlighting ----
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

});
