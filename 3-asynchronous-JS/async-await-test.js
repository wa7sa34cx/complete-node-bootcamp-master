const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(err);
      resolve('Success');
    });
  });
};

const getDocPic = async () => {
  try {
    const breed = await fs.readFile(`${__dirname}/dog2.txt`);
    console.log(`Breed: ${breed}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);

    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
  }
};

getDocPic();
