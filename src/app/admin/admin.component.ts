import { Component, OnInit, ViewChild } from '@angular/core';
import instance from '../axios/axios';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class Admin {
  title = 'admin';
  infor: any;
  ngOnInit(): void {
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/dashboard/overview`)
      .then((response) => {
        this.infor = response.data.data;
        console.log(this.infor);
      })
      .catch(function (error) {});
  }
}
