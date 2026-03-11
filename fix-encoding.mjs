import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function fixEncoding(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'dist' || file === '.git') continue;
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
            fixEncoding(fullPath);
        } else if (fullPath.endsWith('.astro') || fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.js') || fullPath.endsWith('.mjs')) {
            let content = readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Common Windows-1252 Mojibake from UTF-8
            content = content.replaceAll('Ã©', 'é');
            content = content.replaceAll('Ã³', 'ó');
            content = content.replaceAll('Ã¡', 'á');
            content = content.replaceAll('Ã\xAD', 'í');
            content = content.replaceAll('Ã­', 'í'); 
            content = content.replaceAll('Ãº', 'ú');
            content = content.replaceAll('Ã±', 'ñ');
            content = content.replaceAll('Â¡', '¡');
            content = content.replaceAll('Â¿', '¿');
            content = content.replaceAll('Ã‰', 'É');
            content = content.replaceAll('Ã“', 'Ó');
            content = content.replaceAll('Ã\x81', 'Á');
            content = content.replaceAll('Ã\x8D', 'Í');
            content = content.replaceAll('Ãš', 'Ú');
            content = content.replaceAll('Ã‘', 'Ñ');

            if (content !== original) {
                writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    }
}

fixEncoding('./src');
console.log('Encoding fix script completed.');
