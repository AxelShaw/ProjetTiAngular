import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MovieDetailComponent} from "./moviehub/movie-detail/movie-detail.component";
import {MovieHomeComponent} from "./moviehub/movie-home/movie-home.component";
import {AdminhubComponent} from "./adminhub/adminhub.component";
import {MovieTop100Component} from "./moviehub/movie-top100/movie-top100.component";
import {MovieBad100Component} from "./moviehub/movie-bad100/movie-bad100.component";
import {MovieAdminComponent} from "./adminhub/movie-admin/movie-admin.component";
import {MovieUserComponent} from "./adminhub/movie-user/movie-user.component";
import {FavorihubComponent} from "./favorihub/favorihub.component";
import {MovieActuComponent} from "./adminhub/movie-actu/movie-actu.component";
import {RegisterhubComponent} from "./registerhub/registerhub.component";
import {NotificationHubComponent} from "./notification-hub/notification-hub.component";
import {LoginhubComponent} from "./loginhub/loginhub.component";

const routes: Routes = [
  //default start page
  {path: '',redirectTo:'home', pathMatch:'full'},
  {
    //detail's movie
    path: 'detail/:movieid', component: MovieDetailComponent
  },
  {
    //home page
    path: 'home', component: MovieHomeComponent
  },
  {
    //register page
    path: 'registerhub', component: RegisterhubComponent
  },
  {
    //login page
    path: 'loginhub', component: LoginhubComponent
  },
  {
    //menu admin page
    path: 'admin', component: AdminhubComponent,
    children: [
      {
        //admin movie page
        path: 'movieAdmin', component: MovieAdminComponent
      },
      {
        //admin user page
        path: 'userAdmin', component: MovieUserComponent
      },
      {
        //admin newq page
        path: 'actuAdmin', component: MovieActuComponent
      }
    ]
  },
  {
    //best movie(top 500)
    path: 'top100', component: MovieTop100Component
  },
  {
    //worst movie(bad 500)
    path: 'bad100', component: MovieBad100Component
  },
  {
    //favorite page(user)
    path: 'favorie', component: FavorihubComponent
  },
  {
    //notification page(user)
    path: 'notification', component: NotificationHubComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRootingModule { }
