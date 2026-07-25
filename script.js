/* ============================================
   BLOCK ARCHITECTURE STUDIO — Main Script
   Hero slideshow, scroll effects, language toggle
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Language Data ──────────────────────────────
  const translations = {
    en: {
      nav: { home: 'Home', projects: 'Projects', about: 'About' },
      hero: {
        slides: [
          { title: 'Where Form\nMeets Light', subtitle: 'Villa Alborz — Tehran, 2024' },
          { title: 'Sculpting\nUrban Space', subtitle: 'Residential Tower — Isfahan, 2023' },
          { title: 'Minimal\nMaximal Impact', subtitle: 'Commercial Complex — Shiraz, 2024' }
        ],
        btn: 'Learn More'
      },
      projects: {
        label: 'Selected Work',
        title: 'Projects',
        viewAll: 'View All Projects',
        items: [
          { title: 'Villa Alborz', meta: 'Residential — Tehran, 2024', btn: 'Villa Alborz' },
          { title: 'Noor Tower', meta: 'Mixed Use — Isfahan, 2023', btn: 'Noor Tower' },
          { title: 'Saye Complex', meta: 'Commercial — Shiraz, 2024', btn: 'Saye Complex' }
        ]
      },
      footer: {
        desc: 'Block Architecture Studio is a Tehran-based practice dedicated to creating spaces where minimal form meets purposeful design.',
        nav: 'Navigation',
        contact: 'Contact',
        email: 'info@blockarch.studio',
        phone: '+98 21 1234 5678',
        address: 'No. 42, Fereshteh St.\nTehran, Iran',
        copyright: '© 2024 Block Architecture Studio. All rights reserved.',
        credit: 'Design & Development by Block Studio'
      }
    },
    fa: {
      nav: { home: 'خانه', projects: 'پروژه‌ها', about: 'درباره ما' },
      hero: {
        slides: [
          { title: 'جایی که فرم\nبا نور ملاقات می‌کند', subtitle: 'ویلا البرز — تهران، ۲۰۲۴' },
          { title: 'مجسمه‌سازی\nفضای شهری', subtitle: 'برج مسکونی — اصفهان، ۲۰۲۳' },
          { title: 'مینیمال\nبیشترین تأثیر', subtitle: 'مجتمع تجاری — شیراز، ۲۰۲۴' }
        ],
        btn: 'بیشتر بدانید'
      },
      projects: {
        label: 'آثار منتخب',
        title: 'پروژه‌ها',
        viewAll: 'مشاهده همه پروژه‌ها',
        items: [
          { title: 'ویلا البرز', meta: 'مسکونی — تهران، ۲۰۲۴', btn: 'ویلا البرز' },
          { title: 'برج نور', meta: 'ترکیبی — اصفهان، ۲۰۲۳', btn: 'برج نور' },
          { title: 'مجتمع سایه', meta: 'تجاری — شیراز، ۲۰۲۴', btn: 'مجتمع سایه' }
        ]
      },
      footer: {
        desc: 'استودیو معماری بلاک یک دفتر مستقر در تهران است که فضاهایی را خلق می‌کند که در آن فرم مینیمال با طراحی هدفمند تلاقی می‌کند.',
        nav: 'ناوبری',
        contact: 'تماس',
        email: 'info@blockarch.studio',
        phone: '۰۲۱-۱۲۳۴-۵۶۷۸',
        address: 'خیابان فرشته، پلاک ۴۲\nتهران، ایران',
        copyright: '© ۲۰۲۴ استودیو معماری بلاک. تمامی حقوق محفوظ است.',
        credit: 'طراحی و توسعه توسط استودیو بلاک'
      }
    }
  };

  let currentLang = 'en';
  let currentSlide = 0;
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
  const counterCurrent = document.getElementById('counterCurrent');
  const counterTotal = document.getElementById('counterTotal');

  // ── Navbar Scroll ──────────────────────────────
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Mobile Toggle ──────────────────────────────
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navCenter.classList.toggle('mobile-open');
    navSocial.classList.toggle('mobile-open');
    navbar.classList.toggle('menu-open');
  });

  // ── Hero Slideshow ─────────────────────────────
  function goToSlide(index) {
    heroSlides[currentSlide].classList.remove('active');
    heroIndicators[currentSlide].classList.remove('active');

    currentSlide = index;

    // Force reflow so CSS animation restarts from 0 width
    void heroIndicators[currentSlide].offsetWidth;

    heroSlides[currentSlide].classList.add('active');
    heroIndicators[currentSlide].classList.add('active');

    // Update text
    const slideData = translations[currentLang].hero.slides[currentSlide];
    heroTitle.textContent = slideData.title;
    heroSubtitle.textContent = slideData.subtitle;
    const isFa = currentLang === 'fa';
    const num = String(currentSlide + 1).padStart(2, '0');
    counterCurrent.textContent = isFa ? toPersianDigits(num) : num;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }

  function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  heroIndicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      goToSlide(i);
      startSlideshow();
    });
  });

  // Initialize slideshow
  const initNum = String(heroSlides.length).padStart(2, '0');
  counterTotal.textContent = currentLang === 'fa' ? toPersianDigits(initNum) : initNum;
  goToSlide(0);
  startSlideshow();

  // ── Helpers ──────────────────────────
  function toPersianDigits(str) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, x => farsiDigits[x]);
  }

  // ── Language Switcher ──────────────────────────
  function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    const isFa = lang === 'fa';

    document.documentElement.lang = lang;
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';

    // Nav links
    document.getElementById('navHome').textContent = t.nav.home;
    document.getElementById('navProjects').textContent = t.nav.projects;
    document.getElementById('navAbout').textContent = t.nav.about;

    // Lang button
    langBtn.textContent = isFa ? 'ENGLISH' : 'فارسی';

    // Hero
    const slideData = t.hero.slides[currentSlide];
    heroTitle.textContent = slideData.title;
    heroSubtitle.textContent = slideData.subtitle;
    heroBtnText.textContent = t.hero.btn;

    // Update Counter Total
    const totalNum = String(heroSlides.length).padStart(2, '0');
    counterTotal.textContent = isFa ? toPersianDigits(totalNum) : totalNum;
    
    // Update Counter Current
    const currentNum = String(currentSlide + 1).padStart(2, '0');
    counterCurrent.textContent = isFa ? toPersianDigits(currentNum) : currentNum;

    // Projects section
    document.getElementById('projectsLabel').textContent = t.projects.label;
    document.getElementById('projectsTitle').textContent = t.projects.title;
    document.getElementById('projectsViewAll').childNodes[0].textContent = t.projects.viewAll + ' ';

    document.querySelectorAll('.project-card').forEach((card, i) => {
      const item = t.projects.items[i];
      if (item) {
        card.querySelector('.project-card-title').textContent = item.title;
        card.querySelector('.project-card-meta').textContent = item.meta;
        card.querySelector('.project-card-view').textContent = item.btn;
      }
    });

    // Footer
    document.getElementById('footerDesc').textContent = t.footer.desc;
    document.getElementById('footerNavTitle').textContent = t.footer.nav;
    document.getElementById('footerContactTitle').textContent = t.footer.contact;
    document.getElementById('footerEmail').textContent = t.footer.email;
    document.getElementById('footerPhone').textContent = t.footer.phone;
    document.getElementById('footerAddress').textContent = t.footer.address;
    document.getElementById('footerCopyright').textContent = t.footer.copyright;
    document.getElementById('footerCredit').textContent = t.footer.credit;

    // Footer nav links
    document.getElementById('footerHome').textContent = t.nav.home;
    document.getElementById('footerProjects').textContent = t.nav.projects;
    document.getElementById('footerAbout').textContent = t.nav.about;

    // Toggle Persian font class and RTL direction
    document.body.classList.toggle('lang-fa', isFa);
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';
  }

  langBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'fa' : 'en');
  });

  // ── Scroll Reveal ──────────────────────────────
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

  document.querySelectorAll('.project-card, .reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Smooth scroll for anchor links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }

      // Close mobile menu
      navToggle.classList.remove('open');
      navCenter.classList.remove('mobile-open');
      navSocial.classList.remove('mobile-open');
    });
  });
});
