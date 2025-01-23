import React from 'react';
import './StatusDisplay.css'; 

const StatusDisplay = ({ status }) => {
  return (
    <div className="status-display">
      <h3>Transaction Status</h3>
      {status ? (
        <div className={`status-message ${status.success ? 'success' : 'error'}`}>
          {status.success ? (
            <span>
              <i className="success-icon">✔</i> {}
              {status.message}
            </span>
          ) : (
            <span>
              <i className="error-icon">✖</i> {}
              {status.message}
            </span>
          )}
        </div>
      ) : (
        <p className="no-transactions">No transactions yet.</p>
      )}
    </div>
  );
};

export default StatusDisplay;
