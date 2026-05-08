import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useThemeMode } from "~/stores/settings.store";

export const useSyntaxHighlightTheme = () => {
  const themeMode = useThemeMode();

  return themeMode === "dark" ? dark : docco;
};
