import {Component, HostListener, OnInit} from '@angular/core';
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {MovieService} from "../moviehub/movie.service";
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchMovies: DtoInputMovie[] = [];
  actus: DtoInputActu[] = [];
  favories : DtoInputFavorie[] = [];
  temp : number = 0;
  DeleteNot : number[] = [];
  seeNot : number[] = [];
  id : number = 0;

  constructor(private _movieService: MovieService, private _cook: CookieService, private _route : Router) {
  }

  ngOnInit(): void {
    this.getUser();
    this.searchMovies = [];
    this.fetchAllActu();
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
    this._movieService.fetchAllActu().subscribe(actus => this.actus = actus);
  }

  search(chaine: HTMLInputElement , delay = 700) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      let name = chaine.value;
      name = name.trim();
      if(name.length){
        this._movieService.fetchByName(name).subscribe(
          (movies) => {
            // @ts-ignore
            this.searchMovies = movies;
          }
        );
      }else{
        this.searchMovies = [];
      }
    }, delay);
  }

  selectInput( delay = 100) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      this.searchMovies = [];
    }, delay);
  }

  nbNot() {
    this.temp = 0;
    if(this.favories != null && this.actus!= null){
      for(let i = 0; i < this.actus.length; i++){
        for(let j = 0; j < this.favories.length; j++){
          if(this.actus[i].idMovieRef == this.favories[j].idMovieRef){
            if(!this.seeNot.includes(this.actus[i].idActu) && !this.DeleteNot.includes(this.actus[i].idActu)) {
                this.temp = this.temp +1;
            }
          }
        }
      }

    }
    return this.temp;
  }
  private fetchAllFavorieById(id : number) {
    this._movieService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  testAdmin() {
    try{
      // @ts-ignore
      if(jwtDecode(this._cook.get('UserInfo')).Role == 'admin'){
        return true;
      }
      return false;
    }catch (error){
      return false;
    }
  }

  testLog() {
    try{
      // @ts-ignore
      jwtDecode(this._cook.get('UserInfo'))
      return true;
    }catch (error){
      return false;
    }
  }

  deleteCookie() {
    this._cook.delete('UserInfo');
    this._route.navigate(['../home']);
  }

  getUser() {
    try {
      // @ts-ignore
      this.id = jwtDecode(this._cook.get('UserInfo')).id

    } catch (error) {

    }
  }

}
