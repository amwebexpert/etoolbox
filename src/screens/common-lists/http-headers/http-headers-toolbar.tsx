import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";
import { useDeferredValue } from "react";

import { useResponsive } from "~/hooks/use-responsive";

import { HTTP_HEADERS } from "./http-headers.constants";
import { useHttpHeadersStore } from "./http-headers.store";
import { applyFiltering, CATEGORY_OPTIONS, DEFAULT_CATEGORY, DEFAULT_TYPE, TYPE_OPTIONS } from "./http-headers.utils";

const { Text } = Typography;

export const HttpHeadersToolbar = () => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { category, type, filter, setCategory, setType, setFilter, resetFilters } = useHttpHeadersStore();

  const deferredCategory = useDeferredValue(category);
  const deferredType = useDeferredValue(type);
  const deferredFilter = useDeferredValue(filter);
  const filteredCount = applyFiltering({
    category: deferredCategory,
    type: deferredType,
    filter: deferredFilter,
  }).length;

  const hasFilters = category !== DEFAULT_CATEGORY || type !== DEFAULT_TYPE || filter !== "";

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Row gutter={[16, 12]} align="middle" className={styles.toolbar}>
      <Col xs={24} sm={12} md={5} lg={4}>
        <Select
          value={category}
          onChange={setCategory}
          options={CATEGORY_OPTIONS}
          className={styles.select}
          placeholder="Select category"
          autoFocus={isDesktop}
        />
      </Col>

      <Col xs={24} sm={12} md={4} lg={3}>
        <Select
          value={type}
          onChange={setType}
          options={TYPE_OPTIONS}
          className={styles.select}
          placeholder="Select type"
        />
      </Col>

      <Col xs={24} sm={12} md={7} lg={6}>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search header name or description..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.input}
        />
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <Text type="secondary" className={styles.count}>
          {filteredCount} / {HTTP_HEADERS.length}
        </Text>
      </Col>

      <Col xs={12} sm={6} md={4} lg={8}>
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
