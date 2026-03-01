import { CopyOutlined } from "@ant-design/icons";
import { Tag, Typography, theme } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";
import { isNullish } from "@lichens-innovation/ts-common";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

import type { Rule } from "../coding-standards.types";
import { getSimilarityStyle } from "./result-card-title.utils";

const { Text } = Typography;

interface ResultCardTitleProps {
  rule: Rule;
}

export const ResultCardTitle: FunctionComponent<ResultCardTitleProps> = ({ rule }) => {
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const { copyTextToClipboard } = useClipboardCopy();
  const similarity = rule.similarity ?? 0;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyTextToClipboard({ text: rule.href, successMessage: "Rule link copied!" });
  };

  return (
    <div className={styles.container}>
      <Text strong className={styles.title}>
        {rule.title}
      </Text>
      <div className={styles.actions}>
        {!isNullish(rule.similarity) && (
          <Tag className={styles.similarityTag} style={getSimilarityStyle({ similarity, token })}>
            {similarity.toFixed(2)}
          </Tag>
        )}
        <span className={styles.copyButton}>
          <CopyOutlined onClick={handleCopy} />
        </span>
      </div>
    </div>
  );
};

const useStyles = createStyles(({ token, css }) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    width: "100%",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  copyButton: css`
    cursor: pointer;
    color: ${token.colorPrimary};
    .anticon {
      margin-left: 4px;
    }
  `,
  similarityTag: css`
    font-weight: 600;
    font-size: 12px;
    padding: 2px 8px;
    border: 1px solid;
    border-radius: ${token.borderRadiusSM}px;
    min-width: 48px;
    text-align: center;
  `,
}));
