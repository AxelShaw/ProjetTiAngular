import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import * as module from "module";
import {formatDate} from "@angular/common";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  ratings : DtoInputRatingMovie[] = [];
  myDate = new Date();


  constructor(private _movieService: MovieService) {
  }

  ngOnInit(): void {
    this.fetchAll();
    this.getDateT();
    this.fetchAllRating();
  }

  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  private getDateT(){
    this.myDate.setMonth(this.myDate.getMonth()-1);
  }

  convert(dateString : string){
    let newDate = new Date(dateString);
    return newDate;
  }

  private fetchAllRating() {
    this._movieService.fetchAllRating().subscribe(rating => this.ratings = rating);
  }
}
