import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../admin.service";
import {DatePipe, formatDate} from "@angular/common";
import {DtoInputMovie} from "../dtos/dto-input-movie";

@Component({
  selector: 'app-movie-actu',
  templateUrl: './movie-actu.component.html',
  styleUrls: ['./movie-actu.component.css']
})
export class MovieActuComponent implements OnInit {
  form : FormGroup;
  maDate = new Date();
  searchMovies: DtoInputMovie[] = [];
  movies: DtoInputMovie[] = [];

  movieName : string = "";
  idMovie : number = 0;

  constructor(private _fb: FormBuilder, private _adminService: AdminService) {

    this.form = this._fb.group({
      idMovieRef: 0,
      newsActu: new FormControl(),
      release_actu: ""
    });
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  emitActuCreated() {
    this.form.controls['release_actu'].setValue(this.maDate.toLocaleDateString());
    this.form.controls['idMovieRef'].setValue(this.idMovie);
    console.log(this.form.value);
    this.form.reset();
  }

  control(nameMovie: string): AbstractControl | null {
    return this.form.get(nameMovie);
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

  select(movie: DtoInputMovie) {
    this.movieName = movie.nameMovie;
    this.idMovie = movie.idMovie;
  }

  endInput() {
    this.searchMovies = [];
    this.movieName = "";
  }
}
