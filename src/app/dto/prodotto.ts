import { Dominio } from "./dominio";

export class Prodotto{
    id:number;
    nome:string;
    nomeExt:string;
    descrizione:string;
    imgName:string;
    tipo:Dominio;
    giorniOrari:string;
    prezzo:number;
    dataCreazione:Date;
}