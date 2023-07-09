import { Component } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';

@Component({
  selector: 'changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class Changepassword {
  constructor(public router: Router) {}
  title = 'changepassword';
  type: string = 'password';
  typeconfirm: string = 'password';
  current: any;
  neww: any;
  confirmm: any;
  showpassword() {
    if (this.type == 'password') {
      this.type = 'text';
    } else if (this.type == 'text') {
      this.type = 'password';
    }
  }
  showpasswordconfirm() {
    if (this.typeconfirm == 'password') {
      this.typeconfirm = 'text';
    } else if (this.typeconfirm == 'text') {
      this.typeconfirm = 'password';
    }
  }
  change(value: any) {
    console.log(value);
    this.current = value.currentPassword;
    this.neww = value.newPassword;
    this.confirmm = value.confirmPassword;
    instance
      .patch('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/change-password', {
        currentPassword: this.current,
        newPassword: this.neww,
        confirmPassword: this.confirmm
      })
      .then((response) => {
        console.log(response.config.headers);
        this.router.navigateByUrl('/signin');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
