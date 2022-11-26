import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviehubComponent } from './moviehub/moviehub.component';
import { MovieListComponent } from './moviehub/movie-list/movie-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRootingModule} from "./app-rooting.module";
import { HeaderComponent } from './header/header.component';
import { MovieDetailComponent } from './moviehub/movie-detail/movie-detail.component';
import { MovieHomeComponent } from './moviehub/movie-home/movie-home.component';
import { AdminhubComponent } from './adminhub/adminhub.component';
import { MovieCreateComponent } from './adminhub/movie-create/movie-create.component';
import { MovieListAdminComponent } from './adminhub/movie-list-admin/movie-list-admin.component';
import { MovieTop100Component } from './moviehub/movie-top100/movie-top100.component';
import { MovieBad100Component } from './moviehub/movie-bad100/movie-bad100.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviehubComponent,
    MovieListComponent,
    HeaderComponent,
    MovieDetailComponent,
    MovieHomeComponent,
    AdminhubComponent,
    MovieCreateComponent,
    MovieListAdminComponent,
    MovieTop100Component,
    MovieBad100Component,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRootingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
