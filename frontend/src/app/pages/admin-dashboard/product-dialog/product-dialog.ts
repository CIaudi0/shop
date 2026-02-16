import { Component, inject, model } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatDialogModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Modifica Prodotto' : 'Nuovo Prodotto' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Titolo</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Descrizione</mat-label>
          <textarea matInput formControlName="description"></textarea>
        </mat-form-field>

        <div style="display: flex; gap: 10px;">
          <mat-form-field appearance="fill">
            <mat-label>Prezzo</mat-label>
            <input matInput type="number" formControlName="price">
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Prezzo Originale</mat-label>
            <input matInput type="number" formControlName="originalPrice">
          </mat-form-field>
        </div>

        <mat-checkbox formControlName="sale">In Offerta</mat-checkbox>
        
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>URL Immagine</mat-label>
          <input matInput formControlName="thumbnail">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Annulla</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Salva</button>
    </mat-dialog-actions>
  `,
  styles: ['.full-width { width: 100%; margin-bottom: 10px; }']
})
export class ProductDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  form: FormGroup = this.fb.group({
    title: [this.data?.title || '', Validators.required],
    description: [this.data?.description || ''],
    price: [this.data?.price || 0, [Validators.required, Validators.min(0)]],
    originalPrice: [this.data?.originalPrice || 0],
    sale: [this.data?.sale || false],
    thumbnail: [this.data?.thumbnail || '']
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}