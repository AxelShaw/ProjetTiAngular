import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-movie-top100',
  templateUrl: './movie-top100.component.html',
  styleUrls: ['./movie-top100.component.css']
})
export class MovieTop100Component implements OnInit {
  movies: DtoInputMovie[] = [];
  ratings : DtoInputRatingMovie[] = [];
  page : number ;
  item : number = 12;

  constructor(private _movieService: MovieService) {

  }

  ngOnInit(): void {
    this.fetchAll();
    this.fetchAllRating();
  }

  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  private fetchAllRating() {
    this._movieService.fetchAllRatingTop().subscribe(rating => this.ratings = rating);
  }

  Tri(genre: string) {
    if(genre == ''){
      this.item = 12;
      this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
    }else{
      this.item = 100;
      this._movieService.fetchAllByGenre(genre).subscribe(movies => this.movies = movies)
    }
  }
}
