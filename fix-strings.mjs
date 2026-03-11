import fs from 'fs';

// Fix Layout.astro
let layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
layout = layout.replace(/San AndrÃ©s/g, 'San Andrés');
layout = layout.replace(/huÃ©spedes/g, 'huéspedes');
layout = layout.replace(/UbicaciÃ³n/g, 'Ubicación');
layout = layout.replace(/mÃ¡s/g, 'más');
fs.writeFileSync('src/layouts/Layout.astro', layout, 'utf8');
console.log('Fixed Layout.astro');

// Fix Overview.astro
let overview = fs.readFileSync('src/components/Overview.astro', 'utf8');
overview = overview.replace(/<div class="feature-icon">.*?<\/div>\s*/g, '');
fs.writeFileSync('src/components/Overview.astro', overview, 'utf8');
console.log('Fixed Overview.astro');
