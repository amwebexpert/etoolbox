import { encodeUrl, decodeUrl } from "~/utils/encoding.utils";

export { encodeUrl, decodeUrl };

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
