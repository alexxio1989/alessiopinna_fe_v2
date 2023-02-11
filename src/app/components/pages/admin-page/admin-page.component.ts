import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';
import { DialogLoginComponent } from '../../dialog/dialog-login/dialog-login.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(public us: UtenteService,
              public dialog: MatDialog,
              private route: Router,
              private ds:DelegateService) { }

  ngOnInit(): void {
    if(!this.us.logged){
      this.openLogin()
    } else {
      this.us.isSU
      if(!this.us.isSU){
        this.route.navigate(['']);
      }
    }
  }


  openLogin(){
    if(this.ds.isMobile){
      this.dialog.open(DialogLoginComponent, {
        height: 'auto',
        width: '95%',
        maxWidth:'95vw'

      });
    } else {
      this.dialog.open(DialogLoginComponent, {
        height: 'auto',
        width: '40%'
      });
    }

  }

  

}
