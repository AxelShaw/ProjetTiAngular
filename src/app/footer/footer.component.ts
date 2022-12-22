import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _cook: CookieService) { }

  ngOnInit(): void {
  }

  testLog() {
    try{
      // @ts-ignore
      jwtDecode(this._cook.get('UserInfo'))
      return true;
    }catch (error){
      return false;
    }
  }
}
