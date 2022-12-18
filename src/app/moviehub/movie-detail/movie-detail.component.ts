import {Component, EventEmitter, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {DtoInputComments} from "../dtos/dto-input-comments";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoOutputCreateComment} from "../dtos/dto-output-create-comment";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputUpdateRating} from "../dtos/dto-output-update-rating";
import {observable, Observable, Subject} from "rxjs";
import {DtoOutputCreateFavorie} from "../dtos/dto-output-create-favorie";
import {DtoInputFavorie} from "../dtos/dto-input-favorie";


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: DtoInputMovie | null = null;
  rating: DtoInputRatingMovie | null = null;
  users: DtoInputUser [] = [];
  favories: DtoInputFavorie [] = [];
  comments : DtoInputComments[] = [];
  createComment : DtoOutputCreateComment | null = null;
  createFavorie : DtoOutputCreateFavorie | null = null;
  updateRating : DtoOutputUpdateRating | null = null;
  form : FormGroup;
  formFavorie : FormGroup;
  val : boolean = true;

  constructor(private _movieService: MovieService, private _route: ActivatedRoute, private _fb: FormBuilder) {
    this.form = this._fb.group({
      rating: new FormControl(),
      commentText: new FormControl(''),
      idMovieRef: 0,
      idUserRef: 1
    });

    this.formFavorie = this._fb.group({
      idMovieRef: 0,
      idUserRef: 1,
    });
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("movieid")) {
        const movieId = Number(args.get("movieid"));
        this.fetchMovieData(movieId);
        this.fetchByRating(movieId);
        this.fetchAllCommentById(movieId);
      }
      this.fetchAllFavorie(1);
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

  DeleteComment(comment: DtoInputComments, rate : DtoInputRatingMovie) {
    if (confirm("Êtes-vous sur de vouloir supprimer ce commentaire ? ")) {
      this._movieService.deleteCommentById(comment.idComMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idComMovie !== comment.idComMovie);

        this.updateRating = rate;
        if(this.updateRating.numVote == 1){
          this.updateRating.average_rating = ((this.updateRating.average_rating * this.updateRating.numVote) - comment.rating);
        }else{
          this.updateRating.average_rating = ((this.updateRating.average_rating * this.updateRating.numVote) - comment.rating)/(this.updateRating.numVote - 1);
        }

        this.updateRating.numVote = this.updateRating.numVote - 1;
        this._movieService.updateRate(this.updateRating).subscribe();
      });
    }
  }

  emitCommentCreated(id : number, rate : DtoInputRatingMovie) {
    this.form.controls['idMovieRef'].setValue(id);
    this.createComment = this.form.value;
    for (let i = 0; i < this.comments.length; i++){
       if(1 == this.comments[i].idUserRef){
         this.val = false;
       }
    }
    if(this.val == true){
      this._movieService.createComment(this.createComment).subscribe(comment => this.comments.push(comment))

      this.updateRating = rate;

      if(this.updateRating.numVote == 0){
        this.updateRating.average_rating = this.form.get('rating')?.value;
        this.updateRating.numVote = this.updateRating.numVote + 1;
      }else{
        this.updateRating.average_rating = ((this.updateRating.average_rating * this.updateRating.numVote) + this.form.get('rating')?.value) /(this.updateRating.numVote +1);
        this.updateRating.numVote = this.updateRating.numVote + 1;
      }

      this._movieService.updateRate(this.updateRating).subscribe();
      this.form.reset();

    }
  }

  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }

  addFavorie(idMovie: number) {
    let stop: number = 0;
    let id: number = 0;
    for (let i = 0; i < this.favories.length; i++) {
      if (this.favories[i].idMovieRef == idMovie && this.favories[i].idUserRef == 1) {
        stop = 1;
        id = this.favories[i].idFav;
      }
    }
    if (stop == 0) {
      this.formFavorie.controls['idMovieRef'].setValue(idMovie);
      this.createFavorie = this.formFavorie.value;
      this._movieService.createFavorie(this.createFavorie).subscribe(fav => this.favories.push(fav))
    } else {
      if (confirm("Êtes-vous sur de vouloir supprimer ce favories ? ")) {
        document.getElementById("star2") as HTMLImageElement;
        this._movieService.deleteIdFavorie(id).subscribe(() => {
          this.favories = this.favories.filter(fav => fav.idFav !== idMovie);
        });
      }
    }
  }

  private fetchAllFavorie(id : number) {
    this._movieService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  alreadyFav(idMovie: number){
    let stop: number = 0;

    for (let i = 0; i < this.favories.length; i++) {
      if (this.favories[i].idMovieRef == idMovie && this.favories[i].idUserRef == 1) {
        stop = 1;
      }
    }
    if (stop == 0) {
      return true;
    } else {
      return false;
      }
    }
}
