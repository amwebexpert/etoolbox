import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";

const { Search } = Input;

interface SearchInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const DEFAULT_PLACEHOLDER = "Search...";

export const SearchInput: FunctionComponent<SearchInputProps> = ({
  value,
  loading,
  onChange,
  onSearch,
  placeholder = DEFAULT_PLACEHOLDER,
}) => {
  const { styles } = useStyles();
  const [localValue, setLocalValue] = useState<string>(value);
  const debouncedValue = useDebounce(localValue, 400);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Search
      className={styles.search}
      placeholder={placeholder}
      loading={loading}
      size="large"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onSearch={onSearch}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch();
        }
      }}
      allowClear
    />
  );
};

const useStyles = createStyles(() => ({
  search: {
    width: "100%",
  },
}));
