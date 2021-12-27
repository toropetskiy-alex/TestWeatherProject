import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/http.service";
import {publish} from "rxjs/operators";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {HttpParams} from "@angular/common/http";
import {API_TOKEN} from "./consts/consts";
import {BehaviorSubject} from "rxjs";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public weatherTable: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public title = 'TestWeatherProject';
  dataSource = ELEMENT_DATA;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  private getUserLocation(): void {
    this.http.getCurrentLocation().subscribe((res) => {
      this.getWeatherByCityName(res?.city);
    })
  }

  private getWeatherByCityName(cityName: string): void {
    this.http.getWeatherByCityName(this.setHttpParams(cityName)).subscribe(res => {
      console.log(res)
      // this.weatherTable.push(res);
    })
  }


  private setHttpParams(cityName: string): HttpParams {
    let params = new HttpParams();
    const allParams = {
      q: cityName,
      appid: API_TOKEN,
      units: 'metric',
      lang: 'ru',
    }
    return params.appendAll(allParams);
  }
}

