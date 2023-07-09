import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from 'ng-apexcharts';
import instance from 'src/app/axios/axios';
import { DataService } from 'src/app/data.service';
export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any | any;
  title: any;
  labels: any;
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: any;
  tooltip: any;
  toolbar: any;
};

@Component({
  selector: 'chartcolum',
  templateUrl: './chartcolum.component.html',
  styleUrls: ['./chartcolum.component.css']
})
export class Chartcolum implements OnInit {
  title = 'chartcolum';
  bien: number[] = [];
  bien1: string[] = [];
  today = new Date();
  start: any;
  end: any;

  year = this.today.getFullYear();
  month = ('0' + (this.today.getMonth() + 1)).slice(-2);
  day = ('0' + this.today.getDate()).slice(-2);
  currentDate = this.year + '-' + this.month + '-' + this.day;
  star(value: any) {
    this.currentDate = value;
    this.start = Math.round(Date.parse(value) / 1000);
  }
  endd(value: any) {
    this.currentDate = value;
    this.end = Math.round(Date.parse(value) / 1000);
  }

  @ViewChild('chart')
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(private d: DataService, public router: Router) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line',
        toolbar: { show: false }
      },
      title: {
        text: 'LOCATION'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      xaxis: {
        type: 'datetime'
      }
    };
  }

  ngOnInit() {
    const bien: number[] = [];
    const bien1: string[] = [];
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/dashboard?startDate=1686817421000&endDate=1688199821000&name=locations`
      )
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          bien.push(response.data.data[i].count);
          bien1.push(response.data.data[i].timeline);
        }
        console.log(this.bien1);

        this.chartOptions.series = [{ data: bien }];
        this.chartOptions.xaxis = { categories: bien1 };
      })
      .catch((error) => {});
  }
}
