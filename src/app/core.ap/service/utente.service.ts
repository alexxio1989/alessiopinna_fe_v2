import { Injectable } from '@angular/core';
import { UtenteDto } from '../dto/utenteDto';
import { Observable, Subject } from "rxjs";
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { DelegateService } from './delegate.service';
import { RequestLogin } from '../dto/request/requestLogin';
import { environment } from 'src/environments/environment';
import { ConstantsAPI } from '../constants/constants-API';
import { Util } from '../util/util';


@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  public utente: UtenteDto;
  public logged = false;
  public isSU = false;
  public sbjUtente = new Subject<UtenteDto>();
  public acquistiPresents : boolean
 

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

  setUtente(utente: UtenteDto){
    this.utente = utente;
    this.logged = utente !== undefined && utente !== null;
    this.isSU = Util.isSuperUser(utente)
    localStorage.setItem(Constants.UTENTE,JSON.stringify(utente))
  }

  getUtente(): UtenteDto{
    const utente = localStorage.getItem(Constants.UTENTE);
    if(utente){ 
      this.utente = JSON.parse(utente);
      this.logged = this.utente !== undefined && this.utente !== null;
      this.isSU = Util.isSuperUser(this.utente)
    }
    return this.utente;
  }

  removeUtente(){
    this.utente = undefined
    this.logged = false;
    localStorage.removeItem(Constants.UTENTE);
  }

  refreshUtente(utente: UtenteDto){
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
