import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bannel',
  templateUrl: './bannel.component.html',
  styleUrls: ['./bannel.component.css']
})
export class Bannel {
  title = 'header';
  backGroundBeach: boolean = true;
  backGroundMap: boolean = false;
  backGroundWeather: boolean = false;
  backGroundBeachExtra: boolean = false;
  backGroundMapExtra: boolean = false;
  backGroundWeatherExtra: boolean = false;
  eventBackGroundBeach: any;
  eventBackGroundMap: any;
  eventBackGroundWeather: any;
  ngOnInit(): void {
    this.eventBackGroundBeach = setInterval(
      () => (this.backGroundBeach = !this.backGroundBeach),
      4000
    );
    this.eventBackGroundMap = setInterval(
      () => (this.backGroundMap = !this.backGroundMap),
      8000
    );
    this.eventBackGroundWeather = setInterval(
      () => (this.backGroundWeather = !this.backGroundWeather),
      6000
    );
  }
  transferBeach() {
    clearInterval(this.eventBackGroundBeach);
    clearInterval(this.eventBackGroundMap);
    clearInterval(this.eventBackGroundWeather);
    this.backGroundBeach = false;
    this.backGroundMap = false;
    this.backGroundWeather = false;
    this.backGroundBeachExtra = true;
    this.backGroundMapExtra = true;
    this.backGroundWeatherExtra = false;
  }
  transferMap() {
    clearInterval(this.eventBackGroundBeach);
    clearInterval(this.eventBackGroundMap);
    clearInterval(this.eventBackGroundWeather);
    this.backGroundBeach = false;
    this.backGroundMap = false;
    this.backGroundWeather = false;
    this.backGroundBeachExtra = true;
    this.backGroundMapExtra = false;
    this.backGroundWeatherExtra = true;
  }
  transferWeather() {
    clearInterval(this.eventBackGroundBeach);
    clearInterval(this.eventBackGroundMap);
    clearInterval(this.eventBackGroundWeather);
    this.backGroundBeach = false;
    this.backGroundMap = false;
    this.backGroundWeather = false;
    this.backGroundBeachExtra = false;
    this.backGroundMapExtra = true;
    this.backGroundWeatherExtra = true;
  }
}
