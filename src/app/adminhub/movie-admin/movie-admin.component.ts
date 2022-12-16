import {Component, OnInit} from '@angular/core';
import {DtoOutputCreateMovie} from "../dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "../dtos/dto-output-create-ratingmovie";
import {AdminService} from "../admin.service";
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoInputRatingMovie} from "../../moviehub/dtos/dto-input-rating-movie";
import {Observable, Subscriber} from "rxjs";
import {DtoInputComments} from "../../moviehub/dtos/dto-input-comments";

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  ratings: DtoInputRatingMovie [] = [];
  comments: DtoInputComments [] = [];
  movieCreated: DtoOutputCreateMovie | null = null;
  ratingCreated: DtoOutputCreateRatingmovie | null = null;
  form : FormGroup;
  formRating : FormGroup;
  imageData : "";
  rating: boolean = false;
  searchMovies: DtoInputMovie[] = [];


  constructor(private _fb: FormBuilder, private _adminService: AdminService) {
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

  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  emitMovieCreated() {

    this.form.controls['imageMovie'].setValue(this.imageData);
    console.log(this.form.value);
    this.movieCreated = this.form.value;
    this._adminService.createMovie(this.movieCreated).subscribe(movie => this.movies.push(movie));
    this.form.reset();
    this.setRating();
    this.movieCreated = null;
  }

  emitMovieDeleted(movie: DtoInputMovie){
    if (confirm("Êtes-vous sur de vouloir supprimer ce film ? ")) {
      this._adminService.deleteRatingMovie(movie.idMovie).subscribe(() => {
        this.ratings = this.ratings.filter(ratings => ratings.movieRefId !== movie.idMovie);
      });

      this._adminService.deleteCommentMovie(movie.idMovie).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idMovieRef !== movie.idMovie);
      });

    }

    this._adminService.deleteMovie(movie.idMovie).subscribe(() => {
        this.movies = this.movies.filter(movies => movies.idMovie !== movie.idMovie);
    });
    this.searchMovies = [];
  }

  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
  }

  getImage(event: Event) {
    const file1=(event.target as HTMLInputElement).files;
    let file;
    if(file1){
      file = file1[0];
    }
    // @ts-ignore
    this.convertToBase64(file);
  }

  convertToBase64(file : File){
    const observable = new Observable((subscriber: Subscriber<any>)=>{
      this.readFile(file,subscriber);
    });
    observable.subscribe((d)=>{
      this.imageData = d.slice(22);

    })
  }

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

  setRating() {
    this.rating = true;
  }

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
}
