import frameThemeUrl from "@milkdown/crepe/theme/frame.css?url";
import frameDarkThemeUrl from "@milkdown/crepe/theme/frame-dark.css?url";
import { useEffect, useRef } from "react";

const CREPE_THEME_LINK_ID = "milkdown-crepe-theme-stylesheet";

export const useCrepeThemeStylesheet = (isDark: boolean): void => {
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.id = CREPE_THEME_LINK_ID;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    linkRef.current = link;

    return () => {
      link.remove();
      linkRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.href = isDark ? frameDarkThemeUrl : frameThemeUrl;
    }
  }, [isDark]);
};
