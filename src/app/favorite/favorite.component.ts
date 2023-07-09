import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class Favorite {
  title = 'favorite';
  add: any;
  locations: any;
  lovelocation: any;
  thinh: any = [];
  color1: boolean = true;
  color2: boolean = false;
  color3: boolean = false;
  itinerary: boolean = false;
  location: boolean = false;
  thien: any = [];
  diem = 1;
  diem1 = 1;
  inn: any;
  types = [1, 2, 3, 4, 5];
  types1 = [1, 2, 3, 4, 5];
  thich = [' '];
  ad: any;
  adddd: any;
  bong1: boolean = false;
  bong2: boolean = false;
  loading = true;
  constructor(public router: Router, private d: DataService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
      )
      .then((response) => {
        this.locations = response.data.data.data;
        console.log(this.locations);

        for (let i = 0; i < this.locations.length; i++) {
          if (this.locations[i].locationId) {
            this.thinh.push(this.locations[i]);
          }
        }
        console.log(this.thinh);
      })
      .catch(function (error) {});

    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
      )
      .then((response) => {
        this.lovelocation = response.data.data.data;
        console.log(this.lovelocation);
        for (let i = 0; i < this.lovelocation.length; i++) {
          if (!this.lovelocation[i].rating) {
            this.lovelocation[i].rating = 5;
          }
          console.log(this.lovelocation);

          this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
        }
        console.log(this.thien);
      })
      .catch(function (error) {});
  }

  choice1() {
    this.color1 = true;
    this.color2 = false;
    this.color3 = false;
    this.itinerary = false;
    this.location = false;
    this.loading = false;
    setTimeout(() => (this.loading = true), 500);
  }
  choice2() {
    this.color2 = true;
    this.color3 = false;
    this.color1 = false;
    this.itinerary = true;
    this.location = false;
    this.loading = false;
    setTimeout(() => (this.loading = true), 500);
  }
  choice3() {
    this.color3 = true;
    this.color2 = false;
    this.color1 = false;
    this.itinerary = false;
    this.location = true;
    this.loading = false;
    setTimeout(() => (this.loading = true), 500);
  }
  srcoll() {
    if (scrollY > 180) {
      this.add = '#bd8167';
    } else if (scrollY < 180) {
      this.add = 'rgba(0, 0, 0, 0.1)';
    }
  }

  navigation(typ: any, i: any) {
    this.loading = false;
    this.d.diadiem = [];
    document.querySelector('.choice')?.classList.remove('choice');
    document.querySelectorAll('.total-navigation_button')[i].classList.add('choice');
    this.diem = typ;
    this.inn = i;

    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.data.data;
        console.log(this.locations);

        for (let i = 0; i < this.locations.length; i++) {
          if (this.locations[i].locationId) {
            this.thinh.push(this.locations[i]);
          }
        }
        console.log(this.thinh);
      })
      .catch(function (error) {});
  }

  navigation1(typ: any, i: any) {
    this.loading = false;
    this.d.diadiem = [];
    document.querySelector('.choice1')?.classList.remove('choice1');
    document.querySelectorAll('.total-navigation_button1')[i].classList.add('choice1');
    this.diem1 = typ;
    this.inn = i;

    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
      )
      .then((response) => {
        this.loading = true;
        this.lovelocation = response.data.data.data;
        for (let i = 0; i < this.lovelocation.length; i++) {
          if (!this.lovelocation[i].rating) {
            this.lovelocation[i].rating = 5;
          }
          this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
        }
      })
      .catch(function (error) {});
  }

  sau() {
    this.d.diadiem = [];
    this.loading = false;
    if (this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
        )
        .then((response) => {
          this.loading = true;
          this.locations = response.data.data.data;
          console.log(this.locations);

          for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].locationId) {
              this.thinh.push(this.locations[i]);
            }
          }
          console.log(this.thinh);
        })
        .catch(function (error) {});
    }
    if (!this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] + 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
        )
        .then((response) => {
          this.loading = true;
          this.locations = response.data.data.data;
          console.log(this.locations);

          for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].locationId) {
              this.thinh.push(this.locations[i]);
            }
          }
          console.log(this.thinh);
        })
        .catch(function (error) {});
    }
  }
  truoc() {
    this.loading = false;
    this.d.diadiem = [];
    if (this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
        )
        .then((response) => {
          this.loading = true;
          this.locations = response.data.data.data;
          console.log(this.locations);

          for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].locationId) {
              this.thinh.push(this.locations[i]);
            }
          }
          console.log(this.thinh);
        })
        .catch(function (error) {});
    }
    if (!this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] - 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
        )
        .then((response) => {
          this.loading = true;
          this.locations = response.data.data.data;
          console.log(this.locations);

          for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].locationId) {
              this.thinh.push(this.locations[i]);
            }
          }
          console.log(this.thinh);
        })
        .catch(function (error) {});
    }
  }

  sau1() {
    this.d.diadiem = [];
    this.loading = false;
    if (!this.types1.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types1[i] = this.types1[i] + 1;
      }
      this.diem1 = this.types1[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
        )
        .then((response) => {
          this.loading = true;
          this.lovelocation = response.data.data.data;
          console.log(this.lovelocation);
          for (let i = 0; i < this.lovelocation.length; i++) {
            if (!this.lovelocation[i].rating) {
              this.lovelocation[i].rating = 5;
            }
            this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
          }
          console.log(this.thien);
        })
        .catch(function (error) {});
    }
    if (this.types1.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types1[i] = this.types1[i];
      }
      this.diem1 = this.types1[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
        )
        .then((response) => {
          this.loading = true;
          this.lovelocation = response.data.data.data;
          console.log(this.lovelocation);
          for (let i = 0; i < this.lovelocation.length; i++) {
            if (!this.lovelocation[i].rating) {
              this.lovelocation[i].rating = 5;
            }
            this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
          }
          console.log(this.thien);
        })
        .catch(function (error) {});
    }
  }
  truoc1() {
    this.d.diadiem = [];
    this.loading = false;
    if (this.types1.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types1[i] = this.types1[i];
      }
      this.diem1 = this.types1[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
        )
        .then((response) => {
          this.loading = true;
          this.lovelocation = response.data.data.data;
          console.log(this.lovelocation);
          for (let i = 0; i < this.lovelocation.length; i++) {
            if (!this.lovelocation[i].rating) {
              this.lovelocation[i].rating = 5;
            }
            this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
          }
          console.log(this.thien);
        })
        .catch(function (error) {});
    }
    if (!this.types1.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types1[i] = this.types1[i] - 1;
      }
      this.diem1 = this.types1[this.inn];
      console.log(this.diem);
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
        )
        .then((response) => {
          this.loading = true;
          this.lovelocation = response.data.data.data;
          console.log(this.lovelocation);
          for (let i = 0; i < this.lovelocation.length; i++) {
            if (!this.lovelocation[i].rating) {
              this.lovelocation[i].rating = 5;
            }
            this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
          }
          console.log(this.thien);
        })
        .catch(function (error) {});
    }
  }

  unlove(i: any) {
    confirm('Do you want unlike this?');
    {
      const index = this.thich.indexOf(i);
      this.thich.splice(index, 1);
      this.adddd = {
        locationId: i
      };
      console.log(this.adddd);
      instance
        .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', { data: this.adddd })
        .then((response) => {
          instance
            .get(
              `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&page=${this.diem1}&take=12`
            )
            .then((response) => {
              this.lovelocation = response.data.data.data;
              for (let i = 0; i < this.lovelocation.length; i++) {
                if (!this.lovelocation[i].rating) {
                  this.lovelocation[i].rating = 5;
                }
                this.thien.push((100 - (this.lovelocation[i].rating / 5) * 100) / 2);
              }
            })
            .catch(function (error) {});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.bong2 = true;
  }

  unlovee(i: any) {
    confirm('Do you want unlike this?');
    {
      const index = this.thich.indexOf(i);
      this.thich.splice(index, 1);
      this.adddd = {
        itineraryId: i
      };
      console.log(this.adddd);
      instance
        .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', { data: this.adddd })
        .then((response) => {
          instance
            .get(
              `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=itinerary&page=${this.diem}&take=6`
            )
            .then((response) => {
              this.locations = response.data.data.data;
              console.log(this.locations);

              for (let i = 0; i < this.locations.length; i++) {
                if (this.locations[i].locationId) {
                  this.thinh.push(this.locations[i]);
                }
              }
              console.log(this.thinh);
            })
            .catch(function (error) {});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.bong2 = true;
  }

  detail(value: any) {
    this.d.minh = value.itineraryId;
    this.router.navigateByUrl('create');
  }
  detaill(value: any) {
    this.d.thinh = value;
    this.router.navigateByUrl('location/information');
  }
}
