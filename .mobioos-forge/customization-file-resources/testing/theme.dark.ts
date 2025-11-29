// SPL VARIATION POINT: Dark Theme Configuration
// This file is used for DARK theme variants

export const THEME_MODE = "dark";

// Apply dark theme on app initialization
export const initializeTheme = (): void => {
  document.documentElement.classList.add("dark");
};

// This variant has NO theme switching capability
export const canSwitchTheme = false;
