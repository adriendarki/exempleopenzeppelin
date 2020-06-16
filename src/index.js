const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');
const { accounts, contract } = require('@openzeppelin/test-environment');

async function main() {
    const web3 = new Web3('http://localhost:7545');
    const loader = setupLoader({ provider: web3 }).web3;
    
    // Set up a web3 contract, representing our deployed Box instance, using the contract loader
    const address = '0xE9F60C12fA30aD313bAd3e296A214Cb3F73d38dB';
    const box = loader.fromArtifact('Box', address);
    const accounts = await web3.eth.getAccounts();

    // Send a transaction to store() a new value in the Box
    await box.methods.store(20)
    .send({ from: accounts[0], gas: 50000, gasPrice: 1e6 });

    // Call the retrieve() function of the deployed Box contract
    const value = await box.methods.retrieve().call();
    console.log("Box value is", value);

    // Use the different accounts, which are unlocked and funded with Ether
    const [ admin, deployer, user ] = accounts;

    // Create a contract object from a compilation artifact
    const MyContract = contract.fromArtifact('MyContract');




}

main();