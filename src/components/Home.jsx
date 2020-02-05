import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as moment from "moment";
import "./home.css";
import { Line } from "react-chartjs-2";

export default class Home extends Component {
  state = {
    chartData: {
      labels: ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"],
      datasets: [
        {
          label: "Pokemon",
          fill: false,
          data: [20, 25, 13, 19],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(74, 192, 192, 0.6)"
          ]
        }
      ]
    },
    pastChartData: {},
    pastChartOptions: {}
  };

  async componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyCFRZFhwB5b-ofAIaw5SkMzVAXsfnXfnlk",
      authDomain: "pollution-pkdoesml.firebaseapp.com",
      databaseURL: "https://pollution-pkdoesml.firebaseio.com",
      projectId: "pollution-pkdoesml",
      storageBucket: "pollution-pkdoesml.appspot.com",
      messagingSenderId: "38138624567",
      appId: "1:38138624567:web:118f4935442512e5d65db2",
      measurementId: "G-YK0VHJV9PW"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const ref = db.ref("/");
    await ref.on("value", snapshot => {
      //   console.log("\n\nREALTIME");
      //   console.log(snapshot.val());
      const snap = snapshot.val();
      const pastEntries = Object.entries(snap.past);
      const pastData = pastEntries.map(item => {
        return {
          t: item[0],
          y: item[1]
        };
      });

      const predictedEntries = Object.entries(snap.predicted);
      const predictedData = predictedEntries.map(item => {
        return {
          t: item[0],
          y: item[1]
        };
      });

      const pastChartData = {
        datasets: [
          {
            label: "Actual Pollution Levels",
            fill: false,
            data: pastData,
            lineTension: 0.1,
            borderColor: "#ffffff"
          },
          {
            label: "Predicted Pollution Levels",
            fill: false,
            data: predictedData,
            lineTension: 0.2,
            borderColor: "#2f3542"
          }
        ]
      };

      const pastChartOptions = {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  second: "h:mm:ss A"
                },
                parser: "DD-MM-YYYY HH:mm:ss"
              }
            }
          ]
        }
      };
      console.log("PAST DATA", pastData);
      this.setState(
        {
          snap,
          pastChartData,
          pastChartOptions
        },
        () => console.log(this.state)
      );
    });
    // const now = moment("16-01-2020 10:00:10", "DD-MM-YYYY HH:mm:ss");
    // console.log(now.get("date"));
  }

  render() {
    const { pastChartData, pastChartOptions } = this.state;

    return pastChartData.data ? null : (
      <div className="home">
        <div className="container">
          <div className="chart">
            <Line data={pastChartData} options={pastChartOptions} />
          </div>
        </div>
      </div>
    );
  }
}
