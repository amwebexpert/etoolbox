import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { HTTP_HEADERS } from "./http-headers.constants";
import { useHttpHeadersStore } from "./http-headers.store";
import { CATEGORY_OPTIONS, TYPE_OPTIONS } from "./http-headers.utils";

const { Text } = Typography;

interface HttpHeadersToolbarProps {
  filteredCount: number;
}

export const HttpHeadersToolbar = ({ filteredCount }: HttpHeadersToolbarProps) => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { category, type, filter, hasFilters, setCategory, setType, setFilter, resetFilters } = useHttpHeadersStore();

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
          <Button icon={<ClearOutlined />} onClick={resetFilters} disabled={!hasFilters()}>
            Clear filters
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
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));
