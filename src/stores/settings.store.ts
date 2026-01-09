import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface SettingsState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

const stateCreator = (
  set: (partial: Partial<SettingsState> | ((state: SettingsState) => Partial<SettingsState>)) => void,
): SettingsState => ({
  themeMode: "light",
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleThemeMode: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
});

const PERSISTED_STORE_NAME = "etoolbox-settings";

const persistedStateCreator = persist<SettingsState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
});

export const useSettingsStore = create<SettingsState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME }),
);

export const useIsDarkMode = (): boolean => {
  const themeMode = useSettingsStore((state) => state.themeMode);
  return themeMode === "dark";
};

export const useThemeToggler = (): VoidFunction => {
  return useSettingsStore((state) => state.toggleThemeMode);
};
