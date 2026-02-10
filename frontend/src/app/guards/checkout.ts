import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const checkoutGuard: CanActivateFn = () => {
  const auth = inject(AuthService); 
  const router = inject(Router);

  const isLoggedIn = auth.isLoggedIn; 

  return isLoggedIn
    ? true
    : router.createUrlTree(['/login']);
};