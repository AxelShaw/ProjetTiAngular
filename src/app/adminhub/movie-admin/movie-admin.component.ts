import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DtoOutputCreateMovie} from "../dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "../dtos/dto-output-create-ratingmovie";
import {DtoOutputCreateCommentmovie} from "../dtos/dto-output-create-commentmovie";
import {AdminService} from "../admin.service";
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {DtoInputRatingmovie} from "../dtos/dto-input-ratingmovie";
import {DtoInputCommentmovie} from "../dtos/dto-input-commentmovie";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
  @Output()
  movieCreated: EventEmitter<DtoOutputCreateMovie> = new EventEmitter<DtoOutputCreateMovie>();
  @Output()
  ratingmovieCreated: EventEmitter<DtoOutputCreateRatingmovie> = new EventEmitter<DtoOutputCreateRatingmovie>();
  commentmovieCreated: EventEmitter<DtoOutputCreateCommentmovie> = new EventEmitter<DtoOutputCreateCommentmovie>();
  ngDropdown = "streaming";

  form: FormGroup = this._fb.group({
    nameMovie: ['', Validators.required],
    runtimeMinute: [0, [Validators.required, Validators.min(1)]],
    movieType: ['', Validators.required],
    descriptionMovie: ['', Validators.required],
    imageMovie: ['assets/movie/', Validators.required],
    filmGenre: ['', Validators.required],
    director: ['', Validators.required],
    release_movie: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  emitRatingMovieCreated() {
    this.ratingmovieCreated.next({
      average_rating: 0,
      numVote: 0,
      movieRefId: 23
    });
    this.form.reset();
  }
  emitMovieCreated() {
    this.movieCreated.next({
      nameMovie: this.form.value.nameMovie,
      runtimeMinute: this.form.value.runtimeMinute,
      movieType: this.form.value.movieType,
      descriptionMovie: this.form.value.descriptionMovie,
      imageMovie: this.form.value.imageMovie,
      filmGenre: this.form.value.filmGenre,
      director: this.form.value.director,
      release_movie: this.form.value.release_movie
    });
    this.form.reset();
  }

  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }
}
