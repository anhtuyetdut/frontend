import { Component } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class Homepage {
  title = 'homepage';
  add: any;
  locations: any;
  ad: any;
  addd: any;
  historys: any;
  loves: any;
  thich = [' '];
  diadiem: any;
  constructor(public router: Router, private d: DataService) {}
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    instance
      .get('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites')
      .then((response) => {
        this.loves = response.data.data.data;
        console.log(response.data.data);
        for (let i = 0; i < this.loves.length; i++) {
          this.thich.push(this.loves[i].itineraryId);
        }
        console.log('minh');
      })
      .catch(function (error) {});

    navigator.geolocation.getCurrentPosition((position) => {
      this.d.lat = position.coords.latitude;
      this.d.lng = position.coords.longitude;
      console.log(position.coords.latitude);
    });
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    } else if (localStorage.getItem('token')) {
    }

    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/recommended`)
      .then((response) => {
        this.locations = response.data.data;
        console.log(this.locations);
      })

      .catch(function (error) {});

    instance
      .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/locations/recommended`)
      .then((response) => {
        this.diadiem = response.data.data;
        console.log(this.diadiem);
      })

      .catch(function (error) {});
  }
  srcoll() {
    if (scrollY > 100) {
      this.add = '#8ab1c6 ';
    } else if (scrollY < 180) {
      this.add = 'rgba(0, 0, 0, 0.1)';
    }
  }
  detail(id: any) {
    this.d.minh = id;
    this.router.navigateByUrl('create');
  }
  love(i: any) {
    if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      this.ad = {
        itineraryId: i
      };
      this.thich.push(i);
      console.log(this.thich);
      instance
        .post('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', this.ad)
        .then((response) => {
          console.log(response);
          instance
            .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/recommended`)
            .then((response) => {
              this.locations = response.data.data;
              console.log(this.locations);
            })

            .catch(function (error) {});
        })
        .catch(function (error) {});
    }
  }
  unlove(i: any) {
    const index = this.thich.indexOf(i);
    this.thich.splice(index, 1);
    this.addd = {
      itineraryId: i
    };
    console.log(this.addd);
    instance
      .delete('http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/favorites/', { data: this.addd })
      .then((response) => {
        console.log(response);
        instance
          .get(`http://ec2-43-207-102-176.ap-northeast-1.compute.amazonaws.com:5000/routes/recommended`)
          .then((response) => {
            this.locations = response.data.data;
            console.log(this.locations);
          })

          .catch(function (error) {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  detaill(value: any) {
    this.d.thinh = value;
    this.router.navigateByUrl('location/information');
  }
}
