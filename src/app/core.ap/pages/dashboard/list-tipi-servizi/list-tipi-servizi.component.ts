import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Dominio } from 'src/app/core.ap/dto/dominio';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { TipoServizoService } from 'src/app/core.ap/service/tipo-servizo.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';

@Component({
  selector: 'app-list-tipi-servizi',
  templateUrl: './list-tipi-servizi.component.html',
  styleUrls: ['./list-tipi-servizi.component.scss']
})
export class ListTipiServiziComponent implements OnInit {

  @Input() editorConfig: AngularEditorConfig;
  @Input() domini:Dominio[] = []
  @Output() dominiChange : EventEmitter<Dominio[]> = new EventEmitter<Dominio[]>();
  typeSelected: Dominio;
  addAction:boolean

  constructor(
    public us: UtenteService,
    private ds: DelegateService,
    private ts:TipoServizoService
  ) {}

  ngOnInit(): void {
    this.editorConfig.placeholder='Inserisci descrizione estesa del tipo prodotto/evento'
  }

  add(){
    this.typeSelected = new Dominio();
    this.addAction = true;
  }

  close(){
    this.typeSelected = new Dominio();
    this.addAction = false;
  }

  edit(dominio: Dominio){
    this.typeSelected = dominio;
    this.addAction = true;
  }

  save(){
    this.ts.save(this.typeSelected).subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.close()
      this.dominiChange.emit(next);
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il salvataggio del tipo prodotto/evento")
    })
  }


  delete(type:Dominio){

  }



}
