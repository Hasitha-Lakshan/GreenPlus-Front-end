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
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/buyer-dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/:username/farmer-dashboard', component: FarmerDashboardComponent, canActivate: [AuthGuard] },

  // Shop Components
  { path: 'shop/:shopId', component: ShopDetailsComponent },

  // Buyer Request Components
  { path: 'buyer-requests', component: BuyerRequestComponent, canActivate: [AuthGuard] },

  // Error Components
  { path: 'error', component: ErrorComponent },

  // Auto Redirection for Unknown paths
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []
