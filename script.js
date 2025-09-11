const avaliacoesSlider = document.querySelector('.avaliacoes-slider');
const avaliacoesSlides = document.querySelectorAll('.avaliacoes-slide');
let avaliacoesIndex = 0;

function avaliacoesShowSlide(i) {
  if (i < 0) avaliacoesIndex = avaliacoesSlides.length - 1;
  else if (i >= avaliacoesSlides.length) avaliacoesIndex = 0;
  else avaliacoesIndex = i;
  avaliacoesSlider.style.transform = `translateX(${-avaliacoesIndex * 100}%)`;
}

function avaliacoesPrevSlide() {
  avaliacoesShowSlide(avaliacoesIndex - 1);
}

function avaliacoesNextSlide() {
  avaliacoesShowSlide(avaliacoesIndex + 1);
}

function isMobile() {
    return window.innerWidth <= 600;
}

let startX = 0;
let currentTranslate = 0;
let isDragging = false;

const slider = document.querySelector('.avaliacoes-slider');
const slides = document.querySelectorAll('.avaliacoes-slide');
const slideCount = slides.length;

// Touch events only on mobile
if (isMobile()) {
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentTranslate = -avaliacoesIndex * slider.offsetWidth;
        slider.style.transition = 'none';
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        slider.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50 && avaliacoesIndex > 0) {
            avaliacoesPrevSlide();
        } else if (diff < -50 && avaliacoesIndex < slideCount - 1) {
            avaliacoesNextSlide();
        } else {
            avaliacoesShowSlide(avaliacoesIndex);
        }
        slider.style.transition = 'transform 0.5s';
    });
}