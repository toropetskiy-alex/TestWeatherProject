import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_TOKEN} from "../consts/consts";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  public getCurrentLocation(): Observable<any> {
    return this.httpClient.get('https://get.geojs.io/v1/ip/geo.json')
  }
  public getWeatherByCityName(params: HttpParams) {
   return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather`, {params})
  }
}
