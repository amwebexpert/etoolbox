export const getBasePath = (): string => import.meta.env.BASE_URL ?? "/";

export const isDevelopmentMode = (): boolean => import.meta.env.DEV;
