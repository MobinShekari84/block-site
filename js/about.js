import { aboutData } from './data/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('aboutMain');
  if (!main) return;

  const renderAbout = (lang) => {
    const isFa = lang === 'fa';
    
    // --- 1. Hero Section ---
    const heroHTML = `
      <section class="about-hero reveal">
        <div class="about-hero-grid">
          <div class="about-hero-text">
            <h1 class="hero-manifesto ${isFa ? 'lang-fa' : ''}">${aboutData.hero.manifesto[lang]}</h1>
          </div>
          <div class="about-hero-image">
            <img src="${aboutData.hero.image}" alt="Block Architecture Studio" fetchpriority="high">
          </div>
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
          <span class="idx-num">04 /</span>
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
          <span class="idx-num">05 /</span>
          <span class="idx-title">${i18n[lang].contact}</span>
        </div>
        <div class="section-body contact-module">
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'ایمیل' : 'Email'}</span>
            <a href="mailto:${aboutData.contact.email}" class="contact-value">${aboutData.contact.email}</a>
          </div>
          <div class="contact-item">
            <span class="contact-label ${isFa ? 'lang-fa' : ''}">${isFa ? 'تلفن' : 'Phone'}</span>
            <a href="tel:${aboutData.contact.phone.replace(/\s+/g, '')}" class="contact-value" dir="ltr">${aboutData.contact.phone}</a>
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
      ${gallerySectionHTML}
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
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.gallery-figure img');
  if (trigger) {
    let lb = document.getElementById('about-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'about-lightbox';
      lb.className = 'lightbox';
      lb.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <button class="lb-close" aria-label="Close Lightbox">✕</button>
          <div class="lightbox-img-wrapper">
            <img id="about-lb-img" src="" alt="Fullscreen Image">
          </div>
        </div>
      `;
      document.body.appendChild(lb);
      
      lb.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('lightbox-overlay') || ev.target.classList.contains('lb-close')) {
          lb.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
    
    const lbImg = document.getElementById('about-lb-img');
    lbImg.src = trigger.src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});
