import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {getCookies, setCookie} from "typescript-cookie";

@Injectable({
  providedIn: 'root'

})
export class LoginService {
  private static readonly ENTRY_POINT_LOGIN= environment.apiUrl + "/login"

  constructor(private _httpClient: HttpClient) {

  }

  connexionLogin(dto: DtoOutputLogin | null){
    return this._httpClient.post(LoginService.ENTRY_POINT_LOGIN ,  dto , {
    withCredentials: true,
      responseType: 'text'});

    getCookies();
  }
}
