import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, ValidationErrors, ValidatorFn,


  Validators
} from "@angular/forms";
import {RegisterService} from "./register.service";
import {DtoOutputCreateUser} from "./dtos/dto-output-create-user";
import {DtoInputUser} from "./dtos/dto-input-user";
import {Observable, Subject, Subscriber} from "rxjs";
import {Router} from "@angular/router";



@Component({
  selector: 'app-registerhub',
  templateUrl: './registerhub.component.html',
  styleUrls: ['./registerhub.component.css']
})

export class RegisterhubComponent implements OnInit {
  userCreated: DtoOutputCreateUser| null = null;
  form : FormGroup;
  imageData : "";
  users: DtoInputUser[] = [];
  test : boolean = false;

  constructor(private _fb: FormBuilder, private _registerService: RegisterService, private _route:Router) {
    this.form = this._fb.group({
      last_name: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: 'user',
      profil_picture: new FormControl()
    });

  }

  ngOnInit(): void {
  }

  emitUserCreated() {

    this.form.controls['profil_picture'].setValue(this.imageData);
    this.userCreated = this.form.value;
    this._registerService.createUser(this.userCreated).subscribe(user => this.users.push(user));
    this.form.reset();
    this.userCreated = null;
  }

  control(nameUser: string): AbstractControl | null {
    return this.form.get(nameUser);
  }

  getImage(event: Event) {
    const file1=(event.target as HTMLInputElement).files;
    let file;
    if(file1){
      file = file1[0];
    }
    // @ts-ignore
    this.convertToBase64(file);
  }

  convertToBase64(file : File){
    const observable = new Observable((subscriber: Subscriber<any>)=>{
      this.readFile(file,subscriber);
    });
    observable.subscribe((d)=>{
      this.imageData = d.slice(22);

    })
  }

  readFile(file : File, subscriber: Subscriber<any>){
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }

    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();

    }
  }

}
