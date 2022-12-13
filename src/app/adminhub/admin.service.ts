import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";
import {Observable} from "rxjs";
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {environment} from "../../environments/environment";
import {DtoOutputCreateRatingmovie} from "./dtos/dto-output-create-ratingmovie";
import {DtoInputRatingmovie} from "./dtos/dto-input-ratingmovie";
import {DtoOutputCreateCommentmovie} from "./dtos/dto-output-create-commentmovie";
import {DtoInputCommentmovie} from "./dtos/dto-input-commentmovie";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING_MOVIE = environment.apiUrl + "/ratingmovie"
  private static readonly ENTRY_POINT_COMMENT_MOVIE = environment.apiUrl + "/commentmovie"


  constructor(private _httpClient: HttpClient) { }

  createRatingMovie(dto: DtoOutputCreateRatingmovie): Observable<DtoInputRatingmovie> {
    return this._httpClient.post<DtoInputRatingmovie>(AdminService.ENTRY_POINT_RATING_MOVIE, dto);
  }
  createMovie(dto: DtoOutputCreateMovie): Observable<DtoInputMovie> {
    return this._httpClient.post<DtoInputMovie>(AdminService.ENTRY_POINT, dto);
  }

  createCommentMovie(dto: DtoOutputCreateCommentmovie): Observable<DtoInputCommentmovie> {
    return this._httpClient.post<DtoInputCommentmovie>(AdminService.ENTRY_POINT_COMMENT_MOVIE, dto);
  }
}
