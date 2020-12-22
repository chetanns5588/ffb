import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsandconditionsComponent } from './footer/termsandconditions/termsandconditions.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:prodId', component: ProductDetailComponent },
  { path: 'termsandcondition', component: TermsandconditionsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
