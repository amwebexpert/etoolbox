import { Card, Col, Row, Typography } from "antd";
import { createStyles } from "antd-style";

import { getAlgorithmDescription, type JwtHeader } from "./jwt-decoder.utils";

interface JwtDecoderAlgorithmCardProps {
  header: JwtHeader | null;
}

export const JwtDecoderAlgorithmCard = ({ header }: JwtDecoderAlgorithmCardProps) => {
  const { styles } = useStyles();
  const algDescription = getAlgorithmDescription(header?.alg);

  return (
    <Card size="small" className={styles.infoCard}>
      <Row gutter={[16, 8]}>
        <Col xs={24} sm={12}>
          <Typography.Text type="secondary">Algorithm:</Typography.Text>{" "}
          <Typography.Text strong>{header?.alg || "Unknown"}</Typography.Text>
          <br />
          <Typography.Text type="secondary" className={styles.algorithmDesc}>
            {algDescription}
          </Typography.Text>
        </Col>

        <Col xs={24} sm={12}>
          <Typography.Text type="secondary">Token Type:</Typography.Text>{" "}
          <Typography.Text strong>{header?.typ || "JWT"}</Typography.Text>
          {header?.kid && (
            <>
              <br />
              <Typography.Text type="secondary">Key ID:</Typography.Text>{" "}
              <Typography.Text code>{header.kid}</Typography.Text>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  infoCard: {
    backgroundColor: token.colorBgContainer,
  },
  algorithmDesc: {
    fontSize: token.fontSizeSM,
  },
}));
