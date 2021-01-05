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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

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
    CreateBuynowDialog,
    LoginComponent,
    SignupComponent
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
    ShareIconsModule,
    SocialLoginModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('528961187921-ld24b25466u4t2lacn9r35asg000lfis.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
