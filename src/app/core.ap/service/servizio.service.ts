import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants/constants';
import { ConstantsAPI } from '../constants/constants-API';
import { EventoDto } from '../dto/eventoDto';
import { ProdottoDto } from '../dto/prodottoDto';
import { ResponseServizio } from '../dto/response/responseServizio';
import { ServizioDto } from '../dto/servizioDto';
import { getMapEventi, getMapProdotti } from '../mapper/common-mapper';
import { DelegateService } from './delegate.service';
import { UtenteService } from './utente.service';
import { HttpHeaders } from '@angular/common/http';
import { getHeaderForUser } from '../util/httpUtil';
import { Dominio } from '../dto/dominio';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  
  public servizio: ServizioDto;

  constructor(
    private http: HttpClient,
    private ds: DelegateService,
    private us: UtenteService
  ) {}

  getProdotti(): Observable<ResponseServizio> {
    this.ds.sbjSpinner.next(true);

    /* const prodotti = localStorage.getItem(Constants.PRODOTTI);
    if(prodotti){ 
      this.prodotti = JSON.parse(prodotti);
      let response = new ResponseServizio();
      response.prodotti = this.prodotti;
      response.success = true
      return new Observable(obs => {
        obs.next(response)
      })
    } else {
      return this.http.get<ResponseServizio>(environment.servizio);
    } */

  

    return this.http.get<ResponseServizio>(environment.servizio);
  }

  setServizio(servizio: ServizioDto) {
    localStorage.setItem(Constants.SERVIZIO, JSON.stringify(servizio));
  }

  rmvServizio() {
    localStorage.removeItem(Constants.SERVIZIO);
  }

  getServizio(): ServizioDto {
    const servizio = localStorage.getItem(Constants.SERVIZIO);
    if (servizio) {
      this.servizio = JSON.parse(servizio);
    }
    return this.servizio;
  }

  saveProdotto(prodotto: ProdottoDto): Observable<ResponseServizio> {
    this.ds.sbjSpinner.next(true);
    return this.http.post<ResponseServizio>(
      environment.servizio + ConstantsAPI.PRODOTTO,prodotto,{headers: getHeaderForUser(this.us.getUtente())});
  }

  saveEvento(evento: EventoDto): Observable<ResponseServizio> {
    this.ds.sbjSpinner.next(true);
    return this.http.post<ResponseServizio>(environment.servizio + ConstantsAPI.EVENTO, evento,{headers: getHeaderForUser(this.us.getUtente())});
  }

  delete(servizio: ServizioDto): Observable<ResponseServizio> {
    this.ds.sbjSpinner.next(true);
    return this.http.delete<ResponseServizio>(
      environment.servizio + ConstantsAPI.DELETE + servizio.id ,{headers: getHeaderForUser(this.us.getUtente())}
    );
  }
}