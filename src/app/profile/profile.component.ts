import { Component } from '@angular/core';
import instance from '../axios/axios';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class Profile {
  title = 'profile';
  changeinformation: boolean = false;
  add: boolean = false;
  account: any = [];
  ngOnInit() {
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/profile`)
      .then((response) => {
        this.account = response.data.data;
        console.log(this.account);
      })

      .catch(function (error) {});
  }
  change() {
    this.changeinformation = true;
  }
  remove() {
    this.changeinformation = false;
  }
  srcoll() {
    if (scrollY > 10) {
      this.add = true;
    } else if (scrollY < 10) {
      this.add = false;
    }
  }
}
