import { Component, OnInit } from '@angular/core';
import {DtoInputFavorie} from "./dtos/dto-input-favorie";
import {FavorieService} from "./favorie.service";
import {DtoInputMovie} from "../adminhub/dtos/dto-input-movie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-favorihub',
  templateUrl: './favorihub.component.html',
  styleUrls: ['./favorihub.component.css']
})
export class FavorihubComponent implements OnInit {
  favories : DtoInputFavorie[] = [];
  movies : DtoInputMovie[] = [];
  id : number = 0;

  constructor(private _favorieService: FavorieService, private _cook : CookieService) { }

  ngOnInit(): void {
    this.getUser();
    this.fetchAllMovie();
    this.fetchAllFavorieById(this.id);
  }

  private fetchAllFavorieById(id : number) {
    this._favorieService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  private fetchAllMovie() {
    this._favorieService.fetchAllMovie().subscribe(movie => this.movies = movie);
  }


  emitFavoriDeleted(favorie: DtoInputFavorie) {
    if (confirm("Êtes-vous sur de vouloir supprimer ce favorie ? ")) {
      this._favorieService.deleteFavoriteById(favorie.idFav).subscribe(() => {
        this.favories = this.favories.filter(favories => favories.idFav !== favorie.idFav);
      });
    }
  }

  getUser(){
    try{
      // @ts-ignore
      this.id = jwtDecode(this._cook.get('UserInfo')).id

    }catch (error){

    }
  }
}
