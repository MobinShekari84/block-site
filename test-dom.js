const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('damas-villa.html', 'utf8');
const scriptCode = fs.readFileSync('js/project-template.js', 'utf8');
const projectsCode = fs.readFileSync('js/data/projects.js', 'utf8');

// A crude way to test in node:
const dom = new JSDOM(html, { runScripts: "outside-only" });
const window = dom.window;

// Mock localStorage
window.localStorage = {
  getItem: () => 'fa',
  setItem: () => {}
};

// Mock modules
const moduleCode = `
  ${projectsCode.replace('export const projects', 'window.projects')}
  ${scriptCode.replace("import { projects } from './data/index.js';", "")}
`;

try {
  window.eval(moduleCode);
  
  // Trigger DOMContentLoaded
  const event = window.document.createEvent('Event');
  event.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(event);
  
  // Check what's in main
  const main = window.document.getElementById('project-container');
  if (main.innerHTML.length === 0) {
    console.log("MAIN IS EMPTY!");
  } else {
    console.log("MAIN RENDERED OK");
  }
} catch (e) {
  console.error("ERROR CAUGHT:", e);
}
