import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface ListFilterSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const ListFilterSearchInput = ({ value, onValueChange, placeholder, className }: ListFilterSearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      allowClear
      className={className}
    />
  );
};
