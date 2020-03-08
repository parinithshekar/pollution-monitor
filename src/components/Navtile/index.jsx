import React, { Component } from "react";
import "./style.css";

export default class Navtile extends Component {
  render() {
    return (
      <div className="navtile">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
