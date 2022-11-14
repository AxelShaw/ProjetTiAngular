import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: DtoInputMovie | null = null;

  constructor(private _movieService: MovieService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("movieid")) {
        const movieId = Number(args.get("movieid"));
        this.fetchUserData(movieId);
      }
    });
  }

  private fetchUserData(id: number) {
    this._movieService
      .fetchById(id)
      .subscribe(movie => this.movie = movie);
  }
}
