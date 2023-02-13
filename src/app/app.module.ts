import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { DetailProductPageComponent } from './components/pages/detail-product-page/detail-product-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BioComponent } from './components/pages/home-page/bio/bio.component';
import { WhatWeDoComponent } from './components/pages/home-page/what-we-do/what-we-do.component';
import { CardProdottoComponent } from './components/cards/card-prodotto/card-prodotto.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProdottiComponent } from './components/list-prodotti/list-prodotti.component';
import { ListEventiComponent } from './components/list-eventi/list-eventi.component';
import { CardEventoComponent } from './components/cards/card-evento/card-evento.component';
import { CoreModule } from './core.ap/core.module';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DetailProductPageComponent,
    UserPageComponent,
    NavbarComponent,
    BioComponent,
    WhatWeDoComponent,
    CardProdottoComponent,
    FooterComponent,
    ListProdottiComponent,
    ListEventiComponent,
    CardEventoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory 
    }),
    NgbModalModule,
    FlatpickrModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    AngularEditorModule,
    MatDividerModule,
    MatBadgeModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
