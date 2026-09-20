import fs from 'fs';
import { JSDOM } from 'jsdom';
const dom = new JSDOM(`<!DOCTYPE html><html><body><main id="project-container"></main><a id="nextProjectTeaser"></a><div id="nextProjectTitle"></div><div class="next-project-bg"></div></body></html>`, { url: "http://localhost:8080/projects/damas-villa/" });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = { getItem: () => 'en' };
global.window.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
};
global.MutationObserver = class {
  constructor() {}
  observe() {}
};
global.window.location = { pathname: '/projects/damas-villa/' };
document.body.dataset.projectId = 'damas-villa';

// Mock getRelativeUrl logic directly here
// We can't easily import project-template.js directly because it executes immediately and might throw error
// Let's just read it and eval it
const scriptText = fs.readFileSync('js/project-template.js', 'utf-8');

// We need to provide the imports manually since eval doesn't do ESM imports
import { projects } from './js/data/index.js';
import { assetManifest } from './js/data/assetManifest.js';

// Remove the import lines
const cleanScript = scriptText.replace(/import .*?;\n/g, '');

try {
  eval(cleanScript);
  setTimeout(() => {
    console.log("Container HTML:", document.getElementById('project-container').innerHTML.substring(0, 100));
  }, 100);
} catch (e) {
  console.error("ERROR CAUGHT:", e);
}

