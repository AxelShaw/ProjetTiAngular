import {Component, HostListener, OnInit} from '@angular/core';
import {DtoInputMovie} from "../moviehub/dtos/dto-input-movie";
import {MovieService} from "../moviehub/movie.service";
import {DtoInputActu} from "../adminhub/dtos/dto-intput-actu";
import {AdminService} from "../adminhub/admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchMovies: DtoInputMovie[] = [];
  actus: DtoInputActu[] = [];
  myDate = new Date();

  constructor(private _movieService: MovieService, private _adminService: AdminService) { }

  ngOnInit(): void {
    this.searchMovies = [];
    this.fetchAllActu();
  }



  search(chaine: HTMLInputElement , delay = 700) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      let name = chaine.value;
      name = name.trim();
      if(name.length){
        this._movieService.fetchByName(name).subscribe(
          (movies) => {
            // @ts-ignore
            this.searchMovies = movies;
          }
        );
      }else{
        this.searchMovies = [];
      }
    }, delay);
  }

  selectInput( delay = 100) {
    let time;
    clearTimeout(time);

    time = setTimeout(() => {
      this.searchMovies = [];
    }, delay);
  }

  private fetchAllActu() {
    this._adminService.fetchAllActu().subscribe(actus => this.actus = actus);
  }
}
