import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import instance from 'src/app/axios/axios';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'managebooking',
  templateUrl: './managebooking.component.html',
  styleUrls: ['./managebooking.component.css']
})
export class Managebooking {
  title = 'managebooking';
  historybookings: any;
  count: any;
  types: string = '';
  keyword: string = '';
  pageEvent!: PageEvent;
  length: number = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  onChange(e: any, value: any) {
    this.pageIndex = 0;
    const types = e.target.value.length ? e.target.value : '';
    this.types = types;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${this.keyword}&types=${
          this.types
        }&page=${this.pageIndex + 1}&take=10`
      )
      .then((response) => {
        this.historybookings = response.data.listLocations;
        this.length = response.data.count;
      })
      .catch(function (error) {});
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=${
          this.pageIndex + 1
        }&take=10`
      )
      .then((response) => {
        this.historybookings = response.data.listLocations;
      })
      .catch(function (error) {});
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str);
    }
  }
  ngOnInit(): void {
    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=10`)
      .then((response) => {
        this.length = response.data.count;
        this.historybookings = response.data.listLocations;
      })
      .catch(function (error) {});
  }

  search(value: any) {
    if (value.keyword == null) {
      instance
        .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?page=1&take=240`)
        .then((response) => {
          console.log(response.data.count);
          this.count = response.data.count;
          this.historybookings = response.data.listLocations;
        })
        .catch(function (error) {});
    } else {
      instance
        .get(
          `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${value.keyword}&page=1&take=20`
        )
        .then((response) => {
          console.log(response.data.count);
          this.count = response.data.count;
          this.historybookings = response.data.listLocations;
        })
        .catch(function (error) {});
    }
  }
  change(value: any) {
    this.keyword = value.target.value;
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${this.keyword}&types=${this.types}&page=1&take=20`
      )
      .then((response) => {
        this.length = response.data.count;
        this.historybookings = response.data.listLocations;
      })
      .catch(function (error) {});
  }
}
