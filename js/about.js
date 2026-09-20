import { aboutData } from './data/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('aboutMain');
  if (!main) return;

  const renderAbout = (lang) => {
    const isFa = lang === 'fa';
    
    // --- 1. Hero Section ---
    const heroHTML = `
      <section class="about-hero-gradient reveal">
        <div class="about-hero-content">
          <h1 class="hero-manifesto ${isFa ? 'lang-fa' : ''}">${aboutData.hero.title[lang]}</h1>
          <p class="hero-subtitle ${isFa ? 'lang-fa' : ''}">${aboutData.hero.subtitle[lang]}</p>
        </div>
      </section>
    `;

    // --- 2. Studio Narrative ---
    const i18n = {
      en: {
        narrative: "ABOUT THE GROUP",
        team: "THE COLLECTIVE",
        gallery: "SPATIAL ARCHIVE",
        philosophy: "PRACTICE & PHILOSOPHY",
        contact: "INQUIRIES"
      },
      fa: {
        narrative: "درباره گروه",
        team: "اعضای استودیو",
        gallery: "آرشیو فضایی",
        philosophy: "رویکرد و فلسفه",
        contact: "تماس با ما"
      }
    };

    const narrativeHTML = `
      <section class="architectural-section reveal tonal-shift-light" id="section-narrative">
        <div class="section-index">
          <span class="idx-num">01 /</span>
          <span class="idx-title">${i18n[lang].narrative}</span>
        </div>
        <div class="section-body narrative-body">
          <div class="narrative-image" style="width: 100%; border-radius: 4px; overflow: hidden;">
            <img src="/assets/about/In1.webp" alt="${i18n[lang].narrative}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
          <p class="narrative-text ${isFa ? 'lang-fa' : ''}">${aboutData.narrative[lang]}</p>
        </div>
      </section>
    `;

    // --- 3. Team ---
    let teamHTML = '';
    aboutData.team.forEach(member => {
      teamHTML += `
        <article class="team-card">
          <div class="team-portrait-wrapper">
            <img src="${member.portraitPath}" alt="${member.name[lang]}" class="team-portrait" loading="lazy">
            <div class="team-social-overlay">
              ${member.social.instagram !== '#' ? `<a href="${member.social.instagram}" target="_blank">IG</a>` : ''}
              ${member.social.linkedin !== '#' ? `<a href="${member.social.linkedin}" target="_blank">IN</a>` : ''}
            </div>
          </div>
          <div class="team-meta">
            <h3 class="team-name ${isFa ? 'lang-fa' : ''}">${member.name[lang]}</h3>
            <p class="team-role">${member.role[lang]}</p>
            <p class="team-creds">${member.credentials[lang]}</p>
          </div>
        </article>
      `;
    });

    const collectiveHTML = `
      <section class="architectural-section reveal" id="section-team">
        <div class="section-index">
          <span class="idx-num">02 /</span>
          <span class="idx-title">${i18n[lang].team}</span>
        </div>
        <div class="section-body team-grid">
          ${teamHTML}
        </div>
      </section>
    `;

    // --- 4. Gallery ---
    let galleryHTML = '';
    aboutData.gallery.forEach(img => {
      galleryHTML += `
        <figure class="gallery-figure">
          <div class="gallery-img-wrapper">
            <img src="${img.imagePath}" alt="${img.caption[lang]}" loading="lazy">
          </div>
          <figcaption class="gallery-caption ${isFa ? 'lang-fa' : ''}">${img.caption[lang]}</figcaption>
        </figure>
      `;
    });

    const gallerySectionHTML = `
      <section class="architectural-section reveal tonal-shift-light" id="section-gallery">
        <div class="section-index">
          <span class="idx-num">03 /</span>
          <span class="idx-title">${i18n[lang].gallery}</span>
        </div>
        <div class="section-body strict-gallery-grid">
          ${galleryHTML}
        </div>
      </section>
    `;

    // --- 5. Philosophy ---
    let philosophyHTML = '';
    aboutData.philosophy.forEach(phil => {
      philosophyHTML += `
        <div class="philosophy-block">
          <h3 class="phil-header">
            <span class="phil-index">${phil.index} / </span>
            <span class="${isFa ? 'lang-fa' : ''}">${phil.title[lang]}</span>
          </h3>
          <p class="phil-text ${isFa ? 'lang-fa' : ''}">${phil.text[lang]}</p>
        </div>
      `;
    });

    const philosophySectionHTML = `
      <section class="architectural-section reveal" id="section-philosophy">
        <div class="section-index">
          <span class="idx-num">03 /</span>
          <span class="idx-title">${i18n[lang].philosophy}</span>
        </div>
        <div class="section-body philosophy-grid">
          ${philosophyHTML}
        </div>
      </section>
    `;

    // --- 6. Contact ---
    const contactHTML = `
      <section class="architectural-section reveal tonal-shift-light" id="section-contact">
        <div class="section-index">
          <span class="idx-num">04 /</span>
          <span class="idx-title">${i18n[lang].contact}</span>
        </div>
        <div class="section-body contact-module">
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'ایمیل' : 'Email'}</span>
            <a href="mailto:${aboutData.contact.email}" class="contact-value">${aboutData.contact.email}</a>
          </div>
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'تلفن' : 'Phone'}</span>
            ${Array.isArray(aboutData.contact.phone) ? aboutData.contact.phone.map(p => `<a href="tel:${p.replace(/\s+/g, '')}" class="contact-value" dir="ltr" style="display:block; margin-bottom:4px;">${p}</a>`).join('') : `<a href="tel:${aboutData.contact.phone.replace(/\s+/g, '')}" class="contact-value" dir="ltr">${aboutData.contact.phone}</a>`}
          </div>
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'آدرس' : 'Address'}</span>
            <span class="contact-value ${isFa ? 'lang-fa' : ''}">${aboutData.contact.address[lang]}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'ساعات کاری' : 'Hours'}</span>
            <span class="contact-value ${isFa ? 'lang-fa' : ''}">${aboutData.contact.hours[lang]}</span>
          </div>
        </div>
      </section>
    `;

    main.innerHTML = `
      ${heroHTML}
      ${narrativeHTML}
      ${collectiveHTML}
      
      ${philosophySectionHTML}
      ${contactHTML}
    `;

    if (window.revealObserver) {
      document.querySelectorAll('.reveal').forEach(el => {
        window.revealObserver.observe(el);
      });
    }
  };

  const initialLang = document.documentElement.lang || 'en';
  renderAbout(initialLang);

  const langObserver = new MutationObserver(() => {
    const currentLang = document.documentElement.lang || 'en';
    renderAbout(currentLang);
  });
  
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
});

// Lightbox Logic for Gallery
let lbImages = [];
let lbCurrentIndex = 0;

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.gallery-figure img');
  
  if (trigger) {
    lbImages = Array.from(document.querySelectorAll('.gallery-figure img'));
    lbCurrentIndex = lbImages.indexOf(trigger);
    
    let lb = document.getElementById('about-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'about-lightbox';
      lb.className = 'lightbox';
      lb.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <button class="lb-close" id="about-lbClose" aria-label="Close Lightbox">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
          <button class="lb-nav lb-prev" id="about-lbPrev" aria-label="Previous Image">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
          </button>
          <div class="lightbox-img-wrapper">
            <img id="about-lb-img" src="" alt="Fullscreen Image">
          </div>
          <button class="lb-nav lb-next" id="about-lbNext" aria-label="Next Image">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
          </button>
        </div>
      `;
      document.body.appendChild(lb);
      
      lb.addEventListener('click', (ev) => {
        if (ev.target.closest('.lightbox-overlay') || ev.target.closest('#about-lbClose')) {
          lb.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      document.getElementById('about-lbPrev').addEventListener('click', (ev) => {
        ev.stopPropagation();
        lbCurrentIndex = (lbCurrentIndex - 1 + lbImages.length) % lbImages.length;
        document.getElementById('about-lb-img').src = lbImages[lbCurrentIndex].src;
      });

      document.getElementById('about-lbNext').addEventListener('click', (ev) => {
        ev.stopPropagation();
        lbCurrentIndex = (lbCurrentIndex + 1) % lbImages.length;
        document.getElementById('about-lb-img').src = lbImages[lbCurrentIndex].src;
      });
      
      // Keyboard support
      document.addEventListener('keydown', (ev) => {
        if (lb.classList.contains('active')) {
          if (ev.key === 'Escape') {
            lb.classList.remove('active');
            document.body.style.overflow = '';
          } else if (ev.key === 'ArrowLeft') {
            lbCurrentIndex = (lbCurrentIndex - 1 + lbImages.length) % lbImages.length;
            document.getElementById('about-lb-img').src = lbImages[lbCurrentIndex].src;
          } else if (ev.key === 'ArrowRight') {
            lbCurrentIndex = (lbCurrentIndex + 1) % lbImages.length;
            document.getElementById('about-lb-img').src = lbImages[lbCurrentIndex].src;
          }
        }
      });
    }
    
    const lbImg = document.getElementById('about-lb-img');
    lbImg.src = trigger.src;
    document.getElementById('about-lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});