import type { Cart, CartRequest } from "../types";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export const cartService = {
  async getCart(userId: string): Promise<Cart> {
    return apiGet<Cart>(`/cart/${userId}`);
  },

  async addToCart(request: CartRequest): Promise<Cart> {
    return apiPost<Cart>("/cart/add", request);
  },

  async updateQuantity(request: CartRequest): Promise<Cart> {
    return apiPut<Cart>("/cart/update", request);
  },

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    return apiDelete<Cart>(`/cart/remove/${productId}?userId=${userId}`);
  },

  async clearCart(userId: string): Promise<Cart> {
    return apiDelete<Cart>(`/cart/clear/${userId}`);
  },

  async getCartTotal(userId: string): Promise<number> {
    return apiGet<number>(`/cart/total/${userId}`);
  },

  async getCartCount(userId: string): Promise<number> {
    return apiGet<number>(`/cart/count/${userId}`);
  },
};
