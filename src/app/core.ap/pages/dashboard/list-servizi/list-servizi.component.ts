import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Dominio } from 'src/app/core.ap/dto/dominio';
import { EventoDto } from 'src/app/core.ap/dto/eventoDto';
import { ImageDto } from 'src/app/core.ap/dto/imageDto';
import { ProdottoDto } from 'src/app/core.ap/dto/prodottoDto';
import { getMapEventi, getMapProdotti } from 'src/app/core.ap/mapper/common-mapper';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { ServizioService } from 'src/app/core.ap/service/servizio.service';

@Component({
  selector: 'app-list-servizi',
  templateUrl: './list-servizi.component.html',
  styleUrls: ['./list-servizi.component.scss']
})
export class ListServiziComponent implements OnInit{

  @Input() editorConfig: AngularEditorConfig;
  @Input() prodotti:ProdottoDto[] = []
  @Output() prodottiChange : EventEmitter<ProdottoDto[]> = new EventEmitter<ProdottoDto[]>();
  @Input() eventi:EventoDto[] = []
  @Output() eventiChange : EventEmitter<EventoDto[]> = new EventEmitter<EventoDto[]>();

  @Input() domini:Dominio[] = []

  mapProdotti = new Map<String, ProdottoDto[]>();
  mapEventi = new Map<String, EventoDto[]>();

  prodottoSelected : ProdottoDto;
  eventoSelected : EventoDto;

  addProdottoAction : boolean;
  addEventoAction : boolean;


  constructor(public ds: DelegateService,private ss:ServizioService) { }


  ngOnInit(): void {
    this.editorConfig.placeholder='Inserisci descrizione estesa prodotto/evento'
    this.ss.getProdotti().subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.prodotti = next.prodotti;
      this.eventi = next.eventi;
      this.mapProdotti = getMapProdotti(this.prodotti)
      this.mapEventi = getMapEventi(this.eventi)
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il recupero dei servizi")
    })
  }

  add(type:string){
    let listImages : ImageDto[] = []
    let defaultImg = new ImageDto();
    defaultImg.imgUrl = 'default'
    listImages.push(defaultImg)
    if('prodotto' === type){
      this.prodottoSelected = new ProdottoDto();
      this.prodottoSelected.images = listImages
      this.addProdottoAction = true;
      this.prodottoSelected.prezzo = 0
      this.editorConfig.placeholder='Inserisci descrizione del prodotto'
    } else {
      this.eventoSelected = new EventoDto();
      this.eventoSelected.images = listImages
      this.editorConfig.placeholder='Inserisci descrizione dell evento'
      this.eventoSelected.prezzo = 0
      this.addEventoAction = true;
    }
  }

  close(type:string){
    this.eventoSelected = new EventoDto();
    this.prodottoSelected = new ProdottoDto();
    this.addProdottoAction = false;
    this.addEventoAction = false;
  }

  edit(type:string , servizio:any){
    if('prodotto' === type){
      this.prodottoSelected = servizio;
      this.addProdottoAction = true;
    } else {
      this.eventoSelected = servizio;
      this.addEventoAction = true;
    }
  }

  save(type:string){
    let servizio:any;
    if('prodotto' === type){
      servizio = this.prodottoSelected;
      this.ss.saveProdotto(servizio).subscribe(next=>{
        this.ds.sbjSpinner.next(false)
        this.close('prodotto')
        this.prodottiChange.emit(next.prodotti);
        this.eventiChange.emit(next.eventi);
      }, error => {
        this.ds.sbjSpinner.next(false)
        this.ds.sbjErrorsNotification.next("Errore durante il salvataggio del prodotto")
      })
    } else {
      servizio = this.eventoSelected;
      this.ss.saveEvento(servizio).subscribe(next=>{
        this.ds.sbjSpinner.next(false)
        this.close('prodotto')
        this.prodottiChange.emit(next.prodotti);
        this.eventiChange.emit(next.eventi);
      }, error => {
        this.ds.sbjSpinner.next(false)
        this.ds.sbjErrorsNotification.next("Errore durante il salvataggio dell'evento")
      })
    }

    
  }


  delete(type:string){
    let servizio:any;
    if('prodotto' === type){
      servizio = this.prodottoSelected;
    } else {
      servizio = this.eventoSelected;
    }

    this.ss.delete(servizio).subscribe(next=>{
      this.ds.sbjSpinner.next(false)
      this.close(type)
      this.prodottiChange.emit(next.prodotti);
      this.eventiChange.emit(next.eventi);
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante l'eliminazione del prodotto")
    })
    
  }



}
