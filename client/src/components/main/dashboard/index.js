import React from "react";

import "./dashboard.css";

const index = () => {
  return (
    <div className="dashboard-container">
      <img src="/images/bgDashboard.svg" alt="billing svg" />

      <div className="list">
        <h1>Make Your Billing Experience Easier</h1>
        <ul>
          <li>Save all your invoices</li>
          <li>Access any invoice at any time</li>
          <li>Make your bussiness digital</li>
          <li>Empress the customer</li>
          <li>No worry for loss of data</li>
        </ul>
      </div>
    </div>
  );
};

export default index;
