import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface UseDebouncedSearchInputArgs {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
  onSearch: (value: string) => void;
  debounceMs?: number;
}

interface UseDebouncedSearchInputReturn {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSearch: () => void;
}

const DEFAULT_DEBOUNCE_MS = 400;

export const useDebouncedSearchInput = ({
  initialValue,
  onDebouncedChange,
  onSearch,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: UseDebouncedSearchInputArgs): UseDebouncedSearchInputReturn => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const debouncedValue = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  const handleSearch = () => {
    onDebouncedChange(inputValue);
    onSearch(inputValue);
  };

  return {
    inputValue,
    setInputValue,
    handleSearch,
  };
};
