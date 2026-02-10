import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  create(order: Order) {
    // Invia l'ordine al backend
    return this.http.post<Order>(this.apiUrl, order);
  }
}