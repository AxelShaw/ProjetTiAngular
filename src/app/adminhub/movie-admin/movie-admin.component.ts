import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DtoOutputCreateMovie} from "../dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "../dtos/dto-output-create-ratingmovie";
import {DtoOutputCreateCommentmovie} from "../dtos/dto-output-create-commentmovie";
import {AdminService} from "../admin.service";
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {DtoInputRatingmovie} from "../dtos/dto-input-ratingmovie";
import {DtoInputCommentmovie} from "../dtos/dto-input-commentmovie";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateComment} from "../../moviehub/dtos/dto-output-create-comment";
import {DtoInputRatingMovie} from "../../moviehub/dtos/dto-input-rating-movie";

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  ratingmovies: DtoInputRatingmovie[] = [];
  moviesMax: DtoInputMovie | null = null;

  movieCreated: DtoOutputCreateMovie | null = null;
  ratingmovieCreated: DtoOutputCreateRatingmovie | null = null;
  form : FormGroup;
  ngDropdown = "streaming";



  constructor(private _fb: FormBuilder, private _adminService: AdminService) {
    this.form = this._fb.group({
      nameMovie: new FormControl(),
      runtimeMinute: new FormControl([0, [Validators.required, Validators.min(1)]]),
      movieType: new FormControl(['', Validators.required]),
      descriptionMovie: new FormControl(['', Validators.required]),
      imageMovie: new FormControl(['test', Validators.required]),
      filmGenre: new FormControl(['', Validators.required]),
      director: new FormControl(['', Validators.required]),
      release_movie: new FormControl(['', Validators.required]),

    });

  }

  ngOnInit(): void {
  }

  emitRatingMovieCreated(rate : DtoInputRatingMovie) {

    this.ratingmovieCreated = rate;
    this.ratingmovieCreated.numVote = 0;
    this.ratingmovieCreated.average_rating = 0;
    //this.ratingmovieCreated.movieRefId = this.fetchLastId();

    this._adminService.createRatingMovie(this.ratingmovieCreated).subscribe(ratingmovie => this.ratingmovies.push(ratingmovie));
  }

  emitMovieCreated() {
    this.movieCreated = this.form.value;
    this._adminService.createMovie(this.movieCreated).subscribe(movie => this.movies.push(movie));
  }

  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }

  fetchLastId(){
    return this._adminService.fetchLastId().subscribe(movieMax => this.moviesMax = movieMax);
  }

}
