import { Typography } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { useResponsive } from "~/hooks/use-responsive";

import { ResultDesktopLayout } from "./result-desktop-layout";
import { ResultMobileLayout } from "./result-mobile-layout";

interface DateConverterResultProps {
  date: Date | null;
  epochValue: number;
  showCodeExamples: boolean;
}

export const DateConverterResult = ({ date, epochValue, showCodeExamples }: DateConverterResultProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();
  const { copyTextToClipboard } = useClipboardCopy();

  if (!date) {
    return (
      <div className={styles.placeholder}>
        <Typography.Text type="secondary">Enter an epoch value or click "Now" to see date conversions</Typography.Text>
      </div>
    );
  }

  const handleCopy = (value: string, label: string) => {
    copyTextToClipboard({ text: value, successMessage: `${label} copied!` });
  };

  if (isMobile) {
    return (
      <ResultMobileLayout date={date} epochValue={epochValue} showCodeExamples={showCodeExamples} onCopy={handleCopy} />
    );
  }

  return (
    <ResultDesktopLayout date={date} epochValue={epochValue} showCodeExamples={showCodeExamples} onCopy={handleCopy} />
  );
};

const useStyles = createStyles(({ token }) => ({
  placeholder: {
    padding: 48,
    textAlign: "center",
    backgroundColor: token.colorBgContainer,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));
