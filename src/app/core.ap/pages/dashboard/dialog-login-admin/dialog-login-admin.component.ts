import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestLogin } from 'src/app/core.ap/dto/request/requestLogin';
import { UtenteDto } from 'src/app/core.ap/dto/utenteDto';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';

@Component({
  selector: 'app-dialog-login-admin',
  templateUrl: './dialog-login-admin.component.html',
  styleUrls: ['./dialog-login-admin.component.scss']
})
export class DialogLoginAdminComponent implements OnInit {

  login = true
  requestLogin:RequestLogin
  utente:UtenteDto

  get enableLogin():boolean {
    return this.requestLogin.password !== undefined &&
     this.requestLogin.password !== null &&
      '' !== this.requestLogin.password &&
       this.utente.email !== undefined &&
       this.utente.email !== null
  }

  constructor(private user_service:UtenteService,
    private ds:DelegateService , 
    private dialogRef: MatDialogRef<DialogLoginAdminComponent>,
    private route: Router) { 
      
    }

  ngOnInit(): void {
    this.login = true
    this.requestLogin = new RequestLogin();
    this.utente = new UtenteDto();
  }

  loginUser(){
    this.requestLogin.utente = this.utente;
    this.user_service.loginAdmin(this.requestLogin).subscribe(next => {
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

  cancel(){
    this.route.navigate(['']);
  }

}
