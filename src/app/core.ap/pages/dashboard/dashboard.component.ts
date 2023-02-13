import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dominio } from '../../dto/dominio';
import { DelegateService } from '../../service/delegate.service';
import { TipoServizoService } from '../../service/tipo-servizo.service';
import { UtenteService } from '../../service/utente.service';
import { DialogLoginAdminComponent } from './dialog-login-admin/dialog-login-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  domini:Dominio[] = []

  constructor(
    public us: UtenteService,
    public dialog: MatDialog,
    private route: Router,
    private ds: DelegateService,
    private ts:TipoServizoService
  ) {}

  ngOnInit(): void {
    if (!this.us.logged) {
      this.openLogin();
    } else {
      this.us.isSU;
      if (!this.us.isSU) {
        this.route.navigate(['']);
      } else {
        this.caricaPagina()
      }
    }
  }

  caricaPagina(){
    this.ts.getAll().subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.domini = next;
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il recupero tipi prodotto/evento")
    })
  }

  openLogin() {
    if (this.ds.isMobile) {
      this.dialog.open(DialogLoginAdminComponent, {
        height: 'auto',
        width: '95%',
        maxWidth: '95vw',
      });
    } else {
      this.dialog.open(DialogLoginAdminComponent, {
        height: 'auto',
        width: '40%',
      });
    }
  }

  rtvTipiServizi(domini:Dominio[]){
    this.domini = domini
  }
}
