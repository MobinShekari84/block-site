const project1Config = {
  projectId: 'project-1',
  planImageUrl: 'assets/project-1/Plan.png',
  aspectRatio: '1755 / 2482',
  hotspots: [
    { id: 1, x: 20, y: 30, rot: 45, title: { en: 'Camera 01', fa: 'دوربین ۰۱' }, zone: { en: 'Exterior Approach', fa: 'ورودی خارجی' }, renderUrl: 'assets/project-1/01.webp' },
    { id: 2, x: 35, y: 25, rot: 90, title: { en: 'Camera 02', fa: 'دوربین ۰۲' }, zone: { en: 'Main Atrium', fa: 'آتریوم اصلی' }, renderUrl: 'assets/project-1/02.webp' },
    { id: 3, x: 50, y: 30, rot: 135, title: { en: 'Camera 03', fa: 'دوربین ۰۳' }, zone: { en: 'Living Space', fa: 'فضای نشیمن' }, renderUrl: 'assets/project-1/03.webp' },
    { id: 4, x: 70, y: 40, rot: -135, title: { en: 'Camera 04', fa: 'دوربین ۰۴' }, zone: { en: 'Kitchen / Dining', fa: 'آشپزخانه / غذاخوری' }, renderUrl: 'assets/project-1/04.webp' },
    { id: 5, x: 80, y: 55, rot: -90, title: { en: 'Camera 05', fa: 'دوربین ۰۵' }, zone: { en: 'Master Suite', fa: 'سوئیت مستر' }, renderUrl: 'assets/project-1/05.webp' },
    { id: 6, x: 65, y: 70, rot: -45, title: { en: 'Camera 06', fa: 'دوربین ۰۶' }, zone: { en: 'Terrace View', fa: 'نمای تراس' }, renderUrl: 'assets/project-1/06.webp' },
    { id: 7, x: 45, y: 75, rot: 0, title: { en: 'Camera 07', fa: 'دوربین ۰۷' }, zone: { en: 'Courtyard', fa: 'حیاط مرکزی' }, renderUrl: 'assets/project-1/07.webp' },
    { id: 8, x: 30, y: 65, rot: 45, title: { en: 'Camera 08', fa: 'دوربین ۰۸' }, zone: { en: 'Lounge', fa: 'سالن استراحت' }, renderUrl: 'assets/project-1/08.webp' },
    { id: 9, x: 15, y: 50, rot: 90, title: { en: 'Camera 09', fa: 'دوربین ۰۹' }, zone: { en: 'Library / Study', fa: 'کتابخانه / مطالعه' }, renderUrl: 'assets/project-1/09.webp' },
    { id: 10, x: 40, y: 50, rot: 0, title: { en: 'Camera 10', fa: 'دوربین ۱۰' }, zone: { en: 'Evening Facade', fa: 'نمای شبانه' }, renderUrl: 'assets/project-1/10.webp' }
  ]
};

function initSpatial() {
  if (window.InteractivePlan) {
    new window.InteractivePlan('#spatial-container', project1Config);
  } else {
    console.error("InteractivePlan class not found!");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpatial);
} else {
  initSpatial();
}
