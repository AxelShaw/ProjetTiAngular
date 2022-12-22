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
  //set link movie in rider
  private static readonly ENTRY_POINT= environment.apiUrl + "/movie"
  //set link rating movie in rider
  private static readonly ENTRY_POINT_RATING= environment.apiUrl + "/ratingmovie"
  //set link comment movie in rider
  private static readonly ENTRY_POINT_COMMENT= environment.apiUrl + "/commentmovie"
  //set link user in rider
  private static readonly ENTRY_POINT_USER= environment.apiUrl + "/user"
  //set link favorite in rider
  private static readonly ENTRY_POINT_FAVORIE= environment.apiUrl + "/favorie"
  //set link news in rider
  private static readonly ENTRY_POINT_ACTU= environment.apiUrl + "/actu"
  constructor(private _httpClient: HttpClient) { }

  //get all news
  fetchAllActu(): Observable<DtoInputActu[]> {
    return this._httpClient.get<DtoInputActu[]>(MovieService.ENTRY_POINT_ACTU);
  }

  //get all movies
  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(MovieService.ENTRY_POINT);
  }

  //get all movie by id
  fetchById(id: number): Observable<DtoInputMovie> {
    return this._httpClient.get<DtoInputMovie>(`${MovieService.ENTRY_POINT}/${id}`);
  }

  //get 5 movie by id
  fetchByName(name : string):Observable<DtoInputMovie>{
    return this._httpClient.get<DtoInputMovie>(`${MovieService.ENTRY_POINT}/${name}`);
  }

  //get rating by id
  fetchByRating(id : number):Observable<DtoInputRatingMovie>{
    return this._httpClient.get<DtoInputRatingMovie>(`${MovieService.ENTRY_POINT_RATING}/${id}`);
  }

  //get all rating movie
  fetchAllRating():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}`);
  }

  //get all rating movie in order worst to best (top 500)
  fetchAllRatingDown():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/Down`);
  }

  //get all rating movie in order best to worst (top 500)
  fetchAllRatingTop():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/Top`);
  }

  //get all comment by id movie
  fetchAllCommentById(id : number):Observable<DtoInputComments[]>{
    return this._httpClient.get<DtoInputComments[]>(`${MovieService.ENTRY_POINT_COMMENT}/${id}`);
  }

  //get all user
  fetchAllUser():Observable<DtoInputUser[]>{
    return this._httpClient.get<DtoInputUser[]>(`${MovieService.ENTRY_POINT_USER}`);
  }

  //create comment
  createComment(dto: DtoOutputCreateComment | null): Observable<DtoInputComments> {
    return this._httpClient.post<DtoInputComments>(MovieService.ENTRY_POINT_COMMENT, dto);
  }

  //update rating
  updateRate(dto: DtoOutputUpdateRating): Observable<any> {
    return this._httpClient.put(MovieService.ENTRY_POINT_RATING, dto);
  }

  //get worst to best home page(3 last mounth) movie
  fetchAllRatingDownHome():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/DownHome`);
  }

  //get best to worst home page(3 last mounth) movie
  fetchAllRatingTopHome():Observable<DtoInputRatingMovie[]>{
    return this._httpClient.get<DtoInputRatingMovie[]>(`${MovieService.ENTRY_POINT_RATING}/TopHome`);
  }

  //get all movie by genre
  fetchAllByGenre(genre : string):Observable<DtoInputMovie[]>{
    return this._httpClient.get<DtoInputMovie[]>(`${MovieService.ENTRY_POINT}/genre/${genre}`);
  }

  //create favorie movie
  createFavorie(dto: DtoOutputCreateFavorie | null): Observable<DtoInputFavorie> {
    return this._httpClient.post<DtoInputFavorie>(MovieService.ENTRY_POINT_FAVORIE, dto);
  }

  //get all favorite by id user
  fetchByIdFavorie(id: number): Observable<DtoInputFavorie[]> {
    return this._httpClient.get<DtoInputFavorie[]>(`${MovieService.ENTRY_POINT_FAVORIE}/${id}`);
  }

  //delete favorite by id
  deleteIdFavorie(id: number): Observable<any> {
    return this._httpClient.delete(MovieService.ENTRY_POINT_FAVORIE + "/" + id);
  }

  //delete comment by id
  deleteCommentById(id: number):Observable<any>{
    return this._httpClient.delete(MovieService.ENTRY_POINT_COMMENT + "/id/" + id);
  }
}

