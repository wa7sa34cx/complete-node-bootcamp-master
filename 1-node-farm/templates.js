// const { fdatasync, fstat } = require('fs');
const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const replaceTemplate = require('./modules/replaceTemplate');


// Get templates
const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

// Get data for API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Create SERVER
const server = http.createServer((req, res) => {
  
  const pathName = req.url.split('?')[0];
  const query = querystring.parse(req.url.split('?')[1]);

  // const pathName = req.url;

  // Overview
  if (pathName === '/overview' || pathName === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map(el => replaceTemplate(templateCard, el))
      .join('');
    
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);


  // Product  
  } else if (pathName === '/product') {
    // res.end('This is the PRODUCT');
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

  // API  
  } else if (pathName === '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);

  // 404    
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }


});

// Run SERVER
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requestd on port 8000...');
});