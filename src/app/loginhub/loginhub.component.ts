import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "./login.service";
import {Route, Router, Routes} from "@angular/router";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-loginhub',
  templateUrl: './loginhub.component.html',
  styleUrls: ['./loginhub.component.css']
})
export class LoginhubComponent implements OnInit {
  userLogin: DtoOutputLogin| null = null;
  form : FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService, private  _route: Router) {
    this.form = this._fb.group({
      mail: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
  }
  emitUserLogin() {
    this.userLogin = this.form.value;
    this._loginService.connexionLogin(this.userLogin).subscribe();
    this.form.reset();
    this._route.navigate(['../home']);
  }

  control(login: string): AbstractControl | null {
    return this.form.get(login);
  }

}
