import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants/constants';
import { ConstantsAPI } from '../constants/constants-API';
import { Prodotto } from '../dto/prodotto';
import { ResponseProdotto } from '../dto/response/responseProdotto';
import { DelegateService } from './delegate.service';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  public prodotto: Prodotto;
  public prodotti : Prodotto[];
  public mapProdotti = new Map<string, Prodotto[]>();

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  getProdotti(full: boolean): Observable<ResponseProdotto>{
    this.ds.sbjSpinner.next(true)
    const prodotti = localStorage.getItem(Constants.PRODOTTI);
    if(prodotti){ 
      this.prodotti = JSON.parse(prodotti);
      let response = new ResponseProdotto();
      response.prodotti = this.prodotti;
      response.success = true
      return new Observable(obs => {
        obs.next(response)
      })
    } else {
      let basePath = environment.prodotto
      let fullPAth = full ? '1' : '0'
      let url = basePath + '/all/' + fullPAth;
      return this.http.get<ResponseProdotto>(url);
    }
  }

  setMapCorsi(prodotti :Prodotto[]){
    this.mapProdotti = new Map<string, Prodotto[]>();
    if(prodotti && prodotti.length > 0){
      this.setProdotti(prodotti)
      prodotti.forEach(prodotto => {
        const listFiltred = this.mapProdotti.get(prodotto.tipo.descrizione);
        if (listFiltred) {
          listFiltred.push(prodotto);
        } else {
          let newListFiltred = [];
          newListFiltred.push(prodotto);
          this.mapProdotti.set(prodotto.tipo.descrizione, newListFiltred);
        }
      });
    }
  }

  setProdotti(prodotto :Prodotto[]){
    if(!localStorage.getItem(Constants.PRODOTTI)){
      localStorage.setItem(Constants.PRODOTTI,JSON.stringify(prodotto));
    }
  }

  setProdotto(prodotto: Prodotto){
    localStorage.setItem(Constants.PRODOTTO,JSON.stringify(prodotto));
  }

  rmvProdotto(){
    localStorage.removeItem(Constants.PRODOTTO);
  }

  getProdotto(): Prodotto{
    const prodotto = localStorage.getItem(Constants.PRODOTTO);
    if(prodotto){ 
      this.prodotto = JSON.parse(prodotto);
    }
    return this.prodotto;
  }

  save(prodotto: Prodotto): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.prodotto + ConstantsAPI.SAVE , prodotto);
  }

  delete(prodotto: Prodotto): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.delete(environment.prodotto + ConstantsAPI.DELETE + prodotto.id);
  }
}