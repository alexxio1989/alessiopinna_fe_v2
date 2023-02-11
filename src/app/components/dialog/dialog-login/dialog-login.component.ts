import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestLogin } from 'src/app/core.ap/dto/request/requestLogin';
import { UtenteDto } from 'src/app/core.ap/dto/utenteDto';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {

  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  requestLogin:RequestLogin
  utente:UtenteDto
  passwordConfirm = ''

  maintab = 0;

  login = true
  loginForm!: FormGroup;
  isLoggedin?: boolean;

  loggedIn: boolean;

  constructor(private user_service:UtenteService,
              private ds:DelegateService , 
              private dialogRef: MatDialogRef<DialogLoginComponent>,
              private route: Router) { 
                
              }

  getValidPassword():boolean{
    return this.requestLogin.password !== undefined &&
    this.requestLogin.password !== null &&
     '' !== this.requestLogin.password
  }

  get enableLogin():boolean {
    return this.requestLogin.password !== undefined &&
     this.requestLogin.password !== null &&
      '' !== this.requestLogin.password &&
       this.utente.email !== undefined &&
       this.utente.email !== null
  }

  get enableSignin():boolean {
    return this.requestLogin.password !== undefined &&
     this.requestLogin.password !== null &&
      '' !== this.requestLogin.password &&
       this.utente.email !== undefined &&
       this.utente.email !== null && 
       '' !== this.utente.email && 
       this.requestLogin.password === this.passwordConfirm
  }

  ngOnInit(): void {
    this.login = true
    this.requestLogin = new RequestLogin();
    this.utente = new UtenteDto();
  
  }



  getTab(event:any){
    this.login = event.index === 0 ? true : false
    console.log(event)
  }

  loginUser(){
    this.requestLogin.utente = this.utente;
    this.user_service.login(this.requestLogin).subscribe(next => {
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.ds.sbjErrorsNotification.next("Login avvenuta con successo")
        this.user_service.setUtente(next.utente)
        this.dialogRef.close();
      }
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante la login")
    })
  }

  signinUser(){
    this.requestLogin.utente = this.utente;
    this.user_service.signin(this.requestLogin).subscribe(next => {
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.maintab = 0
        this.ds.sbjErrorsNotification.next("Registrazione avvenuta con successo")
      }
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante la signin")
    })
  }

  cancel(){
    this.route.navigate(['']);
  }


}
