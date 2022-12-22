import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginhub',
  templateUrl: './loginhub.component.html',
  styleUrls: ['./loginhub.component.css']
})
export class LoginhubComponent implements OnInit {
  userLogin: DtoOutputLogin| null = null;
  form : FormGroup;
  testEmail : boolean = true;

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
    this._loginService.connexionLogin(this.userLogin).subscribe(error =>{
      this._route.navigate(['../home']);
      this.testEmail = true;
    }, error => {
      this.testEmail = false;
    });
    this.form.reset();
  }

  control(login: string): AbstractControl | null {
    return this.form.get(login);
  }
}
