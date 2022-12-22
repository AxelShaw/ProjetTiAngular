import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {DtoInputFavorie} from "./dtos/dto-input-favorie";

@Injectable({
  providedIn: 'root'
})
export class FavorieService {
  //rider link favorite
  private static readonly ENTRY_POINT= environment.apiUrl + "/favorie"
  //rider lnik movie
  private static readonly ENTRY_POINT_MOVIE= environment.apiUrl + "/movie"

  constructor(private _httpClient: HttpClient) { }

  //get by id favorite
  fetchByIdFavorie(id: number): Observable<DtoInputFavorie[]> {
    return this._httpClient.get<DtoInputFavorie[]>(`${FavorieService.ENTRY_POINT}/${id}`);
  }

  //get all movies
  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(FavorieService.ENTRY_POINT_MOVIE);
  }
  //get delete favorie by id
  deleteFavoriteById(id: number):Observable<any>{
    return this._httpClient.delete(FavorieService.ENTRY_POINT + "/" + id);
  }
}
