import { Card, Statistic, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { ImageOcrProcessing } from "./image-ocr-processing";
import type { OcrResult, WorkerStatus } from "./image-ocr.utils";
import { formatProcessingTime } from "./image-ocr.utils";

const { Text, Paragraph } = Typography;

interface ImageOcrResultProps {
  result: OcrResult | null;
  workerStatus: WorkerStatus;
  isProcessing: boolean;
}

export const ImageOcrResult = ({ result, workerStatus, isProcessing }: ImageOcrResultProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  const statisticClassName = isMobile ? styles.statisticMobile : styles.statistic;

  if (isProcessing) {
    return <ImageOcrProcessing workerStatus={workerStatus} />;
  }

  if (!result) {
    return (
      <div className={styles.placeholder}>
        <Text type="secondary">Extracted text will appear here after processing</Text>
      </div>
    );
  }

  const { wordCount, characterCount, confidence, processingTime, text } = result;

  return (
    <div className={styles.resultContainer}>
      <Card className={styles.card}>
        <div className={styles.statsRow}>
          <Statistic title="Words" value={wordCount} className={statisticClassName} />
          <Statistic title="Characters" value={characterCount} className={statisticClassName} />
          <Statistic title="Confidence" value={confidence} precision={1} suffix="%" className={statisticClassName} />
          <Statistic title="Time" value={formatProcessingTime(processingTime)} className={statisticClassName} />
        </div>
      </Card>

      <Card title="Extracted Text" className={styles.card}>
        <div className={styles.textContainer}>
          {text ? (
            <Paragraph className={styles.extractedText}>{text}</Paragraph>
          ) : (
            <Text type="secondary">No text was found in the image</Text>
          )}
        </div>
      </Card>
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  placeholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    backgroundColor: token.colorBgContainer,
  },
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    width: "100%",
  },
  statsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "space-around",
  },
  statistic: {
    ".ant-statistic-content": {
      fontSize: 24,
    },
  },
  statisticMobile: {
    ".ant-statistic-content": {
      fontSize: 20,
    },
  },
  textContainer: {
    maxHeight: 400,
    overflowY: "auto",
  },
  extractedText: {
    fontFamily: "monospace",
    fontSize: 14,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
  },
}));
