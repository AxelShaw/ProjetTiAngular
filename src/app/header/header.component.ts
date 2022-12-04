import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {MovieService} from "../moviehub/movie.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchMovies: DtoInputMovie[] = [];

  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this.searchMovies = [];
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
            while (this.searchMovies.length > 5){
              this.searchMovies.pop();
            }
          }
        );
      }else{
        this.searchMovies = [];
      }
    }, delay);
  }

  selectInput() {
    this.searchMovies = [];
  }
}
