import pino from "pino";

import { isDevelopmentMode } from "~/utils/environment.utils";

export const logger = pino({
  level: isDevelopmentMode() ? "debug" : "warn",
  browser: { asObject: true },
});
