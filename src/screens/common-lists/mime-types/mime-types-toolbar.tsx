import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import { useMimeTypesStore } from "./mime-types.store";
import { CATEGORY_OPTIONS, MIME_TYPES } from "./mime-types.utils";

const { Text } = Typography;

interface MimeTypesToolbarProps {
  filteredCount: number;
}

export const MimeTypesToolbar = ({ filteredCount }: MimeTypesToolbarProps) => {
  const { styles } = useStyles();
  const { isDesktop } = useResponsive();

  const { category, filter, setCategory, setFilter, hasFilters, resetFilters } = useMimeTypesStore();

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
          placeholder="Search MIME type or extension..."
          prefix={<SearchOutlined />}
          allowClear
          className={styles.input}
        />
      </Col>

      <Col xs={12} sm={12} md={4} lg={4}>
        <Text type="secondary" className={styles.count}>
          {filteredCount} / {MIME_TYPES.length}
        </Text>
      </Col>

      <Col xs={12} sm={12} md={6} lg={8}>
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
