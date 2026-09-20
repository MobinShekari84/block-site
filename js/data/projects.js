export const projects = [
  {
    id: 'khane-darya',
    slug: 'khane-darya',
    title: { en: 'Khane Darya No.199', fa: 'خانه دریا پلاک ۱۹۹' },
    category: { en: 'Residential', fa: 'مسکونی' },
    year: 2024,
    location: { en: 'Mahmudabad', fa: 'محمودآباد' },
    description: { 
      en: 'Situated in the coastal enclave of Khane Darya, Villa No. 199 is a bold exploration of modern coastal living. The design navigates the delicate balance between openness to the lush northern environment and the necessity for private sanctuary. Expansive glass facades frame the surrounding garden, drawing the landscape inward, while solid architectural planes provide structural and visual anchoring. The transition from the street to the secluded back garden is orchestrated through a sequence of transparent and semi-transparent volumes, allowing natural light to permeate the core of the house. The material palette embraces its coastal context, blending warm textures with clean, modernist lines to create a timeless retreat.', 
      fa: 'ویلای پلاک ۱۹۹ در شهرک ساحلی خانه دریا، کاوشی جسورانه در زندگی مدرن ساحلی است. این طراحی تعادل ظریفی میان گشودگی به محیط سرسبز شمالی و نیاز به یک پناهگاه خصوصی برقرار می‌کند. نماهای شیشه‌ای وسیع، باغ پیرامون را قاب گرفته و منظره را به داخل هدایت می‌کنند، در حالی که سطوح معماری صلب، تکیه‌گاهی ساختاری و بصری فراهم می‌آورند. گذار از خیابان به حیاط خلوت پشتی از طریق توالی حجم‌های شفاف و نیمه‌شفاف ساماندهی شده است که اجازه می‌دهد نور طبیعی در قلب خانه نفوذ کند. پالت متریال با احترام به بستر ساحلی خود، بافت‌های گرم را با خطوط تمیز مدرنیستی ترکیب می‌کند تا یک خلوتگاه بی‌زمان خلق کند.' 
    },
    coverImage: '/assets/KhaneDarya199/khane-darya-hero.webp?v=18',
    galleryImages: [
      '/assets/KhaneDarya199/khane-darya-view-1.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-2.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-3.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-4.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-5.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-6.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-7.webp?v=18',
      '/assets/KhaneDarya199/khane-darya-view-8.webp?v=18'
    ],
    drawings: [
      '/assets/KhaneDarya199/portfolio plan.webp',
      '/assets/KhaneDarya199/NO 199 First Floor plan.webp',
      '/assets/KhaneDarya199/NO 199 North Elevation.webp',
      '/assets/KhaneDarya199/NO 199 South Elevation.webp'
    ],
    specs: { 
      area: { en: '520 sqm', fa: '۵۲۰ متر مربع' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Glass, White Plaster', fa: 'چوب، شیشه، گچ سفید' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: true,
    heroTheme: 'light',
    spatialPlan: {
      planImageUrl: '/assets/KhaneDarya199/portfolio plan.webp',
      aspectRatio: '1600 / 1200',
      hotspots: [
        { id: 1, x: 30, y: 30, rot: 45, title: { en: 'Living Space', fa: 'فضای نشیمن' }, zone: { en: 'Interior', fa: 'داخلی' }, renderUrl: '/assets/KhaneDarya199/khane-darya-view-1.webp?v=18' },
        { id: 2, x: 70, y: 60, rot: 90, title: { en: 'Back Garden', fa: 'حیاط پشتی' }, zone: { en: 'Exterior', fa: 'خارجی' }, renderUrl: '/assets/KhaneDarya199/khane-darya-view-4.webp?v=18' }
      ]
    }
  },
  {
    id: 'sisangan-mazandaran',
    slug: 'sisangan-mazandaran',
    title: { en: 'Sisangan Mazandaran', fa: 'سیسنگان مازندران' },
    category: { en: 'Residential', fa: 'مسکونی' },
    year: 2026,
    location: { en: 'Sisangan, Mazandaran', fa: 'سیسنگان، مازندران' },
    description: { 
      en: 'A serene residential project located in the lush landscapes of Sisangan, Mazandaran, designed to harmonize with the surrounding natural beauty.', 
      fa: 'یک پروژه مسکونی آرامش‌بخش واقع در مناظر سرسبز سیسنگان مازندران، که برای هماهنگی با زیبایی‌های طبیعی اطراف طراحی شده است.' 
    },
    coverImage: '/assets/sisangan-mazandaran/gallery/sisangan-mazandaran-hero.webp?v=18',
    galleryImages: [
      '/assets/sisangan-mazandaran/gallery/sisangan-mazandaran-view-1.webp?v=18',
      '/assets/sisangan-mazandaran/gallery/sisangan-mazandaran-view-2.webp?v=18',
      '/assets/sisangan-mazandaran/gallery/sisangan-mazandaran-view-3.webp?v=18'
    ],
    drawings: [],
    specs: { 
      area: { en: 'Unknown', fa: 'نامشخص' },
      status: { en: 'In Progress', fa: 'در حال طراحی' },
      materials: { en: 'Wood, Stone, Glass', fa: 'چوب، سنگ، شیشه' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: false,
    heroTheme: 'light'
  },
  {
    id: 'damas-villa',
    slug: 'damas-villa',
    title: { en: 'Damas Villa', fa: 'ویلای داماس' },
    category: { en: 'Residential', fa: 'مسکونی' },
    year: 2026,
    location: { en: 'Damavand', fa: 'دماوند' },
    description: { 
      en: 'Damas Villa is envisioned as a harmonious sanctuary that bridges the rugged, sweeping topography of Damavand with an atmosphere of absolute minimalist tranquility. Block Architecture Studio approached the site with a profound respect for the surrounding landscape, anchoring the structure firmly into the hillside while allowing the upper volumes to float lightly above the terrain. The defining characteristic of the project is its strict geometric purity, offset by expansive, frameless glazing that dematerializes the boundary between the sheltered interior and the wild exterior. The material palette—comprising raw exposed concrete, smooth white plaster, and subtle brushed metallic accents—ensures the architecture acts as a quiet, unobtrusive canvas for the changing seasons. The spatial sequence is carefully choreographed: from a compressed, intimate entryway, the house dramatically expands into a double-height living space centered around a suspended fireplace. The interactive floor plan reveals the meticulous layout, demonstrating how public and private zones are seamlessly negotiated across split levels.', 
      fa: 'استودیو معماری بلاک ویلای داماس را به عنوان پناهگاهی هارمونیک طراحی کرده است که توپوگرافی خشن دماوند را با آرامش مینیمالیستی مطلق پیوند می‌دهد. در این پروژه با احترام عمیق به منظر پیرامونی، ساختار بنا محکم در دل تپه جای گرفته، در حالی که حجم‌های بالایی به شکلی سبک روی زمین شناور به نظر می‌رسند. ویژگی بارز این پروژه، خلوص هندسی دقیق آن است که با شیشه‌های وسیع و بدون فریم ترکیب شده تا مرز بین فضای داخلی محافظت‌شده و طبیعت وحشی بیرون را از بین ببرد. متریال‌های بتن اکسپوز، گچ سفید و جزئیات ظریف فلزی برس‌خورده، بستری آرام و بی‌تکلف برای نمایش تغییرات فصول فراهم می‌کنند. توالی فضایی با دقت برنامه‌ریزی شده است: از یک ورودی فشرده و صمیمی، خانه به‌طور دراماتیکی به یک فضای نشیمن با ارتفاع دوگانه که حول یک شومینه معلق متمرکز شده، بسط می‌یابد. پلان تعاملی، چیدمان دقیق را آشکار می‌سازد و نشان می‌دهد که چگونه مناطق عمومی و خصوصی به نرمی در سطوح مختلف سازماندهی شده‌اند.' 
    },
    coverImage: '/assets/damas-villa/damas-villa-hero.webp?v=18',
    galleryImages: [
      '/assets/damas-villa/damas-villa-view-1.webp?v=18',
      '/assets/damas-villa/damas-villa-view-2.webp?v=18',
      '/assets/damas-villa/damas-villa-view-3.webp?v=18',
      '/assets/damas-villa/damas-villa-view-4.webp?v=18',
      '/assets/damas-villa/damas-villa-view-5.webp?v=18',
      '/assets/damas-villa/damas-villa-view-6.webp?v=18',
      '/assets/damas-villa/damas-villa-view-7.webp?v=18',
      '/assets/damas-villa/damas-villa-view-8.webp?v=18'
    ],
    drawings: [
      '/assets/damas-villa/plan-1.webp',
      '/assets/damas-villa/plan-2.webp',
      '/assets/damas-villa/plan-3.webp'
    ],
    specs: { 
      area: { en: '850 sqm', fa: '۸۵۰ متر مربع' },
      status: { en: 'In Progress', fa: 'در حال ساخت' },
      materials: { en: 'Exposed Concrete, White Plaster', fa: 'بتن اکسپوز، گچ سفید' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: true,
    heroTheme: 'light',
    spatialPlan: {
      planImageUrl: '/assets/damas-villa/plan-2.webp',
      aspectRatio: '1755 / 2482',
      hotspots: [
        { id: 1, x: 25, y: 35, rot: 45, title: { en: 'Front Approach', fa: 'نمای ورودی' }, zone: { en: 'Exterior', fa: 'خارجی' }, renderUrl: '/assets/damas-villa/damas-villa-view-1.webp?v=18' },
        { id: 2, x: 50, y: 50, rot: 90, title: { en: 'Interior Space', fa: 'فضای داخلی' }, zone: { en: 'Interior', fa: 'داخلی' }, renderUrl: '/assets/damas-villa/damas-villa-view-8.webp?v=18' },
        { id: 3, x: 75, y: 65, rot: 135, title: { en: 'Arched Window', fa: 'پنجره قوسی' }, zone: { en: 'Lounge', fa: 'نشیمن خصوصی' }, renderUrl: '/assets/damas-villa/damas-villa-view-6.webp?v=18' }
      ]
    }
  },
    {
    id: 'sarziarate',
    slug: 'sarziarate',
    title: { en: 'Sarziarate Villa', fa: 'ویلا سرزیارت' },
    category: { en: 'Residential', fa: 'مسکونی' },
    year: 2024,
    location: { en: 'Sarziarate, Tehran', fa: 'سرزیارت، تهران' },
    description: { 
      en: 'Located in the scenic mountainous region of Sarziarate, this villa is designed as a serene retreat that harmonizes with its natural surroundings. Large windows frame the snowy landscape, bringing the outdoors in while providing a cozy, modern interior sanctuary.', 
      fa: 'این ویلا که در منطقه کوهستانی و خوش‌منظره سرزیارت واقع شده، به عنوان یک خلوتگاه آرام طراحی شده است که با محیط طبیعی اطراف خود هماهنگی کامل دارد. پنجره‌های بزرگ قاب‌گیر چشم‌انداز برفی هستند و ضمن حفظ فضای گرم و مدرن داخلی، طبیعت را به درون خانه دعوت می‌کنند.' 
    },
    coverImage: '/assets/sarziarate/sarziarate-hero.webp?v=18',
    galleryImages: [
      '/assets/sarziarate/sarziarate-view-1.webp?v=18',
      '/assets/sarziarate/sarziarate-view-2.webp?v=18',
      '/assets/sarziarate/sarziarate-view-3.webp?v=18',
      '/assets/sarziarate/sarziarate-view-4.webp?v=18',
      '/assets/sarziarate/sarziarate-view-5.webp?v=18',
      '/assets/sarziarate/sarziarate-view-6.webp?v=18',
      '/assets/sarziarate/sarziarate-view-7.webp?v=18',
      '/assets/sarziarate/sarziarate-view-8.webp?v=18'
    ],
    drawings: [],
    specs: { 
      area: { en: '450 sqm', fa: '۴۵۰ متر مربع' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Stone, Glass', fa: 'چوب، سنگ، شیشه' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: true,
    heroTheme: 'light'
  },
  {
    id: 'namdar-building',
    slug: 'namdar-building',
    title: { en: 'Namdar Building Renovation', fa: 'بازسازی ساختمان نامدار' },
    category: { en: 'Renovation', fa: 'بازسازی' },
    year: 2025,
    location: { en: 'Tehran', fa: 'تهران' },
    description: { 
      en: 'A comprehensive renovation of the Namdar Building, reimagining the spatial flow and integrating modern minimal elements into the classic structure.', 
      fa: 'یک بازسازی جامع برای ساختمان نامدار که جریان فضایی را دوباره طراحی کرده و عناصر مینیمال مدرن را با ساختار کلاسیک تلفیق می‌کند.' 
    },
    coverImage: '/assets/namdar-building/gallery/namdar-building-view-7.webp?v=18',
    galleryImages: [
      '/assets/namdar-building/gallery/namdar-building-view-1.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-2.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-3.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-4.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-5.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-6.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-7.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-8.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-9.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-10.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-11.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-12.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-13.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-14.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-15.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-16.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-17.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-18.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-19.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-20.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-21.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-22.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-23.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-24.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-25.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-26.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-27.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-28.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-29.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-30.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-31.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-32.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-33.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-34.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-35.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-36.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-37.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-38.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-39.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-40.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-41.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-42.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-43.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-44.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-45.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-46.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-47.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-48.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-49.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-50.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-51.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-52.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-53.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-54.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-55.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-56.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-57.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-58.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-59.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-60.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-61.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-62.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-63.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-64.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-65.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-66.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-67.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-68.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-69.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-70.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-71.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-72.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-73.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-74.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-75.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-76.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-77.webp?v=18',
      '/assets/namdar-building/gallery/namdar-building-view-78.webp?v=18'
    ],
    drawings: [
      
    ],
    specs: { 
      area: { en: 'Unknown sqm', fa: 'نامشخص' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Concrete', fa: 'چوب، بتن' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: false,
    heroTheme: 'light',
  },
  {
    id: 'office-renovation',
    slug: 'office-renovation',
    title: { en: 'Office Renovation', fa: 'بازسازی دفتر اداری' },
    category: { en: 'Commercial', fa: 'تجاری' },
    year: 2025,
    location: { en: 'Tehran', fa: 'تهران' },
    description: { 
      en: 'A modern, minimalist office renovation designed for Dr. Pour Abedi. The project was proposed in two scenarios (minimal and maximal) to balance budget and scope. The final design prioritizes open workspaces, natural lighting, and elegant acoustic glass partitions. The material palette features warm oak wood, smoked glass, black metal accents, and a neutral base of warm white and light gray.', 
      fa: 'بازسازی و طراحی داخلی مدرن و مینیمال دفتر کار دکتر پور عابدی. این پروژه در دو سناریوی حداقلی (اقتصادی) و حداکثری طراحی شد. طرح نهایی بر فضاهای کاری باز، نور طبیعی و پارتیشن‌های شیشه‌ای آکوستیک تأکید دارد. پالت متریال شامل چوب بلوط گرم، شیشه دودی، فلز مشکی و رنگ‌های پایه سفید گرم و طوسی روشن است.' },
    coverImage: '/assets/office-renovation/office-renovation-hero.webp?v=18',
    galleryImages: [
      '/assets/office-renovation/gallery/office-renovation-view-1.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-2.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-3.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-4.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-5.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-6.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-7.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-8.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-9.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-10.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-11.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-12.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-13.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-14.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-15.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-16.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-17.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-18.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-19.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-20.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-21.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-22.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-23.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-24.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-25.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-26.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-27.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-28.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-29.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-30.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-31.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-32.webp?v=18',
      '/assets/office-renovation/gallery/office-renovation-view-33.webp?v=18'
    ],
    drawings: [
    ],
    specs: { 
      client: { en: 'Dr. Pour Abedi', fa: 'دکتر پور عابدی' },
      designer: { en: 'Amin Shekari Ardakani', fa: 'امین شکاری اردکانی' },
      date: { en: 'June 2026 (1405/03/17)', fa: 'خرداد ۱۴۰۵' },
      materials: { en: 'Warm Oak Wood, Smoked Glass, Metal, Carpet Tiles', fa: 'چوب بلوط گرم، شیشه دودی، فلز، موکت تایل' },
      flooring: { en: 'Herringbone Wood & Charcoal Carpet', fa: 'کفپوش جناقی بلوط و موکت زغالی' },
      lighting: { en: 'Matte, 4000K-5000K', fa: 'نور مات ۴۰۰۰ تا ۵۰۰۰ کلوین' },
      scenarios: { en: 'Minimal & Maximal', fa: 'حداقلی و حداکثری' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Concrete', fa: 'چوب، بتن' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: false,
    heroTheme: 'light',
  },
  {
    id: 'sheikh-bahayi',
    slug: 'sheikh-bahayi',
    title: { en: 'Sheikh Bahayi Renovation', fa: 'بازسازی شیخ بهایی' },
    category: { en: 'Residential', fa: 'مسکونی' },
    year: 2025,
    location: { en: 'Tehran', fa: 'تهران' },
    description: { 
      en: 'A residential interior overhaul in the Sheikh Bahayi neighborhood, focusing on warm tones, smart layouts, and a seamless connection between living and kitchen areas.', 
      fa: 'یک بازسازی داخلی مسکونی در محله شیخ بهایی، با تمرکز بر رنگ‌های گرم، چیدمان هوشمندانه و ارتباط یکپارچه بین فضاهای نشیمن و آشپزخانه.' 
    },
    coverImage: '/assets/sheikh-bahayi/gallery/sheikh-bahayi-hero.webp?v=18',
    galleryImages: [
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-1.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-2.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-3.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-4.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-5.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-6.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-7.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-8.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-9.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-10.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-11.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-12.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-13.webp?v=18',
      '/assets/sheikh-bahayi/gallery/sheikh-bahayi-view-14.webp?v=18'
    ],
    drawings: [
      
    ],
    specs: { 
      area: { en: 'Unknown sqm', fa: 'نامشخص' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Concrete', fa: 'چوب، بتن' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: false,
    heroTheme: 'light',
  }
];
