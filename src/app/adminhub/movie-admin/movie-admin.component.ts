import {Component, OnInit} from '@angular/core';
import {DtoOutputCreateMovie} from "../dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "../dtos/dto-output-create-ratingmovie";
import {AdminService} from "../admin.service";
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DtoInputRatingMovie} from "../../moviehub/dtos/dto-input-rating-movie";
import {Observable, Subscriber} from "rxjs";
import {DtoInputComments} from "../../moviehub/dtos/dto-input-comments";
import {DtoOutputUpdateMovie} from "../dtos/dto-output-update-movie";
import {DtoInputFavorie} from "../../favorihub/dtos/dto-input-favorie";
import {DtoInputActu} from "../dtos/dto-intput-actu";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
  //get all movies
  movies: DtoInputMovie[] = [];
  //movie update
  moviesUpdated: DtoOutputUpdateMovie | null = null;
  //all ratings
  ratings: DtoInputRatingMovie [] = [];
  //get all comment
  comments: DtoInputComments [] = [];
  //get all favorites
  favories: DtoInputFavorie [] = [];
  //get all news
  actus: DtoInputActu [] = [];
  //movie create
  movieCreated: DtoOutputCreateMovie | null = null;
  //rating create
  ratingCreated: DtoOutputCreateRatingmovie | null = null;
  //form movie
  form : FormGroup;
  //form rating
  formRating : FormGroup;
  //image movie
  imageData : "";
  rating: boolean = false;
  //search movie all
  searchMovies: DtoInputMovie[] = [];

//form movie and rating
  constructor(private _fb: FormBuilder, private _adminService: AdminService,private _cook:CookieService) {
    //set new form for movie
    this.form = this._fb.group({
      nameMovie: new FormControl(),
      runtimeMinute: new FormControl(),
      movieType: new FormControl(),
      descriptionMovie: new FormControl(),
      imageMovie: new FormControl(),
      filmGenre: new FormControl(),
      director: new FormControl(),
      release_movie: new FormControl()
    });
    //set new form for rating
    this.formRating = this._fb.group({
      average_rating: new FormControl(),
      numVote: new FormControl(),
      movieRefId: new FormControl()
    });

  }

  ngOnInit(): void {
    this.fetchAll();
    this.searchMovies = [];
  }

  //gat all movie
  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }


  //create a movie and set rating
  emitMovieCreated() {

    this.form.controls['imageMovie'].setValue(this.imageData);
    console.log(this.form.value);
    this.movieCreated = this.form.value;
    this._adminService.createMovie(this.movieCreated).subscribe(movie => this.movies.push(movie));
    this.form.reset();
    this.setRating();
    this.movieCreated = null;
  }
  //update movie with value of form
  emitMovieUpdated(update : DtoInputMovie, FormGroup: any){
    this.moviesUpdated = update;
    if (confirm("Êtes-vous sur de vouloir modifier ce film ? ")) {
      if(FormGroup.invalid==true){
        this.form.controls['nameMovie'].setValue(this.moviesUpdated.nameMovie);
        this.form.controls['runtimeMinute'].setValue(this.moviesUpdated.runtimeMinute);
        this.form.controls['descriptionMovie'].setValue(this.moviesUpdated.descriptionMovie);
        this.form.controls['movieType'].setValue(this.moviesUpdated.movieType);
        this.form.controls['imageMovie'].setValue(this.moviesUpdated.imageMovie);
        this.form.controls['release_movie'].setValue(this.moviesUpdated.release_movie);
        this.form.controls['director'].setValue(this.moviesUpdated.director);
        this.form.controls['filmGenre'].setValue(this.moviesUpdated.filmGenre);
      }
    }
    this.moviesUpdated.nameMovie = this.form.value.nameMovie;
    this.moviesUpdated.runtimeMinute = this.form.value.runtimeMinute;
    this.moviesUpdated.descriptionMovie = this.form.value.descriptionMovie;
    this.moviesUpdated.movieType = this.form.value.movieType;
    this.moviesUpdated.imageMovie = this.form.value.imageMovie;
    this.moviesUpdated.release_movie = this.form.value.release_movie;
    this.moviesUpdated.director = this.form.value.director;
    this.moviesUpdated.filmGenre = this.form.value.filmGenre;

    this._adminService.update(this.moviesUpdated).subscribe();
  }

  //delete movie with his ratings, comments, favori and news
  emitMovieDeleted(movie: DtoInputMovie){
    if (confirm("Êtes-vous sur de vouloir supprimer ce film ? ")) {
      this._adminService.deleteRatingMovie(movie.idMovie).subscribe(() => {
        this.ratings = this.ratings.filter(ratings => ratings.movieRefId !== movie.idMovie);
      });

      this._adminService.deleteCommentMovie(movie.idMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idMovieRef !== movie.idMovie);
      });

      this._adminService.deleteCommentByMovie(movie.idMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idMovieRef !== movie.idMovie);
      });

      this._adminService.deleteFavovieByMovie(movie.idMovie).subscribe(() => {
        this.favories = this.favories.filter(favories => favories.idMovieRef !== movie.idMovie);
      });

      this._adminService.deleteActu(movie.idMovie).subscribe(() => {
        this.actus = this.actus.filter(actus => actus.idMovieRef !== movie.idMovie);
      });
    }

    this._adminService.deleteMovie(movie.idMovie).subscribe(() => {
        this.movies = this.movies.filter(movies => movies.idMovie !== movie.idMovie);
    });
    this.searchMovies = [];
  }
  //verification if input are dirty or invalid
  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }

  //get image and convert to base 64
  getImage(event: Event) {
    const file1=(event.target as HTMLInputElement).files;
    let file;
    if(file1){
      file = file1[0];
    }
    // @ts-ignore
    this.convertToBase64(file);
  }

  //convet image to base 64
  convertToBase64(file : File){
    const observable = new Observable((subscriber: Subscriber<any>)=>{
      this.readFile(file,subscriber);
    });
    observable.subscribe((d)=>{
      this.imageData = d.slice(22);

    })
  }

  //read file imgae
  readFile(file : File, subscriber: Subscriber<any>){
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }

    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();

    }
  }

  //set rating movie
  setRating() {
    this.rating = true;
  }

  //rating set
  ratingSet() {
    this.fetchAll();

    this.formRating.controls['average_rating'].setValue(0);
    this.formRating.controls['numVote'].setValue(0);
    this.formRating.controls['movieRefId'].setValue(this.movies[this.movies.length-1].idMovie);

    this.ratingCreated = this.formRating.value;

    this._adminService.createRatingMovie(this.ratingCreated).subscribe(rating => this.ratings.push(rating));

    this.rating = false;

    this.formRating.reset();
  }
  //search movie
  search(chaine: HTMLInputElement , delay = 700) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      let name = chaine.value;
      name = name.trim();
      if(name.length){
        this._adminService.fetchByName(name).subscribe(
          (movies) => {
            // @ts-ignore
            this.searchMovies = movies;
          }
        );
      }else{
        this.searchMovies = [];
      }
    }, delay);
  }

  //connecct admin
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
}
