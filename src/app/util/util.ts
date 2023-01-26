import { Constants } from "../constants/constants";
import { Utente } from "../dto/utente";

export class Util{
    static isSuperUser(utente :Utente):boolean{
        return utente ? false : Constants.SUPER_USER === utente.tipo.codice;
    }
}