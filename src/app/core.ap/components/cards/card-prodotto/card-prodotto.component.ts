import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdottoDto } from 'src/app/core.ap/dto/prodottoDto';
import { ServizioService } from 'src/app/core.ap/service/servizio.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-prodotto',
  templateUrl: './card-prodotto.component.html',
  styleUrls: ['./card-prodotto.component.scss']
})
export class CardProdottoComponent implements OnInit {

  @Input() prodotto: ProdottoDto;

  constructor(private user_service:UtenteService , 
              private servizio_service:ServizioService ,
              private route: Router,public dialog: MatDialog) { }

  ngOnInit(): void {}

  goToDetail(){
    if(this.user_service.getUtente()){
      this.servizio_service.rmvServizio();
      this.servizio_service.setServizio(this.prodotto)
      this.route.navigate(['/detail']);
    }else{
      this.openLogin()
    }
    
  }

  openLogin(){
    window.open(environment.path + "/login/google");
    window.self.close();
    
  }

}
