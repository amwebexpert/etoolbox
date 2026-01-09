import { Input, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { getRows } from "./uuid-generator.utils";

const { TextArea } = Input;

interface UuidGeneratorResultProps {
  result: string;
}

export const UuidGeneratorResult = ({ result }: UuidGeneratorResultProps) => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();

  const maxRows = getRows({ isMobile, isTablet });

  if (!result) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Generated UUIDs will appear here</Typography.Text>
      </div>
    );
  }

  const lineCount = result.split("\n").length;

  return (
    <div className={styles.resultSection}>
      <Typography.Text type="secondary" className={styles.resultLabel}>
        Generated UUIDs ({lineCount} {lineCount === 1 ? "UUID" : "UUIDs"})
      </Typography.Text>

      <TextArea value={result} readOnly rows={maxRows} autoSize={{ minRows: 4, maxRows }} className={styles.textArea} />
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  resultSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  resultLabel: {
    fontWeight: 500,
  },
  textArea: {
    fontFamily: "monospace",
    backgroundColor: token.colorBgContainer,
  },
  placeholder: {
    padding: 24,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
