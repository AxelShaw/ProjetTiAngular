import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMovie} from "../dtos/dto-input-movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movies: DtoInputMovie[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
