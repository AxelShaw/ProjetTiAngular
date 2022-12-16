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
import {DtoInputRatingMovie} from "../moviehub/dtos/dto-input-rating-movie";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING_MOVIE = environment.apiUrl + "/ratingmovie"
  private static readonly ENTRY_POINT_USER = environment.apiUrl + "/user"



  constructor(private _httpClient: HttpClient) { }

  createRatingMovie(dto: DtoOutputCreateRatingmovie | null): Observable<DtoInputRatingmovie> {
    return this._httpClient.post<DtoInputRatingmovie>(AdminService.ENTRY_POINT_RATING_MOVIE, dto);
  }
  createMovie(dto: DtoOutputCreateMovie | null): Observable<DtoInputMovie> {
    return this._httpClient.post<DtoInputMovie>(AdminService.ENTRY_POINT, dto);
  }
  createUser(dto: DtoOutputCreateMovie | null): Observable<DtoInputMovie> {
    return this._httpClient.post<DtoInputMovie>(AdminService.ENTRY_POINT, dto);
  }
  fetchByName(name : string):Observable<DtoInputMovie>{
    return this._httpClient.get<DtoInputMovie>(`${AdminService.ENTRY_POINT}/${name}`);
  }

  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(AdminService.ENTRY_POINT);
  }
  deleteMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT + "/" + id);
  }
  deleteRatingMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_RATING_MOVIE + "/" + id);
  }
}
