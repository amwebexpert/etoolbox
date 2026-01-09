import { GithubOutlined, SearchOutlined } from "@ant-design/icons";
import { Empty, Typography } from "antd";
import { createStyles } from "antd-style";

const { Paragraph } = Typography;

interface GithubUserProjectsEmptyProps {
  hasSearched: boolean;
  username: string;
  isError: boolean;
  errorMessage?: string;
}

export const GithubUserProjectsEmpty = ({
  hasSearched,
  username,
  isError,
  errorMessage,
}: GithubUserProjectsEmptyProps) => {
  const { styles } = useStyles();

  if (isError) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className={styles.description}>
            <Paragraph type="danger" strong>
              Error loading repositories
            </Paragraph>
            <Paragraph type="secondary">{errorMessage ?? "An unexpected error occurred. Please try again."}</Paragraph>
          </div>
        }
        className={styles.empty}
      />
    );
  }

  if (hasSearched && username) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className={styles.description}>
            <Paragraph strong>No repositories found</Paragraph>
            <Paragraph type="secondary">
              User &quot;{username}&quot; has no public repositories or the filters don&apos;t match any results.
            </Paragraph>
          </div>
        }
        className={styles.empty}
      />
    );
  }

  return (
    <Empty
      image={<GithubOutlined className={styles.githubIcon} />}
      description={
        <div className={styles.description}>
          <Paragraph strong className={styles.title}>
            Search GitHub Repositories
          </Paragraph>
          <Paragraph type="secondary">Enter a GitHub username above to view their public repositories.</Paragraph>
          <Paragraph type="secondary" className={styles.hint}>
            <SearchOutlined /> Press Enter or click Search to start
          </Paragraph>
        </div>
      }
      className={styles.empty}
    />
  );
};

const useStyles = createStyles(({ token }) => ({
  empty: {
    padding: "60px 20px",
  },
  githubIcon: {
    fontSize: 64,
    color: token.colorTextSecondary,
    opacity: 0.5,
  },
  description: {
    maxWidth: 400,
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  hint: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    fontSize: 13,
  },
}));
