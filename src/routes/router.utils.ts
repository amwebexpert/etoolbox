import { ROUTES_WITH_CHILDREN } from "./router";

export const getBasePathForMenu = (pathname: string): string => {
  for (const route of ROUTES_WITH_CHILDREN) {
    if (pathname.startsWith(route + "/") || pathname === route) {
      return route;
    }
  }
  return pathname;
};
