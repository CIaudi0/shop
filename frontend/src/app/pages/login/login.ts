import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  isLogin = false; 
  errorMsg = '';

  form = this.fb.group({
    email_address: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      this.isLogin = true;
      this.errorMsg = '';
      
      this.auth.login(this.form.value).subscribe({
        next: () => {
          this.isLogin = false;
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          this.isLogin = false;
          this.errorMsg = 'Credenziali errate';
          console.error(err);
        }
      });
    }
  }
}