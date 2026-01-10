import { CopyOutlined, ForkOutlined, LockOutlined } from "@ant-design/icons";
import { Tag, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useClipboardCopy } from "~/hooks/use-clipboard-copy";

import type { GithubUserProject } from "../github-user-projects.types";

const { Text, Link } = Typography;

type ColumnRepositoryProps = {
  record: GithubUserProject;
  isMobile: boolean;
};

export const ColumnRepository = ({ record, isMobile }: ColumnRepositoryProps) => {
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    copyTextToClipboard({ text: record.html_url, successMessage: "Repository URL copied!" });
  };

  return (
    <>
      <div className={styles.repoHeader}>
        <Link href={record.html_url} target="_blank" rel="noreferrer noopener" className={styles.repoName}>
          {record.name}
        </Link>
        {record.private && (
          <Tooltip title="Private repository">
            <LockOutlined className={styles.privateIcon} />
          </Tooltip>
        )}
        {record.fork && (
          <Tooltip title="Forked repository">
            <ForkOutlined className={styles.forkIcon} />
          </Tooltip>
        )}
        {record.archived && (
          <Tag color="orange" className={styles.archivedTag}>
            Archived
          </Tag>
        )}
        <Tooltip title="Copy repository URL">
          <CopyOutlined className={styles.copyIcon} onClick={handleCopyUrl} />
        </Tooltip>
      </div>
      {record.description && !isMobile && (
        <Text type="secondary" ellipsis className={styles.description}>
          {record.description}
        </Text>
      )}
      {record.topics && record.topics.length > 0 && !isMobile && (
        <div className={styles.topics}>
          {record.topics.slice(0, 3).map((topic) => (
            <Tag key={topic} className={styles.topicTag}>
              {topic}
            </Tag>
          ))}
          {record.topics.length > 3 && (
            <Text type="secondary" className={styles.moreTopics}>
              +{record.topics.length - 3}
            </Text>
          )}
        </div>
      )}
    </>
  );
};

const useStyles = createStyles(({ token }) => {
  const { fontSizeSM } = token;

  return {
    repoHeader: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
    },
    repoName: {
      fontWeight: 600,
      fontSize: token.fontSize,
    },
    privateIcon: {
      color: token.colorWarning,
      fontSize: fontSizeSM,
    },
    forkIcon: {
      color: token.colorTextSecondary,
      fontSize: fontSizeSM,
    },
    archivedTag: {
      fontSize: fontSizeSM - 2,
      lineHeight: 1.2,
      padding: "0 4px",
      marginInlineEnd: 0,
    },
    copyIcon: {
      color: token.colorTextSecondary,
      fontSize: fontSizeSM,
      cursor: "pointer",
      opacity: 0.6,
      transition: "opacity 0.2s",
      "&:hover": {
        opacity: 1,
      },
    },
    description: {
      fontSize: fontSizeSM,
      maxWidth: 400,
    },
    topics: {
      display: "flex",
      gap: 4,
      marginTop: 4,
      flexWrap: "wrap",
      alignItems: "center",
    },
    topicTag: {
      fontSize: fontSizeSM - 2,
      padding: "0 4px",
      margin: 0,
      backgroundColor: token.colorPrimaryBg,
      borderColor: token.colorPrimaryBorder,
      color: token.colorPrimary,
    },
    moreTopics: {
      fontSize: fontSizeSM - 2,
    },
  };
});
