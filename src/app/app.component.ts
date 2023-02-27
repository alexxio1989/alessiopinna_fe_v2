import { ServizioService } from '@alexxio1989/ap-dashboard';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private spinner: NgxSpinnerService ,
    private _snackBar: MatSnackBar,
    private ss: ServizioService) { }

  ngOnInit(): void {
  
    this.ss.getAll().subscribe(next => {
      console.log(JSON.stringify(next))
    })
  }
}
