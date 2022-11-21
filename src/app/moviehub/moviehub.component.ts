import { Component, OnInit } from '@angular/core';
import {DtoInputMovie} from "./dtos/dto-input-movie";
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-moviehub',
  templateUrl: './moviehub.component.html',
  styleUrls: ['./moviehub.component.css']
})
export class MoviehubComponent implements OnInit {
  movies:DtoInputMovie[] = [];

  constructor(private _movieService: MovieService) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._movieService.fetchAllMovie().subscribe(movies => this.movies = movies);
  }

}
