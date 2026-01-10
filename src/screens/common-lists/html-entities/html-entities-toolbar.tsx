import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { CATEGORY_OPTIONS, FILTER_FIELD_OPTIONS, HTML_ENTITIES } from "./html-entities.constants";
import { useHtmlEntitiesStore } from "./html-entities.store";
import type { HtmlEntityCategory, HtmlEntityFilterField } from "./html-entities.types";

const { Text } = Typography;

interface HtmlEntitiesToolbarProps {
  filteredCount: number;
}

export const HtmlEntitiesToolbar = ({ filteredCount }: HtmlEntitiesToolbarProps) => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { category, filter, filterField, setCategory, setFilter, setFilterField, hasFilters, resetFilters } =
    useHtmlEntitiesStore();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (value: HtmlEntityCategory) => {
    setCategory(value);
  };

  const handleFilterFieldChange = (value: HtmlEntityFilterField) => {
    setFilterField(value);
  };

  return (
    <Row gutter={[16, 12]} align="middle" className={styles.toolbar}>
      <Col xs={24} sm={12} md={5} lg={4}>
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={CATEGORY_OPTIONS}
          className={styles.select}
          placeholder="Category"
          autoFocus={isDesktop}
        />
      </Col>

      <Col xs={24} sm={12} md={4} lg={3}>
        <Select
          value={filterField}
          onChange={handleFilterFieldChange}
          options={FILTER_FIELD_OPTIONS}
          className={styles.select}
          placeholder="Filter type"
        />
      </Col>

      <Col xs={24} sm={12} md={7} lg={6}>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search entity, name, number..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.input}
        />
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <Text type="secondary" className={styles.count}>
          {filteredCount} / {HTML_ENTITIES.length}
        </Text>
      </Col>

      <Col xs={12} sm={6} md={4} lg={8}>
        <Space className={styles.actions}>
          <Button icon={<ClearOutlined />} onClick={resetFilters} disabled={!hasFilters()}>
            Clear
          </Button>
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
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));
