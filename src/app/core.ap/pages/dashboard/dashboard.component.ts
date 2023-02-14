import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Dominio } from '../../dto/dominio';
import { EventoDto } from '../../dto/eventoDto';
import { ProdottoDto } from '../../dto/prodottoDto';
import { DelegateService } from '../../service/delegate.service';
import { ServizioService } from '../../service/servizio.service';
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
  prodotti:ProdottoDto[] = []
  eventi:EventoDto[] = []
  editorConfig :AngularEditorConfig;

  constructor(
    public us: UtenteService,
    public dialog: MatDialog,
    private route: Router,
    private ds: DelegateService,
    private ts:TipoServizoService,
    private ss:ServizioService
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

    

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [
        ['bold']
        ],
      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };
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
