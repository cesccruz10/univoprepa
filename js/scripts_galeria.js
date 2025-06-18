document.addEventListener("DOMContentLoaded", function () {
    // --- MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    }

    // --- LIGHTBOX MEJORADO ---
    const images = document.querySelectorAll('.card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;

    function showImage(index) {
        const selectedImg = images[index];
        lightboxImg.src = selectedImg.src;
        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showImage(i));
            dotsContainer.appendChild(dot);
        });
    }

    // Crear dots solo una vez
    if (dotsContainer && images.length) {
        createDots();
    }

    images.forEach((img, i) => {
        img.addEventListener('click', () => {
            lightbox.classList.add('open');
            images.forEach((img, i) => {
                img.addEventListener('click', () => {
                    // Setea el top del lightbox según el scroll actual
                    lightbox.style.top = window.scrollY + 'px';

                    lightbox.classList.add('open');
                    showImage(i);
                });
            });
            showImage(i);
        });
    });

    closeBtn?.addEventListener('click', () => {
        lightbox.classList.remove('open');
    });

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
        }
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // Cerrar lightbox con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
        }
        // Opcional: Navegar con flechas (izquierda/derecha)
        else if (e.key === 'ArrowRight' && lightbox.classList.contains('open')) {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        else if (e.key === 'ArrowLeft' && lightbox.classList.contains('open')) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
    });

    // --- QR RESPONSIVE ---
    const qrContainer = document.querySelector('.qr-container');
    const qrToggleBtn = document.getElementById('qrToggleBtn');

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    function updateQRVisibility() {
        if (isMobile()) {
            if (qrContainer) qrContainer.style.display = 'none';
            if (qrToggleBtn) qrToggleBtn.style.display = 'flex';
        } else {
            if (qrContainer) qrContainer.style.display = 'block';
            if (qrToggleBtn) qrToggleBtn.style.display = 'none';
        }
    }

    updateQRVisibility();

    if (qrContainer && qrToggleBtn) {
        qrContainer.addEventListener('click', () => {
            qrContainer.classList.add('hide');
            setTimeout(() => {
                qrContainer.style.display = 'none';
                qrToggleBtn.style.display = 'flex';
            }, 400);
        });

        qrToggleBtn.addEventListener('click', () => {
            qrContainer.style.display = 'block';
            // Trigger reflow for CSS animation reset
            void qrContainer.offsetWidth;
            qrContainer.classList.remove('hide');
            qrContainer.style.transformOrigin = 'bottom right';
            qrToggleBtn.style.display = 'none';
        });
    }

    window.addEventListener('resize', updateQRVisibility);
});
