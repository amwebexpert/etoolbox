import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, Tag, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { getResultMaxHeight, type ExtendedJwtPayload, type JwtHeader } from "../jwt-decoder.utils";
import { JwtDecoderSectionHeaderContent } from "./jwt-decoder-section-header-content";
import { JwtDecoderSectionPayloadContent } from "./jwt-decoder-section-payload-content";
import { JwtDecoderSectionSignatureContent } from "./jwt-decoder-section-signature-content";

interface JwtDecoderSectionsProps {
  header: JwtHeader | null;
  payload: ExtendedJwtPayload | null;
  signature: string;
  expired: boolean;
}

export const JwtDecoderSections = ({ header, payload, signature, expired }: JwtDecoderSectionsProps) => {
  const { styles } = useStyles();
  const { isMobile, isTablet } = useResponsive();

  const maxHeight = getResultMaxHeight({ isMobile, isTablet });

  const collapseItems: CollapseProps["items"] = [
    {
      key: "header",
      label: (
        <div className={styles.collapseLabel}>
          <Typography.Text strong>Header</Typography.Text>
          <Tag color="blue">{header?.alg || "Unknown"}</Tag>
          {header?.typ && <Tag>{header.typ}</Tag>}
        </div>
      ),
      children: <JwtDecoderSectionHeaderContent header={header} maxHeight={maxHeight} />,
    },
    {
      key: "payload",
      label: (
        <div className={styles.collapseLabel}>
          <Typography.Text strong>Payload</Typography.Text>
          {expired && (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Expired
            </Tag>
          )}
          {!expired && payload?.exp && (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Valid
            </Tag>
          )}
        </div>
      ),
      children: <JwtDecoderSectionPayloadContent payload={payload} maxHeight={maxHeight} />,
    },
    {
      key: "signature",
      label: (
        <div className={styles.collapseLabel}>
          <Typography.Text strong>Signature</Typography.Text>
          <Tag color="purple">Cannot be verified client-side</Tag>
        </div>
      ),
      children: <JwtDecoderSectionSignatureContent signature={signature} />,
    },
  ];

  return <Collapse items={collapseItems} defaultActiveKey={["header", "payload"]} className={styles.collapse} />;
};

const useStyles = createStyles(({ token }) => ({
  collapse: {
    backgroundColor: token.colorBgContainer,
  },
  collapseLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
}));
