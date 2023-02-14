import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventoDto } from 'src/app/core.ap/dto/eventoDto';
import { ServizioService } from 'src/app/core.ap/service/servizio.service';
import { UtenteService } from 'src/app/core.ap/service/utente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-evento',
  templateUrl: './card-evento.component.html',
  styleUrls: ['./card-evento.component.scss']
})
export class CardEventoComponent implements OnInit {

  @Input() evento: EventoDto;

  constructor(private user_service:UtenteService , 
              private servizio_service:ServizioService ,
              private route: Router,public dialog: MatDialog) { }

  ngOnInit(): void {}

  goToDetail(){
    if(this.user_service.getUtente()){
      this.servizio_service.rmvServizio();
      this.servizio_service.setServizio(this.evento)
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
