export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  timestamp: string;
  firstName: string | null;
  lastName: string | null;
  shippingAddress: string | null;
  paymentMethod: string | null;
  notes: string | null;
}

export interface Wishlist {
  id: string;
  userId: string;
  productIds: string[];
}

export interface CheckoutData {
  userId: string;
  firstName: string;
  lastName: string;
  shippingAddress: string;
  paymentMethod: string;
  notes: string;
}

export interface CartRequest {
  userId: string;
  productId: string;
  quantity: number;
}
