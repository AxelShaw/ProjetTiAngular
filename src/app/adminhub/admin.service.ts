import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {Observable} from "rxjs";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private static readonly ENTRY_POINT = environment.apiUrl + "/movie"

  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputMovie[]> {
    return this._httpClient.get<DtoInputMovie[]>(AdminService.ENTRY_POINT);
  }

  create(dto: DtoOutputCreateMovie): Observable<DtoInputMovie> {
    return this._httpClient.post<DtoInputMovie>(AdminService.ENTRY_POINT, dto);
  }
}
