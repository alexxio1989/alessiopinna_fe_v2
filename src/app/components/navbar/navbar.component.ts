import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UtenteService } from 'src/app/core.ap/service/utente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private route: Router,
    public us: UtenteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openLogin() {
    this.us.googleLogin()
  }

  logout() {
    this.us.sbjUtente.next(undefined);
    this.route.navigate(['']);
  }

  goTo(path: string) {
    if ('' !== path) {
      this.route.navigate(['/' + path]);
    } else {
      this.route.navigate(['']);
    }
  }
}
