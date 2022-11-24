import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DtoOutputCreateMovie} from "../dtos/dto-output-create-movie";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  @Output()
  movieCreated: EventEmitter<DtoOutputCreateMovie> = new EventEmitter<DtoOutputCreateMovie>();
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
