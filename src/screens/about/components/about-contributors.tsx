import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { CONTRIBUTORS } from "./about-contributor.utils";

const { Title, Link } = Typography;

export const AboutContributors = () => {
  const { styles } = useStyles();

  const isLinkedIn = (url: string) => url.includes("linkedin.com");

  return (
    <section className={styles.section}>
      <Title level={4} className={styles.sectionTitle}>
        Contributors
      </Title>
      <Card className={styles.card}>
        <Flex vertical gap="middle" align="center">
          {CONTRIBUTORS.map((contributor) => (
            <Flex key={contributor.email} className={styles.contributorRow} gap={12} justify="center" align="center">
              <Link href={`mailto:${contributor.email}`}>{contributor.name}</Link>
              <Link href={contributor.url} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                {isLinkedIn(contributor.url) ? <LinkedinOutlined /> : <GithubOutlined />}
              </Link>
            </Flex>
          ))}
        </Flex>
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
  contributorRow: {
    width: "100%",
  },
  iconLink: {
    fontSize: 18,
    color: `${token.colorPrimary} !important`,
    "&:hover": {
      opacity: 0.8,
    },
  },
}));
