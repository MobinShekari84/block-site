import { siteMeta, projects } from './data/index.js?v=5';

/* ============================================
   BLOCK ARCHITECTURE STUDIO — Main Script
   Hero slideshow, scroll effects, language toggle
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('blockLang') || 'en';
  let currentSlide = 0;

  // ── Scroll Reveal ──────────────────────────────
  window.revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          window.revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  let slideInterval;
  const SLIDE_DURATION = 6000;

  // ── DOM Elements ──────────────────────────────
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navCenter = document.getElementById('navCenter');
  const navSocial = document.getElementById('navSocial');
  const langBtn = document.getElementById('langSwitcher');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('.hero-indicator');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBtnText = document.getElementById('heroBtnText');
  const heroActionBtn = document.getElementById('heroActionBtn');
  const counterCurrent = document.getElementById('counterCurrent');
  const counterTotal = document.getElementById('counterTotal');

  // ── Navbar Scroll ──────────────────────────────
  const handleNavScroll = () => {
    if(navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Mobile Toggle ──────────────────────────────
  if(navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navCenter.classList.toggle('mobile-open');
      navSocial.classList.toggle('mobile-open');
      navbar.classList.toggle('menu-open');
    });
  }

  // ── Hero Slideshow ─────────────────────────────
  function goToSlide(index) {
    if(heroSlides.length > 0) heroSlides[currentSlide].classList.remove('active');
    if(heroIndicators.length > 0) heroIndicators[currentSlide].classList.remove('active');

    currentSlide = index;

    // Force reflow so CSS animation restarts from 0 width
    if(heroIndicators.length > 0) void heroIndicators[currentSlide].offsetWidth;

    if(heroSlides.length > 0) heroSlides[currentSlide].classList.add('active');
    if(heroIndicators.length > 0) heroIndicators[currentSlide].classList.add('active');

    // Update text
    const slideData = siteMeta[currentLang].hero.slides[currentSlide];
        if(heroTitle && slideData) heroTitle.textContent = slideData.title;
    if(heroSubtitle && slideData) heroSubtitle.textContent = slideData.subtitle;
    if(heroActionBtn && slideData.link) heroActionBtn.href = slideData.link;
    
    const isFa = currentLang === 'fa';
    const num = String(currentSlide + 1).padStart(2, '0');
    if(counterCurrent) counterCurrent.textContent = isFa ? toPersianDigits(num) : num;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }

  function startSlideshow() {
    if(heroSlides.length === 0) return;
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Handle tab visibility to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  if(heroIndicators.length > 0) {
    heroIndicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        goToSlide(i);
        startSlideshow();
      });
    });
  }

  // Initialize slideshow if elements exist
  if(heroSlides.length > 0) {
    const initNum = String(heroSlides.length).padStart(2, '0');
    if(counterTotal) counterTotal.textContent = currentLang === 'fa' ? toPersianDigits(initNum) : initNum;
    goToSlide(0);
    startSlideshow();
  }

  // ── Helpers ──────────────────────────
  function toPersianDigits(str) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(str).replace(/\d/g, x => farsiDigits[x]);
  }

  // ── Language Switcher ──────────────────────────
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('blockLang', lang);
    const t = siteMeta[lang];
    const isFa = lang === 'fa';

    document.documentElement.lang = lang;
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';

    // Nav links
    const navHome_el = document.getElementById('navHome'); if (navHome_el) navHome_el.textContent = t.nav.home;
    const navProjects_el = document.getElementById('navProjects'); if (navProjects_el) navProjects_el.textContent = t.nav.projects;
    const navAbout_el = document.getElementById('navAbout'); if (navAbout_el) navAbout_el.textContent = t.nav.about;

    // Lang button
    if(langBtn) langBtn.textContent = isFa ? 'EN' : 'FA';

    // Hero
    if(heroSlides.length > 0) {
      const slideData = t.hero.slides[currentSlide];
            if(heroTitle && slideData) heroTitle.textContent = slideData.title;
      if(heroSubtitle && slideData) heroSubtitle.textContent = slideData.subtitle;
      if(heroActionBtn && slideData.link) heroActionBtn.href = slideData.link;
      if(heroBtnText) heroBtnText.textContent = t.hero.btn;

      // Update Counter Total
      const totalNum = String(heroSlides.length).padStart(2, '0');
      if(counterTotal) counterTotal.textContent = isFa ? toPersianDigits(totalNum) : totalNum;
      
      // Update Counter Current
      const currentNum = String(currentSlide + 1).padStart(2, '0');
      if(counterCurrent) counterCurrent.textContent = isFa ? toPersianDigits(currentNum) : currentNum;
    }

    // Projects section
    const pLabel = document.getElementById('projectsLabel'); if(pLabel) pLabel.textContent = t.projects.label;
    const pTitle = document.getElementById('projectsTitle'); if(pTitle) pTitle.textContent = t.projects.title;
    // About Summary section
    const asLabel = document.getElementById('aboutSummaryLabel'); if(asLabel) asLabel.textContent = t.aboutSummary.label;
    const asTitle = document.getElementById('aboutSummaryTitle'); if(asTitle) asTitle.textContent = t.aboutSummary.title;
    const asText = document.getElementById('aboutSummaryText');
    if(asText) {
      asText.textContent = t.aboutSummary.text;
      if(isFa) asText.classList.add('lang-fa'); else asText.classList.remove('lang-fa');
    }
    const asBtn = document.getElementById('aboutSummaryBtnText'); if(asBtn) asBtn.textContent = t.aboutSummary.btn;
    
    // Dynamically render featured projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      const featuredProjects = projects.filter(p => p.isFeatured);
      projectsGrid.innerHTML = ''; // clear grid
      featuredProjects.forEach((item) => {
        const yearStr = isFa ? toPersianDigits(item.year) : item.year;
        const link = `/projects/${item.slug}/`;
        
        projectsGrid.innerHTML += `
          <article class="project-card reveal">
            <a href="${link}" class="project-card-image">
              <img src="${item.coverImage}" alt="${item.title.en}" loading="lazy" width="800" height="1000">
              <div class="project-card-overlay">
                <span class="project-card-view">${item.title[lang]}</span>
              </div>
            </a>
            <div class="project-card-info">
              <h3 class="project-card-title">${item.title[lang]}</h3>
              <p class="project-card-meta">${item.category[lang]} — ${item.location[lang]}, ${yearStr}</p>
            </div>
          </article>
        `;
      });
      // Re-observe newly created project cards
      if (typeof window.revealObserver !== 'undefined') {
        projectsGrid.querySelectorAll('.project-card').forEach(el => window.revealObserver.observe(el));
      }
    }

    // Footer
    const footerDesc_el = document.getElementById('footerDesc'); if (footerDesc_el) footerDesc_el.textContent = t.footer.desc;
    const footerNavTitle_el = document.getElementById('footerNavTitle'); if (footerNavTitle_el) footerNavTitle_el.textContent = t.footer.nav;
    const footerContactTitle_el = document.getElementById('footerContactTitle'); if (footerContactTitle_el) footerContactTitle_el.textContent = t.footer.contact;
    const footerEmail_el = document.getElementById('footerEmail'); if (footerEmail_el) footerEmail_el.textContent = t.footer.email;
    const footerPhone_el = document.getElementById('footerPhone'); if (footerPhone_el) footerPhone_el.textContent = t.footer.phone;
    const footerAddress_el = document.getElementById('footerAddress'); if (footerAddress_el) footerAddress_el.textContent = t.footer.address;
    const footerCopyright_el = document.getElementById('footerCopyright'); if (footerCopyright_el) footerCopyright_el.textContent = t.footer.copyright;
    const footerCredit_el = document.getElementById('footerCredit'); if (footerCredit_el) footerCredit_el.textContent = t.footer.credit;

    // Footer nav links
    const footerHome_el = document.getElementById('footerHome'); if (footerHome_el) footerHome_el.textContent = t.nav.home;
    const footerProjects_el = document.getElementById('footerProjects'); if (footerProjects_el) footerProjects_el.textContent = t.nav.projects;
    const footerAbout_el = document.getElementById('footerAbout'); if (footerAbout_el) footerAbout_el.textContent = t.nav.about;

    // Toggle Persian font class and RTL direction
    document.body.classList.toggle('lang-fa', isFa);

    // Update mega menu if it exists
    if (typeof window.updateMegaMenuLang === 'function') {
      window.updateMegaMenuLang();
    }
  }

  if(langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'en' ? 'fa' : 'en');
    });
  }
  
  // Setup initial state
  setLanguage(currentLang);



  // ── Smooth scroll for anchor links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Skip smooth scroll if it's the projects trigger
      if (link.id === 'navProjects' || link.id === 'footerProjects' || !targetId.startsWith('#')) {
        return; 
      }

      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      } else {
        window.location.href = '/' + targetId;
      }

      // Close mobile menu
      if(navToggle) navToggle.classList.remove('open');
      if(navCenter) navCenter.classList.remove('mobile-open');
      if(navSocial) navSocial.classList.remove('mobile-open');
    });
  });

  // Observe all reveal elements
  document.querySelectorAll('.project-card, .reveal').forEach((el) => {
    window.revealObserver.observe(el);
  });

  // ── Mega Menu ─────────────────────────────────
  function initMegaMenu() {
    const megaMenuHTML = `
      <div class="projects-mega-menu" id="projectsMegaMenu" aria-hidden="true">
        <div class="mega-menu-header">
          <div class="mega-menu-title" id="megaMenuTitle">PROJECT ARCHIVE</div>
          <button class="mega-menu-close" id="megaMenuClose" aria-label="Close">
            <span class="close-text" id="megaMenuCloseText">CLOSE</span>
            <span class="close-icon">&times;</span>
          </button>
        </div>
        <div class="mega-menu-filters" id="megaMenuFilters">
          <!-- Filters injected dynamically -->
        </div>
        <div class="mega-menu-content">
          <div class="mega-menu-list" id="megaMenuList"></div>
          <div class="mega-menu-preview" id="megaMenuPreview">
            <img src="" alt="Project Preview" id="megaMenuPreviewImg" loading="lazy">
            <div class="mega-menu-preview-meta" id="megaMenuPreviewMeta"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', megaMenuHTML);

    const megaMenu = document.getElementById('projectsMegaMenu');
    const closeBtn = document.getElementById('megaMenuClose');
    const listContainer = document.getElementById('megaMenuList');
    const previewImg = document.getElementById('megaMenuPreviewImg');
    const previewMeta = document.getElementById('megaMenuPreviewMeta');
    const filtersContainer = document.getElementById('megaMenuFilters');
    
    let activeCategory = 'all';

    function openMenu() {
      megaMenu.setAttribute('aria-hidden', 'false');
      megaMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderList();
    }

    function closeMenu() {
      megaMenu.setAttribute('aria-hidden', 'true');
      megaMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    function handleProjectsClick(e) {
      e.preventDefault();
      openMenu();
    }

    // Attach to triggers
    const triggers = document.querySelectorAll('#navProjects, #footerProjects');
    triggers.forEach(t => t.addEventListener('click', handleProjectsClick));

    closeBtn.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    function renderList() {
      const isFa = currentLang === 'fa';
      const categories = ['all', 'Residential', 'Commercial', 'Cultural', 'Mixed Use', 'Hospitality'];
      
      const filterLabels = {
        'all': isFa ? 'همه' : 'All',
        'Residential': isFa ? 'مسکونی' : 'Residential',
        'Commercial': isFa ? 'تجاری' : 'Commercial',
        'Cultural': isFa ? 'فرهنگی' : 'Cultural',
        'Mixed Use': isFa ? 'ترکیبی' : 'Mixed Use',
        'Hospitality': isFa ? 'اقامتی' : 'Hospitality'
      };

      filtersContainer.innerHTML = categories.map(cat => `
        <button class="filter-pill ${activeCategory === cat ? 'active' : ''}" data-filter="${cat}">
          ${filterLabels[cat]}
        </button>
      `).join('');

      filtersContainer.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
          activeCategory = e.target.getAttribute('data-filter');
          renderList();
        });
      });

      const filtered = activeCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category.en === activeCategory);

      listContainer.innerHTML = filtered.map((p, index) => {
        const num = String(index + 1).padStart(2, '0');
        const year = isFa ? toPersianDigits(p.year) : p.year;
        const link = `/projects/${p.slug}/`;
        return `
          <a href="${link}" class="mega-list-item" data-id="${p.slug}" data-title="${p.title[currentLang]}" data-meta="${p.category[currentLang]} — ${p.location[currentLang]}, ${year}">
            <span class="mega-list-num">${isFa ? toPersianDigits(num) : num} /</span>
            <span class="mega-list-title">${p.title[currentLang]}</span>
            <span class="mega-list-year">${year}</span>
          </a>
        `;
      }).join('');

      // Preload images into preview container for instant crossfading
      const previewContainer = document.getElementById('megaMenuPreview');
      const existingMeta = document.getElementById('megaMenuPreviewMeta');
      
      // We will keep the meta tag but clear the old images
      previewContainer.innerHTML = filtered.map(p => `
        <img src="${p.coverImage}" alt="${p.title.en}" id="preview-img-${p.slug}" class="mega-preview-img" loading="eager">
      `).join('') + `<div class="mega-menu-preview-meta" id="megaMenuPreviewMeta">${existingMeta ? existingMeta.innerHTML : ''}</div>`;
      
      const newMeta = document.getElementById('megaMenuPreviewMeta');
      const listItems = listContainer.querySelectorAll('.mega-list-item');
      
      listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          const slug = item.getAttribute('data-id');
          // Hide all images
          previewContainer.querySelectorAll('.mega-preview-img').forEach(img => {
            img.classList.remove('active');
          });
          // Show current
          const targetImg = document.getElementById(`preview-img-${slug}`);
          if (targetImg) targetImg.classList.add('active');
          
          newMeta.innerHTML = `<strong>${item.getAttribute('data-title')}</strong><br>${item.getAttribute('data-meta')}`;
          
          listItems.forEach(sibling => sibling.classList.remove('hovered'));
          item.classList.add('hovered');
        });
      });

      // trigger first item hover initially
      if (listItems.length > 0) {
        listItems[0].dispatchEvent(new Event('mouseenter'));
      }
      
      // Update localized labels
      const titleEl = document.getElementById('megaMenuTitle');
      const closeEl = document.getElementById('megaMenuCloseText');
      if (titleEl) titleEl.textContent = isFa ? 'آرشیو پروژه‌ها' : 'PROJECT ARCHIVE';
      if (closeEl) closeEl.textContent = isFa ? 'بستن' : 'CLOSE';
    }

    // Export renderList so setLanguage can call it if the menu is open
    window.updateMegaMenuLang = () => {
      if (megaMenu.classList.contains('open')) {
        renderList();
      }
    };
  }

  initMegaMenu();
});
