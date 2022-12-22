import {Component, EventEmitter, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {ActivatedRoute} from "@angular/router";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {DtoInputComments} from "../dtos/dto-input-comments";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoOutputCreateComment} from "../dtos/dto-output-create-comment";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DtoOutputUpdateRating} from "../dtos/dto-output-update-rating";
import {DtoOutputCreateFavorie} from "../dtos/dto-output-create-favorie";
import {DtoInputFavorie} from "../dtos/dto-input-favorie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";



@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  //movie
  movie: DtoInputMovie | null = null;
  //rating
  rating: DtoInputRatingMovie | null = null;
  //list user
  users: DtoInputUser [] = [];
  //liste favorite
  favories: DtoInputFavorie [] = [];
  //liste comment
  comments : DtoInputComments[] = [];
  //create comment
  createComment : DtoOutputCreateComment | null = null;
  //create favorite
  createFavorie : DtoOutputCreateFavorie | null = null;
  //create update
  updateRating : DtoOutputUpdateRating | null = null;
  //crate form
  form : FormGroup;
  //create favorite
  formFavorie : FormGroup;
  val : boolean = true;
  //is user cookie
  idUser : number = 0;
  //nb page
  page : number ;
  //nb item by page
  item : number = 12;

  //form create rating and favorite
  constructor(private _movieService: MovieService, private _route: ActivatedRoute, private _fb: FormBuilder, private _cook:CookieService) {
    this.form = this._fb.group({
      rating: new FormControl(),
      commentText: new FormControl(''),
      idMovieRef: 0,
      idUserRef: 0
    });

    this.formFavorie = this._fb.group({
      idMovieRef: 0,
      idUserRef: 0,
    });
  }

  //get user and get movie by id and rating by id and comment by id and all favorites and all user
  ngOnInit(): void {
    this.GetUser();
    this._route.paramMap.subscribe(args => {
      if (args.has("movieid")) {
        const movieId = Number(args.get("movieid"));
        this.fetchMovieData(movieId);
        this.fetchByRating(movieId);
        this.fetchAllCommentById(movieId);
      }
      this.fetchAllFavorie(this.idUser);
      this.fetchAllUser();
    });
  }

  //get movie detail
  private fetchMovieData(id: number) {
    this._movieService
      .fetchById(id)
      .subscribe(movie => this.movie = movie);
  }

  //get rating detail
  private fetchByRating(id: number){
    this._movieService
      .fetchByRating(id)
      .subscribe(rating => this.rating = rating);
  }

  //get all comment by id
  private fetchAllCommentById(id : number){
    this._movieService
      .fetchAllCommentById(id)
      .subscribe(comment => this.comments = comment);
  }

  //gat all user
  private fetchAllUser(){
    this._movieService.fetchAllUser().subscribe(user => this.users = user);
  }

  //delete comment
  DeleteComment(comment: DtoInputComments, rate : DtoInputRatingMovie) {
    //ask confimation
    if (confirm("Êtes-vous sur de vouloir supprimer ce commentaire ? ")) {
      this._movieService.deleteCommentById(comment.idComMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idComMovie !== comment.idComMovie);
      });
      this.updateRating = rate;
      //if it's last vote or not
      if(this.updateRating.numVote <= 1){
        this.updateRating.average_rating = 0;
        this.updateRating.numVote = 0;
      }else{
        this.updateRating.average_rating = ((this.updateRating.average_rating * this.updateRating.numVote) - comment.rating)/(this.updateRating.numVote - 1);
        this.updateRating.numVote = this.updateRating.numVote - 1;
      }


      this._movieService.updateRate(this.updateRating).subscribe();
    }
  }

  //create comment
  emitCommentCreated(id : number, rate : DtoInputRatingMovie) {
    this.val = true;
    let idUser : number = 0;
    //get cookie for comment
    try{
      // @ts-ignore
      idUser = jwtDecode(this._cook.get('UserInfo')).id
    }catch (error){

    }
    //set form for create
    this.form.controls['idMovieRef'].setValue(id);
    this.form.controls['idUserRef'].setValue(idUser);
    this.createComment = this.form.value;
    //check if it's already her
    for (let i = 0; i < this.comments.length; i++){
       if(idUser == this.comments[i].idUserRef){
         this.val = false;
       }
    }
    //create if not already her
    if(this.val == true){
      this._movieService.createComment(this.createComment).subscribe(comment => this.comments.push(comment))

      this.updateRating = rate;

      //update rating
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

  //control form
  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }

  //add favorites user
  addFavorie(idMovie: number) {
    let stop: number = 0;
    let id: number = 0;
    let idUser : number = 0;
    //get user cookie
    try{
      // @ts-ignore
      idUser = jwtDecode(this._cook.get('UserInfo')).id
    }catch (error){

    }
    //check fav or not
    for (let i = 0; i < this.favories.length; i++) {
      if (this.favories[i].idMovieRef == idMovie && this.favories[i].idUserRef == idUser) {
        stop = 1;
        id = this.favories[i].idFav;
      }
    }
    if (stop == 0) {
      //set form
      this.formFavorie.controls['idUserRef'].setValue(idUser);
      this.formFavorie.controls['idMovieRef'].setValue(idMovie);
      this.createFavorie = this.formFavorie.value;
      this._movieService.createFavorie(this.createFavorie).subscribe(fav => this.favories.push(fav))
    } else {
      //confirmation
      if (confirm("Êtes-vous sur de vouloir supprimer ce favorie ? ")) {
        document.getElementById("star2") as HTMLImageElement;
        this._movieService.deleteIdFavorie(id).subscribe(() => {
          this.favories = this.favories.filter(fav => fav.idFav !== idMovie);
        });
      }
    }
  }

  //get all favorites
  private fetchAllFavorie(id : number) {
    this._movieService
      .fetchByIdFavorie(id)
      .subscribe(fav => this.favories = fav);
  }

  //check if it's already favorite
  alreadyFav(idMovie: number){
    let stop: number = 0;
    let idUser : number = 0;
    try{
      // @ts-ignore
      idUser = jwtDecode(this._cook.get('UserInfo')).id
    }catch (error){

    }
    for (let i = 0; i < this.favories.length; i++) {
      if (this.favories[i].idMovieRef == idMovie && this.favories[i].idUserRef == idUser) {
        stop = 1;
      }
    }
    if (stop == 0) {
      return true;
    } else {
      return false;
      }
    }

    //check if connect to cookie
  connect() {
    try{
      if(jwtDecode(this._cook.get('UserInfo'))){
        return true;
      }
      return false;
    }catch (error){
      return false;
    }
  }

  //check if connect to admin
  connectAdmin() {
    try{
      // @ts-ignore
      if(jwtDecode(this._cook.get('UserInfo')).Role == 'admin'){
        return true;
      }
      return false;
    }catch (error){
      return false;
    }
  }

  //get user cookie
  GetUser(){
    try{
      // @ts-ignore
      this.idUser = jwtDecode(this._cook.get('UserInfo')).id
    }catch (error){

    }
  }
}
