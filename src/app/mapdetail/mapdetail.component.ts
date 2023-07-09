import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'mapdetail',
  templateUrl: './mapdetail.component.html',
  styleUrls: ['./mapdetail.component.css']
})
export class Mapdetail {
  @Input() zoom: boolean = false;
  title = 'map';
  lat: number = 16.047079;
  lng: number = 108.20623;
  locations = this.d.vitri
  thien: any = [];
  add: boolean = false;
  hih: boolean = false;
  siderbar:boolean = false;
  list:boolean = false;
  place:boolean=false
  index=0
  trip=this.d.itinerary
  color:boolean=false
  color0:boolean=false
  color1:boolean=false
  color2:boolean=false
  editt:boolean=true
  mapp:boolean=true
  dataFromParent:any
  originLabel:any =[];
  loading=false
  
  constructor(public router: Router, private d:DataService) {}
  ngOnInit() {
    setTimeout(() => this.loading=true,500)
    for (let i = 0; i < this.locations.length-1; i++) {
      // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
      this.thien.push('Day' + " " + (i+2))
    }
    for (let j = 0; j < this.locations[this.index].length-1; j++) {
      // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
      this.originLabel.push((j+1).toString())
      console.log(this.originLabel);
      
      
    }
  }
  location=this.locations[this.index]
  back()
{
  this.router.navigateByUrl('/search')
}
  thi(i:any)
{

    document.querySelector('.add')?.classList.remove('add')
    document.querySelectorAll('.itinerary-search_input_day_detail')[i].classList.add('add');
    this.index=i
    console.log(this.index);
    this.location=this.locations[this.index]
    console.log(this.location);
    

}
  map() {
    this.mapp=false
    this.place=true
    this.editt=true
    this.color=true
    this.color0=false
    this.color1=false
    this.color2=false
    this.router.navigateByUrl('/map')
  }
  edit() {
    this.color2=true
    this.color1=false
    this.color=false
    this.mapp=true
    this.place=true
    this.editt=false
    this.router.navigateByUrl('/edit')
  }
  unmap() {
    this.color0=true
    this.color=false
    this.color1=false
    this.color2=false
    this.mapp=true
    this.place=false
    this.editt=true
    this.router.navigateByUrl('/itinerary')
  }
infor()
{
  this.router.navigateByUrl('/create')
}
}

// options = {
//   componentRestrictions: { country: ['AU'] }
//   , fields: ["address_component", "place_id"]
// };

// @ViewChild("placesRef")
// placesRef!: GooglePlaceDirective;
  
//       public handleAddressChange(address: any) {
//         const latitude: number = address.geometry.location.lat();
//   const longitude: number = address.geometry.location.lng();
//   console.log('lat: ' + latitude + ', long: ' + longitude);
      
//   }
//   ngAfterViewInit(){
//     this.placesRef.options.componentRestrictions = { country: 'VN' }
//     // this.placesRef.options.administrativeArea= 'Đà Nẵng'}
//     this.placesRef.options.fields = ["formatted_address", "geometry", "place_id"]
// }
  
