// Theme Service for managing application themes
// SPL VARIATION POINT: Theme selection (Light/Dark)

export type Theme = "light" | "dark";

class ThemeService {
  private currentTheme: Theme = "light";
  private readonly THEME_KEY = "app-theme";

  constructor() {
    this.loadTheme();
  }

  // Load theme from localStorage or default to light
  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = "light";
    }
    this.applyTheme(this.currentTheme);
  }

  // Get current theme
  getTheme(): Theme {
    return this.currentTheme;
  }

  // Set and apply theme
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  // Toggle between light and dark
  toggleTheme(): Theme {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
    return newTheme;
  }

  // Apply theme to document
  private applyTheme(theme: Theme): void {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

export const themeService = new ThemeService();
