// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
//We are using the constructor of Web3 hence caps.
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

//We can change the provider
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;
beforeEach(async ()=>{
//Get a list of all accounts
//web3 is having almost all the crypto-currencies
//All functions returned from web3 is Async
accounts = await web3.eth.getAccounts();
console.log(accounts);
//Use one of those accounts to deploy the contract
inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, argument : ['Hi there!']}).send({from: accounts[0], gas:'1000000'});
console.log(inbox);
});

describe('Inbox', () =>{
    it('Deploys a contract', () => {
        //if address is null or undefined the below unit test case will fail.
        //assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
         const message = await inbox.methods.message().call();
         assert.strictEqual(message, 'Hi there!');
    });

    it('can change the message', async () =>{
        await inbox.methods.setMessage('bye').send({from: accounts[0], gas:'1000000'});
        const message = await inbox.methods.message().call();
         assert.strictEqual(message, 'bye');
    });

    //Infura signup
    //https://rinkeby.infura.io/v3/07baefe554a94f4abb210d182e68bba7
});