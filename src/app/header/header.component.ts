import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class Header {
  title = 'header';
  action_request: boolean | undefined;
  action_main: boolean | undefined;
  add:boolean=true

  constructor(public router: Router) {}
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
  account = [
      {
        name: 'Thien V. Thai',
        email: 'vanthiendiendien@gmail.com',
      }
    ];
}
