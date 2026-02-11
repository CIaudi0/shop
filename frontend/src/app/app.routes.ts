import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout';
import { LoginComponent } from './pages/login/login';
import { checkoutGuard } from './guards/checkout';
import { HomeComponent } from './pages/home/home'; 
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';

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

  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
  },
  
  { path: '**', redirectTo: 'home' }
];