import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class Signup {
  title = 'signup';
  type: string = 'password';
  typeconfirm: string = 'password';
  detailnotification: string = 'This field cannot be left blank';
  notificationfullname: boolean = false;
  detailnotificationfullname: string = '';
  detailminlenghtfullname: string = 'Minimum fullname length is 3 characters';
  detailmaxlenghtfullname: string = 'Maximum fullname length is 100 characters';
  detailfullname: string = 'Fullname must not contain special characters';
  notificationemail: boolean = false;
  detailnotificationemail: string = '';
  detailemail: string = 'Please enter an email';
  notificationpassword: boolean = false;
  detailnotificationpassword: string = '';
  detailminlenghtpassword: string = 'Minimum password length is 8 characters';
  detailmaxlenghtpassword: string = 'Maximum password length is 50 characters';
  detailpassword: string = 'Password must contain both numbers and letters';
  notificationconfirmpassword: boolean = false;
  detailnotificationconfirmpassword: string = '';
  detailconfirmpassword: string = 'Passwords are not the same';

  constructor(private d: DataService) {}
  ngOnInit(): void {}
  signupdata(value: any) {
    return this.d.getData(value);
  }
  blurfullname(value: any) {
    if (value === null) {
      this.notificationfullname = true;
      this.detailnotificationfullname = this.detailnotification;
    } else if (/[@,#,$,%,^,&,*,(,),-,!,~,`,",',<,>,?,/,{,}]/.test(value)) {
      this.notificationfullname = true;
      this.detailnotificationfullname = this.detailfullname;
    } else if (value.length < 3) {
      this.notificationfullname = true;
      this.detailnotificationfullname = this.detailminlenghtfullname;
    } else if (value.length > 100) {
      this.notificationfullname = true;
      this.detailnotificationfullname = this.detailmaxlenghtfullname;
    }
  }
  bluremail(value: any) {
    if (value === null) {
      this.notificationemail = true;
      this.detailnotificationemail = this.detailnotification;
    }
    if (
      !value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.notificationemail = true;
      this.detailnotificationemail = this.detailemail;
    }
  }

  blurpassword(value: any) {
    if (value === null) {
      this.notificationpassword = true;
      this.detailnotificationpassword = this.detailnotification;
    } else if (value.length < 8) {
      this.notificationpassword = true;
      this.detailnotificationpassword = this.detailminlenghtpassword;
    } else if (value.length > 50) {
      this.notificationpassword = true;
      this.detailnotificationpassword = this.detailmaxlenghtpassword;
    } else if (!/[0-9]/.test(value) || !/[a-z]/.test(value)) {
      this.notificationpassword = true;
      this.detailnotificationpassword = this.detailpassword;
    }
  }

  blurconfirmpassword(value: any, password: any) {
    if (value === null) {
      this.notificationconfirmpassword = true;
      this.detailnotificationconfirmpassword = this.detailnotification;
    } else if (value != password) {
      this.notificationconfirmpassword = true;
      this.detailnotificationconfirmpassword = this.detailconfirmpassword;
    }
  }

  focus() {
    this.notificationfullname = false;
    this.notificationemail = false;
    this.notificationpassword = false;
    this.notificationconfirmpassword = false;
  }

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
}
