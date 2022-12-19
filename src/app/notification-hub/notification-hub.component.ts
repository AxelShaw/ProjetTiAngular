import { Component, OnInit } from '@angular/core';
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {AdminService} from "../adminhub/admin.service";

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.css']
})
export class NotificationHubComponent implements OnInit {
  actus: DtoInputActu[] = [];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAllActu();
  }

  private fetchAllActu() {
    this._adminService.fetchAllActu().subscribe(actus => this.actus = actus);
  }
}
