const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { wallet: ethWallet } = require("./ethereum");
const { provider: suiProvider, packageId } = require("./sui");
const ethers = require("ethers");
const { Ed25519Keypair } = require("@mysten/sui.js");
const base64url = require("base64url");
 
const router = express.Router();
 
router.use(cors());
 
async function executeSuiTransaction(provider, txData) {
  console.log("Executing Sui Transaction...");
  const keypair = process.env.SUI_PRIVATE_KEY;
 
  return await provider.executeTransactionBlock({
    signer: keypair,
    ...txData,
  });
}
 
router.post("/ethereum-to-sui", async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;
 
  try {
    if (!ethWallet) throw new Error("Ethereum wallet not initialized");
    if (!fromAddress || !toAddress) throw new Error("Missing fromAddress or toAddress");
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new Error("Invalid amount. Must be a positive number.");
    }
 
    const value = ethers.parseEther(amount.toString());
    const ethTx = await ethWallet.sendTransaction({ to: fromAddress, value });
    console.log(`Ethereum Transaction Hash: ${ethTx.hash}`);
 
    const suiTx = await executeSuiTransaction(suiProvider, {
      packageObjectId: packageId,
      function: "mint",
      arguments: [toAddress, amount],
    }); 
 
    res.status(200).json({ message: "Tokens bridged from Ethereum to Sui successfully" });
  } catch (error) {
    console.error(`Error during Ethereum-to-Sui bridging: ${error.stack}`);
    res.status(500).json({ error: "Bridging failed", details: error.message });
  }
});
 
router.post("/sui-to-ethereum", async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;
 
  try {
    if (!ethWallet) throw new Error("Ethereum wallet not initialized");
    if (!fromAddress || !toAddress || !amount || isNaN(Number(amount))) {
      throw new Error("Invalid or missing fields in the request");
    }
 
   const suiTx = await executeSuiTransaction(suiProvider, {
      packageObjectId: packageId,
      function: "burn",
      arguments: [amount],
    }); 
 
    const value = ethers.parseEther(amount.toString());
    const ethTx = await ethWallet.sendTransaction({ to: toAddress, value });
    //console.log(`Ethereum Transaction Hash: ${ethTx.hash}`);
 
    res.status(200).json({ message: "Tokens bridged from Sui to Ethereum successfully" });
  } catch (error) {
    console.error(`Error during Sui-to-Ethereum bridging: ${error.message}`);
    res.status(500).json({ error: "Bridging failed", details: error.message });
  }
});
 
module.exports = router;