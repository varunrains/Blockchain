const fs = require('fs');
const path = require('path');
const solc = require('solc');

//We have to read the solidity contract file to compile
const filePath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const fileContent = fs.readFileSync(filePath,'utf8');

//console.log(fileContent);
//console.log(solc.compile(fileContent,1));
module.exports = solc.compile(fileContent,1).contracts[':Lottery'];
