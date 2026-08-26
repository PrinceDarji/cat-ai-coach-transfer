const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
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
  
  // Find each practice question object and inject difficulty if missing
  // We can look for `correctAnswer:` and insert `difficulty: 'medium',` right after it
  const newContent = content.replace(/correctAnswer:\s*\d+,/g, match => {
    return match + "\n      difficulty: 'medium',";
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed difficulty in', file);
  }
});
