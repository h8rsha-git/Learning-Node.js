// https://dog.ceo/api/breed/hound/images/random Fetch!

const fs = require('fs');
const http = require('fs');
const superagent = require('superagent');

/// CALLBACK HELL

/*fs.readFile('dog.txt','utf-8',(err,data)=>{
    console.log(`Breed : ${data}`);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{
        if(err){
            return console.log(err.message);
        }

        const link = res.body.message;
        console.log(`Retrieved Link : ${link}`);
        
        fs.writeFile('dog-image.txt',link, err=>{
            console.log('Random dog image is saved to the file !!');
        });
    });
}); */

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject('File not Found !!');
      resolve(data); // this is returned by then()
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write to file !!');
      resolve('success'); // this is returned by then()
    });
  });
};

/// PROMISES

/*
readFilePro('dog.txt').then(data =>{
    console.log(`Breed : ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); 
}).then(res =>{
    console.log(`Retrieved Link : ${link}`);
    return writeFilePro('dog-image.txt', link);
}).then(()=>{
    console.log('Random dog image is saved to the file !!');
}).catch(err =>{
    console.log(err.message);
}) */

/// USING ASYNC/ AWAIT
const getDogPic = async () => {
  try {
    const data = await readFilePro('dog.txt');

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    // console.log(all);

    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-image.txt', imgs.join('\n'));
  } catch (err) {
    console.log('Cannot read the file');
    throw err;
  }
  return '2. Ready 😁';
};

(async () => {
  try {
    console.log('1. Will get the dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3. Done getting the dog pics');
  } catch (err) {
    console.log(err);
  }
})();
