import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {DtoInputRatingMovie} from "./dtos/dto-input-rating-movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly ENTRY_POINT= environment.apiUrl + "/movie"
  private static readonly ENTRY_POINT_RATING= environment.apiUrl + "/ratingmovie"
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

}
