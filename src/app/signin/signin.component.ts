import { Component } from '@angular/core';
import { DataService } from '../data.service';
import axios from '../../app/axios/axios';
import { Router } from '@angular/router';
import instance from '../../app/axios/axios';
@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class Signin {
  title = 'signin';
  type = 'password';
  token = '';
  refreshToken = '';
  tokentime: any;
  notification: boolean = false;
  notificationpassword: boolean = false;
  noti: boolean = false;
  constructor(private d: DataService, public router: Router) {}

  showpassword() {
    if (this.type == 'password') {
      this.type = 'text';
    } else if (this.type == 'text') {
      this.type = 'password';
    }
  }

  submit(value: any) {
    axios
      .post('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/signin', value)
      .then((response) => {
        console.log(response.data);
        const token = response.data.data.token;
        localStorage.setItem('token', token);

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log(instance.defaults.headers.common['Authorization']);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        if (localStorage.getItem('token')) {
          this.router.navigateByUrl('/homepage');
        }
      })
      .catch((error) => (this.noti = true));
  }
}
