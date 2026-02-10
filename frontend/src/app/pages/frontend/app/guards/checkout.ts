import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service'; // Decommenta quando hai il service

export const checkoutGuard: CanActivateFn = () => {
  // const auth = inject(AuthService); // Decommenta quando hai il service
  const router = inject(Router);

  // MOCK TEMPORANEO: Cambia 'true' con 'auth.isLoggedIn' quando pronto
  const isLoggedIn = true; 

  return isLoggedIn
    ? true
    : router.createUrlTree(['/login']);
};