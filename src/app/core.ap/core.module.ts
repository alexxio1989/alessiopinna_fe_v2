import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogLoginAdminComponent } from './pages/dashboard/dialog-login-admin/dialog-login-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListTipiServiziComponent } from './pages/dashboard/list-tipi-servizi/list-tipi-servizi.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    DashboardComponent,
    DialogLoginAdminComponent,
    ListTipiServiziComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDividerModule
  ]
})
export class CoreModule { }
