import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class Map {
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
  destinationLabel = 'B';
  waypointsLabel = ''
  data:any=[]
  id=0
  colo1:boolean=true
  colo2:boolean=false
  colo3:boolean=false
  
  constructor(public router: Router, private d:DataService) {}
  ngOnInit() {
    for (let i = 0; i < this.locations[0].length-1; i++) {
      // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
      this.thien.push('Day' + " " + (i+2))
    }

    for (let j = 0; j < this.locations[this.id][this.index].length-1; j++) {
      // this.thien.push(100 - (this.locations[i].rating / 5) * 100 + 11.7);
      this.originLabel.push((j+1).toString())
      console.log(this.originLabel);
      
      
    }
console.log(this.locations[this.index][0]);

  }
  location=this.locations[this.id][this.index]

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
    this.location=this.locations[this.id][this.index]
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

     if (!localStorage.getItem('token')) {
      alert('You must Sign in before do this');
      this.router.navigateByUrl('/signin');
    } else if (localStorage.getItem('token')) {
      this.color2=true
      this.color1=false
      this.color=false
      this.mapp=true
      this.place=true
      this.editt=false
      this.router.navigateByUrl('/edit')
    }
  }
  choice(value:any)
  {
    this.id=value
    this.location=this.locations[this.id][this.index]
    if(value==0)
  {
    this.colo1=true
    this.colo2=false
    this.colo3=false
  }

  else if(value==1)
  {
    this.colo1=false
    this.colo2=true
    this.colo3=false
  }

  else if(value==2)
  {
    this.colo1=false
    this.colo2=false
    this.colo3=true
  }
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
  onPolylineUpdate(event:any) {
    event.polylineOptions = { // chỉnh sửa option cho polyline
      strokeColor: "red",
      strokeOpacity: 0.7,
      strokeWeight: 5,
      icons: null, // set icons là null để bỏ nhãn của polyline
    };
  }
  downloadPDF() {
    const doc = new (<any>jsPDF)();
  console.log(this.d.tong)
    // tạo bảng mới
    const headers = [['Name', 'Time Start', 'Time End','Address']];
    for(let i=0;i<this.d.tong.length;i++)
    {
    for(let j=1;j<this.d.tong[i].length;j++)
  
    {
      this.data.push
      (
        [`${this.d.tong[i][j].name.toString()}`,this.d.tong[i][j].timeS,this.d.tong[i][j].timeE,'Hai Chau, Da Nang' ]
      )
      // [
      //   'thien',
      //   'thien',
      //   'thien',
      //   'thien'
      // ]
      
    }
  }
    doc.autoTable({
      head: headers,
      body: this.data,
      startY: 20,
    });
    doc.setFont("arial");
  doc.setFontSize(12);
  
    // thêm văn bản khác nếu cần
    doc.text('This is your itinerary', 10, 10);
  
    // lưu tài liệu PDF
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    window.open(url);
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
  
