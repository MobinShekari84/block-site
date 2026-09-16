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
    coverImage: '/assets/KhaneDarya199/View1.webp',
    galleryImages: [
      '/assets/KhaneDarya199/View2.webp',
      '/assets/KhaneDarya199/View3.webp',
      '/assets/KhaneDarya199/View4.webp',
      '/assets/KhaneDarya199/BackGarden1.webp',
      '/assets/KhaneDarya199/BackGarden2.webp',
      '/assets/KhaneDarya199/BackGarden3.webp',
      '/assets/KhaneDarya199/BackGarden4.webp',
      '/assets/KhaneDarya199/BackGarden5.webp'
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
        { id: 1, x: 30, y: 30, rot: 45, title: { en: 'Living Space', fa: 'فضای نشیمن' }, zone: { en: 'Interior', fa: 'داخلی' }, renderUrl: '/assets/KhaneDarya199/View2.webp' },
        { id: 2, x: 70, y: 60, rot: 90, title: { en: 'Back Garden', fa: 'حیاط پشتی' }, zone: { en: 'Exterior', fa: 'خارجی' }, renderUrl: '/assets/KhaneDarya199/BackGarden1.webp' }
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
    coverImage: '/assets/sarziarate/OutViewSnow.webp',
    galleryImages: [
      '/assets/sarziarate/OutFront.webp',
      '/assets/sarziarate/OutFrontSnow.webp',
      '/assets/sarziarate/OutView2.webp',
      '/assets/sarziarate/Outdoor.webp',
      '/assets/sarziarate/LivingRoom.webp',
      '/assets/sarziarate/LivingRoom2.webp',
      '/assets/sarziarate/Kitchen.webp',
      '/assets/sarziarate/Windows.webp'
    ],
    drawings: [
      '/assets/sarziarate/Floor1.webp'
    ],
    specs: { 
      area: { en: '450 sqm', fa: '۴۵۰ متر مربع' },
      status: { en: 'Completed', fa: 'تکمیل شده' },
      materials: { en: 'Wood, Stone, Glass', fa: 'چوب، سنگ، شیشه' },
      architect: { en: 'Block Studio', fa: 'استودیو بلاک' }
    },
    isFeatured: true,
    heroTheme: 'light',
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
    coverImage: '/assets/damas-villa/MainOutRender.webp',
    galleryImages: [
      '/assets/damas-villa/FrontOutView.webp',
      '/assets/damas-villa/FrontLeftOutView.webp',
      '/assets/damas-villa/LeftOutView.webp',
      '/assets/damas-villa/OutRightView.webp',
      '/assets/damas-villa/BackOutView.webp',
      '/assets/damas-villa/Arched_window_with_modern_chande.webp',
      '/assets/damas-villa/Balcony_with_plants_in_rain.webp',
      '/assets/damas-villa/inside-villa.webp'
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
        { id: 1, x: 25, y: 35, rot: 45, title: { en: 'Exterior Approach', fa: 'ورودی خارجی' }, zone: { en: 'Exterior', fa: 'خارجی' }, renderUrl: '/assets/damas-villa/08.webp' },
        { id: 2, x: 50, y: 50, rot: 90, title: { en: 'Living Space', fa: 'فضای نشیمن' }, zone: { en: 'Interior', fa: 'داخلی' }, renderUrl: '/assets/damas-villa/09.webp' },
        { id: 3, x: 75, y: 65, rot: 135, title: { en: 'Inside Villa Render', fa: 'رندر داخلی ویلا' }, zone: { en: 'Lounge', fa: 'نشیمن خصوصی' }, renderUrl: '/assets/damas-villa/inside-villa.webp' }
      ]
    }
  }
];
