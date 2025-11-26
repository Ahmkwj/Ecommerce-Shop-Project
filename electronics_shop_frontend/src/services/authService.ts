import type { User } from "../types";
import { apiPost } from "./api";

export const authService = {
  async register(username: string, password: string): Promise<User | null> {
    try {
      const user = await apiPost<User>(
        `/users/register?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`
      );
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  },

  async login(username: string, password: string): Promise<User | null> {
    try {
      const user = await apiPost<User>(
        `/users/login?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`
      );
      return user;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },

  saveAuth(user: User): void {
    localStorage.setItem("userId", user.id);
    localStorage.setItem("username", user.username);
  },

  logout(): void {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  },

  getCurrentUserId(): string | null {
    return localStorage.getItem("userId");
  },

  getCurrentUsername(): string | null {
    return localStorage.getItem("username");
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUserId();
  },
};
