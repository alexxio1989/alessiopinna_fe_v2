import { AcquistoDto } from "./acquistoDto";
import { CoreDto } from "./core/coreDto";
import { Dominio } from "./dominio";
import { TokenResponse } from "./tokenResponse";

export class UtenteDto extends CoreDto{
    anagrafica:string;
    email:string;
    provider:string;
    photoUrl: string;
    tipoUtente:Dominio;
    totAcquistiProdotti:number;
    totAcquistiEventi:number;
    tokens: TokenResponse[] = [];
    
}