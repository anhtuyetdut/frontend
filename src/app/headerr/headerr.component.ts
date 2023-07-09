import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'headerr',
  templateUrl: './headerr.component.html',
  styleUrls: ['./headerr.component.css']
})
export class Headerr {
  title = 'headerr';
  action_request: boolean | undefined;
  action_main: boolean | undefined;
  add:boolean=true
  account:any
  infor:any
  @Input() addd:any

  constructor(private d: DataService, public router: Router) {}
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.action_request = false;
      this.action_main = true;
      // this.router.navigateByUrl('');
    } else if (localStorage.getItem('token')) {
      this.action_request = true;
      }
    }

  signout() {
    localStorage.clear();
  }
  showmore()
  {
    if(this.add)
    { this.add=false}
    else{
      this.add=true
    }
  }
  homepage()
  {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('');
    } else if (localStorage.getItem('token')) {
      this.router.navigateByUrl('homepage');
    }
  }
}
