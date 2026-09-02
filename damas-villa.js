const damasvillaConfig = {
  projectId: 'damas-villa',
  planImageUrl: 'assets/damas-villa/plan.webp',
  aspectRatio: '16 / 9',
  categories: [
    { id: 'exterior', label: { en: 'Exterior', fa: 'نما و محوطه' } },
    { id: 'interior', label: { en: 'Interior', fa: 'فضاهای داخلی' } }
  ],
  hotspots: [
    { id: 1, x: 20, y: 80, rot: -45, category: 'exterior', title: { en: 'Main Approach', fa: 'ورودی اصلی' }, zone: { en: 'Site', fa: 'محوطه' }, renderUrl: 'assets/damas-villa/01.webp' },
    { id: 2, x: 10, y: 50, rot: 90, category: 'exterior', title: { en: 'Facade View', fa: 'نمای ساختمان' }, zone: { en: 'Site', fa: 'محوطه' }, renderUrl: 'assets/damas-villa/02.webp' },
    { id: 3, x: 80, y: 80, rot: -135, category: 'exterior', title: { en: 'Terrace View', fa: 'نمای تراس' }, zone: { en: 'Exterior', fa: 'بیرون' }, renderUrl: 'assets/damas-villa/03.webp' },
    { id: 4, x: 50, y: 50, rot: 0, category: 'interior', title: { en: 'Living Area', fa: 'فضای نشیمن' }, zone: { en: 'Living', fa: 'نشیمن' }, renderUrl: 'assets/damas-villa/04.webp' },
    { id: 5, x: 60, y: 40, rot: 45, category: 'interior', title: { en: 'Kitchen', fa: 'آشپزخانه' }, zone: { en: 'Kitchen', fa: 'آشپزخانه' }, renderUrl: 'assets/damas-villa/05.webp' },
    { id: 6, x: 40, y: 60, rot: 180, category: 'interior', title: { en: 'Atrium', fa: 'پاسیو' }, zone: { en: 'Atrium', fa: 'پاسیو' }, renderUrl: 'assets/damas-villa/06.webp' },
    { id: 7, x: 70, y: 30, rot: -90, category: 'interior', title: { en: 'Master Bedroom', fa: 'اتاق خواب مستر' }, zone: { en: 'Bedroom', fa: 'خواب' }, renderUrl: 'assets/damas-villa/07.webp' },
    { id: 8, x: 30, y: 30, rot: 90, category: 'interior', title: { en: 'Guest Room', fa: 'اتاق مهمان' }, zone: { en: 'Bedroom', fa: 'خواب' }, renderUrl: 'assets/damas-villa/08.webp' },
    { id: 9, x: 80, y: 20, rot: -45, category: 'interior', title: { en: 'Detail View', fa: 'جزئیات' }, zone: { en: 'Detail', fa: 'جزئیات' }, renderUrl: 'assets/damas-villa/09.webp' }
  ]
};

function initSpatial() {
  if (window.InteractivePlan) {
    new window.InteractivePlan('#spatial-container', damasvillaConfig);
  } else {
    console.error("InteractivePlan class not found!");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpatial);
} else {
  initSpatial();
}
