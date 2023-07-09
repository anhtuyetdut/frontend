import { Component } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class Create {
  title = 'weather';
  index = 0;
  thien: any = [];
  ngay: any;
  constructor(public router: Router, private d: DataService) {}
  locations: any;
  location: any;
  infor: any;
  place: boolean = false;
  dateObjend: any;
  yearend: any;
  monthend: any;
  dayend: any;
  formattedDatend: any;
  dateObjstart: any;
  yearstart: any;
  monthstart: any;
  daystart: any;
  formattedDatstart: any;
  cost: any;
  duration: any;
  loading = false;
  ngOnInit() {
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${this.d.minh}`)
      .then((response) => {
        this.loading = true;
        console.log(response);
        this.locations = response.data.data.routes;
        this.location = this.locations[this.index].route;
        this.infor = response.data.data;
        this.duration = this.locations.length;

        this.dateObjstart = new Date(this.infor.startDate);
        this.yearstart = this.dateObjstart.getFullYear();
        this.monthstart = this.dateObjstart.getMonth() + 1;
        this.daystart = this.dateObjstart.getDate();
        this.formattedDatstart = `${this.daystart}-${this.monthstart}-${this.yearstart}`;

        this.dateObjend = new Date(this.infor.endDate);
        this.yearend = this.dateObjend.getFullYear();
        this.monthend = this.dateObjend.getMonth() + 1;
        this.dayend = this.dateObjend.getDate();
        this.formattedDatend = `${this.dayend}-${this.monthend}-${this.yearend}`;

        this.ngay = response.data.data.routes.length;

        this.cost = this.infor.cost.toLocaleString('vi-VN');

        for (let i = 0; i < this.ngay - 1; i++) {
          // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
          this.thien.push('Day' + ' ' + (i + 2));
          console.log('thien');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.thien);
    console.log(this.d.minh);
  }
  thi(i: any) {
    document.querySelector('.add')?.classList.remove('add');
    document.querySelectorAll('.itinerary-search_input_day_detail')[i].classList.add('add');
    this.index = i;
    console.log(this.index);
    this.location = this.locations[this.index].route;
  }
  map() {
    this.d.vitri = [];
    this.router.navigateByUrl('/map/detail');
    for (let j = 0; j < this.ngay; j++) {
      this.d.vitri.push([]);
    }
    console.log(this.d.vitri);

    for (let i = 0; i < this.ngay; i++) {
      for (let j = 0; j < this.locations[i].route.length; j++) {
        console.log('thien');

        this.d.vitri[i].push({
          lat: this.locations[i].route[j].description.latitude,
          lng: this.locations[i].route[j].description.longitude
        });
      }
    }
    console.log(this.d.vitri);
  }
}
