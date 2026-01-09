import { BulbOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tag, Typography } from "antd";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

const CONTRIBUTING_URL =
  "https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md";

export const AboutCallToAction = () => {
  const { styles } = useStyles();

  return (
    <section className={styles.section}>
      <Card className={styles.ctaCard}>
        <Row align="middle" gutter={24}>
          <Col xs={24} md={4} className={styles.ctaIconCol}>
            <BulbOutlined className={styles.ctaIcon} style={{ color: "orange" }} />
          </Col>
          <Col xs={24} md={20}>
            <Title level={3} className={styles.ctaTitle}>
              Have an Idea?
            </Title>
            <Paragraph className={styles.ctaText}>
              The toolbox is never finished! If you have a utility idea that could work as a web SPA feature, don't
              hesitate to suggest it. Whether it's a converter, generator, formatter, or something entirely new — if it
              helps developers, it might find its home here.
            </Paragraph>
            <a href={CONTRIBUTING_URL} target="_blank" rel="noopener noreferrer">
              <Tag color="cyan" style={{ cursor: "pointer", fontSize: 14, paddingBlock: 4, paddingInline: 12 }}>
                Learn more about contributing →
              </Tag>
            </a>
          </Col>
        </Row>
      </Card>
    </section>
  );
};

const useStyles = createStyles(({ token }) => ({
  section: {
    marginBottom: 48,
  },
  ctaCard: {
    background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 100%)`,
    border: `1px solid ${token.colorPrimaryBorder}`,
  },
  ctaIconCol: {
    textAlign: "center",
    marginBottom: 16,
    "@media (min-width: 768px)": {
      marginBottom: 0,
    },
  },
  ctaIcon: {
    fontSize: 48,
    color: token.colorPrimary,
  },
  ctaTitle: {
    marginBottom: "8px !important",
  },
  ctaText: {
    marginBottom: "16px !important",
    color: token.colorTextSecondary,
  },
}));
