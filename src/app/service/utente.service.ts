import { Injectable } from '@angular/core';
import { Utente } from '../dto/utente';
import { Observable, Subject } from "rxjs";
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { DelegateService } from './delegate.service';
import { RequestLogin } from '../dto/request/requestLogin';
import { environment } from 'src/environments/environment';
import { ConstantsAPI } from '../constants/constants-API';
import { Util } from '../util/util';
import { Prodotto } from '../dto/prodotto';
import { CalendarEvent } from 'angular-calendar';
import { EventInfo } from '../dto/EventInfo';
import { getMapEventiUtente } from '../mapper/common-mapper';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  public utente: Utente;
  public logged = false;
  public isSU = false;
  public sbjUtente = new Subject<Utente>();
  public acquistiPresents : boolean
  public mapEventi = new Map<Prodotto, CalendarEvent<EventInfo>[]>();
 

  constructor(private http: HttpClient , 
              private ds: DelegateService) { 

    this.getUtente()

    this.sbjUtente.asObservable().subscribe(next=>{
      if(next){
        this.refreshUtente(next);
      } else {
        this.removeUtente()
      }
    });
    
  }

  setUtente(utente: Utente){
    this.utente = utente;
    this.logged = utente !== undefined && utente !== null;
    this.isSU = Util.isSuperUser(utente)
    this.mapEventi = getMapEventiUtente(utente);
    localStorage.setItem(Constants.UTENTE,JSON.stringify(utente))
  }

  getUtente(): Utente{
    const utente = localStorage.getItem(Constants.UTENTE);
    if(utente){ 
      this.utente = JSON.parse(utente);
      this.logged = this.utente !== undefined && this.utente !== null;
      this.isSU = Util.isSuperUser(this.utente)
      this.mapEventi = getMapEventiUtente(this.utente);
    }
    return this.utente;
  }

  removeUtente(){
    this.utente = undefined
    this.logged = false;
    this.mapEventi = new Map<Prodotto, CalendarEvent<EventInfo>[]>();
    localStorage.removeItem(Constants.UTENTE);
  }

  refreshUtente(utente: Utente){
    this.removeUtente();
    this.setUtente(utente)
  }

  signin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.utente + ConstantsAPI.SIGNIN,req);
  }

  login(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.utente + ConstantsAPI.LOGIN,req); 
  }

  googleLogin(){
    window.open(environment.path + ConstantsAPI.GOOGLE_LOGIN);
    window.self.close();
  }

}
