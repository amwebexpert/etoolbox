import { isBlank } from "@lichens-innovation/ts-common";
export const extractLanguageFromClassName = (className?: string): string | null => {
  if (isBlank(className)) return null;

  const match = /language-(\w+)/.exec(className);
  return match ? match[1] : null;
};
