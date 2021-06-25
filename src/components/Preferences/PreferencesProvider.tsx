import React, {createContext, FC, useCallback, useContext, useState} from 'react';

export const PreferencesContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const PreferencesProvider: FC = ({children}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsDark(dark => !dark);
  }, []);

  return <PreferencesContext.Provider value={{isDark, toggleTheme}}>{children}</PreferencesContext.Provider>;
};

export const usePreferenceTheme = () => useContext(PreferencesContext);
