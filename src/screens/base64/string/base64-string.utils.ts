import { decodeBase64 as decode, encodeBase64 as encode, isBlank, isNotBlank } from "@lichens-innovation/ts-common";

export const encodeBase64 = (text: string): string => {
  const result = encode(text);
  if (isBlank(result) && isNotBlank(text)) {
    return "Error: Unable to encode";
  }
  return result;
};

export const decodeBase64 = (base64: string): string => {
  const result = decode(base64);
  if (isBlank(result) && isNotBlank(base64)) {
    return "Error: Invalid Base64 string";
  }
  return result;
};
