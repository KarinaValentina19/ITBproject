const { ethers } = require("ethers");
require('dotenv').config();
const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, ethProvider);

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
const abi = [
  "function mint(address to, uint256 amount) public",
  "function burn(uint256 amount) public",
];

const ethContract = new ethers.Contract(contractAddress, abi, wallet);

async function testEthereumIntegration() {
  try {
    const mintTx = await ethContract.mint(wallet.address, ethers.parseEther("10"));
    console.log("Mint transaction hash:", mintTx.hash);

    await mintTx.wait();

    const burnTx = await ethContract.burn(ethers.parseEther("5"));
    console.log("Burn transaction hash:", burnTx.hash);

    await burnTx.wait();

    console.log("Ethereum integration test passed!");
  } catch (err) {
    console.error("Error testing Ethereum integration:", err);
  }
}

testEthereumIntegration();
