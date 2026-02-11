import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from './product-dialog/product-dialog';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatTabsModule, 
    MatButtonModule, MatIconModule, MatDialogModule
  ],
  templateUrl: './admin-dashboard.html',
  styles: [`
    table { width: 100%; margin-top: 10px; }
    .header-actions { display: flex; justify-content: space-between; align-items: center; }
  `]
})
export class AdminDashboardComponent {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  
  users = signal<any[]>([]);
  products = signal<any[]>([]);
  orders = signal<any[]>([]);

  productColumns = ['id', 'title', 'price', 'actions'];

  constructor() {
    this.loadData();
  }

  loadData() {
    const opts = { withCredentials: true };
    this.http.get<any[]>('http://localhost:3000/admin/users', opts).subscribe(d => this.users.set(d));
    this.http.get<any[]>('http://localhost:3000/admin/orders', opts).subscribe(d => this.orders.set(d));
    
    this.http.get<any[]>('http://localhost:3000/admin/products', opts).subscribe({
      next: data => this.products.set(data),
      error: err => console.error('Error products', err)
    });
  }

  // --- AZIONI PRODOTTI ---

  addProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Chiamata API Create
        this.http.post('http://localhost:3000/admin/products', result, { withCredentials: true })
          .subscribe(() => this.loadData());
      }
    });
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, { 
      width: '400px',
      data: product 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put(`http://localhost:3000/admin/products/${product.id}`, result, { withCredentials: true })
          .subscribe(() => this.loadData());
      }
    });
  }

  deleteProduct(id: number) {
    if(confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      this.http.delete(`http://localhost:3000/admin/products/${id}`, { withCredentials: true })
        .subscribe(() => this.loadData());
    }
  }
}