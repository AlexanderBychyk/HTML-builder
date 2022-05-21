const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'copyDir/');

fs.rmdir(dirCopy, () => {});
fs.mkdir(dirCopy, () => {});
fs.readdir(dir, (err, data) => {
  data.forEach(v => {
    let fileDir = path.join(dir, v);
    let fileCopyDir = path.join(dirCopy, v);
    fs.copyFile(fileDir, fileCopyDir, () => {});
  });
});