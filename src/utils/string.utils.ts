/**
 * Capitalize the first letter of a string.
 * @param str - The input string
 * @returns The string with the first character uppercased
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Count the number of words in a text string.
 * Words are separated by whitespace.
 * @param text - The text to count words in
 * @returns The number of words found
 */
export const countWords = (text: string): number => {
  if (!text || text.trim().length === 0) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

/**
 * Truncate a string to a maximum length, adding an ellipsis if truncated.
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - The ellipsis string to append (default: "...")
 * @returns The truncated string
 */
export const truncate = (str: string, maxLength: number, ellipsis = "..."): string => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
};
