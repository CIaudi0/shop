import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule],
  templateUrl: './admin-dashboard.html',
  styles: [`table { width: 100%; margin-top: 10px; }`]
})
export class AdminDashboardComponent {
  http = inject(HttpClient);
  
  users = signal<any[]>([]);
  products = signal<any[]>([]);
  orders = signal<any[]>([]);

  constructor() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/admin/users')
      .subscribe(data => this.users.set(data));

    this.http.get<any[]>('http://localhost:3000/admin/products')
      .subscribe(data => this.products.set(data));

    this.http.get<any[]>('http://localhost:3000/admin/orders')
      .subscribe(data => this.orders.set(data));
  }
}