import React from "react";

const Dashboard = () => {
  const ITEMS = [{ id: 1, name: "Dashboard" }];
  return (
    <div className="dashboard">
      {ITEMS.map((item) => (
        <div key={item.id} className="dashboardItem">
          <i className="fas fa-cube" />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
