import { CalendarEvent } from "angular-calendar";
import { Dominio } from "../dto/dominio";
import { EventoDto } from "../dto/eventoDto";
import { ProdottoDto } from "../dto/prodottoDto";
import { UtenteDto } from "../dto/utenteDto";


export function getMapProdotti(prodotti: ProdottoDto[]) : Map<Dominio, ProdottoDto[]>{
    let mapProdotti = new Map<Dominio, ProdottoDto[]>();
    if(prodotti){
      prodotti.forEach(prodotto => {
        const listFiltred = mapProdotti.get(prodotto.tipoServizio);
        if (listFiltred) {
        listFiltred.push(prodotto);
        } else {
        let newListFiltred = [];
        newListFiltred.push(prodotto);
        mapProdotti.set(prodotto.tipoServizio, newListFiltred);
        }
      });
    }
    return mapProdotti;
}

export function getMapEventi(eventi: EventoDto[]) : Map<Dominio, EventoDto[]>{
  let mapProdotti = new Map<Dominio, EventoDto[]>();
  if(eventi){
    eventi.forEach(evento => {
      const listFiltred = mapProdotti.get(evento.tipoServizio);
      if (listFiltred) {
      listFiltred.push(evento);
      } else {
      let newListFiltred = [];
      newListFiltred.push(evento);
      mapProdotti.set(evento.tipoServizio, newListFiltred);
      }
    });
  }
  return mapProdotti;
}
/* 
export function getMapEventiUtente(utente : UtenteDto): Map<ProdottoDto, CalendarEvent<EventoDto>[]>{
    let mapEventi = new Map<ProdottoDto, CalendarEvent<EventInfo>[]>();
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
} */