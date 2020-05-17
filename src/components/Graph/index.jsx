import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Line } from "react-chartjs-2";
import "./style.css";

export default class extends Component {
  state = {
    selectedView: this.props.selectedView,
    chartData: {},
    chartOptions: {
      legend: {
        labels: {
          fontColor: "black",
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              displayFormats: {
                second: "h:mm:ss A",
              },
              parser: "DD-MM-YYYY HH:mm:ss",
            },
            ticks: {
              fontColor: "black",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: "black",
            },
          },
        ],
      },
    },
    currentValue: {},
    currentPrediction: {},
    futurePrediction: {},
  };

  // getDatetime(datetimeString) {
  //   const datetimeArray = datetimeString.split(" ");

  //   const dateString = datetimeArray[0];
  //   const
  // }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedView !== this.props.selectedView) {
      await this.setState({ selectedView: this.props.selectedView });
    } else {
      return;
    }

    if (this.state.selectedView === "select") {
      this.setState({
        chartData: {},
      });
      return;
    }

    const firebaseConfig = {
      apiKey: "AIzaSyCFRZFhwB5b-ofAIaw5SkMzVAXsfnXfnlk",
      authDomain: "pollution-pkdoesml.firebaseapp.com",
      databaseURL: "https://pollution-pkdoesml.firebaseio.com",
      projectId: "pollution-pkdoesml",
      storageBucket: "pollution-pkdoesml.appspot.com",
      messagingSenderId: "38138624567",
      appId: "1:38138624567:web:2e591b99bb428659d65db2",
      measurementId: "G-1JVZFN2P1T",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    const ref = db.ref("/");
    await ref.on("value", (snapshot) => {
      const snap = snapshot.val();
      const pastEntries = Object.entries(
        snap.past[this.state.selectedView]
      ).sort();
      const pastData = pastEntries.map((item) => {
        return {
          t: item[1].time,
          y: item[1].value,
        };
      });
      const currentPastEntry = pastEntries[pastEntries.length - 1];

      let currentPast = {};
      let currentPastTime = null;
      if (currentPastEntry[1]) {
        currentPast = {
          time: currentPastEntry[1].time,
          value: currentPastEntry[1].value,
        };
        currentPastTime = Date.parse(
          `01/01/2010 ${currentPast.time.split(" ")[1]}`
        );
      }

      const predictedEntries = Object.entries(
        snap.predicted[this.state.selectedView]
      ).sort();

      let currentPrediction = {};
      const predictedData = predictedEntries.map((item) => {
        if (item[1] && currentPastTime) {
          const currentPredictionTime = Date.parse(
            `01/01/2010 ${item[1].time.split(" ")[1]}`
          );
          if (currentPredictionTime < currentPastTime) {
            currentPrediction = item[1];
          }
        }
        return {
          t: item[1].time,
          y: item[1].value,
        };
      });
      const futurePredictionEntry =
        predictedEntries[predictedEntries.length - 1];
      let futurePrediction = {
        time: futurePredictionEntry[1].time,
        value: futurePredictionEntry[1].value,
      };

      const chartData = {
        datasets: [
          {
            label: `Past ${this.state.selectedView} levels`,
            fill: false,
            data: pastData,
            lineTension: 0.1,
            borderColor: "#ffffff",
          },
          {
            label: `Predicted ${this.state.selectedView} Levels`,
            fill: false,
            data: predictedData,
            lineTension: 0.2,
            borderColor: "#2f3542",
          },
        ],
      };
      this.setState({
        chartData: chartData,
        currentPast: currentPast,
        currentPrediction: currentPrediction,
        futurePrediction: futurePrediction,
      });
    });
  }

  getAQIClass(aqiValue) {
    if (aqiValue >= 0 && aqiValue <= 50) return ["GOOD", "#00e600"];
    else if (aqiValue >= 51 && aqiValue <= 100) return ["MODERATE", "#ffff00"];
    else if (aqiValue >= 101 && aqiValue <= 150)
      return ["UNHEALTHY FOR\nSENSITIVE GROUPS", "#ff7d00"];
    else if (aqiValue >= 151 && aqiValue <= 200)
      return ["UNHEALTHY", "#ff0000"];
    else if (aqiValue >= 201 && aqiValue <= 300)
      return ["VERY UNHEALTHY", "#9c004c"];
    else if (aqiValue >= 301 && aqiValue <= 500)
      return ["HAZARDOUS", "#800022"];
    else return ["UNKNOWN", "#ffffff"];
  }

  render() {
    const {
      selectedView,
      chartData,
      chartOptions,
      currentPast,
      currentPrediction,
      futurePrediction,
    } = this.state;

    const isAQI = selectedView === "aqi";
    let currentPastAQIClass = null;
    let currentPredictionAQIClass = null;
    let futurePredictionAQIClass = null;
    let currentPastAQIColor = "#ffffff";
    let currentPredictionAQIColor = "#ffffff";
    let futurePredictionAQIColor = "#ffffff";
    if (isAQI) {
      if (currentPast) {
        const currentPastAQI = this.getAQIClass(currentPast.value);
        currentPastAQIClass = currentPastAQI[0];
        currentPastAQIColor = currentPastAQI[1];
      }
      if (currentPrediction) {
        const currentPredictionAQI = this.getAQIClass(currentPrediction.value);
        currentPredictionAQIClass = currentPredictionAQI[0];
        currentPredictionAQIColor = currentPredictionAQI[1];
      }
      if (futurePrediction) {
        const futurePredictionAQI = this.getAQIClass(futurePrediction.value);
        futurePredictionAQIClass = futurePredictionAQI[0];
        futurePredictionAQIColor = futurePredictionAQI[1];
      }
    }

    return (
      <div className="graph-screen">
        {!chartData ? null : (
          <div className="container">
            <div className="chart">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
        <div className="numerical-info">
          <div className="current-reading">
            <div className="reading-heading">Current Reading</div>
            <div className="reading-value">
              {currentPast ? currentPast.value : null}
            </div>
            <div className="reading-timestamp">
              {currentPast ? currentPast.time : null}
            </div>
            <div className="aqi-class" style={{ color: currentPastAQIColor }}>
              {currentPastAQIClass}
            </div>
          </div>
          <div className="current-prediction">
            <div className="reading-heading">Previously Predicted</div>
            <div className="reading-value">
              {currentPrediction ? currentPrediction.value : null}
            </div>
            <div className="reading-timestamp">
              {currentPrediction ? currentPrediction.time : null}
            </div>
            <div
              className="aqi-class"
              style={{ color: currentPredictionAQIColor }}
            >
              {currentPredictionAQIClass}
            </div>
          </div>
          <div className="future-prediction">
            <div className="reading-heading">Future Prediction</div>
            <div className="reading-value">
              {futurePrediction ? futurePrediction.value : null}
            </div>
            <div className="reading-timestamp">
              {futurePrediction ? futurePrediction.time : null}
            </div>
            <div
              className="aqi-class"
              style={{ color: futurePredictionAQIColor }}
            >
              {futurePredictionAQIClass}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
