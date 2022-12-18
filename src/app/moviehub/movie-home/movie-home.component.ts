import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import * as module from "module";
import {formatDate} from "@angular/common";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {BehaviorSubject} from "rxjs";
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieHomeComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  ratings : DtoInputRatingMovie[] = [];
  myDate = new Date();
  myDateMoment = new Date();
  ratingsTop : DtoInputRatingMovie[] = [];
  ratingsDown : DtoInputRatingMovie[] = [];

  constructor(private _movieService: MovieService) {
  }

  ngOnInit(): void {
    this.fetchAll();
    this.getDateT();
    this.getDateT3();
    this.fetchAllRating();
    this.fetchAllRatingTop();
    this.fetchAllRatingDown();
  }

  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  private getDateT(){
    this.myDate.setMonth(this.myDate.getMonth()-1);
  }

  private getDateT3(){
    this.myDateMoment.setMonth(this.myDateMoment.getMonth()-3);
  }

  convert(dateString : string){
    let newDate = new Date(dateString);
    return newDate;
  }

  private fetchAllRating() {
    this._movieService.fetchAllRating().subscribe(rating => this.ratings = rating);
  }

  private fetchAllRatingDown() {
    this._movieService.fetchAllRatingDownHome().subscribe(rating => this.ratingsDown = rating);
  }

  private fetchAllRatingTop() {
    this._movieService.fetchAllRatingTopHome().subscribe(rating => this.ratingsTop = rating);
  }
}
