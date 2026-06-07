const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(srcDir, function(filePath) {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;

        // @/components -> @/views/components
        newContent = newContent.replace(/@\/components\//g, '@/views/components/');
        // @/pages -> @/views/pages
        newContent = newContent.replace(/@\/pages\//g, '@/views/pages/');
        // @/context -> @/models/context
        newContent = newContent.replace(/@\/context\//g, '@/models/context/');
        // @/lib -> @/models/lib
        newContent = newContent.replace(/@\/lib\//g, '@/models/lib/');
        // @/hooks -> @/controllers/hooks
        newContent = newContent.replace(/@\/hooks\//g, '@/controllers/hooks/');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated imports in ${filePath}`);
        }
    }
});
console.log("Done.");
