const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') && !file.endsWith('index.ts') && !file.endsWith('types.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:\\Users\\Prince Darji\\cat-ai-coach\\src\\lib\\content');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // This regex matches a single backslash (not preceded by another)
  // followed by any letter or percent sign.
  const newContent = content.replace(/(?<!\\)\\([a-zA-Z%])/g, (match, p1) => {
    if (p1 === 'n' || p1 === 'r') return match;
    return '\\\\' + p1; // replace with double backslash
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed', file);
  }
});
