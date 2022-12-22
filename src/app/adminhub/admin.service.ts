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
import {DtoOutputCreateActu} from "./dtos/dto-output-create-actu";
import {DtoInputActu} from "./dtos/dto-intput-actu";
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";
import {DtoOutputCreateUser} from "./dtos/dto-output-create-user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //rider link movie
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"
  //rider link rating movie
  private static readonly ENTRY_POINT_RATING_MOVIE = environment.apiUrl + "/ratingmovie"
  //rider link user
  private static readonly ENTRY_POINT_USER = environment.apiUrl + "/user"
  //rider link comment movie
  private static readonly ENTRY_POINT_COMMENT= environment.apiUrl + "/commentmovie"
  //rider link favorite
  private static readonly ENTRY_POINT_FAVORIE= environment.apiUrl + "/favorie"
  //rider link news
  private static readonly ENTRY_POINT_ACTU= environment.apiUrl + "/actu"



  constructor(private _httpClient: HttpClient) { }

  //create rating movie
  createRatingMovie(dto: DtoOutputCreateRatingmovie | null): Observable<DtoInputRatingmovie> {
    return this._httpClient.post<DtoInputRatingmovie>(AdminService.ENTRY_POINT_RATING_MOVIE, dto);
  }
  //create movie
  createMovie(dto: DtoOutputCreateMovie | null): Observable<DtoInputMovie> {
    return this._httpClient.post<DtoInputMovie>(AdminService.ENTRY_POINT, dto);
  }
//create news
  createActu(dto: DtoOutputCreateActu | null): Observable<DtoInputActu> {
    return this._httpClient.post<DtoInputActu>(AdminService.ENTRY_POINT_ACTU, dto);
  }
//get by name movie
  fetchByName(name : string):Observable<DtoInputMovie>{
    return this._httpClient.get<DtoInputMovie>(`${AdminService.ENTRY_POINT}/${name}`);
  }

  //get all movies
  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(AdminService.ENTRY_POINT);
  }
  //get all news
  fetchAllActu(): Observable<DtoInputActu[]> {
    return this._httpClient.get<DtoInputActu[]>(AdminService.ENTRY_POINT_ACTU);
  }
  //delete movie
  deleteMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT + "/" + id);
  }
  //delete news
  deleteActu(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_ACTU + "/" + id);
  }
  //delete by id news
  deleteActuById(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_ACTU + "/id/" + id);
  }
  //delte rating movie by id
  deleteRatingMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_RATING_MOVIE + "/" + id);
  }
  //delete comment movie
  deleteCommentMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_COMMENT + "/deletebyuser/" + id);
  }
  //delete comment movie by movieid
  deleteCommentByMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_COMMENT + "/" + id);
  }
  //get by name user
  fetchByNameUser(nickname : string):Observable<DtoInputUser>{
    return this._httpClient.get<DtoInputUser>(`${AdminService.ENTRY_POINT_USER}/${nickname}`);
  }
  //delte user
  deleteUser(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_USER + "/" + id);
  }
  //update movie
  update(dto : DtoOutputCreateMovie | null): Observable<any>{
    return this._httpClient.put(AdminService.ENTRY_POINT, dto);
  }
  //update user
  updateUser(dto : DtoInputUser | null): Observable<any>{
    return this._httpClient.put(AdminService.ENTRY_POINT_USER, dto);
  }
  //delte favorite by id movie
  deleteFavovieByMovie(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_FAVORIE + "/movie/" + id);
  }
  //delte favorite by user
  deleteFavovieByUser(id: number):Observable<any>{
    return this._httpClient.delete(AdminService.ENTRY_POINT_FAVORIE + "/deletebyuser/" + id);
  }
  //get all user
  fetchAllUsers(): Observable<DtoInputUser[]> {
    return this._httpClient.get<DtoInputUser[]>(AdminService.ENTRY_POINT_USER);
  }
  //get by id favorite
  fetchByIdFavorie(id: number): Observable<DtoInputFavorie[]> {
    return this._httpClient.get<DtoInputFavorie[]>(`${AdminService.ENTRY_POINT_FAVORIE}/${id}`);
  }
}
