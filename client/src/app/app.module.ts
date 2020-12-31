import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/banner/banner.component';
import { ProductsComponent } from './home/products/products.component';
import { TabsComponent } from './home/tabs/tabs.component';
import { ProductComponent } from './home/products/product/product.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateBuynowDialog } from './product-detail/create-buynow-dialog/create-buynow-dialog';
import { TermsandconditionsComponent } from './footer/termsandconditions/termsandconditions.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    TabsComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailComponent,
    HomeComponent,
    FooterComponent,
    TermsandconditionsComponent,
    CreateBuynowDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxPaginationModule,
    CarouselModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
