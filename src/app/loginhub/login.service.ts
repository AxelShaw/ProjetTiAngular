import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {DtoInputLogin} from "./dtos/dto-input-login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private static readonly ENTRY_POINT_LOGIN= environment.apiUrl + "/login"

  constructor(private _httpClient: HttpClient) {

  }

  connexionLogin(dto: DtoOutputLogin | null): Observable<DtoInputLogin> {
    return this._httpClient.post<DtoInputLogin>(LoginService.ENTRY_POINT_LOGIN +"/Login",  dto);
  }
}
