const { JsonRpcProvider, Ed25519Keypair, RawSigner } = require('@mysten/sui.js');
require('dotenv').config();

const provider = new JsonRpcProvider(process.env.SUI_RPC_URL);
const keypair = 0x0006ae20e85563c39bf16f1054e1fbb7a253a0f0272cb8923d9b12f8337c
const signer = new RawSigner(keypair, provider);

const packageId = process.env.SUI_PACKAGE_ID; 
const moduleName = "IBT";

async function testSuiIntegration() {
  try {
    const initTx = await signer.executeMoveCall({
      packageObjectId: packageId,
      module: moduleName,
      function: "initialize",
      typeArguments: [],
      arguments: [],
      gasBudget: 10000,
    });
    console.log("Initialization transaction:", initTx);

    const ibtObjectId = initTx.effects.created[0].reference.objectId;

    const mintTx = await signer.executeMoveCall({
      packageObjectId: packageId,
      module: moduleName,
      function: "mint",
      typeArguments: [],
      arguments: [ibtObjectId, 10], 
      gasBudget: 10000,
    });
    console.log("Mint transaction:", mintTx);

    const burnTx = await signer.executeMoveCall({
      packageObjectId: packageId,
      module: moduleName,
      function: "burn",
      typeArguments: [],
      arguments: [ibtObjectId, 5], 
      gasBudget: 10000,
    });
    console.log("Burn transaction:", burnTx);

    console.log("Sui integration test passed!");
  } catch (err) {
    console.error("Error testing Sui integration:", err);
  }
}

testSuiIntegration();
