import { Router } from '@angular/router';

import { Component, ViewChild } from '@angular/core';
import axios from 'axios';
import { DataService } from '../data.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MapsAPILoader } from '@agm/core';
import instance from '../../app/axios/axios';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class Search {
  title = 'search';
  remove: boolean = true;
  itinerary: boolean = true;
  type = ['Art', 'History', 'Cuisine', 'Relax', 'Landscape'];
  typeadd = document.querySelector('.add');
  _id: any;
  hien: boolean = false;
  an: boolean = true;
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;
  mot: any;
  hai: any;
  ma1: any;
  ma2: any;
  locations: any;
  geocoder = new google.maps.Geocoder();
  point: any = [];
  minmoney = 1000000;
  maxmoney = 3000000;
  todo = this.d.diadiem;
  people = 1;
  types = 0;
  end: any;
  loading = true;
  yourlocation = 'Your Destination';
  typess = [1, 2, 3, 4, 5];
  diem = 1;
  inn = 0;
  add = '';
  constructor(private d: DataService, public router: Router, private mapsAPILoader: MapsAPILoader) {}
  ngOnInit() {
    this.mot = this.d.lat;
    this.hai = this.d.lng;
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=1&take=20`)
      .then((response) => {
        this.locations = response.data.listLocations;
      })

      .catch(function (error) {});
  }

  background() {
    this.remove = true;
    this.itinerary = true;
  }
  search(start: any, end: any) {
    console.log(start, end);
    this.itinerary = false;
    this.d.extraitinerary = [];
    this.d.diadiem = [];
    this.loading = false;
    instance
      .post(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes`, {
        latitude: 16.074046897306328,
        longitude: 108.14985990933138,
        startDate: start,
        endDate: end,
        type: this.types,
        points: this.point,
        minCost: this.minmoney,
        maxCost: this.maxmoney,
        people: this.people
      })
      .then((response) => {
        this.d.tong = [];
        this.d.thoigian = [];
        this.d.vitri = [];
        this.router.navigateByUrl('/itinerary');
        this.d.index = response.data.data._id;
        this.d.itinerary = response.data.data;
        this.d.location = this.d.itinerary;
        console.log(response.data.data.options[0].routes.length);
        this.loading = true;

        for (let j = 0; j < response.data.data.options.length; j++) {
          this.d.tong.push([]);
          this.d.thoigian.push([]);
          this.d.vitri.push([]);
        }
        for (let k = 0; k < this.d.vitri.length; k++) {
          for (let t = 0; t < response.data.data.options[k].routes.length; t++) {
            this.d.tong[k].push([]);
            this.d.thoigian[k].push([]);
            this.d.vitri[k].push([]);
          }
          console.log(this.d.vitri[k].length);
          console.log(this.d.vitri);
        }

        for (let k = 0; k < this.d.vitri.length; k++) {
          for (let x = 0; x < this.d.vitri[k].length; x++)
            for (let j = 0; j < response.data.data.options[k].routes[x].route.length; j++) {
              this.d.tong[k][x].push({
                name: response.data.data.options[k].routes[x].route[j].description.name,
                img: response.data.data.options[k].routes[x].route[j].description.photos,
                address: response.data.data.options[k].routes[x].route[j].description.address,
                timeS: response.data.data.options[k].routes[x].route[j].travelTime.arrival,
                timeE: response.data.data.options[k].routes[x].route[j].travelTime.departure,
                id: response.data.data.options[k].routes[x].route[j].description._id,
                lat: response.data.data.options[k].routes[x].route[j].description.latitude,
                lng: response.data.data.options[k].routes[x].route[j].description.longitude
              });
              this.d.thoigian[k][x].push({
                timeS: response.data.data.options[k].routes[x].route[j].travelTime.arrival,
                timeE: response.data.data.options[k].routes[x].route[j].travelTime.departure
              });
              this.d.vitri[k][x].push({
                lat: response.data.data.options[k].routes[x].route[j].description.latitude,
                lng: response.data.data.options[k].routes[x].route[j].description.longitude
              });
            }
        }
        console.log(response.data.data.options.length);
        console.log(response.data.data.options[0].routes[0].route.length);
        console.log(this.d.thoigian);
        console.log(this.d.vitri);
        console.log(this.d.tong);

        for (let i = 0; i < response.data.data.options.length; i++) {
          for (let j = 0; j < response.data.data.options[i].routes[0].route.length; j++) {
            // this.d.tong[i].push
            // (
            //   {
            //     name:response.data.data.routes[i].route[j].description.name,
            //     img:response.data.data.routes[i].route[j].description.photos,
            //     address:response.data.data.routes[i].route[j].description.address,
            //     timeS:response.data.data.routes[i].route[j].travelTime.arrival,
            //     timeE:response.data.data.routes[i].route[j].travelTime.departure,
            //     id:response.data.data.routes[i].route[j].description._id,
            //     lat:response.data.data.routes[i].route[j].description.latitude,
            //     lng:response.data.data.routes[i].route[j].description.longitude
            //   }
            // )
            // this.d.thoigian[i].push
            // (
            //   {
            //     timeS:response.data.data.routes[i].route[j].travelTime.arrival,
            //     timeE:response.data.data.routes[i].route[j].travelTime.departure
            //   }
            // )
            // this.d.vitri[i].push
            // (
            //   {
            //     lat:response.data.data.options[i].routes[0].route[j].description.latitude,
            //     lng:response.data.data.options[i].routes[0].route[j].description.longitude,
            //   }
            // )
          }
        }
        // this.locations=response.data.listLocations
      })
      .catch(function (error) {});
    console.log(this.d.vitri);

    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=1&take=20`)
      .then((response) => {
        console.log(response.data);

        for (let i = 0; i < response.data.listLocations.length; i++) {
          if (response.data.listLocations[i].photos) {
            this.d.diadiem.push({
              name: response.data.listLocations[i].name,
              img: response.data.listLocations[i].photos[0].photo_reference,
              address: response.data.listLocations[i].formatted_address,
              id: response.data.listLocations[i]._id,
              lat: response.data.listLocations[i].latitude,
              lng: response.data.listLocations[i].longitude,
              time: response.data.listLocations[i].stayTime
            });
          } else if (response.data.listLocations[i].photos === null) {
            this.d.diadiem.push({
              name: response.data.listLocations[i].name,
              img: '',
              address: response.data.listLocations[i].formatted_address,
              id: response.data.listLocations[i]._id,
              lat: response.data.listLocations[i].latitude,
              lng: response.data.listLocations[i].longitude,
              time: response.data.listLocations[i].stayTime,
              type: response.data.listLocations[i].types
            });
            console.log('thiệnthien');
          }
        }
        console.log(this.d.diadiem);
      })

      .catch(function (error) {});
    console.log(this.d.tong);
    console.log(this.d.mang);
    console.log(this.d.vitri);
  }
  thien(i: any) {
    this.types = i;
    if (document.querySelectorAll('.search-input_header_button')[i].classList.contains('add')) {
      document.querySelectorAll('.search-input_header_button')[i].classList.remove('add');
      document.querySelectorAll('.fa-circle-xmark')[i].classList.remove('delete');
    } else {
      document.querySelector('.add')?.classList.remove('add');
      document.querySelector('.delete')?.classList.remove('delete');
      document.querySelectorAll('.search-input_header_button')[i].classList.add('add');
      document.querySelectorAll('.fa-circle-xmark')[i].classList.add('delete');
    }
  }
  changepossition(value: any) {
    console.log(value);
    if (value == '1') {
      // Lấy vị trí hiện tại của người dùng
      this.mot = this.d.lat;
      this.hai = this.d.lng;
    }
    if (value == '2') {
      this.hien = true;
      this.an = false;
    }
  }

  changemoney(value: any) {
    console.log(value);
    if (value == '1') {
      this.minmoney = 1000000;
      this.maxmoney = 3000000;
    }
    if (value == '2') {
      this.minmoney = 3000000;
      this.maxmoney = 5000000;
    }
    if (value == '3') {
      this.minmoney = 5000000;
      this.maxmoney = 10000000;
    }
    if (value == '4') {
      this.minmoney = 10000000;
      this.maxmoney = 15000000;
    }
  }

  changepeople(value: any) {
    console.log(value);
    if (value == '1') {
      this.people = 1;
    }
    if (value == '2') {
      this.people = 2;
    }
    if (value == '3') {
      this.people = 3;
    }
    if (value == '4') {
      this.people = 4;
    }
    if (value == '5') {
      this.people = 5;
    }
  }

  delete(i: any) {
    document.querySelectorAll('.search-input_header_button')[i].classList.remove('.add');
    document.querySelectorAll('.fa-circle-xmark')[i].classList.remove('.delete');
  }

  addpossition(value: any) {
    this.yourlocation = '';
    if (value == '0') {
      this.remove = true;
      this.point = [];
    }
    if (value == '1') {
      this.remove = false;
    }
  }

  // thien(i:any)
  // {
  //   document.querySelector('.add')?.classList.remove('add')
  //   document.querySelector('.delete')?.classList.remove('delete');
  //     document.querySelectorAll('.search-input_header_button')[i].classList.add('add');
  //     document.querySelectorAll('.fa-circle-xmark')[i].classList.add('delete');

  // }
  // delete(i:any)
  // {
  //   document.querySelector('.add')?.classList.remove('add')
  //   document.querySelector('.delete')?.classList.remove('delete');
  // }

  today = new Date();

  year = this.today.getFullYear();
  month = ('0' + (this.today.getMonth() + 1)).slice(-2);
  day = ('0' + this.today.getDate()).slice(-2);
  currentDate = this.year + '-' + this.month + '-' + this.day;

  options = {
    componentRestrictions: { country: ['AU'] },
    fields: ['address_component', 'place_id']
  };

  @ViewChild('placesRef')
  placesRef!: GooglePlaceDirective;

  public handleAddressChange(address: any) {
    this.ma1 = address.geometry.location.lat();
    this.ma2 = address.geometry.location.lng();
    this.mot = this.ma1;
    this.hai = this.ma2;
    console.log('lat: ' + this.ma1 + ', long: ' + this.ma2);
    console.log(this.mot);
    console.log(this.hai);
  }
  ngAfterViewInit() {
    this.placesRef.options.componentRestrictions = { country: 'VN' };
    // this.placesRef.options.administrativeArea= 'Đà Nẵng'}
    this.placesRef.options.fields = ['formatted_address', 'geometry', 'place_id'];
  }
  choice() {
    this.remove = false;
  }
  check(value: any, name: any) {
    console.log(value);
    if (!this.point.includes(value)) {
      this.point.push(value);
      this.yourlocation = this.yourlocation + ' ' + name;
    } else if (this.point.includes(value)) {
      console.log('thien');
      let index = this.point.indexOf(value);
      if (index > -1) {
        this.point.splice(index, 1);
      }
    }
    console.log(this.point);
  }

  // lat: number = 0;
  // lng: number = 0;
  // zoom: number = 15;

  // onMapCenterChange(event:any) {
  //   // Lưu vị trí hiện tại của bản đồ
  //   this.lat = event.lat;
  //   this.lng = event.lng;

  //   // Lấy vị trí hiện tại của người dùng
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         console.log(position.coords.latitude, position.coords.longitude);
  //       });
  //   }
  // }
  star(value: any) {
    this.currentDate = value;
  }
  navigation(typ: any, i: any) {
    this.d.diadiem = [];
    document.querySelector('.choice')?.classList.remove('choice');
    document.querySelectorAll('.total-navigation_button')[i].classList.add('choice');
    this.diem = typ;
    this.inn = i;

    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
      .then((response) => {
        this.locations = response.data.listLocations;
      })

      .catch(function (error) {});
    console.log(this.d.tong);
    console.log(this.d.mang);
  }

  sau() {
    this.d.diadiem = [];
    if (this.typess.includes(15)) {
      for (let i = 0; i < this.typess.length; i++) {
        this.typess[i] = this.typess[i];
      }
      this.diem = this.typess[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
        .then((response) => {
          this.locations = response.data.listLocations;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
    if (!this.typess.includes(15)) {
      for (let i = 0; i < this.typess.length; i++) {
        this.typess[i] = this.typess[i] + 1;
      }
      this.diem = this.typess[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
        .then((response) => {
          this.locations = response.data.listLocations;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
  }
  truoc() {
    this.d.diadiem = [];
    if (this.typess.includes(1)) {
      for (let i = 0; i < this.typess.length; i++) {
        this.typess[i] = this.typess[i];
      }
      this.diem = this.typess[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
        .then((response) => {
          console.log(response.data);
          this.locations = response.data.listLocations;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
    if (!this.typess.includes(1)) {
      for (let i = 0; i < this.typess.length; i++) {
        this.typess[i] = this.typess[i] - 1;
      }
      this.diem = this.typess[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
        .then((response) => {
          console.log(response.data);
          this.locations = response.data.listLocations;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
  }
  search1(value: any) {
    this.d.diadiem = [];
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.keyword}&page=1&take=16`
      )
      .then((response) => {
        this.locations = response.data.listLocations;
      })

      .catch(function (error) {});
    console.log(this.d.tong);
    console.log(this.d.mang);
  }
}
