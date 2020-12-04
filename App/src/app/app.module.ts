import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage'
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientInterceptor } from './security/http-client-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { ShopCardsComponent } from './home/shop-cards/shop-cards.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './security/auth.guard';
import { SignupAdminComponent } from './auth/signup-admin/signup-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    ShopCardsComponent,
    LoginComponent,
    SignupComponent,
    SignupAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("authenticationtoken");
        },
      }
    }),
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
