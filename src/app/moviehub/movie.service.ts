import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMovie} from "./dtos/dto-input-movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"
  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(MovieService.ENTRY_POINT);
  }
}
