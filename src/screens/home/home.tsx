import { useNavigate } from "@tanstack/react-router";
import { Card, Col, Row, Typography } from "antd";
import { createStyles } from "antd-style";
import { ScreenContainer } from "~/components/ui/screen-container";
import { FEATURES } from "./home.utils";

const { Text } = Typography;

export const Home = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      {/* Features Grid */}
      <section className={styles.section}>
        <Row gutter={[16, 16]}>
          {FEATURES.map((feature) => (
            <Col xs={12} sm={8} md={6} lg={4} key={feature.name}>
              <Card
                hoverable
                className={styles.featureCard}
                styles={{ body: { padding: 16, textAlign: "center" } }}
                onClick={() => navigate({ to: feature.path })}
              >
                <div className={styles.featureIcon} style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <Text strong className={styles.featureName}>
                  {feature.name}
                </Text>
                <Text type="secondary" className={styles.featureDesc}>
                  {feature.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </ScreenContainer>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
    marginBottom: 48,
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
    fontSize: 32,
    marginBottom: 8,
  },
  featureName: {
    display: "block",
    fontSize: 13,
    marginBottom: 4,
  },
  featureDesc: {
    display: "block",
    fontSize: 11,
    lineHeight: 1.3,
  },
}));
