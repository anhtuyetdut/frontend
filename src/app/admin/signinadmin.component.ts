import { Component } from '@angular/core';
import { DataService } from '../data.service';
import axios from '../../app/axios/axios';
import { Router } from '@angular/router';
import instance from '../../app/axios/axios';
@Component({
  selector: 'signinadmin',
  templateUrl: './signinadmin.component.html',
  styleUrls: ['./signinadmin.component.css']
})
export class Signinadmin {
  title = 'signin';
  type = 'password';
  token = '';
  refreshToken = '';
  tokentime: any;
  notification: boolean = false;
  notificationpassword: boolean = false;
  noti: boolean = false;
  constructor(private d: DataService, public router: Router) {}
  ngOnInit(): void {
    localStorage.clear();
  }

  showpassword() {
    if (this.type == 'password') {
      this.type = 'text';
    } else if (this.type == 'text') {
      this.type = 'password';
    }
  }

  submit(value: any) {
    axios
      .post('/accounts/signin', value)
      .then((response) => {
        console.log(response.data);
        const token = response.data.data.token;
        localStorage.setItem('tokenadmin', token);

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log(instance.defaults.headers.common['Authorization']);
        localStorage.setItem(
          'refreshTokenadmin',
          response.data.data.refreshToken
        );
        this.router.navigateByUrl('/admin');
      })
      .catch((error) => (this.noti = true));
  }
}
