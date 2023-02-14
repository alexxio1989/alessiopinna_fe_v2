import { CalendarEvent } from "angular-calendar";
import { Dominio } from "../dto/dominio";
import { EventoDto } from "../dto/eventoDto";
import { ProdottoDto } from "../dto/prodottoDto";
import { UtenteDto } from "../dto/utenteDto";


export function getMapProdotti(prodotti: ProdottoDto[]) : Map<String, ProdottoDto[]>{
    let mapProdotti = new Map<String, ProdottoDto[]>();
    if(prodotti){
      prodotti.forEach(prodotto => {
        /* let keys = Array.from( mapProdotti.keys() );
        if(keys){
          let filtredByID = keys.filter(d => d.id === prodotto.tipoServizio.id)
          if(filtredByID && filtredByID.length === 1){
            let dominioFiltred filtredByID
          }
        } */
        const listFiltred = mapProdotti.get(prodotto.tipoServizio.id);
        if (listFiltred) {
        listFiltred.push(prodotto);
        } else {
          let newListFiltred = [];
          newListFiltred.push(prodotto);
          mapProdotti.set(prodotto.tipoServizio.id, newListFiltred);
        }
      });
    }
    return mapProdotti;
}

export function getMapEventi(eventi: EventoDto[]) : Map<String, EventoDto[]>{
  let mapProdotti = new Map<String, EventoDto[]>();
  if(eventi){
    eventi.forEach(evento => {
      const listFiltred = mapProdotti.get(evento.tipoServizio.id);
      if (listFiltred) {
      listFiltred.push(evento);
      } else {
      let newListFiltred = [];
      newListFiltred.push(evento);
      mapProdotti.set(evento.tipoServizio.id, newListFiltred);
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