export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  sale: boolean;
  thumbnail?: string;
  tags?: string[];
  createdAt: string;
}

export interface Order {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    zip: string;
  };
  items: any[];
  total: number;
  createdAt: string;
}