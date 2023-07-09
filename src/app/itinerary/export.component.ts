import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import instance from '../../app/axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class Export {
  title = 'weather';
  remove: boolean = false;
  add: any;
  addd: any;
  historys: any;
  loves: any;
  thich = [' '];
  diem = 1;
  color1: boolean = true;
  color2: boolean = false;
  color3: boolean = false;
  color4: boolean = false;
  color5: boolean = false;
  types = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  inn = 0;
  count: any;
  name = 'your trip';
  loading = true;
  constructor(public router: Router, private d: DataService) {}
  ngOnInit() {
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
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=1&take=16')
      .then((response) => {
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
        console.log(this.count);
      })
      .catch(function (error) {});

    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&&isPublic=true')
      .then((response) => {
        console.log(response.data.data);
        this.loves = response.data.data.output;
        for (let i = 0; i < this.loves.length; i++) {
          this.thich.push(this.loves[i]._id);
        }
      })
      .catch(function (error) {});
    console.log(this.thich);
  }

  detele(position: any, i: any) {
    confirm('Do you want delete this?');
    {
      this.historys.splice(position, 1);
      instance
        .delete(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${i}`)
        .then((response) => {
          instance
            .get(
              'http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=1&take=16'
            )
            .then((response) => {
              this.historys = response.data.data.output;
              console.log(response.data);
              this.count = response.data.data.count;
              console.log(this.count);
            })
            .catch(function (error) {});
        });
    }
  }

  choice1() {
    this.loading = false;
    this.color1 = true;
    this.color2 = false;
    this.color3 = false;
    this.color4 = false;
    this.color5 = false;
    this.name = 'your trip';
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=1&take=16')
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
      });
  }
  choice2() {
    this.loading = false;
    this.color2 = true;
    this.color3 = false;
    this.color1 = false;
    this.color4 = false;
    this.color5 = false;
    this.name = 'public trip';
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&&isPublic=true')
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
      });
  }
  choice3() {
    this.loading = false;
    this.color3 = true;
    this.color2 = false;
    this.color1 = false;
    this.color4 = false;
    this.color5 = false;
    this.name = 'private trip';
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&&isPublic=false')
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
        console.log(this.count);
      });
  }
  choice4(value: any) {
    this.loading = false;
    this.color4 = true;
    this.color2 = false;
    this.color1 = false;
    this.color3 = false;
    this.color5 = false;
    this.name = 'trip';
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&&days=${value}`)
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
        console.log(this.count);
      });
  }
  choice5(value: any) {
    this.loading = false;
    this.color5 = true;
    this.color2 = false;
    this.color1 = false;
    this.color4 = false;
    this.color3 = false;
    this.name = 'trip';
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&&people=${value}`)
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
        this.count = response.data.data.count;
        console.log(this.count);
      });
  }
  public(value: any) {
    this.add = {
      itineraryId: value
    };
    this.thich.push(value);
    console.log(this.thich);

    if (confirm(`Do you want to public this route ?`) == true) {
      instance
        .patch(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${value}`, {
          isPublic: true
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {});
    }
  }
  unlove(i: any) {
    const index = this.thich.indexOf(i);
    this.thich.splice(index, 1);
    this.addd = {
      itineraryId: i
    };
    console.log(this.addd);

    if (confirm(`Do you want to non-public this route ?`) == true) {
      instance
        .patch(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${i}`, {
          isPublic: false
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  navigation(value: any, i: any) {
    this.loading = false;
    document.querySelector('.choice')?.classList.remove('choice');
    document.querySelectorAll('.total-navigation_button')[i].classList.add('choice');
    this.diem = value;
    this.inn = i;
    console.log(this.diem);
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=${this.diem}&take=16`
      )
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
      })
      .catch(function (error) {});
    window.scroll({
      top: 530,
      left: 0,
      behavior: 'smooth'
    });
  }
  srcoll() {
    if (scrollY > 180) {
      this.add = '#24591e';
    } else if (scrollY < 180) {
      this.add = 'rgba(0, 0, 0, 0.1)';
    }
  }
  detail(value: any) {
    this.d.minh = value._id;
    this.router.navigateByUrl('create');
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
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=${this.diem}&take=16`
        )
        .then((response) => {
          this.loading = true;
          this.historys = response.data.data.output;
          console.log(response.data);
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
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=${this.diem}&take=16`
        )
        .then((response) => {
          this.loading = true;
          this.historys = response.data.data.output;
          console.log(response.data);
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
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=${this.diem}&take=16`
        )
        .then((response) => {
          this.loading = true;
          this.historys = response.data.data.output;
          console.log(response.data);
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
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=${this.diem}&take=16`
        )
        .then((response) => {
          this.loading = true;
          this.historys = response.data.data.output;
          console.log(response.data);
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
