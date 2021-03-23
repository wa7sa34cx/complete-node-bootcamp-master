const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, breed) => {
  console.log(`Breed: ${breed}`);

  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);

      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);

        console.log('Random dog image saved to file!');
      });
    });
});
