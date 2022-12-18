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
import {DtoInputComments} from "../moviehub/dtos/dto-input-comments";
import {DtoInputUser} from "./dtos/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING_MOVIE = environment.apiUrl + "/ratingmovie"
  private static readonly ENTRY_POINT_USER = environment.apiUrl + "/user"
  private static readonly ENTRY_POINT_COMMENT= environment.apiUrl + "/commentmovie"
  private static readonly ENTRY_POINT_FAVORIE= environment.apiUrl + "/favorie"



  constructor(private _httpClient: HttpClient) { }

  createRatingMovie(dto: DtoOutputCreateRatingmovie | null): Observable<DtoInputRatingmovie> {
    return this._httpClient.post<DtoInputRatingmovie>(AdminService.ENTRY_POINT_RATING_MOVIE, dto);
  }
  createMovie(dto: DtoOutputCreateMovie | null): Observable<DtoInputMovie> {
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
  deleteCommentMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_COMMENT + "/deletebyuser/" + id);
  }
  deleteCommentByMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_COMMENT + "/" + id);
  }
  fetchByNameUser(nickname : string):Observable<DtoInputUser>{
    return this._httpClient.get<DtoInputUser>(`${AdminService.ENTRY_POINT_USER}/${nickname}`);
  }
  deleteUser(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_USER + "/" + id);
  }
  update(dto : DtoOutputCreateMovie | null): Observable<any>{
    return this._httpClient.put(AdminService.ENTRY_POINT, dto);
  }
  deleteFavovieByMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_FAVORIE + "/movie/" + id);
  }
  deleteFavovieByUser(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_FAVORIE + "/deletebyuser/" + id);
  }
  fetchAllUsers(): Observable<DtoInputUser[]> {
    return this._httpClient.get<DtoInputUser[]>(AdminService.ENTRY_POINT_USER);
  }
}
