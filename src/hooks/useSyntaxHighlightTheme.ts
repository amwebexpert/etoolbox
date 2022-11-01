import { dark, docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { usePreferenceTheme } from '../components/Preferences/PreferencesProvider';

export const useSyntaxHighlightTheme = () => {
  const { isDark } = usePreferenceTheme();

  return isDark ? dark : docco;
};
