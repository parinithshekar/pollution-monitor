import React from "react";
import "./style.css";
import aqi_chart_image from "../../aqi_chart.png";

export default () => {
  return (
    <div className="aqichart-screen">
      <div className="description">
        <h1 id="question">What is AQI?</h1>
        <p id="answer">
          An air quality index (AQI) is used by government agencies to
          communicate to the public how polluted the air currently is or how
          polluted it is forecast to become. Public health risks increase as the
          AQI rises. Different countries have their own air quality indices,
          corresponding to different national air quality standards.
        </p>

        <p id="visit">
          Visit{" "}
          <a
            id="link"
            href="http://www.indiaenvironmentportal.org.in/files/file/Air%20Quality%20Index.pdf"
          >
            this link
          </a>{" "}
          to learn more about calculating AQI values
        </p>
      </div>
      <div className="table">
        <img id="aqi-chart" src={aqi_chart_image} alt="" />
      </div>
    </div>
  );
};
