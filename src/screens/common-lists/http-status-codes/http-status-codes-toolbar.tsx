import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import { HTTP_STATUS_CODES } from "./http-status-codes.constants";
import { useHttpStatusCodesStore } from "./http-status-codes.store";
import { applyFiltering, CATEGORY_OPTIONS, DEFAULT_CATEGORY } from "./http-status-codes.utils";

const { Text } = Typography;

export const HttpStatusCodesToolbar = () => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { category, filter, setCategory, setFilter, resetFilters } = useHttpStatusCodesStore();

  const deferredCategory = useDeferredValue(category);
  const deferredFilter = useDeferredValue(filter);
  const filteredCount = applyFiltering({ category: deferredCategory, filter: deferredFilter }).length;

  const hasFilters = category !== DEFAULT_CATEGORY || filter !== "";

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Row gutter={[16, 12]} align="middle" className={styles.toolbar}>
      <Col xs={24} sm={12} md={6} lg={5}>
        <Select
          value={category}
          onChange={setCategory}
          options={CATEGORY_OPTIONS}
          className={styles.select}
          placeholder="Select category"
          autoFocus={isDesktop}
        />
      </Col>

      <Col xs={24} sm={12} md={8} lg={7}>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search code, name, or description..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.input}
        />
      </Col>

      <Col xs={12} sm={12} md={4} lg={4}>
        <Text type="secondary" className={styles.count}>
          {filteredCount} / {HTTP_STATUS_CODES.length}
        </Text>
      </Col>

      <Col xs={12} sm={12} md={6} lg={8}>
        <Space className={styles.actions}>
          {hasFilters && (
            <Button icon={<ClearOutlined />} onClick={resetFilters}>
              Clear filters
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  );
};

const useStyles = createStyles(() => ({
  toolbar: {
    marginBottom: 16,
  },
  select: {
    width: "100%",
  },
  input: {
    width: "100%",
  },
  count: {
    fontFamily: "monospace",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));
