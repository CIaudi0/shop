import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout';
import { checkoutGuard } from './guards/checkout';

export const routes: Routes = [
  // ... altre rotte
  { 
    path: 'checkout', 
    component: CheckoutComponent, 
    canActivate: [checkoutGuard] 
  }
];