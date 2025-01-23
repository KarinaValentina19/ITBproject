import React from "react";

const TokenInput = ({ amount, setAmount }) => {
  return (
    <div className="token-input">
      <label htmlFor="amount">Amount to Bridge:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </div>
  );
};

export default TokenInput;
