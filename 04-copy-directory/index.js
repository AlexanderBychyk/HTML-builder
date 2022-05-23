const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

(async () => {
  await fs.stat(dirCopy)
    .then(async () => {
      await fs.rm(dirCopy, {recursive: true});
    })
    .catch(() => {});
  await fs.mkdir(dirCopy);
  await copyDir(dir, dirCopy);
})();

function copyDir(dir, dirCopy) {
  fs.readdir(dir)
    .then(filenames => {
      for (let filename of filenames) {
        fs.stat(path.join(dir, filename))
          .then((stats) => {
            if (stats.isFile()) {
              fs.copyFile(path.join(dir, filename), path.join(dirCopy, filename));
            } else {
              fs.mkdir(path.join(dirCopy, filename));
              copyDir(path.join(dir, filename), path.join(dirCopy, filename));
            }
          });
      }
    });
}