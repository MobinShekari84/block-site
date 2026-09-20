import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, 'js/script.js');
let js = fs.readFileSync(scriptPath, 'utf-8');

// Fix Projects Grid links
js = js.replace(/const link = \`\/projects\/\$\{item\.slug\}\/\`;/, "const prefix = lang === 'en' ? '/en' : '';\n        const link = `${prefix}/projects/${item.slug}/`;");

// Fix Hero Slideshow links
// Find where hero slides are processed:
// It seems hero slider reads from `t.hero.slides`
js = js.replace(/if\(heroActionBtn && slideData\.link\) heroActionBtn\.href = slideData\.link;/, "if(heroActionBtn && slideData.link) heroActionBtn.href = (lang === 'en' ? '/en' : '') + slideData.link;");

// Wait, let's just make it replace all instances of `heroActionBtn.href = slideData.link`
js = js.replace(/heroActionBtn\.href = slideData\.link/g, "heroActionBtn.href = (lang === 'en' ? '/en' : '') + slideData.link");

fs.writeFileSync(scriptPath, js, 'utf-8');
console.log('script.js link prefix fixed.');
