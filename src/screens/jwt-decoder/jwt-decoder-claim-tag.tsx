import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

import type { JwtClaimInfo } from "./jwt-decoder.utils";

interface JwtDecoderClaimTagProps {
  claim: JwtClaimInfo;
}

export const JwtDecoderClaimTag = ({ claim }: JwtDecoderClaimTagProps) => {
  if (claim.type === "expired") {
    return (
      <Tag icon={<CloseCircleOutlined />} color="error">
        Expired
      </Tag>
    );
  }

  if (claim.type === "valid") {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Valid
      </Tag>
    );
  }

  if (claim.type === "date") {
    return <Tag icon={<ClockCircleOutlined />}>Date</Tag>;
  }

  return null;
};
