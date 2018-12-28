import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Graph';

  chart = []; // This will hold our chart info

  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {

        console.log(res);

        // let temp_max = res['list'].map(res => res.main.temp_max);
        // let temp_min = res['list'].map(res => res.main.temp_min);
        // let alldates = res['list'].map(res => res.dt)

        let times = res['localTimes'];
        let houseTemps = res['houseTemperatures'];
        let tempSettings = res['thermostatSettings'];

        console.log("times", times);
        console.log("temps", houseTemps);
        console.log("settings", tempSettings)

        // let weatherDates = []
        // alldates.forEach((res) => {
        //   let jsdate = new Date(res * 1000)
        //   weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        // })
        //
        // console.log("\n\nweather dates:", weatherDates, "\n\n");
        // console.log("\n\ntemp_max:", temp_max, "\n\n");
        // console.log("\n\ntemp_min:", temp_min, "\n\n");

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: times,
            datasets: [
              {
                data: houseTemps,
                borderColor: "#3cba9f",
                fill: false
              },
              {
                data: tempSettings,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

    // let temp_max = res['list'].map(res => res.main.temp_max);
    //     let temp_min = res['list'].map(res => res.main.temp_min);
    //     let alldates = res['list'].map(res => res.dt)
    //
    //     let weatherDates = []
    //     alldates.forEach((res) => {
    //       let jsdate = new Date(res * 1000)
    //       weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
    //     })
    //
    //     console.log("\n\nweather dates:", weatherDates, "\n\n");
    //     console.log("\n\ntemp_max:", temp_max, "\n\n");
    //     console.log("\n\ntemp_min:", temp_min, "\n\n");
    //
    //     this.chart = new Chart('canvas', {
    //       type: 'line',
    //       data: {
    //         labels: weatherDates,
    //         datasets: [
    //           {
    //             data: temp_max,
    //             borderColor: "#3cba9f",
    //             fill: false
    //           },
    //           {
    //             data: temp_min,
    //             borderColor: "#ffcc00",
    //             fill: false
    //           },
    //         ]
    //       },
    //       options: {
    //         legend: {
    //           display: false
    //         },
    //         scales: {
    //           xAxes: [{
    //             display: true
    //           }],
    //           yAxes: [{
    //             display: true
    //           }],
    //         }
    //       }
    //     });
    //
      })
  }
}
