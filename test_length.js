const fs = require('fs');
let js = fs.readFileSync('js/data/projects.js', 'utf8');
js = js.replace('export const projects =', 'global.projectsData =');
eval(js);

const nb = global.projectsData.find(x => x.id === 'namdar-building');
if(nb) {
    console.log('Found Namdar Building.');
    console.log('Gallery Images length:', nb.galleryImages ? nb.galleryImages.length : 0);
} else {
    console.log('Namdar Building not found');
}
