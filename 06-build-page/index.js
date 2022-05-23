const fs = require('fs/promises');
const path = require('path');

const dirStyles = path.join(__dirname, 'styles');
const dirAssets = path.join(__dirname, 'assets');
const dirComponents = path.join(__dirname, 'components');
const dirDist = path.join(__dirname, 'project-dist');
const dirDistStyles = path.join(__dirname, 'project-dist', 'style.css');
const dirDistAssets = path.join(__dirname, 'project-dist', 'assets');

let filesArr = [];
let componentArr = [];

(async () => {

  // create folder project-dist
  await fs.stat(dirDist)
    .then(async () => {
      await fs.rm(dirDist, {recursive: true});
    })
    .catch(() => {});
  await fs.mkdir(dirDist);
  //----------------------------

  // bundle styles
  const files = await fs.readdir(dirStyles);
  for (let file of files) {
    if (file.slice(file.lastIndexOf('.')) == '.css') {
      let fileDir = path.join(dirStyles, file);
      const fileContent = await fs.readFile(fileDir, 'utf-8');
      filesArr.push(fileContent);
    }
  }
  await fs.writeFile(dirDistStyles, filesArr.join('\n'));
  //----------------------------

  // create folder project-dist/assets
  await fs.mkdir(dirDistAssets);
  await copyAssets(dirAssets, dirDistAssets);
  //----------------------------

  await fs.copyFile(path.join(__dirname, 'template.html'), path.join(dirDist, 'index.html'));
  await fs.readdir(dirComponents)
    .then(async (filenames) => {
      for (let filename of filenames) {
        await fs.readFile(path.join(dirComponents, filename), 'utf-8')
          .then(data => {
            componentArr.push(new ComponentDOM(`{{${filename.slice(0, filename.lastIndexOf('.'))}}}`, data));
          });
      }
    });
  await fs.readFile(path.join(dirDist, 'index.html'), 'utf-8')
    .then(async (data) => {
      componentArr.forEach(el => {
        data = data.replaceAll(el.name, el.dom);
      });
      fs.writeFile(path.join(dirDist, 'index.html'), data);
    });
    
})();

function copyAssets(dirAssets, dirDistAssets) {
  fs.readdir(dirAssets)
    .then(filenames => {
      for (let filename of filenames) {
        fs.stat(path.join(dirAssets, filename))
          .then((stats) => {
            if (stats.isFile()) {
              fs.copyFile(path.join(dirAssets, filename), path.join(dirDistAssets, filename));
            } else {
              fs.mkdir(path.join(dirDistAssets, filename));
              copyAssets(path.join(dirAssets, filename), path.join(dirDistAssets, filename));
            }
          });
      }
    });
}

class ComponentDOM {
  constructor(name, dom) {
    this.name = name;
    this.dom = dom;
  }
}