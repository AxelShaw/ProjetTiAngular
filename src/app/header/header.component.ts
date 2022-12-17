import {Component, HostListener, OnInit} from '@angular/core';
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
}
