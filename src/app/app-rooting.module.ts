import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MovieListComponent} from "./moviehub/movie-list/movie-list.component";
import {MoviehubComponent} from "./moviehub/moviehub.component";
import {MovieDetailComponent} from "./moviehub/movie-detail/movie-detail.component";
import {MovieHomeComponent} from "./moviehub/movie-home/movie-home.component";
import {AdminhubComponent} from "./adminhub/adminhub.component";
import {MovieTop100Component} from "./moviehub/movie-top100/movie-top100.component";
import {MovieBad100Component} from "./moviehub/movie-bad100/movie-bad100.component";
import {MovieAdminComponent} from "./adminhub/movie-admin/movie-admin.component";
import {MovieUserComponent} from "./adminhub/movie-user/movie-user.component";

const routes: Routes = [
  {
    path: 'movies', component: MoviehubComponent,
    children: [
      {
        path: 'list', component: MovieListComponent
      }
    ]
  },
  {
    path: 'detail/:movieid', component: MovieDetailComponent
  },
  {
    path: 'home', component: MovieHomeComponent
  },
  {
    path: 'admin', component: AdminhubComponent,
    children: [
      {
        path: 'movieAdmin', component: MovieAdminComponent
      },
      {
        path: 'userAdmin', component: MovieUserComponent
      }
    ]
  },
  {
    path: 'top100', component: MovieTop100Component
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRootingModule { }
