import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {DtoInputUser} from "../dtos/dto-input-user";
import {DtoInputComments} from "../../moviehub/dtos/dto-input-comments";
import {DtoInputFavorie} from "../../favorihub/dtos/dto-input-favorie";
import jwtDecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {DtoOutputUpdateMovie} from "../dtos/dto-output-update-movie";
import {DtoOutputUpdateUser} from "../dtos/dto-output-update-user";

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
  userUpdated: DtoOutputUpdateUser | null = null;

  constructor( private _adminService: AdminService,private _cook:CookieService) {

  }

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

  isAdmin(user: DtoInputUser) {
    if(user.role == "admin"){
      return true
    }
    return false;
  }
}
