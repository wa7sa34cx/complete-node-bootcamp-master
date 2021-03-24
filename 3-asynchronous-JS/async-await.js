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
    const breed = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${breed}`);

    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${breed}/images/random`
    // );

    const res1prom = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const res2prom = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const res3prom = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const all = await Promise.all([res1prom, res2prom, res3prom]);
    // console.log(all);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    // console.log(res.body.message);

    // await writeFilePro('dog-img.txt', res.body.message);
    await writeFilePro('dog-img.txt', imgs.join('\n'));

    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);

    throw err;
  }

  return 'Three';
};

/*
console.log('One');
// const x = getDocPic();
// console.log(x);

getDocPic()
  .then(x => {
    console.log(x);
  })
  .catch(err => {
    // console.log(err);
    console.log('Aw, snap! Error 💥');
  });

console.log('Two');
*/

(async () => {
  try {
    console.log('One');
    const x = await getDocPic();
    console.log(x);
    console.log('Two');
  } catch (err) {
    console.log('Aw, snap! Error 💥');
  }
})();
