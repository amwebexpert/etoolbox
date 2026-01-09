import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Card, List, Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Link } = Typography;

interface Contributor {
  name: string;
  email: string;
  url: string;
}

const CONTRIBUTORS: Contributor[] = [
  {
    name: "André Masson",
    email: "amwebexpert@gmail.com",
    url: "https://www.linkedin.com/in/amwebexpert/",
  },
  {
    name: "Anthony Buchholz",
    email: "anthony.buchholz@gmail.com",
    url: "https://yodigi7.github.io/",
  },
];

export const AboutContributors = () => {
  const { styles } = useStyles();

  const isLinkedIn = (url: string) => url.includes("linkedin.com");

  return (
    <section className={styles.section}>
      <Title level={4} className={styles.sectionTitle}>
        Contributors
      </Title>
      <Card className={styles.card}>
        <List
          dataSource={CONTRIBUTORS}
          renderItem={(contributor) => (
            <List.Item className={styles.listItem}>
              <Link href={`mailto:${contributor.email}`}>{contributor.name}</Link>
              <Link href={contributor.url} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                {isLinkedIn(contributor.url) ? <LinkedinOutlined /> : <GithubOutlined />}
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </section>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: "24px !important",
    textAlign: "center",
  },
  card: {
    maxWidth: 400,
    width: "100%",
  },
  listItem: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
  },
  iconLink: {
    fontSize: 18,
    color: `${token.colorPrimary} !important`,
    "&:hover": {
      opacity: 0.8,
    },
  },
}));
