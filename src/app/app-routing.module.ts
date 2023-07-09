import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Getting } from './gettingstart/getting.component';
import { Signin } from './signin/signin.component';
import { Signup } from './signup/signup.component';
import { Homepage } from './hompage/homepage.component';
import { Forgotpassword } from './forgotpassword/forgotpassword.component';
import { Itinerary } from './itinerary/itinerary.component';
import { Export } from './itinerary/export.component';
import { Create } from './itinerary/create.component';
import { Map } from './map/map.component';
import { Profile } from './profile/profile.component';
import { Changepassword } from './changepassword/changepassword.component';
import { Admin } from './admin/admin.component';
import { Manageuser } from './admin/manageuser/manageuser.component';
import { Service } from './admin/service/service.component';
import { Manageitinerary } from './admin/itinerary/itinerary.component';
import { Managebooking } from './admin/managebooking/managebooking.component';
import { Search } from './itinerary/search.component';
import { Total } from './location/total.component';
import { Information } from './location/information.component';
import { Favorite } from './favorite/favorite.component';
import { TotalIti } from './itinerary/total.component';
import { CdkDragDropConnectedSortingGroupExample } from './drop/drop.component';
import { Mapdetail } from './mapdetail/mapdetail.component';
import { Loading } from './loading/loading.component';
import { Signinadmin } from './admin/signinadmin.component';


const routes: Routes = [
  {
    path: 'signin',
    component: Signin
  },
  {
    path: 'in',
    component: Loading
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'homepage',
    component: Homepage
  },
  {
    path:'forgotpassword',
    component: Forgotpassword
  },
  {
    path:'favorite',
    component:Favorite
  },
  {
    path:'export',
    component: Export
  },
  {
    path:'create',
    component: Create

  },
  {
    path:'itinerary',
    component: Itinerary

  },
  {
    path:'map',
    component:Map
  },
  {
    path:'map',
    component:Map
  },
  {
    path:'profile',
    component:Profile
  },
  {
    path:'changepassword',
    component:Changepassword
  },

  {
    path:'location',
    component:Total
  },
  {
    path:'total',
    component:TotalIti
  },
  {
    path:'location/information',
    component:Information
  },
  {
    path: 'admin',
    component: Admin
  },
  {
    path: 'manageuser',
    component: Manageuser
  },
  {
    path: 'map',
    component: Map
  },
  {
    path: 'map/detail',
    component: Mapdetail
  },
  {
    path: 'edit',
    component: CdkDragDropConnectedSortingGroupExample
  },
  {
    path: 'manageitinerary',
    component: Manageitinerary
  },
  {
    path: 'managelocation',
    component: Managebooking
  },
  {
    path: 'signin/admin',
    component: Signinadmin
  },
  {
    path: 'search',
    component: Search
  },
  {
    path: '',
    component: Getting
  },
  {
    path: '**',
    component: Getting
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
