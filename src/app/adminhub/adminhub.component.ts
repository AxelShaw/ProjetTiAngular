import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {AdminService} from "./admin.service";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "./dtos/dto-output-create-ratingmovie";
import {DtoInputRatingmovie} from "./dtos/dto-input-ratingmovie";
import {DtoOutputCreateCommentmovie} from "./dtos/dto-output-create-commentmovie";
import {DtoInputCommentmovie} from "./dtos/dto-input-commentmovie";

@Component({
  selector: 'app-adminhub',
  templateUrl: './adminhub.component.html',
  styleUrls: ['./adminhub.component.css']
})
export class AdminhubComponent implements OnInit {
  movies: DtoInputMovie[] = [];
  ratingmovies: DtoInputRatingmovie[] = [];
  commentmovies: DtoInputCommentmovie[] = [];

  constructor(private _adminService: AdminService) { }


  ngOnInit(): void {
  }
  createMovie(dto: DtoOutputCreateMovie) {
    this._adminService.createMovie(dto).subscribe(movie => this.movies.push(movie));
  }
  createRatingMovie(dto: DtoOutputCreateRatingmovie) {
    this._adminService.createRatingMovie(dto).subscribe(ratingmovie => this.ratingmovies.push(ratingmovie));
  }
  createCommentMovie(dto: DtoOutputCreateCommentmovie) {
    this._adminService.createCommentMovie(dto).subscribe(commentmovie => this.commentmovies.push(commentmovie));
  }


}
