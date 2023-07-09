import { Component } from '@angular/core';
import axios from 'axios';
import instance from 'src/app/axios/axios';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class Manageuser {
  title = 'manageuser';
  // users: any[] = [];
  users: any[] = [
    {
      id: 1,
      name: 'Anh Tuyet Nguyen',
      email: 'anhtuyetdutk19@gmail.com',
      role: 1
    },
    {
      id: 1,
      name: 'Anh Tuyet Nguyen',
      email: 'anhtuyetdutk19@gmail.com',
      role: 1
    },
    {
      id: 1,
      name: 'Anh Tuyet Nguyen',
      email: 'anhtuyetdutk19@gmail.com',
      role: 1
    },
    {
      id: 1,
      name: 'Anh Tuyet Nguyen',
      email: 'anhtuyetdutk19@gmail.com',
      role: 1
    }
  ];
  backgroun: boolean = true;
  add: boolean = true;
  addupdate: boolean = true;
  email: any;
  isActive: any;
  role: any;
  name: any;
  id: any;
  types = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  inn = 0;
  diem = 1;

  pageEvent!: PageEvent;
  length: number = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?page=${
          this.pageIndex + 1
        }&take=100`
      )
      .then((response) => {
        console.log(response.data.data.listAccount);
        this.users = response.data.data.listAccount;
      })
      .catch(function (error) {});
  }

  // ngOnInit(): void {
  //   instance
  //     .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?page=1&take=100`)
  //     .then((response) => {
  //       this.length = response.data.data.count;
  //       this.users = response.data.data.listAccount;
  //     })
  //     .catch(function (error) {});
  // }
  delete(value: any) {
    const data = {
      deletedIds: [value]
    };
    instance
      .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts', { data: data })
      .then((response) => {
        instance
          .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?page=1&take=10`)
          .then((response) => {
            console.log(response.data.data.listAccount);
            this.users = response.data.data.listAccount;
          })
          .catch(function (error) {});
      })
      .catch(function (error) {});
  }
  create(value: any) {
    console.log(value);

    if (value.email != null && value.password != null && value.role != null && value.name != null) {
      instance
        .post(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/create`, {
          email: value.email,
          password: value.password,
          role: Number(value.role),
          name: value.name
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {});
    } else {
      alert('You have to fill all input');
    }
  }
  remove() {
    this.add = true;
    this.addupdate = true;
    this.backgroun = true;
  }
  addnew() {
    this.add = false;
    this.backgroun = false;
  }
  updatesong(value: any) {
    this.email = value.email;
    this.isActive = value.isActive;
    this.role = value.role;
    this.name = value.name;
    this.addupdate = false;
    this.backgroun = false;
    console.log(value);
    this.id = value._id;
  }
  updateinfor(value: any) {
    console.log(this.isActive);
    console.log(value.isActive);

    if (value.isActive !== this.isActive.toString()) {
      console.log('thien');

      instance
        .patch(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/admin/update/${this.id}`, {
          email: value.email,
          isActive: value.isActive,
          role: Number(value.role),
          name: value.name
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {});
    }
    if (value.isActive === this.isActive.toString()) {
      console.log('vinh');

      instance
        .patch(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts/admin/update/${this.id}`, {
          email: value.email,
          role: Number(value.role),
          name: value.name
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {});
    }
  }
  search(value: any) {
    if (value.keyword == null) {
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?page=1&take=100`)
        .then((response) => {
          console.log(response.data.data.listAccount);
          this.users = response.data.data.listAccount;
        })
        .catch(function (error) {});
    } else {
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?keyword=${value.keyword}&page=1&take=100`
        )
        .then((response) => {
          console.log(response.data.data.listAccount);
          this.users = response.data.data.listAccount;
        })
        .catch(function (error) {});
    }
  }
  change(value: any) {
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/accounts?keyword=${value.target.value}&page=1&take=100`
      )
      .then((response) => {
        console.log(response.data.data.listAccount);
        this.users = response.data.data.listAccount;
      })
      .catch(function (error) {});
  }
}
