import { CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import type { ReactNode } from "react";

interface HtmlEntityCopyableCellProps {
  displayValue: ReactNode;
  copyValue: string;
  tooltip: string;
  onCopy: (text: string) => void;
  cellClassName: string;
  iconClassName: string;
}

export const HtmlEntityCopyableCell = ({
  displayValue,
  copyValue,
  tooltip,
  onCopy,
  cellClassName,
  iconClassName,
}: HtmlEntityCopyableCellProps) => (
  <Tooltip title={tooltip}>
    <div className={cellClassName} onClick={() => onCopy(copyValue)}>
      {displayValue}
      <CopyOutlined className={iconClassName} />
    </div>
  </Tooltip>
);
