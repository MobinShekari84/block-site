import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from '../js/data/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const projectMap = {
  "khane-darya": "villa/Khane-Darya-No.199",
  "sisangan-mazandaran": "villa/Sisangan-Mazandaran",
  "damas-villa": "villa/Damas-Villa",
  "sarziarate": "villa/Sarziarate-Villa",
  "namdar-building": "renovation/Namdar-Building-Renovation",
  "office-renovation": "renovation/Office-Renovation",
  "sheikh-bahayi": "renovation/Sheikh-Bahayi-Renovation"
};

function getWebpFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getWebpFiles(fullPath));
    } else if (file.endsWith('.webp')) {
      // make path relative to root
      results.push(fullPath.replace(ROOT + '/', '').replace(/\\/g, '/'));
    }
  });
  return results;
}

const manifest = {};

for (const [id, folderPath] of Object.entries(projectMap)) {
  const fullFolder = path.join(ROOT, `assets/${folderPath}`);
  
  const assets = {
    documents: [],
    exteriorDesign: [],
    interiorDesign: [],
    landscapeDesign: [],
    photos: []
  };

  const isVilla = folderPath.startsWith('villa');

  if (fs.existsSync(fullFolder)) {
    let allFiles = getWebpFiles(fullFolder);
    allFiles = allFiles.map(f => f.startsWith('/') ? f : '/' + f);
    
    // Sort files logically
    allFiles.sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));
    
    allFiles.forEach(f => {
      // Ignore original-docs and about
      if (f.includes('/original-docs/') || f.includes('/about/')) return;
      
      const parts = f.split('/');
      const parentFolder = parts[parts.length - 2];
      const projectName = folderPath.split('/')[1];
      
      // Ignore root hero images
      if (parentFolder === projectName) return;
      
      const fileWithCache = f; 
      
      if (parentFolder === 'documents' || parentFolder === 'drawings') {
        assets.documents.push(fileWithCache);
      } else if (parentFolder === 'exterior-design') {
        assets.exteriorDesign.push(fileWithCache);
      } else if (parentFolder === 'interior-design') {
        assets.interiorDesign.push(fileWithCache);
      } else if (parentFolder === 'landscape-design') {
        assets.landscapeDesign.push(fileWithCache);
      } else if (parentFolder === 'photos') {
        assets.photos.push(fileWithCache);
      } else if (parentFolder === 'gallery') {
        if (isVilla) assets.exteriorDesign.push(fileWithCache);
        else assets.interiorDesign.push(fileWithCache);
      }
    });
  }

  manifest[id] = assets;
}

const jsContent = `// AUTO-GENERATED FILE. DO NOT EDIT.
export const assetManifest = ${JSON.stringify(manifest, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, 'js/data/assetManifest.js'), jsContent, 'utf-8');



console.log('Asset Manifest Generated Successfully!');
