/**
 * Generic Project Template Controller
 * Handles Universal Lightbox & Bilingual translations via data attributes.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- Universal Lightbox ---
  const images = Array.from(document.querySelectorAll('.lightbox-trigger'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Hide navbar to prevent z-index collision with close button
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = '';
  }

  function navLightbox(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    lbImg.src = images[currentIndex].src;
  }

  images.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navLightbox(-1));
  if (lbNext) lbNext.addEventListener('click', () => navLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });

  // --- Bilingual Switcher ---
  // Any element with data-en and data-fa will swap its textContent automatically
  const bilingualElements = document.querySelectorAll('[data-en][data-fa]');
  
  const langObserver = new MutationObserver(() => {
    const lang = document.documentElement.lang || 'en';
    const isFa = lang === 'fa';
    
    bilingualElements.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    document.body.classList.toggle('lang-fa', isFa);
  });
  
  // Initialize and observe
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  
  // Trigger initial language set
  const initialLang = document.documentElement.lang || 'en';
  bilingualElements.forEach(el => {
    el.textContent = el.getAttribute(`data-${initialLang}`);
  });
  document.body.classList.toggle('lang-fa', initialLang === 'fa');
});
