import { encodeBase64 as encode, decodeBase64 as decode } from "~/utils/encoding.utils";

export const encodeBase64 = (text: string): string => {
  const result = encode(text);
  // Empty string is a valid result when encoding empty input
  if (result === "" && text !== "") {
    return "Error: Unable to encode";
  }
  return result;
};

export const decodeBase64 = (base64: string): string => {
  const result = decode(base64);
  // Empty string is a valid result when decoding empty input
  if (result === "" && base64 !== "") {
    return "Error: Invalid Base64 string";
  }
  return result;
};
