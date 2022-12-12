import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {DtoInputComments} from "../dtos/dto-input-comments";
import {DtoInputUser} from "../dtos/dto-input-user";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: DtoInputMovie | null = null;
  rating: DtoInputRatingMovie | null = null;
  user: DtoInputUser | null = null;
  comments : DtoInputComments[] = [];

  constructor(private _movieService: MovieService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("movieid")) {
        const movieId = Number(args.get("movieid"));
        this.fetchMovieData(movieId);
        this.fetchByRating(movieId);
        this.fetchAllCommentById(movieId);
      }
    });
  }

  private fetchMovieData(id: number) {
    this._movieService
      .fetchById(id)
      .subscribe(movie => this.movie = movie);
  }

  private fetchByRating(id: number){
    this._movieService
      .fetchByRating(id)
      .subscribe(rating => this.rating = rating);
  }

  private fetchAllCommentById(id : number){
    this._movieService
      .fetchAllCommentById(id)
      .subscribe(comment => this.comments = comment);
  }

  fetchByIdUser(id : number){
    this._movieService
      .fetchByIdUser(id)
      .subscribe(user => this.user = user);

    return this.user;
  }
}
