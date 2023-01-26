import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { DetailProductPageComponent } from './components/pages/detail-product-page/detail-product-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'detail-page', component: DetailProductPageComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'admin-page', component: AdminPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
