const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

// const hello = "Hello World";
// console.log(hello);

/// READING AND WRITING FILES - SYNCHRONOUS

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the Avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File Written Successfully");

/// READING AND WRITING FILES - ASYNCHRONOUS

// fs.readFile('./txt/start.txt','utf-8',(err,data1) =>{
//     if(err)
//         return console.log("File Read fail 💥 " + err);
//     else
//         console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8', (err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2} \n ${data3}`,err=>{
//                 console.log("The final.txt is successfully written 😉 !!");
//             });
//         });
//     });
// });

/// CREATING A SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathName = requestURL.pathname;
  const query = requestURL.searchParams.get('id');

  /// Overview Page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    // array of changed array
    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace(/{%PRODUCTCARDS%}/g, cardsHTML);

    //console.log(output);
    res.end(output);
  }

  /// Product Page
  else if (pathName === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query];
    //console.log("PRODUCT" + product);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  /// API Page
  else if (pathName === '/api') {
    // JSON -> JS
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }
  /// Invalid URL
  else {
    res.writeHead(404, {
      'Content-type': 'text/html', // browser now expects html
      'My-own-header': 'hello-world',
    });
    res.end('<h1>Page NOT FOUND !!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000....');
});
