import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../admin.service";
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {DtoOutputCreateActu} from "../dtos/dto-output-create-actu";
import {DtoInputActu} from "../dtos/dto-intput-actu";

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
  actuCreated: DtoOutputCreateActu | null = null;
  actus: DtoInputActu[] = [];
  myDate = new Date();

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
    this.fetchAllActu();
  }

  private fetchAll() {
    this._adminService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }
  private fetchAllActu() {
    this._adminService.fetchAllActu().subscribe(actus => this.actus = actus);
  }

  emitActuCreated() {
    this.form.controls['release_actu'].setValue(this.maDate.toUTCString());
    this.form.controls['idMovieRef'].setValue(this.idMovie);
    console.log(this.form.value);
    this.actuCreated = this.form.value;
    this._adminService.createActu(this.actuCreated).subscribe(actu => this.actus.push(actu));
    this.form.reset();


    this.myDate.setMinutes(this.myDate.getMinutes() - 10080 );
    for (let i = 0; i < this.actus.length; i++){
      if(new Date(this.actus[i].release_actu) < this.myDate){
        this._adminService.deleteActuById(this.actus[i].idActu).subscribe(() => {
          this.actus = this.actus.filter(actus => actus.idActu !== this.actus[i].idActu);
        });
      }
    }
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

  emitActuDeleted(actu: DtoInputActu) {
    if (confirm("Êtes-vous sur de vouloir supprimer cette actualité ? ")) {
      this._adminService.deleteActuById(actu.idActu).subscribe(() => {
        this.actus = this.actus.filter(actus => actus.idActu !== actu.idActu);
      });
    }
  }
}
