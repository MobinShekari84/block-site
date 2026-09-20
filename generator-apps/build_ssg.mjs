import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { siteMeta } from '../js/data/siteMeta.js';
import { projects } from '../js/data/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Read templates (we will use the fa ones as base since they are already there)
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(ROOT, 'about-us/index.html'), 'utf-8');
const projectTemplatePath = path.join(ROOT, 'projects/damas-villa/index.html');
const projectTemplate = fs.readFileSync(projectTemplatePath, 'utf-8');

function injectSEO(html, lang, title, desc, urlPath) {
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  let processed = html.replace(/<html.*?>/, `<html lang="${lang}" dir="${dir}">`);
  processed = processed.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  
  // Clean up ALL existing meta descriptions and hreflang tags to prevent duplication
  processed = processed.replace(/<meta name="description"[^>]*>/g, '');
  processed = processed.replace(/<link rel="alternate" hreflang=".*?" href=".*?">/g, '');
  
  const metaTags = `
  <meta name="description" content="${desc}">
  <link rel="alternate" hreflang="fa" href="https://blockarcstudio.com${urlPath.replace('/en', '')}">
  <link rel="alternate" hreflang="en" href="https://blockarcstudio.com/en${urlPath.replace('/en', '')}">`;
  
  // Inject right after title
  processed = processed.replace(/<\/title>/, `</title>\n${metaTags}`);
  
  if (lang === 'en') {
    // Fix internal links for english routing
    processed = processed.replace(/href="\/"/g, 'href="/en/"');
    processed = processed.replace(/href="\/\#hero"/g, 'href="/en/#hero"');
    processed = processed.replace(/href="\/\#projects"/g, 'href="/en/#projects"');
    processed = processed.replace(/href="\/about-us\/"/g, 'href="/en/about-us/"');
  }
  
  return processed;
}

function processFile(srcHtml, destPath, lang, title, desc, urlPath) {
  const finalHtml = injectSEO(srcHtml, lang, title, desc, urlPath);
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
  
  let pFaHtml = projectTemplate.replace(/data-project-id=".*?"/, `data-project-id="${p.id}"`);
  processFile(pFaHtml, `projects/${p.slug}/index.html`, 'fa', faTitle, faDesc, `/projects/${p.slug}/`);
  
  let pEnHtml = projectTemplate.replace(/data-project-id=".*?"/, `data-project-id="${p.id}"`);
  processFile(pEnHtml, `en/projects/${p.slug}/index.html`, 'en', enTitle, enDesc, `/en/projects/${p.slug}/`);
});

console.log('SSG Build Complete!');
