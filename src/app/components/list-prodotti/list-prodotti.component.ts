import { Component, Input, OnInit } from '@angular/core';
import { Dominio } from 'src/app/core.ap/dto/dominio';
import { ProdottoDto } from 'src/app/core.ap/dto/prodottoDto';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';

@Component({
  selector: 'app-list-prodotti',
  templateUrl: './list-prodotti.component.html',
  styleUrls: ['./list-prodotti.component.scss']
})
export class ListProdottiComponent implements OnInit {

  @Input() prodotti : Map<String, ProdottoDto[]>;

  constructor(public ds: DelegateService) { }

  ngOnInit(): void {
  }

}
