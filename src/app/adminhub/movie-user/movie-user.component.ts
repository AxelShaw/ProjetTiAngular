import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoInputComments} from "../../moviehub/dtos/dto-input-comments";
import {DtoInputFavorie} from "../../favorihub/dtos/dto-input-favorie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {DtoOutputUpdateUser} from "../dtos/dto-output-update-user";

@Component({
  selector: 'app-movie-user',
  templateUrl: './movie-user.component.html',
  styleUrls: ['./movie-user.component.css']
})
export class MovieUserComponent implements OnInit {
  //search user
  searchUsers: DtoInputUser[] = [];
  //all comment
  comments: DtoInputComments [] = [];
  //all user
  users: DtoInputUser[] = [];
  //all favorite
  favories: DtoInputFavorie [] = [];

  constructor( private _adminService: AdminService,private _cook:CookieService) {

  }
//gat all user
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

  //check connect to admin
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

  //updtae user admin and user
  emitUpdate(user: DtoInputUser) {
    if (confirm("Êtes-vous sur de vouloir mettre cette utilisateur admin ? ")) {
      if (user.role == "admin") {
        this._adminService.updateUser({
          idUser: user.idUser,
          last_name: user.last_name,
          first_name: user.first_name,
          mail: user.mail,
          nickname: user.nickname,
          password: user.password,
          role: "user",
          profil_picture: user.profil_picture
        }).subscribe();
      } else {
        this._adminService.updateUser({
          idUser: user.idUser,
          last_name: user.last_name,
          first_name: user.first_name,
          mail: user.mail,
          nickname: user.nickname,
          password: user.password,
          role: "admin",
          profil_picture: user.profil_picture
        }).subscribe();
      }
    }
  }

  //check admin
  isAdmin(user: DtoInputUser) {
    if(user.role == "admin"){
      return true
    }
    return false;
  }
}
