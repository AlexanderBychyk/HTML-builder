const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'secret-folder');
showDir(dir);

function showDir(dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {
      let newDir = path.join(dir, file);
      fs.stat(newDir, (err, stats) => {
        if (stats.isFile()) {
          console.log([
            file.slice(0, file.lastIndexOf('.')),
            file.slice(file.lastIndexOf('.')+1),
            `${stats.size * 0.001}kb`
          ].join(' - '));
        } 
      });
    });
  });
}