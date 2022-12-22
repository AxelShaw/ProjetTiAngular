import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {AdminService} from "./admin.service";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "./dtos/dto-output-create-ratingmovie";
import {DtoInputRatingmovie} from "./dtos/dto-input-ratingmovie";
import {DtoOutputCreateCommentmovie} from "./dtos/dto-output-create-commentmovie";
import {DtoInputCommentmovie} from "./dtos/dto-input-commentmovie";
import {FavorieService} from "../favorihub/favorie.service";
import {DtoInputFavorie} from "../favorihub/dtos/dto-input-favorie";
import {DtoInputRatingMovie} from "../moviehub/dtos/dto-input-rating-movie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-adminhub',
  templateUrl: './adminhub.component.html',
  styleUrls: ['./adminhub.component.css']
})
export class AdminhubComponent implements OnInit {

  constructor(private _cook:CookieService) { }

  ngOnInit(): void {
  }

  //tes admin
  connectAdmin() {
    try{
      // @ts-ignore
      if(jwtDecode(this._cook.get('UserInfo')).Role == 'admin'){
        return true;
      }
      return false;
    }catch (error){
      return false;
    }
  }
}
