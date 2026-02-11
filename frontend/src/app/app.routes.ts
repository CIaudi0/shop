import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout';
import { LoginComponent } from './pages/login/login';
import { checkoutGuard } from './guards/checkout';
import { HomeComponent } from './pages/home/home'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  { 
    path: 'home', 
    component: HomeComponent
  },

  { 
    path: 'checkout', 
    component: CheckoutComponent, 
    canActivate: [checkoutGuard] 
  },
  
  { path: '**', redirectTo: 'home' }
];