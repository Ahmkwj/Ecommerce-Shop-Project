import type { Product } from "../types";
import { apiGet } from "./api";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return apiGet<Product[]>("/products");
  },

  async getProductById(id: string): Promise<Product> {
    return apiGet<Product>(`/products/${id}`);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiGet<Product[]>(
      `/products/category/${encodeURIComponent(category)}`
    );
  },

  async searchProducts(name: string): Promise<Product[]> {
    return apiGet<Product[]>(`/products/search/${encodeURIComponent(name)}`);
  },

  async getProductsSortedByPriceAsc(): Promise<Product[]> {
    return apiGet<Product[]>("/products/sort/price/asc");
  },

  async getProductsSortedByPriceDesc(): Promise<Product[]> {
    return apiGet<Product[]>("/products/sort/price/desc");
  },
};
