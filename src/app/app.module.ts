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

@NgModule({
  declarations: [
    AppComponent,
    MoviehubComponent,
    MovieListComponent,
    HeaderComponent,
    MovieDetailComponent,
    MovieHomeComponent,
    AdminhubComponent
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
