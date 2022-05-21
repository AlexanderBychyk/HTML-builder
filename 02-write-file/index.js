const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readLine = require('readline');

let dir = path.join(__dirname, 'text.txt');

fs.access(dir, fs.F_OK, (err) => {
  if (err) {
    fs.createWriteStream(dir, 'utf-8');
  }
});

console.log('- Please enter text:');
const rl = readLine.createInterface({ input, output });

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    return;
  }
  fs.readFile(dir, 'utf-8', (err, data) => {
    let newStr = `${data}${input} \n`;
    fs.writeFile(dir, newStr, 'utf-8', () => {});
  });
  
});
rl.on('close', () => console.log('- Thank you! Goodbye.'));
