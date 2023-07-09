import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'totaliti',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalIti {
  title = 'weather';
  remove: boolean = false;
  add: any;
  addd: any;
  historys: any;
  loves: any;
  thich = [' '];
  types = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  inn = 0;
  diem = 1;
  color1: boolean = true;
  color4: boolean = false;
  color5: boolean = false;
  loading = true;
  constructor(public router: Router, private d: DataService) {}
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&&page=1&take=20')
      .then((response) => {
        this.historys = response.data.data.output;
        console.log(this.historys);
      })
      .catch(function (error) {});

    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites')
      .then((response) => {
        this.loves = response.data.data.data;
        console.log(response.data.data);
        for (let i = 0; i < this.loves.length; i++) {
          this.thich.push(this.loves[i].itineraryId);
        }
        console.log('minh');
      })
      .catch(function (error) {});
  }

  detele(position: any) {
    confirm('Do you want delete this?');
    {
      this.historys.splice(position, 1);
    }
  }
  love(i: any) {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      this.add = {
        itineraryId: i
      };
      this.thich.push(i);
      console.log(this.thich);
      instance
        .post('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', this.add)
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
    instance
      .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', { data: this.addd })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  srcoll() {
    if (scrollY > 180) {
      this.add = '#cea469';
    } else if (scrollY < 180) {
      this.add = 'rgba(0, 0, 0, 0.1)';
    }
  }
  detail(value: any) {
    this.d.minh = value._id;
    this.router.navigateByUrl('create');
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
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&page=${this.diem}&take=20`
      )
      .then((response) => {
        this.historys = response.data.data.output;
        console.log(response.data);
        this.loading = true;
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
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&page=${this.diem}&take=20`
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
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&page=${this.diem}&take=20`
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
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&page=${this.diem}&take=20`
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
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&page=${this.diem}&take=20`
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

  choice1() {
    this.loading = false;
    this.color1 = true;
    this.color4 = false;
    this.color5 = false;
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=private&page=1&take=16')
      .then((response) => {
        this.loading = true;
        this.historys = response.data.data.output;
        console.log(response.data);
      });
  }
  choice4(day: any) {
    this.loading = false;
    this.color4 = true;
    this.color1 = false;
    this.color5 = false;
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&days=${day}`)
      .then((response) => {
        this.historys = response.data.data.output;
        console.log(response.data);
        this.loading = true;
      });
  }
  choice5(people: any) {
    this.loading = false;
    this.color5 = true;
    this.color1 = false;
    this.color4 = false;
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true&people=${people}`)
      .then((response) => {
        this.historys = response.data.data.output;
        this.loading = true;
        console.log(response.data);
      });
  }
}
