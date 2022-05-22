const fs = require('fs/promises');
const path = require('path');

const dirStyles = path.join(__dirname, 'styles');
const dirDist = path.join(__dirname, 'project-dist', 'bundle.css');

let filesArr = [];

(async () => {
  const files = await fs.readdir(dirStyles);
  for (let file of files) {
    if (file.slice(file.lastIndexOf('.')) == '.css') {
      let fileDir = path.join(dirStyles, file);
      const fileContent = await fs.readFile(fileDir, 'utf-8');
      filesArr.push(fileContent);
    }
  }
  await fs.writeFile(dirDist, filesArr.join('\n'));
})();