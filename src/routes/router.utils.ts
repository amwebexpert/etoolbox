import { ROUTES_WITH_CHILDREN } from "./router";

/**
 * Extract the base path for routes with tabs (e.g., /url/encoder -> /url)
 * This ensures the correct menu item stays highlighted when navigating to sub-routes
 */
export const getBasePathForMenu = (pathname: string): string => {
  for (const route of ROUTES_WITH_CHILDREN) {
    if (pathname.startsWith(route + "/") || pathname === route) {
      return route;
    }
  }
  return pathname;
};
