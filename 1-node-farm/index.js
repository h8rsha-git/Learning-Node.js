const fs = require("fs");
const http = require("http");

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
const server = http.createServer((req,res) =>{
    res.end("Hello from the server !!");
});

server.listen('127.0.0.1','8000',()=>{
    console.log("Listening on port 8000....");
});