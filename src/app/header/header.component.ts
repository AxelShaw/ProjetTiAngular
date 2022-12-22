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
  //all movie 5 search
  searchMovies: DtoInputMovie[] = [];
  //all actu
  actus: DtoInputActu[] = [];
  //all favorite
  favories : DtoInputFavorie[] = [];
  temp : number = 0;
  //localstorage
  DeleteNot : number[] = [];
  //localstorage
  seeNot : number[] = [];
  //id user cookie
  id : number = 0;

  constructor(private _movieService: MovieService, private _cook: CookieService, private _route : Router) {
  }

  //get user and actus and favorite by id and initial localstorage
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

  //get all news
  private fetchAllActu() {
    this._movieService.fetchAllActu().subscribe(actus => this.actus = actus);
  }

  //get all search by anme
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

  //get input delay
  selectInput( delay = 100) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      this.searchMovies = [];
    }, delay);
  }

  //nb notification
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
    if(localStorage.getItem('DeleteNot') != null){
      // @ts-ignore
      this.DeleteNot = JSON.parse(localStorage.getItem(`DeleteNot`));
    }
    if(localStorage.getItem('seeNot') != null){
      // @ts-ignore
      this.seeNot = JSON.parse(localStorage.getItem(`seeNot`));
    }
    return this.temp;
  }
  //get all favorite by id
  private fetchAllFavorieById(id : number) {
    this._movieService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  // test if admin cookie
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

  //get login
  testLog() {
    try{
      // @ts-ignore
      jwtDecode(this._cook.get('UserInfo'))
      return true;
    }catch (error){
      return false;
    }
  }

  //delete cookie
  deleteCookie() {
    this._cook.delete('UserInfo', '/');
    this._route.navigate(['../home']);
  }

  //get user
  getUser() {
    try {
      // @ts-ignore
      this.id = jwtDecode(this._cook.get('UserInfo')).id

    } catch (error) {

    }
  }

}
