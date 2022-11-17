import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchMovies: DtoInputMovie[] = [];

  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
  }

  search(chaine: HTMLInputElement) {
    let name = chaine.value;
    name = name.trim();
    if(name.length){
      this._movieService.fetchAll().subscribe(
        (movies) => {
          this.searchMovies = movies;
        }
      );
    }else{
      this.searchMovies = [];
    }
  }

  selectMovie(movie: DtoInputMovie) {

  }
}
