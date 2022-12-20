import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {DtoOutputCreateUser} from "./dtos/dto-output-create-user";
import {DtoInputUser} from "./dtos/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private static readonly ENTRY_POINT_USER = environment.apiUrl + "/user"

  constructor(private _httpClient: HttpClient) { }

  createUser(dto: DtoOutputCreateUser | null): Observable<DtoInputUser> {
    return this._httpClient.post<DtoInputUser>(RegisterService.ENTRY_POINT_USER, dto);
  }
  fetchByNameUser(nickname : string):Observable<DtoInputUser>{
    return this._httpClient.get<DtoInputUser>(`${RegisterService.ENTRY_POINT_USER}/${nickname}`);
  }
}
