import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { take } from 'rxjs';
import { Order } from '../../models/product';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  
  // MOCK Services: Sostituisci con inject(OrderService) e inject(CartService)
  private orderService = { create: (o: any) => ({ subscribe: (cb: any) => cb.next() }) };
  private cartService = { items$: { pipe: (op: any) => ({ subscribe: (fn: any) => fn([]) }) }, clear: () => {} };

  loading = false;
  orderSuccess = false;
  orderError = false;
  showSummary = false;

  // Observable simulato del carrello
  items$ = this.cartService.items$;

  form: FormGroup = this.fb.group({
    customer: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }),
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    })
  });

  // --- METODI DI CIRO ---

  getControl(path: string) {
    return this.form.get(path);
  }

  hasError(path: string, errorCode: string): boolean {
    const control = this.getControl(path);
    return !!control && control.hasError(errorCode) && control.touched;
  }

  private focusFirstInvalid(): void {
    const firstInvalid = document.querySelector(
      'form .ng-invalid[formControlName]'
    ) as HTMLElement | null;
    firstInvalid?.focus();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showSummary = true;
      this.focusFirstInvalid();
      return;
    }

    this.loading = true;
    this.orderSuccess = false;
    this.orderError = false;
    
    const value = this.form.getRawValue();

    this.items$.pipe(take(1)).subscribe((items: any[]) => {
      const order: Order = {
        customer: value.customer!,
        address: value.address!,
        items,
        total: items.reduce(
          (sum, it) => sum + it.price * it.quantity, 0),
        createdAt: new Date().toISOString()
      };

      // Chiamata al servizio (simulato per ora)
      this.orderService.create(order).subscribe({
        next: () => {
          this.loading = false;
          this.orderSuccess = true;
          this.cartService.clear();
          this.form.reset();
        },
        error: () => {
          this.loading = false;
          this.orderError = true;
        }
      });
    });
  }
}