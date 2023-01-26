
import { DatiEvento } from "./datiEvento";
import { Prodotto } from "./prodotto";
import { Utente } from "./utente";

export class Acquisto{
    id:number;
    utente:Utente;
    prodotto:Prodotto;
    quantita:number;
    dataAcquisto:Date;
    fromDetail:boolean;
    datiEvento:DatiEvento
}