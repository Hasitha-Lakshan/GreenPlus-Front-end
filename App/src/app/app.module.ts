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
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './security/auth.guard';
import { SignupAdminComponent } from './auth/signup-admin/signup-admin.component';
import { ShopsHomeComponent } from './shops/shops-home/shops-home.component';
import { ShopDetailsComponent } from './shops/shop-details/shop-details.component';
import { ErrorComponent } from './error/error/error.component';
import { ShopsProfileComponent } from './shops/shops-profile/shops-profile.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';
import { BuyerRequestComponent } from './buyer-request/buyer-request.component';
import { SearchBarBuyerRequestComponent } from './buyer-request/search-bar-buyer-request/search-bar-buyer-request.component';
import { SettingsComponent } from './user/settings/settings.component';
import { BuyerRequestProfileComponent } from './buyer-request/buyer-request-profile/buyer-request-profile.component';
import { AdminDashboardComponent } from './user/profile/admin-dashboard/admin-dashboard.component';
import { BuyerDashboardComponent } from './user/profile/buyer-dashboard/buyer-dashboard.component';
import { FarmerDashboardComponent } from './user/profile/farmer-dashboard/farmer-dashboard.component';
import { ShopUpdateComponent } from './shops/shop-update/shop-update.component';
import { ShopCreateComponent } from './shops/shop-create/shop-create.component';
import { BuyerRequestCreateComponent } from './buyer-request/buyer-request-create/buyer-request-create.component';
import { BuyerRequestUpdateComponent } from './buyer-request/buyer-request-update/buyer-request-update.component';
import { UserDetailsUpdateComponent } from './user/settings/user-details-update/user-details-update.component';
import { OrderRequirementComponent } from './order/order-requirement/order-requirement.component';
import { OrdersDashboardComponent } from './order/orders-dashboard/orders-dashboard.component';
import { OrderStatusBarComponent } from './order/order-status-bar/order-status-bar.component';
import { InprogressOrdersComponent } from './order/inprogress-orders/inprogress-orders.component';
import { ActiveOrdersComponent } from './order/active-orders/active-orders.component';
import { LateOrdersComponent } from './order/late-orders/late-orders.component';
import { CompleteOrdersComponent } from './order/complete-orders/complete-orders.component';
import { MessagesComponent } from './user/messages/messages.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    LoginComponent,
    SignupComponent,
    SignupAdminComponent,
    ShopsHomeComponent,
    ShopDetailsComponent,
    ErrorComponent,
    ShopsProfileComponent,
    ProfileComponent,
    UserComponent,
    BuyerRequestComponent,
    SearchBarBuyerRequestComponent,
    SettingsComponent,
    BuyerRequestProfileComponent,
    AdminDashboardComponent,
    BuyerDashboardComponent,
    FarmerDashboardComponent,
    ShopUpdateComponent,
    ShopCreateComponent,
    BuyerRequestCreateComponent,
    BuyerRequestUpdateComponent,
    UserDetailsUpdateComponent,
    OrderRequirementComponent,
    OrdersDashboardComponent,
    OrderStatusBarComponent,
    InprogressOrdersComponent,
    ActiveOrdersComponent,
    LateOrdersComponent,
    CompleteOrdersComponent,
    MessagesComponent,
    OrderDetailsComponent,
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
