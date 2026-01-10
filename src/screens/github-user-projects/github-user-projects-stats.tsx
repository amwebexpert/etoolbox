import {
  BranchesOutlined,
  ForkOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Tag, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";
import { formatCount } from "~/utils/number.utils";

import type { GithubUserProject } from "./github-user-projects.types";
import { calculateProjectStats } from "./github-user-projects.utils";

const { Text } = Typography;

interface GithubUserProjectsStatsProps {
  projects: GithubUserProject[];
}

export const GithubUserProjectsStats = ({
  projects,
}: GithubUserProjectsStatsProps) => {
  const { styles } = useStyles();
  const { isMobile } = useResponsive();

  if (projects.length === 0) {
    return null;
  }

  const stats = calculateProjectStats(projects);
  const topLanguages = stats.languages.slice(0, 5);

  return (
    <Card size="small" className={styles.card}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={12} sm={6} md={4}>
          <Statistic
            title="Repositories"
            value={stats.totalProjects}
            prefix={<BranchesOutlined />}
            styles={{ content: { fontSize: isMobile ? 18 : 24 } }}
          />
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Statistic
            title="Total Stars"
            value={formatCount(stats.totalStars)}
            prefix={<StarOutlined />}
            styles={{
              content: { fontSize: isMobile ? 18 : 24, color: "#faad14" },
            }}
          />
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Statistic
            title="Total Forks"
            value={formatCount(stats.totalForks)}
            prefix={<ForkOutlined />}
            styles={{ content: { fontSize: isMobile ? 18 : 24 } }}
          />
        </Col>

        {!isMobile && topLanguages.length > 0 && (
          <Col xs={24} sm={24} md={12}>
            <div className={styles.languagesSection}>
              <Text type="secondary" className={styles.languagesLabel}>
                Top languages:
              </Text>
              <div className={styles.languageTags}>
                {topLanguages.map((lang) => (
                  <Tag key={lang} color="blue">
                    {lang}
                  </Tag>
                ))}
                {stats.languages.length > 5 && (
                  <Text type="secondary">
                    +{stats.languages.length - 5} more
                  </Text>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    marginBottom: 16,
    backgroundColor: token.colorPrimaryBg,
    borderColor: token.colorPrimaryBorder,
  },
  languagesSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  languagesLabel: {
    fontSize: 12,
  },
  languageTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "center",
  },
}));
