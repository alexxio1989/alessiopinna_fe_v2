import { Constants } from "../constants/constants";
import { UtenteDto } from "../dto/utenteDto";

export class Util{
    static isSuperUser(utente :UtenteDto):boolean{
        return utente ?  Constants.SUPER_USER === utente.tipoUtente.codice : false;
    }
}