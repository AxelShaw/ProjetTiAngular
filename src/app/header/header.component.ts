import {Component, HostListener, OnInit} from '@angular/core';
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {MovieService} from "../moviehub/movie.service";
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {AdminService} from "../adminhub/admin.service";
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";

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


  constructor(private _movieService: MovieService) {
  }

  ngOnInit(): void {
    this.searchMovies = [];
    this.fetchAllActu();
    this.fetchAllFavorieById(1);

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

}
