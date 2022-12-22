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
  //input movie list
  movies: DtoInputMovie[] = [];
  //input rating list
  ratings : DtoInputRatingMovie[] = [];
  //nb page
  page : number ;
  //nb item by page
  item : number = 12;

  constructor(private _movieService: MovieService) { }

  //get all movie and rating
  ngOnInit(): void {
    this.fetchAll();
    this.fetchAllRating();
  }

  //get all movie
  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  //get all rating
  private fetchAllRating() {
    this._movieService.fetchAllRatingDown().subscribe(rating => this.ratings = rating);
  }

  //sort by genre
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
