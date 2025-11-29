import type { Order, CheckoutData } from "../types";
import { apiGet, apiPost, apiPut } from "./api";

export const orderService = {
  async createOrder(userId: string): Promise<Order> {
    return apiPost<Order>("/orders", { userId });
  },

  async checkout(checkoutData: CheckoutData): Promise<Order> {
    return apiPost<Order>("/orders/checkout", checkoutData);
  },

  async getAllOrders(): Promise<Order[]> {
    return apiGet<Order[]>("/orders");
  },

  async getOrderById(orderId: string): Promise<Order> {
    return apiGet<Order>(`/orders/${orderId}`);
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return apiGet<Order[]>(`/orders/user/${userId}`);
  },

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return apiGet<Order[]>(`/orders/status/${status}`);
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return apiPut<Order>(`/orders/${orderId}/status/${status}`);
  },

  async cancelOrder(orderId: string): Promise<Order> {
    return apiPut<Order>(`/orders/${orderId}/cancel`);
  },
};
