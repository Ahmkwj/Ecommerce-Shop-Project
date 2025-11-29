export type Theme = "light" | "dark";

class ThemeService {
  getTheme(): Theme {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  canSwitchTheme(): boolean {
    return false;
  }

  loadTheme(): void {}

  setTheme(_theme: Theme): void {}

  toggleTheme(): Theme {
    return this.getTheme();
  }
}

export const themeService = new ThemeService();
