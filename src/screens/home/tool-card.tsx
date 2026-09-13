import { useNavigate } from "@tanstack/react-router";
import { Card, Col, theme, Typography } from "antd";
import { createStyles } from "antd-style";

import { PinStarButton } from "~/tools/pin-star-button";
import { type Tool } from "~/tools/tools-registry";

const { Text } = Typography;
const { useToken } = theme;

interface ToolCardProps {
  tool: Tool;
  pinned: boolean;
  onTogglePinned: (path: string) => void;
}

export const ToolCard = ({ tool, pinned, onTogglePinned }: ToolCardProps) => {
  const { styles } = useStyles();
  const { token } = useToken();
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate({ to: tool.path });
  };

  return (
    <Col xs={12} sm={8} md={6} lg={4}>
      <Card
        hoverable
        className={styles.featureCard}
        styles={{ body: { padding: 16, textAlign: "center" } }}
        onClick={handleClick}
      >
        <PinStarButton
          toolName={tool.name}
          toolPath={tool.path}
          pinned={pinned}
          onToggle={onTogglePinned}
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
};

const useStyles = createStyles(({ token }) => ({
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
