import type { Wishlist } from "../types";
import { apiGet, apiPost, apiDelete } from "./api";

export const wishlistService = {
  async getWishlist(userId: string): Promise<Wishlist> {
    return apiGet<Wishlist>(`/wishlist/${userId}`);
  },

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    return apiPost<Wishlist>(
      `/wishlist/add?userId=${userId}&productId=${productId}`
    );
  },

  async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<Wishlist> {
    return apiDelete<Wishlist>(
      `/wishlist/remove?userId=${userId}&productId=${productId}`
    );
  },

  async clearWishlist(userId: string): Promise<Wishlist> {
    return apiDelete<Wishlist>(`/wishlist/clear/${userId}`);
  },

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    return apiGet<boolean>(
      `/wishlist/check?userId=${userId}&productId=${productId}`
    );
  },
};
