import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  }

  add(){
    this.typeSelected = new Dominio();
    this.addAction = true;
    this.ts.save(this.typeSelected).subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.dominiChange.emit(next);
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il salvataggio del tipo prodotto/evento")
    })
  }

  edit(type:Dominio){
    this.ts.update(this.typeSelected).subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.dominiChange.emit(next)
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante la modifica del tipo prodotto/evento")
    })
  }

  delete(type:Dominio){

  }



}
