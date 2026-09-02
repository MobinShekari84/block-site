class InteractivePlan {
  constructor(containerSelector, config) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) throw new Error(`Container ${containerSelector} not found`);
    
    this.config = config;
    this.currentLang = document.documentElement.lang || 'en';
    this.currentCamId = config.hotspots[0].id;
    
    // UI Texts Dictionary (can be expanded)
    this.uiTexts = {
      en: {
        viewpoint: 'Viewpoint',
        zonePrefix: 'Zone: ',
        download: 'Download High-Res'
      },
      fa: {
        viewpoint: 'نقطه دید',
        zonePrefix: 'منطقه: ',
        download: 'دانلود نسخه با کیفیت'
      }
    };
    
    this.init();
  }

  init() {
    this.renderDOM();
    this.cacheDOM();
    this.bindEvents();
    this.setupLanguageObserver();
    
    // Set initial state
    this.switchView(this.currentCamId);
    this.updateTexts();
  }

  renderDOM() {
    const { projectId, planImageUrl, aspectRatio, hotspots } = this.config;
    const planRatio = aspectRatio || '1755 / 2482';
    
    let hotspotsHTML = '';
    let thumbsHTML = '';
    
    hotspots.forEach((h, index) => {
      const isActive = index === 0 ? 'active' : '';
      hotspotsHTML += `
        <div class="hotspot ${isActive}" style="left: ${h.x}%; top: ${h.y}%;" data-cam="${h.id}">
          <div class="fov-cone" style="transform: translate(-50%, -100%) rotate(${h.rot}deg)"></div>
        </div>
      `;
      thumbsHTML += `
        <button class="thumb-btn ${isActive}" data-cam="${h.id}" aria-label="${h.title.en}">
          <img src="${h.thumbnailUrl || h.renderUrl}" alt="${h.title.en}">
        </button>
      `;
    });

    this.container.innerHTML = `
      <div class="spatial-wrapper">
        <!-- Left: Interactive Blueprint -->
        <div class="spatial-blueprint light-blueprint">
          <div class="blueprint-inner" style="aspect-ratio: ${planRatio};">
            <img src="${planImageUrl}" class="blueprint-svg" alt="Floor Plan">
            ${hotspotsHTML}
          </div>
        </div>

        <!-- Right: Render Gallery -->
        <div class="render-sidebar">
          <div class="render-main">
            <img id="${projectId}-active-render" class="active-render" src="${hotspots[0].renderUrl}" alt="Active Render">
            
            <div class="telemetry-hud light-hud" id="${projectId}-telemetry-hud">
              <div class="hud-main">
                <span class="telemetry-label" id="${projectId}-tel-label">Viewpoint</span>
                <div class="hud-badges">
                  <span class="hud-badge" id="${projectId}-tel-cam"></span>
                  <span class="hud-badge" id="${projectId}-tel-coord"></span>
                </div>
              </div>
              <button class="hud-expand" id="${projectId}-hud-expand" aria-label="Toggle Info">i</button>
            </div>
          </div>
          
          <div class="render-thumbnails">
            ${thumbsHTML}
          </div>
        </div>

        <!-- Fullscreen Lightbox (Appended inside container for scoped styles/RTL) -->
        <div id="${projectId}-lightbox" class="lightbox-overlay" aria-hidden="true">
          <div class="lightbox-header">
            <button id="${projectId}-lb-map-toggle" class="lb-btn" aria-label="Toggle Mini-map">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            </button>
            <a id="${projectId}-lb-download" href="#" download class="lb-btn" aria-label="Download High-Res">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
            <button id="${projectId}-lb-close" class="lb-btn" aria-label="Close Lightbox">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <button id="${projectId}-lb-prev" class="lb-nav lb-prev" aria-label="Previous Render">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
          
          <div class="lightbox-body">
            <img id="${projectId}-lb-img" src="" alt="Fullscreen Render">
          </div>

          <button id="${projectId}-lb-next" class="lb-nav lb-next" aria-label="Next Render">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
          </button>
          
          <div id="${projectId}-lb-minimap-container" class="lightbox-minimap">
            <img src="${planImageUrl}" alt="Mini map">
          </div>
        </div>
      </div>
    `;
  }

  cacheDOM() {
    const pId = this.config.projectId;
    this.dom = {
      hotspots: this.container.querySelectorAll('.hotspot'),
      thumbs: this.container.querySelectorAll('.thumb-btn'),
      activeRender: this.container.querySelector(`#${pId}-active-render`),
      telLabel: this.container.querySelector(`#${pId}-tel-label`),
      telCam: this.container.querySelector(`#${pId}-tel-cam`),
      telCoord: this.container.querySelector(`#${pId}-tel-coord`),
      hudContainer: this.container.querySelector(`#${pId}-telemetry-hud`),
      hudExpand: this.container.querySelector(`#${pId}-hud-expand`),
      lightbox: this.container.querySelector(`#${pId}-lightbox`),
      lbClose: this.container.querySelector(`#${pId}-lb-close`),
      lbPrev: this.container.querySelector(`#${pId}-lb-prev`),
      lbNext: this.container.querySelector(`#${pId}-lb-next`),
      lbImg: this.container.querySelector(`#${pId}-lb-img`),
      lbDownload: this.container.querySelector(`#${pId}-lb-download`),
      lbMapToggle: this.container.querySelector(`#${pId}-lb-map-toggle`),
      lbMinimapContainer: this.container.querySelector(`#${pId}-lb-minimap-container`),
      wrapper: this.container.querySelector('.spatial-wrapper')
    };
  }

  bindEvents() {
    this.dom.hotspots.forEach(h => h.addEventListener('click', () => this.switchView(h.getAttribute('data-cam'))));
    this.dom.thumbs.forEach(t => t.addEventListener('click', () => this.switchView(t.getAttribute('data-cam'))));

    this.dom.hudExpand.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dom.hudContainer.classList.toggle('expanded');
    });

    document.addEventListener('click', (e) => {
      if (this.dom.hudContainer && !this.dom.hudContainer.contains(e.target)) {
        this.dom.hudContainer.classList.remove('expanded');
      }
    });

    this.dom.activeRender.addEventListener('click', () => this.openLightbox());
    this.dom.lbClose.addEventListener('click', () => this.closeLightbox());
    this.dom.lbPrev.addEventListener('click', () => this.navLightbox(-1));
    this.dom.lbNext.addEventListener('click', () => this.navLightbox(1));
    this.dom.lbMapToggle.addEventListener('click', () => {
      this.dom.lbMinimapContainer.classList.toggle('visible');
    });

    document.addEventListener('keydown', (e) => {
      if (this.dom.lightbox && this.dom.lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.navLightbox(this.currentLang === 'fa' ? 1 : -1);
        if (e.key === 'ArrowRight') this.navLightbox(this.currentLang === 'fa' ? -1 : 1);
      }
    });
  }

  setupLanguageObserver() {
    const langObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'lang') {
          this.currentLang = document.documentElement.lang || 'en';
          this.updateTexts();
        }
      });
    });
    langObserver.observe(document.documentElement, { attributes: true });
  }

  updateTexts() {
    const t = this.uiTexts[this.currentLang];
    this.dom.telLabel.textContent = t.viewpoint;
    this.dom.lbDownload.setAttribute('aria-label', t.download);
    
    this.updateTelemetry(this.currentCamId);
    
    // Set RTL on the container itself so styles cascade correctly
    this.container.setAttribute('dir', this.currentLang === 'fa' ? 'rtl' : 'ltr');
    this.container.classList.toggle('lang-fa', this.currentLang === 'fa');

    // Force IntersectionObserver to fire if needed
    if(this.dom.wrapper) this.dom.wrapper.classList.add('visible');
      this.dom.wrapper.style.opacity = '1';
      this.dom.wrapper.style.transform = 'none';
  }

  updateTelemetry(camId) {
    const data = this.config.hotspots.find(h => String(h.id) === String(camId));
    if (!data) return;
    
    this.dom.telCam.textContent = data.title[this.currentLang];
    this.dom.telCoord.textContent = this.uiTexts[this.currentLang].zonePrefix + data.zone[this.currentLang];
  }

  switchView(camId) {
    this.currentCamId = camId;
    const data = this.config.hotspots.find(h => String(h.id) === String(camId));
    if (!data) return;

    this.dom.hotspots.forEach(h => {
      if (String(h.getAttribute('data-cam')) === String(camId)) h.classList.add('active');
      else h.classList.remove('active');
    });

    this.dom.thumbs.forEach(t => {
      if (String(t.getAttribute('data-cam')) === String(camId)) t.classList.add('active');
      else t.classList.remove('active');
    });

    this.dom.activeRender.style.opacity = 0;
    setTimeout(() => {
      this.dom.activeRender.src = data.renderUrl;
      this.updateTelemetry(camId);
      this.dom.activeRender.style.opacity = 1;
    }, 200);

    if (this.dom.lightbox && this.dom.lightbox.getAttribute('aria-hidden') === 'false') {
      this.dom.lbImg.src = data.renderUrl;
      this.dom.lbDownload.href = data.renderUrl;
      this.updateMinimapPin(camId);
    }
  }

  openLightbox() {
    this.dom.lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Hide global navbar to ensure unhindered fullscreen view
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.originalNavbarDisplay = navbar.style.display || '';
      navbar.style.display = 'none';
    }
    
    const data = this.config.hotspots.find(h => String(h.id) === String(this.currentCamId));
    this.dom.lbImg.src = data.renderUrl;
    this.dom.lbDownload.href = data.renderUrl;
    
    this.updateMinimapPin(this.currentCamId);
  }

  closeLightbox() {
    this.dom.lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Restore global navbar
    const navbar = document.querySelector('.navbar');
    if (navbar && typeof this.originalNavbarDisplay !== 'undefined') {
      navbar.style.display = this.originalNavbarDisplay;
    }
  }

  updateMinimapPin(camId) {
    const data = this.config.hotspots.find(h => String(h.id) === String(camId));
    if(!data) return;
    
    this.dom.lbMinimapContainer.querySelectorAll('.hotspot').forEach(e => e.remove());
    
    const pin = document.createElement('div');
    pin.className = 'hotspot active minimap-pin';
    pin.style.left = `${data.x}%`;
    pin.style.top = `${data.y}%`;
    
    const cone = document.createElement('div');
    cone.className = 'fov-cone';
    cone.style.transform = `translate(-50%, -100%) rotate(${data.rot}deg)`;
    
    pin.appendChild(cone);
    this.dom.lbMinimapContainer.appendChild(pin);
  }

  navLightbox(dir) {
    const currentIndex = this.config.hotspots.findIndex(h => String(h.id) === String(this.currentCamId));
    let newIndex = currentIndex + dir;
    if (newIndex < 0) newIndex = this.config.hotspots.length - 1;
    if (newIndex >= this.config.hotspots.length) newIndex = 0;
    
    this.switchView(this.config.hotspots[newIndex].id);
  }
}

// Export for module systems, or attach to window for script tags
window.InteractivePlan = InteractivePlan;