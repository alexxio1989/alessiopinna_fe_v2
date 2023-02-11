import { CoreDto } from "./core/coreDto";
import { Dominio } from "./dominio";
import { ImageDto } from "./imageDto";

export class ServizioDto extends CoreDto{
    nome:string;
    nomeExt:string;
    descrizione:string;
    dataCreazione:Date;
    enable:boolean;
    prezzo:number;
    tipoServizio:Dominio;
    images: ImageDto[]
}