import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class Information {
  title = 'information';
  actionbooking: boolean = true;
  thien: any = [];
  actionreser: boolean = true;
  constructor(private d: DataService, public router: Router) {}
  booking = this.d.thinh;
  relateds: any;
  add: boolean = false;
  loading: any;
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.loading = false;
    setTimeout(() => (this.loading = true), 800);
    this.thien.push(100 - (this.booking.rating / 5) * 100 + 37.5);
    console.log(this.booking.reviews[0].profile_photo_url);
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations/${this.booking._id}`)
      .then((response) => {
        this.relateds = response.data.data.relatedLocations;
        console.log(this.relateds);
        this.loading = true;
      })
      .catch(function (error) {});
  }
  bookingnow() {
    this.actionbooking = false;
    console.log(this.booking);
  }
  reservation() {
    this.actionreser = false;
  }
  addItem(value: any) {
    this.actionbooking = Boolean(value);
    this.actionreser = Boolean(value);
  }
  srcoll() {
    if (scrollY > 294) {
      this.add = true;
    } else if (scrollY < 294) {
      this.add = false;
    }
  }
  detail(value: any) {
    this.loading = false;
    this.booking = value;
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations/${value._id}`)
      .then((response) => {
        this.loading = true;
        this.relateds = response.data.data.relatedLocations;
        console.log(this.relateds);
        this.loading = true;
      })
      .catch(function (error) {});
  }
}
