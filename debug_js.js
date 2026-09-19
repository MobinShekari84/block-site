const fs = require('fs');

// Mock DOM environment
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body class="subpage project-page" data-project-id="namdar-building"><div id="main-content"></div></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

// Load projects.js
const projectsJs = fs.readFileSync('js/data/projects.js', 'utf8');
eval(projectsJs);

// Load project-template.js
const templateJs = fs.readFileSync('js/project-template.js', 'utf8');

try {
  eval(templateJs);
  // Wait for DOMContentLoaded trigger
  document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  
  // Wait for the setTimeout and DOM updates
  setTimeout(() => {
    const mainContent = document.getElementById('main-content');
    console.log("mainContent HTML length:", mainContent.innerHTML.length);
    if(mainContent.innerHTML.includes('section-archive')) {
        console.log("Gallery (section-archive) is present!");
    } else {
        console.log("Gallery is MISSING!");
    }
  }, 500);
} catch(e) {
  console.error("Error executing:", e);
}
