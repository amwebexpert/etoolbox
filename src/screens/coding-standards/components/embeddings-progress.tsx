import { Flex, Progress } from "antd";
import { createStyles } from "antd-style";
import type { FunctionComponent } from "react";

import { MarkdownContent } from "~/components/ui/markdown-content";
import type { EmbeddingsProgress as EmbeddingsProgressType } from "../coding-standards.types";

interface EmbeddingsProgressProps {
  progress: EmbeddingsProgressType;
}

export const EmbeddingsProgress: FunctionComponent<EmbeddingsProgressProps> = ({ progress }) => {
  const { styles } = useStyles();

  if (progress.isCompleted || progress.total === 0) {
    return null;
  }

  const hasTotal = progress.total > 0;
  const percent = hasTotal ? Math.ceil((progress.completed / progress.total) * 100) : 0;

  return (
    <Flex gap="middle" vertical align="center" className={styles.wrapper}>
      <p className={styles.intro}>Computing semantic index for guidelines for the very first time...</p>
      <Progress type="circle" size={80} percent={percent} />
      {progress.currentRule ? (
        <div className={styles.ruleMarkdown}>
          <MarkdownContent content={progress.currentRule} />
        </div>
      ) : null}
      <p className={styles.fraction}>
        {progress.completed} / {progress.total}
      </p>
    </Flex>
  );
};

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
    padding: token.paddingLG,
    backgroundColor: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  },
  intro: {
    margin: 0,
    textAlign: "center",
  },
  fraction: {
    margin: 0,
    textAlign: "center",
  },
  ruleMarkdown: {
    textAlign: "center",
    maxWidth: "100%",
    "& p": {
      margin: 0,
    },
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      margin: 0,
      fontSize: token.fontSizeLG,
      fontWeight: token.fontWeightStrong,
    },
  },
}));
