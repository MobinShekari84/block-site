import { projects } from './data/index.js';
import { assetManifest } from './data/assetManifest.js';

document.addEventListener('DOMContentLoaded', () => {
  const projectId = document.body.dataset.projectId;
  const projectIndex = projects.findIndex(p => p.id === projectId || p.slug === projectId);
  const projectConfig = projects[projectIndex];

  if (!projectConfig) {
    console.error(`Project ${projectId} not found.`);
    return;
  }

  // Next Project Setup
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const mainContainer = document.getElementById('project-container');
  const lang = document.documentElement.lang || localStorage.getItem('blockLang') || 'en';

  // 1. Generate DOM dynamically

  // 2. Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  let images = [];
  let currentIndex = 0;

  function bindLightbox() {
    images = Array.from(document.querySelectorAll('.lightbox-trigger'));
    images.forEach((img, idx) => {
      img.addEventListener('click', () => openLightbox(idx));
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    if(lbImg) lbImg.src = images[currentIndex].src;
    if(lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
  }

  function closeLightbox() {
    if(lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = '';
  }

  function navLightbox(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    if(lbImg && images[currentIndex]) lbImg.src = images[currentIndex].src;
  }

  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', () => navLightbox(-1));
  document.getElementById('lbNext')?.addEventListener('click', () => navLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });



  setTimeout(() => {
    if (projectConfig.spatialPlan && window.InteractivePlan) {
      new window.InteractivePlan('#spatial-container', projectConfig.spatialPlan);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    bindLightbox();
  }, 100);

  // 5. Update Translation Loop
  const updateTexts = (currentLang) => {
    try {
  
    } catch (err) {
      document.getElementById('project-container').innerHTML = '<div style="color:red; padding:100px; font-size:24px;">' + err.stack + '</div>';
      console.error(err);
    }
    

    // Re-observe elements for reveal animations after DOM is regenerated
    setTimeout(() => {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }, 100);
  };

  const langObserver = new MutationObserver(() => {
    const currentLang = document.documentElement.lang || 'en';
    updateTexts(currentLang);
  });
  
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  
  // Initial Boot
  updateTexts(lang);
});
