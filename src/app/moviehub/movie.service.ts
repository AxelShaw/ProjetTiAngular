import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {DtoInputRatingMovie} from "./dtos/dto-input-rating-movie";
import {DtoInputComments} from "./dtos/dto-input-comments";
import {DtoInputUser} from "./dtos/dto-input-user";
import {DtoOutputCreateComment} from "./dtos/dto-output-create-comment";
import {DtoOutputUpdateRating} from "./dtos/dto-output-update-rating";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly ENTRY_POINT= environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING= environment.apiUrl + "/ratingmovie"
  private static readonly ENTRY_POINT_COMMENT= environment.apiUrl + "/commentmovie"
  private static readonly ENTRY_POINT_USER= environment.apiUrl + "/user"
  constructor(private _httpClient: HttpClient) { }

  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(MovieService.ENTRY_POINT);
  }

  fetchById(id: number): Observable<DtoInputMovie> {
    return this._httpClient.get<DtoInputMovie>(`${MovieService.ENTRY_POINT}/${id}`);
  }

  fetchByName(name : string):Observable<DtoInputMovie>{
    return this._httpClient.get<DtoInputMovie>(`${MovieService.ENTRY_POINT}/${name}`);
  }

  fetchByRating(id : number):Observable<DtoInputRatingMovie>{
    return this._httpClient.get<DtoInputRatingMovie>(`${MovieService.ENTRY_POINT_RATING}/${id}`);
  }

  fetchAllRating():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}`);
  }

  fetchAllRatingDown():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/Down`);
  }

  fetchAllRatingTop():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/Top`);
  }

  fetchAllCommentById(id : number):Observable<DtoInputComments[]>{
    return this._httpClient.get<DtoInputComments[]>(`${MovieService.ENTRY_POINT_COMMENT}/${id}`);
  }

  fetchAllUser():Observable<DtoInputUser[]>{
    return this._httpClient.get<DtoInputUser[]>(`${MovieService.ENTRY_POINT_USER}`);
  }

  deleteComment(id: number):Observable<any>{
    return this._httpClient.delete(MovieService.ENTRY_POINT_COMMENT + "/" + id);
  }

  createComment(dto: DtoOutputCreateComment | null): Observable<DtoInputComments> {
    return this._httpClient.post<DtoInputComments>(MovieService.ENTRY_POINT_COMMENT, dto);
  }

  updateRate(dto: DtoOutputUpdateRating): Observable<any> {
    return this._httpClient.put(MovieService.ENTRY_POINT_RATING, dto);
  }

  fetchAllRatingDownHome():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/DownHome`);
  }

  fetchAllRatingTopHome():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/TopHome`);
  }
}
