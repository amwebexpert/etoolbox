export type ColorTheme = "red" | "green" | "orange" | "blue" | "pink";

interface ThemeColors {
  label: string;
  primary: string;
  secondary: string;
}

export const THEMES: Record<ColorTheme, ThemeColors> = {
  red: { label: "Red", primary: "#bf3a2b", secondary: "#e84b3c" },
  green: { label: "Green", primary: "#2e7d32", secondary: "#43a047" },
  orange: { label: "Orange", primary: "#e65100", secondary: "#f57c00" },
  blue: { label: "Blue", primary: "#1565c0", secondary: "#1e88e5" },
  pink: { label: "Pink", primary: "#ad1457", secondary: "#d81b60" },
};
