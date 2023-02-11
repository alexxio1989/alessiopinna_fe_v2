import { Component, Input, OnInit } from '@angular/core';
import { Dominio } from 'src/app/core.ap/dto/dominio';
import { EventoDto } from 'src/app/core.ap/dto/eventoDto';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';

@Component({
  selector: 'app-list-eventi',
  templateUrl: './list-eventi.component.html',
  styleUrls: ['./list-eventi.component.scss']
})
export class ListEventiComponent implements OnInit {

  @Input() eventi : Map<Dominio, EventoDto[]>;

  constructor(public ds: DelegateService) { }

  ngOnInit(): void {
  }

}
