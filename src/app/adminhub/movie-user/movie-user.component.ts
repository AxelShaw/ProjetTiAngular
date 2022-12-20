import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoInputComments} from "../../moviehub/dtos/dto-input-comments";
import {DtoInputFavorie} from "../../favorihub/dtos/dto-input-favorie";

@Component({
  selector: 'app-movie-user',
  templateUrl: './movie-user.component.html',
  styleUrls: ['./movie-user.component.css']
})
export class MovieUserComponent implements OnInit {
  searchUsers: DtoInputUser[] = [];
  comments: DtoInputComments [] = [];
  users: DtoInputUser[] = [];
  favories: DtoInputFavorie [] = [];

  constructor( private _adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAllUser();
  }
  //method for search a movie in database
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
  //delete user, his comments and his favori
  emitUserDeleted(user: DtoInputUser){
    if (confirm("Êtes-vous sur de vouloir bannir cet utilisateur ? ")) {

      this._adminService.deleteCommentMovie(user.idUser).subscribe(() => {
        this.comments = this.comments.filter(comments => comments.idUserRef !== user.idUser);

        this._adminService.deleteFavovieByUser(user.idUser).subscribe(() => {
          this.favories = this.favories.filter(favories => favories.idMovieRef !== user.idUser);
        });
      });


    }

    this._adminService.deleteUser(user.idUser).subscribe(() => {
      this.users = this.users.filter(users => users.idUser !== users.idUser);
    });
    this.searchUsers = [];
  }
  //get all user
  fetchAllUser(){
    this._adminService.fetchAllUsers().subscribe(user => this.users = user);
  }

}
