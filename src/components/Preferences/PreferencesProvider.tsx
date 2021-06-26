import React, {createContext, FC, useCallback, useContext, useState} from 'react';

const defaultDarkModeValue = localStorage.getItem('darkMode') === 'true';

export const PreferencesContext = createContext({
  isDark: defaultDarkModeValue,
  toggleTheme: () => {},
});

export const PreferencesProvider: FC = ({children}) => {
  const [isDark, setIsDark] = useState<boolean>(defaultDarkModeValue);

  const toggleTheme = useCallback(() => {
    localStorage.setItem('darkMode', `${!isDark}`);
    setIsDark(!isDark);
  }, [isDark]);

  return <PreferencesContext.Provider value={{isDark, toggleTheme}}>{children}</PreferencesContext.Provider>;
};

export const usePreferenceTheme = () => useContext(PreferencesContext);
