import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/Header";
import List from "./list/List";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Dashboard />
        <List />
      </div>
    </>
  );
};

export default App;
