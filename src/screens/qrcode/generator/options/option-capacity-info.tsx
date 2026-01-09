import { InfoCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import type { QRCodeErrorCorrectionLevel } from "../qrcode-generator.types";
import { getCapacityInfo } from "../qrcode-generator.utils";

import { useOptionsStyles } from "./use-options-styles";

interface OptionCapacityInfoProps {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
}

export const OptionCapacityInfo = ({ errorCorrectionLevel }: OptionCapacityInfoProps) => {
  const { styles } = useOptionsStyles();
  const capacityInfo = getCapacityInfo({ errorCorrectionLevel });

  return (
    <div className={styles.capacityInfo}>
      <Typography.Text type="secondary" className={styles.capacityLabel}>
        <InfoCircleOutlined /> Max capacity with {errorCorrectionLevel} correction:
      </Typography.Text>
      <Typography.Text type="secondary" className={styles.capacityValues}>
        {capacityInfo.numeric.toLocaleString()} numeric | {capacityInfo.alphanumeric.toLocaleString()} alphanumeric |{" "}
        {capacityInfo.bytes.toLocaleString()} bytes
      </Typography.Text>
    </div>
  );
};
