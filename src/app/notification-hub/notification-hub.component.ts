import { Component, OnInit } from '@angular/core';
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {AdminService} from "../adminhub/admin.service";
import {DtoInputMovie} from "../adminhub/dtos/dto-input-movie";
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.css']
})
export class NotificationHubComponent implements OnInit {
  actus: DtoInputActu[] = [];
  movies: DtoInputMovie[] = [];
  favories : DtoInputFavorie[] = [];
  DeleteNot : number[] = [];
  seeNot : number[] = [];
  id: number = 0;

  constructor(private _adminService: AdminService, private _cook : CookieService) { }

  ngOnInit(): void {
    this.getUser();
    this.fetchAllActu();
    this.fetchAll();
    this.fetchAllFavorieById(this.id);
    if(localStorage.getItem('DeleteNot') != null){
      // @ts-ignore
      this.DeleteNot = JSON.parse(localStorage.getItem(`DeleteNot`));
    }
    if(localStorage.getItem('seeNot') != null){
      // @ts-ignore
      this.seeNot = JSON.parse(localStorage.getItem(`seeNot`));
    }
  }

  private fetchAllActu() {
    this._adminService.fetchAllActu().subscribe(actus => this.actus = actus);
  }
  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  private fetchAllFavorieById(id : number) {
    this._adminService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  saveDelete(idActu: number) {
    this.DeleteNot.push(idActu);
    localStorage.setItem('DeleteNot', JSON.stringify(this.DeleteNot));
    console.log(this.DeleteNot);
  }

  saveSee(idActu: number) {
    this.seeNot.push(idActu);
    localStorage.setItem('seeNot', JSON.stringify(this.seeNot));
    console.log(this.seeNot);
  }

  getUser() {
    try {
      // @ts-ignore
      this.id = jwtDecode(this._cook.get('UserInfo')).id

    } catch (error) {

    }
  }
}
