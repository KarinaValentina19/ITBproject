require('dotenv').config();
const axios = require('axios');

const { SUI_RPC_URL, SUI_PRIVATE_KEY, SUI_PACKAGE_ID } = process.env;

async function callSuiRPC(method, params) {
  try {
    const response = await axios.post(SUI_RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });
    if (response.data.error) throw new Error(response.data.error.message);
    return response.data.result;
  } catch (error) {
    console.error('Error calling Sui RPC:', error.message);
    throw error;
  }
}

async function executeTransaction(txData) {
  try {
    return await callSuiRPC('sui_executeTransaction', [
      txData,
      { signature: '', pubkey: SUI_PRIVATE_KEY },
    ]);
  } catch (error) {
    throw new Error(`Transaction execution failed: ${error.message}`);
  }
}

async function mintTokens(recipient, amount) {
  const txData = {
    kind: 'Call',
    data: {
      package: SUI_PACKAGE_ID,
      module: 'IBTToken',
      function: 'mint',
      typeArguments: [],
      arguments: [recipient, amount],
    },
  };
  return executeTransaction(txData);
}

async function burnTokens(tokenId, amount) {
  const txData = {
    kind: 'Call',
    data: {
      package: SUI_PACKAGE_ID,
      module: 'IBTToken',
      function: 'burn',
      typeArguments: [],
      arguments: [tokenId, amount],
    },
  };
  return executeTransaction(txData);
}

module.exports = { mintTokens, burnTokens };
