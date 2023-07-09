import { Component } from '@angular/core';
import { Router } from '@angular/router';
import instance from '../axios/axios';
import { DataService } from '../data.service';

@Component({
  selector: 'getting',
  templateUrl: './getting.component.html',
  styleUrls: ['./getting.component.css']
})
export class Getting {
  title = 'header';
  add:any
  add1=false
  add2=false
  add3=false
  add11=false
  add22=false
  add33=false
  account:any
  constructor(private d: DataService, public router: Router) {}
  ngOnInit():void
  {  
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  srcoll()
  {  
    console.log(scrollY); 
      if (scrollY > 294) {
        this.add = '#1e4960';
      } else if (scrollY < 294) {
        this.add = 'rgba(0, 0, 0, 0.1)';
      }

    if(scrollY>450)
    {
      this.add1=true
      this.add11=false
    }
    if(scrollY<350)
    {
      this.add1=false
      this.add11=true
    }

    if(scrollY>850)
    {
      this.add2=true
      this.add22=false
    }
    if(scrollY<750)
    {
      this.add2=false
      this.add22=true
    }

    if(scrollY>1250)
    {
      this.add3=true
      this.add33=false
    }
    if(scrollY<1150)
    {
      this.add3=false
      this.add33=true
    }



    }
}
