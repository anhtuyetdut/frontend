import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class Itinerary {
  title = 'weather';
  thien: any = [];
  thienn: any = [];
  add: boolean = false;
  hih: boolean = false;
  zoom: boolean = false;
  siderbar: boolean = false;
  list: boolean = false;
  place: boolean = false;
  index = 0;
  trip = this.d.itinerary;
  color: boolean = false;
  color0: boolean = false;
  color1: boolean = false;
  color2: boolean = false;
  colo1: boolean = true;
  colo2: boolean = false;
  colo3: boolean = false;
  editt: boolean = true;
  mapp: boolean = true;
  dataFromParent: any;
  data: any = [];
  option = 0;

  constructor(public router: Router, private d: DataService) {}
  locations = this.d.location.options[this.option].routes;
  location = this.locations[this.index];
  priority = this.d.location.options[this.option].priority;

  ngOnInit() {
    for (let j = 0; j < this.locations[0].route.length; j++) {
      if (!this.locations[0].route[j].description.rating) {
        this.locations[0].route[j].description.rating = 5;
      }
      this.thienn.push(100 - (this.locations[0].route[j].description.rating / 5) * 100 + 30);
      console.log(this.thienn);
      console.log(this.locations);
    }

    for (let i = 0; i < this.locations.length - 1; i++) {
      this.thien.push('Day' + ' ' + (i + 2));
      console.log(this.locations[i].route.length);

      for (let j = 0; j < this.locations[i].route.length; j++) {
        this.thienn.push(100 - (this.locations[i].route[j].description.rating / 5) * 100);
        console.log(this.thienn);
      }
    }
    if (this.d.extraitinerary[0]) {
      this.locations = this.d.extraitinerary;
      this.location = this.locations[this.index];
      console.log('duk');
      console.log(this.d.extraitinerary[0]);
      this.d.itinerary.routes = this.d.extraitinerary;
    } else if (!this.d.extraitinerary[0]) {
      this.locations = this.d.itinerary.routes;
      this.location = this.locations[this.index];
      console.log(this.locations);
      console.log('duke');
    }
  }

  detailLocation = {
    img: '',
    imgextras: [],
    name: '',
    des: '',
    sTime: '',
    eTime: '',
    rating: '',
    price: ''
  };

  choice(value: any) {
    this.option = value;
    this.locations = this.d.location.options[this.option].routes;
    this.location = this.locations[this.index];
    this.priority = this.d.location.options[this.option].priority;
    if (value == 0) {
      this.colo1 = true;
      this.colo2 = false;
      this.colo3 = false;
    } else if (value == 1) {
      this.colo1 = false;
      this.colo2 = true;
      this.colo3 = false;
    } else if (value == 2) {
      this.colo1 = false;
      this.colo2 = false;
      this.colo3 = true;
    }
  }

  detail(location: any) {
    this.detailLocation = location;
    this.add = true;
    this.zoom = true;
    this.hih = false;
  }
  hihi() {
    this.hih = true;
    this.add = false;
    this.zoom = true;
  }
  map() {
    this.mapp = false;
    this.place = true;
    this.editt = true;
    this.color = true;
    this.color0 = false;
    this.color1 = false;
    this.color2 = false;
    this.router.navigateByUrl('/map');
  }
  edit() {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      this.color2 = true;
      this.color1 = false;
      this.color = false;
      this.mapp = true;
      this.place = true;
      this.editt = false;
      this.router.navigateByUrl('/edit');
    }
  }
  unmap() {
    this.color0 = true;
    this.color = false;
    this.color1 = false;
    this.color2 = false;
    this.mapp = true;
    this.place = false;
    this.editt = true;
    this.router.navigateByUrl('/itinerary');
  }
  trash(position: any) {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      confirm('Do you want delete this?');
      {
        this.locations.splice(position, 1);
      }
    }
  }
  addd() {
    this.siderbar = true;
    this.list = true;
  }
  thi(i: any) {
    document.querySelector('.add')?.classList.remove('add');
    document.querySelectorAll('.itinerary-search_input_day_detail')[i].classList.add('add');
    this.index = i;
    this.locations = this.d.location.options[this.option].routes;
    console.log(this.index);
    this.location = this.locations[this.index];
  }
  back() {
    this.router.navigateByUrl('/search');
  }
  downloadPDF() {
    const doc = new (<any>jsPDF)();
    console.log(this.d.tong);
    // tạo bảng mới
    const headers = [['Name', 'Time Start', 'Time End', 'Address']];
    for (let i = 0; i < this.d.tong.length; i++) {
      for (let j = 1; j < this.d.tong[i].length; j++) {
        this.data.push([
          `${this.d.tong[i][j].name.toString()}`,
          this.d.tong[i][j].timeS,
          this.d.tong[i][j].timeE,
          'Hai Chau, Da Nang'
        ]);
        // [
        //   'thien',
        //   'thien',
        //   'thien',
        //   'thien'
        // ]
      }
    }
    doc.autoTable({
      head: headers,
      body: this.data,
      startY: 20
    });
    doc.setFont('arial');
    doc.setFontSize(12);

    // thêm văn bản khác nếu cần
    doc.text('This is your itinerary', 10, 10);

    // lưu tài liệu PDF
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    window.open(url);
  }
}
