const { ethers } = require("ethers");

const privateKey = process.env.ETH_PRIVATE_KEY;
const rpcUrl = process.env.ETH_RPC_URL;

if (!privateKey) {
  throw new Error("Ethereum private key not configured in .env file");
}

if (!rpcUrl) {
  throw new Error("Ethereum RPC URL not configured in .env file");
}

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

module.exports = { wallet };
