// =====================
// CAROUSEL FUNCTIONALITY
// =====================
let currentIndex = 0;
const wrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.carousel-container');
const totalSlides = slides.length;

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function initCarousel() {
    if (wrapper && slides.length > 0) {
        updateCarousel();
    }
}

function updateCarousel() {
    if (!wrapper) return;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalSlides) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateCarousel();
    resetAutoplay();
}

function currentSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
}

if (container) {
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    if (diffY < 100) {
        if (diffX > swipeThreshold) moveSlide(1);
        else if (diffX < -swipeThreshold) moveSlide(-1);
    }
}

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

if (container) {
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('mouseleave', dragEnd);
    container.addEventListener('mousemove', drag);
}

function dragStart(e) {
    isDragging = true;
    startPos = e.clientX;
    container.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    currentTranslate = prevTranslate + e.clientX - startPos;
}

function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) moveSlide(1);
    else if (movedBy > 100) moveSlide(-1);
    prevTranslate = currentTranslate;
}

let autoplayInterval = setInterval(() => moveSlide(1), 5000);

function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => moveSlide(1), 5000);
}

if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    container.addEventListener('mouseleave', () => resetAutoplay());
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveSlide(-1);
    else if (e.key === 'ArrowRight') moveSlide(1);
});

document.addEventListener('DOMContentLoaded', initCarousel);

// =====================
// MOBILE MENU TOGGLE
// =====================
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    if (menu) menu.classList.toggle('active');
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu) menu.classList.remove('active');
    });
});

// =====================
// SMOOTH SCROLLING
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
