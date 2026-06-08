import { decodeUrl, encodeUrl } from "@lichens-innovation/ts-common";

interface TransformUrlArgs {
  value?: string;
  decode?: boolean;
}

export const transformUrl = ({ value, decode }: TransformUrlArgs): string => {
  if (decode) {
    return decodeUrl(value);
  }
  return encodeUrl(value);
};
