/**
 * Cache name used by @xenova/transformers in the browser (see hub.js, caches.open).
 * If the library changes this string, update here.
 */
export const TRANSFORMERS_BROWSER_CACHE_NAME = "transformers-cache";

export const clearTransformersBrowserCache = async (): Promise<void> => {
  if (typeof caches === "undefined") {
    return;
  }
  try {
    await caches.delete(TRANSFORMERS_BROWSER_CACHE_NAME);
  } catch (error) {
    console.error("[transformers-cache.utils] Failed to clear Transformers.js browser cache:", error);
  }
};
