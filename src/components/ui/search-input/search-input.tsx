import { Input } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

const { Search } = Input;

interface SearchInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
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

  return (
    <Search
      className={styles.search}
      placeholder={placeholder}
      loading={loading}
      size="large"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onSearch={onSearch}
      allowClear
    />
  );
};

const useStyles = createStyles(() => ({
  search: {
    width: "100%",
  },
}));
