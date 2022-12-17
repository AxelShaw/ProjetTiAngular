import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";
import {AdminService} from "../admin.service";
import {DtoInputUser} from "../dtos/dto-input-user";

@Component({
  selector: 'app-movie-user',
  templateUrl: './movie-user.component.html',
  styleUrls: ['./movie-user.component.css']
})
export class MovieUserComponent implements OnInit {
  searchUsers: DtoInputUser[] = [];

  users: DtoInputUser[] = [];

  constructor( private _adminService: AdminService) { }

  ngOnInit(): void {

  }
  search(chaine: HTMLInputElement , delay = 700) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      let nickname = chaine.value;
      nickname = nickname.trim();
      if(nickname.length){
        this._adminService.fetchByNameUser(nickname).subscribe(
          (users) => {
            // @ts-ignore
            this.searchUsers = users;
          }
        );
      }else{
        this.searchUsers = [];
      }
    }, delay);
  }

}
