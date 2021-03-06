import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    // return this._http.get("/api/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22")
    //   .pipe(map(result => result));

    return this._http.get("/api/reports/last24Hours")
      .pipe(map(result => result));
  }

  dailySummary() {
    return this._http.get("/api/reports/daily-summary")
      .pipe(map(result => result));
  }

  summaryForDay(dateString) {
      return this._http.get("/api/reports/daily-data/" + dateString)
        .pipe(map(result => result));
  }

  dataPointsForDay(dateString) {
      return this._http.get("/api/reports/daily-summary/" + dateString)
        .pipe(map(result => result));
  }

}
