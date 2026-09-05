import { ClearOutlined } from "@ant-design/icons";
import { Button, Col, Space, Typography } from "antd";

import type { ListFilterColSpan } from "~/styles/list-filter-toolbar.styles";

interface ListFilterSummaryActionsArgs {
  filteredCount: number;
  totalCount: number;
  hasFilters: boolean;
  onResetFilters: () => void;
  countCol: ListFilterColSpan;
  actionsCol: ListFilterColSpan;
  countClassName?: string;
  actionsClassName?: string;
  clearLabel?: string;
}

const { Text } = Typography;

export const ListFilterSummaryActions = ({
  filteredCount,
  totalCount,
  hasFilters,
  onResetFilters,
  countCol,
  actionsCol,
  countClassName,
  actionsClassName,
  clearLabel = "Clear filters",
}: ListFilterSummaryActionsArgs) => {
  return (
    <>
      <Col xs={countCol.xs} sm={countCol.sm} md={countCol.md} lg={countCol.lg}>
        <Text type="secondary" className={countClassName}>
          {filteredCount} / {totalCount}
        </Text>
      </Col>

      <Col xs={actionsCol.xs} sm={actionsCol.sm} md={actionsCol.md} lg={actionsCol.lg}>
        <Space className={actionsClassName}>
          <Button icon={<ClearOutlined />} onClick={onResetFilters} disabled={!hasFilters}>
            {clearLabel}
          </Button>
        </Space>
      </Col>
    </>
  );
};
