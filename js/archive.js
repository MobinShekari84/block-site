import { projects } from './data/projects.js';
import { siteMeta } from './data/siteMeta.js';
 // Need to export these from script.js! Or just compute locally.


function toPersianDigits(num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, x => farsiDigits[x]);
}

export function initProjectArchive() {
  const lang = document.documentElement.lang === 'fa' ? 'fa' : 'en';
  const isPersian = lang === 'fa';
  
  // Create overlay DOM
  const overlay = document.createElement('div');
  overlay.className = 'project-archive-overlay';
  
  overlay.innerHTML = `
    <div class="archive-header">
      <div class="archive-title">${isPersian ? 'آرشیو پروژه‌ها' : 'PROJECT ARCHIVE'}</div>
      <button class="archive-close" id="archiveCloseBtn">
        ${isPersian ? 'بستن' : 'CLOSE'} <span>&#10005;</span>
      </button>
    </div>
    <div class="archive-filters">
      <button class="archive-filter-btn active" data-filter="all">${isPersian ? 'همه' : 'All'}</button>
      <button class="archive-filter-btn" data-filter="residential">${isPersian ? 'مسکونی' : 'Residential'}</button>
      <button class="archive-filter-btn" data-filter="commercial">${isPersian ? 'تجاری' : 'Commercial'}</button>
      <button class="archive-filter-btn" data-filter="renovation">${isPersian ? 'بازسازی' : 'Renovation'}</button>
      <button class="archive-filter-btn" data-filter="mixed-use">${isPersian ? 'چندمنظوره' : 'Mixed use'}</button>
    </div>
    <div class="archive-content">
      <div class="archive-list-wrapper" id="archiveList"></div>
      <div class="archive-preview-wrapper">
        <img src="" alt="" class="archive-preview-img" id="archivePreviewImg">
        <div class="archive-preview-card">
          <div class="archive-card-title" id="archivePreviewTitle"></div>
          <div class="archive-card-meta" id="archivePreviewMeta"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  const listWrapper = overlay.querySelector('#archiveList');
  const previewImg = overlay.querySelector('#archivePreviewImg');
  const previewTitle = overlay.querySelector('#archivePreviewTitle');
  const previewMeta = overlay.querySelector('#archivePreviewMeta');
  
  let currentFilter = 'all';
  
  function renderList() {
    listWrapper.innerHTML = '';
    
    let filtered = projects;
    if (currentFilter !== 'all') {
      filtered = projects.filter(p => {
        // Match english category name formatted to id
        const cat = p.category.en.toLowerCase().replace(' ', '-');
        return cat === currentFilter;
      });
    }
    
    filtered.forEach((p, index) => {
      const num = String(index + 1).padStart(2, '0');
      const numStr = isPersian ? new Intl.NumberFormat('fa-IR').format(num) : num;
      const yearStr = isPersian ? new Intl.NumberFormat('fa-IR').format(p.year) : p.year;
      
      const prefix = lang === 'en' ? '/en' : '';
      const href = `${prefix}/projects/${p.slug}/`;
      
      const item = document.createElement('a');
      item.href = href;
      item.className = 'archive-list-item';
      
      item.innerHTML = `
        <div class="archive-list-left">
          <span class="archive-list-num">${numStr} /</span>
          <span class="archive-list-name">${p.title[lang]}</span>
        </div>
        <div class="archive-list-year">${yearStr}</div>
      `;
      
      item.addEventListener('mouseenter', () => {
        previewImg.src = p.coverImage;
        previewTitle.textContent = p.title[lang];
        previewMeta.textContent = `${p.category[lang]} — ${p.location[lang]}, ${yearStr}`;
      });
      
      listWrapper.appendChild(item);
    });
    
    // Trigger first item hover if exists
    if (filtered.length > 0) {
      previewImg.src = filtered[0].coverImage;
      previewTitle.textContent = filtered[0].title[lang];
      const yearStr0 = isPersian ? new Intl.NumberFormat('fa-IR').format(filtered[0].year) : filtered[0].year;
      previewMeta.textContent = `${filtered[0].category[lang]} — ${filtered[0].location[lang]}, ${yearStr0}`;
    } else {
      previewImg.src = '';
      previewTitle.textContent = '';
      previewMeta.textContent = '';
    }
  }
  
  renderList();
  
  // Filter logic
  const filterBtns = overlay.querySelectorAll('.archive-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    });
  });
  
  // Open / Close Logic
  const closeBtn = overlay.querySelector('#archiveCloseBtn');
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  const navProjectsBtns = document.querySelectorAll('#navProjects, #footerProjects');
  navProjectsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // lock scroll
      renderList();
    });
  });
}
