import { execSync } from 'child_process';
console.log('Generating asset manifest...');
execSync('node generator-apps/generate_assets.mjs', { stdio: 'inherit' });
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { siteMeta } from '../js/data/siteMeta.js';
import { projects } from '../js/data/projects.js';

import { assetManifest } from '../js/data/assetManifest.js';

function toPersianDigits(str) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.toString().replace(/\d/g, x => farsiDigits[x]);
}

function generateProjectHTML(projectConfig, lang) {
  const isFa = lang === 'fa';
  
  let metaHTML = '';
  if (projectConfig.year || projectConfig.specs) {
    const yearStr = projectConfig.year ? (isFa ? toPersianDigits(projectConfig.year) : projectConfig.year) : (isFa ? 'در حال ساخت' : 'Ongoing');
    const area = projectConfig.specs?.area ? projectConfig.specs.area[lang] : null;
    const status = projectConfig.specs?.status ? projectConfig.specs.status[lang] : null;

    metaHTML = `
      <div class="project-meta-bar reveal">
        <div class="meta-item"><span>${isFa ? 'مکان' : 'Location'}</span><strong>${projectConfig.location[lang]}</strong></div>
        <div class="meta-item"><span>${isFa ? 'سال' : 'Year'}</span><strong>${yearStr}</strong></div>
        <div class="meta-item"><span>${isFa ? 'کاربری' : 'Typology'}</span><strong>${projectConfig.category[lang]}</strong></div>
        ${area ? `<div class="meta-item"><span>${isFa ? 'مساحت' : 'Area'}</span><strong>${area}</strong></div>` : ''}
        ${status ? `<div class="meta-item"><span>${isFa ? 'وضعیت' : 'Status'}</span><strong>${status}</strong></div>` : ''}
      </div>
    `;
  }

  const assets = assetManifest[projectConfig.id] || {};
  const assetCategoriesConfig = [
    { key: 'exteriorDesign', label: { en: 'EXTERIOR DESIGN', fa: 'طراحی خارجی' } },
    { key: 'interiorDesign', label: { en: 'INTERIOR DESIGN', fa: 'طراحی داخلی' } },
    { key: 'landscapeDesign', label: { en: 'LANDSCAPE DESIGN', fa: 'طراحی محوطه' } },
    { key: 'photos', label: { en: 'PHOTOGRAPHY (BEFORE/AFTER)', fa: 'عکاسی / قبل و بعد' } },
    { key: 'documents', label: { en: 'DOCUMENTS & PLANS', fa: 'اسناد و نقشه‌ها' } }
  ];

  let assetSectionsHTML = '';
  let currentSectionIndex = 2;

  assetCategoriesConfig.forEach(cat => {
    const imgs = assets[cat.key];
    if (imgs && imgs.length > 0) {
      let gridHTML = '<div class="editorial-gallery">';
      let imgIndex = 0;
      
      if (imgIndex + 1 < imgs.length) {
        gridHTML += `
          <div class="gallery-diptych">
            <img src="${imgs[imgIndex]}" class="lightbox-trigger reveal" loading="lazy">
            <img src="${imgs[imgIndex+1]}" class="lightbox-trigger reveal" loading="lazy">
          </div>`;
        imgIndex += 2;
      }
      
      if (imgIndex < imgs.length) {
        gridHTML += `<div class="gallery-triptych">`;
        for(; imgIndex < imgs.length; imgIndex++) {
          gridHTML += `<img src="${imgs[imgIndex]}" class="lightbox-trigger reveal" loading="lazy">`;
        }
        gridHTML += `</div>`;
      }
      gridHTML += '</div>';
      
      const idxStr = currentSectionIndex < 10 ? '0' + currentSectionIndex : currentSectionIndex;
      
      assetSectionsHTML += `
      <div class="architectural-section tonal-shift-light" id="section-${cat.key}">
        <div class="section-index reveal">
          <span class="idx-num">${idxStr} /</span>
          <span class="idx-title">${cat.label[lang]}</span>
        </div>
        <div class="section-body">
          ${gridHTML}
        </div>
      </div>
      `;
      currentSectionIndex++;
    }
  });

  let spatialSectionHTML = '';
  if (projectConfig.spatialPlan) {
    const idxStr = currentSectionIndex < 10 ? '0' + currentSectionIndex : currentSectionIndex;
    spatialSectionHTML = `
    <div class="architectural-section tonal-shift-drafting" id="section-spatial">
      <div class="section-index reveal">
        <span class="idx-num">${idxStr} /</span>
        <span class="idx-title">${lang === 'fa' ? 'نقشه و پلان' : 'SPATIAL MAPPING'}</span>
      </div>
      <div class="section-body">
        <div id="spatial-container"></div>
      </div>
    </div>
    `;
    currentSectionIndex++;
  }

  let specsSectionHTML = '';
  if (projectConfig.specs) {
    const keys = Object.keys(projectConfig.specs);
    if(keys.length > 0) {
      const specTranslations = {
        area: { en: 'AREA', fa: 'مساحت' },
        status: { en: 'STATUS', fa: 'وضعیت' },
        client: { en: 'CLIENT', fa: 'کارفرما' },
        designer: { en: 'DESIGNER', fa: 'طراح' },
        architect: { en: 'ARCHITECT', fa: 'معمار' },
        materials: { en: 'MATERIALS', fa: 'متریال' },
        flooring: { en: 'FLOORING', fa: 'کفپوش' },
        lighting: { en: 'LIGHTING', fa: 'نورپردازی' },
        scenarios: { en: 'SCENARIOS', fa: 'سناریوها' },
        date: { en: 'DATE', fa: 'تاریخ' }
      };
      
      let gridHTML = '';
      keys.forEach(k => {
        const lowerK = k.toLowerCase();
        const label = specTranslations[lowerK] ? specTranslations[lowerK][lang] : k.toUpperCase();
        gridHTML += `
          <div class="spec-block">
            <span class="spec-label">${label}</span>
            <span class="spec-value">${projectConfig.specs[k][lang] || projectConfig.specs[k].en}</span>
          </div>
        `;
      });
      
      const idxStr = currentSectionIndex < 10 ? '0' + currentSectionIndex : currentSectionIndex;
      specsSectionHTML = `
      <div class="architectural-section tonal-shift-light" id="section-specs">
        <div class="section-index reveal">
          <span class="idx-num">${idxStr} /</span>
          <span class="idx-title">${lang === 'fa' ? 'مشخصات و متریال' : 'MATERIALITY & SPECIFICATIONS'}</span>
        </div>
        <div class="section-body">
          <div class="specs-grid">${gridHTML}</div>
        </div>
      </div>
      `;
      currentSectionIndex++;
    }
  }

  const i18n = {
    narrative: lang === 'fa' ? 'شرح پروژه' : 'PROJECT NARRATIVE'
  };

  return {
    nextIndex: currentSectionIndex,
    html: `
    <section class="project-hero parallax-hero reveal">
      <img src="${projectConfig.coverImage}" alt="Hero Image" class="lightbox-trigger reveal">
      <div class="project-hero-overlay">
        <h1 class="project-title" id="projectTitle">${projectConfig.title[lang]}</h1>
      </div>
    </section>

    ${metaHTML}

    <!-- 01: NARRATIVE -->
    <div class="architectural-section" id="section-narrative">
      <div class="section-index reveal">
        <span class="idx-num">01 /</span>
        <span class="idx-title">${i18n.narrative}</span>
      </div>
      <div class="section-body">
        <div class="split-narrative">
          <p class="narrative-text" id="narrativeText">${projectConfig.description[lang]}</p>
          ${projectConfig.narrativeImage ? `<img src="${projectConfig.narrativeImage}" alt="${i18n.narrative}" class="reveal narrative-image" loading="lazy">` : ''}
        </div>
      </div>
    </div>

    <!-- ASSET GALLERIES -->
    ${assetSectionsHTML}

    ${projectConfig.spatialPlan ? `
    <!-- SPATIAL MAPPING -->
    ${spatialSectionHTML}
    ` : ''}

    ${projectConfig.specs ? `
    <!-- SPECS -->
    ${specsSectionHTML}
    ` : ''}
    `
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
// Read templates
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(ROOT, 'about-us/index.html'), 'utf-8');
const projectTemplatePath = path.join(ROOT, 'generator-apps/templates/project.html');
const projectTemplate = fs.readFileSync(projectTemplatePath, 'utf-8');
function makeRelativePaths(html, destPath) {
  const depth = destPath.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  
  // Match any src/href that points to our root folders, regardless of current prefix (/, ../, or none)
  let processed = html.replace(/(src|href|data-alt-url)="(?:\/|\.\.\/)*(assets|css|js|projects|about-us|components|en\b)/g, `$1="${prefix}$2`);
  processed = processed.replace(/(src|href|data-alt-url)="[\/\.]+"/g, `$1="${prefix || './'}"`);
  processed = processed.replace(/(src|href)="[\/\.]+#([^"]+)"/g, `$1="${prefix || './'}#$2"`);
  
  // Special case for root links like href="/"
  return processed;
}
function injectSEO(html, lang, title, desc, urlPath, destPath) {
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  let processed = html.replace(/<html.*?>/, `<html lang="${lang}" dir="${dir}">`);
  processed = processed.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  
  processed = processed.replace(/^\s*<meta name="description"[^>]*>\r?\n?/gm, '');
  processed = processed.replace(/^\s*<link rel="alternate" hreflang=".*?" href=".*?">\r?\n?/gm, '');
  
  const metaTags = `
  <meta name="description" content="${desc}">
  <link rel="alternate" hreflang="fa" href="https://blockarcstudio.com${urlPath.replace('/en', '')}">
  <link rel="alternate" hreflang="en" href="https://blockarcstudio.com/en${urlPath.replace('/en', '')}">`;
  
  processed = processed.replace(/<\/title>/, `</title>\n${metaTags}`);
  
  if (lang === 'fa') {
    processed = processed.replace(/<button class="lang-switcher" id="langSwitcher"[^>]*>.*?<\/button>/g, '<button class="lang-switcher" id="langSwitcher" aria-label="Switch language" dir="auto" data-alt-url="/en' + urlPath.replace('/en','') + '">EN</button>');
  } else {
    processed = processed.replace(/<button class="lang-switcher" id="langSwitcher"[^>]*>.*?<\/button>/g, '<button class="lang-switcher" id="langSwitcher" aria-label="Switch language" dir="auto" data-alt-url="' + urlPath.replace('/en','') + '">FA</button>');
  }
  
  if (lang === 'en') {
    processed = processed.replace(/href="(?:(?:\.\.\/)+|\/)"/g, 'href="/en/"');
    processed = processed.replace(/href="(?:(?:\.\.\/)+|\/)#hero"/g, 'href="/en/#hero"');
    processed = processed.replace(/href="(?:(?:\.\.\/)+|\/)#projects"/g, 'href="/en/#projects"');
    processed = processed.replace(/href="(?:(?:\.\.\/)+|\/)?about-us\/"/g, 'href="/en/about-us/"');
    processed = processed.replace(/href="(?:(?:\.\.\/)+|\/)?projects\/([^"]*)"/g, 'href="/en/projects/$1"');
  }
  processed = makeRelativePaths(processed, destPath);
  
  return processed;
}
function processFile(srcHtml, destPath, lang, title, desc, urlPath) {
  const finalHtml = injectSEO(srcHtml, lang, title, desc, urlPath, destPath);
  const fullPath = path.join(ROOT, destPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, finalHtml, 'utf-8');
}
// 1. Build Index
processFile(indexHtml, 'index.html', 'fa', 'استودیو معماری بلاک — Block Architecture Studio', siteMeta.fa.footer.desc, '/');
processFile(indexHtml, 'en/index.html', 'en', 'Block Architecture Studio', siteMeta.en.footer.desc, '/en/');
// 2. Build About
processFile(aboutHtml, 'about-us/index.html', 'fa', 'درباره ما — استودیو معماری بلاک', siteMeta.fa.aboutSummary.text.substring(0, 150), '/about-us/');
processFile(aboutHtml, 'en/about-us/index.html', 'en', 'About Us — Block Architecture Studio', siteMeta.en.aboutSummary.text.substring(0, 150), '/en/about-us/');
// 3. Build Projects
projects.forEach(p => {
  const faTitle = `${p.title.fa} — استودیو معماری بلاک`;
  const enTitle = `${p.title.en} — Block Architecture Studio`;
  const faDesc = p.description.fa.substring(0, 150);
  const enDesc = p.description.en.substring(0, 150);
  
  // Get next project for teaser
  const pIndex = projects.findIndex(proj => proj.id === p.id);
  const nextProject = projects[(pIndex + 1) % projects.length];
  
  let faDOM = generateProjectHTML(p, 'fa');
  let enDOM = generateProjectHTML(p, 'en');
  
  const faNextIdxStr = faDOM.nextIndex < 10 ? '0' + faDOM.nextIndex : faDOM.nextIndex;
  const enNextIdxStr = enDOM.nextIndex < 10 ? '0' + enDOM.nextIndex : enDOM.nextIndex;

  let pFaHtml = projectTemplate
    .replace(/data-project-id=".*?"/, `data-project-id="${p.id}"`)
    .replace('<main id="project-container"></main>', `<main id="project-container">${faDOM.html}</main>`)
    .replace('<span class="idx-num">05 /</span>', `<span class="idx-num">${faNextIdxStr} /</span>`)
    .replace('id="nextProjectTeaser" style="display:none;', 'id="nextProjectTeaser" style="display:block;')
    .replace('id="nextProjectTitle"></h2>', `id="nextProjectTitle">${nextProject.title.fa}</h2>`)
    .replace('<p class="next-label" id="nextLabelEl">Next Project</p>', '<p class="next-label" id="nextLabelEl">پروژه بعدی</p>')
    .replace('id="nextTransitionLabel">NEXT TRANSITION</span>', 'id="nextTransitionLabel">گذر بعدی</span>')
    .replace('<div class="next-project-bg"></div>', `<div class="next-project-bg" style="background-image: url('${nextProject.coverImage}')"></div>`)
    .replace(/href="#" class="next-project-teaser/, `href="../${nextProject.slug}/" class="next-project-teaser`)
    .replace('{{EN_TITLE}}', enTitle.replace(' — Block Architecture Studio', ''));

  let pEnHtml = projectTemplate
    .replace(/data-project-id=".*?"/, `data-project-id="${p.id}"`)
    .replace('<main id="project-container"></main>', `<main id="project-container">${enDOM.html}</main>`)
    .replace('<span class="idx-num">05 /</span>', `<span class="idx-num">${enNextIdxStr} /</span>`)
    .replace('id="nextProjectTeaser" style="display:none;', 'id="nextProjectTeaser" style="display:block;')
    .replace('id="nextProjectTitle"></h2>', `id="nextProjectTitle">${nextProject.title.en}</h2>`)
    .replace('<div class="next-project-bg"></div>', `<div class="next-project-bg" style="background-image: url('${nextProject.coverImage}')"></div>`)
    .replace(/href="#" class="next-project-teaser/, `href="../${nextProject.slug}/" class="next-project-teaser`)
    .replace('{{EN_TITLE}}', enTitle.replace(' — Block Architecture Studio', ''));

  processFile(pFaHtml, `projects/${p.slug}/index.html`, 'fa', faTitle, faDesc, `/projects/${p.slug}/`);
  processFile(pEnHtml, `en/projects/${p.slug}/index.html`, 'en', enTitle, enDesc, `/en/projects/${p.slug}/`);
});
console.log('SSG Build Complete!');