import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Dominio } from 'src/app/core.ap/dto/dominio';
import { EventoDto } from 'src/app/core.ap/dto/eventoDto';
import { ProdottoDto } from 'src/app/core.ap/dto/prodottoDto';
import { getMapEventi, getMapProdotti } from 'src/app/core.ap/mapper/common-mapper';
import { mapLoginUtente } from 'src/app/core.ap/mapper/utente-mapper';
import { DelegateService } from 'src/app/core.ap/service/delegate.service';
import { ServizioService } from 'src/app/core.ap/service/servizio.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  prodotti = new Map<String, ProdottoDto[]>();
  eventi = new Map<String, EventoDto[]>();

  constructor(public ss: ServizioService,
    private ds:DelegateService ,
    private router: ActivatedRoute,
    private route: Router,
    private us:UtenteService) { }

  ngOnInit(): void {
    this.loginFromParams()
    this.ss.getProdotti().subscribe(next =>{
      this.ds.sbjSpinner.next(false);
      if(next){
        this.prodotti = getMapProdotti(next.prodotti)
        this.eventi = getMapEventi(next.eventi)
      }
      
    }, error => {
      this.ds.sbjSpinner.next(false);
      this.ds.sbjErrorsNotification.next("Errore durante il recupero dei servizi");
    })
  }

  private loginFromParams() {
    this.router.queryParams.subscribe(params => {
      if (params.email && params.id) {
        let requestLogin = mapLoginUtente(params.email, params.id);
        this.us.login(requestLogin).subscribe(next => {
          this.ds.sbjSpinner.next(false);
          if (!next.success) {
            this.ds.sbjErrorsNotification.next(next.error);
          } else {
            this.ds.sbjErrorsNotification.next("Login avvenuta con successo");
            
            this.us.sbjUtente.next(next.utente);
            this.route.navigate(['']);
          }
        }, error => {
          this.ds.sbjSpinner.next(false);
          this.ds.sbjErrorsNotification.next("Errore durante la login");
        });
      }
    });
  }

}
