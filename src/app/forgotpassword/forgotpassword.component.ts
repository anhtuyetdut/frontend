import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';
import axios from '../axios/axios';
import { DataService } from '../data.service';


@Component({
  selector: 'forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class Forgotpassword {
  title = 'header';
  constructor(private d: DataService, public router: Router) {}
  submit(value: any) {
    instance
      .post('/accounts/forgot-password', value)
      .then((response) => {
          this.router.navigateByUrl('/signin');
        })
      .catch((error) => error);
  }
}