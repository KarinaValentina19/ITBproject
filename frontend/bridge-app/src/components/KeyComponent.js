import React, { useState } from 'react';
import Notification from './Notification';

const KeyComponent = () => {
  const [notification, setNotification] = useState(null);

  const handleKeyGeneration = () => {
    setNotification({ type: 'success', message: 'Key generated successfully!' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="connect-box">
      <h3>Key Component</h3>
      <button onClick={handleKeyGeneration}>Generate Key</button>
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

export default KeyComponent;