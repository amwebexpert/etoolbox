import { Card, Col, Row, Typography } from "antd";
import { createStyles } from "antd-style";

import { JwtDecoderClaimTag } from "./jwt-decoder-claim-tag";
import type { JwtClaimInfo } from "./jwt-decoder.utils";

interface JwtDecoderClaimsCardProps {
  claims: JwtClaimInfo[];
}

export const JwtDecoderClaimsCard = ({ claims }: JwtDecoderClaimsCardProps) => {
  const { styles } = useStyles();

  if (claims.length === 0) {
    return null;
  }

  return (
    <Card size="small" title="Token Claims" className={styles.claimsCard}>
      <Row gutter={[16, 12]}>
        {claims.map((claim, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className={styles.claimItem}>
              <Typography.Text type="secondary" className={styles.claimLabel}>
                {claim.label}
              </Typography.Text>
              <div className={styles.claimValue}>
                <Typography.Text>{claim.value}</Typography.Text>
                <JwtDecoderClaimTag claim={claim} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  claimsCard: {
    backgroundColor: token.colorBgContainer,
  },
  claimItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  claimLabel: {
    fontSize: 12,
  },
  claimValue: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
}));
