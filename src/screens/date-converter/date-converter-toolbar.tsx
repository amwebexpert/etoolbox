import { CalendarOutlined, ClearOutlined, ClockCircleOutlined, CopyOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps, Space, Tooltip } from "antd";

import { ScreenToolbar } from "~/components/ui/screen-toolbar";
import { useResponsive } from "~/hooks/use-responsive";

interface DateConverterToolbarProps {
  hasDate: boolean;
  onSetNow: () => void;
  onSetStartOfDay: () => void;
  onSetEndOfDay: () => void;
  onSetStartOfWeek: () => void;
  onSetStartOfMonth: () => void;
  onSetStartOfYear: () => void;
  onCopyAll: () => void;
  onClear: () => void;
}

export const DateConverterToolbar = ({
  hasDate,
  onSetNow,
  onSetStartOfDay,
  onSetEndOfDay,
  onSetStartOfWeek,
  onSetStartOfMonth,
  onSetStartOfYear,
  onCopyAll,
  onClear,
}: DateConverterToolbarProps) => {
  const { isMobile } = useResponsive();

  const quickDatesItems: MenuProps["items"] = [
    {
      key: "start-of-day",
      label: "Start of Day (00:00)",
      onClick: onSetStartOfDay,
    },
    {
      key: "end-of-day",
      label: "End of Day (23:59)",
      onClick: onSetEndOfDay,
    },
    { type: "divider" },
    {
      key: "start-of-week",
      label: "Start of Week (Monday)",
      onClick: onSetStartOfWeek,
    },
    {
      key: "start-of-month",
      label: "Start of Month",
      onClick: onSetStartOfMonth,
    },
    {
      key: "start-of-year",
      label: "Start of Year",
      onClick: onSetStartOfYear,
    },
  ];

  return (
    <ScreenToolbar
      leading={
        <Space size="small" wrap>
          <Tooltip title="Set to current date and time">
            <Button type="primary" icon={<ClockCircleOutlined />} onClick={onSetNow}>
              Now
            </Button>
          </Tooltip>

          <Dropdown menu={{ items: quickDatesItems }} trigger={["click"]}>
            <Button icon={<CalendarOutlined />}>
              Quick Dates <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      }
      actions={
        <Space size="small" wrap>
          <Tooltip title="Clear all">
            <Button icon={<ClearOutlined />} disabled={!hasDate} onClick={onClear}>
              {!isMobile && "Clear"}
            </Button>
          </Tooltip>

          <Tooltip title="Copy all formats to clipboard">
            <Button icon={<CopyOutlined />} disabled={!hasDate} onClick={onCopyAll}>
              {!isMobile && "Copy All"}
            </Button>
          </Tooltip>
        </Space>
      }
    />
  );
};
