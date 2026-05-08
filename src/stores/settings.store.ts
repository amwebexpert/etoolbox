import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { ColorTheme } from "~/themes";

export type ThemeMode = "light" | "dark";

interface SettingsState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const stateCreator = (
  set: (partial: Partial<SettingsState> | ((state: SettingsState) => Partial<SettingsState>)) => void
): SettingsState => ({
  themeMode: "light",
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleThemeMode: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
  colorTheme: "red",
  setColorTheme: (colorTheme) => set({ colorTheme }),
});

const PERSISTED_STORE_NAME = "etoolbox-settings";

const persistedStateCreator = persist<SettingsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useSettingsStore = create<SettingsState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);

export const useThemeMode = () => useSettingsStore((state) => state.themeMode);
export const useToggleThemeMode = () => useSettingsStore((state) => state.toggleThemeMode);

export const useColorTheme = () => useSettingsStore((state) => state.colorTheme);
export const useSetColorTheme = () => useSettingsStore((state) => state.setColorTheme);

export const useIsDarkMode = (): boolean => {
  const themeMode = useThemeMode();
  return themeMode === "dark";
};

export const useThemeToggler = (): VoidFunction => {
  return useToggleThemeMode();
};
