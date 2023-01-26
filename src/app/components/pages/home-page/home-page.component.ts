import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapLoginUtente } from 'src/app/mapper/utente-mapper';
import { DelegateService } from 'src/app/service/delegate.service';
import { ProdottoService } from 'src/app/service/prodotto.service';
import { UtenteService } from 'src/app/service/utente.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public ps: ProdottoService,
    private ds:DelegateService ,
    private route: ActivatedRoute,
    private us:UtenteService) { }

  ngOnInit(): void {
    this.loginFromParams()
  }

  private loginFromParams() {
    this.route.queryParams.subscribe(params => {
      if (params.email && params.id) {
        let requestLogin = mapLoginUtente(params.email, params.id);
        this.us.login(requestLogin).subscribe(next => {
          this.ds.sbjSpinner.next(false);
          if (!next.success) {
            this.ds.sbjErrorsNotification.next(next.error);
          } else {
            this.ds.sbjErrorsNotification.next("Login avvenuta con successo");
            this.us.sbjUtente.next(next.utente);
          }
        }, error => {
          this.ds.sbjSpinner.next(false);
          this.ds.sbjErrorsNotification.next("Errore durante la login");
        });
      }
    });
  }

}
