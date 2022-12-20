import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {DtoInputLogin} from "./dtos/dto-input-login";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-loginhub',
  templateUrl: './loginhub.component.html',
  styleUrls: ['./loginhub.component.css']
})
export class LoginhubComponent implements OnInit {
  userLogin: DtoOutputLogin| null = null;
  logins: DtoInputLogin[] = [];
  form : FormGroup;

  constructor(private _fb: FormBuilder, private _loginService: LoginService) {
    this.form = this._fb.group({
      mail: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
  }
  emitUserLogin() {
    console.log(this.form.value);
    this.userLogin = this.form.value;
    this._loginService.connexionLogin(this.userLogin).subscribe((login => this.logins.push()));
    this.form.reset();
  }
  control(login: string): AbstractControl | null {
    return this.form.get(login);
  }

}
