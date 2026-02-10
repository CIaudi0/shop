import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Se vuoi una card
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

  form = this.fb.group({
    email_address: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMsg = '';

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        error: (err) => {
          this.errorMsg = 'Credenziali errate';
          console.error(err);
        }
      });
    }
  }
}