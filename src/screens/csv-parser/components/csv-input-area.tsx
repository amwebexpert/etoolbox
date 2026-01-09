import { Form, Input } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

const { TextArea } = Input;

interface CsvInputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export const CsvInputArea = ({ value, onChange }: CsvInputAreaProps) => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value ?? "");
  };

  return (
    <Form.Item label="CSV Source Data" className={styles.formItem}>
      <TextArea
        placeholder="Paste or type your CSV data here, or upload a file above"
        autoFocus={isDesktop}
        rows={isMobile ? 6 : 10}
        autoSize={{ minRows: isMobile ? 4 : 8, maxRows: isDesktop ? 20 : 12 }}
        value={value}
        onChange={handleChange}
        className={styles.textArea}
        spellCheck={false}
      />
    </Form.Item>
  );
};

const useStyles = createStyles(() => ({
  formItem: {
    marginBottom: 16,
  },
  textArea: {
    fontFamily: "monospace",
    fontSize: "0.85em",
  },
}));
