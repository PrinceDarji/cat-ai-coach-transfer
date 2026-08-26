const fs = require('fs');

let tables = '';
for (let i = 1; i <= 20; i++) {
  tables += `**Table of ${i}**\n`;
  for (let j = 1; j <= 10; j++) {
    tables += `$${i} \\times ${j} = ${i * j}$\n`;
  }
  tables += '\n';
}

let squares = '';
for (let i = 1; i <= 30; i++) {
  squares += `- $${i}^2 = ${i * i}$\n`;
}

let cubes = '';
for (let i = 1; i <= 15; i++) {
  cubes += `- $${i}^3 = ${i * i * i}$\n`;
}

fs.writeFileSync('temp_math.json', JSON.stringify({tables, squares, cubes}));
