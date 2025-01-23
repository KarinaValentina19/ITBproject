import React, { useState } from 'react';
import Notification from './Notification';

const BridgeComponent = () => {
  const [notification, setNotification] = useState(null);

  const handleTransaction = () => {
    setNotification({ type: 'success', message: 'Transaction successful!' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="connect-box">
      <h3>Bridge Component</h3>
      <button onClick={handleTransaction}>Start Transaction</button>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default BridgeComponent;