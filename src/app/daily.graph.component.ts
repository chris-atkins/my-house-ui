import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class DailyGraphComponent {

  chart = []; // This will hold our chart info
  numberOfMinutesDataExistsFor = "";
  numberOfMinutesHeaterIsOn = "";
  numberOfMinutesACIsOn = "";
  averageHouseTemperature = "";
  averageExternalTemperature = "";
  averageInternalExternalTemperatureDifference = "";
  averageHouseTempSetting = "";
  averageWindSpeed = "";
  averageTimeBetweenHeaterCyclesAtOneTemp = "";
  averageTimeBetweenACCyclesAtOneTemp = "";

  constructor(private route: ActivatedRoute,
              private _weather: WeatherService
  ) {}

  ngOnInit() {
    const dateString = +this.route.snapshot.paramMap.get('dateString');
    this._weather.summaryForDay(dateString)
      .subscribe(res => {
        console.log("summary", res);

        this.numberOfMinutesDataExistsFor  = res["numberOfMinutesDataExistsFor"];
        this.numberOfMinutesHeaterIsOn  = res["numberOfMinutesHeaterIsOn"];
        this.numberOfMinutesACIsOn  = res["numberOfMinutesACIsOn"];
        this.averageHouseTemperature  = res["averageHouseTemperature"];
        this.averageExternalTemperature  = res["averageExternalTemperature"];
        this.averageInternalExternalTemperatureDifference  = res["averageInternalExternalTemperatureDifference"];
        this.averageHouseTempSetting  = res["averageHouseTempSetting"];
        this.averageWindSpeed  = res["averageWindSpeed"];
        this.averageTimeBetweenHeaterCyclesAtOneTemp  = res["averageTimeBetweenHeaterCyclesAtOneTemp"];
        this.averageTimeBetweenACCyclesAtOneTemp  = res["averageTimeBetweenACCyclesAtOneTemp"];

      });

    this._weather.dataPointsForDay(dateString)
      .subscribe(res => {

        console.log(res);

        let times = res['localTimes'];
        let houseTemps = res['houseTemperatures'];
        let tempSettings = res['thermostatSettings'];

        console.log("times", times);
        console.log("temps", houseTemps);
        console.log("settings", tempSettings)

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
      })
  }
}
