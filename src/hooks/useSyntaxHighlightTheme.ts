import { usePreferenceTheme } from "../components/Preferences/PreferencesProvider";
import { docco, dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const useSyntaxHighlightTheme = () => {
  const { isDark } = usePreferenceTheme();

  return isDark ? dark : docco;
};
