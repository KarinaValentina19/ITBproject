import React, { useState } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { BrowserProvider } from "ethers";

const WalletConnect = ({ setEthereumWallet, setSuiWallet }) => {
  const [ethAddress, setEthAddress] = useState("");
  const [suiAddress, setSuiAddress] = useState("");

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setEthAddress(address);
      setEthereumWallet(signer); 
      alert("Connected to MetaMask");
    } catch (err) {
      console.error("MetaMask connection failed:", err);
      alert("MetaMask connection failed");
    }
  };

  const connectSuiWallet = async () => {
    try {
      const keypair = new Ed25519Keypair();
      const publicKey = keypair.getPublicKey();
      const suiAddress = publicKey.toSuiAddress();
      setSuiAddress(suiAddress);

      const rpcUrl = getFullnodeUrl("testnet"); 
      const client = new SuiClient({ url: rpcUrl });

      const coins = await client.getCoins({ owner: suiAddress });
      console.log("Sui Wallet Connected. Owned Coins:", coins);

      setSuiWallet({ keypair, client }); 
      alert(`Connected to Sui Wallet. Address: ${suiAddress}`);
    } catch (err) {
      console.error("Sui Wallet connection failed:", err);
      alert("Sui Wallet connection failed");
    }
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <p>Ethereum Address: {ethAddress}</p>
      <button onClick={connectSuiWallet}>Connect Sui Wallet</button>
      <p>Sui Address: {suiAddress}</p>
    </div>
  );
};

export default WalletConnect;
