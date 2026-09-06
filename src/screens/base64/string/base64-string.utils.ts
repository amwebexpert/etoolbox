import { decodeBase64 as decode, encodeBase64 as encode } from "@lichens-innovation/ts-common";

export const encodeBase64 = (text: string): string => {
  const result = encode(text);
  if (result === "" && text !== "") {
    return "Error: Unable to encode";
  }
  return result;
};

export const decodeBase64 = (base64: string): string => {
  const result = decode(base64);
  if (result === "" && base64 !== "") {
    return "Error: Invalid Base64 string";
  }
  return result;
};
