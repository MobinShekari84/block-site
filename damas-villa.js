document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.gallery-img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
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

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => navLightbox(-1));
  lbNext.addEventListener('click', () => navLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });

  // Translation Hooks
  const tSub = {
    en: {
      title: 'Damas Villa',
      locLabel: 'Location',
      locValue: 'Damavand, Iran',
      yearLabel: 'Year',
      yearValue: '2026',
      typeLabel: 'Typology',
      typeValue: 'Residential'
    },
    fa: {
      title: 'ویلای داماس',
      locLabel: 'موقعیت',
      locValue: 'دماوند، ایران',
      yearLabel: 'سال',
      yearValue: '۱۴۰۵',
      typeLabel: 'کاربری',
      typeValue: 'مسکونی'
    }
  };

  const title = document.getElementById('projectTitle');
  const locL = document.getElementById('metaLocLabel');
  const locV = document.getElementById('metaLocValue');
  const yearL = document.getElementById('metaYearLabel');
  const yearV = document.getElementById('metaYearValue');
  const typeL = document.getElementById('metaTypeLabel');
  const typeV = document.getElementById('metaTypeValue');

  const langObserver = new MutationObserver(() => {
    const lang = document.documentElement.lang || 'en';
    const isFa = lang === 'fa';
    
    title.textContent = tSub[lang].title;
    locL.textContent = tSub[lang].locLabel;
    locV.textContent = tSub[lang].locValue;
    yearL.textContent = tSub[lang].yearLabel;
    yearV.textContent = tSub[lang].yearValue;
    typeL.textContent = tSub[lang].typeLabel;
    typeV.textContent = tSub[lang].typeValue;

    document.body.classList.toggle('lang-fa', isFa);
  });
  langObserver.observe(document.documentElement, { attributes: true });
});
