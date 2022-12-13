import {Component, EventEmitter, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {DtoInputComments} from "../dtos/dto-input-comments";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoOutputCreateComment} from "../dtos/dto-output-create-comment";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: DtoInputMovie | null = null;
  rating: DtoInputRatingMovie | null = null;
  users: DtoInputUser [] = [];
  comments : DtoInputComments[] = [];
  createComment : DtoOutputCreateComment | null = null;
  form : FormGroup;

  constructor(private _movieService: MovieService, private _route: ActivatedRoute, private _fb: FormBuilder) {
    this.form = this._fb.group({
      rating: new FormControl(),
      commentText: new FormControl(''),
      idMovieRef: 0,
      idUserRef: 1
    })
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("movieid")) {
        const movieId = Number(args.get("movieid"));
        this.fetchMovieData(movieId);
        this.fetchByRating(movieId);
        this.fetchAllCommentById(movieId);
      }
      this.fetchAllUser();
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

  private fetchAllUser(){
    this._movieService.fetchAllUser().subscribe(user => this.users = user);
  }

  DeleteComment(comment: DtoInputComments) {
    if (confirm("Êtes-vous sur de vouloir supprimer ce commentaire ? ")) {
      this._movieService.deleteComment(comment.idComMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idComMovie !== comment.idComMovie);
      });
    }
  }

  emitCommentCreated(id : number) {
    this.form.controls['idMovieRef'].setValue(5);
    this.createComment = this.form.value;
    this._movieService.createComment(this.createComment).subscribe(comment => this.comments.push(comment))
  }
}
