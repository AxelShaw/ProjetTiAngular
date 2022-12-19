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
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";
import {DtoOutputCreateFavorie} from "./dtos/dto-output-create-favorie";
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly ENTRY_POINT= environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING= environment.apiUrl + "/ratingmovie"
  private static readonly ENTRY_POINT_COMMENT= environment.apiUrl + "/commentmovie"
  private static readonly ENTRY_POINT_USER= environment.apiUrl + "/user"
  private static readonly ENTRY_POINT_FAVORIE= environment.apiUrl + "/favorie"
  private static readonly ENTRY_POINT_ACTU= environment.apiUrl + "/actu"
  constructor(private _httpClient: HttpClient) { }

  fetchAllActu(): Observable<DtoInputActu[]> {
    return this._httpClient.get<DtoInputActu[]>(MovieService.ENTRY_POINT_ACTU);
  }

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

  fetchAllByGenre(genre : string):Observable<DtoInputMovie[]>{
    return this._httpClient.get<DtoInputMovie[]>(`${MovieService.ENTRY_POINT}/genre/${genre}`);
  }

  createFavorie(dto: DtoOutputCreateFavorie | null): Observable<DtoInputFavorie> {
    return this._httpClient.post<DtoInputFavorie>(MovieService.ENTRY_POINT_FAVORIE, dto);
  }

  fetchByIdFavorie(id: number): Observable<DtoInputFavorie[]> {
    return this._httpClient.get<DtoInputFavorie[]>(`${MovieService.ENTRY_POINT_FAVORIE}/${id}`);
  }

  deleteIdFavorie(id: number): Observable<any> {
    return this._httpClient.delete(MovieService.ENTRY_POINT_FAVORIE + "/" + id);
  }

  deleteCommentById(id: number):Observable<any>{
    return this._httpClient.delete(MovieService.ENTRY_POINT_COMMENT + "/id/" + id);
  }
}

