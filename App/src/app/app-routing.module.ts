import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupAdminComponent } from './auth/signup-admin/signup-admin.component';
import { ShopDetailsComponent } from './shops/shop-details/shop-details.component';
import { ErrorComponent } from './error/error/error.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';
import { BuyerRequestComponent } from './buyer-request/buyer-request.component';
import { SettingsComponent } from './user/settings/settings.component';
import { AdminDashboardComponent } from './user/profile/admin-dashboard/admin-dashboard.component';
import { BuyerDashboardComponent } from './user/profile/buyer-dashboard/buyer-dashboard.component';
import { FarmerDashboardComponent } from './user/profile/farmer-dashboard/farmer-dashboard.component';
import { ShopUpdateComponent } from './shops/shop-update/shop-update.component'
import { ShopCreateComponent } from './shops/shop-create/shop-create.component'
import { BuyerRequestCreateComponent } from './buyer-request/buyer-request-create/buyer-request-create.component';
import { BuyerRequestUpdateComponent } from './buyer-request/buyer-request-update/buyer-request-update.component';
import { UserDetailsUpdateComponent } from './user/settings/user-details-update/user-details-update.component';
import { OrderRequirementComponent } from './order/order-requirement/order-requirement.component';
import { OrdersDashboardComponent } from './order/orders-dashboard/orders-dashboard.component'
import { InprogressOrdersComponent } from './order/inprogress-orders/inprogress-orders.component';
import { ActiveOrdersComponent } from './order/active-orders/active-orders.component';
import { LateOrdersComponent } from './order/late-orders/late-orders.component';
import { CompleteOrdersComponent } from './order/complete-orders/complete-orders.component';
import { MessagesComponent } from './user/messages/messages.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';


const routes: Routes = [
  // Main Components
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup-admin', component: SignupAdminComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  // User Components
  { path: 'user/:username', component: UserComponent },
  { path: 'user/:username/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/settings/update-user-details', component: UserDetailsUpdateComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/buyer-dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/farmer-dashboard', component: FarmerDashboardComponent, canActivate: [AuthGuard] },

  // Shop Components
  { path: 'shop/:shopId', component: ShopDetailsComponent },
  { path: 'farmer-dashboard/update-shop/:shopId', component: ShopUpdateComponent, canActivate: [AuthGuard] },
  { path: 'farmer-dashboard/create-shop', component: ShopCreateComponent, canActivate: [AuthGuard] },

  // Buyer Request Components
  { path: 'buyer-requests', component: BuyerRequestComponent, canActivate: [AuthGuard] },
  { path: 'buyer-dashboard/update-buyer-request/:buyerRequestId', component: BuyerRequestUpdateComponent, canActivate: [AuthGuard] },
  { path: 'buyer-dashboard/create-buyer-request', component: BuyerRequestCreateComponent, canActivate: [AuthGuard] },

  // Order Components
  { path: 'shop/:shopId/order-requirement', component: OrderRequirementComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:username/orders-dashboard', component: OrdersDashboardComponent,
    children: [
      { path: '', component: InprogressOrdersComponent },
      { path: 'inprogress-orders', component: InprogressOrdersComponent },
      { path: 'active-orders', component: ActiveOrdersComponent },
      { path: 'late-orders', component: LateOrdersComponent },
      { path: 'complete-orders', component: CompleteOrdersComponent }],
    canActivate: [AuthGuard]
  },
  { path: 'user/:username/order/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard] },

  // Error Components
  { path: 'error', component: ErrorComponent },

  // Auto Redirection for Unknown paths
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []
