import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class Total {
  title = 'total';
  array = [0];
  bookingextra: any;
  thien: any = [];
  locations: any = [];
  add: any;
  constructor(private d: DataService, public router: Router) {}
  thich = [' '];
  ad: any;
  adddd: any;
  historys: any;
  loves: any;
  doimau1: boolean = false;
  doimau2: boolean = false;
  doimau3: boolean = false;
  doimau4: boolean = false;
  doimau5: boolean = false;
  diem = 1;
  bong1: boolean = false;
  bong2: boolean = false;
  types = [1, 2, 3, 4, 5];
  inn = 0;
  loading = true;
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
      .then((response) => {
        this.locations = response.data.listLocations;
        console.log(response.data.listLocations);

        for (let i = 1; i < response.data.listLocations.length; i++) {
          this.array.push(i);
        }
        this.bookingextra = this.locations.slice(0, 20);

        for (let i = 0; i < this.locations.length; i++) {
          if (!this.locations[i].rating) {
            this.locations[i].rating = 5;
          }
          this.thien.push((100 - (this.locations[i].rating / 5) * 100) / 2);
        }
        console.log(this.thien);
      })
      .catch(function (error) {});

    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=location&take=100')
      .then((response) => {
        this.loves = response.data.data.data;
        for (let i = 0; i < this.loves.length; i++) {
          this.thich.push(this.loves[i].locationId);
        }
        console.log('tuyet');
        console.log(this.loves);
      })
      .catch(function (error) {});
  }
  // scrollToTop() {
  //   // Lấy thẻ body và thêm thuộc tính scrollTop
  //   const scrollTop = this.elRef.nativeElement.querySelector('body');
  //   this.renderer.setProperty(scrollTop, 'scrollTop', 0);
  // }
  information(value: any) {
    this.d.thinh = value;
  }
  search(value: any) {
    this.loading = false;
    if (value.keyword == null) {
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16`)
        .then((response) => {
          this.locations = response.data.listLocations;
          this.loading = true;
        })
        .catch(function (error) {});
    } else {
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.keyword}&page=1&take=16`
        )
        .then((response) => {
          this.locations = response.data.listLocations;
          this.loading = true;
        })
        .catch(function (error) {});
    }
  }

  change(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.target.value}&page=1&take=16`
      )
      .then((response) => {
        this.locations = response.data.listLocations;
        this.loading = true;
      })
      .catch(function (error) {});
  }
  loc(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16&types=${value}`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
      })
      .catch(function (error) {});
    this.doimau1 = true;
    this.doimau2 = false;
    this.doimau3 = false;
    this.doimau4 = false;
    this.doimau5 = false;
  }
  loc1(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16&types=${value}`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
      })
      .catch(function (error) {});
    this.doimau1 = false;
    this.doimau2 = true;
    this.doimau3 = false;
    this.doimau4 = false;
    this.doimau5 = false;
  }
  loc2(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16&types=${value}`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
      })
      .catch(function (error) {});
    this.doimau1 = false;
    this.doimau2 = false;
    this.doimau3 = true;
    this.doimau4 = false;
    this.doimau5 = false;
  }
  loc3(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16&types=${value}`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
      })
      .catch(function (error) {});
    this.doimau1 = false;
    this.doimau2 = false;
    this.doimau3 = false;
    this.doimau4 = true;
    this.doimau5 = false;
  }
  loc4(value: any) {
    this.loading = false;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=16&types=${value}`
      )
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
      })
      .catch(function (error) {});
    this.doimau1 = false;
    this.doimau2 = false;
    this.doimau3 = false;
    this.doimau4 = false;
    this.doimau5 = true;
  }
  detail(value: any) {
    this.d.thinh = value;
    this.router.navigateByUrl('location/information');
  }
  srcoll() {
    if (scrollY > 294) {
      this.add = '#1e4960';
    } else if (scrollY < 294) {
      this.add = 'rgba(0, 0, 0, 0.1)';
    }
  }
  love(i: any) {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      this.ad = {
        locationId: i
      };
      this.thich.push(i);
      console.log(this.ad);
      instance
        .post('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', this.ad)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.bong1 = true;
    }
  }
  unlove(i: any) {
    const index = this.thich.indexOf(i);
    this.thich.splice(index, 1);
    this.adddd = {
      locationId: i
    };
    console.log(this.adddd);
    instance
      .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', { data: this.adddd })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.bong2 = true;
  }
  navigation(value: any, i: any) {
    this.loading = false;
    document.querySelector('.choice')?.classList.remove('choice');
    document.querySelectorAll('.total-navigation_button')[i].classList.add('choice');
    this.diem = value;
    console.log(this.diem);
    this.inn = i;
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
      .then((response) => {
        this.loading = true;
        this.locations = response.data.listLocations;
        console.log(response.data.listLocations);
      })
      .catch(function (error) {});
    window.scroll({
      top: 530,
      left: 0,
      behavior: 'smooth'
    });
  }
  sau() {
    this.loading = false;
    if (this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.types);
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
        .then((response) => {
          this.loading = false;
          this.locations = response.data.listLocations;
          console.log(response.data.listLocations);
        })
        .catch(function (error) {});
      window.scroll({
        top: 530,
        left: 0,
        behavior: 'smooth'
      });
    } else if (!this.types.includes(15)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] + 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.types);
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
        .then((response) => {
          this.loading = true;
          this.locations = response.data.listLocations;
          console.log(response.data.listLocations);
        })
        .catch(function (error) {});
      window.scroll({
        top: 530,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  truoc() {
    this.loading = false;
    if (this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i];
      }
      this.diem = this.types[this.inn];
      console.log(this.types);
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
        .then((response) => {
          this.loading = true;
          this.locations = response.data.listLocations;
          console.log(response.data.listLocations);
        })
        .catch(function (error) {});
      window.scroll({
        top: 530,
        left: 0,
        behavior: 'smooth'
      });
    } else if (!this.types.includes(1)) {
      for (let i = 0; i < this.types.length; i++) {
        this.types[i] = this.types[i] - 1;
      }
      this.diem = this.types[this.inn];
      console.log(this.types);
      console.log(this.diem);
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${this.diem}&take=16`)
        .then((response) => {
          this.loading = true;
          this.locations = response.data.listLocations;
          console.log(response.data.listLocations);
        })
        .catch(function (error) {});
      window.scroll({
        top: 530,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
