import { Component, OnInit } from '@angular/core';
import {DtoInputFavorie} from "./dtos/dto-input-favorie";
import {FavorieService} from "./favorie.service";
import {DtoInputMovie} from "../adminhub/dtos/dto-input-movie";

@Component({
  selector: 'app-favorihub',
  templateUrl: './favorihub.component.html',
  styleUrls: ['./favorihub.component.css']
})
export class FavorihubComponent implements OnInit {
  favories : DtoInputFavorie[] = [];
  movies : DtoInputMovie[] = [];

  constructor(private _favorieService: FavorieService) { }

  ngOnInit(): void {
    this.fetchAllMovie();
    this.fetchAllFavorieById(1);
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
}
