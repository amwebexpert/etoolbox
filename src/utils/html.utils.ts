const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_UNESCAPE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

export const escapeHtml = (text: string): string => {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
};

export const unescapeHtml = (text: string): string => {
  return text.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (entity) => HTML_UNESCAPE_MAP[entity] ?? entity);
};
