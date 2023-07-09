import { Component, ViewChild } from '@angular/core';
import instance from 'src/app/axios/axios';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'itineraryy',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class Manageitinerary {
  title = 'itinerary';
  disabled = false;
  color = '#ffffff';
  // itinerarys: any[] = [];
  itinerarys: any[] = [
    {
      id: 1,
      name: null,
      cost: 200000,
      days: 2,
      accountName: 'Thai Van Thien',
      avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png'
    },
    {
      id: 1,
      name: null,
      cost: 200000,
      days: 2,
      accountName: 'Thai Van Thien',
      avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png'
    },
    {
      id: 1,
      name: null,
      cost: 200000,
      days: 2,
      accountName: 'Thai Van Thien',
      avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png'
    },
    {
      id: 1,
      name: null,
      cost: 200000,
      days: 2,
      accountName: 'Thai Van Thien',
      avatar: 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Picture.png'
    }
  ];
  checked: boolean[] = [true, false, false, false];

  count: any;
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
    const checked: boolean[] = [];
    instance
      .get(
        `http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=all&page=${
          this.pageIndex + 1
        }&take=10`
      )
      .then((response) => {
        this.itinerarys = response.data.data.output;
        response.data.data.output.map((item: { isPublic: boolean }) => checked.push(item.isPublic));
        this.checked = checked;
      })
      .catch(function (error) {});
  }
  // ngOnInit(): void {
  //   instance
  //     .get(
  //       http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=all&page=1&take=10`
  //     )
  //     .then((response) => {
  //       console.log(response.data.data.output);
  //       this.length = response.data.data.count;
  //       this.itinerarys = response.data.data.output;
  //       response.data.data.output.map((item: { isPublic: boolean }) =>
  //         this.checked.push(item.isPublic)
  //       );
  //       console.log(this.checked);
  //     })
  //     .catch(function (error) {});
  // }
  delete(value: any) {
    confirm('Do you want delete this?');
    {
      instance
        .delete(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/${value}`)
        .then((response) => {
          instance
            .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes?access=all&page=1&take=20')
            .then((response) => {
              this.count = response.data.data.count;
              this.itinerarys = response.data.data.output;
            })
            .catch(function (error) {});
        });
    }
  }
}
