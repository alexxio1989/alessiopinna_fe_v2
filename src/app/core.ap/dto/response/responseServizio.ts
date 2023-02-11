import { ResponseCore } from "../core/responseCore";
import { EventoDto } from "../eventoDto";
import { ProdottoDto } from "../prodottoDto";

export class ResponseServizio extends ResponseCore{
    prodotti:ProdottoDto[]
    eventi:EventoDto[]
}