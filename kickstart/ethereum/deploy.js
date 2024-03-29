const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

//With Mnemonic alone we can get the account details
const provider = new HDWalletProvider(
  "naive true shop step sock camp spider sign private whisper filter invite",
  "https://rinkeby.infura.io/v3/07baefe554a94f4abb210d182e68bba7"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
};

deploy();
