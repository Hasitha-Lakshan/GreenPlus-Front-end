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
