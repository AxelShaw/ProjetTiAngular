import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MovieListComponent} from "./moviehub/movie-list/movie-list.component";
import {MoviehubComponent} from "./moviehub/moviehub.component";
import {MovieDetailComponent} from "./moviehub/movie-detail/movie-detail.component";
import {MovieHomeComponent} from "./moviehub/movie-home/movie-home.component";

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
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRootingModule { }
