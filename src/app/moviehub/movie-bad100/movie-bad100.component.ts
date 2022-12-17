import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-movie-bad100',
  templateUrl: './movie-bad100.component.html',
  styleUrls: ['./movie-bad100.component.css']
})
export class MovieBad100Component implements OnInit {
  movies: DtoInputMovie[] = [];
  ratings : DtoInputRatingMovie[] = [];
  page : number ;

  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this.fetchAll();
    this.fetchAllRating();
  }

  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  private fetchAllRating() {
    this._movieService.fetchAllRatingDown().subscribe(rating => this.ratings = rating);
  }

  Tri(genre: string) {
    this._movieService.fetchAllByGenre(genre).subscribe(movies => this.movies = movies)
  }
}
