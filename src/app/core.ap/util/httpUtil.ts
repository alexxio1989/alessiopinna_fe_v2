import { HttpHeaders } from '@angular/common/http';
import { UtenteDto } from '../dto/utenteDto'
import { Constants } from '../constants/constants';

export function getHeaderForUser(utente:UtenteDto):HttpHeaders{
    const id = utente ? utente.id : null;
    let headers = new HttpHeaders();
    if (id) {
      headers = new HttpHeaders().set(Constants.ID_UTENTE, id);
    }
    return headers;
}