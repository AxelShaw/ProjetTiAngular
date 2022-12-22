import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {getCookies} from "typescript-cookie";

@Injectable({
  providedIn: 'root'

})
export class LoginService {
  //link in rider for login
  private static readonly ENTRY_POINT_LOGIN= environment.apiUrl + "/login"

  constructor(private _httpClient: HttpClient) {

  }

  //connection login
  connexionLogin(dto: DtoOutputLogin | null){
    return this._httpClient.post(LoginService.ENTRY_POINT_LOGIN ,  dto , {
    withCredentials: true,
      responseType: 'text'});

    getCookies();
  }
}
