import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {MovieService} from "../movie.service";
import {DtoInputRatingMovie} from "../dtos/dto-input-rating-movie";
import {getCookies} from 'typescript-cookie'
import {CookieService} from "ngx-cookie-service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  @Input() movies: DtoInputMovie[] = [];
  ratings : DtoInputRatingMovie[] = [];


  constructor(private _movieService: MovieService, private _cook:CookieService) { }

  ngOnInit(): void {
    this.fetchAllRating();
  }

  private fetchAllRating() {
    this._movieService.fetchAllRating().subscribe(rating => this.ratings = rating);
  }

  GetCookie(){
    console.log(this._cook.get('UserInfo'));
    console.log(jwtDecode(this._cook.get('UserInfo')));
  }
}
