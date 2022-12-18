import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviehubComponent } from './moviehub/moviehub.component';
import { MovieListComponent } from './moviehub/movie-list/movie-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRootingModule} from "./app-rooting.module";
import { HeaderComponent } from './header/header.component';
import { MovieDetailComponent } from './moviehub/movie-detail/movie-detail.component';
import { MovieHomeComponent } from './moviehub/movie-home/movie-home.component';
import { AdminhubComponent } from './adminhub/adminhub.component';
import { MovieTop100Component } from './moviehub/movie-top100/movie-top100.component';
import { MovieBad100Component } from './moviehub/movie-bad100/movie-bad100.component';
import { MovieAdminComponent } from './adminhub/movie-admin/movie-admin.component';
import { MovieUserComponent } from './adminhub/movie-user/movie-user.component';
import {NgxPaginationModule} from "ngx-pagination";
import {SwiperModule} from "swiper/angular";
import { FooterComponent } from './footer/footer.component';
import { FavorihubComponent } from './favorihub/favorihub.component';
import { MovieActuComponent } from './adminhub/movie-actu/movie-actu.component';
import { Nl2brPipe } from './nl2br.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MoviehubComponent,
    MovieListComponent,
    HeaderComponent,
    MovieDetailComponent,
    MovieHomeComponent,
    AdminhubComponent,
    MovieTop100Component,
    MovieBad100Component,
    MovieAdminComponent,
    MovieUserComponent,
    FooterComponent,
    FavorihubComponent,
    MovieActuComponent,
    Nl2brPipe,


  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRootingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SwiperModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
