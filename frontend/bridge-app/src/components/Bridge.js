import React from "react";
import axios from "axios";

const Bridge = ({ ethereumWallet, suiWallet, amount, updateStatus }) => {
  const transferToSui = async () => {
    try {
      if (!ethereumWallet) throw new Error("Ethereum wallet not connected");
      if (!suiWallet || !suiWallet.keypair) throw new Error("Sui wallet not connected");

      const publicKey = suiWallet.keypair.getPublicKey();
      const suiAddress = publicKey.toSuiAddress();

      updateStatus(false, "Transfer to Sui is pending...");
      const response = await axios.post("http://localhost:3000/bridge/ethereum-to-sui", {
        fromAddress: ethereumWallet.address,
        toAddress: suiAddress,
        amount,
      });

      updateStatus(true, `Transfer to Sui Successful: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      updateStatus(false, `Transfer to Sui Failed: ${error.response?.data?.error || error.message}`);
    }
  };

  const transferToEthereum = async () => {
    try {
      if (!ethereumWallet) throw new Error("Ethereum wallet not connected");
      if (!suiWallet || !suiWallet.keypair) throw new Error("Sui wallet not connected");

      const publicKey = suiWallet.keypair.getPublicKey();
      const suiAddress = publicKey.toSuiAddress();

      updateStatus(false, "Transfer to Ethereum is pending...");
      const response = await axios.post("http://localhost:3000/bridge/sui-to-ethereum", {
        fromAddress: suiAddress,
        toAddress: ethereumWallet.address,
        amount,
      });

      updateStatus(true, `Transfer to Ethereum Successful: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      updateStatus(false, `Transfer to Ethereum Failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="bridge">
      <button onClick={transferToSui} className="btn-transfer">
        Transfer to Sui
      </button>
      <button onClick={transferToEthereum} className="btn-transfer">
        Transfer to Ethereum
      </button>
    </div>
  );
};

export default Bridge;
