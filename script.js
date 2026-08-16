/* ============================================================
   2T CAMERA — Script
   Animasi: partikel, efek ketik, kartu 3D, counter, reveal
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       1. PARTIKEL LATAR (hero)
       ================================================== */
    const particlesEl = document.getElementById('particles');

    function createParticles() {
        if (!particlesEl) return;
        particlesEl.innerHTML = '';
        const count = Math.min(45, Math.floor(window.innerWidth / 22));

        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle' + (Math.random() > 0.5 ? ' red' : '');
            const size = Math.random() * 5 + 3;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = Math.random() * 6 + 5 + 's';
            p.style.animationDelay = Math.random() * 6 + 's';
            particlesEl.appendChild(p);
        }
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    /* ==================================================
       2. EFEK KETIK SUBTITLE
       ================================================== */
    const typedEl = document.getElementById('typedText');
    const phrases = [
        'Solusi CCTV Terbaik 🔒',
        'Aman & Terpercaya 📹',
        'Hikvision • Dahua • HiLook',
        'Pantau Duniamu 24/7 🌐'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        if (!typedEl) return;
        const current = phrases[phraseIndex];
        typedEl.textContent = current.slice(0, charIndex);
        typedEl.classList.add('caret-blink');

        if (!isDeleting && charIndex < current.length) {
            charIndex++;
            setTimeout(typeLoop, 70);
        } else if (!isDeleting && charIndex === current.length) {
            setTimeout(() => {
                isDeleting = true;
                typeLoop();
            }, 2200);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeLoop, 35);
        } else {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 400);
        }
    }
    typeLoop();

    /* ==================================================
       3. NAVBAR SAAT SCROLL + MENU AKTIF
       ================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function handleScroll() {
        if (window.scrollY > 40) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        const pos = window.scrollY + 100;
        sections.forEach(section => {
            if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
                });
            }
        });
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* ==================================================
       4. HAMBURGER MENU (mobile)
       ================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
/* ==================================================
       5. EFEK TILT 3D PADA KARTU BRAND
       ================================================== */
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 18;
            const rotateX = (0.5 - y) * 18;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* ==================================================
       6. REVEAL SAAT SCROLL (IntersectionObserver)
       ================================================== */
    const revealEls = document.querySelectorAll('.reveal, .brand-card, .feature-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    /* ==================================================
       7. COUNTER STATISTIK
       ================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        }
        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        statNumbers.forEach(el => statObserver.observe(el));
    } else {
        statNumbers.forEach(el => (el.textContent = el.dataset.target));
    }

    /* ==================================================
       8. LOGO UNTUK SCROLL KE ATAS
       ================================================== */
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==================================================
       9. TAHUN DI FOOTER
       ================================================== */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});