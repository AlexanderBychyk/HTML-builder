const fs = require('fs');
const path = require('path');

let dir = path.join(__dirname, 'text.txt');
let stream = new fs.createReadStream(dir, 'utf8');
stream.on('data', (text) => {
  console.log(text);
});
