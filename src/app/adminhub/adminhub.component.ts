import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {AdminService} from "./admin.service";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";
import {DtoOutputCreateRatingmovie} from "./dtos/dto-output-create-ratingmovie";
import {DtoInputRatingmovie} from "./dtos/dto-input-ratingmovie";
import {DtoOutputCreateCommentmovie} from "./dtos/dto-output-create-commentmovie";
import {DtoInputCommentmovie} from "./dtos/dto-input-commentmovie";

@Component({
  selector: 'app-adminhub',
  templateUrl: './adminhub.component.html',
  styleUrls: ['./adminhub.component.css']
})
export class AdminhubComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {
  }



}
