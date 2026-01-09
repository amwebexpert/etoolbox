// Base64 encoding with proper Unicode support
export const encodeBase64 = (text: string): string => {
  try {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
  } catch {
    return "";
  }
};

export const decodeBase64 = (base64: string): string => {
  try {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0) ?? 0);
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
};

export const encodeUrl = (value?: string): string => {
  if (!value) return "";
  return encodeURIComponent(value);
};

export const decodeUrl = (value?: string): string => {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

// Base64 blob utilities
interface Base64ToBlobArgs {
  base64: string;
  mimeType: string;
}

export const base64ToBlob = ({ base64, mimeType }: Base64ToBlobArgs): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

interface FormatDataUriArgs {
  mimeType: string;
  base64: string;
}

export const formatDataUri = ({ mimeType, base64 }: FormatDataUriArgs): string => {
  return `data:${mimeType};base64,${base64}`;
};

export const getBase64ApproxSize = (base64: string): number => {
  return Math.round((base64.length * 3) / 4);
};
