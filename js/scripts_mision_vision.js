document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open'); 
        }
    });

   // === QR Logic ===
    const qrContainer = document.querySelector('.qr-container');
    const qrToggleBtn = document.getElementById('qrToggleBtn');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Inicializar estado según el dispositivo
    if (isMobile()) {
        if (qrContainer) qrContainer.style.display = 'none';
        if (qrToggleBtn) qrToggleBtn.style.display = 'flex';
    } else {
        if (qrContainer) qrContainer.style.display = 'block';
        if (qrToggleBtn) qrToggleBtn.style.display = 'none';
    }

    // Ocultar QR al hacer clic
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
            void qrContainer.offsetWidth; // Forzar reflow
            qrContainer.classList.remove('hide');
            qrContainer.style.transformOrigin = 'bottom right';
            qrToggleBtn.style.display = 'none';
        });
    }

    // Si cambia el tamaño de la pantalla después de cargar
    window.addEventListener('resize', () => {
        if (isMobile()) {
            if (qrContainer) qrContainer.style.display = 'none';
            if (qrToggleBtn) qrToggleBtn.style.display = 'flex';
        } else {
            if (qrContainer) qrContainer.style.display = 'block';
            if (qrToggleBtn) qrToggleBtn.style.display = 'none';
        }
    });
});

