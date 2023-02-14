import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dominio } from '../dto/dominio';
import { getHeaderForUser } from '../util/httpUtil';
import { DelegateService } from './delegate.service';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class TipoServizoService {

  
  constructor(
    private http: HttpClient,
    private ds: DelegateService,
    private us: UtenteService
  ) {}

  getAll():Observable<Dominio[]>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<Dominio[]>(environment.tpl,{headers: getHeaderForUser(this.us.getUtente())});
  }

  save(type: Dominio):Observable<Dominio[]>{
    this.ds.sbjSpinner.next(true)
    return this.http.post<Dominio[]>(environment.tpl,type,{headers: getHeaderForUser(this.us.getUtente())});
  }

}
