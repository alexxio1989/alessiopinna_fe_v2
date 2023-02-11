import { AcquistoDto } from "../acquistoDto";
import { ResponseCore } from "../core/responseCore";

export class ResponseAcquisto extends ResponseCore{
    acquisti: AcquistoDto[];
    acquistiUtente: AcquistoDto[];
}