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

    /* Menu hamburger di HP */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

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

    /* Daftar harga CCTV (tab Dahua / HiLook) */
    const priceData = {
        dahua: [{ c: 2, p: 2200000 }, { c: 3, p: 2700000 }, { c: 4, p: 3200000 }, { c: 6, p: 4900000 }, { c: 8, p: 5900000 }],
        hilook: [{ c: 2, p: 2100000 }, { c: 3, p: 2600000 }, { c: 4, p: 3100000 }, { c: 6, p: 4800000 }, { c: 8, p: 5800000 }]
    };
    const priceNames = { dahua: 'PAKET DAHUA', hilook: 'PAKET HILOOK' };
    const priceList = document.getElementById('priceList');

    function fmtRupiah(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

    function renderPrice(brand) {
        if (!priceList) return;
        priceList.innerHTML = priceData[brand].map(d => `
            <div class="price-card">
                <h3>${d.c} CAMERA</h3>
                <div class="cam">${priceNames[brand]} · HD CCTV Package</div>
                <div class="price">${fmtRupiah(d.p)}</div>
                <div class="extra">Free Cable 10m &amp; Pemasangan Gratis</div>
            </div>`).join('');
    }

    document.querySelectorAll('.price-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.price-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPrice(tab.dataset.brand);
        });
    });

    if (priceList) renderPrice('dahua');

});
