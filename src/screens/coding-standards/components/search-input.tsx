import { Input } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

const { Search } = Input;

interface SearchInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchInput: FunctionComponent<SearchInputProps> = ({ value, loading, onChange, onSearch }) => {
  const { styles } = useStyles();

  return (
    <Search
      className={styles.search}
      placeholder="Chercher une règle de coding standards..."
      loading={loading}
      size="large"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
