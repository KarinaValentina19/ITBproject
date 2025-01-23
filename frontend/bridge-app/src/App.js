import React, { useState } from 'react';
import './App.css'; 
import WalletConnect from './components/WalletConnect';
import TokenInput from './components/TokenInput';
import Bridge from './components/Bridge';
import StatusDisplay from './components/StatusDisplay';

function App() {
  const [ethereumWallet, setEthereumWallet] = useState(null);
  const [suiWallet, setSuiWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);

  const updateStatus = (success, message) => {
    setStatus({ success, message });
  };

  return (
    <div className="App">
        <header className="App-header">
            <h1>Blockchain Bridge</h1>
        </header>
        <div className="container">
            <div className="flex-container">
                <div className="section wallet-connect-section">
                    <h2>Connect Wallets</h2>
                    <WalletConnect setEthereumWallet={setEthereumWallet} setSuiWallet={setSuiWallet} />
                </div>
                <div className="section transaction-section">
                    <h2>Transaction</h2>
                    <TokenInput amount={amount} setAmount={setAmount} />
                    {ethereumWallet && suiWallet && (
                        <Bridge
                            ethereumWallet={ethereumWallet}
                            suiWallet={suiWallet}
                            amount={amount}
                            updateStatus={updateStatus}
                        />
                    )}
                    <StatusDisplay status={status} />
                </div>
            </div>
        </div>
    </div>
);
}

export default App;
