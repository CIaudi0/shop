import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000'; // URL backend

  // Signal per sapere se l'utente è loggato
  currentUser = signal<any>(null);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/session`, credentials).pipe(
      tap(response => {
        this.currentUser.set(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    return this.http.delete(`${this.apiUrl}/session`).pipe(
      tap(() => {
        this.currentUser.set(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
    );
  }

  get isLoggedIn() {
    return !!this.currentUser();
  }
}