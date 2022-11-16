import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import * as module from "module";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  myDate = new Date();


  constructor(private _movieService: MovieService) {
  }

  ngOnInit(): void {
    this.fetchAll();
    this.getDateT();
  }

  private fetchAll() {
    this._movieService.fetchAll().subscribe(movies => this.movies = movies);
  }

  private getDateT(){
    this.myDate.setMonth(this.myDate.getMonth()-1);
  }

  convert(dateString : string){
    let newDate = new Date(dateString);
    return newDate;
  }
}
