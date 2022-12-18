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
  private static readonly ENTRY_POINT= environment.apiUrl + "/favorie"
  private static readonly ENTRY_POINT_MOVIE= environment.apiUrl + "/movie"

  constructor(private _httpClient: HttpClient) { }

  fetchByIdFavorie(id: number): Observable<DtoInputFavorie[]> {
    return this._httpClient.get<DtoInputFavorie[]>(`${FavorieService.ENTRY_POINT}/${id}`);
  }

  fetchAllMovie(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(FavorieService.ENTRY_POINT_MOVIE);
  }
  deleteFavoriteById(id: number):Observable<any>{
    return this._httpClient.delete(FavorieService.ENTRY_POINT + "/" + id);
  }
}
