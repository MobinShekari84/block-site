const fs = require('fs');
let js = fs.readFileSync('js/data/projects.js', 'utf8');
js = js.replace('export const projects =', 'global.window.projectsData =');
global.window = {};
eval(js);

const projectConfig = global.window.projectsData.find(x => x.id === 'namdar-building');

let galleryBottomHTML = '';
const g = projectConfig.galleryImages || [];
if (g.length > 1) {
    galleryBottomHTML = `<div class="gallery-stack">`;
    if(g[1] && g[2]) galleryBottomHTML += `
    <div class="gallery-diptych reveal">
        <img src="${g[1]}" class="lightbox-trigger" loading="lazy">
        <img src="${g[2]}" class="lightbox-trigger" loading="lazy">
    </div>`;
    if(g[3] && g[4] && g[5]) galleryBottomHTML += `
    <div class="gallery-triptych reveal">
        <img src="${g[3]}" class="lightbox-trigger" loading="lazy">
        <img src="${g[4]}" class="lightbox-trigger" loading="lazy">
        <img src="${g[5]}" class="lightbox-trigger" loading="lazy">
    </div>`;
    
    if(g.length > 6) {
    galleryBottomHTML += `<div class="gallery-triptych reveal">`;
    for(let i = 6; i < g.length; i++) {
        galleryBottomHTML += `<img src="${g[i]}" class="lightbox-trigger" loading="lazy">`;
    }
    galleryBottomHTML += `</div>`;
    }
    galleryBottomHTML += `</div>`;
}

console.log("galleryBottomHTML length:", galleryBottomHTML.length);
if(galleryBottomHTML.length > 0) {
    console.log("First part of gallery:", galleryBottomHTML.substring(0, 200));
}
