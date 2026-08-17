/* ============================================================
   2T SECURITY CAMERA — Script
   Menampilkan tahun otomatis & efek navbar saat scroll
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* Tahun otomatis di footer */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Navbar mengecil + garis merah saat scroll */
    const nav = document.querySelector('nav');

    function handleScroll() {
        if (window.scrollY > 40) {
            nav.style.padding = '8px 5%';
            nav.style.borderBottom = '2px solid var(--red)';
        } else {
            nav.style.padding = '14px 5%';
            nav.style.borderBottom = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* Sorot menu aktif berdasarkan posisi scroll */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a') || document.querySelectorAll('nav a');

    function highlightMenu() {
        const pos = window.scrollY + 100;
        sections.forEach(section => {
            if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
                });
            }
        });
    }

    window.addEventListener('scroll', highlightMenu);
    highlightMenu();

});
