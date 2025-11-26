// SPL VARIATION POINT: Theme Configuration
// Import the appropriate theme config file for your variant
// For dark theme variant: import from "./config/theme.dark"
// For light theme variant: import from "./config/theme.light"

import {
  THEME_MODE,
  initializeTheme,
  canSwitchTheme,
} from "../config/theme.light";

export type Theme = "light" | "dark";

class ThemeService {
  private currentTheme: Theme = THEME_MODE as Theme;
  private readonly canSwitch: boolean = canSwitchTheme;

  constructor() {
    this.loadTheme();
  }

  // Load theme (now fixed based on variant)
  loadTheme(): void {
    initializeTheme();
  }

  // Get current theme
  getTheme(): Theme {
    return this.currentTheme;
  }

  // Theme switching disabled in single-theme variants
  canSwitchTheme(): boolean {
    return this.canSwitch;
  }

  // Dummy methods for compatibility (do nothing in single-theme mode)
  setTheme(_theme: Theme): void {
    // No-op in single theme mode
  }

  toggleTheme(): Theme {
    // No-op in single theme mode
    return this.currentTheme;
  }
}

export const themeService = new ThemeService();
