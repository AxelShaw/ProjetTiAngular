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
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {resolve} from "@angular/compiler-cli";
import {Observable, Subject, Subscriber} from "rxjs";

@Component({
  selector: 'app-movie-admin',
  templateUrl: './movie-admin.component.html',
  styleUrls: ['./movie-admin.component.css']
})
export class MovieAdminComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  movieCreated: DtoOutputCreateMovie | null = null;
  form : FormGroup;
  imageData : "";

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

  }

  ngOnInit(): void {
  }

  emitMovieCreated() {
    this.form.controls['imageMovie'].setValue(this.imageData);
    console.log(this.form.value);
    this.movieCreated = this.form.value;
    this._adminService.createMovie(this.movieCreated).subscribe(movie => this.movies.push(movie));
    this.form.reset();
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
}
