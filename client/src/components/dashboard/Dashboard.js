import React from "react";

const Dashboard = () => {
  const ITEMS = [{ id: 1, name: "Dashboard" }];
  return (
    <div className="dashboard">
      {ITEMS.map((item) => (
        <div key={item.id} className="listItem">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
