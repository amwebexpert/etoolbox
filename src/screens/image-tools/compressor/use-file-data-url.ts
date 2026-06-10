import { useEffect, useState } from "react";

interface DataUrlResult {
  file: File;
  url: string;
}

/**
 * Reads a File as a base64 data URL via FileReader.
 * Returns null until the read completes, on error, or when file is null.
 */
export const useFileDataUrl = (file: File | null): string | null => {
  const [result, setResult] = useState<DataUrlResult | null>(null);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;
    const reader = new FileReader();

    reader.onload = (): void => {
      if (cancelled) return;
      const url = typeof reader.result === "string" ? reader.result : null;
      if (!url) return;
      setResult({ file, url });
    };

    reader.onerror = (): void => {
      if (cancelled) return;
      setResult(null);
    };

    reader.readAsDataURL(file);

    return (): void => {
      cancelled = true;
      reader.abort();
    };
  }, [file]);

  if (!file) return null;
  if (!result || result.file !== file) return null;
  return result.url;
};
