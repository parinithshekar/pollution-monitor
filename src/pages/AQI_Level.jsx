import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import AQILevel from "../components/AQILevel";

export default () => {
  return (
    <div className="App">
      <Navbar />
      <AQILevel />
    </div>
  );
};
