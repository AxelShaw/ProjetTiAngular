import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieHomeComponent implements OnInit {
  //all movie
  movies: DtoInputMovie[] = [];
  //all rating
  ratings : DtoInputRatingMovie[] = [];
  //date time new check 1 mouth
  myDate = new Date();
  //date time new check 3 mouth
  myDateMoment = new Date();
  //rating all top
  ratingsTop : DtoInputRatingMovie[] = [];
  //rating all down
  ratingsDown : DtoInputRatingMovie[] = [];

  constructor(private _movieService: MovieService) {
  }

  //get all movie, date in 1 mouth and 3 mouth, get all rating,ratingtop,ratingbottom
  ngOnInit(): void {
    this.fetchAll();
    this.getDateT();
    this.getDateT3();
    this.fetchAllRating();
    this.fetchAllRatingTop();
    this.fetchAllRatingDown();
  }

  //get all movie
  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

  //get date before 1 mouth
  private getDateT(){
    this.myDate.setMonth(this.myDate.getMonth()-1);
  }

  //get date before 3 mouth
  private getDateT3(){
    this.myDateMoment.setMonth(this.myDateMoment.getMonth()-3);
  }

  //convert for form
  convert(dateString : string){
    let newDate = new Date(dateString);
    return newDate;
  }

  //get all rating
  private fetchAllRating() {
    this._movieService.fetchAllRating().subscribe(rating => this.ratings = rating);
  }

  //get all rating down
  private fetchAllRatingDown() {
    this._movieService.fetchAllRatingDownHome().subscribe(rating => this.ratingsDown = rating);
  }

  //get all rating top
  private fetchAllRatingTop() {
    this._movieService.fetchAllRatingTopHome().subscribe(rating => this.ratingsTop = rating);
  }
}
