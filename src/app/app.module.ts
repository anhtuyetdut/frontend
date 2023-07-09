import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Signin } from './signin/signin.component';
import { Signup } from './signup/signup.component';
import { Header } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { Footer } from './footer/footer.component';
import { Getting } from './gettingstart/getting.component';
import { Homepage } from './hompage/homepage.component';
import { Bannel } from './bannel/bannel.component';
import { Forgotpassword } from './forgotpassword/forgotpassword.component';
import { Itinerary } from './itinerary/itinerary.component';
import { Export } from './itinerary/export.component';
import { Create } from './itinerary/create.component';
import { Map } from './map/map.component';
import { Changepassword } from './changepassword/changepassword.component';
import { Profile } from './profile/profile.component';

import { Admin } from './admin/admin.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Chartcolum } from './admin/chartcolum/chartcolum.component';
import { Manageuser } from './admin/manageuser/manageuser.component';
import { Service } from './admin/service/service.component';
import { Manageitinerary } from './admin/itinerary/itinerary.component';
import { Managebooking } from './admin/managebooking/managebooking.component';
import { Headerr } from './headerr/headerr.component';
import { Search } from './itinerary/search.component';
import { Total } from './location/total.component';
import { Information } from './location/information.component';
import { Favorite } from './favorite/favorite.component';
import { TotalIti } from './itinerary/total.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDropConnectedSortingGroupExample } from './drop/drop.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Mapdetail } from './mapdetail/mapdetail.component';
import { Loading } from './loading/loading.component';
import { Signinadmin } from './admin/signinadmin.component';
import { Chartcolum1 } from './admin/chartcolum1/chartcolum1.component';
import { Chartcolum2 } from './admin/chartcolum2/chartcolum2.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    Signin,
    Signup,
    Header,
    Footer,
    Getting,
    Homepage,
    Bannel,
    Forgotpassword,
    Favorite,
    Itinerary,
    Export,
    Create,
    Map,
    Changepassword,
    Profile,
    Admin,
    Chartcolum,
    Manageuser,
    Service,
    Manageitinerary,
    Managebooking,
    Headerr,
    Search,
    Total,
    Information,
    TotalIti,
    CdkDragDropConnectedSortingGroupExample,
    Mapdetail,
    Loading,
    Signinadmin,
    Chartcolum1,
    Chartcolum2
  ],
  imports: [
    AgmDirectionModule,
    GooglePlaceModule,
    DragDropModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVatgG_Di0Y8-yNMFDvczuyAGzIMcN0RU'
    }),
    MatSlideToggleModule,
    AgmDirectionModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
