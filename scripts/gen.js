const fs = require('fs');

let markdownTables = '';

for (let row = 1; row <= 5; row++) {
  let startTable = (row - 1) * 4 + 1; 
  
  markdownTables += `| Table of ${startTable} | Table of ${startTable+1} | Table of ${startTable+2} | Table of ${startTable+3} |\n`;
  markdownTables += `|---|---|---|---|\n`;
  
  for (let mult = 1; mult <= 10; mult++) {
    markdownTables += `| $${startTable} \\times ${mult} = ${startTable * mult}$ | $${startTable+1} \\times ${mult} = ${(startTable+1) * mult}$ | $${startTable+2} \\times ${mult} = ${(startTable+2) * mult}$ | $${startTable+3} \\times ${mult} = ${(startTable+3) * mult}$ |\n`;
  }
  markdownTables += '\n';
}

let content = fs.readFileSync('src/lib/content/quant/basic-operations.ts', 'utf8');
// replace the entire tables section
content = content.replace(/### Complete List of Cubes.*?(?=\n\s*\])/s, markdownTables);
fs.writeFileSync('temp_tables.txt', markdownTables);
