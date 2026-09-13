import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Card, Col, Empty, Input, Row, theme, Typography } from "antd";
import { createStyles } from "antd-style";
import { useMemo, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { TOOLS } from "~/tools/tools-registry";

import { filterTools } from "./home.utils";

const { Text } = Typography;
const { useToken } = theme;

export const Home = () => {
  const { styles } = useStyles();
  const { token } = useToken();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => filterTools({ tools: TOOLS, query }), [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <ScreenContainer>
      <section className={styles.section}>
        <Input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search tools by name or description..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.search}
        />

        {filteredTools.length === 0 ? (
          <Empty description="No tools found" />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredTools.map((tool) => (
              <Col xs={12} sm={8} md={6} lg={4} key={tool.path}>
                <Card
                  hoverable
                  className={styles.featureCard}
                  styles={{ body: { padding: 16, textAlign: "center" } }}
                  onClick={() => {
                    void navigate({ to: tool.path });
                  }}
                >
                  <div className={styles.featureIcon} style={{ color: token.colorPrimary }}>
                    {tool.icon}
                  </div>
                  <Text strong className={styles.featureName}>
                    {tool.name}
                  </Text>
                  <Text type="secondary" className={styles.featureDesc}>
                    {tool.description}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
    marginBottom: 48,
  },
  search: {
    marginBottom: 24,
  },
  featureCard: {
    height: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: token.boxShadowSecondary,
    },
  },
  featureIcon: {
    fontSize: token.fontSizeHeading2,
    marginBottom: 8,
  },
  featureName: {
    display: "block",
    fontSize: token.fontSizeSM,
    marginBottom: 4,
  },
  featureDesc: {
    display: "block",
    fontSize: token.fontSizeSM - 1,
    lineHeight: 1.3,
  },
}));
