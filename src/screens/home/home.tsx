import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Card, Col, Empty, Input, Row, theme, Typography } from "antd";
import { createStyles } from "antd-style";
import { useMemo, useState } from "react";

import { ScreenContainer } from "~/components/ui/screen-container";
import { usePinnedPaths, useTogglePinned } from "~/stores/pinned-tools.store";
import { PinStarButton } from "~/tools/pin-star-button";
import { type Tool, TOOLS } from "~/tools/tools-registry";
import { selectPinnedTools } from "~/tools/tools-registry.utils";

import { filterTools } from "./home.utils";

const { Text, Title } = Typography;
const { useToken } = theme;

export const Home = () => {
  const { styles } = useStyles();
  const { token } = useToken();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const pinnedPaths = usePinnedPaths();
  const togglePinned = useTogglePinned();

  const filteredTools = useMemo(() => filterTools({ tools: TOOLS, query }), [query]);
  const filteredPinnedTools = useMemo(
    () => filterTools({ tools: selectPinnedTools({ tools: TOOLS, pinnedPaths }), query }),
    [pinnedPaths, query]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const renderToolCard = (tool: Tool) => (
    <Col xs={12} sm={8} md={6} lg={4} key={tool.path}>
      <Card
        hoverable
        className={styles.featureCard}
        styles={{ body: { padding: 16, textAlign: "center" } }}
        onClick={() => {
          void navigate({ to: tool.path });
        }}
      >
        <PinStarButton
          toolName={tool.name}
          toolPath={tool.path}
          pinned={pinnedPaths.includes(tool.path)}
          onToggle={togglePinned}
          className={`${styles.pinStar} pin-star`}
        />
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
  );

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

        {filteredPinnedTools.length > 0 && (
          <div className={styles.pinnedSection}>
            <Title level={5} className={styles.pinnedTitle}>
              Pinned
            </Title>
            <Row gutter={[16, 16]}>{filteredPinnedTools.map(renderToolCard)}</Row>
          </div>
        )}

        {filteredTools.length === 0 ? (
          <Empty description="No tools found" />
        ) : (
          <Row gutter={[16, 16]}>{filteredTools.map(renderToolCard)}</Row>
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
  pinnedSection: {
    marginBottom: 32,
  },
  pinnedTitle: {
    marginBottom: 16,
  },
  featureCard: {
    height: "100%",
    position: "relative",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: token.boxShadowSecondary,
    },
    "&:hover .pin-star": {
      opacity: 1,
    },
  },
  pinStar: {
    position: "absolute",
    top: 4,
    right: 4,
    opacity: 0,
    transition: "opacity 0.2s ease",
    "&:focus-visible, &[aria-label^='Unpin']": {
      opacity: 1,
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
