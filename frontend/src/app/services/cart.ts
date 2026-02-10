import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);

  // Calcolo automatico del totale
  total = computed(() => 
    this.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  // Calcolo numero elementi
  count = computed(() => 
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  addToCart(product: Product) {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(i => i.id === product.id);
      
      if (existingItem) {
        // Se esiste, incrementa quantità
        return currentItems.map(i => 
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Se nuovo, aggiungi con quantità 1
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  }

  clearCart() {
    this.items.set([]);
  }
}