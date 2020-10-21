'use strict';

const app = require('./bin/express.js')
const server = require('http').Server(app);

let port = process.env.port || 3333;

server.listen(port, ()=>{
    console.log('Serverdo faustão no ar');
});