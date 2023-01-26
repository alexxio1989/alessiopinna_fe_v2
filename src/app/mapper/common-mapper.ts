import { CalendarEvent } from "angular-calendar";
import { EventInfo } from "../dto/EventInfo";
import { Prodotto } from "../dto/prodotto";
import { Utente } from "../dto/utente";
import { getEvent } from "./calendar-mapper";


export function getMapProdotti(prodotti: Prodotto[]) : Map<string, Prodotto[]>{
    let mapProdotti = new Map<string, Prodotto[]>();
    prodotti.forEach(prodotto => {
        const listFiltred = mapProdotti.get(prodotto.tipo.descrizione);
        if (listFiltred) {
        listFiltred.push(prodotto);
        } else {
        let newListFiltred = [];
        newListFiltred.push(prodotto);
        mapProdotti.set(prodotto.tipo.descrizione, newListFiltred);
        }
    });
    return mapProdotti;
}

export function getMapEventiUtente(utente : Utente): Map<Prodotto, CalendarEvent<EventInfo>[]>{
    let mapEventi = new Map<Prodotto, CalendarEvent<EventInfo>[]>();
    if(utente.acquisti && utente.acquisti.length > 0){
        utente.acquisti .forEach(acquisto => {
          const listFiltred = mapEventi.get(acquisto.prodotto);
          if(listFiltred){
            listFiltred.push(getEvent(acquisto, true))
          } else {
            let newListFiltred = [];
            newListFiltred.push(getEvent(acquisto, true))
            mapEventi.set(acquisto.prodotto,newListFiltred);
          }
        });
      }
    return mapEventi;
}