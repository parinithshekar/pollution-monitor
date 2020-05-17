import React, { Component } from "react";
import "./style.css";

import Graph from "../Graph";

export default class AQILevel extends Component {
  state = {
    selectedView: null,
  };

  handleClick = ({ target: { value } }) => {
    this.setState({
      selectedView: value,
    });
  };

  render() {
    const { selectedView } = this.state;
    return (
      <div className="aqilevel-screen">
        <div id="dropdown" className="">
          <select onChange={this.handleClick}>
            <option default value="select">
              Select an option
            </option>
            <option value="pm25">PM 2.5</option>
            <option value="pm10">PM 10</option>
            <option value="aqi">AQI</option>
          </select>
        </div>
        <Graph selectedView={selectedView} />
      </div>
    );
  }
}
