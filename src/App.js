import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
import Home from "./pages/Home";
import AQI_Level from "./pages/AQI_Level";
import AQIChart from "./pages/AQIChart";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/level" component={AQI_Level}></Route>
      <Route path="/chart" component={AQIChart}></Route>
      <Route path="/faq" component={FAQ}></Route>
      <Route path="/" exact>
        404 not found
      </Route>
    </BrowserRouter>
  );
}

export default App;
