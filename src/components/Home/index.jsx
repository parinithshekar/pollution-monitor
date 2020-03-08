import React, { Component } from "react";
import "./style.css";

export default class Home extends Component {
  render() {
    return (
      <div className="screen">
        <div className="middle-card">
          <h1 id="title">
            Simple is best<span className="greendot">.</span>
          </h1>
          <h2 id="subtitle">My ass</h2>
        </div>
      </div>
    );
  }
}
