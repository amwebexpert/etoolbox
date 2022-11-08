import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react';

const defaultDarkModeValue = localStorage.getItem('darkMode') === 'true';

export const PreferencesContext = createContext({
  isDark: defaultDarkModeValue,
  toggleTheme: Function(),
});

type PreferencesProviderProps = PropsWithChildren<unknown>;

export const PreferencesProvider: FC<PreferencesProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(defaultDarkModeValue);

  const toggleTheme = useCallback(() => {
    setIsDark(isDark => {
      localStorage.setItem('darkMode', `${!isDark}`);
      return !isDark;
    });
  }, []);

  return <PreferencesContext.Provider value={{ isDark, toggleTheme }}>{children}</PreferencesContext.Provider>;
};

export const usePreferenceTheme = () => useContext(PreferencesContext);
