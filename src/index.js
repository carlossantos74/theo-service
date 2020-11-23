const theo = require("theo");
const fs = require("fs-extra");
const path = require('path');

function createDirectory(dir) {  
   if(!fs.existsSync(path.resolve(__dirname, '../dist/'))) {
    fs.mkdirSync(path.resolve(__dirname, '../dist/'));
  } else if (!fs.existsSync(path.resolve(__dirname, `../dist/${dir}`))){
    fs.mkdirSync(path.resolve(__dirname, `../dist/${dir}`));
  }
}

function createFile(text, file, platform, format) {
  createDirectory(platform)

  const fileName = file.replace('.yml', `.${format}`);
  const filepath = path.resolve(__dirname, `../dist/${platform}/${fileName}`);
  
  fs.writeFile(path.resolve(__dirname, filepath), text);

  console.log(`* File: ${fileName} written`);
}


async function sweepFiles(platform, format) {
  const filesList = await fs.readdir(path.resolve(__dirname, '../tokens'))
  
  for (let i = 0; i < filesList.length; i++) {
  theo.convert({
    transform: {
      type: platform,
      file: `tokens/${filesList[i]}`
    },
    format: {
      type: format,
    }
  })
  .then(file => {
    createFile(file, filesList[i], platform, format);
  })
  .catch(error => console.log(error));
  }
}

sweepFiles('web', 'scss');

