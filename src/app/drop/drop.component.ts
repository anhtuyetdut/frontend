import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UntypedFormBuilder } from '@angular/forms';
import axios from 'axios';
import instance from '../axios/axios';

@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'drop.component.html',
  styleUrls: ['drop.component.css']
})
export class CdkDragDropConnectedSortingGroupExample {
  constructor(public router: Router, private d: DataService) {}
  index: any;
  inde = 0;
  option = 0;
  locations = this.d.tong;
  todo = this.d.diadiem;
  thoigian = this.d.thoigian[this.option][this.inde];
  thien: any = [];
  add: boolean = false;
  hih: boolean = false;
  siderbar: boolean = false;
  list: boolean = false;
  place: boolean = false;
  trip = this.d.itinerary;
  color: boolean = false;
  color0: boolean = false;
  color1: boolean = false;
  color2: boolean = false;
  editt: boolean = true;
  mapp: boolean = true;
  dataFromParent: any;
  diem = 1;
  tam: any = [];
  mot: any;
  hai: any;
  bandau: any;
  bandau1: any;
  vuong = this.d.tong;
  types = [1, 2, 3, 4, 5];
  data: any = [];
  inn = 0;
  loading = true;
  colo1: boolean = true;
  colo2: boolean = false;
  colo3: boolean = false;
  drop(event: CdkDragDrop<any>) {
    console.log(this.thoigian);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.vuong[this.option][this.inde] = event.container.data;
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    if (event.container.data.length > event.previousContainer.data.length) {
      this.vuong[this.option][this.inde] = event.previousContainer.data;
    } else if (event.container.data.length < event.previousContainer.data.length) {
      this.vuong[this.option][this.inde] = event.container.data;
    }
    // console.log(this.d.itinerary.routes[this.inde].route.length)
    // console.log(event.previousContainer.data.length)
    // console.log(event.previousContainer.data,)
    console.log(this.vuong);

    if (event.container.data.length > this.thoigian.length) {
      this.thoigian.push({
        timeS: '03:00',
        timeE: '05:00'
      });
      for (let i = event.currentIndex; i < this.thoigian.length; i++) {
        if (event.currentIndex == 0) {
          for (let i = 1; i < this.thoigian.length; i++) {
            this.thoigian[0].timeS = '07:00';
            this.thoigian[0].timeE = '07:00';
            this.thoigian[i].timeS = this.thoigian[i - 1].timeE;
            const time = '01:30';
            const [hour, minute] = time.split(':');
            const [hourr, minutee] = this.thoigian[i].timeS.split(':');
            const time1 = new Date();
            time1.setHours(parseInt(hour));
            time1.setMinutes(parseInt(minute));
            const time2 = new Date();
            time2.setHours(parseInt(hourr));
            time2.setMinutes(parseInt(minutee));

            const hours = time2.getHours() + time1.getHours();
            const minutes = time2.getMinutes() + time1.getMinutes();

            const result = new Date();
            result.setHours(hours);
            result.setMinutes(minutes);
            this.thoigian[i].timeE =
              result.getHours().toLocaleString() + ':' + result.getMinutes().toLocaleString().padStart(2, '0');
            console.log(this.thoigian);
          }
        } else if (event.currentIndex != 0) {
          this.thoigian[i].timeS = this.thoigian[i - 1].timeE;
          const time = '01:30';
          const [hour, minute] = time.split(':');
          const [hourr, minutee] = this.thoigian[i].timeS.split(':');
          const time1 = new Date();
          time1.setHours(parseInt(hour));
          time1.setMinutes(parseInt(minute));
          const time2 = new Date();
          time2.setHours(parseInt(hourr));
          time2.setMinutes(parseInt(minutee));

          const hours = time2.getHours() + time1.getHours();
          const minutes = time2.getMinutes() + time1.getMinutes();

          const result = new Date();
          result.setHours(hours);
          result.setMinutes(minutes);
          this.thoigian[i].timeE =
            result.getHours().toLocaleString() + ':' + result.getMinutes().toLocaleString().padStart(2, '0');
          console.log(this.thoigian);
        }
      }
    }
  }
  ngOnInit() {
    for (let i = 0; i < this.locations[0].length - 1; i++) {
      // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
      this.thien.push('Day' + ' ' + (i + 2));
    }
    this.d.extraitinerary = this.d.itinerary.routes;
    console.log(this.d.extraitinerary);
    console.log(this.d.tong[0][0].lat);
    console.log(this.d.tong[0][0].lng);
    console.log(this.d.tong);
    console.log(this.d.itinerary);
    this.bandau = this.d.tong;
    this.bandau1 = this.d.diadiem;
    console.log(this.bandau);
    console.log(this.bandau1);
    console.log(this.todo[0].type[0]);
  }
  location = this.locations[this.option][this.inde];

  back() {
    this.router.navigateByUrl('/search');
  }
  choice(value: any) {
    this.option = value;
    this.location = this.locations[this.option][this.inde];
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
  thi(i: any) {
    document.querySelector('.add')?.classList.remove('add');
    document.querySelectorAll('.itinerary-search_input_day_detail')[i].classList.add('add');
    this.inde = i;
    console.log(this.inde);
    this.location = this.locations[this.option][this.inde];
    console.log(this.location);
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
    this.color2 = true;
    this.color1 = false;
    this.color = false;
    this.mapp = true;
    this.place = true;
    this.editt = false;
    this.router.navigateByUrl('/edit');
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
  update() {
    this.d.vitri[this.option][this.inde] = [];
    this.tam = [];
    console.log(this.d.tong.length);
    this.mot = this.d.tong[this.option][this.inde][0].lat;
    this.hai = this.d.tong[this.option][this.inde][0].lng;
    this.loading = false;
    for (let i = 0; i < this.d.tong[this.option].length; i++) {
      this.tam.push([]);
      this.tam[i].push({
        latitude: this.mot,
        longitude: this.hai
      });
    }

    for (let i = 0; i < this.tam.length; i++) {
      for (let j = 1; j < this.d.tong[this.option][i].length - 1; j++) {
        this.tam[i].push({
          _id: this.vuong[this.option][i][j].id
        });
        console.log(this.tam);
        console.log(this.vuong);
      }
      this.tam[i].push({
        latitude: this.mot,
        longitude: this.hai
      });
    }

    instance
      .patch(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${this.d.index}?checked=true`,
        {
          routes: this.tam
        }
      )
      .then((response) => {
        console.log(response.data.data.routes[this.inde].route.length);

        this.loading = true;
        // console.log(this.d.extraitinerary)
        // console.log(response.data.data.routes[this.inde].route.length);
        // console.log(response.data.data.routes[this.inde]);

        for (let i = 0; i < response.data.data.routes[this.inde].route.length; i++) {
          console.log(this.d.vitri);

          this.d.vitri[this.option][this.inde].push({
            lat: response.data.data.routes[this.inde].route[i].description.latitude,
            lng: response.data.data.routes[this.inde].route[i].description.longitude
          });
          console.log(this.d.vitri);
        }
        this.router.navigateByUrl('/itinerary');
        this.d.location.options[this.option].routes = response.data.data.routes;
        console.log(this.d.vitri);
      })
      .catch((error) => {
        if (confirm(`${error.response.data.message} Do you want to continue updating?`) == true) {
          instance
            .patch(
              `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${this.d.index}?checked=false`,
              {
                routes: this.tam
              }
            )
            .then((response) => {
              this.loading = false;
              console.log(this.d.extraitinerary);
              for (let i = 0; i < response.data.routes[this.inde].route.length; i++) {
                this.d.vitri[this.option][this.inde].push({
                  lat: response.data.routes[this.inde].route[i].description.latitude,
                  lng: response.data.routes[this.inde].route[i].description.longitude
                });
              }
              this.router.navigateByUrl('/itinerary');
              this.d.location.options[this.option].routes = response.data.data.routes;
              console.log(this.d.vitri);
              console.log();
            });
        } else {
          this.loading = true;
        }
        console.log(error.response.data);
      });
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
          }
        }
        console.log(this.d.diadiem);
        this.todo = this.d.diadiem;
      })

      .catch(function (error) {});
  }
  reset() {
    this.d.extraitinerary = [];
    this.d.diadiem = [];
    this.d.tong = [];
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
              time: response.data.listLocations[i].stayTime,
              type: response.data.listLocations[i].types
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
        this.todo = this.d.diadiem;
      })

      .catch(function (error) {});

    if (!this.d.itinerary.options[0].length) {
      for (let j = 0; j < this.d.itinerary.options.length; j++) {
        this.d.tong.push([]);
      }

      for (let k = 0; k < this.d.vitri.length; k++) {
        for (let t = 0; t < this.d.itinerary.options[k].routes.length; t++) {
          this.d.tong[k].push([]);
        }
      }
      for (let k = 0; k < this.d.vitri.length; k++) {
        for (let x = 0; x < this.d.vitri[k].length; x++)
          for (let j = 0; j < this.d.itinerary.options[k].routes[x].route.length; j++) {
            this.d.tong[k][x].push({
              name: this.d.itinerary.options[k].routes[x].route[j].description.name,
              img: this.d.itinerary.options[k].routes[x].route[j].description.photos,
              address: this.d.itinerary.options[k].routes[x].route[j].description.address,
              timeS: this.d.itinerary.options[k].routes[x].route[j].travelTime.arrival,
              timeE: this.d.itinerary.options[k].routes[x].route[j].travelTime.departure,
              id: this.d.itinerary.options[k].routes[x].route[j].description._id,
              lat: this.d.itinerary.options[k].routes[x].route[j].description.latitude,
              lng: this.d.itinerary.options[k].routes[x].route[j].description.longitude
            });
          }
        this.locations = this.d.tong;
        this.location = this.locations[this.option][this.inde];
      }
    } else if (this.d.itinerary.options[0].length) {
      console.log('quần');

      for (let j = 0; j < this.d.itinerary.options.length; j++) {
        this.d.tong.push([]);
      }

      for (let k = 0; k < this.d.vitri.length; k++) {
        for (let t = 0; t < this.d.itinerary.options[k].routes.length; t++) {
          this.d.tong[k].push([]);
        }
      }
      for (let k = 0; k < this.d.vitri.length; k++) {
        for (let x = 0; x < this.d.vitri[k].length; x++)
          for (let j = 0; j < this.d.itinerary.options[k].routes[x].route.length; j++) {
            this.d.tong[k][x].push({
              name: this.d.itinerary.options[k].routes[x].route[j].description.name,
              img: this.d.itinerary.options[k].routes[x].route[j].description.photos,
              address: this.d.itinerary.options[k].routes[x].route[j].description.address,
              timeS: this.d.itinerary.options[k].routes[x].route[j].travelTime.arrival,
              timeE: this.d.itinerary.options[k].routes[x].route[j].travelTime.departure,
              id: this.d.itinerary.options[k].routes[x].route[j].description._id,
              lat: this.d.itinerary.options[k].routes[x].route[j].description.latitude,
              lng: this.d.itinerary.options[k].routes[x].route[j].description.longitude
            });
          }
        this.locations = this.d.tong;
        this.location = this.locations[this.option][this.inde];
      }
    }
  }
  generate() {
    this.loading = false;
    this.tam = [];
    console.log(this.d.tong.length);
    this.mot = this.d.tong[this.option][this.inde][0].lat;
    this.hai = this.d.tong[this.option][this.inde][0].lng;
    console.log(this.mot);
    console.log(this.hai);

    for (let i = 0; i < this.d.tong[this.option].length; i++) {
      this.tam.push([]);

      this.tam[i].push({
        latitude: this.mot,
        longitude: this.hai
      });
    }
    console.log(this.tam);
    console.log(this.vuong);

    for (let i = 0; i < this.tam.length; i++) {
      console.log('ihiihihih');

      for (let j = 1; j < this.d.tong[this.option][i].length - 1; j++) {
        console.log('eeeee');

        this.tam[i].push({
          _id: this.vuong[this.option][i][j].id
        });
        console.log(this.tam);
        console.log(this.vuong);
      }
      this.tam[i].push({
        latitude: this.mot,
        longitude: this.hai
      });
    }

    instance
      .post(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${this.d.index}/arrange`, {
        routes: this.tam
      })
      .then((response) => {
        this.loading = true;
        this.d.extraitinerary = [];
        this.d.diadiem = [];
        this.d.tong[this.option][this.inde] = [];
        this.d.thoigian[this.option][this.inde] = [];
        this.d.vitri[this.option][this.inde] = [];
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
            this.todo = this.d.diadiem;
          })

          .catch(function (error) {});

        console.log(response.data.data);
        // for (let j = 0; j < this.d.itinerary.routes.length; j++)
        //     {
        //       this.d.tong.push([])
        //     }
        console.log(response.data.data.routes[0].route.length);
        console.log(response.data.data.routes);

        for (let j = 0; j < response.data.data.routes[this.inde].route.length; j++) {
          this.d.tong[this.option][this.inde].push({
            name: response.data.data.routes[this.inde].route[j].description.name,
            img: response.data.data.routes[this.inde].route[j].description.photos,
            address: response.data.data.routes[this.inde].route[j].description.address,
            // timeS:response.data.data.routes[this.inde].route[j].travelTime.arrival,
            // timeE:response.data.data.routes[this.inde].route[j].travelTime.departure,
            id: response.data.data.routes[this.inde].route[j].description._id,
            lat: response.data.data.routes[this.inde].route[j].description.latitude,
            lng: response.data.data.routes[this.inde].route[j].description.longitude
          });

          this.d.vitri[this.option][this.inde].push({
            lat: response.data.data.routes[this.inde].route[j].description.latitude,
            lng: response.data.data.routes[this.inde].route[j].description.longitude
          });
          this.locations = this.d.tong;
          this.location = this.locations[this.option][this.inde];

          this.d.thoigian[this.option][this.inde].push({
            timeS: response.data.data.routes[this.inde].route[j].travelTime.arrival,
            timeE: response.data.data.routes[this.inde].route[j].travelTime.departure
          });
        }
        this.locations = this.d.tong;
        this.d.location.options[this.option].routes = response.data.data.routes;
        this.location = this.locations[this.option][this.inde];
        console.log(this.locations);
        console.log(this.d.thoigian);
        console.log(this.d.tong);
        console.log(this.d.location);
        console.log(this.d.location.options[this.option].routes);

        console.log(this.d.vitri);
        this.thoigian = this.d.thoigian[this.option][this.inde];
      })
      .catch(function (error) {
        console.log(error);
      });
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
  sau() {
    this.d.diadiem = [];
    if (!this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] + 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
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
          this.todo = this.d.diadiem;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }

    if (this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
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
          this.todo = this.d.diadiem;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
  }
  truoc() {
    this.d.diadiem = [];
    if (!this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] - 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
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
          this.todo = this.d.diadiem;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
    if (this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?&page=${this.diem}&take=20`)
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
          this.todo = this.d.diadiem;
        })

        .catch(function (error) {});
      console.log(this.d.tong);
      console.log(this.d.mang);
    }
  }
  search(value: any) {
    this.d.diadiem = [];
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.keyword}&page=1&take=16`
      )
      .then((response) => {
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
        this.todo = this.d.diadiem;
      })

      .catch(function (error) {});
    console.log(this.d.tong);
    console.log(this.d.mang);
  }
  // change(value: any) {
  //   this.d.diadiem=[]
  //   instance
  //     .get(
  //       http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.target.value}&page=1&take=16`
  //     )
  //     .then((response) => {
  //       for (let i = 0; i < response.data.listLocations.length; i++) {
  //         if(response.data.listLocations[i].photos)
  //         {
  //           this.d.diadiem.push(
  //             {
  //               name:response.data.listLocations[i].name,
  //               img:response.data.listLocations[i].photos[0].photo_reference,
  //               address:response.data.listLocations[i].formatted_address,
  //               id:response.data.listLocations[i]._id,
  //               lat:response.data.listLocations[i].latitude,
  //               lng:response.data.listLocations[i].longitude
  //             }
  //           )
  //         }
  //         else if(response.data.listLocations[i].photos===null)
  //         {
  //           this.d.diadiem.push(
  //             {
  //               name:response.data.listLocations[i].name,
  //               img:'',
  //               address:response.data.listLocations[i].formatted_address

  //             }
  //           )
  //           console.log('thiệnthien');
  //         }

  //       }
  //       console.log(this.d.diadiem)
  //       this.todo=this.d.diadiem
  //     })

  //     .catch(function (error) {
  //     });
  //     console.log(this.d.tong);
  //     console.log(this.d.mang);
  // }
}
