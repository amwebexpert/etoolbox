import { SwapOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { createStyles } from "antd-style";

import type { DiffSummary } from "./diff-viewer.utils";

const { Text } = Typography;

interface DiffViewerControlsProps {
  ignoreWhitespace: boolean;
  summary: DiffSummary;
  onIgnoreWhitespaceChange: (value: boolean) => void;
  onSwap: () => void;
}

export const DiffViewerControls = ({
  ignoreWhitespace,
  summary,
  onIgnoreWhitespaceChange,
  onSwap,
}: DiffViewerControlsProps) => {
  const { styles } = useStyles();

  const handleIgnoreWhitespaceChange = (event: CheckboxChangeEvent) => {
    onIgnoreWhitespaceChange(event.target.checked);
  };

  return (
    <Row align="middle" gutter={[16, 8]} className={styles.row}>
      <Col>
        <Checkbox
          checked={ignoreWhitespace}
          onChange={handleIgnoreWhitespaceChange}
          aria-label="Ignore whitespace"
        >
          Ignore whitespace
        </Checkbox>
      </Col>
      <Col>
        <Button
          icon={<SwapOutlined />}
          onClick={onSwap}
          aria-label="Swap original and modified"
        >
          Swap
        </Button>
      </Col>
      <Col flex="auto">
        <Text type="secondary" aria-label="Diff summary" className={styles.summary}>
          <span className={styles.added}>+{summary.addedLines} lines</span>
          {", "}
          <span className={styles.removed}>−{summary.removedLines} lines</span>
        </Text>
      </Col>
    </Row>
  );
};

const useStyles = createStyles(({ token }) => ({
  row: {
    width: "100%",
  },
  summary: {
    fontFamily: "monospace",
  },
  added: {
    color: token.colorSuccess,
  },
  removed: {
    color: token.colorError,
  },
}));
