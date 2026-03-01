export const extractLanguageFromClassName = (className?: string): string | null => {
  if (!className) return null;

  const match = /language-(\w+)/.exec(className);
  return match ? match[1] : null;
};
