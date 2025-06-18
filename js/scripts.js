document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.slider-container');

    // ✅ Imágenes de fondo distintas
    const backgroundImages = [
        'img/img/pics/IMG_4908.JPG',   // Fondo para slide 0
        'img/img/pics/IMG_4912.JPG',   // Fondo para slide 1
        'img/img/pics/IMG_4911.JPG'    // Fondo para slide 2
    ];

    let currentSlide = 0;
    let slideInterval;

    function isMobile() {
        return window.innerWidth <= 1226;
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        stopSlider();
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        startSlider();
    }

    function prevSlide() {
        stopSlider();
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        startSlider();
    }

    function startSlider() {
        if (!slideInterval && slides.length > 1) {
            slideInterval = setInterval(() => {
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }, 6000);
        }
    }

    function stopSlider() {
        clearInterval(slideInterval);
        slideInterval = null;
    }

    function changeBackground(index) {
        if (isMobile()) return;
        const bg = backgroundImages[index % backgroundImages.length];
        document.body.style.transition = 'background-image 1s ease-in-out';
        document.body.style.backgroundImage = `url('${bg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
    }

    // Mostrar primer slide
    showSlide(0);
    startSlider();

    // Cambiar el fondo cada 10 segundos
    if (!isMobile()) {
        changeBackground(0);
        let bgIndex = 0;

        setInterval(() => {
            bgIndex = (bgIndex + 1) % backgroundImages.length;
            changeBackground(bgIndex);
        }, 10000);
    }

    // === Menú responsivo ===
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

    if (isMobile()) {
        if (qrContainer) qrContainer.style.display = 'none';
        if (qrToggleBtn) qrToggleBtn.style.display = 'flex';
    } else {
        if (qrContainer) qrContainer.style.display = 'block';
        if (qrToggleBtn) qrToggleBtn.style.display = 'none';
    }

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
            void qrContainer.offsetWidth;
            qrContainer.classList.remove('hide');
            qrContainer.style.transformOrigin = 'bottom right';
            qrToggleBtn.style.display = 'none';
        });
    }

    window.addEventListener('resize', () => {
        if (isMobile()) {
            if (qrContainer) qrContainer.style.display = 'none';
            if (qrToggleBtn) qrToggleBtn.style.display = 'flex';
        } else {
            if (qrContainer) qrContainer.style.display = 'block';
            if (qrToggleBtn) qrToggleBtn.style.display = 'none';
            changeBackground(currentSlide);
        }
    });
});