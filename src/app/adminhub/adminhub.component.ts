import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {AdminService} from "./admin.service";
import {DtoOutputCreateMovie} from "./dtos/dto-output-create-movie";

@Component({
  selector: 'app-adminhub',
  templateUrl: './adminhub.component.html',
  styleUrls: ['./adminhub.component.css']
})
export class AdminhubComponent implements OnInit {
  movies: DtoInputMovie[] = [];

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAll();
  }
  private fetchAll() {
    this._adminService.fetchAll().subscribe(movies => this.movies = movies);
  }

  create(dto: DtoOutputCreateMovie) {
    this._adminService.create(dto).subscribe(movie => this.movies.push(movie));
  }

}
