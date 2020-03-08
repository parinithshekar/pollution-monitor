import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navtile from "../Navtile";
import "./style.css";

export default class Navbar extends Component {
  state = {
    tiles: [
      { title: "Home", path: "" },
      { title: "AQI Level", path: "level" },
      { title: "AQI Chart | Calcs", path: "chart" },
      { title: "FAQ & Support", path: "faq" }
    ]
  };
  render() {
    return (
      <div className="navbar">
        {this.state.tiles.map(tile => {
          return (
            <Link
              to={`/${tile.path}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Navtile title={tile.title} key={tile.path} />
            </Link>
          );
        })}
      </div>
    );
  }
}
