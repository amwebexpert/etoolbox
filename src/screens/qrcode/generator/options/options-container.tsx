import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Form, Row } from "antd";

import { useResponsive } from "~/hooks/use-responsive";

import type { QRCodeOptions } from "../qrcode-generator.types";

import { OptionCapacityInfo } from "./option-capacity-info";
import { OptionColors } from "./option-colors";
import { OptionErrorCorrection } from "./option-error-correction";
import { OptionImageFormat } from "./option-image-format";
import { OptionMargin } from "./option-margin";
import { OptionQuality } from "./option-quality";
import { OptionWidth } from "./option-width";
import { useOptionsStyles } from "./use-options-styles";

type ColorField = "dark" | "light";
interface ColorChangeHandlerArgs {
  field: ColorField;
  color: string;
}

interface OptionsContainerProps {
  options: QRCodeOptions;
  showAdvanced: boolean;
  onOptionsChange: (options: Partial<QRCodeOptions>) => void;
  onShowAdvancedChange: (show: boolean) => void;
}

export const OptionsContainer = ({
  options,
  showAdvanced,
  onOptionsChange,
  onShowAdvancedChange,
}: OptionsContainerProps) => {
  const { styles } = useOptionsStyles();
  const { isMobile } = useResponsive();

  const handleColorChange = ({ field, color }: ColorChangeHandlerArgs) => {
    onOptionsChange({
      color: {
        ...options.color,
        [field]: color,
      },
    });
  };

  const collapseItems = [
    {
      key: "advanced",
      label: (
        <span className={styles.collapseLabel}>
          <SettingOutlined /> Advanced Options
        </span>
      ),
      children: (
        <Form layout="vertical" className={styles.form}>
          <Row gutter={[16, 0]}>
            <OptionErrorCorrection
              value={options.errorCorrectionLevel}
              onChange={(value) => onOptionsChange({ errorCorrectionLevel: value })}
            />
            <OptionImageFormat value={options.type} onChange={(value) => onOptionsChange({ type: value })} />
            <OptionWidth value={options.width} onChange={(value) => onOptionsChange({ width: value })} />
            <OptionMargin value={options.margin} onChange={(value) => onOptionsChange({ margin: value })} />
          </Row>

          <Row gutter={[16, 0]}>
            <OptionQuality value={options.quality} onChange={(value) => onOptionsChange({ quality: value })} />
            <OptionColors
              foreground={options.color.dark}
              background={options.color.light}
              onForegroundChange={(color) => handleColorChange({ field: "dark", color })}
              onBackgroundChange={(color) => handleColorChange({ field: "light", color })}
            />
          </Row>

          <OptionCapacityInfo errorCorrectionLevel={options.errorCorrectionLevel} />
        </Form>
      ),
    },
  ];

  return (
    <Collapse
      items={collapseItems}
      activeKey={showAdvanced ? ["advanced"] : []}
      onChange={(keys) => onShowAdvancedChange(keys.includes("advanced"))}
      size={isMobile ? "small" : "middle"}
      className={styles.collapse}
    />
  );
};
