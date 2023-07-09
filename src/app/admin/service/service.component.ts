import { Component} from '@angular/core';
  
@Component({
  selector: 'service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class Service {
  title = 'service';


  bookings = [
    { 
      id:1,
      img: 'https://ik.imagekit.io/tvlk/blog/2022/08/khach-san-view-bien-da-nang-1-1024x624.jpg?tr=dpr-2,w-675',
      name: 'Manada Hotel',
      price: '$300',
      position: 'Son Tra, Da Nang',
    },
    {
      id:2,
      img: 'https://maximilan.com.vn/wp-content/uploads/2020/03/96515_og_1.jpeg',
      name: 'Benna Hotel',
      price: '$50',
      position: 'Hai Chau, Da Nang',
    },
    {
      id:3,
      img: 'https://giclandhotel.com/uploads/noidung/images/31b5d04245a8637c1a88a3bb4a99a529.jpg',
      name: 'Venna Hotel',
      price: '$300',
      position: 'Lien Chieu, Da Nang',
    },
    {
      id:4,
      img: 'https://hanoimoi.com.vn/Uploads/anhthu/2019/2/17/dn.jpg',
      name: 'Tina Hotel',
      price: '$450',
      position: 'Ngu H.Son, Da Nang',
    },
    {
      id:5,
      img: 'https://cdn.vietnammoi.vn/171464242508312576/2020/7/6/228796178-1594026396952167435123.jpg',
      name: 'Mambo Hotel',
      price: '$250',
      position: 'Hai Chau, Da Nang',
    },
    {
      id:5,
      img: 'https://mrvivu.com/wp-content/uploads/2021/04/sala-danang-beach-hotel.jpeg',
      name: 'Kentito Hotel',
      price: '$100',
      position: 'Cam Le, Da Nang',
    },
    {
      id:6,
      img: 'https://homedecorplus.vn/wp-content/uploads/210615-hdp-khach-san-Hotel-Le-Bouton-da-nang-05.jpg',
      name: 'Benuy Hotel',
      price: '$120',
      position: 'Hoa Vang, Da Nang',
    },
    
  ];
}