import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './services/cart';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'My Store';

  private router = inject(Router);
  public cartService = inject(CartService);
  public authService = inject(AuthService);
user: any;
  
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
  
  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    console.log('AppComponent.logout() called');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout success');
        try {
          this.authService.currentUser.set(null);
        } catch (e) {}
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout request failed', err);
        try {
          this.authService.currentUser.set(null);
        } catch (e) {}
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}