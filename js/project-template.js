import { projects } from './data/index.js';

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
  const generateDOM = (currentLang) => {
    const isFa = currentLang === 'fa';
    
    function toPersianDigits(str) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return String(str).replace(/\d/g, x => farsiDigits[x]);
    }

    const yearStr = isFa ? toPersianDigits(projectConfig.year) : projectConfig.year;
    
    // Metadata Bar
    let metaHTML = '';
    if(projectConfig.specs) {
      const area = projectConfig.specs.area ? projectConfig.specs.area[currentLang] : '';
      const status = projectConfig.specs.status ? projectConfig.specs.status[currentLang] : '';
      
      metaHTML = `
        <div class="project-meta-bar reveal">
          <div class="meta-item"><span>${isFa ? 'موقعیت' : 'Location'}</span><strong>${projectConfig.location[currentLang]}</strong></div>
          <div class="meta-item"><span>${isFa ? 'سال' : 'Year'}</span><strong>${yearStr}</strong></div>
          <div class="meta-item"><span>${isFa ? 'کاربری' : 'Typology'}</span><strong>${projectConfig.category[currentLang]}</strong></div>
          ${area ? `<div class="meta-item"><span>${isFa ? 'مساحت' : 'Area'}</span><strong>${area}</strong></div>` : ''}
          ${status ? `<div class="meta-item"><span>${isFa ? 'وضعیت' : 'Status'}</span><strong>${status}</strong></div>` : ''}
        </div>
      `;
    }

    // Dynamic Gallery Grids
    let galleryTopHTML = '';
    let galleryBottomHTML = '';
    if(projectConfig.galleryImages && projectConfig.galleryImages.length > 0) {
      const g = projectConfig.galleryImages;
      if(g[0]) {
        galleryTopHTML = `<div class="gallery-panorama reveal" style="margin-bottom: 2rem;"><img src="${g[0]}" class="lightbox-trigger" loading="lazy"></div>`;
      }

      galleryBottomHTML += `<div class="editorial-gallery">`;
      if(g[1] && g[2]) galleryBottomHTML += `
        <div class="gallery-diptych reveal">
          <img src="${g[1]}" class="lightbox-trigger" loading="lazy">
          <img src="${g[2]}" class="lightbox-trigger" loading="lazy">
        </div>`;
      if(g[3] && g[4] && g[5]) galleryBottomHTML += `
        <div class="gallery-triptych reveal">
          <img src="${g[3]}" class="lightbox-trigger" loading="lazy">
          <img src="${g[4]}" class="lightbox-trigger" loading="lazy">
          <img src="${g[5]}" class="lightbox-trigger" loading="lazy">
        </div>`;
        
      if(g.length > 6) {
        galleryBottomHTML += `<div class="gallery-triptych reveal">`;
        for(let i = 6; i < g.length; i++) {
          galleryBottomHTML += `<img src="${g[i]}" class="lightbox-trigger" loading="lazy">`;
        }
        galleryBottomHTML += `</div>`;
      }
      galleryBottomHTML += `</div>`;
    }

    let spatialHTML = '';
    if (projectConfig.spatialPlan) {
      spatialHTML = `<div id="spatial-container"></div>`;
    }

    let specsDrawerHTML = '';
    if (projectConfig.details) {
      const keys = Object.keys(projectConfig.details);
      if(keys.length > 0) {
        let gridHTML = '';
        keys.forEach(k => {
          gridHTML += `
            <div class="spec-block">
              <span class="spec-label">${k}</span>
              <span class="spec-value">${projectConfig.details[k][currentLang] || projectConfig.details[k].en}</span>
            </div>
          `;
        });
        specsDrawerHTML = `<div class="specs-grid">${gridHTML}</div>`;
      }
    }

    const i18n = {
      narrative: currentLang === 'fa' ? 'شرح پروژه' : 'PROJECT NARRATIVE',
      archive: currentLang === 'fa' ? 'آرشیو بصری' : 'VISUAL ARCHIVE',
      spatial: currentLang === 'fa' ? 'نقشه و پلان' : 'SPATIAL MAPPING',
      specs: currentLang === 'fa' ? 'مشخصات و متریال' : 'MATERIALITY & SPECIFICATIONS',
    };

    mainContainer.innerHTML = `
      <section class="project-hero parallax-hero reveal">
        <img src="${projectConfig.coverImage}" alt="Hero Image" class="lightbox-trigger">
        <div class="project-hero-overlay">
          <h1 class="project-title" id="projectTitle">${projectConfig.title[currentLang]}</h1>
        </div>
      </section>

      ${metaHTML}

      <!-- 01: NARRATIVE -->
      <div class="architectural-section reveal" id="section-narrative">
        <div class="section-index">
          <span class="idx-num">01 /</span>
          <span class="idx-title">${i18n.narrative}</span>
        </div>
        <div class="section-body">
          ${galleryTopHTML}
          <div class="brief-text narrative-text">
            ${projectConfig.description ? (projectConfig.description[currentLang] || '') : ''}
          </div>
        </div>
      </div>

      <!-- 02: VISUAL ARCHIVE -->
      ${galleryBottomHTML ? `
      <div class="architectural-section reveal tonal-shift-light" id="section-archive">
        <div class="section-index">
          <span class="idx-num">02 /</span>
          <span class="idx-title">${i18n.archive}</span>
        </div>
        <div class="section-body">
          ${galleryBottomHTML}
        </div>
      </div>
      ` : ''}

      <!-- 03: SPATIAL MAPPING -->
      ${spatialHTML ? `
      <div class="architectural-section reveal tonal-shift-drafting" id="section-spatial">
        <div class="section-index">
          <span class="idx-num">03 /</span>
          <span class="idx-title">${i18n.spatial}</span>
        </div>
        <div class="section-body">
          ${spatialHTML}
        </div>
      </div>
      ` : ''}

      <!-- 04: MATERIALITY -->
      ${specsDrawerHTML ? `
      <div class="architectural-section reveal tonal-shift-dark" id="section-specs">
        <div class="section-index">
          <span class="idx-num">04 /</span>
          <span class="idx-title">${i18n.specs}</span>
        </div>
        <div class="section-body">
          ${specsDrawerHTML}
        </div>
      </div>
      ` : ''}
    `;

    // Initialize Interactive Plan after injecting DOM
    if (projectConfig.spatialPlan && window.InteractivePlan) {
      new window.InteractivePlan('#spatial-container', projectConfig.spatialPlan);
    }

    // Rebind Lightbox Triggers for newly generated DOM
    bindLightbox();
  };

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

  // 3. Next Project Teaser
  const teaser = document.getElementById('nextProjectTeaser');
  const nextTitle = document.getElementById('nextProjectTitle');
  if (teaser && nextTitle && nextProject) {
    teaser.style.display = 'block';
    teaser.href = '/projects/' + nextProject.slug + '/';
    
    // Set background image
    const bg = teaser.querySelector('.next-project-bg');
    if(bg) bg.style.backgroundImage = `url(${nextProject.coverImage})`;
  }

  // 5. Update Translation Loop
  const updateTexts = (currentLang) => {
    generateDOM(currentLang);
    
    if (teaser && nextTitle && nextProject) {
      nextTitle.textContent = nextProject.title[currentLang];
      const nextLabel = teaser.querySelector('.next-label');
      if (nextLabel) nextLabel.textContent = currentLang === 'fa' ? 'پروژه بعدی' : 'Next Project';
      
      const transitionLabel = document.getElementById('nextTransitionLabel');
      if (transitionLabel) transitionLabel.textContent = currentLang === 'fa' ? 'پروژه بعدی' : 'NEXT TRANSITION';
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
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
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
