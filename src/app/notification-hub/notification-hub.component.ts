import { Component, OnInit } from '@angular/core';
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {AdminService} from "../adminhub/admin.service";
import {DtoInputMovie} from "../adminhub/dtos/dto-input-movie";

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.css']
})
export class NotificationHubComponent implements OnInit {
  actus: DtoInputActu[] = [];
  movies: DtoInputMovie[] = [];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAllActu();
    this.fetchAll();
  }

  private fetchAllActu() {
    this._adminService.fetchAllActu().subscribe(actus => this.actus = actus);
  }
  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }
}
