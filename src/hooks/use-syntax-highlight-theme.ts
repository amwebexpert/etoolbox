import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useSettingsStore } from "~/stores/settings.store";

export const useSyntaxHighlightTheme = () => {
  const themeMode = useSettingsStore((state) => state.themeMode);

  return themeMode === "dark" ? dark : docco;
};
