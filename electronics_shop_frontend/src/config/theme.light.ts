// SPL VARIATION POINT: Light Theme Configuration
// This file is used for LIGHT theme variants

export const THEME_MODE = "light";

// Apply light theme on app initialization
export const initializeTheme = (): void => {
  document.documentElement.classList.remove("dark");
};

// This variant has NO theme switching capability
export const canSwitchTheme = false;
