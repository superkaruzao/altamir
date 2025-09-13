const avaliacoesSlider = document.querySelector('.avaliacoes-slider');
const avaliacoesSlides = document.querySelectorAll('.avaliacoes-slide');
let avaliacoesIndex = 0;

function getSlidesPerView() {
    return window.innerWidth >= 1024 ? 3 : 1;
}

function avaliacoesShowSlide(i) {
    const total = avaliacoesSlides.length;
    const slidesPerView = getSlidesPerView();
    const maxIndex = total - slidesPerView;
    if (i < 0) avaliacoesIndex = maxIndex;
    else if (i > maxIndex) avaliacoesIndex = 0;
    else avaliacoesIndex = i;
    const slideWidth = 100 / slidesPerView;
    avaliacoesSlider.style.transform = `translateX(-${avaliacoesIndex * slideWidth}%)`;
}

function avaliacoesPrevSlide() {
    avaliacoesShowSlide(avaliacoesIndex - 1);
}

function avaliacoesNextSlide() {
    avaliacoesShowSlide(avaliacoesIndex + 1);
}

// Atualiza ao redimensionar
window.addEventListener('resize', () => {
    avaliacoesShowSlide(avaliacoesIndex);
});

// Swipe/touch para mobile
let startX = 0;
let currentTranslate = 0;
let isDragging = false;

function isMobile() {
    return window.innerWidth <= 600;
}

function addTouchEvents() {
    avaliacoesSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentTranslate = -avaliacoesIndex * avaliacoesSlider.offsetWidth;
        avaliacoesSlider.style.transition = 'none';
    });

    avaliacoesSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        avaliacoesSlider.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    avaliacoesSlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50 && avaliacoesIndex > 0) {
            avaliacoesPrevSlide();
        } else if (diff < -50 && avaliacoesIndex < avaliacoesSlides.length - 1) {
            avaliacoesNextSlide();
        } else {
            avaliacoesShowSlide(avaliacoesIndex);
        }
        avaliacoesSlider.style.transition = 'transform 0.5s';
    });
}

// Adiciona/remover eventos de touch conforme o tamanho da tela
function handleTouchEvents() {
    if (isMobile()) {
        addTouchEvents();
    } else {
        // Remove touch events no desktop (opcional)
        avaliacoesSlider.ontouchstart = null;
        avaliacoesSlider.ontouchmove = null;
        avaliacoesSlider.ontouchend = null;
    }
}

window.addEventListener('resize', handleTouchEvents);
handleTouchEvents();

// Inicializa o slider
avaliacoesShowSlide(avaliacoesIndex);